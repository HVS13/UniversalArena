# Rules v2 Decision Record

> **Status:** Approved gameplay specification, pending implementation and migration.  
> **Purpose:** Consolidates accepted Rules v2 decisions. This document distinguishes intended Rules v2 behavior from currently implemented Rules v1 behavior.  
> **Priority:** [Design Principles](design-principles.md) govern interpretation. Structured Rules v2 data will become executable authority after migration.

## 1. Core match structure retained

Rules v2 retains the following foundations unless a specific decision below changes them:

- 3v3 teams.
- Exactly five regular cards per character: two Basics and three Techniques.
- One shared team Draw Pile, Discard Pile, hand, Energy pool, and Ultimate Meter pool.
- Per-character HP, statuses, resources, ownership, and defeat state.
- Default max HP 100 unless explicitly overridden.
- Turn Start draw toward five cards, then set shared Energy to five unless modified.
- Combat zones resolve from Fast to Normal to Slow through interruption, and right to left within an active zone.
- Explicit card and character text overrides core rules.

## 2. Card ownership

Every card has an owner.

### Starting cards

A character owns its five regular cards and its Ultimate pathways.

Normally only the owner may play its cards. An effect may explicitly borrow, copy, steal, control, or permit another character to play a card.

A shared hand is access, not ownership.

### Created cards

Created cards default to source-character ownership unless their creation effect specifies:

- Another character.
- Team ownership.
- Scenario ownership.
- No owner.

Created cards use the owner's resources and are removed when that owner is defeated unless their rules say otherwise.

### Creation and play

Creating a card is not playing it.

- Creation does not generate Ultimate Meter.
- A created card enters the destination stated by its effect.
- If no destination is stated, it enters the Discard Pile.
- "Create and play without paying" bypasses the Energy cost and generates no Meter unless explicitly stated.
- "Play from the Discard Pile, paying normally" is a normal play and generates Meter equal to Energy actually paid.

A Created card cannot create another copy of itself through the same unresolved effect chain unless explicitly allowed.

## 3. Hand, draw, and access economy

### Draw toward five

Five is the Turn Start draw target, not a hand maximum.

- If the hand has fewer than five cards, draw until it has five, subject to modifiers.
- If the hand has five or more, draw zero by default.
- The hand may exceed five through draws, searches, creations, Retain, or other effects.

### Innate opening hand

1. Put all Innate regular cards into the opening hand.
2. Draw until the team has at least five cards.
3. Normally allow at most one Innate regular card per character.
4. If more than five Innate cards exist, all begin in hand and no additional opening draw occurs.

### Retain

Retained cards remain in hand at Turn End and therefore reduce the number drawn toward five next Turn Start.

Retain is a consistency tool with a real hand-pressure cost.

### Search hierarchy

By default:

- Scry changes future draw quality but guarantees no card in hand.
- Seek inspects a limited portion and may take qualifying cards.
- Search guarantees a qualifying card from the full Draw Pile when one exists.

Conditional cards should have a clear access, disposal, replacement, or baseline-use solution. Dead draws may be intentional but must be justified.

Normally, each character should contribute at least three broadly usable starting-state cards unless its kit deliberately solves restricted access through Innate, Retain, Search, Seek, Scry, `Becomes`, Created cards, or another mechanic.

## 4. Energy and Ultimate Meter

### Shared Energy

Energy remains a shared team resource.

At Turn Start, set Energy to five by default. This is a reset, not a gain; unused Energy does not carry unless an effect explicitly changes the rule.

### Meter generation

A team gains Ultimate Meter only from Energy actually paid as a card's play cost.

Count:

- Printed Energy cost actually paid.
- Mandatory play-cost increases.
- Locked X Energy paid as part of the play cost.

Do not count:

- Effect-time Energy spending.
- Movement or Reposition costs.
- HP costs.
- Status, ammunition, discard, or personal-resource costs.
- Ultimate Meter itself.
- Creating a card.
- Playing without paying Energy.

