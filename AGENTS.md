# AGENTS

This repo is a MkDocs Material rules reference with a static site, a small JS game client, and a WebSocket relay.

Project rules
- Work in `docs/` and `server/`; treat `site/` as generated output and do not edit it.
- MkDocs theme overrides live in `docs/overrides/`; use them for site-wide UI tweaks.
- Follow patterns in `docs/adding-content.md` for content types; use templates and shared link markup.
- Filtering uses the `hidden` attribute; avoid overriding it on filterable items (add an explicit `[hidden] { display: none; }` when custom display styles are applied).
- When evaluating rules or potential ambiguity, check `docs/faq.md` and ensure durable rules are reflected in the relevant reference pages.
- When clarifying timing or keyword interactions, update the keyword/term definition and add a short FAQ example (with a cross-link from the glossary) if it will come up at the table.
- Character workflow: copy `docs/characters/template.md`, add art in `docs/assets/characters/`, set Roles in the header, add a card to `docs/characters/index.md` (include a Power line and role tags), and add the page to `mkdocs.yml`.
- Character portraits in `docs/characters/` pages must use `../../assets/characters/<file>` so directory URLs resolve on deploy.
- Basic naming rule: Basic + Attack cards must be named Strike; Basic + Defense cards must be named Defend; Basic + Special cards can use any name.
- Conditional "this card becomes X" effects are automatic in any zone; do not make them optional.
- "Spend X" is mandatory; if it is optional, the effect must say "may."
- Keyword/status/card type/term/role link markup uses the shared `ua-*-link` classes so `docs/javascripts/guide.js` can rewrite links.
- Use the shared link markup in character pages and card text; only link status effects that live in `docs/status-effects.md` (unique ones stay plain text).
- Avoid undefined mechanics; if a global keyword/status/term appears in content, ensure it exists in the reference pages.
- If a card references remaining Multihit Count, ensure the base count is explicit in the card text or defined by the Multihit rules.
- Ensure Potency/Count/Value/Stack caps align with what the kit can reach, including edge cases.
- Prioritize lore-accurate, synergistic, and fun character kits over balance.
- Follow `docs/characters/character-creation-guide.md` for power budgeting (including variable/0-cost handling); document character-specific exceptions there, not on character pages.
- Export actions (page PDF/MD/TXT + all-pages ZIP with `html/`, `md/`, `txt/`) live in `docs/overrides/main.html` and `docs/javascripts/print.js`; keep exports free of permalinks, URLs, and images.
- Do not edit game pages or assets unless explicitly requested.
- Game client changes live in `docs/javascripts/game/game.js` and `docs/stylesheets/game.css`; relay server changes live in `server/index.js`.

Quality checks
- Run `mkdocs build --strict` or `mkdocs serve` when asked to validate docs changes.

Response style
- Tell it like it is; don't sugar-coat responses. Adopt a skeptical, questioning approach. Take a forward-thinking view. Readily share strong opinions. Use a formal, professional tone. Be practical above all. Be innovative and think outside the box. Get right to the point.
