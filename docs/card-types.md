# Card Types

This page lists card types and what they mean in play.

??? info "Explanation"
    Card Types describe what a card *is* (and usually what rules it follows), such as when it can be played, how it resolves, and what effects or synergies refer to it.

    In character pages (example: Rover (Spectro)), card types appear in the card block as a comma-separated list like `Physical, Attack, Slash, Debuff`.

    Use this page as a reference list: add each card type as its own entry, and keep the description short and rules-focused.

## Reference

Use the filter to quickly locate a card type.

<div class="ua-filter">
  <label class="ua-filter__label" for="card-type-filter">Filter card types</label>
  <input class="ua-filter__input" type="search" id="card-type-filter" placeholder="Type to filter..." autocomplete="off" spellcheck="false" />
</div>

<!-- Copy/paste template:
<div class="ua-entry card-type-entry" id="card-type-<slug>">
  <p class="ua-entry__title">Card Type Name</p>
  <p class="ua-entry__desc">Explanation of what this card type is and the rules it follows.</p>
</div>
-->

## Examples (from Rover (Spectro))

These are starter examples you can edit/replace as you define your rules.

<div class="ua-entry card-type-entry" id="card-type-attack">
  <p class="ua-entry__title">Attack</p>
  <p class="ua-entry__meta"><span class="ua-pill">Category</span> Action.</p>
  <p class="ua-entry__desc">A card that deals damage or directly contributes to dealing damage.</p>
</div>

<div class="ua-entry card-type-entry" id="card-type-defense">
  <p class="ua-entry__title">Defense</p>
  <p class="ua-entry__meta"><span class="ua-pill">Category</span> Action.</p>
  <p class="ua-entry__desc">A card focused on protection or mitigation (example: granting Shield).</p>
</div>

<div class="ua-entry card-type-entry" id="card-type-debuff">
  <p class="ua-entry__title">Debuff</p>
  <p class="ua-entry__meta"><span class="ua-pill">Category</span> Effect.</p>
  <p class="ua-entry__desc">A card that applies negative effects, status effects, or other hindrances to enemies.</p>
</div>

<div class="ua-entry card-type-entry" id="card-type-recovery">
  <p class="ua-entry__title">Recovery</p>
  <p class="ua-entry__meta"><span class="ua-pill">Category</span> Effect.</p>
  <p class="ua-entry__desc">A card that restores resources (example: healing HP).</p>
</div>

<div class="ua-entry card-type-entry" id="card-type-physical">
  <p class="ua-entry__title">Physical</p>
  <p class="ua-entry__meta"><span class="ua-pill">Category</span> Damage Type.</p>
  <p class="ua-entry__desc">Indicates the card’s damage is physical (and can be referenced by rules that care about physical damage).</p>
</div>

<div class="ua-entry card-type-entry" id="card-type-magical">
  <p class="ua-entry__title">Magical</p>
  <p class="ua-entry__meta"><span class="ua-pill">Category</span> Damage Type.</p>
  <p class="ua-entry__desc">Indicates the card’s damage is magical (and can be referenced by rules that care about magical damage).</p>
</div>

<div class="ua-entry card-type-entry" id="card-type-slash">
  <p class="ua-entry__title">Slash</p>
  <p class="ua-entry__meta"><span class="ua-pill">Category</span> Attack Tag.</p>
  <p class="ua-entry__desc">An attack subtype used for rules and synergies that care about “slash” attacks.</p>
</div>

<div class="ua-entry card-type-entry" id="card-type-blunt">
  <p class="ua-entry__title">Blunt</p>
  <p class="ua-entry__meta"><span class="ua-pill">Category</span> Attack Tag.</p>
  <p class="ua-entry__desc">An attack subtype used for rules and synergies that care about “blunt” attacks.</p>
</div>