Cost reduction lowers Meter gained. Cost increases raise it. A zero-Energy play generates zero Meter.

This preserves the strategic tradeoff between cheaper play and Meter generation.

## 5. Basics and Techniques

Each character retains exactly two Basics and three Techniques.

Rules v2 removes the requirement that Basics must be one Strike and one Defend, and removes mandatory generic naming.

Default recommendation:

- One proactive foundational Basic.
- One reactive, defensive, maintenance, or survival-oriented Basic.

This is not mandatory. A character may survive through Attack clashes, Evade, Counter, movement, Cover, regeneration, denial, transformation, or another source-accurate method.

Use canonical card names where possible. Stable slot IDs preserve data structure independently of names.

Basics establish the reliable floor. Techniques create the engine, signature decisions, progression, flexibility, or payoff.

## 6. Roles, Archetypes, and Capability Tags

Roles remain non-mechanical metadata.

### Core Roles

Every character has exactly one Primary Core Role and at most one Secondary Core Role:

- Vanguard.
- Guardian.
- Striker.
- Eliminator.
- Controller.
- Support.
- Specialist.

`Guardian` replaces the old Core Role name `Defender` to avoid confusion with Defense cards.

`Eliminator` replaces `Assassin` as a Core Role. Assassin remains a Combat Archetype.

### Combat Archetypes

A character has zero to two:

- Bruiser.
- Duelist.
- Skirmisher.
- Juggernaut.
- Assassin.
- Marksman.
- Artillery.
- Summoner.
- Tactician.
- Shapeshifter.

### Capability Tags

Capability Tags describe specific mechanics and functions. They grant no rules.

Assign roles after the kit is designed. Primary Role reflects ordinary match contribution, not one Ultimate.

No lane, jungle, farm, carry, pusher, Mage, Fighter, or position 1–5 role is imported as a Core Role.

## 7. Team synergy and lineup health

Universal Arena requires no fixed team composition.

Review lineups through:

- Immediate action.
- Survival.
- Interaction.
- Closing power.
- Shared economy.
- Failure recovery.

Prefer synergy through global statuses, Speed, timing, position, area, target conditions, card access, Energy, Meter, protection, and broad mechanical references.

Avoid named-pair or franchise bonuses except in scenarios, dedicated duo/team characters, or source-mandated partnerships.

Each character records:

- Synergy inputs.
- Synergy outputs.
- Conflicts.
- Energy demand.
- Meter demand.
- Hand pressure.
- Setup speed.

High-demand characters are allowed. They should normally retain a useful low-investment floor and justify the shared opportunity cost.

## 8. Board and positions

### Fixed columns

Each team has three fixed columns.

A defeated or removed character leaves an empty column. The line does not compress.

### Adjacency

Adjacency means immediately neighboring occupied positions on the same team line.

An empty column breaks adjacency. Characters with one empty position between them are Distance 2 and are not adjacent.

### Reposition

Replace the generic free Movement Round swap concept with `Reposition` terminology.

On a team's Movement priority, it may:

- Use its one free Reposition for the turn.
- Spend 1 Energy for an additional Reposition.
- Pass.

A Reposition may:

- Swap two adjacent allied characters.
- Move an allied character into an adjacent empty position.

Reposition is not a card play and generates no Ultimate Meter.

If a Reposition includes a Rooted character, it fails and its free use or Energy cost remains spent.

### Push and Pull

Push and Pull move along the target's team line.

- Enter an empty position when available.
- Swap through occupied positions when necessary.
- Stop at the edge.
- Fail against Root.

Movement effects are character- and lore-derived. They are not automatically granted to fast or strong characters.

## 9. Targeting and movement after play

### Locking

When a card is played, lock:

- Energy and Meter paid.
- X and other play-time choices.
- User.
- Target.
- Chosen zone.
- Chosen modes unless their timing explicitly occurs later.

### Character targets

A card targeting a character follows that selected character if the character moves.

