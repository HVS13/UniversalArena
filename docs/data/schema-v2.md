# Universal Arena Schema v2 Specification

> **Status:** Approved implementation specification, pending exporter and roster migration.  
> **Canonical relationship:** `docs/data/` remains the executable source of truth after migration. Human-readable pages should be generated from, or validated against, structured data.  
> **Related documents:** [Design Principles](../design/design-principles.md), [Character Authoring Framework](../design/character-authoring-framework.md), [Rules v2 Decisions](../design/rules-v2-decisions.md), and [Rules v2 Audit Supplement](../design/rules-v2-supplement.md).

## 1. Versioning

Rules v2 separates data-format compatibility from gameplay interpretation.

```yaml
schemaVersion: 2
rulesVersion: 2
```

- `schemaVersion` identifies data shape and validation contracts.
- `rulesVersion` identifies gameplay semantics.
- Exports record both values.
- Unsupported future major versions are rejected.
- Older versions must produce an actionable migration path.
- Never interpret Rules v1 content as Rules v2 merely because it can be deserialized.

## 2. Architecture

Rules v2 separates **versioned engine primitives** from **content registries**.

### Versioned engine primitives

These require documented code support:

- Effect execution.
- Expression evaluation.
- Conditions and restrictions.
- Timing queues and continuous rules.
- Target locking and legality.
- Random selection.
- Zone and lifecycle transitions.
- Clash, Use, Hit, and damage resolution.
- Status storage modes.
- Defeat, Resurrection, and victory timing.

### Content registries

These are additive structured entries with stable IDs:

- Damage Types.
- Properties.
- Source-System Tags.
- Attack Tags.
- Effect Tags.
- Roles.
- Combat Archetypes.
- Lineup Archetypes.
- Capability Tags.
- Keywords.
- Global statuses.
- Speeds.
- Ranges.
- Areas.
- Roll modes.
- Lifecycle destinations.
- Defeat states.
- Resurrection modes.

Each registry entry contains:

```yaml
id: property-electric
name: Electric
category: phenomenon
description: "Electrical or lightning-associated action. No inherent rule."
rules: []
deprecated: false
aliases:
  - card-type-electric
```

Adding a registry entry must not require editing unrelated character files.

## 3. Character root

```yaml
schemaVersion: 2
rulesVersion: 2
id: dio-brando-part-3
characterId: dio-brando
versionId: part-3
name: DIO
version: Part 3
origin: "JoJo's Bizarre Adventure"
art: dio-brando-part-3.png

sourceBoundary: {}
design: {}
role: {}
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
metadata: {}
```

Identity rules:

- `id` is the unique character-version ID and filename slug.
- `characterId` groups versions of the same identity.
- `versionId` identifies the selected version.
- `name + version` remains the same-team uniqueness rule.
- Aliases may connect codenames, localized names, or shared identities without merging distinct versions.

## 4. Source boundary and design metadata

```yaml
sourceBoundary:
  continuity: manga
  start: "Part 3 introduction"
  end: "final battle in Cairo"
  baselineState: "vampire body with The World before feeding on Joseph"
  accessibleForms: []
  standardEquipment:
    - knives
  exceptionalAbilities: []
  excludedMaterial: []
  knowledgeBoundary: "knowledge available through the selected endpoint"
  personalityBoundary: "behavior and restraint during the selected period"

design:
  thesis: ""
  weakness: ""
  powerExpression: ""
  signatureHax: []
  mandatoryFeelPoints: []
  forbiddenFeelOutcomes: []
  complexityNotes: ""
```

These fields guide authoring and review; they do not execute mechanics.

## 5. Role, archetype, economy, and synergy metadata

```yaml
role:
  primary: role-eliminator
  secondary: role-controller

archetypes:
  - archetype-assassin
  - archetype-bruiser

capabilities:
  - capability-follow-up
  - capability-transformation
  - capability-denial

economyProfile:
  energyDemand: high
  meterDemand: high
  handPressure: medium
  setupSpeed: setup

synergy:
  outputs:
    - stun
    - bleed
    - fast_pressure
  inputs:
    - disabled_targets
  conflicts:
    - high_energy_demand
```

