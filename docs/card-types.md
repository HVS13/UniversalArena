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

Use this ordering when listing Type tags on cards:

1. Basic / Ultimate
2. Attack / Defense / Special
3. Physical / Magical / Mental / Electric
4. Melee / Ranged
5. AoE / Splash / Bounce
6. Slash / Pierce / Blunt / Multihit
7. Transformation / Recovery / Buff / Debuff

### Action

<div class="ua-entry card-type-entry" id="card-type-basic">
  <p class="ua-entry__title">Basic</p>
  <p class="ua-entry__meta"><span class="ua-pill">Category</span> Action.</p>
  <p class="ua-entry__desc">A card tagged as Basic for rules and synergies that reference Basic cards.</p>
</div>

<div class="ua-entry card-type-entry" id="card-type-ultimate">
  <p class="ua-entry__title">Ultimate</p>
  <p class="ua-entry__meta"><span class="ua-pill">Category</span> Action.</p>
  <p class="ua-entry__desc">A card that costs Ultimate Meter to play and can be referenced by rules that care about Ultimate cards.</p>
</div>

<div class="ua-entry card-type-entry" id="card-type-attack">
  <p class="ua-entry__title">Attack</p>
  <p class="ua-entry__meta"><span class="ua-pill">Category</span> Action.</p>
  <p class="ua-entry__desc">A card that deals damage using Power or directly contributes to dealing damage.</p>
</div>

<div class="ua-entry card-type-entry" id="card-type-defense">
  <p class="ua-entry__title">Defense</p>
  <p class="ua-entry__meta"><span class="ua-pill">Category</span> Action.</p>
  <p class="ua-entry__desc">A card focused on protection or mitigation (example: granting Power Shield).</p>
</div>

<div class="ua-entry card-type-entry" id="card-type-special">
  <p class="ua-entry__title">Special</p>
  <p class="ua-entry__meta"><span class="ua-pill">Category</span> Action.</p>
  <p class="ua-entry__desc">A card other than an attack or defense (example: granting a buff or debuff). Special cards have Power: - and never roll Power unless stated otherwise.</p>
</div>

### Damage Type

<div class="ua-entry card-type-entry" id="card-type-physical">
  <p class="ua-entry__title">Physical</p>
  <p class="ua-entry__meta"><span class="ua-pill">Category</span> Damage Type.</p>
  <p class="ua-entry__desc">Indicates the card's damage is physical (and can be referenced by rules that care about physical damage).</p>
</div>

<div class="ua-entry card-type-entry" id="card-type-magical">
  <p class="ua-entry__title">Magical</p>
  <p class="ua-entry__meta"><span class="ua-pill">Category</span> Damage Type.</p>
  <p class="ua-entry__desc">Indicates the card's damage is magical (and can be referenced by rules that care about magical damage).</p>
</div>

<div class="ua-entry card-type-entry" id="card-type-mental">
  <p class="ua-entry__title">Mental</p>
  <p class="ua-entry__meta"><span class="ua-pill">Category</span> Damage Type.</p>
  <p class="ua-entry__desc">Indicates the card's damage is mental (and can be referenced by rules that care about mental damage).</p>
</div>

<div class="ua-entry card-type-entry" id="card-type-electric">
  <p class="ua-entry__title">Electric</p>
  <p class="ua-entry__meta"><span class="ua-pill">Category</span> Damage Type.</p>
  <p class="ua-entry__desc">Indicates the card's damage is electric (and can be referenced by rules that care about electric damage).</p>
</div>

### Range

<div class="ua-entry card-type-entry" id="card-type-melee">
  <p class="ua-entry__title">Melee</p>
  <p class="ua-entry__meta"><span class="ua-pill">Category</span> Range.</p>
  <p class="ua-entry__desc">Indicates the card is used at melee range (and can be referenced by rules that care about melee range).</p>
</div>

<div class="ua-entry card-type-entry" id="card-type-ranged">
  <p class="ua-entry__title">Ranged</p>
  <p class="ua-entry__meta"><span class="ua-pill">Category</span> Range.</p>
  <p class="ua-entry__desc">Indicates the card is used at ranged distance (and can be referenced by rules that care about ranged distance).</p>
</div>

### Area

<div class="ua-entry card-type-entry" id="card-type-aoe">
  <p class="ua-entry__title">AoE</p>
  <p class="ua-entry__meta"><span class="ua-pill">Category</span> Area.</p>
  <p class="ua-entry__desc">Area of Effect. A card that affects all characters in the targeted area (example: all enemies).</p>
</div>

<div class="ua-entry card-type-entry" id="card-type-splash">
  <p class="ua-entry__title">Splash</p>
  <p class="ua-entry__meta"><span class="ua-pill">Category</span> Area.</p>
  <p class="ua-entry__desc">A card that affects the main target and its adjacent neighbors.</p>
</div>

### Attack Tag

<div class="ua-entry card-type-entry" id="card-type-slash">
  <p class="ua-entry__title">Slash</p>
  <p class="ua-entry__meta"><span class="ua-pill">Category</span> Attack Tag.</p>
  <p class="ua-entry__desc">An attack subtype used for rules and synergies that care about slash attacks.</p>
</div>

<div class="ua-entry card-type-entry" id="card-type-pierce">
  <p class="ua-entry__title">Pierce</p>
  <p class="ua-entry__meta"><span class="ua-pill">Category</span> Attack Tag.</p>
  <p class="ua-entry__desc">An attack subtype used for rules and synergies that care about pierce attacks.</p>
</div>

<div class="ua-entry card-type-entry" id="card-type-blunt">
  <p class="ua-entry__title">Blunt</p>
  <p class="ua-entry__meta"><span class="ua-pill">Category</span> Attack Tag.</p>
  <p class="ua-entry__desc">An attack subtype used for rules and synergies that care about blunt attacks.</p>
</div>

<div class="ua-entry card-type-entry" id="card-type-multihit">
  <p class="ua-entry__title">Multihit</p>
  <p class="ua-entry__meta"><span class="ua-pill">Category</span> Attack Tag.</p>
  <p class="ua-entry__desc">An attack that hits multiple times. Each hit rolls Power separately and activates any On-Hit effects. If it loses a clash with another Attack, reduce the multihit count by 1 and Reuse it instead of discarding it. If there are no multihit counts left, treat it as a normal Attack card.</p>
</div>

### Effect

<div class="ua-entry card-type-entry" id="card-type-transformation">
  <p class="ua-entry__title">Transformation</p>
  <p class="ua-entry__meta"><span class="ua-pill">Category</span> Effect.</p>
  <p class="ua-entry__desc">A card that changes the character's form or mode, usually by applying or consuming a transformation status effect.</p>
</div>

<div class="ua-entry card-type-entry" id="card-type-recovery">
  <p class="ua-entry__title">Recovery</p>
  <p class="ua-entry__meta"><span class="ua-pill">Category</span> Effect.</p>
  <p class="ua-entry__desc">A card that restores resources (example: healing HP).</p>
</div>

<div class="ua-entry card-type-entry" id="card-type-buff">
  <p class="ua-entry__title">Buff</p>
  <p class="ua-entry__meta"><span class="ua-pill">Category</span> Effect.</p>
  <p class="ua-entry__desc">A card that applies positive effects, status effects, or other benefits to allies.</p>
</div>

<div class="ua-entry card-type-entry" id="card-type-debuff">
  <p class="ua-entry__title">Debuff</p>
  <p class="ua-entry__meta"><span class="ua-pill">Category</span> Effect.</p>
  <p class="ua-entry__desc">A card that applies negative effects, status effects, or other hindrances to enemies.</p>
</div>
