import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import YAML from "yaml";

const argValue = (name, fallback = null) => {
  const index = process.argv.indexOf(name);
  return index === -1 ? fallback : process.argv[index + 1] ?? fallback;
};

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "..", "..");
const dataRoot = path.join(repoRoot, "docs", "data");
const activeRosterDir = path.join(dataRoot, "characters");
const charactersDir = path.resolve(argValue("--characters-dir", activeRosterDir));
const interactionsPath = path.resolve(
  argValue("--source-interactions", path.join(dataRoot, "rules-v2", "source-interactions.yml"))
);
const outDir = path.resolve(argValue("--out", path.join(dataRoot, "export-v2")));
const coreExporter = path.join(scriptDir, "export-game-data-v2.mjs");
const requirePublishable = process.argv.includes("--require-publishable");

const readYaml = async (filename) => YAML.parse(await fs.readFile(filename, "utf8"));
const serializeJson = (value) => `${JSON.stringify(value, null, 2)}\n`;
const isObject = (value) => Boolean(value) && typeof value === "object" && !Array.isArray(value);
const sha256 = (contents) => `sha256:${createHash("sha256").update(contents).digest("hex")}`;
const packageHash = (files) => {
  const hash = createHash("sha256");
  [...files.entries()]
    .sort(([left], [right]) => left.localeCompare(right))
    .forEach(([filename, contents]) => {
      hash.update(filename);
      hash.update("\0");
      hash.update(contents);
      hash.update("\0");
    });
  return `sha256:${hash.digest("hex")}`;
};
const collectObjects = (value, predicate, output = []) => {
  if (Array.isArray(value)) {
    value.forEach((item) => collectObjects(item, predicate, output));
  } else if (isObject(value)) {
    if (predicate(value)) output.push(value);
    Object.values(value).forEach((item) => collectObjects(item, predicate, output));
  }
  return output;
};

const validateInteractions = async () => {
  const errors = [];
  const registry = await readYaml(interactionsPath);
  if (registry?.schemaVersion !== 2 || registry?.rulesVersion !== 2) {
    errors.push("source-interactions.yml must declare schemaVersion: 2 and rulesVersion: 2.");
  }
  if (registry?.status !== "approved_parallel_registry") {
    errors.push("source-interactions.yml must remain approved_parallel_registry during staged migration.");
  }

  const definitions = new Map();
  for (const [index, entry] of (registry?.interactions ?? []).entries()) {
    const label = `source-interactions.yml interactions[${index}]`;
    if (!entry?.id || definitions.has(entry.id)) {
      errors.push(`${label} has a missing or duplicate id.`);
      continue;
    }
    if (!Array.isArray(entry.outcomes) || entry.outcomes.length === 0) {
      errors.push(`${label} must define a non-empty outcomes array.`);
      continue;
    }
    if (new Set(entry.outcomes).size !== entry.outcomes.length) {
      errors.push(`${label} contains duplicate outcomes.`);
    }
    if (!entry.outcomes.includes(entry.defaultOutcome)) {
      errors.push(`${label} defaultOutcome must be one of its registered outcomes.`);
    }
    definitions.set(entry.id, entry);
  }
  if (definitions.size === 0) errors.push("source-interactions.yml contains no interaction definitions.");

  const filenames = (await fs.readdir(charactersDir)).filter((entry) => /\.ya?ml$/i.test(entry)).sort();
  const activeFilenames = (await fs.readdir(activeRosterDir)).filter((entry) => /\.ya?ml$/i.test(entry)).sort();
  const missingActiveCharacters = activeFilenames.filter((filename) => !filenames.includes(filename));
  const characters = [];
  const requiredTargetInteractions = new Set();
  for (const filename of filenames) {
    const character = await readYaml(path.join(charactersDir, filename));
    characters.push({ filename, character });
    for (const [interactionId, result] of Object.entries(character?.sourceInteractions ?? {})) {
      const definition = definitions.get(interactionId);
      if (!definition) {
        errors.push(`${filename}: sourceInteractions references unknown id "${interactionId}".`);
        continue;
      }
      if (!definition.outcomes.includes(result?.outcome)) {
        errors.push(`${filename}: sourceInteractions.${interactionId} has invalid outcome "${result?.outcome}".`);
      }
      if (typeof result?.reason !== "string" || !result.reason.trim()) {
        errors.push(`${filename}: sourceInteractions.${interactionId} requires a source-grounded reason.`);
      }
    }

    for (const reference of collectObjects(character, (value) => typeof value.interactionId === "string")) {
      const definition = definitions.get(reference.interactionId);
      if (!definition) {
        errors.push(`${filename}: condition references unknown interaction "${reference.interactionId}".`);
        continue;
      }
      if (reference.outcome != null && !definition.outcomes.includes(reference.outcome)) {
        errors.push(`${filename}: condition requires invalid outcome "${reference.outcome}" for ${reference.interactionId}.`);
      }
      if (definition.kind === "target_eligibility") requiredTargetInteractions.add(reference.interactionId);
    }
    for (const reference of collectObjects(character, (value) => typeof value.sourceInteractionId === "string")) {
      if (!definitions.has(reference.sourceInteractionId)) {
        errors.push(`${filename}: mitigation references unknown interaction "${reference.sourceInteractionId}".`);
      }
    }
  }

  for (const interactionId of requiredTargetInteractions) {
    const definition = definitions.get(interactionId);
    for (const { filename, character } of characters) {
      const result = character?.sourceInteractions?.[interactionId];
      if (!result) {
        errors.push(`${filename}: missing required target interaction result "${interactionId}".`);
      } else if (result.outcome === definition.defaultOutcome) {
        errors.push(`${filename}: ${interactionId} remains at unresolved default outcome "${definition.defaultOutcome}".`);
      }
    }
  }

  return {
    registry,
    errors,
    characterCount: characters.length,
    missingActiveCharacters,
  };
};

