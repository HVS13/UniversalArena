import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import YAML from "yaml";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const docsRoot = path.resolve(scriptDir, "..");
const dataRoot = path.join(docsRoot, "data");
const charactersDir = path.join(dataRoot, "characters");
const registriesPath = path.join(dataRoot, "registries.yml");
const strict = process.argv.includes("--strict");
const allowV1 = process.argv.includes("--allow-v1");

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

const readYaml = async (filename) => YAML.parse(await fs.readFile(filename, "utf8"));
const isObject = (value) => Boolean(value) && typeof value === "object" && !Array.isArray(value);
const push = (list, filename, message) => list.push(`${filename}: ${message}`);

const collectRegistry = (registries, key, errors) => {
  const entries = registries?.registries?.[key];
  if (!Array.isArray(entries)) {
    errors.push(`registries.yml: missing registry array \"${key}\".`);
    return new Set();
  }
  const ids = new Set();
  for (const [index, entry] of entries.entries()) {
    if (!entry?.id) errors.push(`registries.yml: ${key}[${index}] missing id.`);
    else if (ids.has(entry.id)) errors.push(`registries.yml: duplicate ${key} id \"${entry.id}\".`);
    else ids.add(entry.id);
  }
  return ids;
};

const validateRegistryRefs = (values, allowed, filename, label, errors) => {
  if (!Array.isArray(values)) {
    push(errors, filename, `${label} must be an array.`);
    return;
  }
  for (const value of values) {
    if (!allowed.has(value)) push(errors, filename, `${label} references unknown id \"${value}\".`);
  }
};

const validateEffects = (effects, filename, label, registries, errors, warnings) => {
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
    else if (ids.has(effect.id)) push(errors, filename, `${effectLabel} duplicates id \"${effect.id}\".`);
    else ids.add(effect.id);
    if (!registries.timings.has(effect.timing)) {
      push(errors, filename, `${effectLabel} has unknown timing \"${effect.timing}\".`);
    }
    if (!registries.scopes.has(effect.scope)) {
      push(errors, filename, `${effectLabel} has unknown scope \"${effect.scope}\".`);
    }
    if (!EFFECT_PRIMITIVES.has(effect.type)) {
      push(errors, filename, `${effectLabel} uses unregistered primitive \"${effect.type}\".`);
    }
    if (effect.options) {
      for (const [optionIndex, option] of effect.options.entries()) {
        validateEffects(
          option?.effects,
          filename,
          `${effectLabel}.options[${optionIndex}].effects`,
          registries,
          errors,
          warnings
        );
      }
    }
    if (effect.type === "resurrect" && effect.hp === undefined && effect.amount === undefined) {
      push(errors, filename, `${effectLabel} resurrect must specify returned HP.`);
    }
    if (effect.type === "spend_status" && effect.failureBehavior === undefined && effect.gateAll === undefined) {
      push(warnings, filename, `${effectLabel} spend_status should define failure behavior.`);
    }
  }
};

const validateStatus = (status, filename, index, registries, errors, warnings) => {
  const label = `statusEffects[${index}]`;
  if (!status?.id) push(errors, filename, `${label} missing id.`);
  if (!STATUS_MODES.has(status?.mode)) push(errors, filename, `${label} has invalid mode \"${status?.mode}\".`);
  if (!isObject(status?.persistence)) push(errors, filename, `${label} missing persistence.`);
  validateEffects(status?.rules ?? [], filename, `${label}.rules`, registries, errors, warnings);
  if (status?.migrationStatus === "review_required") {
    push(warnings, filename, `${label} (${status.name}) still requires typed-rule review.`);
  }
  if (status?.mode === "potency_count") {
    if (status?.caps?.potency == null || status?.caps?.count == null) {
      push(errors, filename, `${label} potency_count requires potency and count caps.`);
    }
  }
};

