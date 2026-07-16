# Power Calculation Reference

This page is the canonical authoring reference for printed card Power. Use it for every new card, replacement form, Created card, and Power correction.

The formula produces an authoring budget. It does not replace playtesting, and temporary in-match effects never recalculate printed Power.

Use the calculator from `docs/scripts` for deterministic arithmetic:

```text
npm run power -- --help
```

## Required Power Budget Record

Before assigning a printed Power range, record:

```text
Card or family:
Printed cost:
Cost baseline used:
Cost Base Power:
Pure-output multiplier:
Created multiplier:
Printed-speed multiplier:
Execution modifier:
Utility/output adjustment:
Prerequisite or family allocation:
Final Base Power:
Range type:
Printed Power:
Exception or precedent:
```

Do not omit a line. Write `None` when it does not apply. A value that cannot be reconstructed from this record is not ready to publish.

## Power stages

- **Cost Base Power**: Power produced directly by the authoring cost.
- **Adjusted Base Power**: Cost Base Power after percentage multipliers and rounding.
- **Final Base Power**: Adjusted Base Power after utility/output adjustments and documented allocations.
- **Printed Power**: The final Melee or Ranged range shown on the card.

For a fixed-value card:

```text
Adjusted Base Power = floor(Cost Base Power x all applicable percentage multipliers)
Final Base Power = Adjusted Base Power - utility reduction + documented allocation
```

Clamp Final Base Power at 0 before generating the range.

## 1. Determine Cost Base Power

### Energy cards

```text
Cost Base Power = Energy cost x 10
```

### Ultimate Meter-only cards

```text
Cost Base Power = Ultimate Meter cost x 1.5
```

Do not round the Meter conversion before other percentage multipliers.

### Mixed-cost Ultimates

```text
Cost Base Power = Ultimate Meter cost x 1 + Energy cost x 10
```

Example:

```text
30 Ultimate Meter + 2 Energy = 30 + 20 = 50 Cost Base Power
```

### Variable Energy cards

For a non-Ultimate whose X Energy may be 0:

```text
Cost Base Power = 5 x (X + 1) = 5 + 5X
```

If X cannot be 0:

```text
Cost Base Power = 10X
```

For a mixed-cost Ultimate, each X Energy contributes 10X even when X may be 0.

### 0 Energy cards

A non-Created 0 Energy card starts at 5 Cost Base Power.

A 0 Energy Created card uses the creating source's Final Base Power as a ceiling. It may use less when it has additional value or is produced repeatedly.

### Special cards

Cards with `Power: -` do not receive a range or Power multipliers.

## 2. Apply percentage multipliers

Apply all percentages multiplicatively. Do not add percentages together and do not round between multipliers.

### Pure-output multiplier

Multiply by `1.20` only when the card's Power is exclusively one of:

- Power damage;
- Power Shield;
- Power HP or healing when it is the card's only Power-scaled output.

The bonus normally does not apply when the card also provides meaningful additional value, including statuses, resource gain, draw, card creation, extra healing, AoE/Splash/Bounce access, Evade, Counter, Reuse, or strong tempo effects.

Multihit by itself only divides the same total Power and does not automatically remove this bonus. Per-hit riders and repeated On Hit effects are additional value.

A minor or character-defining rider may be budget-neutral only when the Power Budget Record states that decision. Existing roster values are not automatic permission to make a new rider free.

### Created multiplier

Created cards multiply Base Power by `0.90`.

Creation is an access advantage. Exhaust and Ethereal limit lifecycle but do not cancel the Created multiplier.

### Printed-speed multiplier

For non-Ultimate cards with Power:

```text
Fast   x 0.90
Normal x 1.00
Slow   x 1.10
```

Slow is an intentional compensation for being restricted to the Slow Zone and being easier to interrupt. Do not add another execution bonus merely because the card is Slow; an additional execution modifier requires a separate material restriction.

Temporary Haste, Slow, Prepare, cost changes, and other in-match effects do not recalculate printed Power.

### Ultimates and Speed

Ultimates do not receive automatic Fast or Slow multipliers. Their speed is budgeted together with Meter cost, targeting, utility, restrictions, setup, and finisher role.

### Execution modifier

A narrow, costly, or difficult requirement may multiply Base Power by `1.10-1.20`.

Do not grant this merely because a condition exists. It must materially reduce access, timing, target availability, or reliability.

