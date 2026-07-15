# Character Authoring Framework

> **Status:** Approved design specification for Rules v2.  
> **Read first:** [Design Principles](design-principles.md).  
> **Implementation:** Structured data remains authoritative. This framework describes what authors must decide and document before a character is considered ready.

This framework applies to every new character, version, redesign, and roster audit. It is designed for both human authors and AI agents.

## 1. Required authoring phases

Create or revise a character in this order:

1. Canonical dossier.
2. Character identity and feel goals.
3. Team metadata.
4. Kit architecture.
5. Interaction and economy profile.
6. Structured card and status implementation.
7. Validation and source review.
8. Play-feel audit.

Do not begin by filling card slots with famous moves. Start by deciding what the selected version is and how it should feel to play.

## 2. Canonical dossier

Every character version requires a source boundary.

```yaml
sourceBoundary:
  continuity: ""
  start: ""
  end: ""
  baselineState: ""
  accessibleForms: []
  standardEquipment: []
  exceptionalAbilities: []
  excludedMaterial: []
  knowledgeBoundary: ""
  personalityBoundary: ""
```

### Continuity

Identify the exact continuity, adaptation, route, timeline, or game version.

Do not combine manga, anime, films, games, remakes, composites, and alternate timelines unless the version is explicitly labeled as a composite.

### Source period

Define the beginning and end of the represented period.

The default recommendation is an **arc-composite** version: a coherent period that includes abilities repeatedly or meaningfully available during that arc, without leaking later forms or knowledge backward.

### Baseline state

State how the character begins the match:

- Form.
- Equipment.
- Resources.
- Injuries or condition.
- Summons or companions.
- Knowledge.
- Personality and restraint.

Start from a representative stable baseline. A more powerful form should normally be reached through gameplay when that progression is meaningful to the character.

### Ability eligibility

Classify each considered ability:

- **Baseline:** normally available from the starting state.
- **Unlockable:** reachable through a form, resource, condition, or progression.
- **Exceptional:** canonically possible but rare, costly, borrowed, situational, or one-time.
- **Excluded:** outside the selected boundary or intentionally omitted.

Temporary, borrowed, or exceptional powers must preserve their conditions and rarity.

### Source authority

Use primary canon as authority. Wikis and databases are navigational aids, not final evidence.

For each major mechanic record:

```yaml
sourceBasis:
  classification: baseline | unlockable | exceptional | excluded
  sources:
    - reference: "chapter, episode, scene, mission, page, or official entry"
      note: "what this source establishes"
  interpretation: ""
  uncertainty: ""
  intentionalDeviation: ""
```

Do not present an uncertain interpretation as fact. Record disputes or ambiguity explicitly.

## 3. Character identity

Before creating cards, define the character's experiential thesis.

```yaml
design:
  thesis: "This character wins by..."
  weakness: "This character struggles when..."
  powerExpression: "How canonical superiority or inferiority appears in ordinary play."
  signatureHax: []
  mandatoryFeelPoints: []
  forbiddenFeelOutcomes: []
```

### Winning thesis

Use one sentence. It should describe decisions, not only output.

Good:

> Builds Stolen Blood through feeding, converts it into lower costs and Time Stop duration, then overwhelms the opponent during a controlled action window.

Weak:

> Deals lots of damage and has strong abilities.

### Weakness

Use a real, gameplay-visible weakness supported by the source or the chosen kit route.

Examples:

- Requires visible setup.
- Consumes shared Energy aggressively.
- Has poor card access before transforming.
- Is vulnerable at Far Distance.
- Needs a marked target.
- Suffers a canonical aftermath.
- Has powerful but narrow actions.

Do not invent arbitrary weaknesses solely to normalize a powerful character.

### Power expression

Describe how the version's power level appears before the Ultimate.

A powerful character may have:

- Higher Basic Power.
- Better clashes.
- Broad resistance.
- High-cost but overwhelming ordinary actions.
- Innate defensive rules.
- Strong Speed pathways.

A weak character may have:

- Low direct Power.
- Cheap actions.
- Information, support, deception, equipment, avoidance, or conditional payoff.

Do not grant unsupported duel parity.

### Mandatory feel points

List the non-negotiable experiences the kit must create.

Example for DIO:

- Feeding materially increases his options.
- Time Stop genuinely denies enemy card play.
- The World state creates faster, more oppressive card variants.
- ROAD ROLLER DA! feels like a climax and interacts with Time Stop.
- DIO is dangerous but not fully developed before feeding.

### Forbidden feel outcomes

List outcomes that would make the adaptation wrong.

Examples:

- Time Stop functions only as Slow.
- A physically overwhelming character is weak until its Ultimate.
- A tactical noncombatant becomes an unsupported brawler.
- A temporary borrowed power becomes permanently available.

