# Parallel Rules v2 Character Data

This directory contains manually audited Rules v2 character files during staged roster migration.

## Authority and activation

- Files here are proposed intended Rules v2 behavior for their exact selected versions until their player-facing changelog is reviewed and accepted.
- They do **not** replace same-character Rules v1 files under `docs/data/characters/` until an explicit roster-cutover pull request moves or promotes them.
- The default Rules v1 exporter and current character pages continue to read `docs/data/characters/`.
- `npm run migrate:v2` must not overwrite these audited files or be treated as approval of generated output.
- The scoped `AGENTS.md` and `docs/design/character-revision-framework.md` are mandatory for AI-authored revisions.

## Current contents

- `dio-brando-part-3.yml`: Cairo DIO arc-composite, preserving the feeding and Blood Focus ramp into Time Stop.
- `light-yagami-kira.yml`: original-manga Kira, preserving contestable Basics, information decay, and the Death Note countdown.

## Required review

Every file in this directory must have:

- A matching lore audit under `docs/design/lore-audits/`.
- An intent matrix covering the active Rules v1 character.
- A player-facing before/after changelog reviewed before mechanical approval.
- Explicit continuity and version boundaries.
- Source-basis records and considered-but-omitted abilities.
- Exactly two starting Basics and three starting Techniques.
- At least one Ultimate pathway.
- Character-specific regression tests that cover preserved identity and approved changes.
- Source-interaction outcomes when a mechanic depends on crossover eligibility or weakness.

## Export status

`npm run export:v2` validates and packages this directory, including `source-interactions.json`, when it is supplied through `--characters-dir`.

Until every filename in the active Rules v1 roster has a reviewed counterpart here, the package wrapper marks the result with `partialRoster: true`, lists the missing character IDs, and forces `publishable: false`. `--require-publishable` blocks such a partial export before output is produced.
