# AGENTS

This repository is the MkDocs Material rules reference and canonical structured data source for Universal Arena.

## Authority order

When sources disagree, use this order:

1. `docs/data/` structured data for currently implemented executable behavior.
2. The original foundational rules and authoring references for behavior and numeric intent that have not been explicitly migrated:
   - `docs/characters/character-creation-guide.md`
   - `docs/faq.md`
   - `docs/terminology.md`
   - `docs/card-types.md`
   - `docs/status-effects.md`
   - Active character pages and `docs/data/characters/`
3. Explicit Rules v2 corrections and compatibility doctrine:
   - `docs/design/rules-v2-foundation-corrections.md`
4. Approved Rules v2 specifications and isolated migration infrastructure:
   - `docs/design/design-principles.md`
   - `docs/design/character-authoring-framework.md`
   - `docs/design/rules-v2-decisions.md`
   - `docs/design/rules-v2-supplement.md`
   - `docs/design/rules-v2-global-reference.md`
   - `docs/data/schema-v2.md`
   - `docs/data/registries.yml`
   - `docs/data/rules-v2/global-rules.yml`
   - `docs/data/migrations/v1-to-v2.md`
   - `docs/design/roster-audit-checklist.md`
5. Generated exports and `site/` output.

Rules v2 is an extension and correction of Universal Arena, not permission to replace established foundations without a specific reason. A Rules v2 document changes an original rule only when it names the old behavior, names the new behavior, explains why the change is needed, and identifies affected content.

Rules v2 documents and parallel data are not fully implemented until structured character data, exporter logic, migrations, generated pages, and tests are updated. Never claim Rules v1 content already behaves as Rules v2 merely because a specification or overlay exists.

`docs/data/rules-v2/global-rules.yml` applies only to content explicitly declaring `rulesVersion: 2`. During staged migration, the legacy keyword, status, term, role, card-type, character, and budgeting references remain canonical for Rules v1 behavior and for unchanged design intent.

When an initial Rules v2 document conflicts with `docs/design/rules-v2-foundation-corrections.md`, use the correction.

## Progression doctrine

Universal Arena should progress by:

- Preserving established systems that already serve the intended vision.
- Typing, clarifying, and making deterministic behavior that was previously implicit.
- Expanding registries and schemas so new characters and mechanics can be represented.
- Correcting genuine lore, timing, consistency, or implementation defects.
- Changing an established mechanic only after its original purpose, dependencies, and player experience are understood.

Do not treat a new schema, a cleaner abstraction, or a later source version as sufficient reason to redesign a character or foundational rule.

For existing content, the default migration result is the same gameplay expressed more explicitly.

## Highest design priority

Universal Arena is lore-first.

Prioritize, in order:

1. The selected canonical version.
2. Character feel and recognizable play pattern.
3. Signature gimmicks, transformations, equipment, resources, and hax.
4. Canonical requirements, weaknesses, limitations, and aftermaths.
5. Established Universal Arena design intent and coherent gameplay engine.
6. Clear, deterministic Universal Arena translation.
7. Access, opportunity cost, counterplay, and team economy.
8. Conventional balance.

Do not flatten vastly different characters into equal duelists. A canonically overwhelming character should feel more powerful in ordinary play. A weak character should contribute through source-appropriate efficiency, utility, preparation, equipment, information, deception, survival, or narrow payoff—not unsupported statistics.

Do not reduce defining hax into ordinary damage or a minor status merely because the original effect is powerful. Regulate setup, cost, resource, Speed, visibility, duration, frequency, target conditions, and aftermath before weakening the payoff.

Raw Power, HP, durability, and Speed do not grant automatic hax resistance. Use source-supported Damage Immunity, Status Immunity, Effect Immunity, targeting restrictions, or explicit text.

## Existing-character revision workflow

Before changing an existing character:

