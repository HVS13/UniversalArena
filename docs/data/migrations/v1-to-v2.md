# Rules and Schema Migration: v1 to v2

> **Status:** Approved migration plan, pending implementation.  
> **Source:** Rules v1 / Schema v1.  
> **Target:** Rules v2 / Schema v2.  
> **Requirement:** Do not silently reinterpret v1 exports as v2.

This migration converts the current flat, roster-specific data model into the extensible Rules v2 model while preserving intentional gameplay wherever possible.

## 1. Migration principles

Every migration step must:

1. Be deterministic.
2. Preserve stable IDs when meaning is unchanged.
3. Add aliases when an ID changes.
4. Flag cases that require design judgment.
5. Produce an affected-content report.
6. Run validation before writing current-format data.
7. Record the migration in the export manifest.
8. Avoid changing unrelated cards.

Use separate versions:

```yaml
schemaVersion: 2
rulesVersion: 2
```

A content file is not v2-compliant merely because its shape was updated. It must also use v2 gameplay semantics.

## 2. Migration execution order

Apply in this order:

1. Add version fields and stable identity fields.
2. Split flat classifications.
3. Migrate Electric to Property.
4. Migrate roles into Core Roles, Archetypes, and Capability Tags.
5. Add explicit ownership.
6. Normalize card lifecycle and Exhaust.
7. Normalize targeting, area, and Bounce.
8. Add Ultimate pathways.
9. Type Unique statuses and continuous behavior.
10. Expand conditions, effects, and event scopes.
11. Migrate Stun, Taunt, Cover, and position semantics.
12. Add defeat, Defeat Reserve, and Resurrection defaults.
13. Add source-boundary and design-review metadata.
14. Run roster-specific review and regression tests.
15. Generate current human-readable documentation.

## 3. Add version and identity fields

### Before

```yaml
id: monkey-d-luffy-pre-timeskip
name: Monkey D. Luffy
version: Pre-Timeskip
```

### After

```yaml
schemaVersion: 2
rulesVersion: 2
id: monkey-d-luffy-pre-timeskip
characterId: monkey-d-luffy
versionId: pre-timeskip
name: Monkey D. Luffy
version: Pre-Timeskip
```

Migration may derive `characterId` and `versionId`, but authors must verify identity grouping and aliases.

## 4. Split the flat `types` array

Rules v1 stores action, damage, range, area, attack, and effect classifications in one list.

### Before

```yaml
types:
  - Technique
  - Attack
  - Physical
  - Ranged
  - Splash
  - Pierce
  - Debuff
```

### After

```yaml
actionTypes:
  - action-technique
  - action-attack
damageTypes:
  - damage-physical
properties: []
range: range-ranged
area:
  kind: area-splash
attackTags:
  - attack-pierce
effectTags:
  - effect-debuff
```

Unknown or ambiguous legacy types block automatic migration.

## 5. Electric Damage Type to Electric Property

Rules v1 treats Electric as a Damage Type. Rules v2 treats Electric as a Property.

### Card migration

```yaml
# Before
types:
  - Electric

# After
properties:
  - property-electric
```

The card still requires a broad Damage Type chosen from:

- Physical.
- Energy.
- Magical.
- Mental.
- Spiritual.

This choice is not always automatic.

Suggested review logic:

- Technological electricity: usually Energy + Electric.
- Magical lightning: usually Magical + Electric.
- Electrified physical weapon: usually Physical + Electric.
- Direct nervous-system or psychic interpretation: requires individual review.

### Mitigation migration

Luffy's legacy `Immune (Electric)` becomes Damage Immunity filtered by the Electric Property.

```yaml
kind: immune
include:
  mode: any
  properties:
    - property-electric
```

Preserve temporary alias:

```yaml
aliases:
  card-type-electric: property-electric
```

Validation blocks active v2 data that still classifies Electric as a Damage Type.

## 6. Role migration

Rules v1 uses one flat role list containing both team functions and combat methods.

Rules v2 uses:

- One Primary Core Role.
- Optional Secondary Core Role.
- Zero to two Combat Archetypes.
- Capability Tags.

### Direct ID aliases

```yaml
role-defender -> role-guardian
```

### Review-required mappings

- `role-assassin` may become Core Role `role-eliminator`, Archetype `archetype-assassin`, or both.
- `role-bruiser` becomes `archetype-bruiser`; choose an appropriate Core Role.
- `role-skirmisher` becomes `archetype-skirmisher`; choose an appropriate Core Role.
- `role-artillery` becomes `archetype-artillery`; choose an appropriate Core Role.
- `role-summoner` becomes `archetype-summoner`; choose an appropriate Core Role.

### Preserved Core Role mappings

