# Rules v2 Historical Audit Supplement

> **Status:** Historical integration record.
> **Purpose:** Preserve the accepted findings and correction history from the second Rules v2 audit until each item is integrated into the canonical source that owns its subject.
> **Authority:** This document does not independently override the current Design Principles, Compatibility Policy, Decision Record, Schema, or approved character changelogs. Use the current canonical source after an item has been integrated.

Read this with:

- [Rules v2 Authority Map](rules-v2-authority-map.md)
- [Rules v2 Compatibility Policy](rules-v2-compatibility-policy.md)
- [Design Principles](design-principles.md)
- [Character Authoring Framework](character-authoring-framework.md)
- [Rules v2 Decision Record](rules-v2-decisions.md)
- [Schema v2 Specification](../data/schema-v2.md)

The sections below preserve the original audit findings. They remain useful evidence and integration requirements, but character-specific examples are not character approval.

## 1. Lineup Archetypes

Character Core Roles and Combat Archetypes describe individuals. **Lineup Archetypes** describe how a three-character team expects to operate and win.

Lineup Archetypes are optional, descriptive, and non-mechanical. A team may have one primary and one secondary Lineup Archetype. They do not impose composition requirements.

### Tempo

Wins through early pressure, Fast interaction, Follow-Up, Stun, cost disruption, and action advantage before slower engines mature.

### Midrange

Uses flexible, broadly playable cards and several viable resource routes. It adapts between pressure, protection, and disruption rather than relying on one extreme plan.

### Attrition

Wins through durability, healing, regeneration, persistent statuses, denial, and repeated favorable exchanges.

### Control

Restricts enemy choices through statuses, movement, targeting, costs, card access, timing, or play denial until the opponent cannot execute its intended plan.

### Setup–Execution

Builds a visible target condition, mark, information threshold, form, equipment state, or countdown, then converts it through an Eliminator or Specialist payoff.

### Status Engine

Coordinates the building, sustaining, triggering, consuming, converting, or exploiting of one or more global statuses. The three characters do not need to use the same status in the same way.

### Formation

Uses position, Distance, adjacency, Splash, Bounce, Cover, Push, Pull, and Reposition as its primary tactical language.

### Ramp

Invests early actions and resources into transformations, summons, equipment, personal resources, or progressively stronger card states.

### Chain

Builds action sequences through Follow-Up, Assist Attack, Counter, Reuse, immediate plays, or repeated clash pressure.

A lineup may fit several archetypes. The metadata is intended for search, recommendations, warnings, and automated lineup analysis, not legality enforcement.

## 2. Reveal Semantics

`Reveal` is its own card-information operation.

Unless an effect explicitly relocates the revealed object:

- A revealed card remains in its current zone.
- Reveal is not Draw.
- Reveal is not Discard.
- Reveal is not Play or Use.
- Reveal is not removal.
- Revealing a card does not generate Ultimate Meter.
- Effects that care about drawing, discarding, playing, using, or removing do not trigger from Reveal alone.

When an effect says to reveal cards and then select or relocate some of them, resolve the reveal first and keep each card in its origin until the relevant relocation instruction resolves.

If a revealed card's owner is defeated before that card is selected or relocated, owner-defeat rules remove it to the appropriate destination before the selection continues. The effect continues with the remaining legal revealed objects.

Rules v2 structured effects must distinguish `reveal_cards` from `draw_cards`, `search`, `seek`, `scry`, and movement between card zones.

## 3. Complexity and Difficulty

Complexity is measured by **independent rules, remembered states, exceptional timing, and meaningful decisions**, not by the raw number of counters or the length of card text.

A character may track several values and still be understandable when those values follow one coherent engine. Conversely, a short card may be difficult when it creates several hidden exceptions or timing branches.

Difficulty ratings should consider:

- Number of independent decisions per turn.
- Number of states that materially change card behavior.
- Timing sensitivity.
- Target and position planning.
- Shared-resource forecasting.
- Memory burden.
- Failure severity.
- Opponent knowledge required.

Do not inflate complexity merely to represent a sophisticated character. Simple characters may remain simple when that is faithful.

## 4. Noncombat and Indirect Characters

A character without conventional combat actions must not be given invented punches, durability, or martial skill solely to fit the card system.

Use source-supported actions such as:

- Investigation.
- Information gathering.
- Planning.
- Manipulation.
- Blackmail.
- Command.
- Traps.
- Equipment.
- Summons or agents.
- Negotiation.
- Target marking.
- Alternate defeat conditions.
- Protection, escape, or concealment.