1. Read the active YAML, character page, original Character Creation Guide, relevant FAQ/terminology/card-type rules, Rules v2 specifications, migration notes, and source material.
2. Record the current kit's complete loop: Innates, statuses, cards, variants, Ultimate, Energy curve, Meter route, clash roles, dependencies, failure state, and player expectation.
3. Separate mandatory schema migration from actual gameplay change.
4. Preserve names, costs, Power, Speed, action classifications, status numbers, and interactions by default.
5. Calculate every proposed numeric change using the complete original budgeting rules.
6. Analyze downstream dependencies before removing or changing a resource, status, classification, or timing rule.
7. Produce a player-facing before/after changelog.
8. Obtain explicit human direction on optional or disputed changes.
9. Only then update executable data, tests, audits, and PR descriptions.
10. Run the roster audit checklist and regression tests.

A migration PR must not contain an unreviewed redesign.

## New-character workflow

Before creating a new character:

1. Define continuity and source-period boundaries.
2. Define baseline form, equipment, knowledge, and personality.
3. Classify abilities as Baseline, Unlockable, Exceptional, or Excluded.
4. Write the winning thesis and weakness.
5. Write mandatory and forbidden feel outcomes.
6. Explain how power disparity appears before the Ultimate.
7. Select actions for distinct gameplay jobs, not fame alone.
8. Design exactly two Basics and three Techniques.
9. Define at least one Ultimate pathway.
10. Apply the original Power and cost budgeting procedure.
11. Add typed Innates, statuses, effects, restrictions, ownership, lifecycle, provenance, and source basis.
12. Assign Roles, Combat Archetypes, Capability Tags, economy profile, and synergy metadata after the kit exists.
13. Run `docs/design/roster-audit-checklist.md`.

## Foundational Power and cost budgeting

The original Character Creation Guide remains the default numeric authoring system unless a documented character-specific exception applies.

- Base Power target for an Energy-only card: printed Energy cost × 10.
- Base Power target for a pure Ultimate-Meter card: Ultimate Meter cost × 1.5, rounded down.
- Mixed Ultimate Meter + Energy Ultimate: treat each Meter as 1 Base Power, then add the Energy Base Power.
- Variable non-Ultimate Energy:
  - if X can be 0, Base Power = 5 × (X + 1);
  - otherwise Base Power = 10 × X.
- Variable Energy on a mixed-cost Ultimate uses 10 × X even if X can be 0.
- A non-created 0-Energy card begins at Base Power 5.
- A Created card cannot exceed the Base Power of the card that creates it unless an explicit exception is documented.
- A card that only deals Power damage or only grants Power Shield/HP may increase Base Power by 20%.
- Fast reduces Base Power by 10%.
- Created reduces Base Power by 10%.
- Fast and Created penalties stack.
- A high execution requirement or narrow condition may add 10–20%.
- Meaningful utility, statuses, draw, resource gain, area, tempo, healing, future value, and engine acceleration reduce the available Power budget.
- Damage plus healing must be budgeted as combined output.
- Apply bonuses and penalties before generating the printed range.
- Melee range: Base Power ± floor(Base Power × 0.20).
- Ranged range: Base Power ± floor(Base Power × 0.25).
- Round all decimals down.
- Significant exceptions must be documented beside the character or in the guide.

Use printed or locked play cost for authoring. In-match cost reductions do not recalculate printed Power unless explicit text says they do. When a personal engine reduces cost, audit the full set of reachable effective-cost breakpoints.

Do not use “lore-first” or “benchmarks are not ceilings” as permission to skip the calculation. Lore may justify a documented exception; it does not eliminate the need to show the baseline and deviation.

## Character and card rules

- Exactly two Basics and three Techniques.
- Rules v2 removes a universal requirement for Strike + Defend or generic Basic names; it does not automatically rename or reclassify existing Basics.
- Prefer canonical names when a rename improves fidelity without damaging established clarity or references.
- Basics establish the floor; Techniques create the ceiling.
- Every card needs a canonical job and a gameplay job.
- Innates are continuous truths, not hidden sixth Techniques.
- Statuses store persistent state.
- Created cards provide prepared, temporary, conditional, summon, equipment, or expandable breadth.
- Created is provenance, not an Action Type.
- `Becomes` is automatic and state-dependent in deck, hand, and play.
- Variants should change decisions, not only numbers.
- Every character has one or more Ultimate pathways.
- Card Speed represents response window and commitment, not only movement-speed ranking.
- Noncombat characters use source-supported indirect actions and may retain low contestable Power abstractions when they serve the existing clash design and are explicitly justified.
- Copy and adaptive mechanics require explicit boundaries, ownership, lifecycle, and recursion rules.

