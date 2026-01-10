# UniversalArena

Rules reference and canonical data source for Universal Arena.

- Local preview: `mkdocs serve`
- Production build: `mkdocs build --strict`
- Authoring guide: `docs/adding-content.md`
- Structured effects schema: `docs/data/README.md`
- Game repo: `C:\Git\UniversalArena-Web`
- Export data to game:
  `node C:\Git\UniversalArena\docs\scripts\export-game-data.mjs --out C:\Git\UniversalArena-Web\packages\data\src --assets-out C:\Git\UniversalArena-Web\apps\client\public\assets\characters`
- CI sync: `.github/workflows/export-game-data.yml` exports on push to `main` when `UA_GAME_REPO` and `UA_SYNC_TOKEN` are configured.

## Prerequisites

- Node.js 18+ for the exporter.
- If running the exporter locally for the first time: `cd C:\Git\UniversalArena\docs\scripts` then `npm install`.

## Cross-repo workflow

1. Update rules/reference pages and `docs/data` here.
2. Export to `C:\Git\UniversalArena-Web\packages\data\src` (and assets) after any data changes.
3. If core logic or UI changes in the web repo alter rules, update the docs and data here to match.

## Step-by-step for docs + game sync

1. Edit docs in `docs/` and data in `docs/data/`.
2. Preview or validate the docs:
   - `mkdocs serve` (local preview), or
   - `mkdocs build --strict` (strict build).
3. Export data to the game repo:
   - One-time setup: `cd C:\Git\UniversalArena\docs\scripts` then `npm install`
   - Run export:
     `node C:\Git\UniversalArena\docs\scripts\export-game-data.mjs --out C:\Git\UniversalArena-Web\packages\data\src --assets-out C:\Git\UniversalArena-Web\apps\client\public\assets\characters`
4. If core rules changed, run the golden tests in the game repo:
   - `cd C:\Git\UniversalArena-Web`
   - `cmd /c pnpm golden`

## CI export workflow (docs -> game repo)

Use this once per repo to enable the auto-sync from docs to the game repo.

1. Create a fine-grained PAT with write access to `UniversalArena-Web` contents.
2. In the docs repo (GitHub):
   - Settings -> Secrets and variables -> Actions -> Variables:
     - `UA_GAME_REPO` = `Owner/UniversalArena-Web`
   - Settings -> Secrets and variables -> Actions -> Secrets:
     - `UA_SYNC_TOKEN` = your PAT
3. Run the workflow:
   - Actions -> Export Game Data -> Run workflow.
   - Optional: set the `game_repo` input to override `UA_GAME_REPO`.
4. Verify the run:
   - Workflow run succeeds.
   - Game repo gets a commit with message `chore: sync game data`.
   - `packages/data/src` and `apps/client/public/assets/characters` updated in the game repo.

Auto-sync runs on push to `main` when `docs/data`, `docs/assets/characters`, or the exporter changes.

## Current state

- All current character YAMLs include structured effects and restrictions; keep `effect` text for readability and any unmodeled mechanics.
- The game engine enforces timing windows, status caps/expiry/trigger hooks, hand/deck play, and structured effects for set/reduce/spend and equipment switching; restriction enforcement is structured-only.
- Legacy text parsing still exists for unmodeled mechanics (optional spend, bonus damage, draw/create, unique triggers); keep coverage tracked in `TODO.md`.
- Rules assume 3v3 teams with shared deck/hand/energy/ultimate and per-character HP/status.
- Keyword data includes a Core/Advanced tier; status entries include Mode (P/C, S, V) and explicit Turn End lines in docs.
- Use `TODO.md` in both repos to track remaining engine gaps before removing legacy parsing.
