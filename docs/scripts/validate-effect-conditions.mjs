import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import yaml from "yaml";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const charactersDir = path.resolve(scriptDir, "..", "data", "characters");

const statusConditionKinds = new Set([
  "self_has_status",
  "self_missing_status",
  "target_has_status",
  "target_missing_status",
]);
const effectConditionKinds = new Set([...statusConditionKinds, "play_window", "compare"]);
const comparisonOperators = new Set(["eq", "ne", "lt", "lte", "gt", "gte"]);
const playWindows = new Set(["assist_attack", "follow_up", "after_use"]);
const scalarKinds = new Set(["x", "x_plus", "x_minus", "x_times"]);

const isPlainObject = (value) =>
  Boolean(value) && typeof value === "object" && !Array.isArray(value);

const validateScalar = (value, label, errors) => {
  if (typeof value === "number") return;
  if (!isPlainObject(value)) {
    errors.push(`${label} must be a number or scalar object.`);
    return;
  }
  if (!scalarKinds.has(value.kind)) {
    errors.push(`${label} has invalid scalar kind "${value.kind}".`);
    return;
  }
  if (value.kind !== "x" && typeof value.value !== "number") {
    errors.push(`${label} with kind "${value.kind}" requires numeric value.`);
  }
};

const validateCondition = (condition, label, errors, allowedKinds) => {
  if (!isPlainObject(condition)) {
    errors.push(`${label} must be an object.`);
    return;
  }

  if (!allowedKinds.has(condition.kind)) {
    errors.push(`${label} has invalid kind "${condition.kind}".`);
    return;
  }

  if (statusConditionKinds.has(condition.kind)) {
    if (typeof condition.status !== "string" || !condition.status.trim()) {
      errors.push(`${label} with kind "${condition.kind}" requires status.`);
    }
    return;
  }

  if (condition.kind === "play_window") {
    if (!playWindows.has(condition.window)) {
      errors.push(`${label} has invalid play window "${condition.window}".`);
    }
    return;
  }

  if (condition.kind === "compare") {
    if (!("left" in condition)) errors.push(`${label} requires left operand.`);
    else validateScalar(condition.left, `${label}.left`, errors);

    if (!comparisonOperators.has(condition.operator)) {
      errors.push(`${label} has invalid operator "${condition.operator}".`);
    }

    if (!("right" in condition)) errors.push(`${label} requires right operand.`);
    else validateScalar(condition.right, `${label}.right`, errors);
  }
};

const validateEffectList = (effects, label, errors) => {
  if (!Array.isArray(effects)) return;

  effects.forEach((effect, index) => {
    const effectLabel = `${label}.effects[${index}]`;
    if (!isPlainObject(effect)) {
      errors.push(`${effectLabel} must be an object.`);
      return;
    }

    if (effect.condition !== undefined) {
      validateCondition(effect.condition, `${effectLabel}.condition`, errors, effectConditionKinds);
    }

    if (effect.type === "choose" && Array.isArray(effect.options)) {
      effect.options.forEach((option, optionIndex) => {
        validateEffectList(option?.effects, `${effectLabel}.options[${optionIndex}]`, errors);
      });
    }
  });
};

const normalizeStatusName = (value) => value.replace(/\.$/, "").trim();

const parseConditionalStatusRequirements = (effectLines) => {
  const requirements = [];
  if (!Array.isArray(effectLines)) return requirements;

  effectLines.forEach((line) => {
    const followUp = /^On Follow-Up:\s*(Inflict|Gain)\s+(\d+)\s+(.+?)\.?$/i.exec(line);
    if (followUp) {
      requirements.push({
        timing: "on_use",
        type: followUp[1].toLowerCase() === "inflict" ? "inflict_status" : "gain_status",
        amount: Number(followUp[2]),
        status: normalizeStatusName(followUp[3]),
        condition: { kind: "play_window", window: "follow_up" },
      });
      return;
    }

    const xEquality = /^On Hit:\s*If X is (\d+):\s*(Inflict|Gain)\s+(\d+)\s+(.+?)\.?$/i.exec(line);
    if (xEquality) {
      requirements.push({
        timing: "on_hit",
        type: xEquality[2].toLowerCase() === "inflict" ? "inflict_status" : "gain_status",
        amount: Number(xEquality[3]),
        status: normalizeStatusName(xEquality[4]),
        condition: {
          kind: "compare",
          left: { kind: "x" },
          operator: "eq",
          right: Number(xEquality[1]),
        },
      });
    }
  });

  return requirements;
};

const conditionMatches = (actual, expected) => {
  if (!isPlainObject(actual) || actual.kind !== expected.kind) return false;
  if (expected.kind === "play_window") return actual.window === expected.window;
  if (expected.kind === "compare") {
    return actual.left?.kind === "x" &&
      actual.operator === expected.operator &&
      actual.right === expected.right;
  }
  return false;
};

const hasStructuredRequirement = (effects, requirement) =>
  Array.isArray(effects) && effects.some((effect) =>
    effect?.timing === requirement.timing &&
    effect?.type === requirement.type &&
    effect?.status === requirement.status &&
    effect?.amount?.kind === "flat" &&
    effect?.amount?.value === requirement.amount &&
    conditionMatches(effect?.condition, requirement.condition)
  );

const validateCard = (card, label, errors) => {
  validateEffectList(card.effects, label, errors);

  if (Array.isArray(card.transforms)) {
    card.transforms.forEach((transform, index) => {
      if (transform?.condition !== undefined) {
        validateCondition(
          transform.condition,
          `${label}.transforms[${index}].condition`,
          errors,
          statusConditionKinds
        );
      }
    });
  }

  parseConditionalStatusRequirements(card.effect).forEach((requirement) => {
    if (!hasStructuredRequirement(card.effects, requirement)) {
      errors.push(
        `${label} is missing structured ${requirement.condition.kind} ${requirement.type} for ` +
        `"${requirement.status}".`
      );
    }
  });
};

const run = async () => {
  const files = (await fs.readdir(charactersDir)).filter((file) => file.endsWith(".yml"));
  const errors = [];

  for (const file of files) {
    const raw = await fs.readFile(path.join(charactersDir, file), "utf8");
    const data = yaml.parse(raw);

    for (const collectionName of ["cards", "createdCards"]) {
      const cards = data?.[collectionName];
      if (!Array.isArray(cards)) continue;
      cards.forEach((card, index) => {
        const cardName = card?.name ?? `${collectionName}[${index}]`;
        validateCard(card, `${file} :: ${cardName}`, errors);
      });
    }
  }

  if (errors.length) {
    console.error("Structured effect condition errors:");
    errors.forEach((error) => console.error(`- ${error}`));
    process.exit(1);
  }

  console.log("Structured effect conditions are valid and complete.");
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
