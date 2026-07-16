import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import YAML from "yaml";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const docsRoot = path.resolve(scriptDir, "..");
const dataRoot = path.join(docsRoot, "data");
const registriesPath = path.join(dataRoot, "registries.yml");
const globalRulesPath = path.join(dataRoot, "rules-v2", "global-rules.yml");
const legacyKeywordsPath = path.join(dataRoot, "keywords.yml");
const legacyStatusesPath = path.join(dataRoot, "status-effects.yml");
const legacyTermsPath = path.join(dataRoot, "terms.yml");
const strict = process.argv.includes("--strict");

const readYaml = async (filename) => YAML.parse(await fs.readFile(filename, "utf8"));
const isObject = (value) => Boolean(value) && typeof value === "object" && !Array.isArray(value);
const push = (list, filename, message) => list.push(`${filename}: ${message}`);

const requireVersion2 = (data, filename, errors) => {
  if (data?.schemaVersion !== 2) push(errors, filename, "expected schemaVersion: 2.");
  if (data?.rulesVersion !== 2) push(errors, filename, "expected rulesVersion: 2.");
};

const collectLegacyIds = (data, root, filename, errors) => {
  if (!Array.isArray(data?.[root])) {
    push(errors, filename, `missing ${root} array.`);
    return new Set();
  }
  return new Set(data[root].map((entry) => entry?.id).filter(Boolean));
};

const validateRegistries = (data, errors, warnings) => {
  const filename = "registries.yml";
  requireVersion2(data, filename, errors);
  if (!isObject(data?.registries)) {
    push(errors, filename, "missing registries object.");
    return {};
  }

  const requiredKeys = [
    "actionTypes",
    "damageTypes",
    "properties",
    "sourceSystemTags",
    "ranges",
    "areas",
    "attackTags",
    "effectTags",
    "roles",
    "combatArchetypes",
    "capabilities",
    "lineupArchetypes",
    "speeds",
    "lifecycleDestinations",
    "timings",
    "scopes",
  ];

  const globalIds = new Set();
  const idsByRegistry = {};
  let entryCount = 0;

  for (const key of requiredKeys) {
    const entries = data.registries[key];
    if (!Array.isArray(entries)) {
      push(errors, filename, `missing registry array "${key}".`);
      idsByRegistry[key] = new Set();
      continue;
    }
    const localIds = new Set();
    idsByRegistry[key] = localIds;
    for (const [index, entry] of entries.entries()) {
      const label = `${key}[${index}]`;
      entryCount += 1;
      if (!isObject(entry)) {
        push(errors, filename, `${label} must be an object.`);
        continue;
      }
      for (const field of ["id", "name", "category", "description", "rules", "deprecated"]) {
        if (!(field in entry)) push(errors, filename, `${label} missing "${field}".`);
      }
      if (typeof entry.id !== "string" || !entry.id.trim()) {
        push(errors, filename, `${label} has invalid id.`);
      } else {
        if (localIds.has(entry.id)) push(errors, filename, `${key} duplicates id "${entry.id}".`);
        if (globalIds.has(entry.id)) push(errors, filename, `registry id "${entry.id}" is duplicated across registries.`);
        localIds.add(entry.id);
        globalIds.add(entry.id);
      }
      if (typeof entry.name !== "string" || !entry.name.trim()) push(errors, filename, `${label} has invalid name.`);
      if (typeof entry.category !== "string" || !entry.category.trim()) push(errors, filename, `${label} has invalid category.`);
      if (typeof entry.description !== "string" || !entry.description.trim()) {
        push(errors, filename, `${label} has invalid description.`);
      }
      if (!Array.isArray(entry.rules)) push(errors, filename, `${label}.rules must be an array.`);
      if (typeof entry.deprecated !== "boolean") push(errors, filename, `${label}.deprecated must be boolean.`);
      if (entry.description?.includes("TODO")) push(warnings, filename, `${label} description still contains TODO.`);
    }
  }

  return { ...idsByRegistry, globalIds, entryCount };
};

const requireRegistryRef = (value, allowed, filename, label, errors) => {
  if (!allowed?.has(value)) push(errors, filename, `${label} references unknown registry id "${value}".`);
};

