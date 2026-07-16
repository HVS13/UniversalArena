# Rules v2 Migration Foundation Checklist

> **Scope:** This checklist applies only to the migration and validation foundation introduced by PR #2. Active roster conversion, global-rules migration, exporter conversion, lore audits, and final documentation synchronization belong to later pull requests.

## Included foundation

- [x] Add consolidated Rules v2 content registries.
- [x] Add deterministic per-character migration overrides.
- [x] Add a dry-run and write-mode character migration CLI.
- [x] Add a Rules v2 validator.
- [x] Keep the existing Rules v1 validator available during transition.
- [x] Add npm commands for transitional validation, migration checking, write mode, and strict Rules v2 validation.

## Validation completed

Validated on branch `agent/rules-v2-implementation` at commit `9b3c239`:

- [x] `npm install` completed.
- [x] `npm run validate` passed.
- [x] Transitional Rules v2 validation found 9 expected Rules/Schema v1 warnings and 0 errors.
- [x] `npm run migrate:v2:check` completed deterministically.
- [x] Migration dry-run checked all 9 character files.
- [x] Migration report contained 27 review warnings and 0 fatal errors.
- [x] `mkdocs build --strict` passed.
- [x] Dependency audit result was reviewed and documented: 1 moderate-severity finding.

The migration warnings are expected inputs for later roster and global-rules work. They are not evidence that the roster has been migrated.

## Expected dry-run warnings

The reviewed report identified:

- 19 Unique statuses requiring typed-rule review.
- 4 `self_missing_status` conditions requiring review.
- 3 variable Power expressions requiring manual typed-expression design.
- 1 missing generated Ultimate pathway for Monkey D. Luffy.

These warnings must be resolved in later implementation PRs before Rules v2 can be declared implemented.

## Explicitly not completed by this PR

- Active character YAML migration.
- Manual lore and character-feel audits.
- Typed conversion of Unique-status executable behavior.
- Global keyword, status, term, role, classification, and area migration.
- Rules v2 exporter and manifest conversion.
- Generated Markdown synchronization.
- Rules engine or web-game implementation.
- Final roster regression tests.

Do not run `npm run migrate:v2` merely to validate this foundation PR.

## Foundation merge gate

PR #2 may be marked ready when:

- [x] Legacy Markdown/YAML synchronization passes.
- [x] Transitional Rules v2 validation passes with no errors.
- [x] Migration dry-run completes deterministically.
- [x] The report contains no fatal error or malformed output.
- [x] Strict MkDocs build passes.
- [x] Dependency findings are recorded without applying an uncontrolled forced fix.
- [x] The PR description clearly states that active content remains Rules v1.

After this PR merges, subsequent PRs should use the migration foundation without silently treating dry-run output as approved roster design.
