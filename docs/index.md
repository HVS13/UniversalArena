# Welcome to Universal Arena

This site outlines the structure and references for Universal Arena. Add your own content as you grow the guide.

<p class="ua-last-updated">Last updated: <time datetime="2026-01-11T01:03">2026-01-11 01:03</time></p>

## Introduction

This guide summarizes core systems and links to the detailed reference pages for terms, keywords, and characters.

## Quick Start

1. Each player chooses 3 characters (no duplicate Name + Version on the same team).
2. Take each character's 5 cards (2 Basic + 3 Technique), shuffle them into one shared draw pile, and keep each Ultimate card outside the draw pile.
3. Turn Start: draw to 5 cards in a shared hand, then set shared Energy to 5.
4. Movement Round: players alternate. On your priority, spend 1 Energy to swap two adjacent allies or pass. Movement swaps are not card plays and do not grant Ultimate Meter. The round ends when both players pass consecutively.
5. The player with initiative starts a Combat Round by playing a card into a legal zone (Fast/Normal/Slow).
6. Players alternate playing or passing; faster cards can interrupt slower zones.
7. When both players pass, resolve the Active Zone right to left, then continue until all zones are empty.
8. The initiative player may start another Combat Round or end the turn; at Turn End, discard all remaining cards.

Need a condensed, table-ready version? See the [Combat Round Ref Card](combat-round-ref.md).

## Win Conditions

Reduce all opposing characters' HP to 0 (or meet the scenario's win condition, if you're playing a special mode).

## Board

1. Deck Zone: This is where you place your deck. The pile is named **Draw Pile**.
2. Discard Zone: This is where you place your discarded cards. The pile is named **Discard Pile**.
3. Combat Zone: This is where you place your cards when you play them. The zone is divided into three:
   1. Fast Zone: This is where you play your fast cards.
   2. Normal Zone: This is where you play your fast or normal cards.
   3. Slow Zone: This is where you play your fast, normal, or slow cards.

> In each zone, cards are placed from **left to right** as they are played.
> Each team has its own line arranged left to right; adjacent means the immediate left or right neighbor on the same team line.

## Preparation

1. Each player chooses 3 characters. You cannot include two characters with the same Name and Version on one team.
2. For each character chosen, take their 5 cards (2 Basic + 3 Technique) and shuffle them into one draw pile, then place it in the Deck Zone.
3. Each character's Ultimate card starts outside the draw pile and remains available even after it is used.
4. Determine which player goes first.

## How To Play

1. Play is divided into 4 phases: Turn Start, Movement, Combat, Turn End.
2. At Turn Start, both players simultaneously draw until they have a hand size of 5, modified by draw effects (if any), then set Energy to 5 unless modified.
3. During the Movement Round, players alternate priority. On your priority, spend 1 Energy to swap two adjacent allies or Pass. Movement swaps are not card plays and do not grant Ultimate Meter. The round ends when both players pass consecutively.
4. At Combat Start, the player with initiative plays a card to initiate a Combat Round.
5. During Combat, players play cards and clash. Combat Rounds can repeat.
6. A Combat Round ends when there are no cards on any zone. The player with initiative may start another Combat Round or end their turn.
7. At Turn End, all players discard all remaining cards, then initiative passes to the next player.

## Playing Cards

1. To play any card, pay the Energy cost, select a legal target, then place it on a legal zone.
2. Any card played in any zone stays in that zone until it is used, then it is discarded.
3. For each card played, your team gains Ultimate Meter equal to the Energy spent to play the card. Energy is shared across the team.
4. If a card's speed is modified, treat it as its current speed for where it can be played.

## Movement Round

1. The Movement Round happens after Turn Start and before Combat.
2. The player with initiative has priority first.
3. On your priority, you may spend 1 Energy to swap two adjacent allied characters or Pass. Movement swaps are not card plays and do not grant Ultimate Meter.
4. If a swap would include a rooted character, the swap fails but the Energy is still spent.
5. Priority alternates back and forth until both players pass consecutively, then the Movement Round ends.
6. Rooted characters cannot be moved or swapped.

## How To Combat

1. When you have priority, you may play **1 card** (any type) on a legal zone, or you may **Pass**.
    - Fast cards can be placed in any zone.
    - Normal cards can be placed in the Normal or Slow Zone.
    - Slow cards can only be placed in the Slow Zone.
2. At the start of a Combat Round, the player with initiative plays a card and may choose any legal zone. That zone becomes the **Active Zone**.
3. After any card is played, priority passes to the next player in turn order.
4. After the first card of a Combat Round has been played, players may only play cards in the **Active Zone** or in a **faster zone** than the Active Zone (if legal).
5. **Faster zone interrupt:** If any player plays a card in a faster zone than the current Active Zone, the faster zone immediately becomes the Active Zone. The previous Active Zone is paused.
6. The Active Zone resolves when priority returns to the player who most recently played a card in the Active Zone, and that player chooses to Pass.
7. When the Active Zone resolves, use cards in that zone from **right to left** (last played to first played).
8. Resolve clashes in pairs. While resolving a zone from **right to left**, take the next card to use and pair it with the **nearest card immediately to its left** (the next card in the resolve order), if any:
    - If there is no card to its left, it is used unopposed.
    - If the left card is from a **different player**, the two cards clash.
    - If the left card is from the **same player**, the right card is used unopposed and is then discarded. The left card remains and can be paired later.