Movement alone does not cause a miss.

Recalculate Distance and adjacency using current positions when the effect or Power Roll needs them.

### Position targets

A card targeting a position remains locked to that position.

A character may leave that position, causing the effect to miss or affect a new occupant according to the card's rules.

### Target leaves play

If a character target becomes defeated, removed, or illegal before Use:

- Target-facing effects fail.
- The card is still used and reaches its normal destination.
- Unrelated self-effects or card-level effects resolve if their text does not depend on the failed target.

### Restrictions

Play restrictions are checked on play only unless text explicitly requires rechecking at Use.

### Replacement in play

If an in-play card `Becomes` another definition, it keeps the locked target when that target remains legal. If the replacement cannot legally affect the target, target-facing effects fail unless the replacement explicitly retargets.

## 10. Redirect, Cover, and Taunt

### Target-change cap

Ordinarily, only one post-play target change may apply to a card or effect use across Redirect, Cover, and equivalent mechanics.

If several are eligible, the defending player chooses which one applies unless explicit text sets another priority.

Taunt is a play-time target restriction and does not consume the post-play target-change cap.

AoE and random targeting ignore ordinary Redirect and Cover.

### Cover

Cover is a Before Use interception for single-target Attacks.

- Cover targets the protected character.
- If eligible, change the Attack's target to the covering character.
- Recalculate Distance to the covering character before the Attack's Use Roll.
- Splash and Bounce recenter from the covering character.
- AoE is unaffected.
- `Cover (Adjacent)` protects adjacent allies.
- `Cover (All)` protects any ally.

### Attack versus Defense protection

In an Attack-versus-Defense clash:

1. The Defense resolves first and grants Shield to its protected target.
2. The protected target becomes the paired Attack's target if legal.
3. Recalculate the Attack's Distance to that protected target before the Use Roll.
4. If the protected target is illegal for the Attack, the Defense still resolves and the Attack keeps its original target.

This replaces the old interpretation that the Attack always used Distance to its original target.

### Taunt scopes

Taunt must specify a scope:

- `Taunt (Attack)`.
- `Taunt (Special)`.
- `Taunt (All)`.

New designs should normally use `Taunt (Attack)` unless broader attraction is source-supported.

Legacy unscoped Taunt migrates to `Taunt (All)` to preserve behavior.

## 11. Distance

Distance is the absolute column difference between source and current target position.

- Distance 0: same column; enemies are opposed.
- Distance 1: one column apart.
- Distance 2: two columns apart.

Rules v2 uses current positions when the Power Roll or effect resolves.

Close and Far remain modifiers to Distance behavior.

Special cards have no Power by default, so Distance does not modify them unless explicit text says otherwise.

## 12. Timing and card lifecycle

### Timing ladder

Rules v2 uses:

1. On Play.
2. Before Clash.
3. Clash.
4. After Clash.
5. Before Use.
6. On Use.
7. On Hit.
8. After Use.

`Always` is a continuous effect, not a final timing event.

### Played and Used

A card is Played after paying costs, choosing legal targets and modes, and entering a legal zone.

A card is Used when its effects apply.

An Attack that is Used is a Hit unless a rule such as Evade prevents it.

### Cancelled and Negated

Cancelled skips Before Use, On Use, On Hit, and After Use. Continuous `Always` effects still apply.

Negated skips all card effects, including continuous effects from that card while Negated.

### `Becomes` reevaluation

Reevaluate automatic replacements between timing steps, not midway through one effect block.

Replacement does not retroactively change:

- Paid cost.
- Meter gained.
- Locked X.
- User.
- Target.
- Zone legality already satisfied.

Current unresolved name, classifications, Power, and effects use the current card definition.

### Pair order

When a clash category uses both cards and no special order is stated, schedule the right card first, then the left card.

Attack versus Defense remains a special case: Defense first, then Attack.

Defense versus Defense and Any versus Special schedule right card first, then left card.

