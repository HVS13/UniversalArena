# Rules v2 Global Reference

> **Status:** Approved Rules v2 global reference.  
> **Implementation state:** Parallel migration data; the active Rules v1 roster and exporter remain unchanged until later PRs consume it.  
> **Structured authority for this page:** `docs/data/registries.yml` and `docs/data/rules-v2/global-rules.yml`.

This page turns the approved Rules v2 decisions into one operational reference for global classifications and shared mechanics. It does not claim that current Rules v1 character files already use these meanings.

## Classification model

Rules v2 replaces the overloaded flat Type list with separate axes.

### Action Types

A card may have one structural Action Type and one functional Action Type:

- Basic, Technique, or Ultimate.
- Attack, Defense, or Special.

Created is provenance, not an Action Type.

### Damage Types

The broad Damage Types are:

- Physical.
- Energy.
- Magical.
- Mental.
- Spiritual.

Damage Type describes the broad kind of harm. It does not determine magnitude, status effects, or hax resistance.

### Properties

Properties describe elements, substances, or phenomena such as Electric, Fire, Ice, Sonic, Explosive, Radiation, and Acid.

Properties have no inherent universal rule. Electric is a Property, not a Damage Type.

### Source-System Tags

Source-System Tags identify fictional power frameworks such as Ki, Chakra, Reiatsu, Haki, Stand, Nen, Cursed Energy, or Technology.

A Source-System Tag does not make two settings equivalent. An effect must explicitly reference a tag to interact with it.

### Attack Tags

Slash, Pierce, Blunt, and Multihit describe attack delivery. Slash and Pierce do not inherently bypass Shield, Barrier, Resist, immunity, or other protection.

## Core Roles and archetypes

Every character has exactly one Primary Core Role and may have one different Secondary Core Role:

- Vanguard.
- Guardian.
- Striker.
- Eliminator.
- Controller.
- Support.
- Specialist.

A character normally has zero to two Combat Archetypes. Capability Tags describe demonstrated functions rather than granting rules.

Lineup Archetypes describe a team's plan and never impose composition legality.

## Shared economy and ownership

The team shares its Draw Pile, Discard Pile, hand, Energy, and Ultimate Meter. Cards still have owners.

- Shared hand means shared access, not shared ownership.
- Only the owner normally plays a card.
- Created cards inherit the source character's ownership unless stated otherwise.
- Energy is set to 5 at Turn Start; unspent Energy does not carry by default.
- Draw until the team has at least five cards. Five is not a hand limit.
- Ultimate Meter is gained only from Energy actually paid as a card's play cost after modifiers.
- Effect-time Energy spending, HP, statuses, ammunition, discards, and Meter costs do not generate Meter.

## Reposition and fixed columns

Each team has three fixed columns. Defeat leaves an empty column; positions never compress.

Empty positions break adjacency. Characters separated by an empty position are not adjacent.

Before Combat, each team receives one free **Reposition**. Additional Repositions cost 1 Energy and generate no Ultimate Meter. A Reposition may:

- Swap adjacent allies.
- Move an ally into an adjacent empty position.

Push and Pull enter empty positions, swap through occupied positions, stop at the edge, and fail against Root.

## Target locking

Choose and lock a legal target when the card is played.

- A character-locked card follows that character through movement.
- A position-locked card remains at its selected position and may miss or affect a new occupant.
- Distance and adjacency use current positions when the resolving effect requires them.
- Play restrictions are normally checked only on play.
- If a character target becomes illegal before Use, target-facing effects fail; the card is still Used and unrelated effects resolve.
- `Becomes` preserves the locked target and other play choices.

A card or effect normally allows only one post-play target change across Cover, Redirect, or equivalent effects. Taunt restricts initial selection and does not consume this change.

## Attack versus Defense

The Defense resolves first.

The Defense target is the protected character. If legal, the protected character becomes the paired Attack's target. Recalculate the Attack's Distance to that character before its Power Roll.

If the protected character is not a legal Attack target, the Defense still resolves and the Attack retains its original target.

When pair order is otherwise unspecified, resolve the right card first. A second scheduled card can fail to Use if its owner is defeated or it is otherwise removed before its turn.

## Timing and `Becomes`

The ordinary ladder is:

