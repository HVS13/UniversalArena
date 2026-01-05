# TODO

## Priority order
1. Rules completeness (structured effects coverage, trigger audit, regression tests).
2. UI polish (keyword/status surfacing and gameplay clarity).
3. Multiplayer (relay server + client sync).

## Docs repo (UniversalArena)
- Configure the GitHub Action secrets/vars (`UA_GAME_REPO`, `UA_SYNC_TOKEN`) to enable auto-sync.
- Keep structured `effects` + `transforms` aligned with the exporter and `docs/data/README.md` as new mechanics are added.
- Extend the schema only when needed for remaining unmodeled mechanics (optional spend, bonus damage, draw/create, unique triggers).
- Ensure any "Can only be used if" / "Cannot be used if" text has matching `restrictions` (core no longer parses restriction text).
- Formalize any remaining ambiguous rules in `docs/faq.md` and reference pages.
- Keep keyword Core/Advanced tiers and status Mode/Turn End lines aligned between docs and `docs/data`.

## Game repo (UniversalArena-Web)
- Extend structured effect coverage for remaining optional spend/bonus damage/draw/create mechanics so legacy text parsing can be removed once coverage is high.
- Audit remaining status/keyword triggers and add any missing ones (deck reshuffle rules if needed, per-card special cases).
- Consider surfacing keyword tiers and status Mode/Turn End lines in tooltips or filters.
- Add multiplayer server (room code relay) and client sync.
