# TODO

## Priority order
1. Engine determinism and rules completeness (structured effects coverage, trigger audit, deterministic replay, golden tests).
2. UI explainability (Active Zone banner, resolution rail, nested event log, status/keyword tooltips).
3. Pipeline automation and consistency (data export workflow, template enforcement, power budget checks).
4. Multiplayer (relay server + client sync), only after 1-3 are done.

## Docs repo (UniversalArena)
- DONE: Add a CI workflow or script to export canonical `docs/data` and sync to `C:\Git\UniversalArena-Web\packages\data` without relying on a local Windows path.
- DONE: Document local and CI export steps in `README.md` (prereqs, workflow run, verification).
- DONE: Configure the GitHub Action secrets/vars (`UA_GAME_REPO`, `UA_SYNC_TOKEN`) to enable auto-sync.
- DONE: Verify the export workflow pushes a sync commit after a docs/data change (manual dispatch is fine).
- Keep structured `effects` + `transforms` aligned with the exporter and `docs/data/README.md` as new mechanics are added.
- Extend schema validation for new effect types as they are introduced.
- Extend the schema only when needed for remaining unmodeled mechanics (optional spend, bonus damage, draw/create, unique triggers).
- Ensure any "Can only be used if" / "Cannot be used if" text has matching `restrictions` (core no longer parses restriction text).
- Formalize any remaining ambiguous rules in `docs/faq.md` and reference pages.
- Confirm rules references match 3v3 team play (shared deck/hand/energy/ultimate, per-character HP/status, defeat/resurrection expectations).
- Keep keyword Core/Advanced tiers and status Mode/Turn End lines aligned between docs and `docs/data`.
- Define template and power-budget checks for card data, and add CI validation if feasible.
- Enforce template sections and timing label phrasing for all characters.
- Standardize card type tag order for data/UI filtering.
- Enforce power budgeting targets unless exceptions are documented.

## Game repo (UniversalArena-Web)
- Tracked in `C:\Git\UniversalArena-Web\TODO.md` (core rules, UI, multiplayer, golden test CI).
