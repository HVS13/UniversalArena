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
