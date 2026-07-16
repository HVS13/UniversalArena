# Rules v2 Compatibility Policy

> **Status:** Change-control authority for Rules v2 design and migration.
> **Purpose:** Ensure that Rules v2 upgrades and expands Universal Arena without burying or casually overwriting its established foundation.
> **Scope:** Global-rule changes, character revisions, numeric budgeting, classifications, status migration, approval records, and executable migration work.

Read the [Rules v2 Authority Map](rules-v2-authority-map.md) first.

## 1. Continuity principle

Rules v2 is an evolution of Universal Arena, not a replacement game.

It should carry forward the original vision, upgrade systems that can serve that vision better, expand what the game can represent, and correct demonstrated problems through critical and logical reasoning.

A newer document, schema, abstraction, or convention does not automatically supersede an established rule. Existing foundations remain valid evidence unless an approved change explains why an upgrade is needed.

A proposed change carries the burden of proof. Existing behavior does not need to defend its existence from zero.

## 2. Allowed change types

Every proposed change must be labeled as one of the following.

- **Carry forward:** retain behavior because it already serves the intended vision.
- **Clarify:** make existing meaning explicit without changing gameplay outcomes.
- **Upgrade:** improve how an established system serves the same core purpose.
- **Expand:** add capability, vocabulary, or interaction space without weakening the established foundation.
- **Correct:** fix a demonstrated lore, logic, consistency, usability, balance, or implementation defect.
- **Replace:** use a different mechanism because the current one fundamentally blocks the intended vision. This is exceptional.
- **Retire:** remove obsolete, harmful, contradictory, or no-longer-needed behavior through a traceable migration.

Use the least disruptive change that fully solves the problem and advances the intended vision.

Do not choose a smaller patch when it leaves the real defect intact. Do not choose a larger redesign when a simpler upgrade solves the problem equally well.

## 3. Required change record

A material gameplay change must state:

1. the intended goal;
2. the current Rules v1 or active behavior;
3. the original purpose and established player expectation;
4. the actual problem;
5. the proposed Rules v2 behavior;
6. what original intent remains preserved;
7. the expected improvement;
8. trade-offs and possible regressions;
9. affected characters, cards, statuses, rules, data, exporters, and tests;
10. alternatives considered, including preserving the current behavior and making a smaller change;
11. migration and compatibility handling;
12. required validation and regression tests;
13. approval status.

A proposal is incomplete when it explains only what is cleaner or newer.

## 4. Current content is design evidence

An active character kit or rule is the baseline for review. Before proposing a change, record:

- its source and intended purpose;
- its complete action or resolution loop;
- the purpose of every Innate, status, card, and resource;
- printed and effective Energy costs;
- Ultimate Meter generation and spending;
- Attack, Defense, and Special clash roles;
- Speed, targeting, range, and area consequences;
- transformation and `Becomes` dependencies;
- Retain, Created-card, and hand-pressure assumptions;
- failure states and recovery routes;
- interactions with allies and opponents;
- recognizable player expectations.

Review the complete engine rather than isolated fields. A nonliteral abstraction may still preserve source identity, decisions, progression, and rhythm.

## 5. Separate migration from redesign

### Structural migration

A structural migration changes representation while preserving gameplay outcomes.

It may:

- add `schemaVersion` and `rulesVersion`;
- add or preserve stable IDs;
- separate overloaded classifications;
- add explicit ownership and provenance;
- type effects, conditions, restrictions, and targets;
- define lifecycle destinations;
- add source-basis and audit metadata;
- make existing timing explicit.

It preserves by default:

- card names;
- printed costs;
- Power formulas and ranges;
- Speed;
- Attack, Defense, and Special classifications;
- Damage Type meaning;
- targeting and range behavior;
- card count and slot identity;
- Innate functions;
- status quantities, purpose, and timing;
- resource gain and spend rates;
- transformations and replacements;
- Ultimate availability and scaling;
- the established character engine.

A structural migration must not contain an unreviewed redesign.

### Existing-character redesign

A redesign may change established gameplay when a documented problem or upgrade opportunity exists.

It requires the full change record, dependency analysis, numeric review, classification consequences, and a player-facing changelog before executable edits.

### New character design

A new character is not required to reproduce Rules v1 conventions that Rules v2 has explicitly and validly upgraded. It must still follow the established vision, approved global semantics, complete numeric authoring rules, and source-supported character identity.

## 6. Original numeric authoring remains foundational

The complete Power and cost procedure in the Character Creation Guide remains the baseline numeric authoring system until a later approved foundation decision changes it.

Rules v2 may refine or upgrade that procedure in the dedicated Power and economy review. It may not silently replace or abbreviate it.

### Base Power

- Energy-only card: printed Energy cost × 10.
- Pure Ultimate-Meter card: Ultimate Meter cost × 1.5, rounded down.
- Mixed Meter + Energy Ultimate: Meter contributes 1 Base Power per Meter; Energy contributes its normal Base Power.
- Variable non-Ultimate Energy:
  - X may be 0: `5 × (X + 1)`;
  - X cannot be 0: `10 × X`.
