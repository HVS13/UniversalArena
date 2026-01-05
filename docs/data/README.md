# Game Data (Source of Truth)

This directory is the canonical source for game data consumed by the web game.
Docs pages remain human-readable; do not rely on parsing prose for runtime logic.

## Layout

- `docs/data/characters/<slug>.yml`
- `docs/data/keywords.yml`
- `docs/data/status-effects.yml`
- `docs/data/terms.yml`
- `docs/data/card-types.yml`
- `docs/data/roles.yml`

## Exporter

The exporter lives in `docs/scripts/` and reads from `docs/data/`.

```powershell
cd docs/scripts
npm install
npm run export
```

Optional overrides:

```powershell
node export-game-data.mjs --out ..\..\..\UniversalArena-Web\packages\data\src --assets-out ..\..\..\UniversalArena-Web\apps\client\public\assets\characters
```

## Character schema (YAML)

```yml
id: kurosaki-ichigo-soul-society
name: Kurosaki Ichigo
version: Soul Society
origin: Bleach
roles:
  - role-striker
  - role-skirmisher
difficulty: Medium
gameplan: >
  One paragraph describing how the character plays.
art: kurosaki-ichigo-soul-society.png
innates:
  - name: Fighting Spirit
    text: The first time each turn this character takes damage to HP from an enemy Attack, gain 1 Reiatsu.
statusEffects:
  - name: Reiatsu
    lines:
      - "Type: Unique."
      - "Max Value: 6."
      - "Turn End: Reduce Value by 1."
      - "Effect: A resource gained through combat exchanges; spent to amplify Getsuga Tensho."
cards:
  - slot: "1-1"
    name: Strike
    cost: 1 Energy
    power: 10-14
    types:
      - Basic
      - Attack
      - Physical
      - Melee
      - Slash
    target: 1 Enemy
    speed: Normal
    effect:
      - Deal Power damage. On Hit: Gain 1 Reiatsu.
createdCards:
  - slot: "created-1"
    name: Shadow Clone: Strike
    cost: 1 Energy
    power: 7-9
    types:
      - Technique
      - Attack
      - Physical
      - Melee
      - Blunt
    target: 1 Enemy
    speed: Fast
    effect:
      - Deal Power damage.
      - Exhaust. Ethereal.
```

### Notes

- `id` must match the filename slug.
- `art` is the filename under `docs/assets/characters/`. The exporter copies it to the game repo.
- `slot` should mirror the docs heading (example: `1`, `1-1`, `3-2`, `ultimate`).
- `cards` includes ultimates. Use `ultimate-1`, `ultimate-2`, etc when a character has multiple ultimates.
- `createdCards` is optional and uses the same card shape for created cards.
- Quote values that contain `:` to avoid YAML parsing issues.
- `effect` preserves the exact sentence order from the docs page.
- `effects` is optional structured data for game rules. Keep `effect` for human-readable text.

## Card effect schema (YAML)

```yml
effects:
  - timing: on_use
    type: deal_damage
    amount:
      kind: power
    hits: 3
  - timing: on_hit
    type: gain_status
    status: Reiatsu
    amount:
      kind: flat
      value: 1
    stat: count
    condition:
      kind: self_has_status
      status: Reiatsu
```

X-scaled amounts and hits:

```yml
effects:
  - timing: on_use
    type: deal_damage
    amount:
      kind: power_div
      divisor:
        kind: x_plus
        value: 1
    hits:
      kind: x_plus
      value: 1
  - timing: on_use
    type: inflict_status
    status: Frail
    amount:
      kind: x
```

Choice effects:

```yml
effects:
  - timing: on_use
    type: choose
    options:
      - label: Gain Gear 2nd
        effects:
          - timing: on_use
            type: gain_status
            status: Gear 2nd
            amount:
              kind: flat
              value: 1
      - label: Gain Gear 3rd
        effects:
          - timing: on_use
            type: gain_status
            status: Gear 3rd
            amount:
              kind: flat
              value: 1
```

Scalar expression kinds: `x`, `x_plus`, `x_minus`, `x_times`. Use a number for fixed values.
Keyword-only effects like Retain can be represented as `type: retain`.

Optional card transforms:

```yml
transforms:
  - condition:
      kind: self_has_status
      status: Kaioken
    cardSlot: "3-2"
```

Condition kinds: `self_has_status`, `self_missing_status`, `target_has_status`,
`target_missing_status`.

## Keyword schema (YAML)

```yml
keywords:
  - id: keyword-evade
    name: Evade
    category: Combat
    tier: Core
    description: "After Clash: If an Attack vs Defense clash would deal 0 Power damage after Shield, that Attack is not a hit. Reuse this card."
```

`tier` is optional; use `Core` or `Advanced` to match the docs breakdown.

## Status effect schema (YAML)

```yml
statusEffects:
  - id: status-bleed
    name: Bleed
    type: Negative
    potencyMax: 10
    countMax: 99
    rules:
      - timing: "Allies' Card Played"
        text: "Take Potency damage. Then increase Potency by Energy spent."
      - timing: "Turn End"
        text: "Reduce Count by Halve."
```

## Term schema (YAML)

```yml
terms:
  - section: Resources
    id: term-energy
    name: Energy
    definition: "The resource used to play cards. By default, at Turn Start each player sets Energy to 5; effects can modify this and there is no Energy cap."
```

## Card type schema (YAML)

```yml
cardTypes:
  - id: card-type-basic
    name: Basic
    category: Action
    description: "A card tagged as Basic for rules and synergies that reference Basic cards."
```

## Role schema (YAML)

```yml
roles:
  - id: role-striker
    name: Striker
    description: "Primary damage dealer focused on securing takedowns."
```

## GitHub Action sync

The docs repo owns the data. The sync workflow exports into the game repo when you push or run it manually.

Required repo settings:
- Repo variable: `UA_GAME_REPO` (example: `YourOrg/UniversalArena-Web`)
- Repo secret: `UA_SYNC_TOKEN` (token with write access to the game repo)
