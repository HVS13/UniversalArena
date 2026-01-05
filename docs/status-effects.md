# Status Effects

This page explains what status effects are and how their values work.

??? info "Explanation"
    Status effects are conditions that can be applied to units on either side of a battle through the use of passives, skills, ultimates, and even other status effects.

    A status effect can use up to two values to function, which will be called "modes" here for clarity:

    - **Zero-value mode:** the value is always fixed at 1 and has no inherent effect on the status effect's strength.
    - **Single-value mode:** one value, typically **Stack** or **Value**.
    - **Double-value mode:** two values (**Potency + Count**). Potency determines strength, while Count determines duration.

    **Stack** is a single-value duration that typically reduces at Turn End. **Value** is a single-value resource that is usually reduced or consumed by other effects and may or may not reduce at Turn End.

    Display shorthand: Potency + Count is shown as **P/C**, Stack as **S**, and Value as **V**. Each entry lists its Mode and its Turn End behavior so you can see what ticks down.

    Trigger labels like "Turn Start," "Turn End," "On Gain," "On Hit," "On Damage," "On HP Damage," and "Allies' Card Played" describe when the effect happens. "On Gain" triggers immediately when the status is gained, even during Combat. "Allies' Card Played" triggers whenever any ally (including the user) plays a card.

    If an effect prevents playing cards of a type, any card that lists that type is blocked even if it lists other types.

    "Next Turn Start" means the next time that unit reaches Turn Start, even if the status that created the trigger has expired. If an effect says "When this expires: At your next Turn Start, ...", it creates a delayed trigger that resolves at that next Turn Start.

    In single-value or double-value modes, if one or more values reach 0, the status effect is removed from the unit. When multiple effects at the same timing point would consume and gain status values, apply all reductions or consumptions first, then apply gains or inflictions. If a single effect specifies its own order (example: "Take damage, then reduce Count"), follow that text.

    Status effects also come with a few attributes:

    - **Base Value:** the initial Potency/Count/Stack/Value on infliction if none is specified.
    - **Max Value:** the maximum Potency/Count/Stack/Value (default 99).

    Status effects also have a type: Positive, Negative, or Unique. Unique status effects are character-specific and are documented on the character page only, not in this reference.

    Reapplying a status effect increases its Potency, Count, Stack, or Value up to its cap, following any mode-specific rules below.

    For Potency + Count effects, "Inflict/Gain X" increases Potency by X; if the target has none, set Potency to X and Count to 1. For Stack or Value effects, "Inflict/Gain X" increases Stack or Value by X; if the target has none, set it to X.

    "Halve" means set the current value to half its current value, rounding down.

??? info "Timing order"
    When multiple status effects trigger at the same timing point (Turn Start, Turn End, etc.):

    - Follow any explicit "then" order written on the effect itself.
    - If there is no explicit order between effects, apply them in any order, but apply all reductions or consumptions before any gains or inflictions to the same status effect.
    - After all effects apply, remove any status effect whose value reaches 0.
    - If a specific effect contradicts this order, apply it as written.

??? info "Power modifiers"
    Strength and Weak modify Attack Power. Dexterity and Frail modify Defense Power.

    When both a positive and negative modifier apply, use net Potency (positive - negative).
    Multiply the card's Power min and max by (1 + 0.10 x net Potency), then round down.
    Power cannot go below 0.

??? info "Speed shift"
    Speed modifiers use a step-shift system. Each Potency shifts Speed by 1 step.
    Haste and Slow cancel step-for-step (example: Haste 2 and Slow 1 results in a net +1 step).
    Net shift is capped at 2 steps total. Potency beyond 2 only matters for canceling opposing shifts.
    Haste shifts Slow -> Normal -> Fast. Slow shifts Fast -> Normal -> Slow.

## Reference

Use the filter to quickly locate a mode, rule, or attribute.

<div class="ua-filter">
  <label class="ua-filter__label" for="status-filter">Filter status effects</label>
  <input class="ua-filter__input" type="search" id="status-filter" placeholder="Type to filter..." autocomplete="off" spellcheck="false" />
</div>

### Negative

<div class="ua-entry status-entry" id="status-bleed">
  <p class="ua-entry__title">Bleed</p>
  <p class="ua-entry__meta"><span class="ua-pill">Type</span> Negative.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Mode</span> P/C.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Potency</span> Max 10.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Count</span> Max 99.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Allies' Card Played</span> Take <strong>Potency</strong> damage. Then increase <strong>Potency</strong> by <strong>Energy</strong> spent.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Turn End</span> Reduce <strong>Count</strong> by <strong>Halve</strong>.</p>