## 4. Team metadata

Roles and related metadata describe the completed kit. They do not determine the kit before design.

### Core Roles

Assign exactly one Primary Core Role and at most one Secondary Core Role.

- **Vanguard:** absorbs pressure, initiates, and remains effective while contested.
- **Guardian:** protects allies through interception, mitigation, rescue, cleansing, or displacement.
- **Striker:** supplies reliable or repeatable offensive pressure.
- **Eliminator:** converts an opening, threshold, mark, or setup into rapid defeat.
- **Controller:** restricts enemy decisions through statuses, movement, targeting, timing, cost, or denial.
- **Support:** improves allies through healing, buffs, resources, card access, positioning, or utility.
- **Specialist:** uses an unconventional engine, objective, or defeat plan not represented cleanly by the other roles.

Primary Role is based on the character's ordinary match contribution, not one Ultimate.

### Combat Archetypes

Assign zero to two.

- **Bruiser:** sustained offense plus meaningful durability.
- **Duelist:** direct clashes and repeated one-target exchanges.
- **Skirmisher:** Speed, movement, timing, disengagement, and favorable exchanges.
- **Juggernaut:** overwhelming durable pressure through committed actions, with limited flexibility or responsiveness.
- **Assassin:** narrow openings converted into sudden target removal.
- **Marksman:** precise ranged pressure and deliberate target selection.
- **Artillery:** long Distance, area, Splash, Bounce, or formation pressure.
- **Summoner:** companions, clones, constructs, minions, or persistent external entities are central.
- **Tactician:** preparation, information, equipment choices, sequencing, or resource management.
- **Shapeshifter:** forms, stances, equipment modes, or transformations materially change decisions.

Archetypes describe method. Core Roles describe team function.

### Capability Tags

Capability Tags are searchable, non-role descriptors. Add only those materially supported by the kit.

Suggested registries include:

- Offensive: Burst, Sustained, Execute, Multihit, Area, Follow-Up, Clash.
- Defensive: Durable, Evade, Counter, Cover, Recovery, Resurrection.
- Control: Disabler, Movement, Targeting, Denial, Debuffer, Status.
- Team economy: Healer, Buffer, Card Access, Energy, Meter, Resource.
- Structural: Ramp, Transformation, Equipment, Summon, Created Cards, Alternate Defeat, Information.

A Capability Tag grants no rules.

### Economy profile

```yaml
economyProfile:
  energyDemand: low | medium | high
  meterDemand: low | medium | high
  handPressure: low | medium | high
  setupSpeed: immediate | setup | ramp
```

This profile warns about lineup conflicts. It is not a power rating.

### Synergy metadata

```yaml
synergy:
  outputs: []
  inputs: []
  conflicts: []
```

Use standardized mechanics, not subjective statements.

Examples:

```yaml
outputs:
  - enemy_movement
  - stun
  - fast_pressure
inputs:
  - vulnerable_targets
  - adjacent_enemies
conflicts:
  - high_energy_demand
  - retain_heavy
```

Prefer open synergy through shared mechanics. Avoid named-character bonuses except in scenarios, dedicated duo/team characters, or source-mandated partnerships.

## 5. Kit architecture

Every character contributes exactly five regular starting cards:

- Two Basic cards.
- Three Technique cards.

Every character also has at least one Ultimate pathway.

### Recommended functional skeleton

The default recommendation is:

1. Proactive foundational Basic.
2. Reactive, defensive, maintenance, or survival Basic.
3. Engine or state Technique.
4. Signature expression Technique.
5. Ceiling, flexibility, or payoff Technique.

This is not a mandatory arrangement. A kit may deviate when the character's identity requires it.

### Basics

Basics establish the character's dependable floor.

Requirements:

- Exactly two.
- Broadly usable unless the entire kit supports a deliberate exception.
- Canonical names where possible.
- Stable slot IDs independent of display names.
- No mandatory Attack + Defense pairing.
- No mandatory Strike or Defend names.

Every character needs a credible survival plan, but that plan may use Attack clashes, Evade, Counter, Cover, movement, regeneration, control, transformation, or another mechanic rather than a Basic Defense.

### Techniques

Techniques create the kit's ceiling and distinctive choices.

A Technique should normally provide at least one of:

- Engine creation or maintenance.
- Signature action.
- Form or equipment access.
- Flexible mode choice.
- Strong conditional payoff.
- Team-facing utility.
- Counterplay or recovery.

Do not use three Techniques that are only differently sized attacks unless that simplicity is genuinely faithful and intentional.

### Innates

Use Innates for continuous truths, persistent physiology, automatic identity, or starting setup.

Do not use Innates as hidden sixth Techniques.