- Variable Energy on mixed-cost Ultimates: `10 × X`, even when X may be 0.
- Non-created 0-Energy card: Base Power 5.
- Created card: cannot exceed the Base Power of its creator unless a documented exception permits it.

### Modifiers

Apply modifiers to Base Power before generating the printed range.

- Only Power damage, or only Power Shield/HP: +20%.
- Fast: −10%.
- Created: −10%.
- Fast and Created stack.
- High execution requirements or narrow conditions: normally +10–20%.
- Meaningful utility, statuses, area, draw, resources, tempo, future value, healing, and engine acceleration consume Power budget.
- Damage plus healing is combined output and must be reduced accordingly.
- Character-specific exceptions require a documented baseline, deviation, reason, and gameplay consequence.

### Printed range

- Melee: Base Power ± `floor(Base Power × 0.20)`.
- Ranged: Base Power ± `floor(Base Power × 0.25)`.
- Round decimals down.

### Printed and effective cost

Author printed Power from the printed or locked play cost. In-match reductions do not recalculate printed Power unless explicit text says so.

When a personal engine changes cost, audit every reachable effective-cost breakpoint. Include:

- access within the default five-Energy team turn;
- low-, normal-, and peak-investment turns;
- zero-cost breakpoints;
- Ultimate Meter lost or gained through cost modifiers;
- Follow-Up and repeated-play chains;
- opportunity cost imposed on allies.

### Required numeric table

Any cost or Power change must show:

| Item | Before | Formula baseline | Utility or condition adjustments | Effective-cost breakpoints | After | Reason |
| --- | --- | --- | --- | --- | --- | --- |

Blanket numeric rebasing is not permitted.

“Lore-first” and “benchmarks are not ceilings” do not remove the calculation requirement. Lore may justify a deviation after the baseline and consequences are shown.

## 7. Classification changes are gameplay changes

Changing classification is not cosmetic.

- Attack versus Attack contests Power.
- Defense resolves before a paired Attack and provides protection.
- Special normally has no Power, and both paired cards are used.
- On Hit requires an Attack Hit.
- Damage Type changes mitigation interactions.
- Speed changes legal zones and response windows.
- Melee or Ranged changes range width and Distance behavior.
- Area and Multihit change total output and clash behavior.

A migration must preserve classification unless its clash, timing, targeting, mitigation, dependency, and player-facing consequences are documented and approved.

A schema category or migration mapping may identify a review requirement. It does not authorize the final character-specific classification.

## 8. Status migration preserves meaning

Use the simplest coherent status mode while preserving the function of every established number and dependent effect.

Do not:

- add Potency and Count together when they represent different concepts;
- reinterpret Count as turns when it represented activations;
- turn a resource into duration;
- remove a number without locating every dependent effect;
- collapse separate concepts only to reduce fields;
- change gain, loss, trigger, expiry, or cap behavior merely to match a preferred schema shape.

When a legacy status has fixed Potency plus a Count that alone controls duration, a one-number migration normally preserves Count as duration and expresses the fixed on-gain effect separately. It does not sum Potency and Count.

Every status-mode change must include a dependency list and before-and-after examples.

## 9. Examples, warnings, and infrastructure are not approval

Character-specific examples in design frameworks explain questions, schema capabilities, or existing intent. They do not authorize executable changes.

An example, warning, registry entry, schema field, migration suggestion, exporter capability, or abandoned draft does not approve:

- a new version boundary;
- card renaming;
- a cost or Power change;
- an action or damage classification change;
- a status addition, removal, or duration change;
- altered counterplay;
- a replacement engine;
- a character-specific lore interpretation.

A warning is a question to investigate, not a proposed patch.

## 10. Required existing-character review package

Before executable changes to an existing character, prepare:

1. a continuity and intent summary;
2. an existing-engine map;
3. an intent matrix for Innates, statuses, cards, variants, and Ultimates;
4. a dependency map;
5. a complete numeric budget and effective-cost table;
6. a classification consequence table;
7. an economy and team-impact analysis;
8. required structural migrations;
9. proposed upgrades or corrections;
10. optional refinements;
11. explicit non-changes;
12. a player-facing changelog;
13. unresolved questions and approval status.

Optional or disputed changes require explicit project approval. Absence of feedback is not approval.

## 11. Pull-request separation

Use separate pull requests for:

1. foundation or global-rule proposals;
2. character research and proposed changelog;
3. executable character migration after review;
4. web-game implementation or export consumption.

Do not combine foundation changes with speculative roster redesign.

## 12. Migration authority

Until a character-specific change is reviewed, approved, implemented, and validated:

- active Rules v1 character data remains current gameplay authority;
- original foundations remain evidence of design intent;
- Rules v2 schemas, registries, exporters, overlays, and examples do not independently change character behavior;
- no existing cost, Power, name, Speed, classification, version boundary, status meaning, or engine is presumed changed;
- ambiguity remains unresolved rather than being silently converted;
- the next step begins with an audit and player-facing changelog before executable data edits.

## 13. Phase 1 boundary

This policy changes change-control and authority interpretation only. It does not approve or reject any specific gameplay semantic change. Power, economy, targeting, timing, statuses, lifecycle, and other global mechanics remain for their dedicated review phases.