import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";
import YAML from "yaml";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "..", "..");
const characterDir = path.join(repoRoot, "docs", "data", "rules-v2", "characters");
const interactionPath = path.join(repoRoot, "docs", "data", "rules-v2", "source-interactions.yml");
const exporterPath = path.join(scriptDir, "export-game-data-v2-package.mjs");

const readYaml = async (filename) => YAML.parse(await fs.readFile(filename, "utf8"));
const readText = (filename) => fs.readFile(filename, "utf8");
const cardById = (character, id) => [...character.cards, ...(character.createdCards ?? [])].find((card) => card.id === id);
const statusById = (character, id) => character.statusEffects.find((status) => status.id === id);
const effectsOf = (character) => {
  const effects = [];
  for (const card of [...character.cards, ...(character.createdCards ?? [])]) {
    effects.push(...(card.effects ?? []), ...(card.continuousRules ?? []));
  }
  for (const status of character.statusEffects ?? []) effects.push(...(status.rules ?? []));
  for (const innate of character.innates ?? []) {
    effects.push(...(innate.setup ?? []));
    for (const trigger of innate.triggers ?? []) {
      effects.push(...(trigger.effects ?? []), ...(trigger.decision?.effects ?? []));
    }
  }
  return effects;
};
const collectObjects = (value, predicate, output = []) => {
  if (Array.isArray(value)) {
    value.forEach((item) => collectObjects(item, predicate, output));
  } else if (value && typeof value === "object") {
    if (predicate(value)) output.push(value);
    Object.values(value).forEach((item) => collectObjects(item, predicate, output));
  }
  return output;
};

const validateSourceBasis = (character) => {
  const basisIds = new Set((character.sourceBasis ?? []).map((entry) => entry.id));
  assert.equal(basisIds.size, character.sourceBasis.length, `${character.id}: sourceBasis IDs must be unique.`);
  for (const card of [...character.cards, ...(character.createdCards ?? [])]) {
    for (const id of card.sourceBasis ?? []) {
      assert.ok(basisIds.has(id), `${character.id}: ${card.id} references missing source basis ${id}.`);
    }
  }
  for (const omitted of character.consideredButOmitted ?? []) {
    for (const id of omitted.sourceBasisIds ?? []) {
      assert.ok(basisIds.has(id), `${character.id}: omitted ${omitted.name} references missing source basis ${id}.`);
    }
  }
};

