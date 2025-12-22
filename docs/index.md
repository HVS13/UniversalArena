# Welcome to Universal Arena

This site outlines the structure and references for Universal Arena. Add your own content as you grow the guide.

## Introduction

This guide summarizes core systems and links to the detailed reference pages for terms, keywords, and characters.

## Win Conditions

Reduce the opposing team's HP to 0 (or meet the scenario's win condition, if you're playing a special mode).

## Board

1. Deck Zone: This is where you place your deck. The pile is named **Draw Pile**.
2. Discard Zone: This is where you place your discarded cards. The pile is named **Discard Pile**.
3. Combat Zone: This is where you place your cards when you play them. The zone is divided into 3:
   1. Fast Zone: This is where you play your fast cards.
   2. Normal Zone: This is where you play your fast/normal cards.
   3. Slow Zone: This is where you play your fast/normal/slow cards.

> In each zone, cards are placed from **left to right** as they are played.
> Characters are arranged left to right in a single row; adjacent means the immediate left or right neighbor.

## Preparation

1. Each player chooses their characters. There cannot be the same character with the same Name and Version on one team.
2. For each character chosen, take their 5 cards and shuffle them into one draw pile and place them into the Deck Zone.
3. Each character's Ultimate card starts outside the draw pile and remains available even after it is used.
4. Determine which player who goes first.

## How To Play

1. Play is divided into 3 phases: Turn Start, Combat, Turn End.
2. At Turn Start, both players simultaneously draw until they have a hand size of 5, modified by draw effects (example: Haste +3 means draw to 8; Slow +3 means draw to 2), then refresh energy to 5 unless modified.
3. At Combat Start, the player with initiative plays a card to initiate a Combat Round.
4. During Combat, players play cards and clash. Combat Rounds can repeat.
5. A Combat Round ends when there are no cards on any zone. The player with initiative may start another Combat Round or end their turn.
6. At Turn End, all players discard all remaining cards, then initiative passes to the next player.

## Playing Cards

1. To play any card, pay the energy cost, select a legal target, then place it on a legal zone.
2. Any card played in any zone stays in that zone until it is resolved, then it is discarded.
3. For each card played, you gain ultimate meter equal to the energy spent using the card.

## How To Combat

1. When you have priority, you may play **1 card** (any type) on a legal zone, or you may **Pass**.
    - Fast cards can be placed in any zone.
    - Normal cards can be placed in the Normal/Slow Zone.
    - Slow cards can only be placed in the Slow Zone.
2. At the start of a Combat Round, the player with initiative plays a card and may choose any legal zone. That zone becomes the **Active Zone**.
3. After any card is played, priority passes to the next player in turn order.
4. After the first card of a Combat Round has been played, players may only play cards in the **Active Zone** or in a **faster zone** than the Active Zone (if legal).
5. **Faster zone interrupt:** If any player plays a card in a faster zone than the current Active Zone, the faster zone immediately becomes the Active Zone. The previous Active Zone is paused.
6. The Active Zone resolves when priority returns to the player who most recently played a card in the Active Zone, and that player chooses to Pass.
7. When the Active Zone resolves, resolve cards in that zone from **right to left** (last played to first played).
8. Resolve clashes in pairs. While resolving a zone from **right to left**, take the next card to resolve and pair it with the **nearest card immediately to its left** (the next card in the resolve order), if any:
    - If there is no card to its left, it resolves unopposed.
    - If the left card is from a **different player**, the two cards clash.
    - If the left card is from the **same player**, the right card resolves unopposed and is then discarded. The left card remains and can be paired later.
9. After the Active Zone resolves and becomes empty:
    - If there are any paused zones, return to the **fastest paused zone** and continue.
    - Otherwise, resolve the next slower zone that has cards.
10. When all clashes have been resolved and there are no cards on any zone, the Combat Round ends. The player with initiative may start another Combat Round (choosing any legal zone again), or end their turn.

Example:
1. You play a card in the Normal Zone (Normal Zone becomes the Active Zone).
2. Your opponent plays a card in the Normal Zone to counter it and start clashing.
3. You play another card in that clash.
4. Instead of countering again in the Normal Zone, your opponent plays a card in the Fast Zone.
5. The Fast Zone immediately becomes the Active Zone and resolves first. After it resolves, continue the clashing in the Normal Zone.

## How To Clash

1. Attack VS Attack: The card with the most total damage wins (against multi-hit, use total damage to compare).
    - The losing card does not resolve any damage and does not resolve any **On Hit** effects. Its other effects still resolve, then it is discarded.
    - The winning card is not resolved yet; it remains in the zone and continues through the stack. After the losing card is removed, the winning card may be paired again with the new nearest card immediately to its left as zone resolution continues.
    - If it is a draw, both cards are considered losses.
        - Resolve the other effects (non-damage, non-On Hit effects) of the rightmost card first, then the left card, then discard both.
2. Attack VS Defense: The defense card resolves and gives shield. Then the attack resolves and is considered a hit. Both cards are then discarded.
3. Defense VS Defense: Both defense cards resolve and give shield. Both cards are then discarded.
4. Any VS Special: Both cards resolve. Both cards are then discarded.
5. A hit occurs when an Attack resolves unless it is prevented (example: Evade). If a card is instructed to Reuse, it is not discarded after its clash and remains in the current zone to be paired again.

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

## FAQ

Frequently asked questions about the game.

- [FAQ](faq.md)

## Characters

Browse character cards and their keyword callouts.

- [Characters](characters/index.md)


