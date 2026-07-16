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

const isFiniteNumber = (value) => typeof value === "number" && Number.isFinite(value);

const validateScalar = (value, label, errors) => {
  if (isFiniteNumber(value)) return;
  if (!isPlainObject(value)) {
    errors.push(`${label} must be a finite number or scalar object.`);
    return;
  }

  if (!scalarKinds.has(value.kind)) {
    errors.push(`${label} has invalid scalar kind "${value.kind}".`);
    return;
  }

  if (value.kind !== "x" && !isFiniteNumber(value.value)) {
    errors.push(`${label} with kind "${value.kind}" requires finite numeric value.`);
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
    if (condition.min !== undefined && !isFiniteNumber(condition.min)) {
      errors.push(`${label}.min must be a finite number.`);
    }
    if (condition.max !== undefined && !isFiniteNumber(condition.max)) {
      errors.push(`${label}.max must be a finite number.`);
    }
    return;
  }

  if (condition.kind === "play_window") {
    if (!playWindows.has(condition.window)) {
      errors.push(`${label} has invalid play window "${condition.window}".`);
    }
    return;
  }

  if (!("left" in condition)) {
    errors.push(`${label} requires left operand.`);
  } else {
    validateScalar(condition.left, `${label}.left`, errors);
  }

  if (!comparisonOperators.has(condition.operator)) {
    errors.push(`${label} has invalid operator "${condition.operator}".`);
  }

  if (!("right" in condition)) {
    errors.push(`${label} requires right operand.`);
  } else {
    validateScalar(condition.right, `${label}.right`, errors);
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

const validateCard = (card, label, errors) => {
  validateEffectList(card.effects, label, errors);

  if (!Array.isArray(card.transforms)) return;
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
};

const run = async () => {
  const files = (await fs.readdir(charactersDir))
    .filter((file) => file.endsWith(".yml"))
    .sort();
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

  console.log("Structured effect conditions are valid.");
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
