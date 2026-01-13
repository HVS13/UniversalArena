# Character Creation Guide

Practical rules and guardrails for building new characters. Use this alongside the template so pages stay consistent and maintainable.

## Quick Start

1. Copy `docs/characters/template.md` to `docs/characters/<slug>.md`.
2. Add portrait art to `docs/assets/characters/` and reference it as `../../assets/characters/<file>`.
3. Add a data file at `docs/data/characters/<slug>.yml` that matches the docs content (see `docs/data/README.md` for the schema).
4. Fill out the header (Name, Version, Origin, Roles, Difficulty, Gameplan).
5. Use the card-block layout for all cards, then follow the naming and type-order rules below.
6. Add the page to `mkdocs.yml` under `Characters`.
7. Add a card entry to `docs/characters/index.md` and include a Power line in the meta.

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

### Power budgeting

- Base Power targets: Energy cost x 10, Ultimate Meter cost x 1.5. Round down if you hit decimals.
- Mixed-cost ultimates (Ultimate Meter + Energy): treat Ultimate Meter as 1 base per meter, then add the Energy base.
- Variable Energy cost (X) on non-ultimates: if X can be 0, Base Power = 5 * (X + 1); otherwise use 10 * X.
- Variable Energy on mixed-cost ultimates: use 10 * X even if X can be 0.
- 0 Energy cards: if not created, Base Power = 5; if created, Base Power cannot exceed the Base Power of the card that creates it.
- Melee Power range: Base Power +/- floor(Base Power x 0.20).
- Ranged Power range: Base Power +/- floor(Base Power x 0.25).
- If a card only deals Power damage or only grants Power Shield/HP, increase Base Power by 20% before applying the range.
- Created cards and Fast speed: reduce Base Power by 10% each; penalties stack.
- Bonuses and penalties stack; apply them to Base Power before the Melee/Ranged range.
- If a card has high execution requirements or narrow conditions, you can add a 10-20% Base Power bonus.
- If a card adds meaningful utility (status, draw, resource gain, multi-target, strong tempo effects), bias toward the low end of the range or reduce Base Power.
- If a card deals Power damage and also heals, treat healing as extra output and lower Base Power so total impact matches the target.
- Character-specific exceptions are allowed but must be documented in this guide.

Examples:
- 3 Energy, Ranged: Base Power 30 -> Power 23-37.
- 60 Ultimate Meter, Melee: Base Power 90 -> Power 72-108.
- 1 Energy, Melee, only damage: Base Power 12 -> Power 10-14.
- X Energy (can be 0), Ranged: Base Power 5 * (X + 1) -> Power 4-6 + 4-6 times X.
- 30 Ultimate Meter + X Energy, Melee: Base Power 30 + 10X -> Power 24-36 + 8-12 times X.
- 20 Ultimate Meter, Ranged, damage + heal Power / 2: Target Base Power 30 -> set Base Power to 20 -> Power 15-25.
- 0 Energy, created from a 1 Energy melee card: Base Power up to 10 -> Power 8-12.

Exceptions (current roster):
- DIO (Part 3) Ultimate: ROAD ROLLER DA! adds +30 Base Power for the 9 Energy prerequisite (The World: Time Stop).

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

### Card text templates (timing order)

Standardize sentences so they align with the timing ladder: On Play -> Before Clash -> After Clash -> Before Use -> On Use -> On Hit -> After Use -> Always. Each sentence should start with a timing label; split mixed timing effects into separate sentences.

Templates:

- Attack (Power): "On Use: Deal Power damage." "On Hit: [bonus]." "After Use: [follow-up]."
- Defense (Power Shield): "On Use: Gain Power Shield." "After Clash: [bonus]." "After Use: [follow-up]."
- Special (no Power roll): "On Play: [effect]." "On Use: [effect]." "After Use: [cleanup]."
- Utility/Setup: "On Play: [draw/move/status]." "Before Use: [prep]." "After Use: [cleanup]."
- Reactive/Interrupt: "After Clash: [effect]." "Before Use: [effect]." "After Use: [effect]."

Optional effects use `?` and mandatory effects use `:` after the condition or cost (example: "Spend X Status? Gain Evade." vs "Spend 1 Ammo: Deal Power damage."). Use "Can only be played if" / "Cannot be played if" for play restrictions.

Keyword placement:

- Place keyword-only lines at the timing they resolve on the ladder.
- Pre-play keywords (Innate, Prepare) go first.
- After Clash keywords (Evade, Counter, Reuse) go after the Shield/damage line they depend on.
- After Use keywords (Follow-Up) go after On Hit lines; keep any "On Follow-Up" lines directly after the Follow-Up line.
- Cleanup keywords (Retain, Exhaust, Ethereal) go last.

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
- Optional Spend uses `?` (example: "Spend X Resource? Gain Evade."). Do not write "You may spend."

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
- Keep the `docs/data/characters/<slug>.yml` file in sync with the page.

### Don't

- Do not invent undefined global mechanics without adding them to reference pages.
- Do not link unique status effects as if they were global.
- Do not omit the Power line in the character index card.