Scheduling both cards does not guarantee both will complete. If the second card is removed, Cancelled, or Negated before its Use, it does not resolve.

### Follow-Up, Assist Attack, and Counter

Use one ordinary immediate response window after a card is Used.

- Follow-Up requires the triggering card to belong to the same character.
- Assist Attack requires a different allied character.
- Counter replaces the Follow-Up/Assist window created by that clash.
- The response card must be legal for the same zone based on Speed.
- Pay costs and choose targets normally.
- It resolves immediately without entering the zone stack or clashing with the next card.

Cancelled and Negated cards are not Used and open no window.

## 13. Exhaust, Ethereal, Retain, and destinations

### Exhaust

Rules v2 changes Exhaust into a destination replacement after resolution.

A card with Exhaust:

- Is played and resolves normally.
- After its current use completes, enters the Exhausted area instead of the Discard Pile.

A separate explicit effect is required for removal immediately On Play.

### Ethereal

If an Ethereal card remains in hand at Turn End, Exhaust it.

### Retain

If a Retain card remains in hand at Turn End, keep it instead of discarding it.

### Ultimate destination

An Ultimate returns to its Ultimate area after resolution by default.

Pathway lifecycle may instead make it:

- Once per game.
- Resource-gated.
- Replaced after use.
- Temporarily locked.
- Exhausted or otherwise removed.

## 14. Ultimates and pathways

Every character has at least one Ultimate pathway.

A pathway is one separately available Ultimate option and all automatic state-dependent variants.

Examples:

- Luffy's Gear-dependent Jet Gatling and Gigant Rifle are variants of one pathway.
- Leon's Rocket Launcher purchase and firing states are one pathway.
- Saitama's separately available options may be several pathways and require individual review.

No universal cap or one-Ultimate-per-turn rule is imposed.

Multiple pathways must represent distinct choices, and no pathway should be strictly dominant whenever both are available without a documented lore reason.

Ultimate cost and readiness are checked on play. Later replacement does not retroactively alter paid cost.

A failed, Cancelled, or Negated Ultimate receives no automatic refund.

The Energy portion of a mixed cost generates Meter according to normal play-cost rules; the Meter portion does not.

Transformations do not inherently:

- Heal.
- Clear statuses.
- Restore resources.
- Reposition.
- Recover cards.

Those effects require explicit text.

## 15. Status architecture

Rules v2 retains one unified status system.

### Status purposes

Statuses may represent:

- Binary state.
- Resource.
- Progress.
- Duration.
- Escalating condition.
- Equipment.
- Transformation.
- Countdown.

### Modes

- Zero-value: binary state.
- Stack: simple layers, charges, or duration.
- Value: resource, progress, ammunition, or countdown.
- Potency + Count: strength and persistence tracked separately.

Potency is strength per application or trigger.

Count is persistence or remaining activations according to the status's own rules; it does not universally mean turns.

### Applying Potency + Count

If the target has none:

- Set Potency to X.
- Set Count to 1.

If the target already has it:

- Increase Potency by X.
- Do not increase Count unless explicit text does so.

### Consumption order

At one timing point:

1. Resolve explicit `then` order inside each effect.
2. Apply reductions and consumption.
3. Apply gains and inflictions.
4. Resolve zero/expiry consequences.
5. Remove zeroed statuses.
6. Reevaluate continuous effects and `Becomes`.

Defeat caused by an atomic damage or HP-loss event still occurs at the immediate defeat window described below; unrelated status cleanup does not delay it.

### Unique statuses

Unique statuses are immune to generic Cleanse, Dispel, and Purge by default.

Personal resources are not transferable unless explicit text permits it.

Statuses placed on another character survive their source's defeat unless they are explicitly linked or source-dependent.

### Thresholds

`Crosses to X+` means moving from below X to at least X.

`While at X+` is a continuous condition.

Repeated threshold triggers require leaving and crossing again, and must be permitted by their usage scope.

### Caps

99 is the default technical cap. Use lower meaningful caps where possible. Use 999 only when effectively uncapped behavior is intentional.

