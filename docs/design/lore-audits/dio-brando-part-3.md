# DIO — Stardust Crusaders Lore and Design Audit

## Decision status

- **Continuity:** Original *JoJo's Bizarre Adventure* manga.
- **Selected version:** Cairo DIO arc-composite, beginning before Joseph Joestar's blood completes synchronization and ending before DIO's defeat.
- **Rules v2 status:** Proposed parallel migration. It does not replace the active Rules v1 character until player-facing review and roster cutover.

## Why the version changed back

The rejected first PR #5 draft selected fully completed High DIO as the starting state. That erased the existing character's central progression: feeding restores DIO, increases his available options, and leads into a longer and more oppressive Time Stop.

The arc-composite boundary preserves both sides of the source portrayal:

- The World is dangerous before feeding.
- Feeding and synchronization still produce visible escalation.
- ROAD ROLLER DA! and the Greatest High endpoint remain reachable inside the same final-battle identity.

## Intent preserved from Rules v1

The defining loop remains:

1. Land Vampiric Drain or exploit a Stunned eligible target.
2. Gain Stolen Blood.
3. Mirror blood into Blood Focus.
4. Use Blood Focus to reduce DIO's high printed Energy costs.
5. Spend blood between Time Stop duration, once-per-game survival, and ROAD ROLLER DA! scaling.
6. Exploit faster stopped-time card definitions.

Blood Focus is a nonliteral but coherent abstraction. It represents restored physiology, improved synchronization with Jonathan's body, confidence, and expanded action capacity. It does not claim that blood is literally Universal Arena Energy.

## Source basis and mechanical translation

| Source identity | Rules v2 translation |
| --- | --- |
| The World is a powerful close-range Stand | DIO retains meaningful Basic Power and normal Attack/Defense clash participation before feeding. |
| DIO restores himself through blood | Eligible feeding heals, gains Stolen Blood, and triggers regeneration. |
| Feeding materially improves DIO's condition | Stolen Blood creates Blood Focus, which reduces DIO-owned card Energy costs. |
| DIO progressively increases stopped time | Time Stop uses one Value with a base duration and optional blood extension. |
| Others cannot act while DIO layers actions | Current-round enemy play denial and Follow-Up preserve the action window. |
| Victims remain unable to answer immediately after the stopped-time sequence | Time Stop retains the approved next-turn Stun stage. |
| DIO layers knives before time resumes | Throwing Knives becomes a faster ten-hit version during Time Stop; committed knives continue even if DIO is defeated afterward. |
| ROAD ROLLER is a stopped-time climax | The Ultimate requires Time Stop, competes for remaining blood, and ends the stopped-time state after use. |
| DIO remains a vampire | Physical resistance, regeneration, and explicit sunlight/Ripple weaknesses remain. |

## Time Stop timing

Time Stop has two intentional control stages:

1. **Current combat round:** enemies cannot play new cards. Cards already played continue to resolve.
2. **Following enemy team turn:** affected enemy characters retain Stun for that turn.

The two stages are not duplicates. The first prevents new commitment inside the stopped-time window. The second represents the opponent losing the immediate response cycle after DIO has layered attacks and repositioned the exchange.

Time Stop uses a single Value rather than dummy Potency + Count. It still grants Strength, Haste, Follow-Up, duration decay, and Strain on expiry because these mechanics form one escalation-and-aftermath engine in the existing character.

## Economy review

The active Rules v1 printed costs only function because Blood Focus exists. Removing Blood Focus while retaining those costs made DIO monopolize or exceed the team's five-Energy budget.

The proposed entry curve is lowered without deleting the ramp:

- Predatory Strike: 2 Energy.
- The World: Intercept: 2 Energy.
- Vampiric Drain: 4 Energy.
- Throwing Knives: 6 Energy.
- Time Stop: 8 Energy.

This gives DIO a credible low-investment floor while preserving a reason to feed. Blood Focus still creates the dramatic shift from expensive setup character to oppressive action-chain character.

## Crossover adjudications

- **Death Note eligibility:** Ineligible. DIO is an undead vampire, not a living human.
- **Vampiric feeding:** Healing and blood gains require an explicit eligible target. Damage may still occur against an ineligible target.
- **Sunlight:** Explicit vulnerability.
- **Ripple:** Explicit vulnerability.
- **Stand interaction:** The Stand tag identifies the source system; it does not silently grant universal perception or resistance.

## Explicit non-changes

The following are deliberately preserved:

- Stolen Blood and Blood Focus as separate but linked Values.
- Blood Focus cost reduction.
- Optional blood extension of Time Stop.
- Strength and Haste on Time Stop activation.
- Follow-Up while Time Stop remains active.
- next-turn Stun after the current-round play-denial window.
- Strain after Time Stop expires.
- Bleed on knife and barrage pressure.
- Optional blood scaling on ROAD ROLLER DA!.

These mechanics form one coherent loop. They are not removed merely because their translation is abstract.

## Required lore corrections

- Feeding benefits now require eligible usable blood.
- Sunlight and Ripple weaknesses are explicit.
- Time Stop uses one coherent Value mode.
- Damage, source-system, ownership, lifecycle, and timing fields are typed.
- The version boundary no longer claims generic blood reproduces Joseph Joestar's exact unique synchronization result.

## Mandatory feel points

- DIO is dangerous before feeding but not fully developed.
- Feeding materially increases his options.
- Time Stop genuinely denies enemy play and creates oppressive sequencing.
- Stopped-time cards change decisions, Speed, and pressure.
- Blood has competing uses rather than one automatic spend.
- ROAD ROLLER DA! feels like the resource-consuming climax.
