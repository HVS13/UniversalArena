# Status Effects

This page explains what status effects are and how their values work.

<div class="status-explainer">
  <details class="status-explanation">
    <summary>
      <span class="status-explanation__title status-explanation__title--closed">Show explanation</span>
      <span class="status-explanation__title status-explanation__title--open">Hide explanation</span>
      <span class="status-explanation__subtitle">What status effects are, plus modes and attributes</span>
    </summary>
    <div class="status-explanation__body">
      <p>Status Effects are conditions that can be applied to units on either side of a battle through the use of Passives, Skills, Ultimate and even other status effects.</p>
      <p>A status effect can use up to two values to function, which will be called "modes" here for clarity:</p>
      <ul>
        <li><strong>Zero-value mode:</strong> where the value is always fixed at 1 and has no inherent effect on the status effect's strength.</li>
        <li><strong>Single-value mode:</strong> where the value is typically called Count, Stack or simply Value.</li>
        <li><strong>Double-value mode:</strong> where one value is called Potency and the other Count. Generally, Potency determines the strength of the effect, while Count determines its duration.</li>
      </ul>
      <p>In single-value or double-value modes, if one or more of the values reach 0, the status effect is removed from the unit. Additionally, the values of a status effect are always consumed before they are gained or inflicted.</p>
      <p>Status effects also come with a few attributes:</p>
      <ul>
        <li><strong>Base Value:</strong> The initial value of the status effect upon infliction if no value is specified.</li>
        <li><strong>Max Value:</strong> The maximum value of the status effect. The default Max Value is 99.</li>
      </ul>
    </div>
  </details>
</div>

## Reference

Use the filter to quickly locate a mode, rule, or attribute.

<input type="text" id="status-filter" placeholder="Filter status effects..." />

<div class="status-entry" id="status-zero-value-mode">
  <h3>Zero-value mode</h3>
  <p>Fixed at 1. The value exists for consistency, not scaling.</p>
</div>

<div class="status-entry" id="status-single-value-mode">
  <h3>Single-value mode</h3>
  <p>One value (often Count, Stack, or Value) defines the effect and/or duration.</p>
</div>

<div class="status-entry" id="status-double-value-mode">
  <h3>Double-value mode</h3>
  <p>Two values: Potency (strength) and Count (duration).</p>
</div>

<div class="status-entry" id="status-removal-at-zero">
  <h3>Removal at 0</h3>
  <p>In single- and double-value modes, reaching 0 on any value removes the status effect.</p>
</div>

<div class="status-entry" id="status-consumption-order">
  <h3>Consumption order</h3>
  <p>Status effect values are always consumed before they are gained or inflicted.</p>
</div>

<div class="status-entry" id="status-base-and-max">
  <h3>Base Value and Max Value</h3>
  <p>Base Value is the default on infliction; Max Value caps growth (default 99).</p>
</div>