## 16. Stun and card-play denial

### Stun

Rules v2 clarifies Stun for team-based turns:

> At the affected team's next Turn Start, this character becomes Stunned for that turn. A Stunned character cannot play its cards or move. Its already-played cards still resolve. Mandatory Innates and status effects continue unless stated otherwise. Remove Stun at Turn End.

Consequences:

- Other allied characters may still play their own cards.
- The Stunned character's cards remain in hand and deck.
- The Stunned character may still be targeted.
- The Stunned character cannot participate in Reposition.
- If every surviving character is Stunned, the team cannot play owned character cards that turn.

Stun remains Max Stack 1 by default.

### Cannot play cards

A team or player under `Cannot Play Cards` cannot add cards to any zone.

It may still:

- Pass priority.
- Resolve already-played cards.
- Resolve statuses and mandatory triggers.
- Reposition unless the effect also prevents movement.

Full-team denial is reserved for exceptional, expensive, prepared, brief, or strongly source-supported effects.

DIO's Time Stop may intentionally combine current-round team denial with next-turn Stun on all enemies. This is an explicit lore decision, not an accidental overlap.

## 17. Counterplay standards

Counterplay is meaningful decision-making, not equal power.

Major effects should document an interaction profile using relevant channels:

- Visible setup.
- Energy or Meter commitment.
- Personal resource.
- Interruptible preparation.
- Narrow target.
- Position.
- Source vulnerability.
- Duration.
- Fuel.
- Aftermath.
- Once-per-game lifecycle.
- Canonical counter.

Decisive effects should normally reveal progress before completion.

Do not add universal:

- Control diminishing returns.
- Tenacity.
- Status immunity.
- Counterspells.
- One-shot prevention.

Use explicit, scoped, lore-supported rules.

## 18. Damage Types, Properties, and hax

### Damage Types

Rules v2 broad Damage Types:

- Physical.
- Energy.
- Magical.
- Mental.
- Spiritual.

### Properties

Electric moves from Damage Type to optional Property.

Properties may include Electric, Fire, Ice, Sonic, Explosive, Radiation, Haki, Ki, Chakra, Reiatsu, technology categories, and future identifiers.

Properties have no inherent rules.

Add a Property only when it matters to canonical classification, resistance, weakness, status interaction, or another mechanic.

### Attack Tags

Slash, Pierce, Blunt, and Multihit remain Attack Tags.

They have no inherent bypass behavior.

### Minimal equalization

Characters can perceive, target, clash with, and affect one another enough for the game to function.

Power systems do not automatically become identical.

### Hax

Hax may use statuses, restrictions, defeat clauses, target rules, replacement, lifecycle, or explicit effects rather than ordinary damage.

Raw Power does not grant automatic hax resistance.

### Defensive concepts

Keep separate:

- Resist.
- Weakness.
- Absorb.
- Damage Immunity.
- Status Immunity.
- Effect Immunity.
- Targeting restrictions.

Damage Immunity makes matching damage zero but does not inherently prevent Hit, statuses, movement, or other effects.

### Direct HP loss

`Lose HP` is not damage and bypasses Shield, Barrier, Resist, and Damage Immunity.

Use it only for effects that genuinely bypass ordinary damage, such as self-payment, life-force consumption, or explicit curses.

It does not trigger On Damage or On HP Damage unless text explicitly says otherwise.

## 19. Power Rolls and mathematical terms

Distinguish:

- Printed Power.
- Raw Power Roll.
- Adjusted Power.
- Clash Total.
- Damage instance.

A Power Roll is a uniform integer between current minimum and maximum inclusive.

### Clash and Use Rolls

Clash Rolls are separate from Use Rolls.

A winning card makes fresh Use Rolls when it resolves.

Reuse makes fresh rolls and reevaluates current modifiers, target state, Distance, and remaining Multihit Count.

### Shared roll per hit

Default:

