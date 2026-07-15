# Roster Audit Checklist

> **Status:** Approved review checklist for Rules v2.  
> **Use with:** [Design Principles](design-principles.md), [Character Authoring Framework](character-authoring-framework.md), [Rules v2 Decisions](rules-v2-decisions.md), and [Schema v2](../data/schema-v2.md).

Use this checklist for every existing character, new character, version update, and major redesign.

A checkmark means the item was actively reviewed. It does not mean the character was forced toward conventional balance.

## 1. Audit header

```yaml
audit:
  characterId: ""
  versionId: ""
  auditedAgainstSchemaVersion: 2
  auditedAgainstRulesVersion: 2
  reviewer: ""
  date: ""
  result: pass | pass_with_warnings | revise | blocked
  unresolvedQuestions: []
```

## 2. Canonical boundary

- [ ] Continuity or adaptation is named.
- [ ] Source period has a clear start and end.
- [ ] Baseline form, condition, equipment, knowledge, and personality are defined.
- [ ] Accessible transformations and equipment are listed.
- [ ] Later-version abilities are excluded unless explicitly composite.
- [ ] Temporary or borrowed powers preserve their conditions and rarity.
- [ ] Exceptional feats preserve their circumstances.
- [ ] Primary sources support major mechanics.
- [ ] Uncertain interpretations are recorded.
- [ ] Considered-but-omitted abilities are documented.

### Blockers

- Later ability leakage without an explicit composite version.
- Major mechanic based only on unsupported fan interpretation.
- Version label that does not define a usable boundary.

## 3. Character feel

- [ ] The one-sentence winning thesis describes meaningful decisions.
- [ ] The weakness is visible and source-appropriate.
- [ ] Mandatory feel points are written.
- [ ] Forbidden feel outcomes are written.
- [ ] The character would still be recognizable without name or art.
- [ ] The gameplay rhythm matches the character's behavior.
- [ ] Signature techniques and gimmicks retain their defining function.
- [ ] Canonical limitations and aftermaths appear.
- [ ] Personality, restraint, recklessness, or tactics matter where appropriate.

### Lore-first questions

- Does the character feel correct before using an Ultimate?
- Does the player make decisions the character would plausibly make?
- Is the strongest moment earned through a faithful route?
- Has any hax been reduced into generic damage or a small modifier?
- Has any reliable ability been given arbitrary randomness?

## 4. Power disparity

- [ ] Ordinary Power and durability reflect the selected version.
- [ ] A vastly strong character is not artificially normalized.
- [ ] A weak character is not given unsupported duel parity.
- [ ] Higher Power is not treated as universal hax resistance.
- [ ] Any resistance or immunity has source support.
- [ ] Major benchmark deviations are documented.
- [ ] Strong Basics are permitted when canonically appropriate.
- [ ] Weak-character contribution comes from appropriate utility, efficiency, preparation, or niche value.

### Review warning

If the character is canonically overwhelming but plays like a normal unit until the Ultimate, revise the baseline kit.

## 5. Kit structure

- [ ] Exactly two Basics are present.
- [ ] Exactly three Techniques are present.
- [ ] At least one Ultimate pathway is present.
- [ ] Basics use canonical names where possible.
- [ ] Basics provide a credible foundational floor.
- [ ] The kit has a credible survival plan.
- [ ] Every Technique has a distinct gameplay job.
- [ ] The five cards form a coherent loop or decision structure.
- [ ] Innates represent continuous truths rather than hidden Techniques.
- [ ] Created cards are justified by preparation, temporariness, conditional breadth, summons, equipment, or similar needs.
- [ ] `Becomes` represents a genuine state change.
- [ ] Variants change decisions, not only numbers.
- [ ] Omitted famous actions were considered rather than forgotten.

### Starting-state usability

- [ ] Normally at least three regular cards are broadly usable from baseline.
- [ ] Restricted cards have access, replacement, retention, disposal, or payoff support.
- [ ] The character is not completely nonfunctional when one setup card is not drawn.

## 6. Cards and ownership

For every card:

- [ ] Stable card ID exists.
- [ ] Stable slot ID exists.
- [ ] Owner is explicit.
- [ ] Display name is canonical or justified.
- [ ] Cost is structured.
- [ ] Play-time X and choices are defined.
- [ ] Speed has a character- and action-based reason.
- [ ] Action Types are separated from Damage Types, Properties, range, area, Attack Tags, and Effect Tags.
- [ ] Target kind and lock mode are explicit.
- [ ] Lifecycle destinations are explicit.
- [ ] Effect IDs, timings, and scopes are explicit.
- [ ] Conditions have defined evaluation timing.
- [ ] Source basis is linked.

## 7. Damage and hax classification

- [ ] Broad Damage Types use Physical, Energy, Magical, Mental, or Spiritual.
- [ ] Electric is a Property, not a Damage Type.
- [ ] Additional Properties are mechanically or canonically useful.
- [ ] Multiple Damage Types are used only when each matters.
- [ ] Slash, Pierce, and Blunt are not treated as automatic bypasses.
- [ ] Hax uses explicit mechanics instead of forced damage where appropriate.
- [ ] Direct HP loss is used only for genuine bypass or cost behavior.
- [ ] Damage Immunity is not incorrectly treated as Status or Effect Immunity.
- [ ] Source-system negation is scoped precisely.

### Crossover questions

- Does minimal equalization allow the match without equating all power systems?
- Is a resistance inferred from actual evidence rather than genre assumptions?
- Can both characters retain their identity in the proposed interaction?

## 8. Power, cost, and Speed

- [ ] Power benchmark has been calculated.
- [ ] Total output includes damage, Shield, healing, statuses, area, card access, and future value.
- [ ] Narrow requirements or severe commitments justify upward deviations.
- [ ] Utility and area are considered without automatically erasing lore superiority.
- [ ] Ordinary attacks generally fit the intended defeat cadence unless intentionally exceptional.
- [ ] Fast reflects response window or low commitment, not only movement-speed ranking.
- [ ] Slow reflects preparation, commitment, or exposure.
- [ ] Extremely fast characters have sufficient Fast pathways, Follow-Up, Counter, Evade, Haste, or denial.
- [ ] A slow character's Fast action has a source-supported reason.

## 9. Statuses and resources

For every status:

- [ ] Stable status ID exists.
- [ ] Type is Positive, Negative, or Unique.
- [ ] Mode is binary, Stack, Value, or Potency + Count.
- [ ] Each number represents one coherent fictional concept.
- [ ] Caps are reachable and meaningful.
- [ ] Gain and loss paths are defined.
- [ ] Trigger and consumption timing are explicit.
- [ ] Zero and expiry behavior are explicit.
- [ ] Visibility is explicit.
- [ ] Defeat persistence is explicit.
- [ ] Source-defeat linkage is explicit.
- [ ] Generic Cleanse, Dispel, and Purge eligibility is explicit.
- [ ] Executable behavior is typed rather than prose-only.

### Potency + Count

- [ ] Potency represents strength.
- [ ] Count represents persistence or activations.
- [ ] Initial application sets Count 1 unless explicit.
- [ ] Reapplication changes Potency but not Count unless explicit.
- [ ] Count consumption is status-specific and documented.

### Personal engines

- [ ] Transformation state is separate from fuel when both matter.
- [ ] Equipment state is separate from ammunition.
- [ ] Countdown-to-expiry is separate from countdown-to-consequence.
- [ ] Personal resources are not generically transferable.
- [ ] Unique status generic-removal immunity is intentional.

## 10. Transformations and `Becomes`

- [ ] Transformation entry is available in every intended state.
- [ ] Form changes affect decisions, not only statistics.
- [ ] Form costs, duration, fuel, and aftermath reflect the source.
- [ ] Transformation does not implicitly heal, cleanse, reposition, restore resources, or recover cards.
- [ ] Max-HP changes state whether current HP also changes.
- [ ] `Becomes` replacements are automatic.
- [ ] Replacement priority is unambiguous.
- [ ] No transform cycles exist.
- [ ] Locked cost, X, user, target, and zone remain stable.
- [ ] Every reachable state has understandable card behavior.

## 11. Ultimates

For every pathway:

- [ ] Stable pathway ID exists.
- [ ] All variants are grouped correctly.
- [ ] Availability conditions are typed.
- [ ] Lifecycle is explicit.
- [ ] Paid cost and readiness are checked on play.
- [ ] Return destination is explicit.
- [ ] Mixed Energy and Meter costs generate Meter correctly.
- [ ] Failed, Cancelled, or Negated use has no assumed refund.
- [ ] The pathway changes decisions or produces a true climax.
- [ ] Multiple pathways are genuinely distinct.
- [ ] No pathway is unintentionally strictly dominant.
- [ ] The character remains authentic outside its Ultimate.

