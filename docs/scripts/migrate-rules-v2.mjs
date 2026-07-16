import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import YAML from "yaml";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const docsRoot = path.resolve(scriptDir, "..");
const dataRoot = path.join(docsRoot, "data");
const defaultCharactersDir = path.join(dataRoot, "characters");
const overridesPath = path.join(dataRoot, "migrations", "rules-v2-overrides.yml");
const globalStatusesPath = path.join(dataRoot, "status-effects.yml");

const hasArg = (name) => process.argv.includes(name);
const argValue = (name, fallback = null) => {
  const index = process.argv.indexOf(name);
  return index === -1 ? fallback : process.argv[index + 1] ?? fallback;
};

const writeMode = hasArg("--write");
const checkMode = hasArg("--check") || !writeMode;
const charactersDir = path.resolve(argValue("--characters-dir", defaultCharactersDir));
const reportPath = path.resolve(
  argValue("--report", path.join(dataRoot, "migrations", "rules-v2-migration-report.json"))
);

const ACTION_TYPES = new Map([
  ["Basic", "action-basic"],
  ["Technique", "action-technique"],
  ["Ultimate", "action-ultimate"],
  ["Attack", "action-attack"],
  ["Defense", "action-defense"],
  ["Special", "action-special"],
]);
const DAMAGE_TYPES = new Map([
  ["Physical", "damage-physical"],
  ["Energy", "damage-energy"],
  ["Magical", "damage-magical"],
  ["Mental", "damage-mental"],
  ["Spiritual", "damage-spiritual"],
]);
const PROPERTIES = new Map([
  ["Electric", "property-electric"],
  ["Fire", "property-fire"],
  ["Ice", "property-ice"],
  ["Sonic", "property-sonic"],
  ["Explosive", "property-explosive"],
  ["Radiation", "property-radiation"],
  ["Acid", "property-acid"],
]);
const RANGES = new Map([
  ["Melee", "range-melee"],
  ["Ranged", "range-ranged"],
]);
const AREAS = new Map([
  ["AoE", "area-aoe"],
  ["Splash", "area-splash"],
  ["Bounce", "area-bounce"],
]);
const ATTACK_TAGS = new Map([
  ["Slash", "attack-slash"],
  ["Pierce", "attack-pierce"],
  ["Blunt", "attack-blunt"],
  ["Multihit", "attack-multihit"],
]);
const EFFECT_TAGS = new Map([
  ["Transformation", "effect-transformation"],
  ["Recovery", "effect-recovery"],
  ["Buff", "effect-buff"],
  ["Debuff", "effect-debuff"],
  ["Equipment", "effect-equipment"],
  ["Summon", "effect-summon"],
  ["Information", "effect-information"],
]);

const readYaml = async (filename) => YAML.parse(await fs.readFile(filename, "utf8"));
const writeYaml = async (filename, value) => {
  const text = YAML.stringify(value, { lineWidth: 100, minContentWidth: 20 });
  await fs.writeFile(filename, text, "utf8");
};

