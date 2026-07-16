# Rules v2 Authority Map

> **Status:** Foundation authority for Rules v2 documentation and review.
> **Purpose:** Explain which source answers each kind of question without treating newer documents as permission to erase the established foundation.
> **Scope:** Design intent, current behavior, approved Rules v2 semantics, implementation contracts, migration, and review.

## 1. Evolution with continuity

Rules v2 is an evolution of Universal Arena's established foundation.

It should:

- carry forward the original vision and systems that already work;
- clarify rules that were implicit or difficult to implement;
- upgrade systems that can better serve the same purpose;
- expand what the game can represent;
- correct demonstrated defects and contradictions;
- replace an established mechanism only when critical analysis shows that it blocks the intended vision and the replacement preserves or improves its purpose.

Rules v2 must still feel like Universal Arena. A cleaner schema, newer document, or more familiar game convention is not sufficient reason to replace an established rule.

Existing foundations do not need to prove their value again from zero. A proposed change carries the burden of showing why it is a genuine upgrade.

## 2. There is no single authority ladder

Different sources answer different questions. Do not place all documents in one universal order.

### What is Universal Arena trying to become?

Use:

1. the established intent expressed across the original rules, active systems, and character designs;
2. [Design Principles](design-principles.md) as the consolidated statement of that intent;
3. approved later decisions that explicitly explain how they carry forward, clarify, upgrade, expand, or correct the foundation.

The Design Principles organize and strengthen the established vision. They do not erase earlier intent without a documented change.

### What does the game currently do?

Use:

1. active structured data for executable content;
2. current Rules v1 reference pages for behavior not fully represented in structured data;
3. active character pages for player-facing behavior.

These sources define current behavior. They do not independently decide what Rules v2 should become.

### What global behavior has Rules v2 approved?

Use:

1. [Rules v2 Decision Record](rules-v2-decisions.md);
2. corresponding entries in `docs/data/rules-v2/global-rules.yml` and registries;
3. [Rules v2 Global Reference](rules-v2-global-reference.md) as a concise operational summary.

A schema example, migration suggestion, checklist item, or framework example does not approve a gameplay rule.

### How may an established rule or character be changed?

Use [Rules v2 Compatibility Policy](rules-v2-compatibility-policy.md).

The policy defines the required reasoning, continuity analysis, approval, migration handling, and regression review. It does not independently invent gameplay.

### How is approved behavior represented?

Use:

- [Schema v2 Specification](../data/schema-v2.md) for data shape and validation contracts;
- `docs/data/registries.yml` for stable identifiers;
- `docs/data/rules-v2/global-rules.yml` for structured global Rules v2 behavior;
- the exporter contract for package and manifest behavior.

Implementation sources represent approved decisions. They do not create design authority merely by supporting a field or primitive.

### How is content migrated and reviewed?

Use:

- [Migration v1 to v2](../data/migrations/v1-to-v2.md) for deterministic conversion;
- [Character Authoring Framework](character-authoring-framework.md) for research and design decisions;
- [Roster Audit Checklist](roster-audit-checklist.md) for review coverage;
- an approved character-specific changelog for each existing character.

Migration may detect a design problem. It must not silently decide the final design.

## 3. Document responsibilities

| Source | Primary responsibility | Must not do independently |
| --- | --- | --- |
| Original Rules v1 references | Preserve current rules, original authoring logic, and established intent | Be treated as obsolete merely because Rules v2 exists |
| Active character data and pages | Define current character behavior and show established gameplay evidence | Block a justified future improvement by existing alone |
| Design Principles | Consolidate the intended vision and non-negotiable goals | Override an established foundation without documented reasoning |
| Compatibility Policy | Govern how changes are proposed, reviewed, approved, and migrated | Define global gameplay or character values by itself |
| Rules v2 Decision Record | Record approved global Rules v2 semantics | Approve character-specific redesigns through examples |
| Character Authoring Framework | Guide research, design, migration review, and redesign review | Replace current character behavior without a character changelog |
| Audit Supplement | Preserve the history of accepted second-pass corrections until they are integrated | Remain a permanent competing authority after integration |
| Global Reference | Summarize approved operational Rules v2 behavior | Introduce new behavior not present in approved decisions and structured data |
| Schema v2 | Define fields, primitives, validation, and representation | Decide lore, balance, costs, classifications, or character engines |
| Migration plan and scripts | Convert approved meaning deterministically and report ambiguity | Redesign content while converting its format |
| Roster Audit Checklist | Confirm that required questions were reviewed | Turn every warning into an automatic patch |
| Registries and exporter | Provide stable identifiers, validation, and deterministic packages | Become character-design authority |

## 4. Types of change

Every proposed Rules v2 change must use one of these labels.

### Carry forward

Keep the established rule because it already serves the intended vision.

### Clarify

Make the existing meaning explicit without changing gameplay outcomes.

### Upgrade

Improve how an established system serves the same core purpose.

### Expand

Add new capability, vocabulary, content support, or interaction space without weakening the established foundation.

### Correct

Fix a demonstrated lore, logic, consistency, usability, balance, or implementation defect.

### Replace

Use a different mechanism because the existing one fundamentally blocks the intended vision. Replacement is exceptional and must preserve or improve the original purpose.

### Retire

Remove behavior that is obsolete, harmful, contradictory, or no longer needed after a traceable migration.

## 5. Change standard

Use the least disruptive change that fully solves the problem and advances the intended vision.

This means:

- do not redesign merely because another approach is cleaner;
- do not preserve a defect merely because fixing it requires more than a small patch;
- prefer continuity when two options solve the problem equally well;
- compare the proposal against preserving the current behavior and against smaller alternatives;
- state regressions and trade-offs honestly.

## 6. Required reasoning

A material gameplay change must state:

1. intended goal;
2. current behavior;
3. original purpose and established player expectation;
4. actual problem;
5. proposed behavior;
6. what original intent remains preserved;
7. benefits;
8. trade-offs and regressions;
9. dependencies and affected content;
10. alternatives considered;
11. migration and compatibility handling;
12. required tests;
13. approval status.

A proposal is not approved because it appears in an example, validator warning, schema, migration output, recommendation, or abandoned draft.

## 7. Separate work types

### New character design

Create a new design from the intended vision, current global rules, source material, and complete authoring standards.

### Structural migration

Change representation while preserving gameplay outcomes. Add stable IDs, separated fields, ownership, typed effects, lifecycle, and source basis without silently changing the character.

### Existing-character redesign

Reconsider gameplay because a documented problem or improvement opportunity exists. Produce the complete review package and player-facing changelog before executable edits.

### Global-rule change

Use a separate foundation proposal and Decision Record entry. List all affected content and regression tests before implementation.

## 8. Transition rule

Until a Rules v2 change is approved, implemented, and validated:

- active Rules v1 behavior remains current executable authority;
- original foundations remain evidence of design intent;
- Rules v2 infrastructure does not independently change gameplay;
- ambiguous or disputed decisions remain unresolved rather than being silently selected.

## 9. Phase 1 boundary

This authority reconciliation changes how sources are interpreted. It does not itself change:

- character data;
- Power or cost formulas;
- card names or classifications;
- Energy or Ultimate Meter behavior;
- statuses;
- timing, targeting, movement, or lifecycle;
- global Rules v2 semantics;
- migration scripts, validators, registries, exporters, or the web game.

Those subjects require their own later review phases.