Changing Attack, Defense, or Special changes clash behavior. Changing Damage Type changes mitigation behavior. Changing Speed changes legal response windows. None of these are cosmetic migrations.

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

When changing a printed cost, audit:

- default five-Energy team access;
- low-, normal-, and peak-investment turns;
- personal cost reduction;
- zero-cost breakpoints;
- Meter lost through discounts;
- Follow-Up and repeated-play chains;
- the opportunity cost imposed on allies.

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

Rules v2 global mechanics and changed legacy meanings must be represented in `docs/data/rules-v2/global-rules.yml`, described in `docs/design/rules-v2-global-reference.md`, and accepted by `validate-rules-v2-global.mjs`.

Do not add an undefined global mechanic without adding its registry/reference entry and validation support.

Every effect primitive used by content or examples must be registered. Do not invent specialized primitives when a general typed primitive and target/filter can represent the behavior.

Keep `schemaVersion` and `rulesVersion` separate.

When changing old meaning:

1. State the exact Rules v1 behavior.
2. State the exact Rules v2 behavior.
3. Explain the logical or consistency defect being corrected.
4. List affected cards, statuses, and tests.
5. Add an ordered migration and temporary aliases when needed.
6. Produce an affected-content report.
7. Update structured data and human-readable references.
8. Run roster-wide regression tests.
9. Record the change.

Never silently reinterpret Rules v1 exports as Rules v2.

## Initial Rules v2 migrations

Required structural migrations include:

- Electric Damage Type to Electric Property, with a reviewed broad Damage Type.
- Flat roles to Core Roles, Combat Archetypes, and Capability Tags.
- Defender to Guardian alias.
- Exhaust-on-play to Exhaust-after-resolution, with manual intent review.
- Unscoped Taunt to Taunt (All).
- Bare Bounce to Bounce 1.
- Implicit ownership to explicit ownership.
- Created provenance separated from Action Types.
- Ultimates to Ultimate pathways.
- Unique status prose to typed rules.
- Team-turn Stun ambiguity to per-character Stun behavior, except effects explicitly providing team-wide denial.
- Defeated-owner cards to Defeat Reserve behavior.
- Legacy source-system classifications to Source-System Tags.

Structural migration does not itself authorize cost, Power, name, Speed, target, classification, status-duration, or engine changes.

## Validation behavior

Block export for structural, semantic, and compatibility errors.

Design and lore warnings require review but must not automatically change, nerf, reject, or redesign a source-accurate character.

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

A warning is a question to investigate, not a proposed patch.

## Existing project rules

- Skills manifest lives in `SKILLS.md`.
- Work in `docs/`; treat `site/` as generated output and do not edit it.
- MkDocs theme overrides live in `docs/overrides/`; use them for site-wide UI tweaks.
- Follow patterns in `docs/adding-content.md` and `docs/characters/character-creation-guide.md`.
- Keywords are tiered Core/Advanced in `docs/keywords.md`; keep `docs/data/keywords.yml` `tier` values in sync for Rules v1 content.
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
- Use the simplest coherent status mode, but preserve existing numeric meaning. Never add together unrelated Potency and Count values merely to collapse a status.
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
- Run `npm run validate:v2:global:strict` when changing Rules v2 registries or global mechanics.
- Run exporter and schema validation when changing structured data or schema behavior.
- Run Rules v2 migration and roster regression tests before claiming migration completion.
- For character revisions, verify the before/after changelog and numeric budget before running implementation validation.

## Response style

- Tell it like it is; do not sugar-coat responses.
- Use a skeptical, questioning, forward-looking approach.
- Share strong, well-supported opinions.
- Use a formal, professional, practical tone.
- Prefer precise implementation guidance over vague reassurance.
