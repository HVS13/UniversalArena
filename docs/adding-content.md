# Adding content

Internal documentation for contributors only. This page is intentionally excluded from site navigation.

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

When adding card blocks, include a Power line in the meta (example: `<span><strong>Power:</strong> 8-12</span>`).

### Card type order

When listing `Type:` tags on character cards, use this order:

1. Basic / Ultimate
2. Attack / Defense / Special
3. Physical / Magical / Mental / Electric
4. Melee / Ranged
5. AoE / Splash / Bounce (area or targeting tags)
6. Slash / Pierce / Blunt / Multihit
7. Transformation / Recovery / Buff / Debuff

## Keywords

- Add another entry to `docs/keywords.md`:

```html
<div class="ua-entry keyword-entry" id="keyword-<slug>">
  <p class="ua-entry__title">Keyword Name</p>
  <p class="ua-entry__desc">Definition.</p>
</div>
```

### Linking keywords from other pages

Use the shared keyword link markup anywhere (character pages, rules pages, etc.). The `guide.js` script will rewrite it to the correct URL, even with instant navigation and a `site_url` base path.

```html
<a class="ua-keyword-link" data-keyword="keyword-<slug>" href="#">Keyword Name</a>
```

## Status effects

- Add another block to `docs/status-effects.md`:

```html
<div class="ua-entry status-entry" id="status-<slug>">
  <p class="ua-entry__title">Status name</p>
  <p class="ua-entry__desc">Description.</p>
</div>
```

### Linking status effects from other pages

Use the shared status effect link markup anywhere. The `guide.js` script will rewrite it to the correct URL (similar to keywords).

```html
<a class="ua-status-link" data-status="status-<slug>" href="#">Status name</a>
```

## Card Types

- Add another block to `docs/card-types.md`:

```html
<div class="ua-entry card-type-entry" id="card-type-<slug>">
  <p class="ua-entry__title">Card type name</p>
  <p class="ua-entry__desc">Explanation of what this card type is and the rules it follows.</p>
</div>
```

### Linking card types from other pages

```html
<a class="ua-card-type-link" data-card-type="card-type-<slug>" href="#">Card type name</a>
```

## FAQ

- Add another question to `docs/faq.md`:

```md
??? question "Question goes here?"
    Answer goes here.
```

## Terminology

- Add a row to `docs/terminology.md` inside `#terminology-table` (include an `id` so terms can be linked):

```html
<tr id="term-<slug>">
  <td>Term</td>
  <td>Definition</td>
</tr>
```

### Linking terms from other pages

```html
<a class="ua-term-link" data-term="term-<slug>" href="#">Term</a>
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