- role-vanguard.
- role-striker.
- role-controller.
- role-support.

`role-specialist` and other new IDs are additive.

Do not derive Primary Role solely from list order without roster review.

## 7. Explicit ownership

### Starting cards and Ultimates

Add:

```yaml
owner:
  kind: character
  characterId: <character-version-id>
```

### Created cards

Default:

```yaml
owner:
  kind: inherited
  inheritedFrom: source_character
```

Review Created cards that are:

- Team-owned.
- Ally-owned.
- Summon-owned.
- Scenario-owned.
- Intended to survive source defeat.

Ownership migration must complete before defeat and Resurrection migration.

## 8. Basic naming and composition

Rules v1 authoring guidance mandates Strike + Defend and generic names.

Rules v2 retains exactly two Basics but removes those requirements.

Migration does **not** automatically rename existing cards. Existing Strike and Defend cards remain valid names when appropriate.

Roster audit must determine whether each Basic:

- Is a meaningful canonical action.
- Expresses the character's floor.
- Should retain its name.
- Should be renamed without changing slot identity.
- Should change action category while remaining a Basic.

Stable `slotId` prevents name changes from breaking references.

## 9. Exhaust semantics

### Rules v1

Exhaust removes the card when played.

### Rules v2

Exhaust sends the card to the Exhausted area after its current resolution.

### Migration

```yaml
lifecycle:
  afterResolution: destination-exhaust
```

Every existing Exhaust card requires a semantic review:

- If the intent is one-use-after-resolution, use v2 Exhaust.
- If the intent is removal immediately On Play, replace with an explicit immediate-removal effect or lifecycle field.

Do not automatically change behavior without this review.

Ethereal remains unused-card Exhaust at Turn End and inherits v2 Exhaust destination behavior.

## 10. Bounce normalization

Legacy bare Bounce means Bounce 1.

```yaml
area:
  kind: area-bounce
  count:
    kind: flat
    value: 1
  anchor: final_primary_position
  selection: random
  replacement: true
  recalculateEligibility: each_application
```

Legacy `Bounce X` migrates its count expression.

Rules v2 Bounce:

- Uses the final primary target's locked position.
- Selects adjacent eligible characters.
- Uses replacement by default.
- Is not a chain from the last target.

Cards intended to chain require a new area kind and manual review.

## 11. Splash normalization

Legacy Splash migrates to:

```yaml
area:
  kind: area-splash
  anchor: final_primary_position
  radius: 1
  snapshot: on_use
  targetBatch: simultaneous
```

Rules v2 Splash affects the primary target plus all occupied adjacent positions on the target's team line.

Audit any legacy implementation that affected only one random or chosen adjacent character.

## 12. AoE and roll modes

Add explicit resolution metadata.

Default area behavior:

```yaml
resolution:
  useRollMode: per_hit_shared_targets
  targetBatch: simultaneous
```

Cards intended to roll separately per target must opt into `per_target`.

No v1 behavior should be guessed when gameplay logs or card text are ambiguous; flag for review.

## 13. Multihit migration

Convert implicit printed behavior into explicit state:

```yaml
multihit:
  startingCount: 6
  clashMode: sum_remaining_hits
  onAttackClashLoss:
    reduceCount: 1
    destination: reuse
  onTie:
    behavior: normal_cancel
  atZero:
    behavior: ordinary_single_hit_attack
```

Add explicit divisor semantics:

- Legacy numeric divisor remains fixed.
- Only text explicitly referencing remaining Count migrates to a live divisor.

Separate Clash Rolls from Use Rolls in Rules v2 tests.

## 14. Target-lock migration

Legacy character targets migrate to:

```yaml
target:
  kind: character
  lockMode: character
```

Legacy position-specific effects migrate to `lockMode: position`.

Manual review is required when prose implies:

- Ground-targeted attacks.
- Traps.
- Delayed zones.
- Projectiles that should miss after movement.
- Retargeting.

Default character-target migration follows the character and recalculates Distance at resolution.

## 15. Cover migration

Current Cover is close to Rules v2 and should preserve:

- Before Use interception.
- Single-target Attack scope.
- Adjacent and All variants.
- Defender choice among eligible covers.
- Splash and Bounce recentering.
- AoE immunity.

Update Attack-versus-Defense behavior so the protected character becomes the Attack target if legal and Distance is recalculated to that protected target.

Regression tests must cover:

- Cover before an Attack Use Roll.
- Splash recentering.
- Bounce recentering.
- Illegal protected target.
- Multiple Cover effects.
- AoE unaffected.

## 16. Taunt migration

Legacy unscoped Taunt becomes:

```yaml
scope: all
```