## 12. Targeting and positioning

- [ ] Character-targeted effects follow the character through movement.
- [ ] Position-targeted effects remain locked to the position.
- [ ] Target failure behavior is explicit.
- [ ] Play restrictions are not accidentally rechecked at Use.
- [ ] Distance uses current positions at the required timing.
- [ ] Empty columns remain and break adjacency.
- [ ] Reposition behavior is compatible with the card.
- [ ] Push, Pull, and Root interactions are defined.
- [ ] Movement-sensitive misses use explicit text.

### Protection

- [ ] Defense target is the protected character.
- [ ] Attack-versus-Defense recalculates Distance to the protected character.
- [ ] Cover eligibility and scope are explicit.
- [ ] Taunt scope is Attack, Special, or All.
- [ ] Redirect, Cover, and equivalent target changes respect the one-change default.
- [ ] AoE ignores ordinary Cover and Redirect.

## 13. Timing and lifecycle

- [ ] On Play, Before Clash, After Clash, Before Use, On Use, On Hit, and After Use are used correctly.
- [ ] Continuous rules are not modeled as a final `Always` event.
- [ ] Cancelled and Negated behavior is understood.
- [ ] Right-card-first default is compatible with paired effects.
- [ ] Attack-versus-Defense remains Defense first.
- [ ] Follow-Up and Assist Attack use one response window.
- [ ] Counter replaces the relevant Follow-Up/Assist window.
- [ ] Exhaust occurs after resolution.
- [ ] Ethereal and Retain destinations are correct.
- [ ] Ultimate return or replacement lifecycle is correct.

## 14. Multihit and area

### Multihit

- [ ] Starting Count is explicit.
- [ ] Clash Total sums remaining-hit Clash Rolls.
- [ ] Clash Rolls are separate from Use Rolls.
- [ ] Loss reduces Count by one and Reuses.
- [ ] Tie uses normal cancellation unless explicit.
- [ ] Zero Count becomes an ordinary one-hit Attack.
- [ ] Divisor is fixed or remaining-count-based intentionally.
- [ ] Per-hit triggers have correct scope.
- [ ] Flat Resist interaction is understood.

### AoE

- [ ] Targeted area is explicit.
- [ ] Shared-per-hit or per-target roll mode is explicit.
- [ ] Target batch is simultaneous when intended.
- [ ] Redirect and Cover immunity is correct.

### Splash

- [ ] Final primary position is the center.
- [ ] All occupied adjacent positions are included.
- [ ] Empty positions are handled correctly.
- [ ] Snapshot timing is explicit.
- [ ] Redirect and Cover recenter Splash.

### Bounce

- [ ] Bounce count is explicit.
- [ ] Anchor is final primary position.
- [ ] Replacement behavior is explicit.
- [ ] Eligibility is recalculated at the correct time.
- [ ] Repeated hits on the same target are allowed or prohibited intentionally.
- [ ] The mechanic is not accidentally a Chain.

## 15. Randomness and mathematics

- [ ] Random eligibility is defined at selection time.
- [ ] Selection is uniform unless weighted.
- [ ] Repeated selection replacement is explicit.
- [ ] No-eligible behavior is explicit.
- [ ] Randomness reflects the character rather than arbitrary balance.
- [ ] Printed Power, Raw Roll, Adjusted Power, Clash Total, and damage instances are distinguished.
- [ ] Rounding occurs at named stages.
- [ ] Opposed modifiers are grouped correctly.
- [ ] Clamping occurs after the applicable calculation stage.
- [ ] Locked values and live values are not confused.

## 16. Healing, defeat, and Resurrection

### Healing

- [ ] Positive HP restoration counts as healing unless explicit.
- [ ] Wither and Wound order is correct.
- [ ] Excess healing behavior is explicit if referenced.
- [ ] On Heal and On HP Restored scopes are correct if used.
- [ ] Healing cannot target defeated characters.

### Max HP

- [ ] Max-HP increase states whether current HP also increases.
- [ ] Max-HP decrease clamps current HP.
- [ ] Expiry does not restore missing HP.
- [ ] Reaching max HP 0 requires explicit permission.

