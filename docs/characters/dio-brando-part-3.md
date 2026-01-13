# DIO (Part 3)

<div class="character-header">
  <div class="character-image">
    <img src="../../assets/characters/dio-brando-part-3.png" alt="DIO (Part 3) portrait" loading="lazy" decoding="async" />
  </div>
  <div class="character-details">
    <div class="character-meta">
      <p><strong>Name:</strong> DIO</p>
      <p><strong>Version:</strong> Part 3</p>
      <p><strong>Origin:</strong> JoJo's Bizarre Adventure</p>
      <p><strong>Roles:</strong> <a class="ua-role-link" data-role="role-assassin" href="#">Assassin</a>, <a class="ua-role-link" data-role="role-controller" href="#">Controller</a></p>
      <p><strong>Difficulty:</strong> High</p>
      <p><strong>Gameplan:</strong> Fragile when unfed, oppressive when fed. Land Vampiric Drain to stock Stolen Blood, convert it into Blood Focus to crush Energy costs, then use The World: Time Stop to lock the round and close with knife pressure or ROAD ROLLER DA!</p>
    </div>
  </div>
</div>

## Innates
<div class="card-block">
  <p class="card-block__title">Vampire Physiology</p>
  <p><a class="ua-keyword-link" data-keyword="keyword-resist" href="#">Resist</a> 3 (Physical).</p>
</div>

<div class="card-block">
  <p class="card-block__title">Predator's Regeneration</p>
  <p>The first time each turn this character gains Stolen Blood, heal 10 HP.</p>
</div>

<div class="card-block">
  <p class="card-block__title">Blood Is Power</p>
  <p>Whenever this character gains X Stolen Blood, gain X Blood Focus.</p>
  <p>Whenever this character spends X Stolen Blood, reduce Blood Focus Value by X.</p>
  <p>Once per game, when this character would be reduced to 0 HP: Spend 3 Stolen Blood? Set HP to 1 instead.</p>
</div>

## Status Effects

<div class="ua-entry ua-entry--compact status-entry">
  <p class="ua-entry__title">Stolen Blood</p>
  <p class="ua-entry__meta"><span class="ua-pill">Type</span> Unique.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Max Value</span> 10.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Turn End</span> Reduce Value by 1.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Effect</span> A resource gained by feeding; used to extend Time Stop and empower finishers.</p>
</div>

<div class="ua-entry ua-entry--compact status-entry">
  <p class="ua-entry__title">Blood Focus</p>
  <p class="ua-entry__meta"><span class="ua-pill">Type</span> Unique.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Max Value</span> 10.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Turn End</span> Reduce Value by 1.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Effect</span> Reduce the Energy cost of this character's cards by Value (minimum 0). This stacks with <a class="ua-status-link" data-status="status-focus" href="#">Focus</a>.</p>
</div>

<div class="ua-entry ua-entry--compact status-entry">
  <p class="ua-entry__title">The World: Time Stop</p>
  <p class="ua-entry__meta"><span class="ua-pill">Type</span> Unique.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Count</span> Max 8.</p>
  <p class="ua-entry__meta"><span class="ua-pill">On Gain</span> Gain 2 <a class="ua-status-link" data-status="status-strength" href="#">Strength</a> and +2 Strength Count. Gain 2 <a class="ua-status-link" data-status="status-haste" href="#">Haste</a> and +2 Haste Count.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Effect</span> While this has 1+ Count, this character's Attack cards have <a class="ua-keyword-link" data-keyword="keyword-follow-up" href="#">Follow-Up</a>.</p>
  <p class="ua-entry__meta"><span class="ua-pill">Turn End</span> Reduce Count by 1.</p>
  <p class="ua-entry__meta"><span class="ua-pill">When this expires</span> Gain 2 <a class="ua-status-link" data-status="status-strain" href="#">Strain</a> and +4 Strain Count.</p>
</div>

## Cards