Their Basics must still be foundational actions, but those actions do not need to be ordinary Attacks or Defenses.

## 5. Copying, Adaptation, and Broad Move Libraries

Copy and adaptive characters require explicit boundaries.

Document:

- What can be copied: card, action type, effect, status, Property, resource, form, or complete card definition.
- What cannot be copied.
- Whether knowledge, equipment, anatomy, bloodline, contract, companion, or source-system requirements are also needed.
- Whether copied Power is preserved, recalculated, capped, or replaced by the copier's own output.
- Whether the copy is temporary, created, retained, exhausted, or permanently learned.
- Whether Ultimate pathways can be copied.
- How ownership and defeat interact with the copied card.
- How recursive copying and self-copy loops are prevented.

Characters with extremely broad canonical move libraries should use version boundaries, Created cards, state replacements, searches, or intentional omission rather than placing every move into the starting five.

## 6. Status-Mode Discipline

Use one number for one coherent fictional concept.

Rules v2 status modes are:

- `binary`: a state with no numeric magnitude.
- `stack`: simple layers, charges, or duration when one integer is sufficient.
- `value`: a resource, progress tracker, ammunition amount, or countdown.
- `potency_count`: strength per trigger plus separate persistence or remaining activations.

Do not use `potency_count` when only Count is meaningful. Do not invent a dummy Potency merely to preserve a display label.

The original audit used DIO's Time Stop as an example of a possible one-number migration. That example identifies a status-model question; it does not approve a character-specific mode, value, duration, or dependency change. Those decisions require DIO's own reviewed changelog.

## 7. Card Provenance Is Not an Action Type

`Created` describes where a card came from, not what action it performs.

Action Types remain:

- Basic.
- Technique.
- Ultimate.
- Attack.
- Defense.
- Special.

Card provenance or origin should be stored separately, for example:

- `starting`
- `created`
- `scenario`
- `generated_variant`

A Created card may still be a Technique, Attack, Defense, or Special according to its actual behavior.

## 8. Properties and Source-System Tags

Rules v2 separates two optional classification axes.

### Properties

Properties describe elements, materials, phenomena, or delivery qualities such as:

- Electric.
- Fire.
- Ice.
- Sonic.
- Explosive.
- Radiation.
- Acid.

### Source-System Tags

Source-System Tags identify fictional power frameworks or special interaction systems such as:

- Ki.
- Chakra.
- Reiatsu.
- Haki.
- Stand.
- Nen.
- Cursed Energy.
- Technology, when a mechanic needs that distinction.

Neither category has inherent universal rules. They matter only when an effect, resistance, weakness, requirement, or interaction explicitly references them.

Do not classify a source system as a Damage Type. Do not assume two source systems are equivalent merely because both are supernatural energy.

## 9. Schema Integration Findings

The second-pass audit required Schema v2 to:

- register every effect primitive used by its examples;
- include `set_hp` or an equivalent typed HP-setting primitive;
- use the general `grant_keyword` primitive with a typed card target or filter instead of an undocumented specialized primitive;
- include `when_sacrificed`, `on_heal`, and `on_hp_restored` in the timing and event model;
- include `reveal_cards` as a distinct effect primitive;
- preserve existing Ultimate-Meter gain behavior through a typed resource primitive or documented migration alias;
- store Created-card provenance separately from Action Types;
- keep Properties separate from Source-System Tags;
- support a coherent one-number status mode without deciding a character-specific migration;
- define defeat timing through named resolving units rather than an undefined phrase.

These are implementation and representation findings. A schema correction does not independently approve a gameplay change.

## 10. Integration status

This historical record remains visible until its accepted content is checked against the owning canonical sources.

Integration targets:

1. Lineup Archetypes, Reveal semantics, provenance, classifications, and approved global semantics belong in the Rules v2 Decision Record and structured global reference.
2. Complexity, noncombat design, copying, and broad move-library guidance belong in the Character Authoring Framework.
3. Status-mode requirements belong in the Decision Record, Schema v2, and compatibility review rules.
4. Schema findings belong in Schema v2 and its validators.
5. Character-specific examples belong only in reviewed character changelogs when they propose executable changes.

After every accepted item is integrated and verified, this page may be moved out of active navigation or archived. Its history should remain traceable rather than being silently erased.

Repository existence, implementation support, and GitHub mergeability are not substitutes for specification correctness, review, and validation.