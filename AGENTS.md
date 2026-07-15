# AGENTS

This repository is the MkDocs Material rules reference and canonical structured data source for Universal Arena.

## Authority order

When sources disagree, use this order:

1. `docs/data/` structured data for currently implemented executable behavior.
2. Approved Rules v2 specifications for intended migration behavior:
   - `docs/design/design-principles.md`
   - `docs/design/character-authoring-framework.md`
   - `docs/design/rules-v2-decisions.md`
   - `docs/design/rules-v2-supplement.md`
   - `docs/data/schema-v2.md`
   - `docs/data/migrations/v1-to-v2.md`
   - `docs/design/roster-audit-checklist.md`
3. Human-readable Rules v1 pages and character pages.
4. Generated exports and `site/` output.

Rules v2 documents are approved specifications but are not fully implemented until structured data, exporter logic, migrations, generated pages, and tests are updated. Never claim Rules v1 content already behaves as Rules v2 merely because a specification exists.

When an initial Rules v2 document conflicts with an explicit correction in `rules-v2-supplement.md` or the corrected Schema v2 specification, use the correction.

## Highest design priority

Universal Arena is lore-first.

Prioritize, in order:

1. The selected canonical version.
2. Character feel and recognizable play pattern.
3. Signature gimmicks, transformations, equipment, resources, and hax.
4. Canonical requirements, weaknesses, limitations, and aftermaths.
5. Clear, deterministic Universal Arena translation.
6. Access, opportunity cost, counterplay, and team economy.
7. Conventional balance.

Do not flatten vastly different characters into equal duelists. A canonically overwhelming character should feel more powerful in ordinary play. A weak character should contribute through source-appropriate efficiency, utility, preparation, equipment, information, deception, survival, or narrow payoff—not unsupported statistics.

Do not reduce defining hax into ordinary damage or a minor status merely because the original effect is powerful. Regulate setup, cost, resource, Speed, visibility, duration, frequency, target conditions, and aftermath before weakening the payoff.

Raw Power, HP, durability, and Speed do not grant automatic hax resistance. Use source-supported Damage Immunity, Status Immunity, Effect Immunity, targeting restrictions, or explicit text.

## Required character workflow

Before creating or revising cards:

1. Define continuity and source-period boundaries.
2. Define baseline form, equipment, knowledge, and personality.
3. Classify abilities as Baseline, Unlockable, Exceptional, or Excluded.
4. Write the winning thesis and weakness.
5. Write mandatory and forbidden feel outcomes.
6. Explain how power disparity appears before the Ultimate.
7. Select actions for distinct gameplay jobs, not fame alone.
8. Design exactly two Basics and three Techniques.
9. Define at least one Ultimate pathway.
10. Add typed Innates, statuses, effects, restrictions, ownership, lifecycle, provenance, and source basis.
11. Assign Roles, Combat Archetypes, Capability Tags, economy profile, and synergy metadata after the kit exists.
12. Run `docs/design/roster-audit-checklist.md`.

## Character and card rules

- Exactly two Basics and three Techniques.
- Do not require Strike + Defend.
- Do not require generic Basic names.
- Prefer canonical names.
- Basics establish the floor; Techniques create the ceiling.
- Every card needs a canonical job and a gameplay job.
- Innates are continuous truths, not hidden sixth Techniques.
- Statuses store persistent state.
- Created cards provide prepared, temporary, conditional, summon, equipment, or expandable breadth.
- Created is provenance, not an Action Type.
- `Becomes` is automatic and state-dependent in deck, hand, and play.
- Variants should change decisions, not only numbers.
- Every character has one or more Ultimate pathways.
- Power benchmarks are guides, not ceilings; document significant deviations.
- Card Speed represents response window and commitment, not only movement-speed ranking.
- Noncombat characters use source-supported indirect actions rather than invented brawling.
- Copy and adaptive mechanics require explicit boundaries, ownership, lifecycle, and recursion rules.

## Crossover and classification rules

Use minimal crossover equalization: characters can perceive, target, clash with, and affect one another enough for play, but fictional power systems do not automatically become identical.

Rules v2 broad Damage Types:

- Physical
- Energy
- Magical
- Mental
- Spiritual

Properties describe elements or phenomena such as Electric, Fire, Ice, Sonic, Explosive, or Radiation. Source-System Tags describe frameworks such as Ki, Chakra, Reiatsu, Haki, Stand, Nen, or Cursed Energy. Neither has inherent universal rules unless referenced.

Slash, Pierce, and Blunt are Attack Tags and do not automatically bypass defenses.

Do not force hax through damage when statuses, restrictions, targeting, defeat clauses, replacement, lifecycle, or explicit effects preserve it better.

## Shared economy and ownership

The team shares Draw Pile, Discard Pile, hand, Energy, and Ultimate Meter. Cards still have owners.

- Shared hand is access, not ownership.
- Only the owner normally plays its card.
- Created cards inherit source-character ownership unless stated.
- Meter comes only from Energy actually paid as card play cost.
- Creation is not play.
- Reveal is not Draw, Discard, Play, Use, or removal.
- Defeat removes the owner's cards from active circulation under Rules v2 Defeat Reserve rules.

Avoid named-pair and franchise bonuses. Prefer synergy through statuses, position, Speed, timing, targeting, card access, Energy, Meter, protection, and broad conditions.

Character Core Roles and Combat Archetypes describe individuals. Optional Lineup Archetypes describe team plans and never impose legality or required composition.

## Structured-data requirements

