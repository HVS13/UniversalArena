# Universal Arena Schema v2 Specification

> **Status:** Approved implementation specification, pending exporter and roster migration.  
> **Canonical relationship:** `docs/data/` remains the structured source of truth. Human-readable pages should be generated from, or validated against, structured data.  
> **Related documents:** [Design Principles](../design/design-principles.md), [Character Authoring Framework](../design/character-authoring-framework.md), [Rules v2 Decisions](../design/rules-v2-decisions.md).

## 1. Versioning

Rules v2 separates data-format compatibility from gameplay interpretation.

```yaml
schemaVersion: 2
rulesVersion: 2
```

- `schemaVersion` identifies the shape and validation contract of structured data.
- `rulesVersion` identifies the gameplay semantics used to interpret that data.
- A schema migration may preserve the same rules interpretation.
- A rules migration may require no structural change but still alter behavior.
- Exports must record both values in the manifest.

The exporter must reject unsupported future major versions and provide actionable migration errors for older versions.

## 2. Registry architecture

Rules v1 hard-codes many allowed values in exporter code. Rules v2 divides concepts into:

### Versioned engine primitives

These require code support and belong to versioned schema modules:

- Effect primitive shapes.
- Scalar expression evaluation.
- Condition evaluation.
- Timing queue behavior.
- Target selection execution.
- Random selection execution.
- Card-zone transitions.
- Clash and Use resolution.
- Status storage modes.

### Content registries

These are structured data entries and should not require unrelated code edits:

- Damage Types.
- Properties.
- Attack Tags.
- Effect Tags.
- Roles.
- Archetypes.
- Capability Tags.
- Keywords.
- Global statuses.
- Area definitions.
- Roll modes.
- Lifecycle destinations.
- Defeat states.
- Resurrection modes.
- Source-system tags.

Registry entries require stable IDs, display names, categories, descriptions, and deprecation metadata.

Example:

```yaml
id: property-electric
name: Electric
category: phenomenon
rules: []
deprecated: false
aliases:
  - card-type-electric
```

A registry entry may have no inherent rules. Properties are normally descriptive selectors until an effect references them.

## 3. Character root schema

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

### Identity

- `id` is the unique character-version identifier and filename slug.
- `characterId` groups versions of the same identity.
- `versionId` identifies the version within that identity.
- `name + version` remains unique on one team.
- Optional aliases may connect shared identities, transformations, codenames, or localized names.

## 4. Source boundary schema

```yaml
sourceBoundary:
  continuity: manga
  start: "Part 3 introduction"
  end: "final battle in Cairo"
  baselineState: "vampire body with The World, before feeding on Joseph"
  accessibleForms: []
  standardEquipment:
    - knives
  exceptionalAbilities:
    - name: extended-time-stop-after-feeding
      classification: unlockable
  excludedMaterial:
    - Part 1-only techniques not used in the selected period
  knowledgeBoundary: "Part 3 knowledge through the selected endpoint"
  personalityBoundary: "Part 3 behavior and restraint"
```

Fields may reference source-basis records by ID.

## 5. Design schema

```yaml
design:
  thesis: ""
  weakness: ""
  powerExpression: ""
  signatureHax: []
  mandatoryFeelPoints: []
  forbiddenFeelOutcomes: []
  complexityNotes: ""
```

This data is review metadata and is not mechanically executed.

## 6. Role and team metadata

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
- Zero or one Secondary Core Role.
- Primary and Secondary must differ.
- Zero to two Archetypes by default; more requires an explicit exception.
- Capability and synergy identifiers must exist in registries.
- These fields grant no gameplay behavior.

## 7. Card schema

```yaml
slotId: regular-1
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
range: range-melee
area: null
attackTags:
  - attack-blunt
effectTags: []

target:
  kind: character
  allegiance: enemy
  count: 1
  lockMode: character

lifecycle:
  afterResolution: destination-discard
  ifUnusedAtTurnEnd: destination-discard

effects: []
transforms: []
restrictions: []
sourceBasis: []
```

### Stable slots

- `slotId` is stable across renames.
- Starting regular slots must map to exactly two Basics and three Techniques.
- Variant cards use separate IDs but may declare `variantOf` or belong to a transform group.
- Display headings are generated from order metadata, not parsed into identity.

## 8. Ownership schema

```yaml
owner:
  kind: character | team | scenario | none | inherited
  characterId: dio-brando-part-3
  inheritedFrom: source_character
```

Defaults:

- Starting cards: owning character.
- Ultimate cards: owning character.
- Created cards: inherited from source character.
- Scenario cards: scenario or team ownership.