### Defeat

- [ ] Would-be-defeated replacements are typed.
- [ ] Current atomic use finishes before final defeat.
- [ ] Other unresolved owned cards are removed.
- [ ] Starting cards move to Defeat Reserve.
- [ ] Created and Exhausted card handling is explicit.
- [ ] External statuses survive source defeat when appropriate.
- [ ] Victory is checked after the complete current effect.

### Resurrection

- [ ] Returned HP is specified.
- [ ] Position selection is legal.
- [ ] Starting cards return to the intended destination.
- [ ] Ultimate pathways return correctly.
- [ ] Created and Exhausted cards are or are not restored intentionally.
- [ ] Statuses, forms, equipment, and resources are handled explicitly.
- [ ] Once-per-game and irreversible records remain spent.
- [ ] Start-of-Match effects do not repeat.

### Sacrifice and HP costs

- [ ] Sacrifice is distinguished from damage and HP loss.
- [ ] Sacrifice costs require successful defeat.
- [ ] HP payment requires full payment.
- [ ] Lethal HP payment is explicit when allowed.

## 17. Counterplay and interaction profile

For each major effect:

- [ ] Visible setup is documented.
- [ ] Resource commitment is documented.
- [ ] Response windows are documented.
- [ ] Target protection options are documented.
- [ ] Position requirements are documented.
- [ ] Source vulnerability is documented.
- [ ] Duration or fuel is documented.
- [ ] Aftermath is documented.
- [ ] Canonical counters are documented.
- [ ] Intentional oppression is documented.

### Warning signs

- Instant defeat with no visible prior condition.
- Repeatable low-cost full-team denial.
- Permanent control with no persistence rules.
- A Slow Special called interruptible despite no actual interruption route.
- Several independent hard locks in one starting five.
- Hidden setup progress.
- Transformation with no cost, vulnerability, duration, or opportunity cost despite source limitations.
- Broad immunity with no source support.
- A loop that reapplies hard control before meaningful action.
- A generic counter that deletes the target's central identity.

Warnings require review, not automatic prohibition.

## 18. Shared economy and lineup compatibility

- [ ] Energy demand rating is accurate.
- [ ] Meter demand rating is accurate.
- [ ] Hand pressure rating is accurate.
- [ ] Setup speed rating is accurate.
- [ ] The character has a useful low-investment action when appropriate.
- [ ] Retain does not unintentionally clog the shared hand.
- [ ] Created cards do not overwhelm deck circulation.
- [ ] Personal engine creates team-facing value.
- [ ] Ultimate does not automatically monopolize all Meter.
- [ ] The character can function beside other high-demand characters or is clearly marked as conflicting.
- [ ] The team remains functional after another character's defeat.
- [ ] Surviving characters do not depend on a dead owner's unavailable personal status unless intentional.

## 19. Structured-data integrity

- [ ] Structured data fully describes executable behavior.
- [ ] Display prose does not contain unstructured required mechanics.
- [ ] Display overrides reference represented effect IDs.
- [ ] All registry references exist.
- [ ] Deprecated IDs have aliases or are removed.
- [ ] Schema and rules versions are declared.
- [ ] Migration history is recorded.
- [ ] Export manifest is reproducible.
- [ ] Dirty canonical exports are not published.

## 20. Validation result

### Blocking errors

```yaml
blockingErrors: []
```

### Semantic errors

```yaml
semanticErrors: []
```

### Compatibility errors

```yaml
compatibilityErrors: []
```

### Design warnings

```yaml
designWarnings: []
```

### Lore-review warnings

```yaml
loreWarnings: []
```

## 21. Final play-feel verdict

Answer all of these in prose:

1. What should the player feel while using this character?
2. What should the opponent feel while facing them?
3. How does the selected version's power level appear in ordinary turns?
4. What is the defining decision loop?
5. What happens when the character succeeds at its setup?
6. What meaningful decisions exist before, during, or after its strongest effect?
7. Which canonical weakness or limitation is represented?
8. Which major ability was omitted, and why?
9. How does the character contribute to a team without named-pair bonuses?
10. Would a knowledgeable fan consider the result authentic?

A character passes the audit only when the answer to the final question is defensibly yes and all blocking validation is resolved.