### Card 1-1: Strike
<div class="card-block">
  <div class="card-block__meta">
    <span><strong>Cost:</strong> 4 Energy</span>
    <span><strong>Power:</strong> 20-28</span>
    <span><strong>Type:</strong> Basic, Attack, Physical, Melee, Blunt</span>
    <span><strong>Target:</strong> 1 Enemy</span>
    <span><strong>Speed:</strong> Normal</span>
  </div>
  <p class="card-block__heading">Effect</p>
  <p>Deal Power damage.</p>
  <p>On Hit: If the target has <a class="ua-status-link" data-status="status-stun" href="#">Stun</a>: Gain 1 Stolen Blood.</p>
  <p>If this character has The World: Time Stop: This card becomes Strike: Muda Barrage.</p>
</div>

### Card 1-2: Strike: Muda Barrage
<div class="card-block">
  <div class="card-block__meta">
    <span><strong>Cost:</strong> 4 Energy</span>
    <span><strong>Power:</strong> 20-28</span>
    <span><strong>Type:</strong> Basic, Attack, Physical, Melee, Blunt, Multihit, Debuff</span>
    <span><strong>Target:</strong> 1 Enemy</span>
    <span><strong>Speed:</strong> Fast</span>
  </div>
  <p class="card-block__heading">Effect</p>
  <p>Deal Power / 4 damage 4 times.</p>
  <p>On Hit: Inflict 1 <a class="ua-status-link" data-status="status-bleed" href="#">Bleed</a>.</p>
  <p>Once per use, if the target has <a class="ua-status-link" data-status="status-stun" href="#">Stun</a>: Gain 2 Stolen Blood.</p>
</div>

### Card 2-1: Defend
<div class="card-block">
  <div class="card-block__meta">
    <span><strong>Cost:</strong> 4 Energy</span>
    <span><strong>Power:</strong> 20-28</span>
    <span><strong>Type:</strong> Basic, Defense, Physical, Melee</span>
    <span><strong>Target:</strong> 1 Ally</span>
    <span><strong>Speed:</strong> Normal</span>
  </div>
  <p class="card-block__heading">Effect</p>
  <p>Gain Power Shield.</p>
  <p><a class="ua-keyword-link" data-keyword="keyword-evade" href="#">Evade</a>.</p>
  <p>If this character has The World: Time Stop: This card becomes Defend: The World.</p>
</div>

### Card 2-2: Defend: The World
<div class="card-block">
  <div class="card-block__meta">
    <span><strong>Cost:</strong> 4 Energy</span>
    <span><strong>Power:</strong> 20-28</span>
    <span><strong>Type:</strong> Basic, Defense, Physical, Melee, Buff</span>
    <span><strong>Target:</strong> Self</span>
    <span><strong>Speed:</strong> Fast</span>
  </div>
  <p class="card-block__heading">Effect</p>
  <p>Gain Power Shield.</p>
  <p><a class="ua-keyword-link" data-keyword="keyword-evade" href="#">Evade</a>.</p>
  <p><a class="ua-keyword-link" data-keyword="keyword-follow-up" href="#">Follow-Up</a>.</p>
  <p>After Use: Gain 1 <a class="ua-status-link" data-status="status-haste" href="#">Haste</a> and +1 Haste Count.</p>
  <p><a class="ua-keyword-link" data-keyword="keyword-retain" href="#">Retain</a>.</p>
</div>

### Card 3: Vampiric Drain
<div class="card-block">
  <div class="card-block__meta">
    <span><strong>Cost:</strong> 5 Energy</span>
    <span><strong>Power:</strong> 24-36</span>
    <span><strong>Type:</strong> Technique, Attack, Physical, Melee, Pierce, Recovery, Debuff</span>
    <span><strong>Target:</strong> 1 Enemy</span>
    <span><strong>Speed:</strong> Normal</span>
  </div>
  <p class="card-block__heading">Effect</p>
  <p>Deal Power damage.</p>
  <p>Heal for Power / 2 HP.</p>
  <p>Gain 4 Stolen Blood.</p>
  <p>On Hit: Inflict 2 <a class="ua-status-link" data-status="status-weak" href="#">Weak</a> and +2 Weak Count.</p>
  <p>On Hit: If the target has <a class="ua-status-link" data-status="status-stun" href="#">Stun</a>: Gain 2 Stolen Blood.</p>
