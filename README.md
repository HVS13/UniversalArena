# UniversalArena

Rules reference and canonical data source for Universal Arena.

- Local preview: `mkdocs serve`
- Production build: `mkdocs build --strict`
- Authoring guide: `docs/adding-content.md`
- Data schema: `docs/data/README.md`
- MkDocs config: `mkdocs.yml`

## Workflow

1. Update docs in `docs/` and structured data in `docs/data/`.
   - Character markdown is presentation-only; update matching `docs/data/characters/*.yml` for any card changes.
2. Validate markdown/data alignment:
   - `cd docs/scripts`
   - `npm install`
   - `npm run validate`
3. Preview or validate the docs:
   - `mkdocs serve` (local preview), or
   - `mkdocs build --strict` (strict build).
4. Keep reference pages and `docs/data` aligned (keywords, status effects, terms, and templates).

## Data export (for the web game)

Exporter script: `docs/scripts/export-game-data.mjs`.

```powershell
cd C:\Git\UniversalArena\docs\scripts
npm install
node export-game-data.mjs --out C:\Git\UniversalArena-Web\packages\data\src --assets-out C:\Git\UniversalArena-Web\apps\client\public\assets\characters
```

## Sync checklist

1. Make docs/data changes in this repo and run `npm run validate` in `docs/scripts`.
2. Export into the game repo (`node export-game-data.mjs --out ... --assets-out ...`).
3. Commit/push the docs repo.
4. Commit/push the game repo export output (or let CI do it).

## CI export workflow (docs -> game repo)

Workflow: `.github/workflows/export-game-data.yml`

Required repo settings:
- Repo variable: `UA_GAME_REPO` = `Owner/UniversalArena-Web`
- Repo secret: `UA_SYNC_TOKEN` (token with write access to the game repo)

## Current state

- Character YAMLs include structured effects and restrictions; keep `effect` text for readability and any unmodeled mechanics.
- Keyword data includes a Core/Advanced tier; status entries include Mode (P/C, S, V) and explicit Turn End lines.
- Rules assume 3v3 teams with shared deck/hand/energy/ultimate and per-character HP/status.
- Use `TODO.md` to track outstanding documentation or data consistency work.