## 3. Round Adjusted Base Power

After all percentage multipliers:

```text
Adjusted Base Power = floor(unrounded adjusted value)
```

Do not round after each multiplier.

Example:

```text
1 Energy, Created, Fast, pure Melee damage
10 x 1.20 x 0.90 x 0.90 = 9.72
Adjusted Base Power = 9
```

## 4. Budget additional value

After percentage rounding, reduce Base Power when total impact exceeds the intended budget.

Common reasons:

- status application;
- repeated On Hit effects;
- draw or card creation;
- resource gain or cost reduction;
- healing in addition to damage;
- multiple targets;
- Follow-Up, Assist Attack, Retain, Evade, Counter, or Reuse;
- strong positioning or play-denial effects.

There is no universal utility percentage. Record the amount removed and why. Prefer a simple integer reduction from Adjusted Base Power.

### Evade

Evade is utility. A Defense card with Evade normally loses eligibility for the pure Shield/HP `x1.20` bonus.

Evade has no second universal fixed penalty. Reduce further only for additional meaningful value.

### Damage plus healing

When a card deals Power damage and heals for `Power / 2`, total Power-scaled output is approximately `1.5 x Power`. A common target is:

```text
Final Base Power = Cost Base Power / 1.5
```

Example:

```text
20 Ultimate Meter = 30 Cost Base Power
30 / 1.5 = 20 Final Base Power
Ranged Power = 15-25
```

### Multihit

Splitting Power across hits does not change total Power by itself.

Budget separately for per-hit riders, resource gain, flat-mitigation interactions, minimum-damage or rounding behavior, and variable hit counts.

## 5. Costs, prerequisites, and replacement families

### Printed cost is the default

Use printed cost unless a documented exception applies. Never use the maximum theoretical discount.

### Expected effective cost

A deterministic or highly reliable character-defining cost engine may use expected effective cost as a documented exception.

```text
Expected Effective Cost = sum(State probability x max(0, Printed cost - Reduction in that state))
```

Record the printed cost, state assumptions, expected reliable reduction, expected effective cost, and why those states represent normal use.

Random, enemy-dependent, rare, or once-per-game reductions normally do not change the baseline. Different cards may use different expected costs when they are normally played at different engine stages.

Actual in-match cost changes never recalculate printed Power.

### Optional spending

Optional extra spending does not add its maximum possible value to printed Power. Budget each per-spend effect separately because the player receives it only when paying the resource.

### Requirements that remain available

A requirement that remains after use normally qualifies only for the execution modifier. Do not add the requirement's full cost.

### Consumed prerequisites

A prerequisite consumed by the payoff may contribute the portion of its budget used exclusively by that payoff.

Do not count value already delivered by the setup. Full credit is exceptional and requires the setup to exist solely for the payoff.

### Recurring acquisition cycles

When a payoff consumes an item that must be repurchased:

```text
Recurring Cost Base Power = acquisition cost + activation cost
```

Record a free starting copy separately; it changes the first use, not the repeatable cycle.

### Replacement and progression families

A replacement form normally uses its own printed cost and printed speed.

A documented family may share one Final Base Power when a transformation card, status, threshold, consumed resource, limited duration, or drawback already pays for the stronger form.

The record must name what pays for the difference. A shared family may override Fast or Slow multipliers only when that override is explicit; do not count the same benefit again as speed, utility, or execution value.

## 6. Generate Printed Power

### Melee

```text
Range adjustment = floor(Final Base Power x 0.20)
Minimum = Final Base Power - adjustment
Maximum = Final Base Power + adjustment
```

### Ranged

```text
Range adjustment = floor(Final Base Power x 0.25)
Minimum = Final Base Power - adjustment
Maximum = Final Base Power + adjustment
```

Clamp the minimum at 0. Use the card's printed Melee or Ranged type.

## 7. Variable Power expressions

For a printable expression whose Final Base Power is:

```text
A + BX
```

use component ranging:

1. apply percentage modifiers to A and B separately;
2. round each component down separately;
3. state whether utility adjustment applies to A, B, or both;
4. generate the range for A and B separately;
5. print `A-range + B-range times X`.

This is canonical because range floors can make one recomputed total differ at higher X values.

Examples:

```text
5 + 5X -> 4-6 + 4-6 times X
30 + 10X, Melee -> 24-36 + 8-12 times X
```