const validateOverrideList = ({
  entries,
  label,
  filename,
  legacyIds,
  replacementPrefix,
  errors,
}) => {
  if (!Array.isArray(entries)) {
    push(errors, filename, `${label} must be an array.`);
    return 0;
  }
  const ids = new Set();
  for (const [index, entry] of entries.entries()) {
    const entryLabel = `${label}[${index}]`;
    if (!isObject(entry)) {
      push(errors, filename, `${entryLabel} must be an object.`);
      continue;
    }
    for (const field of ["id", "name", "replaces"]) {
      if (typeof entry[field] !== "string" || !entry[field].trim()) {
        push(errors, filename, `${entryLabel} missing valid "${field}".`);
      }
    }
    if (ids.has(entry.id)) push(errors, filename, `${label} duplicates id "${entry.id}".`);
    ids.add(entry.id);
    const expectedPrefix = `docs/data/${replacementPrefix}#`;
    if (!entry.replaces?.startsWith(expectedPrefix)) {
      push(errors, filename, `${entryLabel}.replaces must start with "${expectedPrefix}".`);
    } else {
      const replacedId = entry.replaces.slice(expectedPrefix.length);
      if (!legacyIds.has(replacedId)) {
        push(errors, filename, `${entryLabel} replaces missing legacy id "${replacedId}".`);
      }
    }
  }
  return entries.length;
};

const validateCriticalValues = (data, registries, errors) => {
  const filename = "rules-v2/global-rules.yml";
  const core = data?.coreRules;
  if (!isObject(core)) {
    push(errors, filename, "missing coreRules object.");
    return;
  }

  const requiredSections = [
    "turnAndEconomy",
    "positions",
    "targeting",
    "defense",
    "timing",
    "clashAndRolls",
    "area",
    "cardFlow",
    "lifecycle",
    "statuses",
    "damageAndMath",
    "defeatAndRecovery",
    "randomness",
    "crossover",
  ];
  for (const section of requiredSections) {
    if (!isObject(core[section])) push(errors, filename, `missing coreRules.${section}.`);
  }

  const checks = [
    [core?.turnAndEconomy?.energy?.turnStartValue === 5, "Energy Turn Start value must remain 5."],
    [core?.turnAndEconomy?.hand?.drawTarget === 5, "Draw target must remain 5."],
    [core?.positions?.columnsPerTeam === 3, "Each team must retain 3 fixed columns."],
    [core?.positions?.emptyPositionsBreakAdjacency === true, "Empty positions must break adjacency."],
    [core?.targeting?.targetChanges?.maximumPerCardUse === 1, "Post-play target changes must remain capped at 1."],
    [core?.timing?.alwaysIsContinuous === true, "Always must remain continuous."],
    [core?.timing?.becomesReevaluation === "between_timing_steps", "Becomes must reevaluate between timing steps."],
    [core?.clashAndRolls?.clashRollSeparateFromUseRoll === true, "Clash and Use Rolls must remain separate."],
    [core?.lifecycle?.exhaust?.timing === "after_resolution", "Exhaust must occur after resolution."],
    [core?.statuses?.uniqueStatusGenericRemoval === "immune", "Unique statuses must remain generically removal-immune by default."],
    [core?.defeatAndRecovery?.resurrection?.returnedHpRequired === true, "Resurrection must require returned HP."],
    [core?.randomness?.defaultSelection === "uniform", "Default randomness must remain uniform."],
  ];
  for (const [ok, message] of checks) if (!ok) push(errors, filename, message);

  for (const ref of core?.damageAndMath?.broadDamageTypes ?? []) {
    requireRegistryRef(ref, registries.damageTypes, filename, "broadDamageTypes", errors);
  }
  for (const [areaName, areaRule] of Object.entries(core?.area ?? {})) {
    if (!isObject(areaRule) || !areaRule.registryId) continue;
    requireRegistryRef(areaRule.registryId, registries.areas, filename, `coreRules.area.${areaName}.registryId`, errors);
  }

  const lifecycleRefs = [
    [core?.lifecycle?.exhaust?.destination, "coreRules.lifecycle.exhaust.destination"],
    [core?.lifecycle?.ethereal?.destination, "coreRules.lifecycle.ethereal.destination"],
    [core?.lifecycle?.ultimate?.defaultAfterResolution, "coreRules.lifecycle.ultimate.defaultAfterResolution"],
    [core?.lifecycle?.defeatReserve?.destination, "coreRules.lifecycle.defeatReserve.destination"],
    [core?.defeatAndRecovery?.resurrection?.startingCardsDestination, "coreRules.defeatAndRecovery.resurrection.startingCardsDestination"],
    [core?.defeatAndRecovery?.resurrection?.ultimatesDestination, "coreRules.defeatAndRecovery.resurrection.ultimatesDestination"],
  ];
  for (const [ref, label] of lifecycleRefs) {
    requireRegistryRef(ref, registries.lifecycleDestinations, filename, label, errors);
  }
};

