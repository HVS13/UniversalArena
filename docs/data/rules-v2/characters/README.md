# Parallel Rules v2 Character Data

This directory contains manually audited Rules v2 character files during staged roster migration.

## Authority and activation

- Files here are approved intended Rules v2 behavior for their exact selected versions.
- They do **not** replace same-character Rules v1 files under `docs/data/characters/` until an explicit roster-cutover pull request moves or promotes them.
- The default Rules v1 exporter and current character pages continue to read `docs/data/characters/`.
- `npm run migrate:v2` must not overwrite these audited files or be treated as approval of generated output.

## Current contents

- `dio-brando-part-3.yml`: High DIO from the final *Stardust Crusaders* battle.
- `light-yagami-kira.yml`: original-manga Kira with Death Note memories and practical notebook or page-fragment access.

## Required review

Every file in this directory must have:

- A matching lore audit under `docs/design/lore-audits/`.
- Explicit continuity and version boundaries.
- Source-basis records and considered-but-omitted abilities.
- Exactly two starting Basics and three starting Techniques.
- At least one Ultimate pathway.
- Character-specific regression tests.
- Source-interaction outcomes when a mechanic depends on crossover eligibility or weakness.

## Export status

The Rules v2 exporter may be used as a structural validation tool against this directory. Until the source-interaction registry is included in the canonical Rules v2 package and the complete roster is audited, exports from this partial directory are deliberately non-publishable test artifacts.