Ownership controls:

- Who may normally play the card.
- Which personal resources the card can use.
- What happens on owner defeat.
- Which Defeat Reserve receives it.
- Whether Resurrection restores it.

An explicit effect may temporarily override play permission without changing ownership.

## 9. Cost schema

```yaml
cost:
  energy:
    kind: x
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
```

Play-time values are locked after payment.

Meter generation is computed from Energy actually paid as the play cost, after cost modifiers.

Additional costs do not generate Meter unless a rule explicitly says otherwise.

## 10. Classification schema

Rules v2 replaces the overloaded flat `types` array.

### Action Types

Examples:

- action-basic
- action-technique
- action-ultimate
- action-attack
- action-defense
- action-special
- action-created

### Damage Types

Initial registry:

- damage-physical
- damage-energy
- damage-magical
- damage-mental
- damage-spiritual

### Properties

Examples:

- property-electric
- property-fire
- property-ice
- property-sonic
- property-explosive
- property-radiation
- property-haki
- property-ki
- property-chakra
- property-reiatsu

Properties have no inherent behavior unless registered rules or explicit effects reference them.

### Range

- range-melee
- range-ranged
- null for non-spatial effects when appropriate

### Attack Tags

Initial registry:

- attack-slash
- attack-pierce
- attack-blunt
- attack-multihit

### Effect Tags

Examples:

- effect-transformation
- effect-recovery
- effect-buff
- effect-debuff
- effect-equipment
- effect-summon
- effect-information
- effect-alternate-defeat

Effect Tags are descriptive unless a mechanic explicitly references them.

## 11. Target schema

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

### Character lock

A character-locked target follows that character through movement. Distance and adjacency use current positions when required.

### Position lock

A position-locked effect remains at the selected position and may miss or affect a new occupant.

### Target failure

Default `fallback: fail_target_effects` means:

- Target-facing effects fail.
- The card is still Used.
- Unrelated self and card effects resolve.

Retargeting requires an explicit effect.

## 12. Area schema

```yaml
area:
  kind: area-splash
  anchor: final_primary_position
  radius: 1
  snapshot: on_use
  targetBatch: simultaneous
```

Bounce:

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

Area registry examples:

- area-aoe
- area-splash
- area-bounce
- area-chain
- area-line
- area-cone
- area-ring
- area-random-enemies
- area-source-radius

An area definition specifies:

- Anchor.
- Snapshot timing.
- Eligible positions or characters.
- Whether target batches are simultaneous.
- Whether selection is random.
- Replacement behavior.
- Redirect and Cover interaction.

Legacy bare Bounce migrates to count 1.

## 13. Roll and Power schema

```yaml
power:
  kind: range
  min: 24
  max: 36
  formula: null

resolution:
  clashRollMode: per_remaining_hit_sum
  useRollMode: per_hit_shared_targets
  targetBatch: simultaneous
  triggerOrder: primary_then_left_to_right
```

Roll-mode registry examples:

- single
- per_remaining_hit_sum
- per_hit_shared_targets
- per_target
- roll_once_then_split
- fixed_value
- custom

The schema distinguishes:

- Printed Power.
- Raw Power Roll.
- Adjusted Power.
- Clash Total.
- Damage instance.

Clash results are never reused as Use Rolls.

## 14. Multihit schema

```yaml
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

Damage effect example:

```yaml
- id: throwing-knives-damage
  timing: on_use
  scope: per_hit_per_target
  type: deal_damage
  amount:
    kind: power_div
    divisor:
      kind: fixed
      value: 6
  hits:
    kind: remaining_multihit_count
```

A fixed divisor does not change when remaining Count changes. Use an explicit remaining-count expression when scaling is intended.

## 15. Effect schema

Every effect requires a stable ID.

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

### Required common fields

- `id`
- `timing`
- `scope`
- `type`

### Timings

Initial engine timings:

- on_play
- before_clash
- clash
- after_clash
- before_use
- on_use
- on_hit
- on_damage
- on_hp_damage
- after_use
- turn_start
- turn_end
- on_gain
- on_expire
- would_be_defeated
- when_defeated
- when_resurrected

`Always` is represented as a continuous rule, not an event timing.

### Scopes

Initial scopes:

- once_per_play
- once_per_use
- once_per_turn
- once_per_game
- per_target
- per_hit
- per_hit_per_target
- once_per_target_per_use
- per_amount_spent
- continuous

Do not infer scope solely from prose.

### Effect primitives

Initial v2 primitives should include or migrate existing behavior for:

- deal_damage
- lose_hp
- pay_hp
- gain_shield
- gain_barrier
- heal
- change_max_hp
- gain_status
- inflict_status
- set_status
- reduce_status
- remove_status
- spend_status
- transfer_status
- create_card
- draw_cards
- discard_cards
- scry
- seek
- search
- move_character
- swap_characters
- redirect
- grant_keyword
- block_play
- allow_play
- switch_equipment
- reload
- transform_card
- resurrect
- sacrifice
- prevent_defeat
- defeat
- modify_cost
- modify_power
- modify_speed
- choose
- random_select
- sequence
- schedule_trigger
- record_match_flag
- replace_ultimate_pathway

The exporter may retain specialized primitives for efficiency, but their semantics must be documented and versioned.

## 16. Scalar expression schema

Rules v2 uses typed expression trees rather than a short hard-coded list.

```yaml
amount:
  op: floor_divide
  left:
    ref: current_power
  right:
    value: 4
