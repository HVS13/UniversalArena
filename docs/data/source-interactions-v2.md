# Rules v2 Source Interaction Adjudications

> **Status:** Approved schema extension for audited Rules v2 character data.  
> **Structured authority:** `docs/data/rules-v2/source-interactions.yml`.  
> **Transition:** This extension applies only to Rules v2 character files that declare `sourceInteractions`. Active Rules v1 characters remain unchanged.

## Purpose

Source-System Tags classify where an action comes from. They do not, by themselves, answer source-specific questions such as whether the Death Note can affect a target or whether a vampire can feed from it.

`sourceInteractions` records those matchup adjudications explicitly, without creating a universal species chart or pretending unrelated fictional systems are equivalent.

## Registry definition

Each interaction definition has a stable ID and a closed outcome set:

```yaml
- id: interaction-death-note-eligibility
  name: Death Note Target Eligibility
  kind: target_eligibility
  source: Death Note
  outcomes: [eligible, ineligible, uncertain]
  defaultOutcome: uncertain
  rules: []
  deprecated: false
```

`uncertain` is conservative. It does not count as eligible and must be resolved by a version-specific lore audit before an effect may rely on the interaction.

## Character declaration

A character version records only interactions that have been audited or are required by its mechanics:

```yaml
sourceInteractions:
  interaction-death-note-eligibility:
    outcome: ineligible
    reason: "Selected DIO is an undead vampire rather than a living human."
```

The result belongs to that exact character version. A different continuity, form, body, species state, or ownership state may receive a different result.

## Conditions

Cards and effects may require a result explicitly:

```yaml
condition:
  kind: source_interaction_equals
  subject: target
  interactionId: interaction-death-note-eligibility
  outcome: eligible
```

The interaction is checked at the timing declared by the containing restriction or effect. Ordinary target legality, Reveal, Damage Type, Properties, and Source-System Tags do not satisfy it implicitly.

## Required behavior

- Missing or unknown interaction IDs are validation errors when referenced.
- Outcomes outside the definition's closed set are validation errors.
- `uncertain` never silently becomes `eligible`.
- A source interaction creates no universal numerical modifier unless its definition or invoking effect states one.
- A character's result must include a concise source-grounded reason.
- Updating an outcome requires a lore audit and migration note when exported content is affected.

## Initial adjudications

PR #5 introduces four interactions:

- Death Note target eligibility.
- Vampiric feeding eligibility.
- JoJo-vampire sunlight vulnerability.
- JoJo-vampire Ripple vulnerability.

They are intentionally narrow. Future hax systems should add their own explicit interaction definitions instead of overloading these IDs.