- Roll once per hit.
- Share that hit's roll across every target affected by the hit.
- Resolve each target's mitigation and triggers independently.

A card may explicitly roll separately per target.

### Several Power outputs

Within one non-Multihit use, effects referencing that use's Power share the same roll unless text says to roll again.

## 20. Multihit

### Clash

For each remaining hit:

1. Roll Power independently.
2. Apply clash-relevant adjustments.
3. Sum the rolls into one Clash Total.

Clash rolls are not Hits and trigger no damage effects.

### Losing an Attack clash

When a Multihit Attack loses:

1. Reduce remaining Multihit Count by 1.
2. Do not Use it.
3. Deal no damage.
4. Reuse it in the current zone.

### Tie

A tied Attack clash Cancels both cards under the general tie rule.

Multihit does not lose Count and Reuse from a tie unless explicit text says otherwise.

### Zero Count

At zero remaining Multihit Count, treat the card as an ordinary one-hit Attack for the remainder of that zone resolution.

It no longer uses Multihit's loss-and-Reuse rule.

### Use

Each hit:

1. Makes its own Use Roll.
2. Applies the full damage pipeline.
3. Resolves hit-specific triggers.
4. Checks defeat.
5. Continues against legal surviving targets.

A printed divisor such as `Power / 5` remains 5 after Count loss unless the card explicitly references remaining Count.

Flat Resist applies separately to each damage instance.

## 21. Hit and effect scopes

A hit instance is one hit against one target.

- AoE against three targets creates three hit instances.
- Multihit 3 against one target creates three.
- Multihit 3 against three targets may create nine.

Default scopes:

- On Play: once per card play.
- Target-facing On Use: once per affected target.
- On Hit: once per hit instance.
- On Damage: once per positive damage instance.
- On HP Damage: once when one damage instance reduces HP.
- After Use: once after the complete card use.
- Once per use: once across all targets and hits.
- Self-costs and resource gains: once unless stated otherwise.

Use explicit scopes such as `once per target per use`, `for each enemy hit`, or `the first time each hit` when needed.

### Bonus damage

`This hit deals +X damage` adds to the same damage instance before mitigation.

`Deal X bonus damage` creates a separate damage instance after the trigger.

Separate bonus damage is not a new Hit by default, but may trigger On Damage and On HP Damage.

## 22. AoE, Splash, Bounce, and random targeting

### AoE

AoE affects every legal character in its stated area.

- It is not redirected by ordinary Redirect or Cover.
- It uses one roll per hit by default.
- Each target resolves mitigation independently.
- A paired Defense may protect its own target but does not redirect the entire AoE.

### Splash

Splash affects the final primary target and every occupied adjacent position on that target's team line.

- Edge center normally affects two characters.
- Middle center normally affects three.
- Empty positions contribute no target and break adjacency.
- Redirect and Cover recenter Splash.

Procedure:

1. Apply target changes.
2. Lock the final primary position.
3. Snapshot the primary and occupied adjacent targets.
4. Roll the current hit.
5. Apply the hit as one simultaneous target batch.
6. Resolve triggers in deterministic order.

Defeating the primary target does not remove already-snapshotted Splash targets.

### Bounce X

After the primary target-facing effect, apply it X times to a randomly selected eligible character adjacent to the primary target's locked position.

- X is the number of secondary applications.
- Each selection is independent.
- Selection uses replacement by default.
- The same target may be selected repeatedly.
- Recalculate eligible occupants before each application.
- If none are eligible, that application fails.
- The locked anchor remains if the primary target is defeated.
- Redirect and Cover recenter the anchor.

Legacy bare Bounce migrates to Bounce 1.

Bounce is not a chain from the most recently hit target. A future Chain mechanic must be separate.

### Simultaneous target batches

For one AoE or Splash hit:

1. Snapshot targets.
2. Generate the shared roll.
3. Calculate each target's result from the state at the beginning of the batch.
4. Apply damage to all targets.
5. Queue resulting triggers.
6. Resolve defeat.
7. Continue to the next hit.

