# Rules v2 Data Instructions

Before creating or changing Rules v2 character data, read:

1. `../../design/rules-v2-authority-map.md`
2. `../../design/rules-v2-compatibility-policy.md`
3. the active Rules v1 YAML and character page;
4. the current Character Creation Guide and relevant FAQ, terminology, card-type, keyword, and status references;
5. the approved character-specific changelog, when one exists.

Rules v2 is an evolution of the established foundation. Data structure may expand, but schema capability does not independently authorize gameplay changes.

## Structural migration

A structural migration preserves gameplay outcomes by default. Do not change cost, Power, Speed, Action Type, Damage Type, target, range, area, status meaning, resource rate, transformation, Ultimate access, or engine merely to fit the new schema.

Structural migration may add stable IDs, separated fields, ownership, provenance, typed effects, targets, restrictions, lifecycle, source basis, and other representation required by Schema v2.

## Approved redesign

An existing-character gameplay change requires an approved, self-contained review record and player-facing changelog before executable data edits.

The record must include:

- intended goal and current behavior;
- original purpose and preserved intent;
- actual problem;
- proposed behavior;
- benefits and trade-offs;
- dependency and affected-content analysis;
- complete Power, cost, and effective-cost review when numeric values change;
- classification consequences when classifications change;
- migration handling and required tests;
- approval status.

No parallel character file may be called approved until its changelog is explicitly accepted and its implementation is validated.

For status-mode changes, preserve the meaning of every established number. Never add unrelated Potency and Count values merely to collapse a status.

Examples, validator warnings, migration suggestions, registry entries, schema fields, and exporter support are not character-specific approval.

Executable data must be supported by a self-contained repository record. Do not encode decisions without a documented source basis and the required approval.