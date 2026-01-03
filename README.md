# UniversalArena

Rules reference and canonical data source for Universal Arena.

- Local preview: `mkdocs serve`
- Production build: `mkdocs build --strict`
- Authoring guide: `docs/adding-content.md`
- Structured effects schema: `docs/data/README.md`
- Game repo: `C:\Git\UniversalArena-Web`
- Export data to game:
  `node C:\Git\UniversalArena\docs\scripts\export-game-data.mjs --out C:\Git\UniversalArena-Web\packages\data\src --assets-out C:\Git\UniversalArena-Web\apps\client\public\assets\characters`

## Current state

- All current character YAMLs include structured effects where supported; keep `effect` text for unmodeled mechanics.
- The game engine now enforces timing windows, status caps/expiry/trigger hooks, hand/deck play, and spend/draw/creation handling; legacy text parsing still exists for unmodeled mechanics (set-value effects, unique triggers).
- Use `TODO.md` in both repos to track remaining engine gaps before removing legacy parsing.