const validateCard = (card, filename, label, characterId, registries, cardIds, errors, warnings) => {
  if (!isObject(card)) {
    push(errors, filename, `${label} must be an object.`);
    return;
  }
  if (!card.id) push(errors, filename, `${label} missing id.`);
  else if (cardIds.has(card.id)) push(errors, filename, `${label} duplicates card id \"${card.id}\".`);
  else cardIds.add(card.id);
  if (!card.slotId) push(errors, filename, `${label} missing slotId.`);
  if (!CARD_ORIGINS.has(card.cardOrigin)) push(errors, filename, `${label} invalid cardOrigin.`);
  if (!OWNER_KINDS.has(card?.owner?.kind)) push(errors, filename, `${label} invalid owner kind.`);
  if (card?.owner?.kind === "character" && card.owner.characterId !== characterId) {
    push(errors, filename, `${label} owner.characterId must equal character id \"${characterId}\".`);
  }
  validateRegistryRefs(card.actionTypes, registries.actionTypes, filename, `${label}.actionTypes`, errors);
  validateRegistryRefs(card.damageTypes, registries.damageTypes, filename, `${label}.damageTypes`, errors);
  validateRegistryRefs(card.properties, registries.properties, filename, `${label}.properties`, errors);
  validateRegistryRefs(
    card.sourceSystemTags,
    registries.sourceSystemTags,
    filename,
    `${label}.sourceSystemTags`,
    errors
  );
  validateRegistryRefs(card.attackTags, registries.attackTags, filename, `${label}.attackTags`, errors);
  validateRegistryRefs(card.effectTags, registries.effectTags, filename, `${label}.effectTags`, errors);
  if (card.range != null && !registries.ranges.has(card.range)) {
    push(errors, filename, `${label}.range references unknown id \"${card.range}\".`);
  }
  if (card.area?.kind && !registries.areas.has(card.area.kind)) {
    push(errors, filename, `${label}.area references unknown id \"${card.area.kind}\".`);
  }
  if (card.speed && !registries.speeds.has(card.speed)) {
    push(errors, filename, `${label}.speed references unknown id \"${card.speed}\".`);
  }
  if (!TARGET_LOCKS.has(card?.target?.lockMode)) push(errors, filename, `${label} invalid target lock mode.`);
  if (!isObject(card.lifecycle)) push(errors, filename, `${label} missing lifecycle.`);
  else {
    for (const field of LIFECYCLE_FIELDS) {
      if (!(field in card.lifecycle)) push(errors, filename, `${label}.lifecycle missing ${field}.`);
      else if (!registries.lifecycleDestinations.has(card.lifecycle[field])) {
        push(errors, filename, `${label}.lifecycle.${field} unknown destination \"${card.lifecycle[field]}\".`);
      }
    }
  }
  if (card.actionTypes?.includes("action-created")) {
    push(errors, filename, `${label} stores Created as an Action Type.`);
  }
  if (card.damageTypes?.includes("damage-electric")) {
    push(errors, filename, `${label} still treats Electric as a Damage Type.`);
  }
  if (card.properties?.includes("property-electric") && card.damageTypes?.length === 0) {
    push(warnings, filename, `${label} is Electric but has no broad Damage Type.`);
  }
  validateEffects(card.effects, filename, `${label}.effects`, registries, errors, warnings);
  if (!Array.isArray(card.transforms)) push(errors, filename, `${label}.transforms must be an array.`);
  if (!Array.isArray(card.restrictions)) push(errors, filename, `${label}.restrictions must be an array.`);
  if (!Array.isArray(card.sourceBasis)) push(errors, filename, `${label}.sourceBasis must be an array.`);
};