Validation:

- Exactly one Primary Core Role.
- Zero or one different Secondary Core Role.
- Zero to two Combat Archetypes by default; more requires a documented exception.
- Capability and synergy IDs must exist.
- These fields grant no mechanics.

Lineup Archetypes belong to a team or lineup analysis object, not a character:

```yaml
lineupAnalysis:
  primaryArchetype: lineup-setup-execution
  secondaryArchetype: lineup-control
  warnings: []
```

## 6. Card schema

```yaml
id: dio-muda
slotId: regular-1
cardOrigin: starting
owner:
  kind: character
  characterId: dio-brando-part-3

name: Muda
cost:
  energy:
    kind: flat
    value: 4
  ultimateMeter: null
  additionalCosts: []
power:
  kind: range
  min: 20
  max: 28
speed: speed-normal

actionTypes:
  - action-basic
  - action-attack
damageTypes:
  - damage-physical
properties: []
sourceSystemTags:
  - system-stand
range: range-melee
area: null
attackTags:
  - attack-blunt
effectTags: []

target:
  kind: character
  allegiance: enemy
  count: 1
  selection: chosen
  lockMode: character
  filters: []
  fallback: fail_target_effects

resolution:
  clashRollMode: single
  useRollMode: single
  targetBatch: sequential
  triggerOrder: primary_then_left_to_right

lifecycle:
  afterResolution: destination-discard
  ifCancelled: destination-discard
  ifNegated: destination-discard
  ifUnusedAtTurnEnd: destination-discard
  onOwnerDefeat: destination-defeat-reserve
  onResurrection: destination-discard

effects: []
continuousRules: []
transforms: []
restrictions: []
sourceBasis: []
```

### Stable identity

- Card `id` and `slotId` are stable across renames.
- Starting regular cards map to exactly two Basics and three Techniques.
- Variant cards use separate IDs and declare `variantOf`, a transform group, or pathway membership.
- Display order is metadata, not identity.

### Card provenance

`cardOrigin` is separate from Action Types:

- `starting`
- `created`
- `scenario`
- `generated_variant`

`Created` is not an Action Type. A Created card may still be a Technique, Attack, Defense, or Special.

## 7. Ownership

```yaml
owner:
  kind: character | team | scenario | none | inherited
  characterId: dio-brando-part-3
  inheritedFrom: source_character
```

Defaults:

- Starting regular cards: owning character.
- Ultimate cards: owning character.
- Created cards: inherit source-character ownership.
- Scenario cards: scenario or team ownership.

Ownership determines:

- Who may normally play a card.
- Which personal resources it may use.
- Owner-defeat behavior.
- Defeat Reserve destination.
- Resurrection recovery.

Play permission can change without changing ownership.

## 8. Costs and locked values

```yaml
cost:
  energy:
    kind: chosen
    min: 0
    max: 5
  ultimateMeter:
    kind: flat
    value: 30
  additionalCosts:
    - kind: spend_status
      subject: user
      statusId: unique-stolen-blood
      amount:
        kind: chosen
        min: 0
        max: 5
      optional: true
      failureBehavior: skip_costed_branch
```

Rules:

- Play-time costs, X, user, target, zone, and play-time modes lock on play.
- Meter gained equals Energy actually paid as the card's play cost after modifiers.
- Additional costs do not generate Meter unless explicit text says otherwise.
- Later replacement never changes paid cost or Meter gained retroactively.

## 9. Classification axes

### Action Types

Initial IDs:

- `action-basic`
- `action-technique`
- `action-ultimate`
- `action-attack`
- `action-defense`
- `action-special`

### Damage Types

Initial IDs:

- `damage-physical`
- `damage-energy`
- `damage-magical`
- `damage-mental`
- `damage-spiritual`

### Properties

Elements, materials, or phenomena with no inherent rules:

- `property-electric`
- `property-fire`
- `property-ice`
- `property-sonic`
- `property-explosive`
- `property-radiation`
- `property-acid`

