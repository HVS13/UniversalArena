# Status Effects

This page explains what status effects are and how their values work.

??? info "Explanation"
    Status Effects are conditions that can be applied to units on either side of a battle through the use of passives, skills, ultimates, and even other status effects.

    A status effect can use up to two values to function, which will be called "modes" here for clarity:

    - **Zero-value mode:** the value is always fixed at 1 and has no inherent effect on the status effect's strength.
    - **Single-value mode:** one value is typically called Count, Stack, or Value.
    - **Double-value mode:** two values (Potency + Count). Generally, Potency determines strength, while Count determines duration.

    In single-value or double-value modes, if one or more of the values reach 0, the status effect is removed from the unit. Values are always consumed before they are gained or inflicted.

    Status effects also come with a few attributes:

    - **Base Value:** the initial value on infliction if none is specified.
    - **Max Value:** the maximum value (default 99).

## Reference

Use the filter to quickly locate a mode, rule, or attribute.

<div class="ua-filter">
  <label class="ua-filter__label" for="status-filter">Filter status effects</label>
  <input class="ua-filter__input" type="search" id="status-filter" placeholder="Type to filter..." autocomplete="off" spellcheck="false" />
</div>

<div class="ua-entry status-entry" id="status-burn">
  <p class="ua-entry__title">Burn</p>
  <p class="ua-entry__meta"><span class="ua-pill">Type</span> Negative.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Potency</span> Max 999.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Count</span> Max 99.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Allies Card Played</span> Take <strong>Potency</strong> damage. Then reduce <strong>Count</strong> by <strong>Energy</strong> spent.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Turn End</span> Take <strong>Potency</strong> damage. Then reduce <strong>Count</strong> by <strong>Halve</strong>.</p>
</div>

<div class="ua-entry status-entry" id="status-bleed">
  <p class="ua-entry__title">Bleed</p>
  <p class="ua-entry__meta"><span class="ua-pill">Type</span> Negative.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Potency</span> Max 999.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Count</span> Max 99.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Allies Card Played</span> Take <strong>Potency</strong> damage. Then increase <strong>Potency</strong> by <strong>Energy</strong> spent.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Turn End</span> Reduce <strong>Count</strong> by <strong>Halve</strong>.</p>
</div>

<div class="ua-entry status-entry" id="status-poison">
  <p class="ua-entry__title">Poison</p>
  <p class="ua-entry__meta"><span class="ua-pill">Type</span> Negative.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Potency</span> Max 999.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Count</span> Max 99.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Allies Card Played</span> Increase <strong>Potency</strong> by <strong>Energy</strong> spent.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Turn End</span> Take <strong>Potency</strong> damage. Then reduce <strong>Count</strong> by <strong>Halve</strong>.</p>
</div>

<div class="ua-entry status-entry" id="status-haste">
  <p class="ua-entry__title">Haste</p>
  <p class="ua-entry__meta"><span class="ua-pill">Type</span> Positive.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Max Stack</span> 10.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Turn Start</span> Increase number of cards drawn by <strong>Stack</strong>.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Turn End</span> Reduce <strong>Stack</strong> by <strong>Halve</strong>.</p>
</div>

<div class="ua-entry status-entry" id="status-slow">
  <p class="ua-entry__title">Slow</p>
  <p class="ua-entry__meta"><span class="ua-pill">Type</span> Negative.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Max Stack</span> 10.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Turn Start</span> Reduce number of cards drawn by <strong>Stack</strong>.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Turn End</span> Reduce <strong>Stack</strong> by <strong>Halve</strong>.</p>
</div>

<div class="ua-entry status-entry" id="status-stun">
  <p class="ua-entry__title">Stun</p>
  <p class="ua-entry__meta"><span class="ua-pill">Type</span> Negative.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Max Stack</span> 1.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Turn Start</span> Skip the turn.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Turn End</span> Expires.</p>
</div>

<div class="ua-entry status-entry" id="status-strength">
  <p class="ua-entry__title">Strength</p>
  <p class="ua-entry__meta"><span class="ua-pill">Type</span> Positive.</p>
    <p class="ua-entry__meta"><span class="ua-pill">Potency</span> Max 10.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Count</span> Max 99.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Effect</span> Increase damage dealt by 10% x Potency.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Turn End</span> Reduce <strong>Count</strong> by <strong>Halve</strong>.</p>
</div>

<div class="ua-entry status-entry" id="status-weak">
  <p class="ua-entry__title">Weak</p>
  <p class="ua-entry__meta"><span class="ua-pill">Type</span> Negative.</p>
    <p class="ua-entry__meta"><span class="ua-pill">Potency</span> Max 10.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Count</span> Max 99.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Effect</span> Reduce damage dealt by 10% x Potency.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Turn End</span> Reduce <strong>Count</strong> by <strong>Halve</strong>.</p>
</div>

<div class="ua-entry status-entry" id="status-vulnerable">
  <p class="ua-entry__title">Vulnerable</p>
  <p class="ua-entry__meta"><span class="ua-pill">Type</span> Negative.</p>
    <p class="ua-entry__meta"><span class="ua-pill">Potency</span> Max 10.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Count</span> Max 99.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Effect</span> Increase damage received by 10% x Potency.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Turn End</span> Reduce <strong>Count</strong> by <strong>Halve</strong>.</p>
</div>

<div class="ua-entry status-entry" id="status-zero-value-mode">
  <p class="ua-entry__title">Zero-value mode</p>
  <p class="ua-entry__desc">Fixed at 1. The value exists for consistency, not scaling.</p>
</div>

<div class="ua-entry status-entry" id="status-single-value-mode">
  <p class="ua-entry__title">Single-value mode</p>
  <p class="ua-entry__desc">One value (often Count, Stack, or Value) defines the effect and/or duration.</p>
</div>

<div class="ua-entry status-entry" id="status-double-value-mode">
  <p class="ua-entry__title">Double-value mode</p>
  <p class="ua-entry__desc">Two values: Potency (strength) and Count (duration).</p>
</div>

<div class="ua-entry status-entry" id="status-removal-at-zero">
  <p class="ua-entry__title">Removal at 0</p>
  <p class="ua-entry__desc">In single- and double-value modes, reaching 0 on any value removes the status effect.</p>
</div>

<div class="ua-entry status-entry" id="status-consumption-order">
  <p class="ua-entry__title">Consumption order</p>
  <p class="ua-entry__desc">Status effect values are always consumed before they are gained or inflicted.</p>
</div>

<div class="ua-entry status-entry" id="status-base-and-max">
  <p class="ua-entry__title">Base Value and Max Value</p>
  <p class="ua-entry__desc">Base Value is the default on infliction; Max Value caps growth (default 99).</p>
</div>