9. After the Active Zone resolves and becomes empty:
    - If there are any paused zones, return to the **fastest paused zone** and continue.
    - Otherwise, resolve the next slower zone that has cards.
10. When all clashes have finished and there are no cards on any zone, the Combat Round ends. The player with initiative may start another Combat Round (choosing any legal zone again), or end their turn.

Example:
1. You play a card in the Normal Zone (Normal Zone becomes the Active Zone).
2. Your opponent plays a card in the Normal Zone to counter it and start clashing.
3. You play another card in that clash.
4. Instead of countering again in the Normal Zone, your opponent plays a card in the Fast Zone.
5. The Fast Zone immediately becomes the Active Zone and resolves first. After it resolves, continue the clashing in the Normal Zone.

## Golden Example Turn

This is a single annotated combat round from initiative through resolution.

1. Initiative: Player A has initiative. Both players pass in the Movement Round.
2. Player A starts a Combat Round by playing a Normal attack targeting Player B in the Normal Zone. The Normal Zone becomes the Active Zone.
3. Player B responds by playing a Normal defense in the Normal Zone.
4. Player A adds another Normal attack to the same zone.
5. Player B interrupts by playing a Fast attack in the Fast Zone. The Fast Zone becomes the Active Zone and the Normal Zone pauses.
6. Player A plays a Fast defense in the Fast Zone.
7. Player B passes. Priority returns to Player A, who passes. The Fast Zone resolves.
8. Fast Zone resolution (right to left): Player A's defense and Player B's attack clash (Attack vs Defense). Use the defense (gain shield), then use the attack (it is a hit). Discard both cards.
9. Return to the paused Normal Zone. Priority is with Player B, who passes. Player A passes, so the Normal Zone resolves.
10. Normal Zone resolution (right to left): Player A's most recent attack clashes with Player B's defense (Attack vs Defense). Use the defense, then the attack. The earlier attack has no card to its left, so it is used unopposed.
11. All zones are empty, so the Combat Round ends. Player A may start another Combat Round or end their turn.

## Card Use and Timing

1. A card is **played** when it is placed in a legal zone after paying its cost and selecting legal targets.
2. A card is **used** when its effects apply. Unless a timing is explicitly stated, a card's text is **On Use**.
3. A card that is **Cancelled** skips its effects from **Before Use** onward (Before Use, On Use, On Hit, After Use). **Always** still applies.
4. A card that is **Negated** skips all effects, including **Always**.

Card effect timing order:

1. On Play
2. Before Clash
3. After Clash
4. Before Use
5. On Use (default)
6. On Hit
7. After Use
8. Always

If multiple effects trigger at the same timing, apply them in the order they are written on the card.

## Power

1. Each card has a Power value shown in its card block as a min-max range (example: 8-12).
2. When a card is used (after any clash, or when unopposed), roll Power within its printed min-max; that roll is the Power Roll.
3. Use the Power Roll only for damage dealt, shield gained, and HP recovered. Other numeric effects use their written values unless the effect uses another value (example: X). Costs and requirements stay as written.
4. Special cards have Power: - and do not roll Power.
5. Roll Power each time a card is used. Multihit and Reuse roll again for each hit or reuse.
6. All Power calculations round down and clamp the minimum at 0.

## How To Clash

1. Attack VS Attack: The card with the highest total Power wins (for Multihit, sum the Power Rolls for that clash).
    - The losing card is **Cancelled** (skip Before Use onward; **Always** still applies), then it is discarded. If the losing card has Multihit, reduce its multihit count by 1 and Reuse it instead of discarding it (see Card Types).
    - The winning card is not used yet; it remains in the zone and continues through the stack. After the losing card is removed, the winning card may be paired again with the new nearest card immediately to its left as zone resolution continues.
    - If it is a draw, both cards are considered losses and are **Cancelled**.
2. Attack VS Defense: The defense card is used and gives Power Shield. Then the attack is used and is considered a hit. Both cards are then discarded.
3. Defense VS Defense: Both defense cards are used and give Power Shield. Both cards are then discarded.
4. Any VS Special: Both cards are used. Both cards are then discarded.
5. A hit occurs when an Attack is used unless it is prevented (example: Evade). If a card is instructed to Reuse, it is not discarded after its clash and remains in the current zone to be paired again.

## Terminology

See the full glossary on the Terminology page.

- [Terminology](terminology.md)

## Keywords

Keyword definitions live on a dedicated page with filtering to keep long lists readable.

- [Keywords](keywords.md)

## Card Types

Card type definitions and rules live on a dedicated page.

- [Card Types](card-types.md)

## Status Effects

Status effect rules and reference entries live on a dedicated page.

- [Status Effects](status-effects.md)

## Roles

Role definitions live on a dedicated page.

- [Roles](roles.md)

## FAQ

Frequently asked questions about the game.

- [FAQ](faq.md)

## Characters

Browse character cards and their keyword callouts.

- [Characters](characters/index.md)


