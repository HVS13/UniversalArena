# TODO

## Docs/data
- DONE: Added markdown/YAML drift validator (`docs/scripts/validate-data-sync.mjs`).
- Keep structured `effects` + `transforms` aligned with `docs/data/README.md` as new mechanics are added.
- Extend schema validation for new effect types as they are introduced.
- Extend the schema only when needed for remaining unmodeled mechanics (optional spend, bonus damage, draw/create, unique triggers).
- Ensure any "Can only be played if" / "Cannot be played if" text has matching `restrictions` (structured-only enforcement).
- Formalize any remaining ambiguous rules in `docs/faq.md` and reference pages.
- Confirm rules references match 3v3 team play (shared deck/hand/energy/ultimate, per-character HP/status, defeat/resurrection expectations).
- Keep keyword Core/Advanced tiers and status Mode/Turn End lines aligned between docs and `docs/data`.
- Define template and power-budget checks for card data, and add CI validation if feasible.
- Enforce template sections and timing label phrasing for all characters.
- Standardize card type tag order for data/UI filtering.
- Enforce power budgeting targets unless exceptions are documented.
- Configure the repository-scoped GitHub App secrets before merging the replacement workflow; keep the fine-grained PAT path as a fallback only when a separate human reviewer is available.
- Protect `UniversalArena-Web/main` with required Friend Alpha Checks, at least one approving review, stale-approval dismissal, conversation resolution, up-to-date branches, and force-push/deletion blocking.
- Verify the validated export workflow opens a draft Web PR and triggers Friend Alpha Checks after the replacement workflow lands.
