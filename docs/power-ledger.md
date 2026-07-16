# Current Roster Power Ledger

This page records how every current Power-bearing card or card family reaches its printed value. It is a companion to [Power Calculation Reference](power-calculation.md).

Use this ledger to preserve established character patterns. Do not copy an exception into a new kit without documenting why the same condition applies.

Entries labeled **Exact** follow the canonical formula directly. Entries labeled **Reconstructed** reproduce current values from the kit and roster pattern where the original calculation note was not preserved. Entries labeled **Exception** intentionally override a standard adjustment and state what pays for it.

Abbreviations:

- **CBP**: Cost Base Power.
- **ABP**: Adjusted Base Power after percentage multipliers and rounding.
- **FBP**: Final Base Power after utility and allocations.
- **M**: Melee range.
- **R**: Ranged range.

## Goku — Saiyan Saga

| Card or family | Reproducible calculation | Printed Power | Record |
| --- | --- | --- | --- |
| Strike | 1 Energy = 10 CBP; pure output `x1.20` = 12 FBP; M | 10-14 | **Exact.** Standard formula. |
| Defend | 1 Energy = 10 FBP; Evade removes pure-Shield bonus; M | 8-12 | **Exact.** Evade formula. |
| Meteor Combination / Kaio-ken Attack | 2 Energy = 20; pure output `x1.20` = 24 FBP; M | 20-28 | **Exception.** Transformation family shares Power. Multihit only divides total Power. |
| Kamehameha | 3 Energy = 30; pure output `x1.20` = 36 FBP; R | 27-45 | **Reconstructed.** Follow-Up and its conditional discount are treated as a budget-neutral identity rider for this family. |
| Spirit Bomb | 30 Meter `x1.5` = 45; pure output `x1.20` = 54 FBP; R | 41-67 | **Exact.** Ultimate speed has no automatic multiplier. |

## Monkey D. Luffy — Pre-Timeskip

| Card or family | Reproducible calculation | Printed Power | Record |
| --- | --- | --- | --- |
| Strike | 1 Energy = 10; pure output `x1.20` = 12 FBP; M | 10-14 | **Exact.** Standard formula. |
| Defend | 1 Energy = 10; pure output `x1.20` = 12 FBP; M | 10-14 | **Exact.** Standard formula. |
| Pistol / Jet Pistol / Gigant Pistol | 2 Energy = 20; pure output `x1.20` = 24 FBP; M | 20-28 | **Exception.** Gear family overrides individual Fast and Slow multipliers. Gear access, duration, Slow, and Deflate pay for form differences. |
| Bazooka / Jet Bazooka / Gigant Bazooka | 3 Energy = 30; pure output `x1.20` = 36 FBP; M | 29-43 | **Exception.** Same Gear-family rule. |
| Gomu Gomu no Jet Gatling | Mixed Ultimate CBP `30 + 10X`; no pure bonus because of Splash, Frail, and self-debuff output; component M | 24-36 + 8-12 times X | **Exact.** Mixed-cost component formula. |
| Gomu Gomu no Gigant Rifle | 30 Meter `x1.5` = 45 FBP; no pure bonus because of Splash access; M | 36-54 | **Exact.** Ultimate speed has no automatic multiplier. |

## Naruto Uzumaki — Pre-Timeskip

| Card or family | Reproducible calculation | Printed Power | Record |
| --- | --- | --- | --- |
| Strike | 1 Energy = 10 FBP; no pure bonus because of conditional Shadow Clone gain; M | 8-12 | **Exact.** Utility formula. |
| Defend | 1 Energy = 10 FBP; optional Evade access removes pure bonus; M | 8-12 | **Exact.** Evade formula. |
| Naruto Uzumaki Barrage | 2 Energy = 20 FBP; no pure bonus because of variable hits, Shadow Clone spend, and conditional Stun; M | 16-24 | **Exact.** X = 3 Stun remains text-only until structured X conditions are supported. |
| Rasengan / Clone Assist | Slow base: 3 Energy = 30, Slow `x1.10` = 33 ABP; shared-family utility adjustment `-3` = 30 FBP; M | 24-36 | **Reconstructed.** Clone Assist consumes 2 Shadow Clones and adds Vulnerable plus Follow-Up. The family shares FBP 30. |
| Shadow Clone: Strike | 1 Energy = 10; pure `x1.20`; Created `x0.90`; Fast `x0.90` = 9.72, floor 9 FBP; M | 8-10 | **Exact.** Created/Fast formula. Exhaust and Ethereal do not cancel the Created multiplier. |
| Gamabunta: Toad Smash | 0 Energy Created payoff; fixed summon-family allocation to 10 FBP; M | 8-12 | **Reconstructed.** The Gamabunta Ultimate and summon duration pay for repeat access; 10 remains below the creator ceiling. |
| Summoning Jutsu: Gamabunta | 30 Meter `x1.5` = 45 FBP; no pure bonus because of AoE, Slow, and summon output; R | 34-56 | **Exact.** Ultimate utility formula. |
| One-Tail Rasengan | 30 Meter `x1.5` = 45 FBP; no pure bonus because of clone spend, statuses, Follow-Up, and resource cleanup; M | 36-54 | **Exact.** Restricted Ultimate family payoff. |

