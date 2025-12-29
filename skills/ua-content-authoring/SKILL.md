---
name: ua-content-authoring
description: Create or update UniversalArena MkDocs content pages in docs/ and navigation in mkdocs.yml; use for characters, keywords, status effects, roles, card types, terminology, FAQ, or any rules/reference content updates.
---

# UA Content Authoring

## Overview

Use the repo's documented markup patterns to keep content consistent, linkable, and easy to maintain.

## Workflow

1. Identify the content type and follow the exact markup in `docs/adding-content.md`.
2. Cross-check `docs/faq.md` for rule clarifications and ensure durable rules are also reflected in the relevant reference pages, using the target page's native format.
3. For characters, start from `docs/characters/template.md`, add art in `docs/assets/characters/`, set portrait `src` to `../../assets/characters/<file>`, add a card to `docs/characters/index.md` (include a Power line and role tags), and update `mkdocs.yml`.
4. Apply basic naming: Basic + Attack cards must be named Strike; Basic + Defense cards must be named Defend; Basic + Special cards can use any name.
5. For keywords, status effects, roles, card types, terms, or FAQ entries, append the correct block markup in the corresponding file and use the shared link classes.
6. When referencing keywords/status effects/roles/terms in content, use `ua-*-link` markup; only link status effects that live in `docs/status-effects.md` (unique ones stay plain text).
7. Avoid undefined mechanics; if a global keyword/status/term appears in content, ensure it exists in the reference pages.
8. Keep `site/` untouched; it is build output.
9. Run `mkdocs build --strict` or `mkdocs serve` when asked to validate.

## References

- `docs/adding-content.md`
- `docs/characters/template.md`
- `docs/characters/index.md`
- `docs/keywords.md`
- `docs/status-effects.md`
- `docs/roles.md`
- `docs/card-types.md`
- `docs/terminology.md`
- `docs/faq.md`
- `mkdocs.yml`
