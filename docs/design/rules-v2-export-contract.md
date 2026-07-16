# Rules v2 Export Contract

> **Status:** Rules v2 export infrastructure.  
> **Transition state:** The active roster remains Rules v1. The existing `npm run export` command remains the Rules v1 exporter until the roster migration is complete.

Universal Arena uses separate export paths during the staged migration so Rules v1 data is never silently reinterpreted as Rules v2.

## Export commands

From `docs/scripts`:

```powershell
npm run export       # Current Rules v1 package
npm run export:v1    # Explicit Rules v1 alias
npm run export:v2    # Rules v2 package; requires an entirely Rules v2 character directory
```

The Rules v2 exporter is strict by default. It blocks output when it finds structural or compatibility errors, and it also blocks warnings unless `--allow-warnings` is supplied for a noncanonical preview.

Do not use `--allow-warnings` for a published build.

## Rules v2 inputs

The exporter reads:

- `docs/data/characters/` or `--characters-dir <path>`.
- `docs/data/registries.yml`.
- `docs/data/rules-v2/global-rules.yml`.
- The compatibility aliases from `docs/data/migrations/rules-v2-overrides.yml`.
- Character art from `docs/assets/characters/` unless `--skip-assets` is used.

Every character in the selected directory must declare:

```yaml
schemaVersion: 2
rulesVersion: 2
```

A directory containing Rules v1, mixed-version, malformed, or unaudited Rules v2 character data is not a valid canonical Rules v2 export source.

## Output package

The Rules v2 package contains:

| File | Contents |
| --- | --- |
| `characters.json` | Rules v2 roster data with explicit ownership, classifications, lifecycle, typed effects, statuses, and Ultimate pathways. |
| `registries.json` | Versioned classification and identifier registries. |
| `global-rules.json` | Approved shared Rules v2 mechanics and Rules v1 override mappings. |
| `aliases.json` | Temporary compatibility aliases used during migration. |
| `manifest.json` | Compatibility identity, validation result, source metadata, and content hashes. |
| `assets/characters/` | Referenced character art unless asset copying is disabled. |

The manifest is not included in its own `contentHash`. Every other JSON output has an individual SHA-256 hash under `files` and contributes to the package `contentHash`.

## Manifest shape

```json
{
  "schemaVersion": 2,
  "rulesVersion": 2,
  "exportProfile": "rules-v2",
  "sourceRepository": "HVS13/UniversalArena",
  "sourceCommit": "...",
  "generatedAt": "...",
  "sourceDirty": false,
  "publishable": true,
  "contentHash": "sha256:...",
  "files": {
    "aliases.json": "sha256:...",
    "characters.json": "sha256:...",
    "global-rules.json": "sha256:...",
    "registries.json": "sha256:..."
  },
  "rosterCount": 9,
  "registryVersions": {},
  "migrationsApplied": ["v1-to-v2"],
  "validation": {
    "errors": 0,
    "warnings": 0,
    "strict": true
  }
}
```

`publishable` is false when canonical source data is dirty or the exporter cannot identify a source commit. Use `--require-publishable` in release or CI workflows to block such output.

## Useful options

```text
--characters-dir <path>
--registries <path>
--global-rules <path>
--aliases <path>
--assets-dir <path>
--out <path>
--assets-out <path>
--source-repository <owner/repo>
--source-commit <sha>
--generated-at <ISO timestamp>
--migrations-applied <comma-separated ids>
--skip-assets
--allow-warnings
--require-publishable
```

Explicit `--source-commit` and `--generated-at` values support deterministic CI and fixture exports.

## Transition rules

- `npm run export` remains Rules v1 while active character YAML remains Rules v1.
- `npm run export:v2` must never be pointed at Rules v1 data and cannot silently convert it.
- The migration CLI performs conversion; the exporter only validates and packages already-migrated data.
- Character research and lore review remain roster-PR responsibilities, not exporter responsibilities.
- After every active character is audited and migrated, a later PR may make the Rules v2 exporter the default command.

## Validation

Run:

```powershell
npm run validate
npm run test:export:v2
```

The exporter test uses a self-contained Rules v2 fixture and verifies:

- Successful strict Rules v2 export.
- Deterministic output for fixed source metadata.
- Manifest and per-file hashes.
- Required package files.
- Explicit rejection of Rules v1 input.

The fixture exists only to exercise the data contract. It is not a playable roster character and is never included in the canonical roster export.