const forwardedArgs = [];
for (let index = 2; index < process.argv.length; index += 1) {
  if (process.argv[index] === "--source-interactions") {
    index += 1;
    continue;
  }
  forwardedArgs.push(process.argv[index]);
}

const main = async () => {
  const { registry, errors, characterCount, missingActiveCharacters } = await validateInteractions();
  errors.forEach((error) => console.error(`Error: ${error}`));
  if (errors.length) {
    console.error(`Rules v2 package export blocked: ${errors.length} source-interaction error(s).`);
    process.exitCode = 1;
    return;
  }
  if (requirePublishable && missingActiveCharacters.length) {
    console.error(
      `Rules v2 package export blocked: partial roster is missing ${missingActiveCharacters.length} active character file(s).`
    );
    process.exitCode = 1;
    return;
  }

  const child = spawnSync(process.execPath, [coreExporter, ...forwardedArgs], {
    cwd: repoRoot,
    encoding: "utf8",
    stdio: "pipe",
  });
  if (child.status !== 0) {
    if (child.stdout) process.stdout.write(child.stdout);
    if (child.stderr) process.stderr.write(child.stderr);
    process.exitCode = child.status ?? 1;
    return;
  }

  const interactionContents = serializeJson(registry);
  await fs.writeFile(path.join(outDir, "source-interactions.json"), interactionContents, "utf8");

  const manifestPath = path.join(outDir, "manifest.json");
  const manifest = JSON.parse(await fs.readFile(manifestPath, "utf8"));
  const packageFilenames = [...Object.keys(manifest.files ?? {}), "source-interactions.json"];
  const packageFiles = new Map();
  for (const filename of packageFilenames) {
    const contents = await fs.readFile(path.join(outDir, filename), "utf8");
    packageFiles.set(filename, contents);
  }
  manifest.files = Object.fromEntries(
    [...packageFiles.entries()]
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([filename, contents]) => [filename, sha256(contents)])
  );
  manifest.contentHash = packageHash(packageFiles);
  manifest.sourceInteractionCount = registry.interactions.length;
  manifest.partialRoster = missingActiveCharacters.length > 0;
  manifest.missingRosterCharacters = missingActiveCharacters.map((filename) => filename.replace(/\.ya?ml$/i, ""));
  if (manifest.partialRoster) manifest.publishable = false;
  await fs.writeFile(manifestPath, serializeJson(manifest), "utf8");

  console.log(
    `Exported Rules v2 package for ${characterCount} character(s) to ${outDir} (${manifest.contentHash}).`
  );
  if (manifest.partialRoster) {
    console.warn(
      `Warning: export is marked publishable=false because ${missingActiveCharacters.length} active roster character(s) are missing.`
    );
  }
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