```

Supported foundational expression nodes should include:

- Literal number.
- Locked X.
- Current Power.
- Remaining Multihit Count.
- Status Potency, Count, Stack, or Value.
- HP and max HP.
- Energy or Meter actually paid.
- Amount spent by a prior effect.
- Target count.
- Arithmetic: add, subtract, multiply, floor-divide, minimum, maximum, clamp, halve.

Expressions must declare whether references are:

- Locked on play.
- Snapshotted on Use.
- Evaluated live when the sentence resolves.

## 17. Condition schema

```yaml
condition:
  op: and
  conditions:
    - kind: subject_has_status
      subject: user
      statusId: unique-time-stop
      min:
        stat: count
        value: 1
    - kind: target_is_legal
```

Condition registry must support additive expansion.

Initial conditions should cover:

- Has or lacks status.
- Status comparisons.
- HP and max-HP thresholds.
- Threshold crossing.
- Position, Distance, adjacency, and opposed state.
- Character defeated or in play.
- Ally or enemy count.
- Card classifications and Properties.
- Current form or equipment.
- Once-per-game match flags.
- Previous card or effect events.
- Target legality.
- Owner identity.
- Amount paid or spent.
- Random result.

Conditions declare evaluation timing and do not retroactively alter paid costs or locked choices.

## 18. Continuous rules and `Becomes`

```yaml
transforms:
  - id: strike-to-muda-barrage
    priority: 100
    condition:
      kind: subject_has_status
      subject: owner
      statusId: unique-time-stop
    replacementCardId: dio-strike-muda-barrage
```

Rules:

- Automatic while true.
- Applies in deck, hand, and play.
- Reevaluate between timing steps.
- No mid-effect-block replacement.
- Paid costs, Meter gained, locked X, user, target, and zone remain unchanged.
- Current unresolved definition supplies name, classifications, Power, and effects.
- Multiple simultaneous replacements require explicit priority or mutual exclusion validation.

## 19. Restrictions schema

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

Restrictions default to play-time checks.

Use `timing: use` only when the design explicitly rechecks legality at Use.

Restriction categories include:

- Status and resource requirements.
- Form or equipment requirements.
- Target conditions.
- Position or Distance.
- Response windows such as Follow-Up or Assist Attack.
- Once-per-turn or once-per-game flags.
- Owner and allegiance.

## 20. Card lifecycle schema

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

- destination-draw
- destination-hand
- destination-discard
- destination-exhaust
- destination-ultimate-area
- destination-defeat-reserve
- destination-removed
- destination-created-reserve

Rules v2 Exhaust uses `afterResolution: destination-exhaust`.

Immediate removal On Play is a separate effect or lifecycle field and must not reuse Exhaust semantics.

## 21. Ultimate pathway schema

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

- repeatable
- resource_gated
- once_per_game
- replacement_after_use
- temporary_lockout
- custom

Validation:

- Every character has at least one pathway.
- Every Ultimate card belongs to exactly one pathway unless explicitly shared.
- Each reachable character state has understandable pathway availability.
- Variants in one pathway are not treated as separately available choices unless the pathway says so.
- A pathway's paid cost is checked on play and not retroactively changed by replacement.

## 22. Status schema

Global and Unique statuses use the same typed structure.

```yaml
statusEffects:
  - id: unique-the-world-time-stop
    name: "The World: Time Stop"
    type: unique
    mode: potency_count
    caps:
      potency: 1
      count: 8
    visibility: public
    persistence:
      onDefeat: remove
      onSourceDefeat: independent
      genericCleanse: immune
    rules:
      - id: time-stop-follow-up
        timing: continuous
        scope: continuous
        type: grant_keyword_to_owned_cards
        keywordId: keyword-follow-up
        cardFilter:
          actionTypes:
            - action-attack
        condition:
          kind: status_compare
          stat: count
          operator: greater_or_equal
          value: 1