1. On Play.
2. Before Clash.
3. Clash.
4. After Clash.
5. Before Use.
6. On Use.
7. On Hit.
8. After Use.

`Always` is continuous rather than a final timing event.

On play, lock paid costs, Meter generated, X, user, target, and zone. `Becomes` reevaluates between timing steps, never in the middle of one effect block. The current unresolved definition supplies the name, classifications, Power, and effects.

## Clash Rolls and Use Rolls

Clash Rolls and Use Rolls are separate.

A winning card makes fresh Use Rolls. Reuse also makes fresh rolls and reevaluates current modifiers, target state, Distance, and remaining Multihit Count.

A Power Roll is a uniform integer between the current minimum and maximum, inclusive.

## Multihit

For an Attack-versus-Attack clash, roll once for every remaining hit and sum those rolls into one Clash Total.

When a Multihit Attack loses:

1. Reduce remaining Multihit Count by 1.
2. Deal no damage.
3. Do not Use the card.
4. Reuse it in the current zone.

A tie cancels both cards normally without reducing Count or Reusing through Multihit.

At zero remaining Count, treat the card as an ordinary one-hit Attack for the rest of that zone resolution.

Each actual hit makes a fresh Use Roll and applies the complete damage pipeline. A fixed printed divisor does not change when Count is reduced unless the card explicitly references remaining Count.

## AoE, Splash, and Bounce

### AoE

AoE affects every legal character in its stated area. Ordinary Cover and Redirect do not redirect the area.

### Splash

Splash affects:

- The final primary target.
- Every occupied adjacent position on the target's team line.

Empty positions are not targets and break adjacency. Redirect and Cover recenter Splash. Snapshot the target batch after target changes and before the roll, then resolve the hit simultaneously across the batch.

### Bounce X

After the primary application, make X secondary applications to randomly selected eligible occupants adjacent to the locked primary position.

- X counts secondary applications.
- Selection is uniform and uses replacement by default.
- The same target may be selected repeatedly.
- Recalculate eligibility before each application.
- If nobody is eligible, that application fails.
- Defeating the primary target does not remove the locked anchor.
- Bounce is not a chain from the most recently affected target.

## Card flow

### Reveal

Reveal does not move a card by itself. Reveal is not Draw, Discard, Play, Use, or removal and generates no Ultimate Meter.

If a revealed card's owner is defeated before selection or relocation, owner-defeat lifecycle applies before the effect continues.

### Created cards

Create is not Play. A created card cannot create another copy of itself through the same unresolved chain unless explicit text permits it.

Created-card patterns include:

- Exhaust for one-use cards.
- Ethereal for temporary cards that disappear unused at Turn End.
- Retain for held prepared cards.
- Ordinary Discard for cards intended to circulate.

## Lifecycle keywords

### Exhaust

Move the card to the Exhausted Area after resolution instead of its ordinary destination. Immediate removal On Play requires explicit text.

### Ethereal

If the card remains unused in hand at Turn End, move it to the Exhausted Area.

### Innate

Put all Innate regular cards into the opening hand, then draw until the hand contains at least five cards. Normally a character has at most one Innate regular card. If more than five Innate cards exist, all begin in hand and no additional opening draw occurs.

### Retain

Keep the card in hand at Turn End. Retained cards count toward the next draw-to-five.

## Follow-Up, Assist, and Counter windows

There is one ordinary immediate-response window after a qualifying use or clash.

Follow-Up, Assist Attack, Counter, and equivalent ordinary responses share that window unless explicit text creates another one. Immediate cards pay costs and choose legal targets normally, do not enter the zone stack, and do not clash with the next card.

Cancelled and Negated cards are not Used and do not open an After Use response window.

## Status framework

All statuses use one of four modes:

- Binary: no numeric magnitude.
- Stack: one integer for layers, charges, or duration.
- Value: a resource, progress value, ammunition amount, or countdown.
- Potency + Count: strength per trigger plus persistence or remaining activations.

For a missing Potency + Count status, applying X gives Potency X and Count 1. Reapplication increases Potency, not Count, unless explicit text says otherwise.

Use one number for one coherent fictional concept. Unique statuses are immune to generic Cleanse, Dispel, and Purge by default. Statuses already placed on other characters survive their source's defeat unless explicitly linked.

Resolve status changes in this order:

1. Resolve the current effect.
2. Apply reductions and consumption.
3. Apply gains and inflictions.
4. Resolve zero and expiry effects.
5. Remove zeroed statuses.
6. Reevaluate continuous rules and `Becomes`.
7. Resolve defeat and card removal.

## Changed global statuses

### Stun

At the affected team's next Turn Start, the Stunned character cannot play its owned cards or move during that team turn.

Other allied characters may act. Cards already played still resolve. Mandatory Innates and status effects continue. Stun expires at Turn End.

Full-team denial must be written explicitly; ordinary Stun is not team-wide.

### Cover

Before Use, Cover may intercept one eligible single-target Attack aimed at an ally and spends 1 Value.

- Cover (Adjacent) protects adjacent allies.
- Cover (All) protects any ally.
- It does not affect AoE.
- It can intercept a Splash or Bounce card's primary target, after which the area recenters.
- It consumes the one post-play target change.
- The defending player chooses among multiple eligible Cover effects.

Cover expires at Turn End.

### Taunt

Taunt restricts initial target selection when the acting player could legally target the Taunting character.

Scopes are:

- Taunt (Attack).
- Taunt (Special).
- Taunt (All).

Legacy unscoped Taunt migrates to Taunt (All). Taunt does not affect AoE, Splash or Bounce expansion, or random targeting and does not consume the post-play target change.

### Root

Root prevents movement, swaps, Push, Pull, and Reposition participation. Costs remain paid when an attempted movement fails.

## Damage and hax

Damage resolves in this order:

1. Roll and modify Power.
2. Apply matching Damage Immunity.
3. Apply percentage damage modifiers.
4. Apply Shield.
5. Apply Barrier.
6. Apply HP-stage Resist, Weakness, and Absorb.
7. Apply remaining damage to HP.

Damage Immunity does not inherently prevent a Hit, statuses, movement, or other effects. `Lose HP` is not damage.

Raw Power, HP, Speed, and durability do not grant automatic resistance to hax. Use explicit Damage Immunity, Status Immunity, Effect Immunity, targeting restrictions, or source-supported card text.

## Defeat and Defeat Reserve

When a character reaches 0 HP:

1. Resolve `When This Character Would Be Defeated` replacements.
2. Finish the current resolving atomic effect or current card use.
3. Defeat the character.
4. Remove its other unresolved cards before they Use.
5. Check victory after the complete current resolving use or effect.

Recoverable starting cards move to the public Defeat Reserve. Created cards are not recoverable by default, and Exhausted cards remain Exhausted. No immediate replacement draw occurs.

## Healing and Resurrection

Healing cannot affect a defeated character. Overhealing is lost unless explicit text uses it.

Increasing max HP does not increase current HP. Decreasing max HP clamps current HP to the new maximum; the default max-HP floor is 1.

A Resurrection must state returned HP. By default:

1. Choose a defeated ally.
2. Choose an empty allied position.
3. Return the character with the stated HP.
4. Move its five starting regular cards from Defeat Reserve to the Discard Pile.
5. Restore Ultimate pathways to the Ultimate Area.
6. Do not restore Created or Exhausted cards.
7. Clear Shield, Barrier, statuses, resources, forms, ammunition, and equipment state unless stated.
8. Do not repeat Start of Match effects.
9. Preserve once-per-game and irreversible match records.

Resurrection HP is not ordinary healing by default.

## Randomness and deterministic resolution

Random selection is uniform among currently eligible objects unless explicit weighting says otherwise. Repeated selection uses replacement by default.

Digital implementations must record eligible pools, selected results, ordering, and replayable random state.

Do not introduce arbitrary randomness solely to weaken a reliable canonical ability.

## Crossover adjudication

Universal Arena assumes characters can perceive, target, clash with, and affect one another enough for play. It does not make fictional resource systems equivalent.

Magnitude is separate from classification. A source-supported immunity or interaction must be explicit. Power-system negation must state its scope rather than silently applying to every supernatural system.

## Transition rule

Until later migration PRs are merged:

- Rules v1 character YAML remains active.
- Rules v1 keyword, status, term, and card-type files remain active for Rules v1 exports.
- This reference and its structured overlay govern only content explicitly declaring `rulesVersion: 2`.
- The exporter must not silently combine Rules v1 data with Rules v2 semantics.