### Source-System Tags

Fictional power frameworks with no inherent cross-system equivalence:

- `system-ki`
- `system-chakra`
- `system-reiatsu`
- `system-haki`
- `system-stand`
- `system-nen`
- `system-cursed-energy`
- `system-technology`

### Range

- `range-melee`
- `range-ranged`
- `null` when spatial delivery is not meaningful

### Attack Tags

- `attack-slash`
- `attack-pierce`
- `attack-blunt`
- `attack-multihit`

### Effect Tags

Examples:

- `effect-transformation`
- `effect-recovery`
- `effect-buff`
- `effect-debuff`
- `effect-equipment`
- `effect-summon`
- `effect-information`
- `effect-alternate-defeat`

Classification entries do not grant behavior unless a rule references them.

## 10. Target schema

```yaml
target:
  kind: character | position | card | status | team | area | none
  allegiance: self | ally | other_ally | enemy | any
  count: 1
  selection: chosen | random | all
  lockMode: character | position | object
  filters: []
  fallback: fail_target_effects
```

Defaults:

- Character lock follows the selected character through movement.
- Position lock remains on the selected position.
- Object lock follows the selected card, status, or other object while legal.
- If a character target becomes illegal before Use, target-facing effects fail, the card is still Used, and unrelated self/card effects resolve.
- Retargeting requires explicit text.

## 11. Area and random selection

Splash example:

```yaml
area:
  kind: area-splash
  anchor: final_primary_position
  radius: 1
  snapshot: on_use
  targetBatch: simultaneous
```

Bounce example:

```yaml
area:
  kind: area-bounce
  count:
    kind: flat
    value: 3
  anchor: final_primary_position
  selection: random
  replacement: true
  recalculateEligibility: each_application
```

Area definitions specify:

- Anchor.
- Snapshot timing.
- Eligibility.
- Sequential or simultaneous resolution.
- Random selection behavior.
- Replacement behavior.
- Redirect and Cover interaction.

Initial area IDs may include:

- `area-aoe`
- `area-splash`
- `area-bounce`
- `area-chain`
- `area-line`
- `area-cone`
- `area-ring`
- `area-random-enemies`
- `area-source-radius`

Legacy bare Bounce migrates to Bounce 1.

Random defaults:

```yaml
random:
  selection: uniform
  replacement: true
  eligibilityTiming: each_selection
  noEligibleBehavior: fail_application
  public: true
```

Digital logs retain eligible pools, ordered results, weights, and replayable random state.

## 12. Roll and Multihit schema

```yaml
resolution:
  clashRollMode: per_remaining_hit_sum
  useRollMode: per_hit_shared_targets
  targetBatch: simultaneous
  triggerOrder: primary_then_left_to_right

multihit:
  startingCount:
    kind: flat
    value: 6
  clashMode: sum_remaining_hits
  onAttackClashLoss:
    reduceCount: 1
    destination: reuse
  onTie:
    behavior: normal_cancel
  atZero:
    behavior: ordinary_single_hit_attack
```

Roll-mode examples:

- `single`
- `per_remaining_hit_sum`
- `per_hit_shared_targets`
- `per_target`
- `roll_once_then_split`
- `fixed_value`
- `custom`

Rules:

- Clash Rolls and Use Rolls are separate.
- Reuse generates fresh rolls.
- Default area behavior rolls once per hit and shares that roll across targets.
- Each target resolves mitigation and triggers separately.
- A fixed printed divisor remains fixed after Multihit Count loss.

## 13. Effects

Every effect requires:

```yaml
- id: muda-deal-damage
  timing: on_use
  scope: per_target
  type: deal_damage
  targetRef: locked_target
  amount:
    kind: power
  condition: null
  failureBehavior: skip_effect
```

### Initial timings and events

- `on_play`
- `before_clash`
- `clash`
- `after_clash`
- `before_use`
- `on_use`
- `on_hit`
- `on_damage`
- `on_hp_damage`
- `after_use`
- `turn_start`
- `turn_end`
- `on_gain`
- `on_expire`
- `on_heal`
- `on_hp_restored`
- `would_be_defeated`
- `when_defeated`
- `when_sacrificed`
- `when_resurrected`

