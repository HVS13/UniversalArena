# AGENTS

This repository is the MkDocs Material rules reference and canonical structured data source for Universal Arena.

## Start with the authority map

Before interpreting or changing Rules v2, read:

1. `docs/design/rules-v2-authority-map.md`
2. `docs/design/rules-v2-compatibility-policy.md`
3. the source that owns the specific question being reviewed.

Do not use one universal authority ladder for every question. Current behavior, intended design, approved Rules v2 semantics, implementation contracts, and migration each have different sources.

## Foundation continuity

Rules v2 is an evolution of Universal Arena's established foundation.

It should carry forward what already works, clarify implicit behavior, upgrade systems that can serve the same purpose better, expand what the game can represent, and correct demonstrated defects through critical and logical reasoning.

Do not treat a newer document, cleaner schema, familiar convention, or later source version as sufficient reason to replace an established foundation.

A proposed change carries the burden of showing why it is a genuine improvement. Prefer the least disruptive change that fully solves the problem and advances the intended vision.

## Authority by question

### Intended vision and design goals

Use the established intent expressed across the original rules, active systems, and character designs, consolidated by:

- `docs/design/design-principles.md`

Design Principles organize and strengthen the established vision. They do not automatically erase earlier intent.

### Current executable behavior

Use, in order:

1. active structured data in `docs/data/`;
2. current Rules v1 references for behavior not fully represented in data:
   - `docs/characters/character-creation-guide.md`
   - `docs/faq.md`
   - `docs/terminology.md`
   - `docs/card-types.md`
   - `docs/status-effects.md`
   - `docs/keywords.md`
3. active character pages.

These sources define what the game currently does. They do not independently decide what Rules v2 should become.

### Approved Rules v2 global semantics

Use:

1. `docs/design/rules-v2-decisions.md`;
2. corresponding structured entries in `docs/data/rules-v2/global-rules.yml` and `docs/data/registries.yml`;
3. `docs/design/rules-v2-global-reference.md` as the concise operational summary.

A framework example, schema field, checklist item, validator warning, migration suggestion, or exporter capability is not independent gameplay approval.

### Change control for established behavior

Use:

- `docs/design/rules-v2-compatibility-policy.md`

Every material change must state its goal, current behavior, original purpose, actual problem, proposal, preserved intent, benefits, trade-offs, affected content, alternatives, migration, tests, and approval status.

### Implementation contracts

Use:

- `docs/data/schema-v2.md`
- `docs/data/registries.yml`
- `docs/data/rules-v2/global-rules.yml`
- `docs/design/rules-v2-export-contract.md`

These sources represent approved behavior. They do not invent character design, lore interpretation, costs, classifications, or gameplay by supporting a field or primitive.

### Migration and review

Use:

- `docs/data/migrations/v1-to-v2.md` for deterministic conversion;
- `docs/design/character-authoring-framework.md` for research and design work;
- `docs/design/roster-audit-checklist.md` for review coverage;
- the approved character-specific changelog for an existing character.

Migration may report a design problem. It must not silently choose the final redesign.

### Historical correction material

`docs/design/rules-v2-supplement.md` preserves second-pass audit history and accepted correction material until each item is integrated into its owning canonical source.

Do not treat it as a permanent competing authority. Where current canonical sources already contain an integrated correction, use the canonical source.

Generated exports and `site/` output are never authoring authority.

## Work types

### New character design

Define the source boundary, character identity, gameplay thesis, weaknesses, power expression, kit architecture, complete numeric budget, interaction profile, and structured behavior before implementation.

### Structural migration

Preserve gameplay outcomes while adding stable IDs, separated fields, ownership, provenance, typed effects, targets, lifecycle, source basis, and other required structure.

A structural migration must not contain an unreviewed redesign.

### Existing-character redesign

A redesign may improve or replace established behavior only after a documented problem or opportunity is shown.

Before executable edits, prepare:

1. continuity and intent summary;
2. existing-engine map;
3. dependency map;
4. complete Power, cost, and effective-cost analysis;
5. classification consequence analysis;
6. economy and team-impact analysis;
7. required migrations;
8. proposed upgrades or corrections;
9. optional refinements;
10. explicit non-changes;
11. player-facing changelog;
12. unresolved questions and approval status.