const slugify = (value) =>
  String(value ?? "")
    .normalize("NFKD")
    .replace(/[’']/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();

const unique = (values) => [...new Set(values.filter(Boolean))];
const clone = (value) => (value === undefined ? undefined : structuredClone(value));
const isObject = (value) => Boolean(value) && typeof value === "object" && !Array.isArray(value);

const scalarFromToken = (token) => {
  if (token == null) return null;
  if (String(token).toUpperCase() === "X") return { kind: "x" };
  const value = Number(token);
  return Number.isFinite(value) ? { kind: "flat", value } : null;
};

const parseCost = (raw, warnings, label) => {
  const text = String(raw ?? "").trim();
  const energyMatch = text.match(/\b(\d+|X)\s*Energy\b/i);
  const meterMatch = text.match(/\b(\d+|X)\s*(?:Ultimate(?:\s+Meter)?|Meter)\b/i);
  const energy = energyMatch ? scalarFromToken(energyMatch[1]) : { kind: "flat", value: 0 };
  const ultimateMeter = meterMatch ? scalarFromToken(meterMatch[1]) : null;
  if (!energyMatch && !meterMatch && text && text !== "-") {
    warnings.push(`${label}: could not fully parse cost \"${text}\"; preserved in display.cost.`);
  }
  return { energy, ultimateMeter, additionalCosts: [] };
};

const parsePower = (raw, warnings, label) => {
  const text = String(raw ?? "").trim();
  if (!text || text === "-") return { kind: "none" };
  const range = text.match(/^(-?\d+)\s*[-–]\s*(-?\d+)$/);
  if (range) return { kind: "range", min: Number(range[1]), max: Number(range[2]) };
  const fixed = text.match(/^-?\d+$/);
  if (fixed) return { kind: "fixed", value: Number(text) };
  warnings.push(`${label}: could not parse Power \"${text}\"; using custom display-only power.`);
  return { kind: "custom", display: text };
};

const parseTarget = (raw) => {
  const text = String(raw ?? "").trim();
  const normalized = text.toLowerCase();
  if (normalized === "self") {
    return {
      kind: "character",
      allegiance: "self",
      count: 1,
      selection: "chosen",
      lockMode: "character",
      filters: [],
      fallback: "fail_target_effects",
    };
  }
  const allMatch = normalized.match(/^all\s+(enemies|allies|characters)$/);
  if (allMatch) {
    const allegiance = allMatch[1] === "enemies" ? "enemy" : allMatch[1] === "allies" ? "ally" : "any";
    return {
      kind: "character",
      allegiance,
      count: "all",
      selection: "all",
      lockMode: "character",
      filters: [],
      fallback: "fail_target_effects",
    };
  }
  const countMatch = normalized.match(/^(\d+)\s+(enemy|enemies|ally|allies|other ally|character|characters)$/);
  if (countMatch) {
    const noun = countMatch[2];
    const allegiance = noun.startsWith("enem")
      ? "enemy"
      : noun === "other ally"
        ? "other_ally"
        : noun.startsWith("all")
          ? "ally"
          : "any";
    return {
      kind: "character",
      allegiance,
      count: Number(countMatch[1]),
      selection: "chosen",
      lockMode: "character",
      filters: [],
      fallback: "fail_target_effects",
    };
  }
  return {
    kind: "custom",
    display: text,
    selection: "chosen",
    lockMode: "object",
    filters: [],
    fallback: "fail_target_effects",
  };
};

const splitTypes = (types, warnings, label) => {
  const actionTypes = [];
  const damageTypes = [];
  const properties = [];
  const attackTags = [];
  const effectTags = [];
  let range = null;
  let area = null;
  const unknown = [];

  for (const type of types ?? []) {
    if (ACTION_TYPES.has(type)) actionTypes.push(ACTION_TYPES.get(type));
    else if (DAMAGE_TYPES.has(type)) damageTypes.push(DAMAGE_TYPES.get(type));
    else if (PROPERTIES.has(type)) properties.push(PROPERTIES.get(type));
    else if (RANGES.has(type)) range = RANGES.get(type);
    else if (AREAS.has(type)) area = { kind: AREAS.get(type) };
    else if (ATTACK_TAGS.has(type)) attackTags.push(ATTACK_TAGS.get(type));
    else if (EFFECT_TAGS.has(type)) effectTags.push(EFFECT_TAGS.get(type));
    else unknown.push(type);
  }

  if (properties.includes("property-electric") && damageTypes.length === 0) {
    damageTypes.push("damage-energy");
    warnings.push(`${label}: Electric had no broad Damage Type; migrated to Energy + Electric.`);
  }
  if (unknown.length) warnings.push(`${label}: unmapped legacy types: ${unknown.join(", ")}.`);

  return {
    actionTypes: unique(actionTypes),
    damageTypes: unique(damageTypes),
    properties: unique(properties),
    range,
    area,
    attackTags: unique(attackTags),
    effectTags: unique(effectTags),
    unknownLegacyTypes: unknown,
  };
};

const normalizeAmount = (amount) => {
  if (typeof amount === "number") return { kind: "flat", value: amount };
  if (!isObject(amount)) return amount;
  const next = clone(amount);
  if (next.kind === "power_div" && typeof next.divisor === "number") {
    next.divisor = { kind: "fixed", value: next.divisor };
  }
  if (["x_plus", "x_minus", "x_times"].includes(next.kind)) {
    return {
      op: next.kind === "x_plus" ? "add" : next.kind === "x_minus" ? "subtract" : "multiply",
      left: { ref: "locked_x" },
      right: { value: next.value },
    };
  }
  return next;
};

const mapEffectType = (type) => (type === "gain_ultimate" ? "gain_ultimate_meter" : type);

const inferScope = (effect) => {
  if (effect.scope) return effect.scope;
  if (effect.timing === "on_play") return "once_per_play";
  if (effect.timing === "on_hit") return "per_hit_per_target";
  if (["after_use", "before_use"].includes(effect.timing)) return "once_per_use";
  if (["deal_damage", "inflict_status"].includes(effect.type)) return "per_target";
  if (effect.target === "target" || effect.target === "opponent") return "per_target";
  return "once_per_use";
};

const resolveStatusId = (statusName, statusIds) => {
  if (!statusName) return null;
  return statusIds.get(statusName) ?? `status-${slugify(statusName)}`;
};

const migrateCondition = (condition, statusIds, warnings, label) => {
  if (!isObject(condition)) return condition ?? null;
  const statusId = resolveStatusId(condition.status, statusIds);
  switch (condition.kind) {
    case "self_has_status":
      return { kind: "subject_has_status", subject: "owner", statusId };
    case "self_lacks_status":
      return { kind: "subject_lacks_status", subject: "owner", statusId };
    case "target_has_status":
      return { kind: "subject_has_status", subject: "target", statusId };
    case "target_lacks_status":
      return { kind: "subject_lacks_status", subject: "target", statusId };
    default:
      warnings.push(`${label}: condition kind \"${condition.kind}\" requires review.`);
      return { kind: "legacy_condition", legacy: clone(condition) };
  }
};

const migrateEffect = (effect, context) => {
  const next = clone(effect) ?? {};
  next.id = next.id ?? `${context.cardId}-${slugify(next.timing ?? "on-use")}-${slugify(next.type ?? "effect")}-${context.index + 1}`;
  next.type = mapEffectType(next.type);
  next.scope = inferScope(next);
  if (next.amount !== undefined) next.amount = normalizeAmount(next.amount);
  if (next.count !== undefined) next.count = normalizeAmount(next.count);
  if (next.hits !== undefined) next.hits = normalizeAmount(next.hits);
  if (next.condition !== undefined) {
    next.condition = migrateCondition(next.condition, context.statusIds, context.warnings, `${context.label}.${next.id}`);
  }
  if (next.status) {
    next.statusId = resolveStatusId(next.status, context.statusIds);
    delete next.status;
  }
  if (next.target !== undefined) {
    next.targetRef = next.target === "self" ? "owner" : next.target === "opponent" ? "opposing_team" : "locked_target";
    delete next.target;
  } else if (["deal_damage", "inflict_status"].includes(next.type)) {
    next.targetRef = "locked_target";
  }
  if (next.keyword) {
    next.keywordId = `keyword-${slugify(next.keyword)}`;
    delete next.keyword;
  }
  if (next.cardName) {
    next.cardRef = `created-${slugify(next.cardName)}`;
  }
  if (next.options) {
    next.options = next.options.map((option, optionIndex) => ({
      ...clone(option),
      effects: (option.effects ?? []).map((nested, nestedIndex) =>
        migrateEffect(nested, {
          ...context,
          index: nestedIndex,
          cardId: `${context.cardId}-option-${optionIndex + 1}`,
        })
      ),
    }));
  }
  return next;
};

const parseStatusMode = (lines) => {
  const text = (lines ?? []).join("\n");
  const value = text.match(/Max Value:\s*(\d+)/i);
  const stack = text.match(/Max Stack:\s*(\d+)/i);
  const potency = text.match(/Potency:\s*Max\s*(\d+)/i) ?? text.match(/Max Potency:\s*(\d+)/i);
  const count = text.match(/Count:\s*Max\s*(\d+)/i) ?? text.match(/Max Count:\s*(\d+)/i);
  if (potency && count) {
    return { mode: "potency_count", caps: { potency: Number(potency[1]), count: Number(count[1]) } };
  }
  if (value) return { mode: "value", caps: { value: Number(value[1]) } };
  if (stack) return { mode: "stack", caps: { stack: Number(stack[1]) } };
  if (count) return { mode: "value", caps: { value: Number(count[1]) } };
  return { mode: "binary", caps: {} };
};

const migrateUniqueStatuses = (statuses, characterId, warnings) => {
  const ids = new Map();
  for (const status of statuses ?? []) ids.set(status.name, `unique-${characterId}-${slugify(status.name)}`);
  const migrated = (statuses ?? []).map((status) => {
    const parsed = parseStatusMode(status.lines);
    const executableLines = (status.lines ?? []).filter((line) => /^(On Gain|Effect|Turn End|When this expires|At |After |Before ):/i.test(line));
    if (executableLines.length) {
      warnings.push(`${characterId}: Unique status \"${status.name}\" still needs typed-rule review (${executableLines.length} display rule(s)).`);
    }
    return {
      id: ids.get(status.name),
      name: status.name,
      type: "unique",
      ...parsed,
      visibility: "public",
      persistence: {
        onDefeat: "remove",
        onSourceDefeat: "independent",
        onResurrection: "remove",
        genericCleanse: "immune",
      },
      rules: [],
      displayRules: clone(status.lines ?? []),
      migrationStatus: executableLines.length ? "review_required" : "structured",
    };
  });
  return { migrated, ids };
};

const migrateMitigationFilter = (include = {}) => {
  const types = include.types ?? [];
  const split = splitTypes(types, [], "mitigation");
  return {
    mode: include.mode ?? "any",
    damageTypes: split.damageTypes,
    properties: split.properties,
    attackTags: split.attackTags,
    range: split.range ? [split.range] : [],
  };
};

const migrateInnates = (innates, characterId, statusIds, warnings) =>
  (innates ?? []).map((innate, innateIndex) => ({
    id: innate.id ?? `${characterId}-innate-${innateIndex + 1}`,
    name: innate.name,
    displayText: innate.text ?? "",
    setup: (innate.setup ?? []).map((effect, index) =>
      migrateEffect(effect, {
        cardId: `${characterId}-${innate.id ?? `innate-${innateIndex + 1}`}-setup`,
        index,
        statusIds,
        warnings,
        label: `${characterId}.innates[${innateIndex}].setup`,
      })
    ),
    mitigations: (innate.mitigations ?? []).map((rule, index) => ({
      id: rule.id ?? `${characterId}-${innate.id ?? `innate-${innateIndex + 1}`}-mitigation-${index + 1}`,
      kind: rule.kind,
      amount: rule.amount,
      amountMode: rule.amountMode ?? "flat",
      include: migrateMitigationFilter(rule.include),
    })),
    triggers: (innate.triggers ?? []).map((trigger, triggerIndex) => {
      const migrated = {
        id: trigger.id ?? `${characterId}-${innate.id ?? `innate-${innateIndex + 1}`}-trigger-${triggerIndex + 1}`,
        event: trigger.event,
        scope: trigger.scope ?? "continuous",
        filters: clone(trigger.filters ?? {}),
        effects: (trigger.effects ?? []).map((effect, effectIndex) =>
          migrateEffect(effect, {
            cardId: `${characterId}-${trigger.id ?? `trigger-${triggerIndex + 1}`}`,
            index: effectIndex,
            statusIds,
            warnings,
            label: `${characterId}.innates[${innateIndex}].triggers[${triggerIndex}]`,
          })
        ),
      };
      if (trigger.useEventAmount) migrated.useEventAmount = true;
      if (trigger.decision) migrated.decision = clone(trigger.decision);
      return migrated;
    }),
  }));

const slotGroup = (slot, isUltimate) => {
  const text = String(slot ?? "");
  if (isUltimate) {
    const number = text.match(/ultimate-(\d+)/i)?.[1] ?? text.match(/^(\d+)-/)?.[1] ?? "1";
    return `ultimate-${number}`;
  }
  const first = text.match(/^(\d+)/)?.[1] ?? slugify(text) || "unknown";
  return `regular-${first}`;
};

const defaultResolution = (classification, hasMultihit) => ({
  clashRollMode: hasMultihit ? "per_remaining_hit_sum" : "single",
  useRollMode: hasMultihit ? "per_hit_shared_targets" : "single",
  targetBatch: classification.area ? "simultaneous" : "sequential",
  triggerOrder: "primary_then_left_to_right",
});

const inferMultihit = (card) => {
  const effect = (card.effects ?? []).find((item) => item.type === "deal_damage" && item.hits !== undefined);
  if (!effect) return null;
  const count = normalizeAmount(effect.hits);
  return {
    startingCount: count,
    clashMode: "sum_remaining_hits",
    onAttackClashLoss: { reduceCount: 1, destination: "reuse" },
    onTie: { behavior: "normal_cancel" },
    atZero: { behavior: "ordinary_single_hit_attack" },
  };
};

const migrateRestrictions = (restrictions, statusIds, warnings, label) =>
  (restrictions ?? []).map((restriction, index) => {
    const id = restriction.id ?? `${slugify(label)}-restriction-${index + 1}`;
    if (["require_window", "forbid_window"].includes(restriction.kind)) {
      return {
        id,
        timing: "play",
        kind: restriction.kind === "require_window" ? "require" : "forbid",
        condition: { kind: "response_window", window: restriction.window },
      };
    }
    if (["require", "forbid"].includes(restriction.kind)) {
      const tests = (restriction.statuses ?? []).map((status) => ({
        kind: restriction.kind === "require" ? "subject_has_status" : "subject_lacks_status",
        subject: restriction.subject === "self" ? "owner" : "target",
        statusId: resolveStatusId(status.name, statusIds),
        minimum: status.min ?? 1,
      }));
      return {
        id,
        timing: "play",
        kind: restriction.kind,
        condition: tests.length === 1 ? tests[0] : { op: restriction.mode ?? "all", conditions: tests },
      };
    }
    warnings.push(`${label}: restriction kind \"${restriction.kind}\" requires review.`);
    return { id, timing: "play", kind: "legacy", legacy: clone(restriction) };
  });

const buildUltimatePathways = (cards) => {
  const ultimateCards = cards.filter((card) => card.actionTypes.includes("action-ultimate"));
  const referenced = new Set(
    ultimateCards.flatMap((card) => (card.transforms ?? []).map((transform) => transform.replacementCardId))
  );
  const roots = ultimateCards.filter((card) => !referenced.has(card.id));
  return roots.map((root, index) => {
    const variants = [];
    const queue = [root];
    const seen = new Set();
    while (queue.length) {
      const current = queue.shift();
      if (!current || seen.has(current.id)) continue;
      seen.add(current.id);
      variants.push({ cardId: current.id, availability: current.availability ?? null });
      for (const transform of current.transforms ?? []) {
        queue.push(ultimateCards.find((card) => card.id === transform.replacementCardId));
      }
    }
    return {
      id: `ultimate-pathway-${index + 1}`,
      name: root.name,
      lifecycle: { kind: "repeatable", returnDestination: "destination-ultimate-area" },
      variants,
    };
  });
};

const migrateCharacter = (legacy, filename, override, globalStatusIds) => {
  const warnings = [];
  const characterId = legacy.id;
  const uniqueStatuses = migrateUniqueStatuses(legacy.statusEffects, characterId, warnings);
  const statusIds = new Map([...globalStatusIds, ...uniqueStatuses.ids]);

  const allLegacyCards = [
    ...(legacy.cards ?? []).map((card) => ({ ...card, __collection: "cards" })),
    ...(legacy.createdCards ?? []).map((card) => ({ ...card, __collection: "createdCards" })),
  ];
  const legacySlotToId = new Map();
  for (const card of allLegacyCards) {
    const id = `${characterId}-${slugify(card.slot ?? card.name)}`;
    legacySlotToId.set(String(card.slot ?? card.name), id);
  }
  const referencedSlots = new Set(
    allLegacyCards.flatMap((card) => (card.transforms ?? []).map((transform) => String(transform.cardSlot)))
  );

  const cards = allLegacyCards.map((card, cardIndex) => {
    const label = `${filename}:${card.name}`;
    const classification = splitTypes(card.types, warnings, label);
    const isUltimate = classification.actionTypes.includes("action-ultimate");
    const id = legacySlotToId.get(String(card.slot ?? card.name));
    const cardOrigin = card.__collection === "createdCards"
      ? "created"
      : referencedSlots.has(String(card.slot))
        ? "generated_variant"
        : "starting";
    const hasMultihit = classification.attackTags.includes("attack-multihit");
    const migratedEffects = (card.effects ?? []).map((effect, index) =>
      migrateEffect(effect, { cardId: id, index, statusIds, warnings, label })
    );
    const migrated = {
      id,
      slotId: slotGroup(card.slot, isUltimate),
      cardOrigin,
      owner: { kind: "character", characterId },
      name: card.name,
      cost: parseCost(card.cost, warnings, label),
      power: parsePower(card.power, warnings, label),
      speed: `speed-${slugify(card.speed ?? "Normal")}`,
      actionTypes: classification.actionTypes,
      damageTypes: classification.damageTypes,
      properties: classification.properties,
      sourceSystemTags: clone(override?.sourceSystemTags ?? []),
      range: classification.range,
      area: classification.area,
      attackTags: classification.attackTags,
      effectTags: classification.effectTags,
      target: parseTarget(card.target),
      resolution: defaultResolution(classification, hasMultihit),
      lifecycle: {
        afterResolution: isUltimate ? "destination-ultimate-area" : "destination-discard",
        ifCancelled: isUltimate ? "destination-ultimate-area" : "destination-discard",
        ifNegated: isUltimate ? "destination-ultimate-area" : "destination-discard",
        ifUnusedAtTurnEnd: "destination-discard",
        onOwnerDefeat: "destination-defeat-reserve",
        onResurrection: isUltimate ? "destination-ultimate-area" : "destination-discard",
      },
      effects: migratedEffects,
      continuousRules: [],
      transforms: (card.transforms ?? []).map((transform, index) => ({
        id: `${id}-transform-${index + 1}`,
        priority: 100 - index,
        condition: migrateCondition(transform.condition, statusIds, warnings, `${label}.transforms[${index}]`),
        replacementCardId: legacySlotToId.get(String(transform.cardSlot)) ?? `${characterId}-${slugify(transform.cardSlot)}`,
      })),
      restrictions: migrateRestrictions(card.restrictions, statusIds, warnings, label),
      sourceBasis: [],
      display: {
        slot: card.slot,
        cost: card.cost,
        power: card.power,
        types: clone(card.types ?? []),
        target: card.target,
        speed: card.speed,
        effect: clone(card.effect ?? []),
      },
    };
    const multihit = inferMultihit(card);
    if (multihit) migrated.multihit = multihit;
    if (classification.unknownLegacyTypes.length) migrated.legacyUnmappedTypes = classification.unknownLegacyTypes;
    if (cardOrigin === "generated_variant") migrated.variantOf = migrated.slotId;
    delete card.__collection;
    return migrated;
  });

  const regularStarting = cards.filter(
    (card) => card.cardOrigin === "starting" && !card.actionTypes.includes("action-ultimate")
  );
  if (regularStarting.length !== 5) {
    warnings.push(`${filename}: expected 5 starting regular cards after transform analysis; found ${regularStarting.length}.`);
  }

  const migrated = {
    schemaVersion: 2,
    rulesVersion: 2,
    id: legacy.id,
    characterId: override?.characterId ?? slugify(legacy.name),
    versionId: override?.versionId ?? slugify(legacy.version),
    name: legacy.name,
    version: legacy.version,
    origin: legacy.origin,
    art: legacy.art,
    difficulty: legacy.difficulty,
    gameplan: legacy.gameplan,
    sourceBoundary: {
      continuity: "review_required",
      start: "review_required",
      end: "review_required",
      baselineState: "review_required",
      accessibleForms: [],
      standardEquipment: [],
      exceptionalAbilities: [],
      excludedMaterial: [],
      knowledgeBoundary: "review_required",
      personalityBoundary: "review_required",
    },
    design: {
      thesis: String(legacy.gameplan ?? "").trim(),
      weakness: "review_required",
      powerExpression: "review_required",
      signatureHax: [],
      mandatoryFeelPoints: [],
      forbiddenFeelOutcomes: [],
      complexityNotes: "Migrated from Rules v1 difficulty metadata; requires roster audit.",
    },
    role: clone(override?.role ?? { primary: "role-specialist", secondary: null }),
    archetypes: clone(override?.archetypes ?? []),
    capabilities: clone(override?.capabilities ?? []),
    economyProfile: clone(
      override?.economyProfile ?? {
        energyDemand: "medium",
        meterDemand: "medium",
        handPressure: "medium",
        setupSpeed: "setup",
      }
    ),
    synergy: clone(override?.synergy ?? { outputs: [], inputs: [], conflicts: [] }),
    innates: migrateInnates(legacy.innates, characterId, statusIds, warnings),
    statusEffects: uniqueStatuses.migrated,
    cards: cards.filter((card) => card.cardOrigin !== "created"),
    createdCards: cards.filter((card) => card.cardOrigin === "created"),
    ultimatePathways: [],
    sourceBasis: [],
    consideredButOmitted: [],
    metadata: {
      migratedFromSchemaVersion: legacy.schemaVersion ?? 1,
      legacyRoles: clone(legacy.roles ?? []),
      migrationWarnings: warnings,
    },
  };
  migrated.ultimatePathways = buildUltimatePathways(migrated.cards);
  if (!migrated.ultimatePathways.length) warnings.push(`${filename}: no Ultimate pathway was generated.`);
  return { migrated, warnings };
};

const main = async () => {
  const overrides = await readYaml(overridesPath);
  const globalStatuses = await readYaml(globalStatusesPath);
  const globalStatusIds = new Map(
    (globalStatuses?.statusEffects ?? []).map((status) => [status.name, status.id ?? `status-${slugify(status.name)}`])
  );
  const entries = (await fs.readdir(charactersDir)).filter((entry) => /\.ya?ml$/i.test(entry)).sort();
  const report = {
    schemaVersion: 2,
    rulesVersion: 2,
    mode: writeMode ? "write" : "check",
    files: [],
    warningCount: 0,
    fatalErrors: [],
  };

  for (const entry of entries) {
    const filePath = path.join(charactersDir, entry);
    const legacy = await readYaml(filePath);
    if (legacy?.schemaVersion === 2 && legacy?.rulesVersion === 2) {
      report.files.push({ file: entry, status: "already_v2", warnings: [] });
      continue;
    }
    const override = overrides?.characters?.[legacy?.id];
    if (!override) {
      report.fatalErrors.push(`${entry}: missing deterministic override in rules-v2-overrides.yml.`);
      continue;
    }
    const { migrated, warnings } = migrateCharacter(legacy, entry, override, globalStatusIds);
    report.files.push({ file: entry, status: writeMode ? "migrated" : "would_migrate", warnings });
    report.warningCount += warnings.length;
    if (writeMode) await writeYaml(filePath, migrated);
  }

  await fs.writeFile(reportPath, JSON.stringify(report, null, 2) + "\n", "utf8");
  console.log(`${writeMode ? "Migrated" : "Checked"} ${report.files.length} character file(s).`);
  console.log(`Warnings: ${report.warningCount}. Fatal errors: ${report.fatalErrors.length}.`);
  console.log(`Report: ${reportPath}`);

  if (report.fatalErrors.length) {
    report.fatalErrors.forEach((error) => console.error(`Error: ${error}`));
    process.exitCode = 1;
  } else if (checkMode && report.warningCount) {
    console.warn("Migration is deterministic but still requires the roster audit documented in the report.");
  }
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
