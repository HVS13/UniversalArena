# Rules v2 Audit Supplement

> **Status:** Approved supplement to the Rules v2 specification.  
> **Purpose:** Records accepted decisions and clarifications omitted or expressed inconsistently in the initial specification package.  
> **Precedence:** Where this document explicitly corrects an example or taxonomy in an earlier Rules v2 document, this supplement and the corrected Schema v2 specification take precedence.

Read this with:

- [Design Principles](design-principles.md)
- [Character Authoring Framework](character-authoring-framework.md)
- [Rules v2 Decision Record](rules-v2-decisions.md)
- [Schema v2 Specification](../data/schema-v2.md)

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

A lineup may fit several archetypes. The metadata is intended for search, recommendations, warnings, and AI lineup analysis—not legality enforcement.

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

For example, DIO's Time Stop state should use a one-number mode such as `value` unless its design later introduces a genuinely separate strength dimension. Its display can still use lore-appropriate wording, but the stored mode must remain coherent.

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

## 9. Required Schema Corrections

The corrected Schema v2 specification must:

- Register every effect primitive used by its examples.
- Include `set_hp` or an equivalent typed HP-setting primitive.
- Use the general `grant_keyword` primitive with a typed card target/filter instead of an undocumented specialized primitive.
- Include `when_sacrificed`, `on_heal`, and `on_hp_restored` in the timing/event model.
- Include `reveal_cards` as a distinct effect primitive.
- Preserve existing Ultimate-Meter gain behavior through a typed resource primitive or documented migration alias.
- Store Created-card provenance separately from Action Types.
- Keep Properties separate from Source-System Tags.
- Represent Time Stop with a coherent one-number status mode unless a second numeric concept is intentionally added.
- Define defeat timing as after the current resolving unit—an atomic effect or the current card use according to the Rules v2 timing model—not through an undefined `atomic use` phrase.

## 10. Review Requirement

Before this PR is considered merge-ready:

1. The Schema v2 document must incorporate the corrections above.
2. `AGENTS.md` must include this supplement in the Rules v2 authority list.
3. MkDocs navigation must expose this supplement.
4. The PR description must report the second-pass audit honestly.
5. A strict MkDocs build must be run in CI or a networked checkout.

Repository existence and GitHub mergeability are not substitutes for specification correctness or build validation.
