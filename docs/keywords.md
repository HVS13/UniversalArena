# Keywords

This page holds the full keyword reference. Use the filter to navigate large lists efficiently.

## Reference

<div class="ua-filter">
  <label class="ua-filter__label" for="keyword-filter">Filter keywords</label>
  <input class="ua-filter__input" type="search" id="keyword-filter" placeholder="Type to filter..." autocomplete="off" spellcheck="false" />
</div>

### Card Lifecycle

<div class="ua-entry keyword-entry" id="keyword-ethereal">
  <p class="ua-entry__title">Ethereal</p>
  <p class="ua-entry__desc">If this card is in hand at the end of the turn, it is Exhausted.</p>
</div>

<div class="ua-entry keyword-entry" id="keyword-exhaust">
  <p class="ua-entry__title">Exhaust</p>
  <p class="ua-entry__desc">When this card is played, remove this card from play for the rest of the game.</p>
</div>

<div class="ua-entry keyword-entry" id="keyword-innate">
  <p class="ua-entry__title">Innate</p>
  <p class="ua-entry__desc">Start the game with this card in the opening hand.</p>
</div>

<div class="ua-entry keyword-entry" id="keyword-retain">
  <p class="ua-entry__title">Retain</p>
  <p class="ua-entry__desc">Keep the card in hand at the end of the turn instead of discarding it.</p>
</div>

### Cost Modifiers

<div class="ua-entry keyword-entry" id="keyword-prepare">
  <p class="ua-entry__title">Prepare X</p>
  <p class="ua-entry__desc">Each turn, increase or reduce the Energy cost of this card by X until the card is used.</p>
</div>

### Combat

<div class="ua-entry keyword-entry" id="keyword-evade">
  <p class="ua-entry__title">Evade</p>
  <p class="ua-entry__desc">After Clash: If a Defense card's Shield reduces the Attack's Power damage to 0, that Attack is not a hit. Reuse this card.</p>
</div>

<div class="ua-entry keyword-entry" id="keyword-reuse">
  <p class="ua-entry__title">Reuse</p>
  <p class="ua-entry__desc">After this card finishes a clash, do not discard it. Keep it in the current zone so it can be paired again during the same zone resolution.</p>
</div>

<div class="ua-entry keyword-entry" id="keyword-follow-up">
  <p class="ua-entry__title">Follow-Up</p>
  <p class="ua-entry__desc">After Use: This card can be played after any other card from the same character.</p>
</div>

<div class="ua-entry keyword-entry" id="keyword-assist-attack">
  <p class="ua-entry__title">Assist Attack</p>
  <p class="ua-entry__desc">After Use: This card can be played after any other card used by a different character.</p>
</div>

### Damage Mitigation

<div class="ua-entry keyword-entry" id="keyword-resist">
  <p class="ua-entry__title">Resist X</p>
  <p class="ua-entry__desc">When damage would be dealt to HP, reduce that damage by X after Shield and Barrier are applied. X can be a flat value (example: Resist 5), a percentage (example: Resist 20%), or both (example: Resist 5/20%). If both are listed, calculate both and use the higher reduction. If damage types or attack tags are listed, Resist applies only to those; if multiple are listed, apply once when any match. Damage cannot go below 0.</p>
</div>

<div class="ua-entry keyword-entry" id="keyword-immune">
  <p class="ua-entry__title">Immune (Damage Type)</p>
  <p class="ua-entry__desc">Damage of the specified type becomes 0 before percent modifiers, Shield, Barrier, and HP. The attack still counts as a hit unless another effect says otherwise.</p>
</div>

<div class="ua-entry keyword-entry" id="keyword-weakness">
  <p class="ua-entry__title">Weakness X</p>
  <p class="ua-entry__desc">When damage would be dealt to HP, increase that damage by X after Shield and Barrier are applied. X can be a flat value (example: Weakness 5), a percentage (example: Weakness 20%), or both (example: Weakness 5/20%). If both are listed, calculate both and use the higher increase. If damage types or attack tags are listed, Weakness applies only to those; if multiple are listed, apply once when any match.</p>
</div>

