# AGENTS

This repo is a MkDocs Material rules reference and canonical data source.

Project rules
- Skills manifest lives in `SKILLS.md`.
- Work in `docs/`; treat `site/` as generated output and do not edit it.
- MkDocs theme overrides live in `docs/overrides/`; use them for site-wide UI tweaks.
- Follow patterns in `docs/adding-content.md` for content types; use templates and shared link markup.
- Keywords are tiered Core/Advanced in `docs/keywords.md`; keep `docs/data/keywords.yml` `tier` values in sync.
- Status effect entries include a Mode line (P/C, S, V) and an explicit Turn End line (use "No change" when nothing ticks).
- Structured data lives in `docs/data/`; keep it in sync with the reference pages.
- The game is 3v3 per team with a shared deck/hand/energy/ultimate and per-character HP/status; keep docs and `docs/data` aligned.
- Exporter lives in `docs/scripts/`; use it (or CI) to sync data into the game repo.
- If core or UI changes affect rules/keywords/status effects/terms, update the docs and `docs/data`, then re-export.
- Track docs/data tasks in this repo's `TODO.md`.
- If you add or rename keywords/status effects/terms, define them in the docs (`docs/keywords.md`, `docs/status-effects.md`, `docs/terminology.md`) and `docs/data/*.yml`.
- Structured card data supports `effects`, `restrictions`, and optional `transforms`; keep `docs/data/README.md` aligned (recent effect types include `set_status`, `reduce_status`, `spend_status`, `deal_damage_per_spent`, `reload_equipped`, `switch_equip`).
- Restriction enforcement is structured-only; any "Can only be played if" / "Cannot be played if" text must be mirrored in `restrictions` or it will not be enforced by rules parsing.
- Filtering uses the `hidden` attribute; avoid overriding it on filterable items (add an explicit `[hidden] { display: none; }` when custom display styles are applied).
- When evaluating rules or potential ambiguity, check `docs/faq.md` and ensure durable rules are reflected in the relevant reference pages.
- When clarifying timing or keyword interactions, update the keyword/term definition and add a short FAQ example (with a cross-link from the glossary) if it will come up at the table.
- When adjusting combat math or timing labels, keep `docs/keywords.md`, `docs/status-effects.md`, `docs/terminology.md`, `docs/faq.md`, and `docs/data/*.yml` in sync. Current damage order: Power modifiers -> Immune -> % modifiers -> Shield -> Barrier -> flat HP modifiers -> HP.
- Adjacency is per-team line; "Opposed" means same column across teams. Use this framing in card text and rules.
- Character workflow: copy `docs/characters/template.md`, add art in `docs/assets/characters/`, add `docs/data/characters/<slug>.yml`, set Roles in the header, add a card to `docs/characters/index.md` (include a Power line and role tags), and add the page to `mkdocs.yml`.
- Character portraits in `docs/characters/` pages must use `../../assets/characters/<file>` so directory URLs resolve on deploy.
- Basic naming rule: Basic + Attack cards must be named Strike; Basic + Defense cards must be named Defend; Basic + Special cards can use any name.
- Conditional "this card becomes X" effects are automatic in any zone; do not make them optional.
- "Spend X" is mandatory; if it is optional, use `?` (example: "Spend X Resource? Gain Evade.").
- Keyword/status/card type/term/role link markup uses the shared `ua-*-link` classes so `docs/javascripts/guide.js` can rewrite links.
- Use the shared link markup in character pages and card text; only link status effects that live in `docs/status-effects.md` (unique ones stay plain text).
- Avoid undefined mechanics; if a global keyword/status/term appears in content, ensure it exists in the reference pages.
- If a card references remaining Multihit Count, ensure the base count is explicit in the card text or defined by the Multihit rules.
- Ensure Potency/Count/Value/Stack caps align with what the kit can reach, including edge cases.
- Prefer Stack for single-value duration statuses that decay at Turn End; reserve Value for resource-like effects that are consumed by other rules.
- Movement Round happens before Combat; Root blocks movement and swaps. Keep turn-flow references aligned across `docs/index.md`, `docs/terminology.md`, `docs/faq.md`, and `docs/data/terms.yml`.
- Prioritize lore-accurate, synergistic, and fun character kits over balance.
- Follow `docs/characters/character-creation-guide.md` for power budgeting (including variable/0-cost handling); document character-specific exceptions there, not on character pages.
- Export actions (page PDF/MD/TXT + all-pages ZIP with format/character-combine/XLSX options and `html/`, `md/`, `txt/`, `xlsx/`) live in `docs/overrides/main.html` and `docs/javascripts/print.js`; keep exports free of permalinks, URLs, and images.
- Do not add game pages or game assets to this repo unless explicitly requested.

Quality checks
- Run `mkdocs build --strict` or `mkdocs serve` when asked to validate docs changes.

Response style
- Tell it like it is; don't sugar-coat responses. Adopt a skeptical, questioning approach. Take a forward-thinking view. Readily share strong opinions. Use a formal, professional tone. Be practical above all. Be innovative and think outside the box. Get right to the point.