</div>

### Card 4-1: Throwing Knives
<div class="card-block">
  <div class="card-block__meta">
    <span><strong>Cost:</strong> 7 Energy</span>
    <span><strong>Power:</strong> 34-50</span>
    <span><strong>Type:</strong> Technique, Attack, Physical, Ranged, Pierce, Multihit, Debuff</span>
    <span><strong>Target:</strong> 1 Enemy</span>
    <span><strong>Speed:</strong> Normal</span>
  </div>
  <p class="card-block__heading">Effect</p>
  <p>This card's Multihit Count starts at 6.</p>
  <p>Deal Power / 6 damage 6 times.</p>
  <p>On Hit: Inflict 1 <a class="ua-status-link" data-status="status-bleed" href="#">Bleed</a>.</p>
  <p>If this character has The World: Time Stop: This card becomes Throwing Knives: Time Stop.</p>
</div>

### Card 4-2: Throwing Knives: Time Stop
<div class="card-block">
  <div class="card-block__meta">
    <span><strong>Cost:</strong> 7 Energy</span>
    <span><strong>Power:</strong> 34-50</span>
    <span><strong>Type:</strong> Technique, Attack, Physical, Ranged, Pierce, Multihit, Debuff</span>
    <span><strong>Target:</strong> 1 Enemy</span>
    <span><strong>Speed:</strong> Fast</span>
  </div>
  <p class="card-block__heading">Effect</p>
  <p>This card's Multihit Count starts at 10.</p>
  <p>Deal Power / 10 damage 10 times.</p>
  <p>On Hit: Inflict 1 <a class="ua-status-link" data-status="status-bleed" href="#">Bleed</a>.</p>
  <p>Once per use, if the target has <a class="ua-status-link" data-status="status-stun" href="#">Stun</a>: Deal 10 bonus damage.</p>
</div>

### Card 5: The World: Time Stop
<div class="card-block">
  <div class="card-block__meta">
    <span><strong>Cost:</strong> 9 Energy</span>
    <span><strong>Power:</strong> -</span>
    <span><strong>Type:</strong> Technique, Special, Magical, Ranged, AoE, Transformation, Debuff</span>
    <span><strong>Target:</strong> Self</span>
    <span><strong>Speed:</strong> Fast</span>
  </div>
  <p class="card-block__heading">Effect</p>
  <p>Gain 1 The World: Time Stop and +2 The World: Time Stop Count.</p>
  <p>Spend X Stolen Blood (0-5)? Gain +X The World: Time Stop Count.</p>
  <p>Inflict 1 <a class="ua-status-link" data-status="status-stun" href="#">Stun</a> on All Enemies.</p>
  <p>Until the end of this Combat Round, enemies <a class="ua-term-link" data-term="term-cannot-play-cards" href="#">cannot play cards</a>. (Cards already played still resolve.)</p>
  <p><a class="ua-keyword-link" data-keyword="keyword-retain" href="#">Retain</a>.</p>
</div>

### Ultimate: ROAD ROLLER DA!
<div class="card-block">
  <div class="card-block__meta">
    <span><strong>Cost:</strong> 40 Ultimate Meter</span>
    <span><strong>Power:</strong> 72-108</span>
    <span><strong>Type:</strong> Ultimate, Attack, Physical, Melee, Splash, Blunt, Debuff</span>
    <span><strong>Target:</strong> 1 Enemy</span>
    <span><strong>Speed:</strong> Fast</span>
  </div>
  <p class="card-block__heading">Effect</p>
  <p>Can only be played if this character has The World: Time Stop.</p>
  <p>Deal Power damage.</p>
  <p>On Hit: Inflict 1 <a class="ua-status-link" data-status="status-stun" href="#">Stun</a>.</p>
  <p>Spend X Stolen Blood (0-10)? Deal 6 times X bonus damage and inflict X <a class="ua-status-link" data-status="status-bleed" href="#">Bleed</a>.</p>
  <p>After Use: Set this character's The World: Time Stop Count to 0.</p>
</div>