</div>

<div class="ua-entry status-entry" id="status-burn">
  <p class="ua-entry__title">Burn</p>
  <p class="ua-entry__meta"><span class="ua-pill">Type</span> Negative.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Mode</span> P/C.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Potency</span> Max 10.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Count</span> Max 99.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Allies' Card Played</span> Take <strong>Potency</strong> damage. Then reduce <strong>Count</strong> by <strong>Energy</strong> spent.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Turn End</span> Take <strong>Potency</strong> damage. Then reduce <strong>Count</strong> by <strong>Halve</strong>.</p>
</div>

<div class="ua-entry status-entry" id="status-disarm">
  <p class="ua-entry__title">Disarm</p>
  <p class="ua-entry__meta"><span class="ua-pill">Type</span> Negative.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Mode</span> S.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Max Stack</span> 10.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Effect</span> You cannot play Physical cards.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Turn End</span> Reduce <strong>Stack</strong> by 1.</p>
</div>

<div class="ua-entry status-entry" id="status-frail">
  <p class="ua-entry__title">Frail</p>
  <p class="ua-entry__meta"><span class="ua-pill">Type</span> Negative.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Mode</span> P/C.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Potency</span> Max 10.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Count</span> Max 99.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Effect</span> Reduce Defense Power by 10% times Potency.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Turn End</span> Reduce <strong>Count</strong> by 1.</p>
</div>

<div class="ua-entry status-entry" id="status-poison">
  <p class="ua-entry__title">Poison</p>
  <p class="ua-entry__meta"><span class="ua-pill">Type</span> Negative.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Mode</span> P/C.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Potency</span> Max 10.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Count</span> Max 99.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Allies' Card Played</span> Increase <strong>Potency</strong> by <strong>Energy</strong> spent.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Turn End</span> Take <strong>Potency</strong> damage. Then reduce <strong>Count</strong> by <strong>Halve</strong>.</p>
</div>

<div class="ua-entry status-entry" id="status-root">
  <p class="ua-entry__title">Root</p>
  <p class="ua-entry__meta"><span class="ua-pill">Type</span> Negative.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Mode</span> S.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Max Stack</span> 10.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Effect</span> You cannot be moved or swapped by any effect, including Push, Pull, Swap, and the Movement Round. If a move or swap would include you, that movement fails; costs are still paid and other effects still resolve.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Turn End</span> Reduce <strong>Stack</strong> by 1.</p>
</div>

<div class="ua-entry status-entry" id="status-seal">
  <p class="ua-entry__title">Seal</p>
  <p class="ua-entry__meta"><span class="ua-pill">Type</span> Negative.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Mode</span> S.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Max Stack</span> 10.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Effect</span> You cannot play Special cards.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Turn End</span> Reduce <strong>Stack</strong> by 1.</p>
</div>

<div class="ua-entry status-entry" id="status-silence">
  <p class="ua-entry__title">Silence</p>
  <p class="ua-entry__meta"><span class="ua-pill">Type</span> Negative.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Mode</span> S.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Max Stack</span> 10.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Effect</span> You cannot play Magical cards.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Turn End</span> Reduce <strong>Stack</strong> by 1.</p>
</div>

<div class="ua-entry status-entry" id="status-slow">
  <p class="ua-entry__title">Slow</p>
  <p class="ua-entry__meta"><span class="ua-pill">Type</span> Negative.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Mode</span> P/C.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Potency</span> Max 10.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Count</span> Max 99.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Effect</span> Reduce the card's Speed by <strong>Potency</strong> steps (Fast -> Normal -> Slow), capped at 2 steps.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Turn End</span> Reduce <strong>Count</strong> by 1.</p>
</div>

<div class="ua-entry status-entry" id="status-spectro-frazzle">
  <p class="ua-entry__title">Spectro Frazzle</p>
  <p class="ua-entry__meta"><span class="ua-pill">Type</span> Negative.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Mode</span> S.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Max Stack</span> 10.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Turn End</span> Inflict damage equal to <strong>5 times Stack</strong>. Then reduce Stack by 1.</p>
</div>

<div class="ua-entry status-entry" id="status-stagger">
  <p class="ua-entry__title">Stagger</p>
  <p class="ua-entry__meta"><span class="ua-pill">Type</span> Negative.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Mode</span> S.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Max Stack</span> 10.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Effect</span> The next time you would play a Defense card, it is Cancelled before Use. Reduce <strong>Stack</strong> by 1.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Turn End</span> Reduce <strong>Stack</strong> by 1.</p>
