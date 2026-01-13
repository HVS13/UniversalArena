# Terminology

This page is the reference glossary for game terms. Use the filter to quickly locate an entry.

## Reference

<div class="ua-filter">
  <label class="ua-filter__label" for="term-filter">Filter terms</label>
  <input class="ua-filter__input" type="search" id="term-filter" placeholder="Type to filter..." autocomplete="off" spellcheck="false" />
</div>

!!! tip
    Add new rows or columns here as rules evolve.

<div class="ua-table">
<table id="terminology-table">
  <thead>
    <tr>
      <th>Term</th>
      <th>Definition</th>
    </tr>
  </thead>
  <tbody>
    <tr class="term-section">
      <th colspan="2">Resources</th>
    </tr>
    <tr id="term-energy" class="term-entry">
      <td>Energy</td>
      <td>The shared team resource used to play cards. By default, at Turn Start each team sets Energy to 5; effects can modify this and there is no Energy cap.</td>
    </tr>
    <tr id="term-ultimate-meter" class="term-entry">
      <td>Ultimate Meter</td>
      <td>The shared team resource that powers the strongest abilities; any character can spend it. Your team gains Ultimate Meter when you play cards. Design target: in a standard 3v3 match, a normal team gains about 5 Ultimate Meter per turn on average; some characters gain faster or slower.</td>
    </tr>
    <tr id="term-spend" class="term-entry">
      <td>Spend</td>
      <td>When an effect says to Spend X (Energy, Ammo, a status value, etc.), you must reduce that resource by X to resolve that part of the effect. If you cannot spend the full amount, that part of the effect does not happen. Optional Spend uses <code>?</code> (example: "Spend X Resource? Gain Evade.").</td>
    </tr>
    <tr id="term-ultimate-card" class="term-entry">
      <td>Ultimate Card</td>
      <td>A card that starts outside the draw pile and is always available to play. It follows normal card rules and counts as an Ultimate type for effects.</td>
    </tr>
    <tr id="term-ammo" class="term-entry">
      <td>Ammo</td>
      <td>A per-weapon resource tracked separately for each weapon (example: Handgun Ammo, Shotgun Ammo). Cards may require or spend Ammo; if you cannot spend the required amount, that effect does not activate. "Full" means the amount granted by the effect or innate that set the Ammo. Switching weapons does not change each weapon's stored Ammo unless stated.</td>
    </tr>
    <tr id="term-reload" class="term-entry">
      <td>Reload</td>
      <td>Lose all current Ammo for the currently equipped weapon, then set that weapon's Ammo to its full value as defined by its source.</td>
    </tr>
    <tr class="term-section">
      <th colspan="2">Turn Structure</th>
    </tr>
    <tr id="term-initiative" class="term-entry">
      <td>Initiative</td>
      <td>Determines who takes the first action at Combat Start each turn.</td>
    </tr>
    <tr id="term-movement-round" class="term-entry">
      <td>Movement Round</td>
      <td>A phase after Turn Start where players alternate priority to spend 1 Energy to swap two adjacent allied characters or pass. Movement swaps are not card plays and do not grant Ultimate Meter. The round ends when both players pass consecutively. Rooted characters cannot be moved or swapped. See <a href="faq.md#faq-movement-round">FAQ</a>.</td>
    </tr>
    <tr class="term-section">
      <th colspan="2">Rules</th>
    </tr>
    <tr id="term-rule-priority" class="term-entry">
      <td>Rule Priority</td>
      <td>If a card or character effect contradicts the core rules, apply the effect as written.</td>
    </tr>
    <tr id="term-on-gain" class="term-entry">
      <td>On Gain</td>
      <td>A status effect timing label that resolves immediately when the status is gained, even mid-turn. See <a href="faq.md#faq-on-gain">FAQ</a>.</td>
    </tr>
    <tr id="term-on-hit" class="term-entry">
      <td>On Hit</td>
      <td>A timing label that resolves when an Attack is a hit, even if it deals 0 damage. See <a href="faq.md#faq-hit-vs-damage">FAQ</a>.</td>
    </tr>
    <tr id="term-on-damage" class="term-entry">
      <td>On Damage</td>
      <td>A timing label that resolves when damage is actually dealt after mitigation, whether to Shield, Barrier, or HP. Damage must be greater than 0. See <a href="faq.md#faq-hit-vs-damage">FAQ</a>.</td>
    </tr>
    <tr id="term-on-hp-damage" class="term-entry">
      <td>On HP Damage</td>
      <td>A timing label that resolves when HP is reduced by damage after mitigation. See <a href="faq.md#faq-hit-vs-damage">FAQ</a>.</td>
    </tr>
    <tr class="term-section">
      <th colspan="2">Card Flow</th>
    </tr>
    <tr id="term-discard" class="term-entry">
      <td>Discard</td>
      <td>The act of moving a card from your hand to the Discard Pile. Unplayed cards are typically discarded at the end of each turn. Some card effects also cause you to discard cards during your turn.</td>
    </tr>
    <tr id="term-draw" class="term-entry">
      <td>Draw</td>
      <td>The act of taking cards from your Draw Pile and adding them to your hand. If you need to draw and your Draw Pile is empty, shuffle your Discard Pile into a new Draw Pile and continue drawing; if both piles are empty, draw as many as possible (possibly 0). By default, at Turn Start you draw until you reach a hand size of 5, modified by draw effects (if any). See <a href="faq.md#faq-draw-reshuffle">FAQ</a>.</td>
    </tr>
    <tr id="term-hand" class="term-entry">
      <td>Hand</td>
      <td>Your team's shared hand of cards. Any character may play cards from the shared hand as long as they can legally play that card. See <a href="faq.md#faq-shared-hand-energy">FAQ</a>.</td>
    </tr>
    <tr id="term-played" class="term-entry">
      <td>Played</td>
      <td>A card is played when it is placed in a legal zone after paying its cost and selecting legal targets.</td>
    </tr>
    <tr id="term-cannot-play-cards" class="term-entry">
      <td>Cannot Play Cards</td>
      <td>If an effect says a player cannot play cards, they cannot add cards to any zone until the restriction ends; they may still pass priority and resolve cards already played. See <a href="faq.md#faq-cannot-play-cards">FAQ</a>.</td>
    </tr>
    <tr id="term-used" class="term-entry">
      <td>Used</td>
      <td>A card is used when its effects apply. Unless a timing is explicitly stated, a card's text is On Use.</td>
    </tr>
    <tr id="term-becomes" class="term-entry">
      <td>Becomes</td>
      <td>If a card becomes another card due to a condition, treat it as that other card in any zone (deck, hand, play) as long as the condition is true. This replacement is automatic, not optional.</td>
    </tr>
    <tr id="term-cancelled" class="term-entry">
      <td>Cancelled</td>
      <td>A cancelled card skips its effects from Before Use onward (Before Use, On Use, On Hit, After Use). Always still applies.</td>
    </tr>
    <tr id="term-negated" class="term-entry">
      <td>Negated</td>
      <td>A negated card skips all effects, including Always.</td>
    </tr>
    <tr class="term-section">
      <th colspan="2">Card Categories</th>
    </tr>
    <tr id="term-basic-card" class="term-entry">
      <td>Basic Card</td>
      <td>A card tagged Basic. Each character has two Basic cards in their starting five.</td>
    </tr>
    <tr id="term-technique-card" class="term-entry">
      <td>Technique Card</td>
      <td>A non-basic, non-ultimate card from a character's kit. Each character has three Technique cards in their starting five.</td>
    </tr>
    <tr id="term-created-card" class="term-entry">
      <td>Created Card</td>
      <td>A card generated by an effect that did not start in a character's initial five cards. If the effect does not specify where it goes, add it to the discard pile.</td>
    </tr>
    <tr class="term-section">
      <th colspan="2">Characters</th>
    </tr>
    <tr id="term-role" class="term-entry">
      <td>Role</td>
      <td>A character archetype tag used to communicate playstyle. See <a href="roles.md">Roles</a>.</td>
    </tr>
    <tr id="term-defeated" class="term-entry">
      <td>Defeated</td>
      <td>A character is defeated when their HP reaches 0. Defeated characters cannot be targeted or play cards, and their cards are removed from play. The match ends when all characters on a team are defeated.</td>
    </tr>
    <tr id="term-resurrection" class="term-entry">
      <td>Resurrection</td>
      <td>An effect that returns a defeated character to play. The effect must explicitly state how it restores that character; otherwise the character remains defeated.</td>
    </tr>
    <tr class="term-section">
      <th colspan="2">Combat</th>
    </tr>
    <tr id="term-combat-round" class="term-entry">
      <td>Combat Round</td>
      <td>A sequence that begins when the initiative player plays a card and ends when all zones are empty.</td>
    </tr>
    <tr id="term-active-zone" class="term-entry">
      <td>Active Zone</td>
      <td>The current zone being played in; cards in it are used during a Combat Round.</td>
    </tr>
    <tr id="term-priority" class="term-entry">
      <td>Priority</td>
      <td>The right to act next during Combat or the Movement Round. Priority passes after each play, swap, or pass.</td>
    </tr>
    <tr id="term-hit" class="term-entry">
      <td>Hit</td>
      <td>An Attack that is used is a hit unless a rule or effect prevents it (example: Evade). See <a href="faq.md#faq-evade-shield">FAQ</a> for an Evade timing example.</td>
    </tr>
    <tr id="term-damage" class="term-entry">
      <td>Damage</td>
      <td>Damage reduces Shield, Barrier, or HP. Effects that say "Lose HP" are not damage.</td>
    </tr>
    <tr id="term-healing" class="term-entry">
      <td>Healing</td>
      <td>Effects that restore HP. Healing is reduced by Wound and Wither before it is gained. See <a href="faq.md#faq-healing-reduction">FAQ</a>.</td>
    </tr>
    <tr id="term-damage-resolution" class="term-entry">
      <td>Damage Resolution</td>
      <td>Apply damage in this order: roll Power and apply Power modifiers, apply Immune, apply percent damage modifiers (Fortified/Vulnerable), apply Shield, apply Barrier, apply flat HP modifiers (Resist/Weakness/Absorb), then deal remaining damage to HP. See <a href="faq.md#faq-damage-resolution">FAQ</a>.</td>
    </tr>
    <tr id="term-damage-types" class="term-entry">
      <td>Damage Types &amp; Attack Tags</td>
      <td>Cards can list multiple Damage Types (Physical, Magical, Mental, Electric) and Attack Tags (Slash, Pierce, Blunt, Multihit). A card counts as all listed types and tags for matching. If a single modifier lists multiple types or tags, it applies once when any match; separate modifiers stack.</td>
    </tr>
    <tr id="term-base-power" class="term-entry">
      <td>Base Power</td>
      <td>Design baseline for setting a card's Power. Default target: Energy cost x 10 or Ultimate Meter cost x 1.5, rounded down. Adjust upward for hard requirements or downward for extra utility as needed.</td>
    </tr>
    <tr id="term-power" class="term-entry">
      <td>Power</td>
      <td>The min-max value shown on a card. It is usually +/- floor(Base Power x 0.20) for Melee and +/- floor(Base Power x 0.25) for Ranged. Power cannot be reduced below 0.</td>
    </tr>
    <tr id="term-power-roll" class="term-entry">
      <td>Power Roll</td>
      <td>The rolled value from a card's Power used for clash comparisons, damage dealt, Shield gained, and HP recovered. Roll Power each time a card is used.</td>
    </tr>
    <tr id="term-reuse" class="term-entry">
      <td>Reuse</td>
      <td>If a card is instructed to Reuse, do not discard it after its clash; keep it in the current zone so it can be paired again during the same zone resolution.</td>
    </tr>
    <tr id="term-follow-up" class="term-entry">
      <td>Follow-Up</td>
      <td>A keyword that lets you play a card immediately after another card from the same character is used. The Follow-Up resolves immediately, does not enter the zone stack, and does not clash with the next card; it must be played into the same zone if legal. See <a href="faq.md#faq-follow-up-assist-attack">FAQ</a>.</td>
    </tr>
    <tr id="term-assist-attack" class="term-entry">
      <td>Assist Attack</td>
      <td>A keyword that lets you play a card immediately after another card used by a different character on your team. The Assist Attack resolves immediately, does not enter the zone stack, and does not clash with the next card; it must be played into the same zone if legal. See <a href="faq.md#faq-follow-up-assist-attack">FAQ</a>.</td>
    </tr>
    <tr class="term-section">
      <th colspan="2">Defense</th>
    </tr>
    <tr id="term-shield" class="term-entry">
      <td>Shield</td>
      <td>Temporary protection that soaks damage before HP. At Turn End, remove all Shield.</td>
    </tr>
    <tr id="term-barrier" class="term-entry">
      <td>Barrier</td>
      <td>A persistent damage buffer from the <a class="ua-status-link" data-status="status-barrier" href="#">Barrier</a> status effect that absorbs damage after Shield and before HP.</td>
    </tr>
    <tr class="term-section">
      <th colspan="2">Targeting</th>
    </tr>
    <tr id="term-ally" class="term-entry">
      <td>Ally</td>
      <td>A character on the same team, including self unless an effect says another ally.</td>
    </tr>
    <tr id="term-allies" class="term-entry">
      <td>Allies</td>
      <td>All characters on the same team, including self.</td>
    </tr>
    <tr id="term-enemy" class="term-entry">
      <td>Enemy</td>
      <td>A character on the opposite team.</td>
    </tr>
    <tr id="term-enemies" class="term-entry">
      <td>Enemies</td>
      <td>All characters on the opposite team.</td>
    </tr>
    <tr id="term-self" class="term-entry">
      <td>Self</td>
      <td>The character that uses the card.</td>
    </tr>
    <tr id="term-adjacent" class="term-entry">
      <td>Adjacent</td>
      <td>Each team has its own line arranged left to right. Adjacent means the immediate left or right neighbor of the target on the same team line.</td>
    </tr>
    <tr id="term-opposed" class="term-entry">
      <td>Opposed</td>
      <td>Characters are opposed if they are in the same column on opposing team lines.</td>
    </tr>
    <tr id="term-redirect" class="term-entry">
      <td>Redirect</td>
      <td>A keyword that changes the primary target of a single-target effect. <a class="ua-keyword-link" data-keyword="keyword-redirect" href="#">Redirect</a> can apply even if the effect has <a class="ua-term-link" data-term="term-splash" href="#">Splash</a> or <a class="ua-term-link" data-term="term-bounce" href="#">Bounce</a>; resolve those from the new target. See <a href="faq.md#faq-redirect-splash">FAQ</a>.</td>
    </tr>
    <tr class="term-section">
      <th colspan="2">Area</th>
    </tr>
    <tr id="term-aoe" class="term-entry">
      <td>AoE</td>
      <td>Area of Effect. All characters in the targeted area take the effect.</td>
    </tr>
    <tr id="term-bounce" class="term-entry">
      <td>Bounce</td>
      <td>A card with the Bounce area tag affects the main target and a random adjacent character. See <a class="ua-keyword-link" data-keyword="keyword-bounce" href="#">Bounce X</a> for repeats.</td>
    </tr>
    <tr id="term-splash" class="term-entry">
      <td>Splash</td>
      <td>An adjacent character to the main target will also take the effect.</td>
    </tr>
    <tr class="term-section">
      <th colspan="2">Math</th>
    </tr>
    <tr id="term-halve" class="term-entry">
      <td>Halve</td>
      <td>Set the current value to half its current value, rounding down (floor).</td>
    </tr>
    <tr id="term-rounding" class="term-entry">
      <td>Rounding</td>
      <td>Any time a calculation results in a decimal, round down (floor).</td>
    </tr>
  </tbody>
</table>
</div>
