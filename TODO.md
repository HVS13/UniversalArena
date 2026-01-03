# TODO

## Docs repo (UniversalArena)
- Configure the GitHub Action secrets/vars (`UA_GAME_REPO`, `UA_SYNC_TOKEN`) to enable auto-sync.
- Continue converting card effects into structured `effects` blocks in `docs/data/characters/*.yml`.
- Formalize any remaining ambiguous rules in `docs/faq.md` and reference pages.

## Game repo (UniversalArena-Web)
- Finish structured effect coverage and remove legacy text parsing in `packages/core`.
- Implement full timing windows (On Play, Before Clash, After Clash, Before Use, On Use, On Hit, After Use, Always).
- Encode keywords/statuses with correct timing and caps.
- Add multiplayer server (room code relay) and client sync.
