# UniversalArena

Rules reference and canonical data source for Universal Arena.

- Local preview: `mkdocs serve`
- Production build: `mkdocs build --strict`
- Authoring guide: `docs/adding-content.md`
- Data schema: `docs/data/README.md`
- MkDocs config: `mkdocs.yml`

## Workflow

1. Update docs in `docs/` and structured data in `docs/data/`.
2. Preview or validate the docs:
   - `mkdocs serve` (local preview), or
   - `mkdocs build --strict` (strict build).
3. Keep reference pages and `docs/data` aligned (keywords, status effects, terms, and templates).

## Current state

- Character YAMLs include structured effects and restrictions; keep `effect` text for readability and any unmodeled mechanics.
- Keyword data includes a Core/Advanced tier; status entries include Mode (P/C, S, V) and explicit Turn End lines.
- Rules assume 3v3 teams with shared deck/hand/energy/ultimate and per-character HP/status.
- Use `TODO.md` to track outstanding documentation or data consistency work.
