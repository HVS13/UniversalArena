import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import YAML from "yaml";

const argValue = (name, fallback = null) => {
  const index = process.argv.indexOf(name);
  return index === -1 ? fallback : process.argv[index + 1] ?? fallback;
};
const hasArg = (name) => process.argv.includes(name);

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "..", "..");
const dataRoot = path.join(repoRoot, "docs", "data");
const charactersDir = path.resolve(argValue("--characters-dir", path.join(dataRoot, "characters")));
const registriesPath = path.resolve(argValue("--registries", path.join(dataRoot, "registries.yml")));
const globalRulesPath = path.resolve(
  argValue("--global-rules", path.join(dataRoot, "rules-v2", "global-rules.yml"))
);
const aliasesPath = path.resolve(
  argValue("--aliases", path.join(dataRoot, "migrations", "rules-v2-overrides.yml"))
);
const assetsDir = path.resolve(argValue("--assets-dir", path.join(repoRoot, "docs", "assets", "characters")));
const outDir = path.resolve(argValue("--out", path.join(dataRoot, "export-v2")));
const assetsOutDir = path.resolve(
  argValue("--assets-out", path.join(outDir, "assets", "characters"))
);
const strict = !hasArg("--allow-warnings");
const skipAssets = hasArg("--skip-assets");
const requirePublishable = hasArg("--require-publishable");
const sourceRepository =
  argValue("--source-repository") || process.env.UA_SOURCE_REPOSITORY || "HVS13/UniversalArena";
const explicitSourceCommit =
  argValue("--source-commit") || process.env.UA_SOURCE_COMMIT || process.env.GITHUB_SHA || null;
const explicitGeneratedAt = argValue("--generated-at") || process.env.UA_GENERATED_AT || null;
const migrationsApplied = (argValue("--migrations-applied", "") || "")
  .split(",")
  .map((value) => value.trim())
  .filter(Boolean);

const EFFECT_PRIMITIVES = new Set([
  "deal_damage",
  "lose_hp",
  "pay_hp",
  "set_hp",
  "change_max_hp",
  "gain_shield",
  "gain_barrier",
  "heal",
  "gain_status",
  "inflict_status",
  "set_status",
  "reduce_status",
  "remove_status",
  "spend_status",
  "transfer_status",
  "gain_status_per_spent",
  "inflict_status_per_spent",
  "deal_damage_per_spent",
  "gain_energy",
  "set_energy",
  "spend_energy",
  "gain_ultimate_meter",
  "spend_ultimate_meter",
  "create_card",
  "reveal_cards",
  "draw_cards",
  "discard_cards",
  "scry",
  "seek",
  "search",
  "move_character",
  "swap_characters",
  "redirect",
  "grant_keyword",
  "block_play",
  "allow_play",
  "switch_equipment",
  "reload",
  "reload_equipped",
  "switch_equip",
  "transform_card",
  "resurrect",
  "sacrifice",
  "prevent_defeat",
  "defeat",
  "modify_cost",
  "modify_power",
  "modify_speed",
  "choose",
  "random_select",
  "sequence",
  "schedule_trigger",
  "record_match_flag",
  "replace_ultimate_pathway",
  "retain",
]);
const STATUS_MODES = new Set(["binary", "stack", "value", "potency_count"]);
const CARD_ORIGINS = new Set(["starting", "created", "scenario", "generated_variant"]);
const OWNER_KINDS = new Set(["character", "team", "scenario", "none", "inherited"]);
const TARGET_LOCKS = new Set(["character", "position", "object"]);
const LIFECYCLE_FIELDS = [
  "afterResolution",
  "ifCancelled",
  "ifNegated",
  "ifUnusedAtTurnEnd",
  "onOwnerDefeat",
  "onResurrection",
];

