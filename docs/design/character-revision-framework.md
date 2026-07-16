# Character Revision Framework

> **Status:** Approved AI and human workflow for revising an existing Universal Arena character.
> **Applies to:** Rules migrations, balance changes, lore audits, card renames, redesigns, and roster conversions.
> **Read with:** `design-principles.md` and `character-authoring-framework.md`.

Revising an existing character is not the same task as designing a new character. The current kit contains design intent, play rhythm, economy assumptions, matchup roles, and player expectations even when some wording or implementation is imperfect.

## 1. Default rule: preserve intent

A revision starts from the existing kit, not from a blank page.

Do not remove or replace an established engine until its purpose is understood. A nonliteral mechanic may still be lore-accurate when it reproduces the character's decisions, escalation, limitations, or signature rhythm.

Examples:

- Blood reducing DIO's card costs is not a claim that blood is literal Energy. It can represent restored physiology, synchronization, and expanded action capacity.
- Light's low Mental Power is not a claim that he uses telepathy. It can represent contestable psychological pressure inside the clash system.
- A countdown may translate seconds, investigation progress, or delayed inevitability into visible game timing.

Literal simulation is not automatically more accurate than a coherent abstraction.

## 2. Required intent matrix

Before changing structured character data, document every existing Innate, status, card, variant, and Ultimate using this matrix:

| Field | Required question |
| --- | --- |
| Current mechanic | What does the existing rule do? |
| Canonical job | Which source behavior or identity does it represent? |
| Gameplay job | What role does it perform in the five-card kit? |
| Decision created | What meaningful choice does the player make? |
| Economy dependency | What Energy, Meter, hand, status, or setup assumption supports it? |
| Clash role | Is it Attack, Defense, or Special, and what changes if that classification changes? |
| Dependencies | Which other cards, statuses, Innates, or timings rely on it? |
| Failure state | What happens when setup fails or the card is unavailable? |
| Player expectation | What recognizable play pattern would be lost if it changed? |
| Revision class | Preserve, clarify, rebalance, rename, restructure, or replace. |

No mechanical redesign is approved without this matrix.

## 3. Revision classes

Every proposed change must be labeled as one of four classes.

### Required Rules v2 migration

A structural change needed for deterministic Rules v2 behavior without intentionally changing play.

Examples:

- Explicit ownership.
- Typed status rules.
- Ultimate pathways.
- Electric moved from Damage Type to Property.
- Correct Exhaust destination timing.

### Required lore correction

An existing mechanic materially contradicts the selected source boundary or character identity.

A lore correction must identify the contradiction, the source evidence, and the smallest change that fixes it.

### Optional design refinement

A change intended to improve clarity, economy, counterplay, or play feel. It is not mandatory for migration or lore.

Optional refinements require explicit human approval before implementation.

### Explicit non-change

A reviewed mechanic that remains because it supports the intended engine, even if it is abstract or unconventional.

Record important non-changes so later agents do not repeatedly remove them.

## 4. Preserve dependency chains

Never remove one part of an engine without auditing every dependent value.

Examples:

- Removing cost reduction requires rebasing every printed Energy cost and checking team opportunity cost.
- Changing a card from Attack or Defense to Special changes clash resolution, cancellation, Hit timing, and defensive interaction.
- Removing a status may invalidate transformations, Ultimate requirements, follow-ups, or source-basis claims.
- Changing status duration may alter Retain pressure, hand cycling, and Meter timing.

A change that looks local may be a full-kit redesign.

## 5. Shared-economy gate

The team normally receives 5 shared Energy per turn. Review the kit at three investment levels:

1. **Low investment:** Can the character contribute without consuming the whole turn?
2. **Normal investment:** Can the character execute its ordinary loop while allies still matter?
3. **Peak investment:** Is monopolizing the team economy justified by a visible payoff?

High-demand ramp characters are allowed. They still need a credible floor or a deliberate reason they do not have one.

If a personal resource reduces costs, treat it as part of the printed Energy curve. Do not judge printed costs as standalone numbers, and do not remove the resource without recalculating them.

## 6. Classification-semantics gate

Before changing Action Type, Damage Type, Speed, range, area, or tags, state the rules consequences.

Especially:

- Attack versus Attack contests Power.
- Defense resolves before a paired Attack.
- A card paired with a Special normally allows both cards to resolve.
- A Special with no Power is not a weak clash card; it does not participate in the same contest.
- Mental damage is a classification for direct harm to cognition, perception, emotion, or operational effectiveness. It does not automatically imply telepathy.

A classification change requires player-experience analysis, not only lore wording.

## 7. Complexity standard

Do not optimize for the fewest rules. Optimize for one coherent engine.

Complexity is justified when remembered states and choices reinforce the same character rhythm. Complexity is suspect when several unrelated counters or exceptions do not interact.

Preserve complexity when it creates:

- resource allocation,
- timing decisions,
- risk versus payoff,
- state-dependent card definitions,
- visible progression,
- or competing uses for the same resource.

Simplification is not an improvement when it removes meaningful sequencing or makes the character generic.

## 8. Changelog-before-implementation gate

Before changing executable character data, provide a player-facing changelog for human review.

For the character, each Innate, each status, every card, every variant, and each Ultimate, show:

- **Before**
- **After**
- **Player-facing effect**
- **Reasoning**
- **Revision class**

The changelog must also summarize:

- Energy curve before and after.
- Clash participation before and after.
- Resource loop before and after.
- Power expression before and after.
- New and removed counterplay.

Do not treat silence as approval. Keep the PR draft until the human reviewer accepts the intended gameplay changes.

## 9. AI implementation rules

AI agents revising a character must:

1. Read the active Rules v1 character, approved Rules v2 design documents, migration notes, and relevant lore audit.
2. Build the intent matrix.
3. Identify dependency chains.
4. Produce the player-facing changelog.
5. Receive human direction on strange or disputed changes.
6. Only then update structured data, tests, audits, and PR descriptions.
7. Preserve stable IDs when behavior is preserved; use migrations when IDs or meaning change.
8. Add regression assertions for preserved identity, not only new behavior.

AI agents must not:

- redesign from scratch merely because the schema changed,
- remove a complex engine for cleanliness,
- select a later baseline that erases the existing progression,
- call an abstraction lore-inaccurate only because it is nonliteral,
- change Attack, Defense, or Special without clash analysis,
- remove an economy engine while retaining dependent costs,
- or mark character behavior approved before player-facing review.

## 10. Completion gate

A revision is ready for structured implementation only when:

- The intent matrix is complete.
- Every change has a revision class.
- Dependency and shared-economy audits are complete.
- Classification consequences are documented.
- A player-facing changelog has been reviewed.
- Explicit non-changes are recorded.
- Lore uncertainty is separated from design preference.
- The character's original recognizable loop is preserved or intentionally replaced with human approval.
