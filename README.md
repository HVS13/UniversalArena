# UniversalArena

Rules reference and canonical data source for Universal Arena.

- Local preview: `mkdocs serve`
- Production build: `mkdocs build --strict`
- Authoring guide: `docs/adding-content.md`
- Structured effects schema: `docs/data/README.md`
- Game repo: `C:\Git\UniversalArena-Web`
- Export data to game:
  `node C:\Git\UniversalArena\docs\scripts\export-game-data.mjs --out C:\Git\UniversalArena-Web\packages\data\src --assets-out C:\Git\UniversalArena-Web\apps\client\public\assets\characters`

## Cross-repo workflow

1. Update rules/reference pages and `docs/data` here.
2. Export to `C:\Git\UniversalArena-Web\packages\data\src` (and assets) after any data changes.
3. If core logic or UI changes in the web repo alter rules, update the docs and data here to match.

## Current state

- All current character YAMLs include structured effects where supported; keep `effect` text for unmodeled mechanics.
- The game engine now enforces timing windows, status caps/expiry/trigger hooks, hand/deck play, and spend/draw/creation handling; legacy text parsing still exists for unmodeled mechanics (set-value effects, unique triggers).
- Keyword data includes a Core/Advanced tier; status entries include Mode (P/C, S, V) and explicit Turn End lines in docs.
- Use `TODO.md` in both repos to track remaining engine gaps before removing legacy parsing.
