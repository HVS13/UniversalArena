# Character Creation Guide

Practical rules and guardrails for building new characters. Use this alongside the template so pages stay consistent and maintainable.

## Quick Start

1. Copy `docs/characters/template.md` to `docs/characters/<slug>.md`.
2. Add portrait art to `docs/assets/characters/` and reference it as `../../assets/characters/<file>`.
3. Fill out the header (Name, Version, Origin, Roles, Difficulty, Gameplan).
4. Use the card-block layout for all cards, then follow the naming and type-order rules below.
5. Add the page to `mkdocs.yml` under `Characters`.
6. Add a card entry to `docs/characters/index.md` and include a Power line in the meta.

## Start Here: Template + Minimum Viable Character

- The template page is the canonical structure reference. If you are new, read `docs/characters/template.md` first and follow its section order.

Minimum viable character checklist:

1. Header block with Name, Version, Origin, Roles, Difficulty, and Gameplan.
2. At least one Innate (if none, say so explicitly).
3. A `## Cards` section with exactly five cards:
   - 2 Basic cards (Strike + Defend)
   - 3 Technique cards
4. One Ultimate card.
5. If you create cards, add a `## Created Cards` section with those card blocks.

## Rules and Consistency

### Design priorities

- Prioritize lore-accurate, synergistic, and fun kits over balance.
- Balance matters, but it is secondary to theme and play feel.

### Basic naming

- Basic + Attack cards must be named Strike.
- Basic + Defense cards must be named Defend.
- Basic + Special cards can use any name.

### Card type order

When listing `Type:` tags, use this order:

1. Basic / Technique / Ultimate
2. Attack / Defense / Special
3. Physical / Magical / Mental / Electric
4. Melee / Ranged
5. AoE / Splash / Bounce
6. Slash / Pierce / Blunt / Multihit
7. Transformation / Recovery / Buff / Debuff

### Status effects, keywords, terms, roles

- Use the shared link markup so `guide.js` can rewrite links:

```html
<a class="ua-keyword-link" data-keyword="keyword-evade" href="#">Evade</a>
<a class="ua-status-link" data-status="status-slow" href="#">Slow</a>
<a class="ua-term-link" data-term="term-created-card" href="#">Created Card</a>
<a class="ua-role-link" data-role="role-striker" href="#">Striker</a>
```

- Only link status effects that live in `docs/status-effects.md`. Unique per-character status effects should stay plain text on the character page.
- Avoid undefined mechanics. If you introduce a global keyword/status/term, add it to the relevant reference page.

### Card replacement (Becomes)

- Conditional "this card becomes X" effects are automatic, not optional.
- Treat the card as X in any zone (deck, hand, play) whenever the condition is true.
- Do not write optional "may become" effects. If you need an option, use a different mechanic.

### Spend is mandatory

- "Spend X" is required, not optional. If you cannot spend, the effect that requires the Spend does not happen.
- If you want a Spend to be optional, explicitly write "You may spend X."

### Potency + Count rule (read this)

This is the standard rule for effects that say "Inflict X A" or "Gain X A" when A has Potency + Count. It is already defined in the FAQ and status effect rules, and you should write cards with this in mind:

- If the target already has A, only Potency increases by X; Count stays the same.
- If the target has no A, it gains A with Potency X and Count 1.

See `docs/faq.md` and `docs/status-effects.md` for the canonical wording.

### Values, caps, and edge cases

- Set Potency/Count/Value/Stack caps that the kit can actually reach.
- If a kit can exceed a cap through multiple sources, raise the cap or reduce the sources.
- Make sure every value you introduce has a clear path to gain and lose, and that timing order is unambiguous.

### Created cards

- If a card is created, list it under a `## Created Cards` section on the character page.
- If an effect creates a card and does not specify where it goes, it goes to the discard pile (see `docs/faq.md`).

## Do / Don't

### Do

- Use local art in `docs/assets/characters/` and the `../../assets/characters/<file>` path.
- Keep `site/` untouched; it is generated output.
- Add the character to `mkdocs.yml` and `docs/characters/index.md`.

### Don't

- Do not invent undefined global mechanics without adding them to reference pages.
- Do not link unique status effects as if they were global.
- Do not omit the Power line in the character index card.
