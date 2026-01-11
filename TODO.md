# TODO

## Docs/data
- Keep structured `effects` + `transforms` aligned with `docs/data/README.md` as new mechanics are added.
- Extend schema validation for new effect types as they are introduced.
- Extend the schema only when needed for remaining unmodeled mechanics (optional spend, bonus damage, draw/create, unique triggers).
- Ensure any "Can only be used if" / "Cannot be used if" text has matching `restrictions` (structured-only enforcement).
- Formalize any remaining ambiguous rules in `docs/faq.md` and reference pages.
- Confirm rules references match 3v3 team play (shared deck/hand/energy/ultimate, per-character HP/status, defeat/resurrection expectations).
- Keep keyword Core/Advanced tiers and status Mode/Turn End lines aligned between docs and `docs/data`.
- Define template and power-budget checks for card data, and add CI validation if feasible.
- Enforce template sections and timing label phrasing for all characters.
- Standardize card type tag order for data/UI filtering.
- Enforce power budgeting targets unless exceptions are documented.