`docs/data/` is the source of truth. Do not rely on parsing normal prose for executable behavior.

Rules v2 structured content requires:

- Stable IDs.
- Explicit owner and card provenance.
- Separated Action Types, Damage Types, Properties, Source-System Tags, range, area, Attack Tags, and Effect Tags.
- Typed targets and lock modes.
- Typed effects with stable IDs, timing, and scope.
- Typed conditions and restrictions.
- Explicit lifecycle destinations.
- Typed Unique statuses.
- Ultimate pathways.
- Source-basis records.

Do not add an undefined global mechanic without adding its registry/reference entry and validation support.

Every effect primitive used by content or examples must be registered. Do not invent specialized primitives when a general typed primitive and target/filter can represent the behavior.

Keep `schemaVersion` and `rulesVersion` separate.

When changing old meaning:

1. Add an ordered migration.
2. Add temporary legacy aliases.
3. Produce an affected-content report.
4. Update structured data.
5. Run roster-wide regression tests.
6. Regenerate human-readable documentation.
7. Record the change.

Never silently reinterpret Rules v1 exports as Rules v2.

## Initial Rules v2 migrations

Required migrations include:

- Electric Damage Type to Electric Property.
- Flat roles to Core Roles, Combat Archetypes, and Capability Tags.
- Defender to Guardian alias.
- Exhaust-on-play to Exhaust-after-resolution, with manual intent review.
- Unscoped Taunt to Taunt (All).
- Bare Bounce to Bounce 1.
- Implicit ownership to explicit ownership.
- Created provenance separated from Action Types.
- Ultimates to Ultimate pathways.
- Unique status prose to typed rules.
- Team-turn Stun ambiguity to per-character Stun behavior.
- Defeated-owner cards to Defeat Reserve behavior.
- Legacy source-system classifications to Source-System Tags.

## Validation behavior

Block export for structural, semantic, and compatibility errors.

Design and lore warnings require review but must not automatically nerf or reject a source-accurate design.

Warnings include:

- Large Power deviation.
- Multiple hard-control effects.
- High hand or resource pressure.
- No low-investment action.
- Variants that only add numbers.
- Apparently dominant Ultimate pathway.
- Excessive independent decisions or memory burden.
- Later-version ability.
- Unsupported immunity.
- Hax reduced to damage.
- Strong character lacking baseline superiority.
- Weak character receiving unsupported parity.

## Existing project rules

- Skills manifest lives in `SKILLS.md`.
- Work in `docs/`; treat `site/` as generated output and do not edit it.
- MkDocs theme overrides live in `docs/overrides/`; use them for site-wide UI tweaks.
- Follow patterns in `docs/adding-content.md` for content types; use templates and shared link markup.
- Keywords are tiered Core/Advanced in `docs/keywords.md`; keep `docs/data/keywords.yml` `tier` values in sync.
- Status effect entries include a Mode line and explicit Turn End behavior.
- Structured data lives in `docs/data/`; keep it in sync with reference pages.
- The game is 3v3 with a shared deck, hand, Energy, and Ultimate Meter, plus per-character HP, statuses, resources, ownership, and defeat state.
- Exporter lives in `docs/scripts/`; use it or CI to sync data into the game repository.
- If core or UI changes affect rules, keywords, statuses, terms, classifications, roles, or registries, update docs and structured data, then re-export.
- Track docs/data tasks in `TODO.md`.
- If adding or renaming a registry entry, define it in human-readable references and `docs/data/`.
- Restriction enforcement is structured-only. Any display restriction must be mirrored in structured restrictions.
- Filtering uses the `hidden` attribute; avoid overriding it on filterable items.
- When evaluating ambiguity, check `docs/faq.md` and reflect durable rules in relevant reference and structured files.
- When clarifying timing or interactions, update the definition and add a short FAQ example when it will recur at the table.
- Keep damage order, timing labels, target semantics, and status behavior synchronized across references and structured data.
- Adjacency is per-team line. Empty positions break adjacency. Opposed means the same column across teams.
- Character portraits must use `../../assets/characters/<file>` on character pages.
- `Spend X` is mandatory. Optional Spend uses `?`.
- Shared link markup uses the `ua-*-link` classes so `docs/javascripts/guide.js` can rewrite links.
- Only link global statuses from the global status reference; Unique statuses remain character-specific.
- Ensure Potency, Count, Value, and Stack caps match reachable behavior.
- Use the simplest coherent status mode; never create dummy Potency or Count.
- Do not add game pages or game assets to this repository unless explicitly requested.
- Export actions live in `docs/overrides/main.html` and `docs/javascripts/print.js`; keep exports free of permalinks, URLs, and images as currently required.

## Repository hygiene

- Keep structured data and human-readable docs synchronized.
- Prefer generation from structured effects over duplicate manually authored mechanics.
- Do not publish canonical exports from dirty structured data.
- Preserve stable IDs across display-name changes.
- Cite or record source basis for major mechanics.
- State uncertainty honestly.
- Do not silently overwrite unrelated instructions when updating this file.

## Quality checks

- Run `mkdocs build --strict` or `mkdocs serve` when validating documentation changes.
- Run exporter and schema validation when changing structured data or schema behavior.
- Run Rules v2 migration and roster regression tests before claiming migration completion.

## Response style

- Tell it like it is; do not sugar-coat responses.
- Use a skeptical, questioning, forward-looking approach.
- Share strong, well-supported opinions.
- Use a formal, professional, practical tone.
- Prefer precise implementation guidance over vague reassurance.