Deterministic trigger order:

1. Primary target, if any.
2. Other targets left to right.
3. If both team lines are affected, active player's line first, then opposing line.
4. Controllers order their own simultaneous optional triggers.
5. Mandatory triggers precede optional triggers unless explicit text overrides.

### Randomness

Random selection is uniform among currently eligible objects unless weighted text says otherwise.

Repeated selections use replacement by default.

No eligible result means that random portion fails; do not reroll an illegal pool unless instructed.

Digital implementations record eligible pools, results, order, and replayable random state.

## 23. Damage resolution

Rules v2 retains the general pipeline:

1. Roll Power and apply Power modifiers.
2. Apply matching Damage Immunity.
3. Apply percentage damage modifiers.
4. Apply Shield.
5. Apply Barrier.
6. Apply flat or percentage HP-stage Resist, Weakness, and Absorb according to their definitions.
7. Deal remaining damage to HP.

Each hit and target resolves separately.

One modifier listing multiple matching criteria applies once when any match. Separate modifiers stack unless an explicit opposed-pair rule combines them.

## 24. Rounding, grouping, and clamping

Whenever a required game value becomes fractional, round down.

Calculation order:

1. Resolve parentheses and locked variables.
2. Apply multiplication and division.
3. Floor when that operation produces a required game value.
4. Apply percentage-stage modifiers.
5. Floor.
6. Apply flat modifiers.
7. Clamp to the applicable minimum and maximum.

Do not carry hidden fractions between separately named stages.

Opposed standardized pairs combine before calculation when their rules say so, including:

- Strength and Weak.
- Dexterity and Frail.
- Haste and Slow.
- Fortified and Vulnerable, if retained as an opposed pair.

Default clamps:

- Power, damage, Shield, Barrier, healing, costs, and Hit Count cannot be negative.
- HP cannot exceed max HP.
- Current HP normally cannot be below 0.
- Status values follow their registered caps and floors.

## 25. Defeat

### Immediate defeat window

When a character reaches 0 HP:

1. Resolve applicable `When This Character Would Be Defeated` replacement effects.
2. If none prevent defeat, finish the currently resolving atomic effect or card use.
3. Defeat the character immediately.
4. Remove its other unresolved cards before they Use.
5. Make it untargetable and unable to act.
6. Check victory after the complete current resolving effect or card use.

A currently resolving card finishes its current use. A paired or queued card that has not begun Use does not survive its owner's defeat.

### Defeat Reserve

Move recoverable owned cards into a public Defeat Reserve.

On defeat:

- Move regular starting cards from hand, Draw Pile, Discard Pile, Retained areas, revealed groups, and unresolved zones into the owner's Defeat Reserve.
- Mark Ultimate pathways unavailable in the Defeat Reserve.
- Created cards follow their own lifecycle and are not recoverable by default.
- Exhausted cards remain Exhausted.
- The currently resolving card enters the Defeat Reserve after resolution unless another destination replaces it.

No replacement draw occurs immediately. The next Turn Start draws toward five using the contracted deck.

If defeat occurs during Turn Start before draw-to-five completes, remove the defeated owner's cards, then continue drawing.

### Statuses on defeat

Default:

- Remove Shield.
- Remove Barrier.
- Remove Positive, Negative, and Unique statuses on the defeated character unless they explicitly persist.
- Cancel delayed triggers attached specifically to that character unless they explicitly persist.
- Effects and statuses already placed on other characters remain unless explicitly linked to the source.

## 26. Defeat prevention

Use the timing `When This Character Would Be Defeated`.

A prevention replacement means the character was never defeated:

- Cards are not removed.
- Position remains occupied.
- Defeat triggers do not occur.
- Statuses remain unless the replacement changes them.

When several replacements apply:

1. Mandatory replacements resolve first.
2. The controller chooses one optional replacement.
3. Reevaluate HP and defeat state.
4. Repeat only for another distinct legal replacement.