<div class="ua-entry keyword-entry" id="keyword-absorb">
  <p class="ua-entry__title">Absorb X</p>
  <p class="ua-entry__desc">When damage would be dealt to HP, reduce that damage by X after Shield and Barrier are applied, then heal for the amount reduced. X can be a flat value (example: Absorb 5), a percentage (example: Absorb 20%), or both (example: Absorb 5/20%). If both are listed, calculate both and use the higher reduction. If damage types or attack tags are listed, Absorb applies only to those; if multiple are listed, apply once when any match. Damage cannot go below 0.</p>
</div>

### Status Control

<div class="ua-entry keyword-entry" id="keyword-cleanse">
  <p class="ua-entry__title">Cleanse</p>
  <p class="ua-entry__desc">Remove or reduce negative status effects. Cleanse [Status]: remove that status entirely. Cleanse X [Status]: reduce that status's Potency/Value/Stack by X. Cleanse All: remove all negative statuses. Cleanse All X: reduce all negative statuses' Potency/Value/Stack by X. Cleanse does not affect Count and does not affect Unique statuses. If a status uses Potency + Count, reduce Potency; if Potency reaches 0, remove the status.</p>
</div>

<div class="ua-entry keyword-entry" id="keyword-dispel">
  <p class="ua-entry__title">Dispel</p>
  <p class="ua-entry__desc">Remove or reduce positive status effects. Dispel [Status]: remove that status entirely. Dispel X [Status]: reduce that status's Potency/Value/Stack by X. Dispel All: remove all positive statuses. Dispel All X: reduce all positive statuses' Potency/Value/Stack by X. Dispel does not affect Count and does not affect Unique statuses. If a status uses Potency + Count, reduce Potency; if Potency reaches 0, remove the status.</p>
</div>

<div class="ua-entry keyword-entry" id="keyword-purge">
  <p class="ua-entry__title">Purge</p>
  <p class="ua-entry__desc">Remove or reduce positive or negative status effects. Purge [Status]: remove that status entirely. Purge X [Status]: reduce that status's Potency/Value/Stack by X. Purge All: remove all positive and negative statuses. Purge All X: reduce all positive and negative statuses' Potency/Value/Stack by X. Purge does not affect Count and does not affect Unique statuses. If a status uses Potency + Count, reduce Potency; if Potency reaches 0, remove the status.</p>
</div>

### Positioning

<div class="ua-entry keyword-entry" id="keyword-push">
  <p class="ua-entry__title">Push X</p>
  <p class="ua-entry__desc">Move the target X positions away from the source along the target's team line, swapping with any character passed. If the target is at the edge, remaining movement does nothing.</p>
</div>

<div class="ua-entry keyword-entry" id="keyword-pull">
  <p class="ua-entry__title">Pull X</p>
  <p class="ua-entry__desc">Move the target X positions toward the source's column along the target's team line, swapping with any character passed. If the target is already in the closest position, remaining movement does nothing.</p>
</div>

<div class="ua-entry keyword-entry" id="keyword-swap">
  <p class="ua-entry__title">Swap</p>
  <p class="ua-entry__desc">Exchange the positions of two characters on the same team line.</p>
</div>

### Deck Manipulation

<div class="ua-entry keyword-entry" id="keyword-scry">
  <p class="ua-entry__title">Scry X</p>
  <p class="ua-entry__desc">Look at the top X cards of your draw pile. Put any number into the discard pile, then put the rest back in any order.</p>
</div>

<div class="ua-entry keyword-entry" id="keyword-search">
  <p class="ua-entry__title">Search</p>
  <p class="ua-entry__desc">Search your draw pile for a card that matches the listed criteria or name, reveal it, put it into your hand, then shuffle.</p>
</div>

<div class="ua-entry keyword-entry" id="keyword-seek">
  <p class="ua-entry__title">Seek X</p>
  <p class="ua-entry__desc">Seek X (criteria, Y): Look at the top X cards of your draw pile. You may reveal and take up to Y cards that match the listed criteria or name, put them into your hand, then discard the rest.</p>
</div>

### Targeting

<div class="ua-entry keyword-entry" id="keyword-bounce">
  <p class="ua-entry__title">Bounce X</p>
  <p class="ua-entry__desc">A random adjacent character to the main target will also take the effect. Repeat X times. Each bounce chooses a random adjacent character; the same character can be chosen more than once unless the effect says otherwise.</p>
</div>
