# TODO

## Docs repo (UniversalArena)
- Add data files for keywords/status effects/terms/card types/roles in `docs/data/`.
- Extend `docs/scripts/export-game-data.mjs` to export all data types, not just characters.
- Add a GitHub Action to export data + character assets into `UniversalArena-Web`.
- Formalize any remaining ambiguous rules in `docs/faq.md` and reference pages.

## Game repo (UniversalArena-Web)
- Replace text parsing with structured effect definitions in `packages/data`.
- Implement full zones/clash/priority flow in `packages/core`.
- Encode keywords/statuses with correct timing and caps.
- Add multiplayer server (room code relay) and client sync.