`Always` is represented as a continuous rule, not an event at the end of the timing ladder.

### Initial scopes

- `once_per_play`
- `once_per_use`
- `once_per_turn`
- `once_per_game`
- `per_target`
- `per_hit`
- `per_hit_per_target`
- `once_per_target_per_use`
- `per_amount_spent`
- `continuous`

Scope must not be inferred solely from display prose.

### Required effect primitives

The v2 implementation must include, or provide documented equivalents and migrations for:

- `deal_damage`
- `lose_hp`
- `pay_hp`
- `set_hp`
- `change_max_hp`
- `gain_shield`
- `gain_barrier`
- `heal`
- `gain_status`
- `inflict_status`
- `set_status`
- `reduce_status`
- `remove_status`
- `spend_status`
- `transfer_status`
- `gain_energy`
- `set_energy`
- `spend_energy`
- `gain_ultimate_meter`
- `spend_ultimate_meter`
- `create_card`
- `reveal_cards`
- `draw_cards`
- `discard_cards`
- `scry`
- `seek`
- `search`
- `move_character`
- `swap_characters`
- `redirect`
- `grant_keyword`
- `block_play`
- `allow_play`
- `switch_equipment`
- `reload`
- `transform_card`
- `resurrect`
- `sacrifice`
- `prevent_defeat`
- `defeat`
- `modify_cost`
- `modify_power`
- `modify_speed`
- `choose`
- `random_select`
- `sequence`
- `schedule_trigger`
- `record_match_flag`
- `replace_ultimate_pathway`

Legacy `gain_ultimate` migrates to `gain_ultimate_meter`.

A general primitive may target a typed collection. Do not invent undocumented special primitives when `grant_keyword` plus a card filter is sufficient.

## 14. Expressions

Rules v2 uses typed expression trees.

```yaml
amount:
  op: floor_divide
  left:
    ref: current_power
  right:
    value: 4
```

Foundational references include:

- Literal number.
- Locked X.
- Current Power.
- Remaining Multihit Count.
- Status Potency, Count, Stack, or Value.
- HP and max HP.
- Energy or Meter actually paid.
- Amount spent by a prior effect.
- Target count.

Operators include add, subtract, multiply, floor-divide, minimum, maximum, clamp, and halve.

Every live reference declares whether it is:

- Locked on play.
- Snapshotted on Use.
- Evaluated when the effect resolves.

## 15. Conditions and restrictions

```yaml
condition:
  op: and
  conditions:
    - kind: subject_status_compare
      subject: user
      statusId: unique-time-stop
      stat: value
      operator: greater_or_equal
      value: 1
    - kind: target_is_legal
```

Initial condition support includes:

- Has or lacks status.
- Status comparisons.
- HP and max-HP thresholds.
- Threshold crossing.
- Position, Distance, adjacency, and opposed state.
- Character defeated or in play.
- Ally or enemy count.
- Card classifications, Properties, and Source-System Tags.
- Current form or equipment.
- Match flags.
- Previous card or effect events.
- Target legality.
- Ownership.
- Amount paid or spent.
- Random result.

Restrictions default to play-time checks:

```yaml
restrictions:
  - id: require-six-information
    timing: play
    kind: require
    subject: target
    condition:
      kind: subject_status_compare
      statusId: unique-stolen-information
      stat: stack
      operator: greater_or_equal
      value: 6
```

Use-time rechecking must be explicit.

## 16. Continuous rules and `Becomes`

```yaml
transforms:
  - id: strike-to-muda-barrage
    priority: 100
    condition:
      kind: subject_status_compare
      subject: owner
      statusId: unique-time-stop
      stat: value
      operator: greater_or_equal
      value: 1
    replacementCardId: dio-strike-muda-barrage
```

Rules:

- Automatic while true.
- Applies in deck, hand, and play.
- Reevaluate between timing steps, not mid-effect block.
- Preserve paid costs, Meter gained, X, user, target, and zone.
- Current unresolved definition supplies name, classification, Power, and effects.
- Multiple replacements require priority or mutual-exclusion validation.

