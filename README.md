# UniversalArena

Rules reference and canonical data source for Universal Arena.

- Local preview: `mkdocs serve`
- Production build: `mkdocs build --strict`
- Character authoring guide: `docs/characters/character-creation-guide.md`
- Power formula: `docs/power-calculation.md`
- Current roster Power ledger: `docs/power-ledger.md`
- Data schema: `docs/data/README.md`
- MkDocs config: `mkdocs.yml`

## Workflow

1. Update docs in `docs/` and structured data in `docs/data/`.
   - Character markdown is presentation-only; update matching `docs/data/characters/*.yml` for any card changes.
   - Complete a Power Budget Record for every new or changed Power-bearing card family.
2. Validate markdown/data alignment:
   - `cd docs/scripts`
   - `npm install`
   - `npm run validate`
3. Reproduce Power arithmetic when needed:
   - `npm run power -- --help`
   - Example: `npm run power -- --constant 20 --range melee --pure --speed slow`
4. Preview or validate the docs:
   - `mkdocs serve` (local preview), or
   - `mkdocs build --strict` (strict build).
5. Keep reference pages and `docs/data` aligned (keywords, status effects, terms, and templates).

## Data export (for the web game)

Exporter script: `docs/scripts/export-game-data.mjs`.

```powershell
cd C:\Git\UniversalArena\docs\scripts
npm install
node export-game-data.mjs --out C:\Git\UniversalArena-Web\packages\data\src --assets-out C:\Git\UniversalArena-Web\apps\client\public\assets\characters
```

## Sync checklist

1. Make docs/data changes in this repo and run `npm run validate` in `docs/scripts`.
2. Run `npm run power -- ...` for changed Power calculations and update `docs/power-ledger.md` when a pattern changes.
3. Export into the game repo (`node export-game-data.mjs --out ... --assets-out ...`).
4. Commit/push the docs repo.
5. Commit/push the game repo export output, or review the draft PR opened by CI.

## CI export workflow (docs -> game repo)

Workflow: `.github/workflows/export-game-data.yml`

Required repo settings:
- Configure one credential mode:
  - Recommended, GitHub App: repo secrets `UA_SYNC_APP_ID` and `UA_SYNC_APP_PRIVATE_KEY`. Install the App only on `HVS13/UniversalArena-Web` with Contents and Pull requests read/write access. Do not grant Actions, Administration, Secrets, Workflows, ruleset bypass, or other permissions. The workflow mints its short-lived installation token at runtime, and the App bot is the generated PR author.
  - Fallback, fine-grained PAT: repo secret `UA_SYNC_TOKEN`, restricted to `HVS13/UniversalArena-Web` with Contents and Pull requests read/write access. A PAT creates the generated PR as its human owner. Use this mode only when another human account can provide the required independent approval; a pull-request author cannot approve their own PR.

The workflow is restricted to canonical `main` and the fixed target `HVS13/UniversalArena-Web`. It validates canonical data, exports an exact commit-identified artifact, verifies the manifest and generated-only path allowlist, pushes a dedicated sync branch, and opens a draft Web PR. The Web PR triggers Friend Alpha Checks and must receive independent review. The workflow never merges the PR.

If the credential is missing, partially configured, or cannot access the Web repository, the workflow fails without pushing. Secret creation and rotation belong in GitHub settings and must never be committed.

Before this workflow is merged, Web repository settings must protect `main`: require a pull request, require at least one approval, dismiss stale approvals, require conversation resolution, require the successful Friend Alpha check from PR #4, require the branch to be up to date, and block force pushes and deletion. Select the existing successful check from GitHub's required-check list instead of typing its context manually. Do not grant the sync App a ruleset bypass. The canonical workflow cannot grant itself permission to merge or substitute for that repository-level policy.

## Current state

- Character YAMLs include structured effects and restrictions; keep `effect` text for readability and any unmodeled mechanics.
- Keyword data includes a Core/Advanced tier; status entries include Mode (P/C, S, V) and explicit Turn End lines.
- Rules assume 3v3 teams with shared deck/hand/energy/ultimate and per-character HP/status.
- Power authoring uses the canonical reference, calculator, and current-roster ledger.
- Use `TODO.md` to track outstanding documentation or data consistency work.