or registry ID `status-taunt-all` according to implementation design.

New scoped forms:

- Taunt (Attack).
- Taunt (Special).
- Taunt (All).

Do not silently narrow legacy Taunt.

## 17. Stun migration

### Rules v1 ambiguity

`Turn Start: Skip the turn.`

### Rules v2 meaning

At the affected team's next Turn Start, the affected character is Stunned for that team turn:

- It cannot play its owned cards.
- It cannot move or participate in Reposition.
- Other allied characters may act.
- Already-played cards still resolve.
- Mandatory Innates and status effects continue unless stated.
- Stun expires at Turn End.

Migrate global Stun to typed rules rather than prose.

Review all cards that apply Stun to determine whether they intended:

- One-character Stun.
- Full-team denial.
- Current-round denial.
- Both current-round denial and next-turn Stun.

DIO's Time Stop intentionally retains current-round team card denial and applies Stun to all enemies for the next turn.

## 18. Ultimate pathways

Group every Ultimate card into a pathway.

### Single Ultimate

```yaml
ultimatePathways:
  - id: primary-ultimate
    lifecycle:
      kind: repeatable
    variants:
      - cardId: <ultimate-card-id>
```

### State variants

Luffy's Jet Gatling and Gigant Rifle become variants of one Gear Finisher pathway.

Leon’s purchase and firing states become one pathway.

Saitama's multiple options require manual review to determine how many separately available pathways exist and whether names and costs are canonical and coherent.

Migration must preserve:

- Existing availability conditions.
- Paid cost behavior.
- Return-to-Ultimate-area default.

Add lifecycle review for once-per-game, replacement, resource-gated, and lockout behavior.

## 19. Unique status typing

Rules v1 character Unique statuses often contain executable behavior in display `lines`.

Rules v2 requires the same typed rule structure as global statuses.

Migration steps:

1. Preserve display lines as temporary copy.
2. Convert every executable line into typed status rules.
3. Add mode, caps, persistence, visibility, and removal behavior.
4. Validate that no required behavior remains prose-only.
5. Generate display text from structured rules or use a reviewed override.

Priority roster cases include:

- DIO's Stolen Blood, Blood Focus, and Time Stop.
- Light's Stolen Information and Death by Death Note.
- Luffy's Gear states and Deflate.
- Leon's equipment and ammunition.
- Saitama's state progression.
- Naruto's clone resources.
- Ichigo's Reiatsu.
- Rover's unique resources.

## 20. Condition expansion

Rules v1 transform conditions support only self/target status present or missing.

Rules v2 adds typed conditions for:

- HP thresholds.
- Status comparisons.
- Position, Distance, adjacency, opposed state.
- Defeated allies.
- Form and equipment.
- Match flags.
- Amount paid or spent.
- Previous events.
- Target legality.

Existing conditions migrate directly. New fields must not change old conditions' evaluation timing.

## 21. Effect scopes and stable effect IDs

Add stable `id` and explicit `scope` to every effect.

Suggested migration defaults:

- On Play display line: once_per_play.
- Target-facing On Use: per_target.
- On Hit: per_hit_per_target.
- After Use: once_per_use.
- Existing `once per use` prose: once_per_use.

Automatic migration must flag ambiguous resource gains or self-effects on AoE and Multihit cards.

Example risk:

- `On Hit: Gain 1 Resource` may intentionally trigger per hit.
- `Once per use, if target has Stun: Gain 2 Resource` must not trigger per hit.

DIO's Muda Barrage and Throwing Knives require explicit scope review.

## 22. Defeat Reserve and card removal

Add a public Defeat Reserve as the default destination for recoverable starting cards.

On owner defeat:

- Starting regular cards from all active zones move to Defeat Reserve.
- Ultimate pathways become unavailable and are associated with Defeat Reserve.
- Created cards follow their own lifecycle.
- Exhausted cards remain Exhausted.
- The currently resolving card enters Defeat Reserve after resolution unless replaced.

No immediate replacement draw occurs.

Migration must add ownership first so cards can be collected reliably.

## 23. Resurrection defaults

Existing Resurrection effects require review because Rules v1 leaves restoration details open.

Every v2 Resurrection must specify HP.

Default:

- Choose an empty allied position.
- Set specified HP.
- Return five starting cards to the Discard Pile.
- Restore Ultimate pathways.
- Do not restore Created or Exhausted cards.
- Clear statuses, Shield, Barrier, forms, and resources unless specified.
- Preserve once-per-game and irreversible match records.
- Do not repeat Start of Match effects.

Any existing Resurrection card without explicit HP blocks migration.

## 24. Movement and Reposition

Rename player-facing generic Movement swap action to Reposition.