## 17. Card lifecycle

```yaml
lifecycle:
  afterResolution: destination-discard
  ifCancelled: destination-discard
  ifNegated: destination-discard
  ifUnusedAtTurnEnd: destination-discard
  onOwnerDefeat: destination-defeat-reserve
  onResurrection: destination-discard
```

Registered destinations include:

- `destination-draw`
- `destination-hand`
- `destination-discard`
- `destination-exhaust`
- `destination-ultimate-area`
- `destination-defeat-reserve`
- `destination-removed`
- `destination-created-reserve`

Rules v2 Exhaust uses `afterResolution: destination-exhaust`. Immediate removal On Play is a separate effect or field.

## 18. Ultimate pathways

```yaml
ultimatePathways:
  - id: gear-finisher
    name: Gear Finisher
    lifecycle:
      kind: repeatable
      returnDestination: destination-ultimate-area
    variants:
      - cardId: luffy-jet-gatling
        availability:
          kind: subject_has_status
          statusId: unique-gear-2
      - cardId: luffy-gigant-rifle
        availability:
          kind: subject_has_status
          statusId: unique-gear-3
```

Lifecycle kinds:

- `repeatable`
- `resource_gated`
- `once_per_game`
- `replacement_after_use`
- `temporary_lockout`
- `custom`

Validation:

- Every character has at least one pathway.
- Every Ultimate belongs to exactly one pathway unless intentionally shared.
- Each reachable state has understandable availability.
- Variants in one pathway are not separately available unless specified.
- Cost and readiness are checked on play.

## 19. Status schema

Global and Unique statuses use the same typed shape.

Modes:

- `binary`
- `stack`
- `value`
- `potency_count`

Use the simplest coherent mode. Do not create dummy Potency for a Count-only concept.

DIO Time Stop example:

```yaml
statusEffects:
  - id: unique-the-world-time-stop
    name: "The World: Time Stop"
    type: unique
    mode: value
    caps:
      value: 8
    visibility: public
    persistence:
      onDefeat: remove
      onSourceDefeat: independent
      genericCleanse: immune
    rules:
      - id: time-stop-follow-up
        timing: continuous
        scope: continuous
        type: grant_keyword
        target:
          kind: owned_cards
          owner: subject
          filters:
            actionTypes:
              - action-attack
        keywordId: keyword-follow-up
        condition:
          kind: status_compare
          stat: value
          operator: greater_or_equal
          value: 1
```

Status persistence explicitly records:

- Subject-defeat behavior.
- Source-defeat dependence.
- Resurrection persistence.
- Generic Cleanse, Dispel, and Purge eligibility.
- Visibility.
- Zero handling and expiry consequences.

Unique statuses default to generic removal immunity.

## 20. Defeat and Resurrection

Defeat defaults:

```yaml
defeatDefaults:
  timing: after_current_resolution_unit
  resolutionUnitDefinition: "finish the current atomic effect or current card use as defined by Rules v2"
  cardDestination: destination-defeat-reserve
  clearShield: true
  clearBarrier: true
  clearStatusTypes:
    - positive
    - negative
    - unique
  cancelCharacterDelayedTriggers: true
  preserveExternalEffects: true
  immediateReplacementDraw: false
```

Defeat replacement example:

```yaml
- id: survive-with-blood
  event: would_be_defeated
  scope: once_per_game
  decision:
    kind: optional_defeat_replacement
    costs:
      - kind: spend_status
        statusId: unique-stolen-blood
        amount:
          kind: flat
          value: 3
    effects:
      - id: survive-set-hp
        timing: would_be_defeated
        scope: once_per_use
        type: set_hp
        targetRef: subject
        amount:
          kind: flat
          value: 1
```

Resurrection defaults:

```yaml
resurrectionDefaults:
  position: choose_empty_allied
  hpRequired: true
  regularCards: destination-discard
  ultimates: destination-ultimate-area
  createdCards: do_not_restore
  exhaustedCards: do_not_restore
  statuses: clear
  resources: do_not_restore
  startOfMatchEffects: false
  preserveMatchFlags: true
```