One prevention effect normally applies at most once to the same defeat event.

## 27. Healing and HP changes

### Healing

Healing affects only characters currently in play. It cannot return a defeated character.

Any positive current-HP change counts as healing unless explicit text says otherwise, including `restore HP` or setting HP to a higher value.

Healing:

1. Determine base amount.
2. Apply healing modifiers.
3. Apply Wither percentage reduction.
4. Apply Wound flat reduction.
5. Clamp to at least zero.
6. Restore HP up to max HP.
7. Calculate excess healing if referenced.
8. Resolve On Heal and On HP Restored distinctions if implemented.

Default:

- Excess healing is lost.
- On Heal may trigger when the healing effect resolves.
- On HP Restored triggers only for actual HP increase.

### Max HP

Increasing max HP does not automatically increase current HP.

Decreasing max HP clamps current HP to the new maximum. This is not damage or healing and can reach 0 only when explicit text allows max HP to reach 0; default max HP floor is 1.

When temporary max HP expires, recalculate and clamp; do not restore missing HP.

### HP loss and payment

`Lose HP` bypasses damage defenses and can defeat unless stated otherwise.

`Pay HP` is a cost. By default, the full amount must be available and payment cannot reduce the character below 1 HP unless lethal payment is explicitly allowed.

## 28. Resurrection

A Resurrection effect must specify returned HP.

Resurrection HP is not ordinary healing by default:

- Wound and Wither do not reduce it.
- On Heal does not trigger.
- Resurrection-specific modifiers may alter it.

Default Resurrection procedure:

1. Choose a defeated character.
2. Choose an empty allied position.
3. Return the character to that position.
4. Set HP to the amount specified.
5. Move its five starting regular cards from Defeat Reserve to the Discard Pile.
6. Restore its Ultimate pathways to the Ultimate area.
7. Do not restore Created cards.
8. Do not restore Exhausted cards.
9. Return with no Shield, Barrier, Positive, Negative, or Unique statuses unless stated.
10. Do not restore personal resources, forms, ammunition, or equipment state unless stated.
11. Do not repeat Start of Match effects.
12. Apply effects explicitly triggered by Resurrection or entering play.

Once-per-game usage, irreversible choices, destroyed equipment, exhausted cards, and other match records remain spent through defeat and Resurrection.

Explicit effects may prevent or restrict Resurrection. Future defeated states such as Sealed, Banished, or Erased must be registered and clearly defined rather than assumed.

## 29. Sacrifice

`Sacrifice` voluntarily defeats a character as a cost or effect.

Sacrifice:

- Is not damage.
- Is not HP loss.
- Ignores Shield, Barrier, Resist, and Damage Immunity.
- Triggers When Sacrificed and When Defeated.
- Does not trigger On Damage or On HP Damage.
- Moves owned cards to Defeat Reserve normally.

When written before a colon, Sacrifice is a cost and must successfully occur for the following effect to resolve.

A generic defeat-prevention effect does not satisfy a Sacrifice cost while keeping the character alive unless it explicitly replaces Sacrifice.

## 30. Victory timing

Check victory after the complete current resolving card use or effect finishes.

Do not end the match midway through one effect that defeats all characters and then resurrects or replaces one later in the same effect.

After the effect completes, evaluate surviving characters and scenario conditions.

## 31. Extensibility requirement

All Rules v2 systems must be registry-based or versioned primitives.

Additive registries include:

- Damage Types.
- Properties.
- Attack Tags.
- Effect Tags.
- Roles.
- Archetypes.
- Capability Tags.
- Timings and events.
- Status modes and persistence.
- Target kinds.
- Area kinds.
- Roll modes.
- Lifecycle destinations.
- Defeat states.
- Resurrection modes.
- Conditions and effect primitives.

Keep `schemaVersion` and `rulesVersion` separate.

Do not silently reinterpret legacy content. Use ordered migrations, aliases, deprecation warnings, structured-data updates, and roster regression tests.