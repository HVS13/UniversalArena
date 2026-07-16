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

Cost baselines:

- Energy cost: Base Power = Energy cost x 10.
- Ultimate Meter-only cost: Base Power = Ultimate Meter cost x 1.5.
- Mixed-cost Ultimate (Ultimate Meter + Energy): Base Power = Ultimate Meter cost x 1, then add Energy cost x 10.
- Variable Energy cost (X) on non-Ultimates: if X can be 0, Base Power = 5 x (X + 1); otherwise use 10 x X.
- Variable Energy on mixed-cost Ultimates: use 10 x X even if X can be 0.
- 0 Energy cards: if not Created, Base Power = 5. For a 0 Energy Created card, record the creating card's final budgeted Base Power before its Melee/Ranged range as a ceiling.
- Special cards with `Power: -` do not receive a Power range or speed-based Power adjustment.

Standard adjustments:

- Melee Power range: Base Power +/- floor(Base Power x 0.20).
- Ranged Power range: Base Power +/- floor(Base Power x 0.25).
- If a card only deals Power damage or only grants Power Shield/HP, with no meaningful additional utility, multiply Base Power by 1.20 before applying the range.
- Evade counts as utility. A Defense card with Evade normally does not receive the pure Shield/HP x 1.20 bonus. Evade has no separate universal percentage penalty; reduce further only when the card has additional meaningful value.
- Created cards multiply Base Power by 0.90.
- For non-Ultimate cards with Power, use the card form's printed Speed: Fast x 0.90, Normal x 1.00, Slow x 1.10.
- Ultimate cards do not receive an automatic Fast or Slow Power modifier. Their Speed is considered together with their Meter cost, utility, restrictions, and overall finisher role.
- Temporary Haste, Slow, Prepare, cost reduction, or other in-match modifiers do not recalculate printed Power.
- By default, a transformed or replacement form uses that form's own printed cost and printed Speed for authoring. A documented transformation or progression family may instead share one Power budget when the setup card, status, threshold, drawback, or other access cost already pays for the enhanced form. State what pays for the improvement and do not count it again as a Speed or utility adjustment.
- If a card has high execution requirements or narrow conditions, you can multiply Base Power by 1.10-1.20.
- If a card adds meaningful utility (status, draw, resource gain, multi-target, strong tempo effects), bias toward the low end of the range or reduce Base Power.
- If a card deals Power damage and also heals, treat healing as extra output and lower Base Power so total impact matches the target.
- Single-target cards with Power are affected by Distance; if you use Close or Far, budget around the resulting peaks and valleys.

Expected effective cost:

- Printed cost is the default authoring baseline.
- A reliable, character-defining cost engine may instead use expected effective cost: the weighted average amount normally paid during the character's intended play pattern.
- Record the printed cost, expected reliable reduction, expected effective cost, and why the engine is reliable enough to use.
- Use ordinary expected play, not the maximum theoretical discount. Rare, random, enemy-dependent, or once-per-game reductions normally do not change the baseline.
- Expected effective cost is an authoring assumption only. Actual in-match cost changes never recalculate printed Power.
- Different cards may need different assumptions if they are normally used at different stages of the engine.

Special costs and prerequisites:

- Optional additional spending does not add its maximum possible amount to printed Base Power. Budget the per-spend effect separately because the player only receives it when the resource is actually spent.
- A requirement that remains available after the card is used normally justifies the 10-20% execution bonus, not the requirement's full cost.
- A setup or prerequisite that is consumed by the payoff card may contribute part of its own Power budget. Credit only the portion used exclusively by the payoff; do not count value already delivered by the setup card itself.
- Crediting the full setup cost is exceptional and is only appropriate when the setup exists solely to enable the payoff and is fully consumed by it.
- If a payoff consumes an item or resource that must normally be repurchased, its repeatable budget may include the recurring acquisition cost plus the activation cost. Document any free starting copy separately because the first use is cheaper than later uses.
- Follow-Up and other conditional cost reductions do not recalculate printed Power during play. Their expected repeat value still counts as utility during authoring.
- Character-specific exceptions must state the normal baseline, the prerequisite or limitation being credited, any standard modifier being overridden, and the final Base Power before the Melee/Ranged range.

