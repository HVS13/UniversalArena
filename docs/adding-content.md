# Adding content

Use these patterns to keep pages consistent, responsive, and easy to extend.

## Preview locally

- `mkdocs serve`
- `mkdocs build --strict`

## Characters

1. Copy `docs/characters/template.md` to `docs/characters/<slug>.md`.
2. Prefer character artwork in `docs/assets/characters/` and reference it with a relative URL (avoids broken external images).
3. Add the page to `mkdocs.yml` under the `Characters` nav section.
4. Add a card to `docs/characters/index.md`:

```html
<a class="character-card" href="<slug>/" data-name="Name" data-version="Version" data-tags="tag1,tag2">
  <div class="character-card__title">Name</div>
  <div class="character-card__meta">Version: Version</div>
  <div class="character-card__tags">Tags: Tag 1, Tag 2</div>
  <p class="character-card__summary">One-line summary.</p>
</a>
```

## Keywords

- Add another block to `docs/keywords.md`:

```html
<div class="keyword-entry" id="keyword-<slug>">
  <h3>Keyword Name</h3>
  <p>Definition.</p>
</div>
```

## Status effects

- Add another block to `docs/status-effects.md`:

```html
<div class="status-entry" id="status-<slug>">
  <h3>Status name</h3>
  <p>Description.</p>
</div>
```

## Terminology

- Add a row to `docs/terminology.md` inside `#terminology-table`:

```html
<tr>
  <td>Term</td>
  <td>Definition</td>
</tr>
```

## Adding a new filterable page

1. Use the shared filter UI:

```html
<div class="ua-filter">
  <label class="ua-filter__label" for="my-filter">Filter</label>
  <input class="ua-filter__input" type="search" id="my-filter" placeholder="Type to filter..." autocomplete="off" spellcheck="false" />
</div>
```

2. Add a small `setupFilter(...)` block in `docs/javascripts/guide.js` for your new `id` and item selector.