## Kurosaki Ichigo — Soul Society

| Card or family | Reproducible calculation | Printed Power | Record |
| --- | --- | --- | --- |
| Strike / Tensa Zangetsu / White | 1 Energy = 10; pure output `x1.20` = 12 FBP; M | 10-14 | **Reconstructed.** Reiatsu gain is treated as a budget-neutral identity rider. Bankai and Hollow forms share parent Power because their states and Strain pay for delivery. |
| Defend | 1 Energy = 10; pure output `x1.20` = 12 FBP; M | 10-14 | **Reconstructed.** Conditional Bankai Haste is treated as a budget-neutral state rider. |
| Shunpo | 2 Energy = 20; Fast `x0.90` = 18 FBP; no pure bonus because of Evade, Follow-Up, and Retain; M | 15-21 | **Exact.** Fast utility Defense formula. |
| Getsuga Tensho family | 3 Energy = 30 FBP; no pure bonus because of Reiatsu gain/spend and Follow-Up; R | 23-37 | **Exception.** Bankai form shares parent Power because the transformation state pays for Fast delivery and improved spend scaling. |
| Getsuga Tensho — Bankai Finisher | 30 Meter `x1.5` = 45 FBP; no pure bonus because of optional Reiatsu scaling and access requirement; R | 34-56 | **Exact.** Ultimate speed has no automatic multiplier. |

## Leon S. Kennedy — Resident Evil 4

| Card or family | Reproducible calculation | Printed Power | Record |
| --- | --- | --- | --- |
| Strike | 1 Energy = 10 FBP; no pure bonus because of Bleed; M | 8-12 | **Exact.** Utility formula. |
| Defend | 1 Energy = 10 FBP; no pure bonus because of Reload and Evade; M | 8-12 | **Exact.** Utility Defense formula. |
| Shoot: Handgun | 1 Energy = 10 FBP; no pure bonus because of ammo, per-hit Bleed, Multihit, and Distance rule; R | 8-12 | **Exact.** Utility formula. |
| Shoot: Riot Gun | 2 Energy = 20 FBP; no pure bonus because of ammo, Bleed, Close, Follow-Up, and discount; R | 15-25 | **Exact.** Utility formula. |
| Shoot: Chicago Typewriter | Variable CBP `5 + 5X`; no pure bonus because of Multihit and per-hit Bleed; component R | 4-6 + 4-6 times X | **Exact.** Variable component formula. |
| Suplex | 2 Energy = 20 FBP; no pure bonus because of Close, Follow-Up, and conditional Stun; M | 16-24 | **Exact.** Follow-Up-only Stun remains text-only until per-effect window conditions are supported. |
| Shoot: Rocket Launcher | Repeat cycle: 10 Meter acquisition + 30 Meter activation = 40 Meter; `40 x1.5` = 60 FBP; R | 45-75 | **Exception.** Recurring consumable cycle. Free starting launcher changes only the first use. |

## Rover — Spectro

| Card or family | Reproducible calculation | Printed Power | Record |
| --- | --- | --- | --- |
| Strike | 1 Energy = 10 FBP; no pure bonus because of Diminutive Sound and Meter gain; M | 8-12 | **Exact.** Utility formula. |
| Defend | 1 Energy = 10 FBP; no pure bonus because of Meter gain and Evade; M | 8-12 | **Exact.** Utility Defense formula. |
| Resonating Slashes | 2 Energy = 20 FBP; no pure bonus because of Diminutive Sound spend and Spectro Frazzle; M | 16-24 | **Exact.** Multihit only divides total Power. |
| Aftertune | 1 Energy = 10 FBP; no pure bonus because of Diminutive Sound gain; M | 8-12 | **Exact.** Utility formula. |
| Echoing Orchestra | 20 Meter `x1.5` = 30 CBP; damage plus `Power / 2` healing target gives `30 / 1.5 = 20` FBP; R | 15-25 | **Reconstructed.** AoE and Spectro Frazzle are included in the same `-10` total-output adjustment. |

