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
const cardsOf = (character) => [...character.cards, ...(character.createdCards ?? [])];
const cardById = (character, id) => cardsOf(character).find((card) => card.id === id);
const statusById = (character, id) => character.statusEffects.find((status) => status.id === id);
const collectObjects = (value, predicate, output = []) => {
  if (Array.isArray(value)) value.forEach((item) => collectObjects(item, predicate, output));
  else if (value && typeof value === "object") {
    if (predicate(value)) output.push(value);
    Object.values(value).forEach((item) => collectObjects(item, predicate, output));
  }
  return output;
};
const effectsOf = (character) => collectObjects(character, (value) => typeof value.type === "string" && typeof value.id === "string");

const main = async () => {
  const [dio, light, registry, dioAudit, lightAudit, revisionFramework] = await Promise.all([
    readYaml(path.join(characterDir, "dio-brando-part-3.yml")),
    readYaml(path.join(characterDir, "light-yagami-kira.yml")),
    readYaml(interactionPath),
    readText(path.join(repoRoot, "docs", "design", "lore-audits", "dio-brando-part-3.md")),
    readText(path.join(repoRoot, "docs", "design", "lore-audits", "light-yagami-kira.md")),
    readText(path.join(repoRoot, "docs", "design", "character-revision-framework.md")),
  ]);

  assert.equal(registry.schemaVersion, 2);
  assert.equal(registry.rulesVersion, 2);
  assert.match(revisionFramework, /intent matrix/i);
  assert.match(revisionFramework, /changelog-before-implementation/i);
  assert.match(revisionFramework, /classification-semantics gate/i);

  assert.match(dio.version, /Cairo DIO/i);
  assert.match(dio.design.thesis, /Stolen Blood/i);
  assert.match(dio.design.thesis, /lower costs/i);
  assert.equal(dio.sourceInteractions["interaction-death-note-eligibility"].outcome, "ineligible");
  const stolenBlood = statusById(dio, "unique-dio-stolen-blood");
  const bloodFocus = statusById(dio, "unique-dio-blood-focus");
  const timeStop = statusById(dio, "unique-dio-time-stop");
  assert.equal(stolenBlood.mode, "value");
  assert.equal(stolenBlood.caps.value, 10);
  assert.equal(bloodFocus.caps.value, 10);
  assert.ok(bloodFocus.rules.some((rule) => rule.type === "modify_cost" && rule.minimum === 0));
  assert.equal(timeStop.mode, "value");
  assert.equal(timeStop.caps.value, 8);
  assert.ok(timeStop.rules.some((rule) => rule.type === "grant_keyword" && rule.keywordId === "keyword-follow-up"));
  assert.ok(timeStop.rules.some((rule) => rule.timing === "on_expire" && rule.statusId === "status-strain"));

  const dioCosts = Object.fromEntries(dio.cards.map((card) => [card.id, card.cost.energy]));
  assert.deepEqual(dioCosts, {
    "dio-predatory-strike": 2,
    "dio-world-intercept": 2,
    "dio-vampiric-drain": 4,
    "dio-throwing-knives": 6,
    "dio-time-stop": 8,
    "dio-road-roller": 0,
  });
  const drain = cardById(dio, "dio-vampiric-drain");
  for (const effect of drain.effects.filter((effect) => ["heal", "gain_status"].includes(effect.type))) {
    const refs = collectObjects(effect.condition, (value) => value.interactionId === "interaction-vampiric-feeding-eligibility");
    assert.ok(refs.some((value) => value.outcome === "eligible"), `${effect.id} must require eligible blood.`);
  }
  const stopCard = cardById(dio, "dio-time-stop");
  assert.ok(stopCard.effects.some((effect) => effect.type === "spend_status" && effect.statusId === "unique-dio-stolen-blood"));
  assert.ok(stopCard.effects.some((effect) => effect.type === "gain_status_per_spent" && effect.statusId === "unique-dio-time-stop"));
  const block = stopCard.effects.find((effect) => effect.type === "block_play");
  assert.equal(block.duration, "combat_round");
  assert.equal(block.existingPlaysContinue, true);
  const stun = stopCard.effects.find((effect) => effect.type === "inflict_status" && effect.statusId === "status-stun");
  assert.equal(stun.duration, "next_team_turn");
  const roller = cardById(dio, "dio-road-roller");
  assert.ok(collectObjects(roller.restrictions, (value) => value.statusId === "unique-dio-time-stop").length > 0);
  assert.ok(roller.effects.some((effect) => effect.type === "spend_status" && effect.statusId === "unique-dio-stolen-blood"));
  assert.ok(roller.effects.some((effect) => effect.type === "deal_damage_per_spent"));
  assert.ok(roller.effects.some((effect) => effect.type === "inflict_status_per_spent"));
  assert.ok(roller.effects.some((effect) => effect.type === "set_status" && effect.statusId === "unique-dio-time-stop"));
  assert.match(dioAudit, /Blood Focus/i);
  assert.match(dioAudit, /cards already played/i);
  assert.match(dioAudit, /next-turn Stun/i);

  assert.equal(light.sourceInteractions["interaction-death-note-eligibility"].outcome, "eligible");
  const lightBasics = light.cards.filter((card) => card.actionTypes.includes("action-basic"));
  assert.equal(lightBasics.length, 2);
  assert.ok(lightBasics.some((card) => card.actionTypes.includes("action-attack") && card.power?.min === 8 && card.power?.max === 12));
  assert.ok(lightBasics.some((card) => card.actionTypes.includes("action-defense") && card.power?.min === 8 && card.power?.max === 12));
  const lightTechniques = light.cards.filter((card) => card.actionTypes.includes("action-technique"));
  assert.equal(lightTechniques.length, 3);
  assert.ok(lightTechniques.every((card) => card.actionTypes.includes("action-special")));

  const information = statusById(light, "unique-light-stolen-information");
  assert.equal(information.mode, "stack");
  assert.equal(information.caps.stack, 6);
  const decay = information.rules.find((rule) => rule.id === "light-information-decay");
  assert.equal(decay.timing, "turn_end");
  assert.equal(decay.condition.operator, "less_or_equal");
  assert.equal(decay.condition.value, 5);
  const countdown = statusById(light, "unique-light-death-note-countdown");
  assert.equal(countdown.mode, "value");
  assert.equal(countdown.caps.value, 3);
  assert.equal(countdown.persistence.onSourceDefeat, "independent");
  assert.ok(countdown.rules.some((rule) => rule.type === "reduce_status" && rule.timing === "turn_end"));
  assert.ok(countdown.rules.some((rule) => rule.type === "defeat"));

  const writeName = cardById(light, "light-write-the-name");
  const writeConditions = collectObjects(writeName.restrictions, (value) => value.kind === "source_interaction_equals" || value.kind === "subject_status_compare");
  assert.ok(writeConditions.some((condition) => condition.interactionId === "interaction-death-note-eligibility" && condition.outcome === "eligible"));
  assert.ok(writeConditions.some((condition) => condition.statusId === "unique-light-stolen-information" && condition.value === 6));
  assert.equal(writeName.cost.energy, 2);
  const judgment = cardById(light, "light-judgment");
  assert.equal(judgment.cost.ultimateMeter, 30);
  assert.equal(judgment.cost.additionalUltimateMeterPerX, 10);
  assert.deepEqual(judgment.cost.x, { min: 0, max: 2, lockTiming: "on_play" });
  const reduction = judgment.effects.find((effect) => effect.id === "light-judgment-reduce-countdown");
  assert.equal(reduction.type, "reduce_status");
  assert.equal(reduction.minimumValue, 1);
  assert.match(lightAudit, /contestable/i);
  assert.match(lightAudit, /three-step countdown/i);
  assert.match(lightAudit, /Meter acceleration/i);

  assert.ok(!effectsOf(light).some((effect) => effect.type === "defeat" && effect.targetRef !== "subject"));

  const tempRoot = await fs.mkdtemp(path.join(os.tmpdir(), "ua-dio-light-v2-"));
  try {
    execFileSync(process.execPath, [exporterPath, "--characters-dir", characterDir, "--out", tempRoot, "--skip-assets", "--source-commit", "unknown", "--generated-at", "2026-07-16T00:00:00.000Z"], { cwd: repoRoot, encoding: "utf8", stdio: "pipe" });
    const manifest = JSON.parse(await fs.readFile(path.join(tempRoot, "manifest.json"), "utf8"));
    assert.equal(manifest.rosterCount, 2);
    assert.equal(manifest.publishable, false);
    assert.equal(manifest.sourceInteractionCount, registry.interactions.length);
    assert.match(manifest.files["source-interactions.json"], /^sha256:[0-9a-f]{64}$/);
  } finally {
    await fs.rm(tempRoot, { recursive: true, force: true });
  }

  console.log("Rules v2 DIO and Light tests: passed.");
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
