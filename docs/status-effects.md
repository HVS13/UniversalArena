# Status Effects

This page explains what status effects are and how their values work.

??? info "Explanation"
    Status effects are conditions that can be applied to units on either side of a battle through the use of passives, skills, ultimates, and even other status effects.

    A status effect can use up to two values to function, which will be called "modes" here for clarity:

    - **Zero-value mode:** the value is always fixed at 1 and has no inherent effect on the status effect's strength.
    - **Single-value mode:** one value is typically called Count, Stack, or Value.
    - **Double-value mode:** two values (Potency + Count). Generally, Potency determines strength, while Count determines duration.

    In single-value or double-value modes, if one or more of the values reach 0, the status effect is removed from the unit. Values are always consumed before they are gained or inflicted.

    Status effects also come with a few attributes:

    - **Base Value:** the initial value on infliction if none is specified.
    - **Max Value:** the maximum value (default 99).

??? info "Power modifiers"
    Strength and Weakened modify Attack Power. Dexterity and Frail modify Defense Power.

    When both a positive and negative modifier apply, use net Potency (positive - negative).
    Multiply the card's Power min and max by (1 + 0.10 x net Potency), then round down.
    Power has no minimum clamp.

??? info "Speed shift"
    Speed modifiers use a step-shift system. Each Potency shifts Speed by 1 step.
    Haste and Slow cancel step-for-step (example: Haste 2 and Slow 1 results in a net +1 step).
    Net shift is capped at 2 steps total. Haste shifts Slow -> Normal -> Fast. Slow shifts Fast -> Normal -> Slow.

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
  <p class="ua-entry__meta"><span class="ua-pill">Potency</span> Max 999.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Count</span> Max 99.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Allies' Card Played</span> Take <strong>Potency</strong> damage. Then increase <strong>Potency</strong> by <strong>Energy</strong> spent.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Turn End</span> Reduce <strong>Count</strong> by <strong>Halve</strong>.</p>
</div>

<div class="ua-entry status-entry" id="status-burn">
  <p class="ua-entry__title">Burn</p>
  <p class="ua-entry__meta"><span class="ua-pill">Type</span> Negative.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Potency</span> Max 999.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Count</span> Max 99.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Allies' Card Played</span> Take <strong>Potency</strong> damage. Then reduce <strong>Count</strong> by <strong>Energy</strong> spent.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Turn End</span> Take <strong>Potency</strong> damage. Then reduce <strong>Count</strong> by <strong>Halve</strong>.</p>
</div>

<div class="ua-entry status-entry" id="status-frail">
  <p class="ua-entry__title">Frail</p>
  <p class="ua-entry__meta"><span class="ua-pill">Type</span> Negative.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Potency</span> Max 999.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Count</span> Max 99.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Effect</span> Reduce Defense Power by 10% x Potency.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Turn End</span> Reduce <strong>Count</strong> by <strong>Halve</strong>.</p>
</div>

<div class="ua-entry status-entry" id="status-poison">
  <p class="ua-entry__title">Poison</p>
  <p class="ua-entry__meta"><span class="ua-pill">Type</span> Negative.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Potency</span> Max 999.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Count</span> Max 99.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Allies' Card Played</span> Increase <strong>Potency</strong> by <strong>Energy</strong> spent.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Turn End</span> Take <strong>Potency</strong> damage. Then reduce <strong>Count</strong> by <strong>Halve</strong>.</p>
</div>

<div class="ua-entry status-entry" id="status-slow">
  <p class="ua-entry__title">Slow</p>
  <p class="ua-entry__meta"><span class="ua-pill">Type</span> Negative.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Potency</span> Max 999.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Count</span> Max 99.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Effect</span> Reduce the card's Speed by <strong>Potency</strong> steps (Fast -> Normal -> Slow), capped at 2 steps.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Turn End</span> Reduce <strong>Count</strong> by <strong>Halve</strong>.</p>
</div>

<div class="ua-entry status-entry" id="status-stagnate">
  <p class="ua-entry__title">Stagnate</p>
  <p class="ua-entry__meta"><span class="ua-pill">Type</span> Negative.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Max Value</span> 10.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Instant</span> Increase the Energy cost of a random card in hand by 1 until that card is used. Repeat <strong>Value</strong> times. Expires.</p>
</div>

<div class="ua-entry status-entry" id="status-stun">
  <p class="ua-entry__title">Stun</p>
  <p class="ua-entry__meta"><span class="ua-pill">Type</span> Negative.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Max Stack</span> 1.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Turn Start</span> Skip the turn.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Turn End</span> Expires.</p>
</div>

<div class="ua-entry status-entry" id="status-weakened">
  <p class="ua-entry__title">Weakened</p>
  <p class="ua-entry__meta"><span class="ua-pill">Type</span> Negative.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Potency</span> Max 999.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Count</span> Max 99.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Effect</span> Reduce Attack Power by 10% x Potency.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Turn End</span> Reduce <strong>Count</strong> by <strong>Halve</strong>.</p>
</div>

### Positive

<div class="ua-entry status-entry" id="status-dexterity">
  <p class="ua-entry__title">Dexterity</p>
  <p class="ua-entry__meta"><span class="ua-pill">Type</span> Positive.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Potency</span> Max 999.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Count</span> Max 99.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Effect</span> Increase Defense Power by 10% x Potency.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Turn End</span> Reduce <strong>Count</strong> by <strong>Halve</strong>.</p>
</div>

<div class="ua-entry status-entry" id="status-haste">
  <p class="ua-entry__title">Haste</p>
  <p class="ua-entry__meta"><span class="ua-pill">Type</span> Positive.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Potency</span> Max 999.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Count</span> Max 99.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Effect</span> Increase the card's Speed by <strong>Potency</strong> steps (Slow -> Normal -> Fast), capped at 2 steps.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Turn End</span> Reduce <strong>Count</strong> by <strong>Halve</strong>.</p>
</div>

<div class="ua-entry status-entry" id="status-strength">
  <p class="ua-entry__title">Strength</p>
  <p class="ua-entry__meta"><span class="ua-pill">Type</span> Positive.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Potency</span> Max 999.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Count</span> Max 99.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Effect</span> Increase Attack Power by 10% x Potency.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Turn End</span> Reduce <strong>Count</strong> by <strong>Halve</strong>.</p>
</div>