A Resurrection primitive without returned HP is invalid.

## 21. Reveal semantics

`reveal_cards` preserves each card's current zone until another effect relocates it.

Reveal alone is not Draw, Discard, Play, Use, or removal and generates no Meter.

If a revealed card's owner is defeated before selection or relocation, owner-defeat lifecycle applies before the effect continues with remaining legal cards.

## 22. Source basis and omissions

```yaml
sourceBasis:
  - id: source-time-stop-duration
    classification: unlockable
    sources:
      - reference: ""
        note: ""
    interpretation: ""
    uncertainty: ""
    intentionalDeviation: ""
    supports:
      - unique-the-world-time-stop
      - dio-time-stop-card

consideredButOmitted:
  - name: "Space Ripper Stingy Eyes"
    classification: excluded
    reason: "Outside the selected period or redundant with another gameplay job."
    sourceBasisIds: []
```

Every major hax, transformation, immunity, extreme Power deviation, alternate defeat condition, and unusual lifecycle references source-basis records.

## 23. Validation

### Structural errors — block export

- Missing or duplicate stable IDs.
- Invalid references.
- Wrong regular-card count.
- Missing Ultimate pathway.
- Unknown registry entry.
- Transformation cycle.
- Missing ownership or provenance.
- Invalid target, lifecycle, or status mode.
- Executable Unique-status behavior stored only in prose.

### Semantic errors — block export

- On Hit on a non-Attack without explicit exception.
- Position behavior encoded as character lock.
- Created card with unresolved ownership or lifecycle.
- Resurrection without HP.
- Spend with undefined failure behavior.
- Area effect without scope or batch mode.
- Ultimate with no pathway.
- Scope incompatible with timing.
- Wrong stat for a status mode.
- Effect primitive used without registration.
- Dummy Potency or Count with no coherent meaning.

### Compatibility errors — block export

- Unsupported schema or rules version.
- Deprecated ID without migration.
- Electric active as Damage Type.
- Old role with no mapping.
- Ambiguous legacy Exhaust.
- Bare Bounce not normalized.
- Created stored as an Action Type.
- Legacy source-system classification without migration.

### Design warnings — review, do not auto-nerf

- Large Power deviation.
- Several hard-control effects.
- Heavy Retain or Created-card pressure.
- No low-investment action.
- Variant changes only numbers.
- Excessive personal currencies.
- Dominant Ultimate pathway.
- Multiple high-demand economy ratings.
- Excessive independent decisions or memory burden.

### Lore-review warnings — human review

- Later-version ability.
- Unlabeled composite continuity.
- Hax reduced to ordinary damage.
- Strong character lacks baseline superiority.
- Weak character receives unsupported parity.
- Canonical drawback omitted.
- Immunity inferred only from strength.
- Major mechanic lacks source basis.

## 24. Export manifest

```json
{
  "schemaVersion": 2,
  "rulesVersion": 2,
  "sourceRepository": "HVS13/UniversalArena",
  "sourceCommit": "...",
  "generatedAt": "...",
  "contentHash": "sha256:...",
  "rosterCount": 9,
  "registryVersions": {},
  "migrationsApplied": [],
  "validation": {
    "errors": 0,
    "warnings": 0
  }
}
```

Do not publish canonical exports from dirty structured data.

## 25. Human-readable generation

Authority order after implementation:

1. Structured Rules v2 data.
2. Generated card, status, and rules text.
3. Reviewed `displayTextOverride` when generation cannot express intended wording.

Overrides reference the structured effects they represent. Validation warns when display and executable behavior diverge.

Do not execute normal prose.

## 26. Compatibility doctrine

Changing old meaning requires:

1. A rules-version or schema-version decision.
2. An ordered migration.
3. Temporary legacy aliases.
4. An affected-content report.
5. Roster regression tests.
6. Updated generated documentation.
7. Changelog documentation.

Never silently reinterpret Rules v1 data as Rules v2.