Calculation order:

1. Calculate Base Power from printed cost, or from a documented expected effective cost or recurring prerequisite cycle.
2. If it is a 0 Energy Created card, record the creating card's final budgeted Base Power before range as the ceiling.
3. Apply percentage bonuses and penalties multiplicatively. Do not add percentages together.
4. Do not round between percentage modifiers.
5. After all percentage modifiers, round adjusted Base Power down.
6. Reduce that result for utility, healing, statuses, area effects, card access, resource generation, or other additional value.
7. Apply any documented prerequisite allocation, shared-family allocation, or character-specific adjustment.
8. For a 0 Energy Created card, cap the result at the recorded creating-card ceiling.
9. Generate the final Melee or Ranged range from the resulting Base Power.
10. Round range calculations down and clamp minimum Power at 0.

Worked examples:

- Created, Melee, only damage, created by a card with final budgeted Base Power 10: `10 x 1.20 x 0.90 = 10.8`, rounded down to Base Power 10, then `10 +/- floor(10 x 0.20)` = Power 8-12.
- Created, Fast, Melee, only damage, created by a card with final budgeted Base Power 10: `10 x 1.20 x 0.90 x 0.90 = 9.72`, rounded down to Base Power 9, then `9 +/- floor(9 x 0.20)` = Power 8-10.
- Slow, non-Ultimate, 2 Energy, Melee, only damage: `20 x 1.20 x 1.10 = 26.4`, rounded down to Base Power 26, then `26 +/- floor(26 x 0.20)` = Power 21-31.
- Slow, 30 Ultimate Meter, Ranged, only damage: Ultimate Speed has no automatic modifier, so `30 x 1.5 x 1.20 = 54`, then `54 +/- floor(54 x 0.25)` = Power 41-67.
- 1 Energy, Melee Defense with Shield + Evade: Evade makes the card non-pure, so Base Power stays 10; `10 +/- floor(10 x 0.20)` = Power 8-12.
- DIO Strike reconstructed expected-cost example: printed cost 4, expected Blood Focus reduction 2, expected effective cost 2; `2 x 10 x 1.20 = 24`, then Melee Power 20-28.
- Leon Rocket Launcher recurring-cycle example: 10 Ultimate Meter to repurchase the consumed launcher + 30 Ultimate Meter to fire = 40 recurring Meter; `40 x 1.5 = 60`, then Ranged Power 45-75. The free starting launcher makes the first shot cheaper but does not change the repeatable budget.

Examples:

- 3 Energy, Ranged: Base Power 30 -> Power 23-37.
- 60 Ultimate Meter, Melee: Base Power 90 -> Power 72-108.
- 1 Energy, Melee, only damage: Base Power 12 -> Power 10-14.
- X Energy (can be 0), Ranged: Base Power 5 x (X + 1) -> Power 4-6 + 4-6 times X.
- 30 Ultimate Meter + X Energy, Melee: Base Power 30 + 10X -> Power 24-36 + 8-12 times X.
- 20 Ultimate Meter, Ranged, damage + heal Power / 2: Target Base Power 30 -> set Base Power to 20 -> Power 15-25.
- 0 Energy, Created from a 1 Energy Melee card: Base Power up to the creating card's final budgeted Base Power, then Power range as normal.

Exceptions and current-roster transition:

