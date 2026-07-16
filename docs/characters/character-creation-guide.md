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

- The template page is the canonical structure reference. Read `docs/characters/template.md` first and follow its section order.

Minimum viable character checklist:

1. Header block with Name, Version, Origin, Roles, Difficulty, and Gameplan.
2. At least one Innate; if none, say so explicitly.
3. A `## Cards` section with exactly five cards:
   - 2 Basic cards: Strike and Defend;
   - 3 Technique cards.
4. One Ultimate card.
5. If the kit creates cards, a `## Created Cards` section with those card blocks.

## Rules and Consistency

### Design priorities

- Prioritize lore-accurate, synergistic, and fun kits over balance.
- Balance matters, but it is secondary to theme and play feel.

### Power budgeting

Use [Power Calculation Reference](../power-calculation.md) as the single canonical formula.

Before assigning printed Power, complete the required Power Budget Record. Preserve the cost baseline, every multiplier, utility adjustment, prerequisite or family allocation, Final Base Power, range type, and printed result.

Safeguards:

- Every Power-bearing card uses its own printed Speed: Fast `x0.90`, Normal `x1.00`, Slow `x1.10`.
- Printed Speed applies after utility and family allocations to the complete Pre-Speed Base Power.
- Ultimate, transformation, progression, Created, Basic, and Technique cards have no Speed exemption.
- A family may share Pre-Speed Base Power, but forms with different printed Speeds must have different Final Base Power.
- Evade normally removes eligibility for the pure Shield/HP bonus but has no second universal deduction.
- Variable Power expressions use component ranging.
- Current roster precedents explain existing families; they are not automatic templates for new cards.
- Keep Markdown and YAML Power values identical.

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

### Card text templates and timing order

Use this order:

```text
On Play -> Before Clash -> After Clash -> Before Use -> On Use -> On Hit -> After Use -> Always
```

Start each sentence with a timing label unless it is default On Use, which may be unlabeled. Split mixed timing effects into separate sentences.

Templates:

- Attack: `Deal Power damage.` `On Hit: [bonus].` `After Use: [follow-up].`
- Defense: `Gain Power Shield.` `After Clash: [bonus].` `After Use: [follow-up].`
- Special: `On Play: [effect].` `[effect].` `After Use: [cleanup].`
- Utility/Setup: `On Play: [draw/move/status].` `Before Use: [prep].` `After Use: [cleanup].`
- Reactive/Interrupt: `After Clash: [effect].` `Before Use: [effect].` `After Use: [effect].`

Optional effects use `?` and mandatory effects use `:` after the condition or cost. Use `Can only be played if` and `Cannot be played if` for play restrictions.

Keyword placement:

- Pre-play keywords such as Innate and Prepare go first.
- Distance keywords Close and Far go before the Power line they modify.
- After Clash keywords Evade, Counter, and Reuse go after the Shield or damage line they depend on.
- After Use keywords Follow-Up and Assist Attack go after On Hit lines; keep related conditional lines directly after the keyword.
- Cleanup keywords Retain, Exhaust, and Ethereal go last.

### Status effects, keywords, terms, and roles

Use the shared link markup:

```html
<a class="ua-keyword-link" data-keyword="keyword-evade" href="#">Evade</a>
<a class="ua-status-link" data-status="status-slow" href="#">Slow</a>
<a class="ua-term-link" data-term="term-created-card" href="#">Created Card</a>
<a class="ua-role-link" data-role="role-striker" href="#">Striker</a>
```

- Only link status effects defined in `docs/status-effects.md`.
- Keep unique per-character statuses as plain text on the character page.
- Add every new global mechanic to its reference page before using it.

### Card replacement

- Conditional `this card becomes X` effects are automatic.
- Treat the card as X in every zone whenever the condition is true.
- Do not write optional `may become` effects; use a different mechanic when a choice is required.

### Spend is mandatory

- `Spend X` is required. If the required amount cannot be spent, the dependent effect does not happen.
- Optional Spend uses `?`, for example: `Spend X Resource? Gain Evade.`

### Potency + Count

For `Inflict X A` or `Gain X A` when A uses Potency + Count:

- If the target already has A, increase Potency by X and leave Count unchanged.
- If the target does not have A, give Potency X and Count 1.
- When an effect changes both Potency and Count, write both changes separately.

See `docs/faq.md` and `docs/status-effects.md` for canonical wording.

### Values, caps, and edge cases

- Set Potency, Count, Value, and Stack caps that the kit can actually reach.
- If several sources can exceed a cap, raise the cap or reduce the sources.
- Every value needs a clear gain path, loss path, and timing order.

### Created cards

- List Created cards under `## Created Cards`.
- If an effect creates a card without specifying a destination, it goes to the Discard Pile.
- Complete a separate Power Budget Record for each Created card.

## Do / Don't

### Do

- Use local art in `docs/assets/characters/` and the `../../assets/characters/<file>` path.
- Keep `site/` untouched; it is generated output.
- Add the character to `mkdocs.yml` and `docs/characters/index.md`.
- Keep `docs/data/characters/<slug>.yml` synchronized with the page.
- Run the data validator, Power calculator when needed, exporter, and strict MkDocs build.

### Don't

- Do not invent undefined global mechanics without adding them to reference pages.
- Do not link unique status effects as global statuses.
- Do not omit the Power line in the character index card.
- Do not publish a Power value that lacks a reproducible Power Budget Record.