</div>

<div class="ua-entry status-entry" id="status-strain">
  <p class="ua-entry__title">Strain</p>
  <p class="ua-entry__meta"><span class="ua-pill">Type</span> Negative.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Mode</span> P/C.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Potency</span> Max 10.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Count</span> Max 99.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Effect</span> Increase the Energy cost of this character's cards by <strong>Potency</strong>.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Turn End</span> Reduce <strong>Count</strong> by 1.</p>
</div>

<div class="ua-entry status-entry" id="status-stagnate">
  <p class="ua-entry__title">Stagnate</p>
  <p class="ua-entry__meta"><span class="ua-pill">Type</span> Negative.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Mode</span> V.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Max Value</span> 10.</p>
  <p class="ua-entry__meta"><span class="ua-pill">On Gain</span> Increase the Energy cost of a random card in hand by 1 until that card is used. Repeat <strong>Value</strong> times. Expires.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Turn End</span> No change (expires on gain).</p>
</div>

<div class="ua-entry status-entry" id="status-stun">
  <p class="ua-entry__title">Stun</p>
  <p class="ua-entry__meta"><span class="ua-pill">Type</span> Negative.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Mode</span> S.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Max Stack</span> 1.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Turn Start</span> Skip the turn.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Turn End</span> Expires.</p>
</div>

<div class="ua-entry status-entry" id="status-weak">
  <p class="ua-entry__title">Weak</p>
  <p class="ua-entry__meta"><span class="ua-pill">Type</span> Negative.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Mode</span> P/C.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Potency</span> Max 10.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Count</span> Max 99.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Effect</span> Reduce Attack Power by 10% times Potency.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Turn End</span> Reduce <strong>Count</strong> by 1.</p>
</div>

<div class="ua-entry status-entry" id="status-vulnerable">
  <p class="ua-entry__title">Vulnerable</p>
  <p class="ua-entry__meta"><span class="ua-pill">Type</span> Negative.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Mode</span> P/C.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Potency</span> Max 10.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Count</span> Max 99.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Effect</span> Increase damage taken by 10% times Potency.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Turn End</span> Reduce <strong>Count</strong> by 1.</p>
</div>

<div class="ua-entry status-entry" id="status-wound">
  <p class="ua-entry__title">Wound</p>
  <p class="ua-entry__meta"><span class="ua-pill">Type</span> Negative.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Mode</span> S.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Max Stack</span> 999.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Effect</span> When you would heal HP, reduce that healing by <strong>Stack</strong>. Healing cannot go below 0.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Turn End</span> Reduce <strong>Stack</strong> by 1.</p>
</div>

<div class="ua-entry status-entry" id="status-wither">
  <p class="ua-entry__title">Wither</p>
  <p class="ua-entry__meta"><span class="ua-pill">Type</span> Negative.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Mode</span> S.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Max Stack</span> 999.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Effect</span> When you would heal HP, reduce that healing by <strong>Stack</strong>% of the healing amount. Healing cannot go below 0.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Turn End</span> Reduce <strong>Stack</strong> by 1.</p>
</div>

### Positive

<div class="ua-entry status-entry" id="status-dexterity">
  <p class="ua-entry__title">Dexterity</p>
  <p class="ua-entry__meta"><span class="ua-pill">Type</span> Positive.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Mode</span> P/C.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Potency</span> Max 10.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Count</span> Max 99.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Effect</span> Increase Defense Power by 10% times Potency.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Turn End</span> Reduce <strong>Count</strong> by 1.</p>
</div>

<div class="ua-entry status-entry" id="status-focus">
  <p class="ua-entry__title">Focus</p>
  <p class="ua-entry__meta"><span class="ua-pill">Type</span> Positive.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Mode</span> P/C.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Potency</span> Max 10.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Count</span> Max 99.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Effect</span> Reduce the Energy cost of this character's cards by <strong>Potency</strong> (minimum 0).</p>
  <p class="ua-entry__meta"><span class="ua-pill">Turn End</span> Reduce <strong>Count</strong> by 1.</p>
</div>

<div class="ua-entry status-entry" id="status-fortified">
  <p class="ua-entry__title">Fortified</p>
  <p class="ua-entry__meta"><span class="ua-pill">Type</span> Positive.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Mode</span> P/C.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Potency</span> Max 10.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Count</span> Max 99.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Effect</span> Reduce damage taken by 10% times Potency.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Turn End</span> Reduce <strong>Count</strong> by 1.</p>