const main = async () => {
  const [dio, light, registry, dioAudit, lightAudit] = await Promise.all([
    readYaml(path.join(characterDir, "dio-brando-part-3.yml")),
    readYaml(path.join(characterDir, "light-yagami-kira.yml")),
    readYaml(interactionPath),
    readText(path.join(repoRoot, "docs", "design", "lore-audits", "dio-brando-part-3.md")),
    readText(path.join(repoRoot, "docs", "design", "lore-audits", "light-yagami-kira.md")),
  ]);

  const files = (await fs.readdir(characterDir)).filter((filename) => /\.ya?ml$/i.test(filename)).sort();
  assert.ok(files.includes("dio-brando-part-3.yml"), "Parallel Rules v2 data must include DIO.");
  assert.ok(files.includes("light-yagami-kira.yml"), "Parallel Rules v2 data must include Light.");

  assert.equal(registry.schemaVersion, 2);
  assert.equal(registry.rulesVersion, 2);
  const interactionMap = new Map();
  for (const entry of registry.interactions ?? []) {
    assert.ok(entry.id && !interactionMap.has(entry.id), `Duplicate or missing interaction ID: ${entry.id}`);
    assert.ok(Array.isArray(entry.outcomes) && entry.outcomes.length > 0, `${entry.id}: outcomes are required.`);
    assert.ok(entry.outcomes.includes(entry.defaultOutcome), `${entry.id}: defaultOutcome must be registered.`);
    interactionMap.set(entry.id, entry);
  }

  for (const character of [dio, light]) {
    assert.equal(character.schemaVersion, 2);
    assert.equal(character.rulesVersion, 2);
    validateSourceBasis(character);
    for (const [interactionId, result] of Object.entries(character.sourceInteractions ?? {})) {
      const definition = interactionMap.get(interactionId);
      assert.ok(definition, `${character.id}: unknown source interaction ${interactionId}.`);
      assert.ok(definition.outcomes.includes(result.outcome), `${character.id}: invalid ${interactionId} outcome ${result.outcome}.`);
      assert.ok(typeof result.reason === "string" && result.reason.trim(), `${character.id}: ${interactionId} requires a reason.`);
    }
    for (const reference of collectObjects(character, (value) => typeof value.interactionId === "string")) {
      const definition = interactionMap.get(reference.interactionId);
      assert.ok(definition, `${character.id}: condition references unknown interaction ${reference.interactionId}.`);
      if (reference.outcome != null) {
        assert.ok(definition.outcomes.includes(reference.outcome), `${character.id}: invalid required outcome ${reference.outcome}.`);
      }
    }
    for (const mitigation of collectObjects(character, (value) => typeof value.sourceInteractionId === "string")) {
      assert.ok(interactionMap.has(mitigation.sourceInteractionId), `${character.id}: unknown weakness interaction ${mitigation.sourceInteractionId}.`);
    }
  }

  assert.match(dio.version, /High DIO/);
  assert.equal(dio.sourceInteractions["interaction-death-note-eligibility"].outcome, "ineligible");
  assert.equal(dio.sourceInteractions["interaction-vampire-sunlight"].outcome, "vulnerable");
  assert.equal(dio.sourceInteractions["interaction-vampire-ripple"].outcome, "vulnerable");
  const executableDioNames = [
    ...dio.cards.map((card) => card.name),
    ...(dio.createdCards ?? []).map((card) => card.name),
    ...(dio.statusEffects ?? []).map((status) => status.name),
    ...(dio.innates ?? []).map((innate) => innate.name),
  ];
  assert.ok(!executableDioNames.some((name) => /Blood Focus/i.test(name)), "Blood Focus may be documented only as omitted material.");
  const dioTimeStop = statusById(dio, "unique-dio-time-stop");
  assert.equal(dioTimeStop.mode, "binary");
  assert.equal(dioTimeStop.persistence.duration, "combat_round");
  const timeStopCard = cardById(dio, "dio-time-stop");
  const playBlock = timeStopCard.effects.find((effect) => effect.type === "block_play");
  assert.equal(playBlock.duration, "combat_round");
  assert.equal(playBlock.existingPlaysContinue, true);
  assert.ok(!effectsOf(dio).some((effect) => effect.type === "inflict_status" && /stun/i.test(effect.statusId ?? effect.status ?? "")), "Time Stop must not create generic post-stop Stun.");
  const ordinaryAttacks = dio.cards.filter((card) => card.actionTypes.includes("action-attack") && !card.actionTypes.includes("action-ultimate"));
  assert.ok(ordinaryAttacks.every((card) => card.power?.min >= 30), "High DIO must already have elite ordinary Attack Power.");
  const roadRoller = cardById(dio, "dio-road-roller");
  assert.ok(collectObjects(roadRoller.restrictions, (value) => value.statusId === "unique-dio-time-stop").length > 0);
  assert.ok(roadRoller.effects.some((effect) => effect.type === "remove_status" && effect.statusId === "unique-dio-time-stop"));
  const drain = cardById(dio, "dio-vampiric-drain");
  for (const effect of drain.effects.filter((effect) => ["heal", "gain_status"].includes(effect.type))) {
    assert.equal(effect.condition?.interactionId, "interaction-vampiric-feeding-eligibility");
    assert.equal(effect.condition?.outcome, "eligible");
  }
  assert.match(dioAudit, /High DIO/);
  assert.match(dioAudit, /already played cards/i);
  assert.match(dioAudit, /Blood Focus/);

  assert.equal(light.sourceInteractions["interaction-death-note-eligibility"].outcome, "eligible");
  assert.equal(light.sourceInteractions["interaction-vampiric-feeding-eligibility"].outcome, "eligible");
  for (const card of light.cards) {
    assert.equal(card.power, null, `${card.id}: Light cards must not receive unsupported combat Power.`);
    assert.deepEqual(card.damageTypes, [], `${card.id}: Light cards must not deal classified damage.`);
    assert.ok(!card.actionTypes.includes("action-attack"), `${card.id}: Light must not gain a generic Attack.`);
    assert.ok(!card.actionTypes.includes("action-defense"), `${card.id}: Light must not gain combat-parity Defense.`);
  }
  assert.ok(!effectsOf(light).some((effect) => effect.type === "deal_damage"), "Light must not deal generic Mental damage.");
  const information = statusById(light, "unique-light-stolen-information");
  assert.equal(information.mode, "stack");
  assert.equal(information.caps.stack, 6);
  assert.equal(information.persistence.onSourceDefeat, "independent");
  assert.equal(information.persistence.genericCleanse, "immune");
  const nameWritten = statusById(light, "unique-light-name-written");
  assert.equal(nameWritten.schedule.anchor, "next_subject_team_turn_end");
  assert.equal(nameWritten.persistence.onSourceDefeat, "independent");
  assert.equal(nameWritten.persistence.onResurrection, "persist");
  assert.equal(nameWritten.persistence.genericCleanse, "immune");
  assert.ok(nameWritten.rules.some((effect) => effect.type === "defeat" && effect.timing === "turn_end"));
  assert.ok(nameWritten.rules.some((effect) => effect.type === "remove_status" && effect.statusId === "unique-light-name-written"));
  const writeName = cardById(light, "light-write-the-name");
  const writeConditions = collectObjects(writeName.restrictions, (value) => value.kind === "source_interaction_equals" || value.kind === "subject_status_compare");
  assert.ok(writeConditions.some((condition) => condition.interactionId === "interaction-death-note-eligibility" && condition.outcome === "eligible"));
  assert.ok(writeConditions.some((condition) => condition.statusId === "unique-light-stolen-information" && condition.value === 6));
  const ultimate = cardById(light, "light-just-as-planned");
  const ultimateConditions = collectObjects(ultimate.restrictions, (value) => value.kind === "source_interaction_equals" || value.kind === "subject_status_compare");
  assert.ok(ultimateConditions.some((condition) => condition.interactionId === "interaction-death-note-eligibility" && condition.outcome === "eligible"));
  assert.ok(ultimateConditions.some((condition) => condition.statusId === "unique-light-stolen-information" && condition.value === 3));
  assert.ok(!ultimate.effects.some((effect) => effect.type === "reduce_status"), "Light's Ultimate must not accelerate an existing written-name schedule.");
  assert.ok(light.consideredButOmitted.some((entry) => entry.name === "Shinigami Eyes"));
  assert.match(lightAudit, /living human/i);
  assert.match(lightAudit, /Shinigami Eyes/);
  assert.match(lightAudit, /Meter improves access/i);

  const tempRoot = await fs.mkdtemp(path.join(os.tmpdir(), "ua-dio-light-v2-"));
  try {
    execFileSync(
      process.execPath,
      [
        exporterPath,
        "--characters-dir",
        characterDir,
        "--out",
        tempRoot,
        "--skip-assets",
        "--source-commit",
        "unknown",
        "--generated-at",
        "2026-07-16T00:00:00.000Z",
      ],
      { cwd: repoRoot, encoding: "utf8", stdio: "pipe" }
    );
    const manifest = JSON.parse(await fs.readFile(path.join(tempRoot, "manifest.json"), "utf8"));
    const exportedInteractions = JSON.parse(await fs.readFile(path.join(tempRoot, "source-interactions.json"), "utf8"));
    assert.equal(manifest.schemaVersion, 2);
    assert.equal(manifest.rulesVersion, 2);
    assert.equal(manifest.rosterCount, files.length);
    assert.equal(manifest.publishable, false);
    assert.equal(manifest.sourceInteractionCount, registry.interactions.length);
    assert.deepEqual(manifest.validation, { errors: 0, warnings: 0, strict: true });
    assert.match(manifest.files["source-interactions.json"], /^sha256:[0-9a-f]{64}$/);
    assert.equal(exportedInteractions.interactions.length, registry.interactions.length);
  } finally {
    await fs.rm(tempRoot, { recursive: true, force: true });
  }

  console.log("Rules v2 DIO and Light tests: passed.");
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
