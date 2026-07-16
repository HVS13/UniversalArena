# Rules v2 Data Instructions

Before creating or changing Rules v2 character data, read:

1. `../../design/rules-v2-foundation-corrections.md`
2. The active Rules v1 YAML for the character.
3. The original Character Creation Guide.
4. Relevant FAQ, terminology, card-type, keyword, and status references.
5. The character-specific approved changelog, if one exists.

Rules v2 data migration preserves gameplay by default. Do not change cost, Power, Speed, Action Type, target, status quantity, resource rate, transformation, or engine merely to fit the new schema.

No parallel character file may be called approved until its player-facing changelog is explicitly accepted.

For every cost or Power change, include the complete original formula and effective-cost breakpoint audit in the accompanying design review.

For status-mode changes, preserve the meaning of each legacy number. Never sum Potency and Count unless the old rules explicitly treated their sum as one quantity.

Executable data must be supported by a self-contained repository record. Do not encode decisions without a documented source basis or approved changelog.