const main = async () => {
  const errors = [];
  const warnings = [];
  const [registriesData, globalRules, legacyKeywords, legacyStatuses, legacyTerms] = await Promise.all([
    readYaml(registriesPath),
    readYaml(globalRulesPath),
    readYaml(legacyKeywordsPath),
    readYaml(legacyStatusesPath),
    readYaml(legacyTermsPath),
  ]);

  const registries = validateRegistries(registriesData, errors, warnings);
  requireVersion2(globalRules, "rules-v2/global-rules.yml", errors);
  if (globalRules?.status !== "approved_parallel_reference") {
    push(errors, "rules-v2/global-rules.yml", "status must be approved_parallel_reference during staged migration.");
  }
  if (globalRules?.transition?.mode !== "overlay") {
    push(errors, "rules-v2/global-rules.yml", "transition.mode must be overlay during staged migration.");
  }
  if (globalRules?.transition?.legacyFilesRemainCanonicalForRulesVersion1 !== true) {
    push(errors, "rules-v2/global-rules.yml", "must preserve Rules v1 file authority during transition.");
  }

  validateCriticalValues(globalRules, registries, errors);

  const keywordIds = collectLegacyIds(legacyKeywords, "keywords", "keywords.yml", errors);
  const statusIds = collectLegacyIds(legacyStatuses, "statusEffects", "status-effects.yml", errors);
  const termIds = collectLegacyIds(legacyTerms, "terms", "terms.yml", errors);

  const keywordCount = validateOverrideList({
    entries: globalRules.keywordOverrides,
    label: "keywordOverrides",
    filename: "rules-v2/global-rules.yml",
    legacyIds: keywordIds,
    replacementPrefix: "keywords.yml",
    errors,
  });
  const statusCount = validateOverrideList({
    entries: globalRules.statusOverrides,
    label: "statusOverrides",
    filename: "rules-v2/global-rules.yml",
    legacyIds: statusIds,
    replacementPrefix: "status-effects.yml",
    errors,
  });
  const termCount = validateOverrideList({
    entries: globalRules.termOverrides,
    label: "termOverrides",
    filename: "rules-v2/global-rules.yml",
    legacyIds: termIds,
    replacementPrefix: "terms.yml",
    errors,
  });

  const stun = globalRules.statusOverrides?.find((entry) => entry.id === "status-stun");
  if (stun?.mode !== "binary" || stun?.rules?.blockAlliedCharacters !== false) {
    push(errors, "rules-v2/global-rules.yml", "Stun must be binary and character-scoped, not team-scoped.");
  }
  const taunt = globalRules.statusOverrides?.find((entry) => entry.id === "status-taunt");
  if (taunt?.legacyDefaultVariant !== "all") {
    push(errors, "rules-v2/global-rules.yml", "legacy Taunt must migrate to Taunt (All).");
  }
  const exhaust = globalRules.keywordOverrides?.find((entry) => entry.id === "keyword-exhaust");
  if (exhaust?.rules?.timing !== "after_resolution") {
    push(errors, "rules-v2/global-rules.yml", "Exhaust override must use after_resolution timing.");
  }

  warnings.forEach((warning) => console.warn(`Warning: ${warning}`));
  errors.forEach((error) => console.error(`Error: ${error}`));
  console.log(
    `Rules v2 global validation: ${registries.entryCount ?? 0} registry entry(s), ` +
      `${keywordCount} keyword override(s), ${statusCount} status override(s), ` +
      `${termCount} term override(s), ${errors.length} error(s), ${warnings.length} warning(s).`
  );
  if (errors.length || (strict && warnings.length)) process.exitCode = 1;
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