const isObject = (value) => Boolean(value) && typeof value === "object" && !Array.isArray(value);
const readYaml = async (filename) => YAML.parse(await fs.readFile(filename, "utf8"));
const serializeJson = (value) => `${JSON.stringify(value, null, 2)}\n`;
const ensureDir = (directory) => fs.mkdir(directory, { recursive: true });
const push = (list, filename, message) => list.push(`${filename}: ${message}`);
const slugFromFilename = (filename) => filename.replace(/\.ya?ml$/i, "");

const createHashValue = (contents) => `sha256:${createHash("sha256").update(contents).digest("hex")}`;
const createContentHash = (files) => {
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

const runGit = (args) => {
  try {
    return execFileSync("git", ["-C", repoRoot, ...args], { encoding: "utf8" }).trim();
  } catch {
    return null;
  }
};

const resolveSourceMetadata = () => {
  const commit = explicitSourceCommit || runGit(["rev-parse", "HEAD"]) || "unknown";
  const dirtyOutput = explicitSourceCommit
    ? ""
    : runGit([
        "status",
        "--porcelain",
        "--",
        "docs/data/registries.yml",
        "docs/data/rules-v2",
        "docs/data/migrations/rules-v2-overrides.yml",
        "docs/data/characters",
        "docs/assets/characters",
      ]) || "";
  const sourceDirty = Boolean(dirtyOutput.trim());
  const generatedAt =
    explicitGeneratedAt ||
    (!sourceDirty && commit !== "unknown" ? runGit(["show", "-s", "--format=%cI", commit]) : null) ||
    new Date().toISOString();
  return {
    sourceCommit: sourceDirty ? `${commit}-dirty` : commit,
    generatedAt,
    sourceDirty,
    publishable: !sourceDirty && commit !== "unknown",
  };
};

const collectRegistries = (data, errors) => {
  if (data?.schemaVersion !== 2 || data?.rulesVersion !== 2) {
    push(errors, "registries.yml", "must declare schemaVersion: 2 and rulesVersion: 2.");
  }
  if (!isObject(data?.registries)) {
    push(errors, "registries.yml", "missing registries object.");
    return { ids: {}, versions: {} };
  }
  const ids = {};
  const versions = {};
  const globalIds = new Set();
  for (const [key, entries] of Object.entries(data.registries)) {
    versions[key] = 1;
    ids[key] = new Set();
    if (!Array.isArray(entries)) {
      push(errors, "registries.yml", `${key} must be an array.`);
      continue;
    }
    for (const [index, entry] of entries.entries()) {
      const label = `${key}[${index}]`;
      if (!isObject(entry) || typeof entry.id !== "string" || !entry.id.trim()) {
        push(errors, "registries.yml", `${label} missing stable id.`);
        continue;
      }
      if (ids[key].has(entry.id)) push(errors, "registries.yml", `${key} duplicates id "${entry.id}".`);
      if (globalIds.has(entry.id)) push(errors, "registries.yml", `id "${entry.id}" is duplicated across registries.`);
      ids[key].add(entry.id);
      globalIds.add(entry.id);
    }
  }
  return { ids, versions };
};

const validateRegistryRefs = (values, allowed, filename, label, errors) => {
  if (!Array.isArray(values)) {
    push(errors, filename, `${label} must be an array.`);
    return;
  }
  for (const value of values) {
    if (!allowed?.has(value)) push(errors, filename, `${label} references unknown id "${value}".`);
  }
};

const validateEffects = (effects, filename, label, registries, errors) => {
  if (!Array.isArray(effects)) {
    push(errors, filename, `${label} must be an array.`);
    return;
  }
  const ids = new Set();
  for (const [index, effect] of effects.entries()) {
    const effectLabel = `${label}[${index}]`;
    if (!isObject(effect)) {
      push(errors, filename, `${effectLabel} must be an object.`);
      continue;
    }
    if (!effect.id) push(errors, filename, `${effectLabel} missing stable id.`);
    else if (ids.has(effect.id)) push(errors, filename, `${effectLabel} duplicates id "${effect.id}".`);
    else ids.add(effect.id);
    if (!registries.timings?.has(effect.timing)) {
      push(errors, filename, `${effectLabel} has unknown timing "${effect.timing}".`);
    }
    if (!registries.scopes?.has(effect.scope)) {
      push(errors, filename, `${effectLabel} has unknown scope "${effect.scope}".`);
    }
    if (!EFFECT_PRIMITIVES.has(effect.type)) {
      push(errors, filename, `${effectLabel} uses unregistered primitive "${effect.type}".`);
    }
    for (const [optionIndex, option] of (effect.options ?? []).entries()) {
      validateEffects(option?.effects, filename, `${effectLabel}.options[${optionIndex}].effects`, registries, errors);
    }
    if (effect.type === "resurrect" && effect.hp === undefined && effect.amount === undefined) {
      push(errors, filename, `${effectLabel} resurrect must specify returned HP.`);
    }
    if (effect.type === "spend_status" && effect.failureBehavior === undefined && effect.gateAll === undefined) {
      push(errors, filename, `${effectLabel} spend_status must define failure behavior.`);
    }
  }
};

const validateStatus = (status, filename, index, registries, errors, warnings) => {
  const label = `statusEffects[${index}]`;
  if (!status?.id) push(errors, filename, `${label} missing id.`);
  if (!STATUS_MODES.has(status?.mode)) push(errors, filename, `${label} has invalid mode "${status?.mode}".`);
  if (!isObject(status?.persistence)) push(errors, filename, `${label} missing persistence.`);
  validateEffects(status?.rules ?? [], filename, `${label}.rules`, registries, errors);
  if (status?.migrationStatus === "review_required") {
    push(warnings, filename, `${label} (${status.name}) still requires typed-rule review.`);
  }
  if (status?.mode === "potency_count" && (status?.caps?.potency == null || status?.caps?.count == null)) {
    push(errors, filename, `${label} potency_count requires potency and count caps.`);
  }
};

const validateCard = (card, filename, label, characterId, registries, cardIds, errors, warnings) => {
  if (!isObject(card)) {
    push(errors, filename, `${label} must be an object.`);
    return;
  }
  if (!card.id) push(errors, filename, `${label} missing id.`);
  else if (cardIds.has(card.id)) push(errors, filename, `${label} duplicates card id "${card.id}".`);
  else cardIds.add(card.id);
  if (!card.slotId) push(errors, filename, `${label} missing slotId.`);
  if (!CARD_ORIGINS.has(card.cardOrigin)) push(errors, filename, `${label} invalid cardOrigin.`);
  if (!OWNER_KINDS.has(card?.owner?.kind)) push(errors, filename, `${label} invalid owner kind.`);
  if (card?.owner?.kind === "character" && card.owner.characterId !== characterId) {
    push(errors, filename, `${label} owner.characterId must equal "${characterId}".`);
  }
  validateRegistryRefs(card.actionTypes, registries.actionTypes, filename, `${label}.actionTypes`, errors);
  validateRegistryRefs(card.damageTypes, registries.damageTypes, filename, `${label}.damageTypes`, errors);
  validateRegistryRefs(card.properties, registries.properties, filename, `${label}.properties`, errors);
  validateRegistryRefs(card.sourceSystemTags, registries.sourceSystemTags, filename, `${label}.sourceSystemTags`, errors);
  validateRegistryRefs(card.attackTags, registries.attackTags, filename, `${label}.attackTags`, errors);
  validateRegistryRefs(card.effectTags, registries.effectTags, filename, `${label}.effectTags`, errors);
  if (card.range != null && !registries.ranges?.has(card.range)) {
    push(errors, filename, `${label}.range references unknown id "${card.range}".`);
  }
  if (card.area?.kind && !registries.areas?.has(card.area.kind)) {
    push(errors, filename, `${label}.area references unknown id "${card.area.kind}".`);
  }
  if (card.speed && !registries.speeds?.has(card.speed)) {
    push(errors, filename, `${label}.speed references unknown id "${card.speed}".`);
  }
  if (!TARGET_LOCKS.has(card?.target?.lockMode)) push(errors, filename, `${label} invalid target lock mode.`);
  if (!isObject(card.lifecycle)) push(errors, filename, `${label} missing lifecycle.`);
  else {
    for (const field of LIFECYCLE_FIELDS) {
      if (!(field in card.lifecycle)) push(errors, filename, `${label}.lifecycle missing ${field}.`);
      else if (!registries.lifecycleDestinations?.has(card.lifecycle[field])) {
        push(errors, filename, `${label}.lifecycle.${field} references unknown destination "${card.lifecycle[field]}".`);
      }
    }
  }
  if (card.actionTypes?.includes("action-created")) push(errors, filename, `${label} stores Created as an Action Type.`);
  if (card.damageTypes?.includes("damage-electric")) push(errors, filename, `${label} treats Electric as a Damage Type.`);
  if (!Array.isArray(card.transforms)) push(errors, filename, `${label}.transforms must be an array.`);
  if (!Array.isArray(card.restrictions)) push(errors, filename, `${label}.restrictions must be an array.`);
  if (!Array.isArray(card.sourceBasis)) push(errors, filename, `${label}.sourceBasis must be an array.`);
  validateEffects(card.effects, filename, `${label}.effects`, registries, errors);
  validateEffects(card.continuousRules ?? [], filename, `${label}.continuousRules`, registries, errors);
  if (Array.isArray(card.legacyUnmappedTypes) && card.legacyUnmappedTypes.length) {
    push(warnings, filename, `${label} still has unmapped legacy classifications.`);
  }
};

const validateCharacter = (data, filename, registries, errors, warnings) => {
  if (!isObject(data)) {
    push(errors, filename, "file did not parse into an object.");
    return;
  }
  if (data.schemaVersion !== 2 || data.rulesVersion !== 2) {
    push(errors, filename, "Rules v2 export requires schemaVersion: 2 and rulesVersion: 2.");
    return;
  }
  if (data.id !== slugFromFilename(filename)) push(errors, filename, `id "${data.id}" must match filename slug.`);
  for (const field of ["id", "characterId", "versionId", "name", "version", "origin", "art"]) {
    if (data[field] == null || data[field] === "") push(errors, filename, `missing ${field}.`);
  }
  if (!registries.roles?.has(data?.role?.primary)) push(errors, filename, "invalid Primary Core Role.");
  if (data?.role?.secondary != null && !registries.roles?.has(data.role.secondary)) {
    push(errors, filename, "invalid Secondary Core Role.");
  }
  if (data?.role?.secondary === data?.role?.primary) push(errors, filename, "Primary and Secondary roles must differ.");
  validateRegistryRefs(data.archetypes, registries.combatArchetypes, filename, "archetypes", errors);
  validateRegistryRefs(data.capabilities, registries.capabilities, filename, "capabilities", errors);
  if (!isObject(data.sourceBoundary)) push(errors, filename, "missing sourceBoundary.");
  if (!isObject(data.design)) push(errors, filename, "missing design metadata.");
  for (const field of ["continuity", "start", "end", "baselineState", "knowledgeBoundary", "personalityBoundary"]) {
    if (data?.sourceBoundary?.[field] === "review_required") push(warnings, filename, `sourceBoundary.${field} requires review.`);
  }
  for (const field of ["weakness", "powerExpression"]) {
    if (data?.design?.[field] === "review_required") push(warnings, filename, `design.${field} requires review.`);
  }

  const allCards = [...(data.cards ?? []), ...(data.createdCards ?? [])];
  const cardIds = new Set();
  allCards.forEach((card, index) =>
    validateCard(card, filename, `allCards[${index}]`, data.id, registries, cardIds, errors, warnings)
  );
  const startingRegular = (data.cards ?? []).filter(
    (card) => card.cardOrigin === "starting" && !card.actionTypes?.includes("action-ultimate")
  );
  const basicCount = startingRegular.filter((card) => card.actionTypes?.includes("action-basic")).length;
  const techniqueCount = startingRegular.filter((card) => card.actionTypes?.includes("action-technique")).length;
  if (startingRegular.length !== 5) push(errors, filename, `must have 5 starting regular cards; found ${startingRegular.length}.`);
  if (basicCount !== 2) push(errors, filename, `must have 2 starting Basics; found ${basicCount}.`);
  if (techniqueCount !== 3) push(errors, filename, `must have 3 starting Techniques; found ${techniqueCount}.`);

  const allCardIds = new Set(allCards.map((card) => card.id));
  for (const [cardIndex, card] of allCards.entries()) {
    for (const [transformIndex, transform] of (card.transforms ?? []).entries()) {
      if (!transform.id) push(errors, filename, `allCards[${cardIndex}].transforms[${transformIndex}] missing id.`);
      if (!allCardIds.has(transform.replacementCardId)) {
        push(errors, filename, `allCards[${cardIndex}] transform references missing card "${transform.replacementCardId}".`);
      }
    }
  }

  if (!Array.isArray(data.ultimatePathways) || data.ultimatePathways.length === 0) {
    push(errors, filename, "must have at least one Ultimate pathway.");
  } else {
    const pathwayCards = new Set();
    for (const [index, pathway] of data.ultimatePathways.entries()) {
      if (!pathway.id) push(errors, filename, `ultimatePathways[${index}] missing id.`);
      for (const variant of pathway.variants ?? []) {
        if (!allCardIds.has(variant.cardId)) {
          push(errors, filename, `ultimatePathways[${index}] references missing card "${variant.cardId}".`);
        }
        if (pathwayCards.has(variant.cardId)) {
          push(errors, filename, `Ultimate card "${variant.cardId}" belongs to multiple pathways.`);
        }
        pathwayCards.add(variant.cardId);
      }
    }
    const ultimateCards = (data.cards ?? []).filter((card) => card.actionTypes?.includes("action-ultimate"));
    for (const card of ultimateCards) {
      if (!pathwayCards.has(card.id)) push(errors, filename, `Ultimate card "${card.id}" has no pathway.`);
    }
  }

  (data.statusEffects ?? []).forEach((status, index) =>
    validateStatus(status, filename, index, registries, errors, warnings)
  );
  for (const [index, innate] of (data.innates ?? []).entries()) {
    if (!innate.id) push(errors, filename, `innates[${index}] missing id.`);
    validateEffects(innate.setup ?? [], filename, `innates[${index}].setup`, registries, errors);
    for (const [triggerIndex, trigger] of (innate.triggers ?? []).entries()) {
      if (!trigger.id) push(errors, filename, `innates[${index}].triggers[${triggerIndex}] missing id.`);
      validateEffects(
        trigger.effects ?? [],
        filename,
        `innates[${index}].triggers[${triggerIndex}].effects`,
        registries,
        errors
      );
    }
  }
  if (data.migrationStatus === "review_required") push(warnings, filename, "migrationStatus still requires review.");
};

const copyAssets = async (characters) => {
  if (skipAssets) return;
  await ensureDir(assetsOutDir);
  const copied = new Set();
  for (const character of characters) {
    if (!character.art || copied.has(character.art)) continue;
    const source = path.join(assetsDir, character.art);
    const destination = path.join(assetsOutDir, character.art);
    try {
      await fs.copyFile(source, destination);
      copied.add(character.art);
    } catch {
      throw new Error(`Missing character art: ${source}`);
    }
  }
};

const exportRulesV2 = async () => {
  const errors = [];
  const warnings = [];
  const [registriesData, globalRules, aliasesData] = await Promise.all([
    readYaml(registriesPath),
    readYaml(globalRulesPath),
    readYaml(aliasesPath),
  ]);
  const registryInfo = collectRegistries(registriesData, errors);
  if (globalRules?.schemaVersion !== 2 || globalRules?.rulesVersion !== 2) {
    push(errors, "rules-v2/global-rules.yml", "must declare schemaVersion: 2 and rulesVersion: 2.");
  }
  if (globalRules?.status !== "approved_parallel_reference") {
    push(errors, "rules-v2/global-rules.yml", "must remain approved_parallel_reference during staged migration.");
  }
  if (globalRules?.transition?.appliesToRulesVersion !== 2) {
    push(errors, "rules-v2/global-rules.yml", "must apply to rulesVersion 2.");
  }

  const entries = (await fs.readdir(charactersDir)).filter((entry) => /\.ya?ml$/i.test(entry)).sort();
  if (!entries.length) push(errors, path.basename(charactersDir), "contains no character YAML files.");
  const characters = [];
  const characterIds = new Set();
  for (const entry of entries) {
    const data = await readYaml(path.join(charactersDir, entry));
    validateCharacter(data, entry, registryInfo.ids, errors, warnings);
    if (data?.id) {
      if (characterIds.has(data.id)) push(errors, entry, `duplicates character id "${data.id}".`);
      characterIds.add(data.id);
    }
    characters.push(data);
  }

  warnings.forEach((warning) => console.warn(`Warning: ${warning}`));
  errors.forEach((error) => console.error(`Error: ${error}`));
  if (errors.length || (strict && warnings.length)) {
    console.error(
      `Rules v2 export blocked: ${errors.length} error(s), ${warnings.length} warning(s)` +
        (strict && warnings.length ? " in strict mode." : ".")
    );
    process.exitCode = 1;
    return;
  }

  const exportedFiles = new Map();
  exportedFiles.set(
    "characters.json",
    serializeJson({ schemaVersion: 2, rulesVersion: 2, characters })
  );
  exportedFiles.set("registries.json", serializeJson(registriesData));
  exportedFiles.set("global-rules.json", serializeJson(globalRules));
  exportedFiles.set(
    "aliases.json",
    serializeJson({
      schemaVersion: 2,
      rulesVersion: 2,
      aliases: aliasesData?.aliases ?? {},
    })
  );

  const source = resolveSourceMetadata();
  const fileHashes = Object.fromEntries(
    [...exportedFiles.entries()]
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([filename, contents]) => [filename, createHashValue(contents)])
  );
  const manifest = {
    schemaVersion: 2,
    rulesVersion: 2,
    exportProfile: "rules-v2",
    sourceRepository,
    sourceCommit: source.sourceCommit,
    generatedAt: source.generatedAt,
    sourceDirty: source.sourceDirty,
    publishable: source.publishable,
    contentHash: createContentHash(exportedFiles),
    files: fileHashes,
    rosterCount: characters.length,
    registryVersions: registryInfo.versions,
    migrationsApplied,
    validation: {
      errors: 0,
      warnings: warnings.length,
      strict,
    },
  };

  if (requirePublishable && !manifest.publishable) {
    console.error("Rules v2 export blocked: source data is dirty or the source commit is unknown.");
    process.exitCode = 1;
    return;
  }

  await ensureDir(outDir);
  for (const [filename, contents] of exportedFiles) {
    await fs.writeFile(path.join(outDir, filename), contents, "utf8");
  }
  await fs.writeFile(path.join(outDir, "manifest.json"), serializeJson(manifest), "utf8");
  await copyAssets(characters);
  console.log(
    `Exported Rules v2 data for ${characters.length} character(s) to ${outDir} (${manifest.contentHash}).`
  );
  if (!manifest.publishable) {
    console.warn("Warning: export is marked publishable=false because source data is dirty or the source commit is unknown.");
  }
};

exportRulesV2().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
