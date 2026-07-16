import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";
import { execFileSync, spawnSync } from "node:child_process";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "..", "..");
const exporterPath = path.join(scriptDir, "export-game-data-v2.mjs");
const fixtureCharacters = path.join(scriptDir, "fixtures", "rules-v2", "characters");
const fixedCommit = "rules-v2-export-fixture";
const fixedTimestamp = "2026-07-16T00:00:00.000Z";

const readJson = async (filename) => JSON.parse(await fs.readFile(filename, "utf8"));
const sha256 = (contents) => `sha256:${createHash("sha256").update(contents).digest("hex")}`;
const packageSha256 = async (directory, filenames) => {
  const hash = createHash("sha256");
  for (const filename of [...filenames].sort((left, right) => left.localeCompare(right))) {
    const contents = await fs.readFile(path.join(directory, filename), "utf8");
    hash.update(filename);
    hash.update("\0");
    hash.update(contents);
    hash.update("\0");
  }
  return `sha256:${hash.digest("hex")}`;
};

const runExporter = (outDir) =>
  execFileSync(
    process.execPath,
    [
      exporterPath,
      "--characters-dir",
      fixtureCharacters,
      "--out",
      outDir,
      "--skip-assets",
      "--source-commit",
      fixedCommit,
      "--generated-at",
      fixedTimestamp,
      "--migrations-applied",
      "fixture-v1-to-v2",
      "--require-publishable",
    ],
    { cwd: repoRoot, encoding: "utf8", stdio: "pipe" }
  );

const main = async () => {
  const tempRoot = await fs.mkdtemp(path.join(os.tmpdir(), "ua-rules-v2-export-"));
  const firstOut = path.join(tempRoot, "first");
  const secondOut = path.join(tempRoot, "second");
  try {
    runExporter(firstOut);
    runExporter(secondOut);

    const firstManifest = await readJson(path.join(firstOut, "manifest.json"));
    const secondManifest = await readJson(path.join(secondOut, "manifest.json"));
    assert.deepEqual(firstManifest, secondManifest, "Rules v2 export must be deterministic for fixed source metadata.");
    assert.equal(firstManifest.schemaVersion, 2);
    assert.equal(firstManifest.rulesVersion, 2);
    assert.equal(firstManifest.exportProfile, "rules-v2");
    assert.equal(firstManifest.rosterCount, 1);
    assert.equal(firstManifest.sourceCommit, fixedCommit);
    assert.equal(firstManifest.generatedAt, fixedTimestamp);
    assert.equal(firstManifest.sourceDirty, false);
    assert.equal(firstManifest.publishable, true);
    assert.deepEqual(firstManifest.migrationsApplied, ["fixture-v1-to-v2"]);
    assert.deepEqual(firstManifest.validation, { errors: 0, warnings: 0, strict: true });

    const expectedFiles = ["aliases.json", "characters.json", "global-rules.json", "registries.json"];
    assert.deepEqual(Object.keys(firstManifest.files).sort(), expectedFiles);
    for (const filename of expectedFiles) {
      const contents = await fs.readFile(path.join(firstOut, filename), "utf8");
      assert.equal(firstManifest.files[filename], sha256(contents), `${filename} hash must match its contents.`);
    }
    assert.match(
      firstManifest.contentHash,
      /^sha256:[0-9a-f]{64}$/,
      "Aggregate contentHash must be a canonical SHA-256 value."
    );
    assert.equal(
      firstManifest.contentHash,
      await packageSha256(firstOut, expectedFiles),
      "Aggregate contentHash must match the sorted exported package contents."
    );

    const characters = await readJson(path.join(firstOut, "characters.json"));
    assert.equal(characters.schemaVersion, 2);
    assert.equal(characters.rulesVersion, 2);
    assert.equal(characters.characters.length, 1);
    assert.equal(characters.characters[0].id, "export-fixture");

    const registries = await readJson(path.join(firstOut, "registries.json"));
    const globalRules = await readJson(path.join(firstOut, "global-rules.json"));
    const aliases = await readJson(path.join(firstOut, "aliases.json"));
    assert.equal(registries.schemaVersion, 2);
    assert.equal(globalRules.rulesVersion, 2);
    assert.equal(aliases.rulesVersion, 2);

    const invalidDir = path.join(tempRoot, "invalid-v1");
    await fs.mkdir(invalidDir, { recursive: true });
    await fs.writeFile(
      path.join(invalidDir, "legacy-fixture.yml"),
      "id: legacy-fixture\nname: Legacy Fixture\nversion: Test\norigin: Test\n",
      "utf8"
    );
    const invalidRun = spawnSync(
      process.execPath,
      [
        exporterPath,
        "--characters-dir",
        invalidDir,
        "--out",
        path.join(tempRoot, "invalid-out"),
        "--skip-assets",
        "--source-commit",
        fixedCommit,
        "--generated-at",
        fixedTimestamp,
      ],
      { cwd: repoRoot, encoding: "utf8" }
    );
    assert.notEqual(invalidRun.status, 0, "Rules v1 input must not be exported through the Rules v2 exporter.");
    assert.match(
      `${invalidRun.stdout}\n${invalidRun.stderr}`,
      /requires schemaVersion: 2 and rulesVersion: 2/,
      "Version mismatch failure must be explicit."
    );

    console.log("Rules v2 exporter tests: passed.");
  } finally {
    await fs.rm(tempRoot, { recursive: true, force: true });
  }
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
