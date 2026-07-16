# Structured Effect Conditions

This page defines the supported `condition` objects for structured card effects.

Conditions are evaluated in addition to an effect's `timing`. Keep resolution timing such as `on_hit` or `after_use` in the `timing` field; do not duplicate timing inside the condition.

Each structured effect currently accepts one condition.

## Status conditions

Existing status conditions remain supported:

```yml
condition:
  kind: target_has_status
  status: Stun
```

Supported status condition kinds:

- `self_has_status`
- `self_missing_status`
- `target_has_status`
- `target_missing_status`

A status condition requires a non-empty `status`. Existing numeric fields such as `min` may further constrain the required status amount.

## Play-window conditions

Use `play_window` when an effect applies only because the card was played in a particular window:

```yml
- timing: on_use
  type: inflict_status
  status: Stun
  amount:
    kind: flat
    value: 1
  condition:
    kind: play_window
    window: follow_up
```

Supported windows:

- `assist_attack`
- `follow_up`
- `after_use`

A play-window condition changes whether that individual effect applies. It does not replace a card-level `require_window` or `forbid_window` restriction.

## Scalar comparison conditions

Use `compare` when an effect depends on a numeric expression:

```yml
- timing: on_hit
  type: inflict_status
  status: Stun
  amount:
    kind: flat
    value: 1
  condition:
    kind: compare
    left:
      kind: x
    operator: eq
    right: 3
```

Supported comparison operators:

- `eq`
- `ne`
- `lt`
- `lte`
- `gt`
- `gte`

Each operand may be a number or a scalar expression object using:

- `x`
- `x_plus`
- `x_minus`
- `x_times`

Non-`x` scalar expressions require a numeric `value`.

## Transform conditions

Card transforms remain limited to status conditions. `play_window` and `compare` are effect-only condition kinds and must not be used in `transforms`.

## Validation

Run from `docs/scripts`:

```powershell
npm run validate
```

Validation checks:

- condition objects use a supported kind;
- required status, window, operator, and operands are present;
- scalar operands use a supported shape;
- transform conditions remain status-only;
- supported conditional status wording has matching structured data.

The completeness check currently recognizes these human-readable patterns:

```text
On Follow-Up: Inflict N Status.
On Follow-Up: Gain N Status.
On Hit: If X is N: Inflict M Status.
On Hit: If X is N: Gain M Status.
```

Human-readable card text remains display copy. The engine and exported data must consume the structured condition rather than parse these sentences at runtime.