</div>

<div class="ua-entry status-entry" id="status-haste">
  <p class="ua-entry__title">Haste</p>
  <p class="ua-entry__meta"><span class="ua-pill">Type</span> Positive.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Mode</span> P/C.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Potency</span> Max 10.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Count</span> Max 99.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Effect</span> Increase the card's Speed by <strong>Potency</strong> steps (Slow -> Normal -> Fast), capped at 2 steps.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Turn End</span> Reduce <strong>Count</strong> by 1.</p>
</div>

<div class="ua-entry status-entry" id="status-strength">
  <p class="ua-entry__title">Strength</p>
  <p class="ua-entry__meta"><span class="ua-pill">Type</span> Positive.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Mode</span> P/C.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Potency</span> Max 10.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Count</span> Max 99.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Effect</span> Increase Attack Power by 10% times Potency.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Turn End</span> Reduce <strong>Count</strong> by 1.</p>
</div>

<div class="ua-entry status-entry" id="status-barrier">
  <p class="ua-entry__title">Barrier</p>
  <p class="ua-entry__meta"><span class="ua-pill">Type</span> Positive.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Mode</span> V.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Max Value</span> 99.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Effect</span> Damage is applied to Shield first, then Barrier, then HP. Reduce <strong>Value</strong> by the damage it absorbs.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Turn End</span> Reduce <strong>Value</strong> by 1.</p>
</div>

<div class="ua-entry status-entry" id="status-invulnerable">
  <p class="ua-entry__title">Invulnerable</p>
  <p class="ua-entry__meta"><span class="ua-pill">Type</span> Positive.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Mode</span> V.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Max Value</span> 99.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Effect</span> All damage becomes 0 before Shield, Barrier, and HP. Attacks against you still count as hits.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Turn End</span> Reduce <strong>Value</strong> by 1.</p>
</div>

<div class="ua-entry status-entry" id="status-regen">
  <p class="ua-entry__title">Regen</p>
  <p class="ua-entry__meta"><span class="ua-pill">Type</span> Positive.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Mode</span> P/C.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Potency</span> Max 999.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Count</span> Max 99.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Turn End</span> Heal HP equal to <strong>Potency</strong>. Then reduce <strong>Count</strong> by 1.</p>
</div>

<div class="ua-entry status-entry" id="status-renewal">
  <p class="ua-entry__title">Renewal</p>
  <p class="ua-entry__meta"><span class="ua-pill">Type</span> Positive.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Mode</span> P/C.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Potency</span> Max 999.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Count</span> Max 99.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Turn End</span> Heal HP equal to <strong>Potency</strong>% of max HP. Then reduce <strong>Count</strong> by 1.</p>
</div>

<div class="ua-entry status-entry" id="status-redirect">
  <p class="ua-entry__title">Redirect</p>
  <p class="ua-entry__meta"><span class="ua-pill">Type</span> Positive.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Mode</span> V.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Max Value</span> 99.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Before Use</span> When a single-target Attack targets an ally, change the target to this character if able and reduce <strong>Value</strong> by 1. Redirect (Adjacent) only applies to adjacent allies; Redirect (All) applies to any ally. Only one Redirect can apply per card use; if multiple apply, the defending player chooses. Redirect does not affect AoE, Splash, Bounce, or random targeting.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Turn End</span> Expires.</p>
</div>

<div class="ua-entry status-entry" id="status-taunt">
  <p class="ua-entry__title">Taunt</p>
  <p class="ua-entry__meta"><span class="ua-pill">Type</span> Positive.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Mode</span> S.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Max Stack</span> 10.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Effect</span> Enemies must choose this character as the target for any single-target enemy effect if able. This does not affect AoE, Splash, Bounce, or random targeting. If multiple enemies have Taunt, choose among them.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Turn End</span> Reduce <strong>Stack</strong> by 1.</p>
</div>

<div class="ua-entry status-entry" id="status-thorns">
  <p class="ua-entry__title">Thorns</p>
  <p class="ua-entry__meta"><span class="ua-pill">Type</span> Positive.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Mode</span> P/C.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Potency</span> Max 10.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Count</span> Max 99.</p>
  <p class="ua-entry__meta"><span class="ua-pill">On Hit</span> When you are hit by an Attack, deal <strong>Potency</strong> damage to the attacker.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Turn End</span> Reduce <strong>Count</strong> by 1.</p>
</div>
