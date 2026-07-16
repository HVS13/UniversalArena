# Rules v2 Compatibility Policy

> **Status:** Compatibility authority for Rules v2 design and migration.
> **Purpose:** Define how Rules v2 extends Universal Arena while preserving established behavior that has not been explicitly changed.
> **Scope:** Character revisions, numeric budgeting, classifications, status migration, approval records, and executable migration work.

## 1. Authority and change requirements

Rules v2 may preserve, clarify, expand, or correct existing rules:

- **Preserve:** retain behavior that already serves the intended design.
- **Clarify:** make implicit behavior explicit without changing gameplay.
- **Expand:** add schema, registries, metadata, or interaction vocabulary needed for new content.
- **Correct:** change a demonstrated lore, rules, consistency, usability, or implementation defect using the smallest effective change.

A later schema or specification does not supersede established behavior by default. A Rules v2 change to existing behavior must identify:

1. the previous behavior;
2. the proposed behavior;
3. the reason for the change;
4. affected characters, cards, statuses, rules, and tests;
5. the required migration and compatibility handling.

For existing content, the default migration result is the same gameplay expressed more explicitly.

## 2. Existing content is design evidence

An active character kit is the baseline for migration. Before proposing changes, record:

- the complete action loop;
- the purpose of every Innate and status;
- the gameplay and canonical job of every card;
- the printed and effective Energy curve;
- Ultimate Meter generation and spending;
- Attack, Defense, and Special clash roles;
- transformation and `Becomes` dependencies;
- Retain, Created-card, and hand-pressure assumptions;
- failure states and recovery routes;
- recognizable player expectations.

An implementation may use nonliteral abstraction while still preserving the character's source identity, decisions, progression, and rhythm. Migration review must evaluate the complete engine rather than isolated fields.

## 3. Structural migration default

A schema-only or typing migration preserves, by default:

- card names;
- printed costs;
- Power formulas and ranges;
- Speed;
- Attack, Defense, and Special classifications;
- targeting;
- card count and slot identity;
- Innate functions;
- status quantities and timing;
- resource gain and spend rates;
- transformations and replacements;
- Ultimate availability and scaling;
- the character's established engine.

A structural migration may separate classifications, add stable IDs, add ownership, type effects, define lifecycle, add source basis, and clarify timing without changing gameplay outcomes.

Any gameplay change must be separately labeled, justified, and approved.

## 4. Original numeric authoring rules remain foundational

The Character Creation Guide's complete budgeting procedure remains the default numeric authoring system unless a documented exception applies.

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
- Character-specific exceptions require a documented baseline, deviation, and reason.

### Printed range

- Melee: Base Power ± `floor(Base Power × 0.20)`.
- Ranged: Base Power ± `floor(Base Power × 0.25)`.
- Round decimals down.

### Cost modifiers

Author printed Power from the printed or locked card cost. In-match cost reductions do not recalculate printed Power unless card text explicitly says so.

When a personal engine reduces cost, audit every reachable effective-cost breakpoint. Printed cost and printed Power must not be evaluated in isolation.

### Required change table

Any cost or Power change must show:

| Item | Before | Formula baseline | Utility/condition adjustments | After | Reason |
| --- | --- | --- | --- | --- | --- |

Blanket numeric rebasing is not permitted.

## 5. Classification changes are gameplay changes

Changing classification is not cosmetic.

- Attack versus Attack contests Power.
- Defense resolves before a paired Attack and provides protection.
- Special normally has no Power, and both paired cards are used.
- On Hit requires an Attack Hit.
- Damage Type changes mitigation interactions.
- Speed changes legal zones and response windows.
- Melee/Ranged changes range width and Distance profile.
- Area and Multihit change total output and clash behavior.

A migration must preserve classification unless its clash, timing, targeting, mitigation, and dependency consequences are documented and approved.

## 6. Status-mode migration preserves meaning

Use the simplest coherent status mode while preserving the function of every legacy number.

Do not:

- add Potency and Count together when they represent different concepts;
- reinterpret Count as turns when it represented activations;
- turn a resource into duration;
- remove a number without locating all dependent effects;
- collapse separate concepts only to reduce fields.

When a legacy status has fixed Potency plus a Count that alone controls duration, a one-number migration normally preserves Count as duration and expresses the fixed on-gain effect separately. It does not sum Potency and Count.

## 7. Framework examples are illustrative

Character-specific examples in design frameworks explain design questions, schema capabilities, or existing intent. They do not authorize executable changes.

An example does not approve:

- changing version boundaries;
- renaming cards;
- changing costs or Power;
- changing action classifications;
- adding or removing statuses;
- changing durations;
- changing counterplay;
- replacing an established engine.

Character behavior becomes approved only through its own before/after review.

## 8. Required review package

Before executable changes to an existing character, prepare:

1. an intent matrix;
2. a dependency map;
3. a complete numeric budget table;
4. a classification consequence table;
5. a player-facing changelog;
6. a categorized list of required migrations, required corrections, optional refinements, and explicit non-changes.

Optional or disputed changes require explicit project approval. Absence of feedback is not approval.

## 9. Pull-request separation

Use separate pull requests for:

1. foundation or global-rule changes;
2. character research and proposed changelog;
3. executable character migration after review;
4. web-game implementation or export consumption.

Do not combine compatibility policy changes with speculative roster redesign.

## 10. Migration authority

Until a character-specific migration is reviewed, approved, implemented, and validated:

- active Rules v1 character data remains the gameplay authority;
- Rules v2 schemas, registries, exporters, and overlays do not independently change character behavior;
- no existing cost, Power, card name, classification, version boundary, status mode, or engine is presumed changed;
- the next migration step begins with an audit and player-facing changelog before executable data edits.
