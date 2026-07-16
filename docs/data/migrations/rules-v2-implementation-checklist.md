# Rules v2 Implementation Checklist

> **PR strategy:** Complete the full Rules v2 implementation in one long-lived draft pull request. Use separate commits and validation checkpoints. Do not mark the PR ready until every blocking item below passes.

## Checkpoint 1 — Migration foundation

- [x] Add consolidated Rules v2 content registries.
- [x] Add deterministic roster migration overrides.
- [x] Add a dry-run and write-mode character migration CLI.
- [x] Add a Rules v2 validator.
- [x] Keep the existing Rules v1 validator available during transition.
- [ ] Run `npm run migrate:v2:check` in a clean checkout.
- [ ] Review the generated migration report.
- [ ] Resolve migration-script runtime or parsing errors.

## Checkpoint 2 — Generated roster conversion

- [ ] Run `npm run migrate:v2`.
- [ ] Commit all nine migrated character YAML files and the migration report.
- [ ] Run `npm run validate:v2`.
- [ ] Confirm exactly two starting Basics and three starting Techniques per character.
- [ ] Confirm every Ultimate belongs to one pathway.
- [ ] Confirm Electric is a Property, not a Damage Type.
- [ ] Confirm explicit owner, provenance, target, lifecycle, effect ID, timing, and scope fields.

## Checkpoint 3 — Manual roster audit

- [ ] Replace every `review_required` source boundary field.
- [ ] Complete thesis, weakness, power expression, mandatory feel points, and forbidden outcomes.
- [ ] Convert every executable Unique-status display line into typed rules.
- [ ] Resolve every migration warning and unmapped legacy classification.
- [ ] Review effect scope on AoE and Multihit cards.
- [ ] Review targeting for traps, delayed zones, movement-sensitive attacks, and unusual effects.
- [ ] Review ownership and lifecycle of Created cards.
- [ ] Review every Ultimate pathway and lifecycle.
- [ ] Add source-basis and considered-but-omitted records.

## Checkpoint 4 — Global rules and exporter

- [ ] Update global registries and references for Roles, Archetypes, Capabilities, Properties, and Source-System Tags.
- [ ] Migrate Electric references and mitigation filters.
- [ ] Implement Rules v2 Exhaust, Stun, Taunt, Cover, Splash, Bounce, Reveal, Reposition, Defeat Reserve, and Resurrection data.
- [ ] Update `export-game-data.mjs` to emit schemaVersion 2 and rulesVersion 2.
- [ ] Export consolidated registries and migration metadata.
- [ ] Update human-readable generation and Markdown/YAML synchronization for v2 display fields.
- [ ] Preserve explicit compatibility aliases where required.

## Checkpoint 5 — Regression and documentation

- [ ] Add automated tests for clashes, Multihit erosion, target locking, area batches, statuses, lifecycle, economy, defeat, and Resurrection.
- [ ] Add roster-specific regression cases for DIO, Light, Luffy, Leon, and other complex characters.
- [ ] Run `npm run validate`.
- [ ] Run `npm run validate:v2:strict`.
- [ ] Run the exporter into a temporary directory and inspect its manifest.
- [ ] Run `mkdocs build --strict`.
- [ ] Check all internal links and rendered Rules v2/reference/character pages.
- [ ] Run `npm audit` and document dependency findings without using `--force` blindly.

## Merge gate

The PR may be marked ready only when:

- No Rules v1 character YAML remains active.
- No blocking schema, semantic, or compatibility errors remain.
- No `review_required`, `migrationStatus: review_required`, or untyped executable Unique-status behavior remains.
- Every character has passed the roster audit checklist.
- The exporter produces a clean Rules v2 manifest.
- The strict v2 validator, legacy/display synchronizer, regression tests, and strict MkDocs build all pass.
- The PR description accurately states any non-blocking dependency audit findings.