```

### Modes

- binary
- stack
- value
- potency_count

### Persistence

Status persistence must explicitly support:

- Removal on subject defeat.
- Survival after source defeat.
- Source-linked removal.
- Persistence through Resurrection.
- Generic Cleanse, Dispel, and Purge eligibility.
- Hidden or public visibility.

Unique statuses default to generic removal immunity.

### Zero handling

A status defines:

- Which values reaching zero remove it.
- Whether zero triggers an expiration consequence.
- Whether the consequence resolves before removal.
- Whether a delayed trigger survives removal.

## 23. Defeat and Resurrection schema

### Defeat defaults

```yaml
defeatDefaults:
  timing: after_current_atomic_use
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

### Defeat replacement

```yaml
- id: survive-with-blood
  event: would_be_defeated
  scope: once_per_game
  decision:
    kind: optional_defeat_replacement
    costs: []
    effects:
      - type: set_hp
        value: 1
```

### Resurrection defaults

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

A Resurrection primitive is invalid without an HP specification.

## 24. Randomness schema

```yaml
random:
  selection: uniform
  replacement: true
  eligibilityTiming: each_selection
  noEligibleBehavior: fail_application
  public: true
```

Digital exports and match logs should retain:

- Eligible pool.
- Ordered results.
- Seed or deterministic replay state.
- Any weights.

Randomness must not be used as an undocumented balancing substitute.

## 25. Source-basis schema

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
```

Every major hax, transformation, immunity, extreme Power deviation, alternate defeat condition, and unusual lifecycle should reference source-basis records.

## 26. Considered-but-omitted schema

```yaml
consideredButOmitted:
  - name: "Space Ripper Stingy Eyes"
    classification: excluded
    reason: "Outside this version's represented action set or redundant with another gameplay job."
    sourceBasisIds: []
```

Omission metadata prevents future authors from repeatedly reintroducing redundant or out-of-bound material.

## 27. Validation levels

### Structural errors

Block export:

- Missing stable IDs.
- Duplicate IDs.
- Invalid references.
- Wrong regular-card count.
- Missing Ultimate pathway.
- Unknown registry entries.
- Transformation cycles.
- Missing ownership.
- Invalid target or lifecycle.
- Executable Unique status behavior stored only as prose.

### Semantic errors

Block export:

- On Hit effect on a non-Attack without explicit exception.
- Position-target behavior encoded as character lock.
- Created card with unresolved ownership or lifecycle.
- Resurrection without HP.
- Spend cost with undefined failure behavior.
- Area effect with undefined target scope or batch mode.
- Ultimate card with no pathway.
- Effect scope incompatible with timing.
- A status mode referenced with the wrong stat.

### Compatibility errors

Block export:

- Unsupported schema or rules version.
- Deprecated identifier without migration.
- Electric still active as Damage Type.
- Old flat role with no mapping.
- Ambiguous legacy Exhaust.
- Bare Bounce not normalized.

### Design warnings

Do not block export:

- Large Power deviation.
- Multiple hard-control effects.
- Heavy Retain or Created-card pressure.
- No low-investment action.
- Variant changes only numbers.
- Excessive personal currencies.
- One apparently dominant Ultimate pathway.
- Multiple high-demand economy ratings.

### Lore-review warnings

Require human review:

- Later-version ability.
- Composite continuity not labeled.
- Hax reduced to ordinary damage.
- Strong character lacks baseline superiority.
- Weak character receives unsupported parity.
- Canonical drawback omitted.
- Immunity inferred only from raw strength.
- Major mechanic has no source-basis record.

## 28. Export manifest v2

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

Do not publish a canonical build from dirty structured data.

## 29. Human-readable generation

Preferred authority order:

1. Structured Rules v2 data.
2. Generated human-readable card and status text.
3. Explicit `displayTextOverride` when generation cannot express intended wording.

Overrides must reference the structured effects they describe. Validation should warn when the override and executable effects appear inconsistent.

Do not parse normal prose to execute gameplay.

## 30. Compatibility doctrine

Adding a new registry entry should not require editing unrelated character files.

Changing old meaning requires:

1. A rules-version or schema-version decision.
2. An ordered migration.
3. Legacy aliases.
4. Affected-content report.
5. Roster regression tests.
6. Updated generated documentation.
7. Changelog documentation.

Never silently reinterpret exported Rules v1 data as Rules v2.