Do not silently switch between component and total-value ranging.

## 8. Runtime modifiers do not rewrite printed Power

Distance, Close, Far, Strength, Dexterity, Fortified, Weak, Vulnerable, Haste, Slow, and other in-match effects modify the roll or game state at runtime. They do not change the printed authoring calculation.

When a card has Close or Far, budget around expected peaks and valleys, but keep the printed range based on Final Base Power.

## Calculation order

1. Determine Cost Base Power.
2. For a 0 Energy Created card, record the creator's Final Base Power ceiling.
3. Express variable costs as additive components.
4. Apply pure-output, Created, printed-speed, and execution percentages multiplicatively.
5. Round each fixed value or variable component down once.
6. Reduce for additional output and utility.
7. Apply documented prerequisite, recurring-cycle, family, or character-specific allocation.
8. Apply the Created ceiling.
9. Generate Melee or Ranged ranges.
10. Verify the result against the Power Budget Record.

## Worked examples

### Pure Melee damage

```text
1 Energy = 10
Pure output: 10 x 1.20 = 12
Melee adjustment: floor(12 x 0.20) = 2
Printed Power: 10-14
```

### Defense with Evade

```text
1 Energy = 10
No pure-output bonus because Evade is utility
No separate Evade penalty
Melee adjustment: floor(10 x 0.20) = 2
Printed Power: 8-12
```

### Fast utility Defense

```text
2 Energy = 20
No pure-output bonus
Fast: 20 x 0.90 = 18
Melee adjustment: floor(18 x 0.20) = 3
Printed Power: 15-21
```

### Slow pure damage

```text
2 Energy = 20
20 x 1.20 x 1.10 = 26.4
Adjusted Base Power: 26
Melee adjustment: floor(26 x 0.20) = 5
Printed Power: 21-31
```

### Created Fast pure damage

```text
1 Energy = 10
10 x 1.20 x 0.90 x 0.90 = 9.72
Adjusted Base Power: 9
Melee adjustment: floor(9 x 0.20) = 1
Printed Power: 8-10
```

### Ranged damage plus healing

```text
20 Ultimate Meter = 30
Damage plus Power / 2 healing: 30 / 1.5 = 20
Ranged adjustment: floor(20 x 0.25) = 5
Printed Power: 15-25
```

### Recurring consumable Ultimate

```text
10 Ultimate Meter acquisition + 30 Ultimate Meter activation = 40
40 x 1.5 = 60 Final Base Power
Ranged adjustment: floor(60 x 0.25) = 15
Printed Power: 45-75
```

## Current roster precedents

These explain existing families; they are not blanket permission for unrelated cards.

- **DIO Basic and Technique cards** use a reconstructed expected-cost exception based on approximately 2 expected Blood Focus reduction. New cards require their own state assumptions.
- **DIO Time Stop forms** share parent Power because setup, access, and drawback pay for enhanced delivery.
- **ROAD ROLLER DA!** uses Final Base Power 90: 60 from 40 Ultimate Meter plus a partial 30 allocation from the consumed Time Stop setup. Other Time Stop value is not counted again.
- **Luffy Gear families** share Power across replacement forms because Gear Transformation, limited duration, Slow, and Deflate pay for the differences. This documented family overrides individual Fast and Slow multipliers.
- **Ichigo Bankai and Hollow families** share parent Power because transformation access, duration, and Strain pay for enhanced forms.
- **Naruto Rasengan forms** use Final Base Power 30. The Slow base form reaches Adjusted Base Power 33, then the shared family's Clone Assist utility allocation reduces the family to 30; Clone Assist consumes Shadow Clones and adds Follow-Up and Vulnerable.
- **Saitama State forms** use progression-family budgets because State thresholds pay for enhanced forms.
- **Leon Rocket Launcher** uses the recurring 10 Meter acquisition plus 30 Meter activation cycle.

## Final checklist

- The Power Budget Record is complete.
- The original cost baseline is visible.
- Every multiplier has a reason.
- Fast and Slow use the correct printed-speed multiplier unless a family explicitly overrides it.
- Ultimates have no automatic speed multiplier.
- Evade has no invented second deduction.
- Utility and additional output are not double-counted.
- Setup value is not counted twice.
- Variable coefficients use component ranging.
- Melee/Ranged spread matches the printed type.
- Markdown and YAML show the same Power.
