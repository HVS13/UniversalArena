# Parallel Rules v2 Character Instructions

These instructions apply to every file in this directory.

Before creating or revising a character, read:

1. `../../../design/design-principles.md`
2. `../../../design/character-authoring-framework.md`
3. `../../../design/character-revision-framework.md`
4. `../../../design/rules-v2-decisions.md`
5. `../../../data/migrations/v1-to-v2.md`
6. The active Rules v1 file with the same slug under `../../characters/`
7. The matching lore audit under `../../../design/lore-audits/`

For an existing character, Rules v2 is a migration and audit before it is a redesign.

Mandatory sequence:

1. Build the full intent matrix for the existing Innates, statuses, cards, variants, Ultimate pathways, Energy curve, clash roles, and resource dependencies.
2. Classify each proposed change as required migration, required lore correction, optional refinement, or explicit non-change.
3. Produce a player-facing before/after changelog.
4. Obtain human direction on mechanical changes before treating them as approved.
5. Update structured data, audits, tests, and PR descriptions only after the intended gameplay is accepted.

Do not remove a resource or cost engine without rebasing all dependent costs. Do not change Attack, Defense, or Special without documenting the clash consequences. Do not simplify a coherent character engine merely because its abstraction is nonliteral.

Parallel files remain non-publishable until roster cutover and full validation.
