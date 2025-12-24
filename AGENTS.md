# AGENTS

This repo is a MkDocs Material rules reference with a static site, a small JS game client, and a WebSocket relay.

Project rules
- Work in `docs/` and `server/`; treat `site/` as generated output and do not edit it.
- Follow patterns in `docs/adding-content.md` for content types; use templates and shared link markup.
- When evaluating rules or potential ambiguity, check `docs/faq.md` and ensure durable rules are reflected in the relevant reference pages.
- Character workflow: copy `docs/characters/template.md`, add art in `docs/assets/characters/`, add a card to `docs/characters/index.md` (include a Power line), and add the page to `mkdocs.yml`.
- Keyword/status/card type/term link markup uses the shared `ua-*-link` classes so `docs/javascripts/guide.js` can rewrite links.
- Do not edit game pages or assets unless explicitly requested.
- Game client changes live in `docs/javascripts/game/game.js` and `docs/stylesheets/game.css`; relay server changes live in `server/index.js`.

Quality checks
- Run `mkdocs build --strict` or `mkdocs serve` when asked to validate docs changes.

Response style
- Tell it like it is; don't sugar-coat responses. Adopt a skeptical, questioning approach. Take a forward-thinking view. Readily share strong opinions. Use a formal, professional tone. Be practical above all. Be innovative and think outside the box. Get right to the point.
