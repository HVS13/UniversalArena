# TODO

## Docs repo (UniversalArena)
- Configure the GitHub Action secrets/vars (`UA_GAME_REPO`, `UA_SYNC_TOKEN`) to enable auto-sync.
- Keep structured `effects` + `transforms` aligned with the exporter and `docs/data/README.md` as new mechanics are added.
- Extend the schema only when needed for unmodeled mechanics (set-value effects, spend/draw/creation if text parsing is not sufficient).
- Formalize any remaining ambiguous rules in `docs/faq.md` and reference pages.
- Keep keyword Core/Advanced tiers and status Mode/Turn End lines aligned between docs and `docs/data`.

## Game repo (UniversalArena-Web)
- Extend structured effect coverage for spend/draw/creation/set-value so legacy text parsing can be removed once coverage is high.
- Audit remaining status/keyword triggers and add any missing ones (deck reshuffle rules if needed, per-card special cases).
- Add multiplayer server (room code relay) and client sync.
- Consider surfacing keyword tiers and status Mode/Turn End lines in tooltips or filters.