Preserve one free team action and 1 Energy for additional actions.

Rules v2 Reposition permits:

- Adjacent ally swap.
- Move into adjacent empty position.

Update Push and Pull to enter empty positions, swap through occupied positions, stop at edges, and fail against Root.

Audit documentation and engine code for assumptions that defeated positions compress.

## 25. `Becomes` timing

Existing automatic transforms remain automatic.

Rules v2 migration adds explicit semantics:

- Reevaluate between timing steps.
- Do not reevaluate mid-effect block.
- Preserve paid cost, Meter gained, X, user, target, and zone.
- Use current unresolved definition for name, classifications, Power, and effects.

Add transform priority and cycle validation.

## 26. Display text authority

Rules v1 manually duplicates `effect` display text and `effects` structured behavior.

Rules v2 migration preference:

1. Structured effects are authoritative.
2. Generate normal display text.
3. Preserve authored text in `displayTextOverride` only when required.
4. Link overrides to represented effect IDs.
5. Warn when override and structure diverge.

During migration, do not discard current display text until generated output has been compared.

## 27. Source and design metadata

Add placeholders first, then complete during roster audit:

```yaml
sourceBoundary: {}
design: {}
sourceBasis: []
consideredButOmitted: []
economyProfile: {}
synergy: {}
```

These fields may initially produce warnings rather than block structural migration, but a character is not authoring-complete until they are reviewed.

## 28. Registry alias file

Maintain temporary aliases:

```yaml
aliases:
  card-type-electric: property-electric
  role-defender: role-guardian
  legacy-bounce: area-bounce-1
```

Aliases must include:

- Source version.
- Target ID.
- Deprecation date or version.
- Removal target version.
- Whether mapping is automatic or review-required.

Do not keep aliases indefinitely without review.

## 29. Required migration reports

Generate:

- Files migrated.
- IDs added.
- IDs aliased.
- Ambiguous mappings.
- Cards requiring Damage Type review.
- Role assignments requiring review.
- Exhaust cards requiring semantic review.
- Unstructured Unique statuses.
- Ultimates without pathways.
- Effects with inferred scopes.
- Resurrection effects missing HP.
- Cards using old target or area assumptions.
- Power and behavior regression differences.

## 30. Regression test matrix

At minimum, test:

### Combat

- Ordinary Attack clash.
- Multihit win, loss, repeated loss, tie, and zero Count.
- Clash Rolls separate from Use Rolls.
- Defense-first Attack-versus-Defense.
- Right-card-first Any-versus-Special and Defense-versus-Defense.
- Defeat removing a scheduled but unused paired card.

### Targeting and position

- Character target follows movement.
- Position target remains fixed.
- Redirect and Cover target-change cap.
- Cover recalculates Distance.
- Empty positions break adjacency.
- Reposition into empty position.
- Push and Pull through occupied and empty positions.

### Area

- Edge and center Splash.
- Splash after Redirect and Cover.
- Bounce 1 and repeated Bounce with replacement.
- Primary target defeated before later Bounce.
- AoE unaffected by Redirect and Cover.
- Shared per-hit roll across targets.

### Statuses

- Potency + Count initial application and reapplication.
- Reduction before gain.
- Expiry consequence before removal.
- Unique status immunity to generic removal.
- Source defeat preserving independent external statuses.
- Stun affecting only the owned character's actions.

### Lifecycle

- Exhaust after resolution.
- Ethereal at Turn End.
- Ultimate return to pathway area.
- Owner defeat moving cards to Defeat Reserve.
- Resurrection restoring starting cards to Discard.
- Created and Exhausted cards not restored.

### Economy

- Meter from Energy actually paid.
- Cost reduction and increase.
- Effect-time Energy spending produces no Meter.
- Draw toward five with Retain.
- Defeat during Turn Start before draw completes.

### Lore mechanics

- DIO Time Stop denial and Stun stages.
- Light Death Note countdown surviving source defeat when appropriate.
- Luffy Gear variants and Deflate.
- Character-specific defeat replacement.

## 31. Completion criteria

The v1-to-v2 migration is complete only when:

- All active structured files declare v2 versions.
- No Electric Damage Type remains.
- Every card has explicit ownership.
- Every character has layered role metadata.
- Every Ultimate belongs to a pathway.
- Every Unique status has typed behavior.
- Every effect has stable ID, timing, and scope.
- Exhaust uses v2 destination semantics.
- Target and area behavior are explicit.
- Defeat Reserve and Resurrection defaults are implemented.
- Required aliases and migration records exist.
- All blocking validation passes.
- Roster-specific lore and feel review is complete.
- Generated documentation matches structured behavior.
- Regression tests pass against approved Rules v2 decisions.