- These authoring rules do not automatically recalculate the whole current roster. Existing values remain until an individual review approves a change. Existing values that differ from this procedure are not benchmarks for new cards.
- Targeted arithmetic and data corrections approved in the current review are exceptions to that safeguard: DIO's Defend and Throwing Knives families, Luffy's Bazooka family, Ichigo's Bankai Finisher range, and Leon's Suplex structured effects.
- DIO (Part 3), Basic and Technique cards: use an approximately 2 Energy expected Blood Focus reduction as a reconstructed authoring assumption. This is supported by the current values and gameplan but was not explicitly recorded in the original guide. Strike uses expected cost 2 and the pure-damage bonus for final Base Power 24. Defend uses expected cost 2, receives no pure-Shield bonus because it has Evade, and uses final Base Power 20. Vampiric Drain uses expected cost 3 and final Base Power 30 after its extra output replaces the pure-damage bonus. Throwing Knives uses expected cost 5 and a documented utility reduction to final Base Power 42.
- DIO's Time Stop replacement forms share their parent card's Power. The 9 Energy Time Stop setup, its access requirement, and its later drawback pay for the enhanced forms; do not apply an additional Fast penalty to those family members.
- DIO (Part 3), ROAD ROLLER DA!: 40 Ultimate Meter gives Base Power 60. Allocate +30 Base Power from the 9 Energy The World: Time Stop setup because ROAD ROLLER DA! requires that status and sets its Count to 0 after use. Do not credit the full 90 setup Base Power because Time Stop already provides Stun, card-play denial, Strength, Haste, Follow-Up access, and Retain. Final Base Power is 90, producing Power 72-108. This final exception already accounts for the card's Fast Speed and other effects; do not apply additional Fast or pure-output modifiers. Optional Stolen Blood spending is budgeted separately and is not included in printed Power.
- Luffy's Gear card families share Power across Normal, Fast, and Slow replacement forms. Gear Transformation, Gear 2nd's temporary duration, and Gear 3rd's Slow/Deflate drawbacks pay for the form changes. The Bazooka family uses final Base Power 36 and the Melee range 29-43.
- Ichigo's Bankai and Hollow replacement families share their parent card's Power because their transformation states, limited duration, and Strain drawback pay for the enhanced forms. Getsuga Tensho (Bankai Finisher) uses Base Power 45 and the Ranged range 34-56.
- Naruto's Rasengan family shares Power between its base and Clone Assist form; Shadow Clone spending and transformation access pay for the additional effects. Existing Rasengan values remain pending a separate Slow-budget review.
- Existing Slow Ultimates, including Spirit Bomb and Gomu Gomu no Gigant Rifle, receive no automatic Slow bonus under the Ultimate rule above.
- Slow Special cards with `Power: -`, including Saitama's Bored forms and Death Note: Write the Name, are unaffected by Power speed adjustments.

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

Standardize sentences so they align with the timing ladder: On Play -> Before Clash -> After Clash -> Before Use -> On Use -> On Hit -> After Use -> Always. Each sentence should start with a timing label unless it is default On Use (which can be left unlabeled); split mixed timing effects into separate sentences.

Templates:

- Attack (Power): "Deal Power damage." "On Hit: [bonus]." "After Use: [follow-up]."
- Defense (Power Shield): "Gain Power Shield." "After Clash: [bonus]." "After Use: [follow-up]."
- Special (no Power roll): "On Play: [effect]." "[effect]." "After Use: [cleanup]."
- Utility/Setup: "On Play: [draw/move/status]." "Before Use: [prep]." "After Use: [cleanup]."
- Reactive/Interrupt: "After Clash: [effect]." "Before Use: [effect]." "After Use: [effect]."

Optional effects use `?` and mandatory effects use `:` after the condition or cost (example: "Spend X Status? Gain Evade." vs "Spend 1 Ammo: Deal Power damage."). Use "Can only be played if" / "Cannot be played if" for play restrictions.

Keyword placement:

- Place keyword-only lines at the timing they resolve on the ladder.
- Pre-play keywords (Innate, Prepare) go first.
- Distance keywords (Close, Far) go before the main Power line they modify.
- After Clash keywords (Evade, Counter, Reuse) go after the Shield/damage line they depend on.
- After Use keywords (Follow-Up, Assist Attack) go after On Hit lines; keep any "On Follow-Up" or "On Assist Attack" lines directly after the keyword line.
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
- When an effect changes both Potency and Count, write the two changes separately and explicitly.

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