const validateCharacter = (data, filename, registries, errors, warnings) => {
  if (!isObject(data)) {
    push(errors, filename, "file did not parse into an object.");
    return;
  }
  if (data.schemaVersion !== 2 || data.rulesVersion !== 2) {
    if (allowV1) {
      push(warnings, filename, "still uses Rules/Schema v1.");
      return;
    }
    push(errors, filename, "must declare schemaVersion: 2 and rulesVersion: 2.");
    return;
  }
  for (const field of ["id", "characterId", "versionId", "name", "version", "origin", "art"]) {
    if (data[field] == null || data[field] === "") push(errors, filename, `missing ${field}.`);
  }
  if (!registries.roles.has(data?.role?.primary)) push(errors, filename, "invalid Primary Core Role.");
  if (data?.role?.secondary != null && !registries.roles.has(data.role.secondary)) {
    push(errors, filename, "invalid Secondary Core Role.");
  }
  if (data?.role?.secondary === data?.role?.primary) push(errors, filename, "Primary and Secondary roles must differ.");
  validateRegistryRefs(data.archetypes, registries.combatArchetypes, filename, "archetypes", errors);
  if ((data.archetypes ?? []).length > 2) push(warnings, filename, "has more than two Combat Archetypes.");
  validateRegistryRefs(data.capabilities, registries.capabilities, filename, "capabilities", errors);
  if (!isObject(data.sourceBoundary)) push(errors, filename, "missing sourceBoundary.");
  if (!isObject(data.design)) push(errors, filename, "missing design metadata.");
  for (const field of ["continuity", "start", "end", "baselineState", "knowledgeBoundary", "personalityBoundary"]) {
    if (data?.sourceBoundary?.[field] === "review_required") push(warnings, filename, `sourceBoundary.${field} requires review.`);
  }
  for (const field of ["weakness", "powerExpression"]) {
    if (data?.design?.[field] === "review_required") push(warnings, filename, `design.${field} requires review.`);
  }

  const cardIds = new Set();
  const allCards = [...(data.cards ?? []), ...(data.createdCards ?? [])];
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
        push(errors, filename, `allCards[${cardIndex}] transform references missing card \"${transform.replacementCardId}\".`);
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
          push(errors, filename, `ultimatePathways[${index}] references missing card \"${variant.cardId}\".`);
        }
        if (pathwayCards.has(variant.cardId)) {
          push(errors, filename, `Ultimate card \"${variant.cardId}\" belongs to multiple pathways.`);
        }
        pathwayCards.add(variant.cardId);
      }
    }
    const ultimateCards = (data.cards ?? []).filter((card) => card.actionTypes?.includes("action-ultimate"));
    for (const card of ultimateCards) {
      if (!pathwayCards.has(card.id)) push(errors, filename, `Ultimate card \"${card.id}\" has no pathway.`);
    }
  }

  (data.statusEffects ?? []).forEach((status, index) =>
    validateStatus(status, filename, index, registries, errors, warnings)
  );
  for (const [index, innate] of (data.innates ?? []).entries()) {
    if (!innate.id) push(errors, filename, `innates[${index}] missing id.`);
    validateEffects(innate.setup ?? [], filename, `innates[${index}].setup`, registries, errors, warnings);
    for (const [triggerIndex, trigger] of (innate.triggers ?? []).entries()) {
      if (!trigger.id) push(errors, filename, `innates[${index}].triggers[${triggerIndex}] missing id.`);
      validateEffects(
        trigger.effects ?? [],
        filename,
        `innates[${index}].triggers[${triggerIndex}].effects`,
        registries,
        errors,
        warnings
      );
    }
  }
};

const main = async () => {
  const errors = [];
  const warnings = [];
  const registryData = await readYaml(registriesPath);
  if (registryData?.schemaVersion !== 2 || registryData?.rulesVersion !== 2) {
    errors.push("registries.yml: expected schemaVersion: 2 and rulesVersion: 2.");
  }
  const registryKeys = [
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
  const registries = Object.fromEntries(
    registryKeys.map((key) => [key, collectRegistry(registryData, key, errors)])
  );

  const files = (await fs.readdir(charactersDir)).filter((file) => /\.ya?ml$/i.test(file)).sort();
  for (const filename of files) {
    const data = await readYaml(path.join(charactersDir, filename));
    validateCharacter(data, filename, registries, errors, warnings);
  }

  warnings.forEach((warning) => console.warn(`Warning: ${warning}`));
  errors.forEach((error) => console.error(`Error: ${error}`));
  console.log(`Rules v2 validation: ${files.length} character file(s), ${errors.length} error(s), ${warnings.length} warning(s).`);
  if (errors.length || (strict && warnings.length)) process.exitCode = 1;
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