Every Innate requires typed structured behavior. Display text is not executable authority.

### Statuses and personal resources

Use a status when the game must remember state between cards or timing points.

Choose the simplest coherent mode:

- Zero-value for a binary state.
- Stack for simple layers or duration.
- Value for a resource, progress tracker, ammunition, or countdown.
- Potency + Count when strength and persistence must be tracked separately.

Potency means strength per application or trigger. Count means remaining persistence or activations according to that status's own consumption rule; Count does not universally mean turns.

Separate concepts when both matter:

- Transformation state from transformation fuel.
- Equipment state from ammunition.
- Countdown-to-expiry from countdown-to-consequence.

Unique statuses are immune to generic Cleanse, Dispel, and Purge by default.

### Created cards

Created cards are appropriate for:

- Prepared actions.
- Temporary ammunition or equipment actions.
- Summons or clones.
- Conditional breadth.
- Expandable move libraries.
- One-use climaxes.

Creation is not play and does not generate Ultimate Meter.

Created-card ownership defaults to the source character unless specified otherwise.

Use lifecycle keywords intentionally:

- Exhaust for one-use cards after resolution.
- Ethereal for unused temporary cards.
- Retain for deliberately held preparation.
- Ordinary discard when the card should enter normal cycling.

A Created card cannot create another copy of itself through the same unresolved chain unless explicitly allowed.

### `Becomes`

Use `Becomes` for automatic replacement caused by a genuine state change.

Requirements:

- Replacement is automatic while the condition is true.
- It applies in deck, hand, and play.
- Paid cost, locked X, selected user, selected target, and chosen zone do not change retroactively.
- Current unresolved name, types, Power, and effects use the current replacement definition.
- Reevaluate between timing steps, not in the middle of one effect block.
- Variants should change decisions, not only add numbers.

Use a choice mechanic rather than optional `may become` wording.

### Ultimate pathways

An Ultimate pathway is one separately available Ultimate option and all of its state-dependent variants.

A character may have:

- One pathway with one card.
- One pathway with several replacements.
- Several separately available pathways.

Normally use one or two pathways. Three or more are exceptional, not forbidden.

Every pathway defines a lifecycle:

- Repeatable.
- Resource-gated.
- Once per game.
- Replacement after use.
- Temporary lockout.

No universal one-Ultimate-per-turn or one-Ultimate-per-round rule is assumed.

Multiple pathways must represent genuinely distinct climactic decisions. One should not be strictly dominant whenever both are available.

## 6. Card ownership and shared economy

Each regular and Ultimate card has an explicit owner.

Default rules:

- A character owns its five starting cards.
- Only the owner plays its cards unless an effect explicitly borrows, copies, or controls them.
- Team and scenario cards may be ownerless or team-owned.
- Created cards inherit source-character ownership unless stated otherwise.
- Defeat removes the owner's cards from active circulation.

The team shares:

- Draw Pile.
- Discard Pile.
- Hand.
- Energy.
- Ultimate Meter.

A shared hand is access, not ownership.

### Card-access reliability

Do not guarantee one card per character each turn.

Use:

- Innate.
- Retain.
- Scry.
- Seek.
- Search.
- `Becomes`.
- Created cards.
- Draw effects.

Normally provide at least three broadly usable starting-state cards per character unless the kit has a deliberate solution for conditional cards.

### Innate opening-hand rule

Rules v2 recommendation:

1. Put all Innate regular cards into the opening hand.
2. Draw until the team has at least five cards.
3. Normally allow at most one Innate regular card per character.
4. If more than five Innate cards exist, all begin in hand and no additional opening draw occurs.

Retained cards reduce the number drawn toward five on later turns.

### Meter generation

Ultimate Meter is gained only from Energy actually paid as a card's play cost.

- Mandatory increases and X count.
- Reductions lower Meter gained.
- Zero-cost plays generate zero.
- Effect-time Energy spending does not generate Meter.
- HP, ammunition, statuses, discards, Meter, and other costs do not generate Meter.
- Creating a card does not generate Meter.
- Playing a card without paying Energy generates zero unless explicit text says otherwise.

## 7. Interaction profile

Every major effect must document how an opponent can interact with its route.

```yaml
interaction:
  visibleSetup: true
  responseWindows: []
  requiredResources: []
  positionRequirements: []
  targetProtectionOptions: []
  sourceVulnerability: ""
  duration: ""
  fuel: ""
  aftermath: ""
  canonicalCounters: []
  intentionalOppression: ""
```

Counterplay may happen:

- Before activation.
- During resolution.
- After activation.

An effect does not need all three.

Decisive effects should normally show visible progress through Meter, a public resource, status, form, target mark, countdown, equipment state, or previous action.

