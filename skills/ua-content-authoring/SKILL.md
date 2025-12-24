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
3. For characters, start from `docs/characters/template.md`, add art in `docs/assets/characters/`, add a card to `docs/characters/index.md` (include a Power line and role tags), and update `mkdocs.yml`.
4. For keywords, status effects, roles, card types, terms, or FAQ entries, append the correct block markup in the corresponding file and use the shared link classes.
5. Keep `site/` untouched; it is build output.
6. Run `mkdocs build --strict` or `mkdocs serve` when asked to validate.

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