## Saitama — Base

| Card or family | Reproducible calculation | Printed Power | Record |
| --- | --- | --- | --- |
| Strike | 1 Energy = 10 FBP; no pure bonus because of State gain; M | 8-12 | **Exact.** Progression utility formula. |
| Defend | 1 Energy = 10 FBP; no pure bonus because of State gain and Evade; M | 8-12 | **Exact.** Progression utility Defense formula. |
| Normal Punch family | 2 Energy = 20 FBP; no pure bonus because of State gain; M | 16-24 | **Exact.** Progression family. |
| Serious Punch | 3 Energy = 30 FBP; M | 24-36 | **Exception.** State: Serious threshold pays for Fast speed, AoE, and enhanced access. |
| Serious Headbutt | 3 Energy = 30 FBP; M | 24-36 | **Exception.** State: Serious threshold pays for Fast speed and Stun. |
| Consecutive Normal Punch | Variable CBP `5 + 5X`; no pure bonus because of State gain; component M | 4-6 + 4-6 times X | **Exact.** Variable component formula. |
| Serious Consecutive Side Hops | 3 Energy = 30 FBP; M | 24-36 | **Exception.** State: Serious threshold pays for Fast, AoE, mixed damage/Shield, State gain, and Evade. |
| Serious Table Flip | 100 Meter `x1.5` = 150 FBP; M | 120-180 | **Exception.** Capstone receives no automatic Ultimate speed modifier and no additional deduction for AoE or Stun. |

## Light Yagami — Kira

| Card or family | Reproducible calculation | Printed Power | Record |
| --- | --- | --- | --- |
| Strike | 1 Energy = 10 FBP; no pure bonus because of Stolen Information and conditional Slow; R | 8-12 | **Exact.** Utility formula. |
| Defend | 1 Energy = 10 FBP; Evade removes pure bonus; R | 8-12 | **Exact.** Evade formula. |

Death Note cards use non-Power resource conversion and are outside the printed Power formula.

## DIO — Part 3

| Card or family | Reproducible calculation | Printed Power | Record |
| --- | --- | --- | --- |
| Strike / Muda Barrage | Printed 4 Energy; reconstructed expected Blood Focus reduction 2; expected cost 2 = 20; pure `x1.20` = 24 FBP; M | 20-28 | **Reconstructed.** Stunned-target Stolen Blood is treated as a budget-neutral identity rider. Time Stop form shares parent Power. |
| Defend / The World | Printed 4 Energy; expected reduction 2; expected cost 2 = 20 FBP; Evade removes pure bonus; M | 16-24 | **Reconstructed.** Time Stop form shares parent Power because setup pays for Fast, Follow-Up, Retain, and Haste. |
| Vampiric Drain | Printed 5 Energy; expected reduction 2; expected cost 3 = 30 FBP; M | 24-36 | **Reconstructed.** Healing, Stolen Blood, Weak, and conditional gain replace pure-output eligibility. |
| Throwing Knives family | Printed 7 Energy; expected reduction 2; expected cost 5 = 50 ABP; utility adjustment `-8` = 42 FBP; R | 32-52 | **Reconstructed.** Reduction pays for repeated Bleed and Multihit interactions. Time Stop form shares parent Power. |
| ROAD ROLLER DA! | 40 Meter `x1.5` = 60; partial consumed Time Stop allocation `+30` = 90 FBP; M | 72-108 | **Exception.** Final calculation includes Fast delivery, Splash, Stun, and setup burden. Optional Stolen Blood output is separate. |

## Audit rules

- A changed card must update this ledger when its calculation pattern changes.
- A new character must add each Power-bearing family before merge.
- A range that does not match the printed Melee/Ranged type is an arithmetic defect unless explicitly documented.
- A structured effect that is broader than the readable condition is a data defect; remove it until the schema can represent the condition safely.
- Run the calculator for fixed or variable arithmetic, then validate Markdown/YAML synchronization.
