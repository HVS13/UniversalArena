---
name: ua-character-kit-design
description: Design balanced character kits and output full character pages; use when creating new characters, rebalancing existing kits, or writing card/innate text for UniversalArena.
---

# UA Character Kit Design

## Overview

Design a cohesive kit, then output a complete character page that fits the project's structure and balance conventions.

## Inputs to confirm

- Theme/origin, version label, difficulty, and intended role.
- Power band and gameplay goals (burst, control, support, tempo).
- Required keywords or status effects, if any.

## Design workflow

1. Review 2-3 existing character pages to anchor power, speed, and cost ranges.
2. Define the gameplan paragraph and 1-2 innates that drive the kit.
3. Choose keywords/status effects; add new ones only if absolutely necessary.
4. Create five cards plus an Ultimate; keep effect text concise and tag order consistent with `docs/adding-content.md`.
5. Sanity-check for infinite loops, auto-win combos, or uncounterable turns.

## Output format

1. Use `docs/characters/template.md` structure verbatim.
2. Add artwork in `docs/assets/characters/`.
3. Update `docs/characters/index.md` and `mkdocs.yml` when adding a new character.

## References

- `docs/characters/template.md`
- `docs/characters/index.md`
- `docs/adding-content.md`
- `docs/keywords.md`
- `docs/status-effects.md`
- `docs/card-types.md`
- `mkdocs.yml`