If the payoff is intentionally difficult or impossible to answer once completed, say so in `intentionalOppression` and explain why that is faithful.

## 8. Control standards

Classify control effects:

- **Soft control:** changes efficiency or quality of choices, such as Slow, Weak, Frail, Vulnerable, Strain, or movement.
- **Category restriction:** blocks a limited family, such as Physical, Magical, Special, Attack, or Defense cards.
- **Hard control:** removes most active choices, such as Stun or full card-play denial.

Hard control is rare and identity-driven. Do not add universal diminishing returns or tenacity.

Use scoped Status Immunity or Effect Immunity only when supported by the source.

## 9. Damage and hax classification

Rules v2 broad Damage Types:

- Physical.
- Energy.
- Magical.
- Mental.
- Spiritual.

Optional Properties represent elements, substances, phenomena, technologies, or source systems:

- Electric.
- Fire.
- Ice.
- Sonic.
- Explosive.
- Radiation.
- Haki.
- Chakra.
- Ki.
- Reiatsu.
- Other registered identifiers.

Properties have no inherent rules.

Use multiple Damage Types only when each meaningfully affects resistance or interaction.

Do not force hax through damage when it is better represented by statuses, restrictions, defeat clauses, targeting rules, replacement, or explicit effects.

## 10. Power and Speed authoring

Power formulas are benchmarks, not ceilings.

Default benchmark:

- Energy cost × 10 Base Power.
- Ultimate Meter cost × 1.5 Base Power.
- Adjust for narrow requirements, utility, Speed, created-card access, area, and total output.

The ordinary non-Ultimate single-target target of roughly four to six average hits applies to ordinary accessible attacks, not every payoff or lore-supported major Technique.

Document significant deviations.

### Speed

Card Speed represents response window and commitment, not a universal movement-speed ranking.

- Normal is the default.
- Fast is earned through responsiveness, prediction, equipment, state, or low commitment.
- Slow represents preparation, commitment, vulnerability, or delayed execution.
- Extremely fast characters receive more Fast pathways, Follow-Ups, Counters, Haste, Evade, and explicit denial; not every card must be Fast.
- There is no default tier above Fast.

A slower character may have a Fast action through prediction, traps, technology, or another canonical reason.

## 11. Team and lineup audit

A completed character should be tested in varied lineups.

Review:

- Immediate action floor.
- Survival contribution.
- Interaction and disruption.
- Closing power.
- Energy curve.
- Meter competition.
- Retain and Created-card pressure.
- Position and Distance needs.
- Status inputs and outputs.
- Function after another character is defeated.
- Function when the character itself receives low team investment.

Warning signs:

- Every turn must fund one character or accomplish nothing.
- Several mandatory Retained cards clog the shared hand.
- The engine creates excessive deck growth.
- One Ultimate always monopolizes shared Meter.
- Allies only wait while one engine plays.
- Losing one setup card makes all five cards unusable.
- Three lineup members all demand the same position, status, or expensive setup without supporting one another.

Warnings do not automatically require nerfs. They require deliberate review.

## 12. Required structured fields

Rules v2 character data should eventually provide:

```yaml
schemaVersion: 2
rulesVersion: 2
id: ""
characterId: ""
versionId: ""
name: ""
version: ""
origin: ""
sourceBoundary: {}
design: {}
role:
  primary: ""
  secondary: null
archetypes: []
capabilities: []
economyProfile: {}
synergy: {}
innates: []
statusEffects: []
cards: []
createdCards: []
ultimatePathways: []
sourceBasis: []
consideredButOmitted: []
```

Card data should separate flat classifications rather than storing every concept in one `types` array:

```yaml
slotId: ""
owner: {}
name: ""
cost: {}
power: {}
speed: normal
actionTypes: []
damageTypes: []
properties: []
range: null
area: null
attackTags: []
effectTags: []
target: {}
lifecycle: {}
effects: []
transforms: []
restrictions: []
sourceBasis: []
```

## 13. Completion criteria

A character is ready for implementation review only when:

- The version boundary is explicit.
- The thesis and weakness are written.
- Mandatory and forbidden feel outcomes are listed.
- Power disparity is intentionally represented.
- Signature hax retains its core function.
- Canonical limitations are included.
- Two Basics, three Techniques, and at least one Ultimate pathway are present.
- Every card has a distinct gameplay job.
- Every persistent concept has a coherent status or resource.
- Ownership and lifecycle are explicit.
- Major effects have interaction profiles.
- Team economy and synergy metadata are complete.
- Structured effects fully describe executable behavior.
- Unique statuses are typed, not executable prose.
- Source basis and uncertainty are documented.
- Structural, semantic, compatibility, design, and lore validation have been run.

After those checks, use the [Roster Audit Checklist](roster-audit-checklist.md) for final review.