### Global-rule change

Use a separate foundation proposal and Decision Record entry. List every affected rule, character, card, status, migration, validator, exporter, and regression test before implementation.

## Numeric and classification guardrails

The complete Power and cost procedure in `docs/characters/character-creation-guide.md` remains the baseline until a dedicated approved foundation decision changes it.

Do not abbreviate the calculation into “benchmark only.” Show the baseline and explain every deviation.

When changing printed cost or Power, audit every reachable effective-cost breakpoint, Ultimate Meter generation, repeated-play route, and opportunity cost to allies.

Changing Attack, Defense, Special, Damage Type, Speed, Melee/Ranged, area, or Multihit is a gameplay change. Show clash, timing, targeting, mitigation, dependency, and player-facing consequences.

For status-mode changes, preserve the meaning of every established number. Never add unrelated Potency and Count values merely to collapse a status.

## Structured-data requirements

Structured behavior must use:

- stable IDs;
- explicit ownership and provenance;
- separated classification axes;
- typed targets and lock modes;
- typed effects with stable IDs, timing, and scope;
- typed conditions and restrictions;
- explicit lifecycle destinations;
- typed Unique statuses;
- Ultimate pathways;
- source-basis records.

Do not rely on parsing ordinary prose for executable behavior.

Do not add an undefined global mechanic without its canonical decision, reference, registry or structured representation, validation, migration handling, and tests.

Keep `schemaVersion` and `rulesVersion` separate. Never silently interpret Rules v1 content as Rules v2.

## Existing project rules

- Skills manifest lives in `SKILLS.md`.
- Work in `docs/`; treat `site/` as generated output and do not edit it.
- MkDocs theme overrides live in `docs/overrides/`.
- Follow `docs/adding-content.md` and the current Character Creation Guide.
- Keep structured data and human-readable references synchronized.
- Keywords are tiered Core/Advanced in `docs/keywords.md`; keep Rules v1 data in sync.
- Status entries require a Mode and explicit Turn End behavior.
- Exporter code lives in `docs/scripts/`.
- Track documentation and data tasks in `TODO.md`.
- If a registry entry is added or renamed, update the human-readable reference and structured data.
- Restrictions are enforced through structured restrictions; display text must match them.
- Filtering uses the `hidden` attribute; do not override it on filterable items.
- Check `docs/faq.md` when resolving ambiguity and add reusable examples when appropriate.
- Keep damage order, timing labels, target semantics, and status behavior synchronized.
- Adjacency is per team line. Empty positions break adjacency. Opposed means the same column across teams.
- Character portraits use `../../assets/characters/<file>`.
- `Spend X` is mandatory. Optional Spend uses `?`.
- Shared links use the `ua-*-link` classes.
- Only global statuses link to the global status reference. Unique statuses remain character-specific.
- Caps must match reachable behavior.
- Do not add game pages or game assets unless explicitly requested.
- Keep exports free of permalinks, URLs, and images as currently required.

## Repository hygiene

- Preserve stable IDs across display-name changes.
- Cite or record source basis for major mechanics.
- State uncertainty honestly.
- Do not publish canonical exports from dirty structured data.
- Do not silently overwrite unrelated instructions.
- Keep public records self-contained and understandable without private context.

## Quality checks

Use the checks relevant to the changed scope:

- `npm audit`
- `npm run validate`
- `npm run validate:v2:global:strict`
- `npm run migrate:v2:check`
- `npm run test:export:v2`
- `mkdocs build --strict`
- `git diff --check`
- `git status --short`

The safe non-writing migration command is `npm run migrate:v2:check`. Do not use `npm run migrate:v2 -- --dry-run`; the package command writes and the script does not support that flag.

For character revisions, verify the approved changelog and numeric review before implementation validation.

## Response style

- Be direct and precise.
- Use critical, logical reasoning.
- Explain decisions in clear language.
- Distinguish evidence, inference, proposal, approval, and implementation.
- Prefer exact implementation guidance over vague reassurance.