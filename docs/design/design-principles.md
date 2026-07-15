# Universal Arena Design Principles

> **Status:** Approved design specification for Rules v2.  
> **Authority:** This document defines the intended design philosophy. It does not by itself change currently implemented Rules v1 behavior. When implementation differs, follow the migration plan and update structured data before claiming Rules v2 compliance.

Universal Arena is a lore-first 3v3 crossover card game. Its purpose is not to flatten fictional characters into equal competitive units. Its purpose is to translate how a selected canonical version **feels, fights, survives, develops, and wins** into a shared tactical rules system.

This document is the highest-level design authority for character creation and rules interpretation. More specific documents may define implementation details, but they should not contradict these principles without an explicit, documented exception.

## 1. Character feel comes first

A character must genuinely play like the selected canonical version.

A successful design should reproduce:

- The character's ordinary level of power, not only their Ultimate.
- Their preferred rhythm, range, commitment, and decision-making.
- Their signature techniques, transformations, equipment, resources, and limitations.
- Their defining gimmicks and hax.
- Their personality, knowledge, restraint, recklessness, or tactical habits when those traits materially affect combat.
- Their canonical weaknesses, costs, aftermaths, and failure states.

A technically functional kit is not successful if the character could be renamed and still play the same.

## 2. Preserve power disparity

Universal Arena does not require equal one-versus-one performance.

A vastly stronger character should feel vastly stronger in direct combat. Jiren should be more imposing, durable, and dangerous than Yajirobe. A weak or ordinary human should not receive unsupported Power, durability, or control resistance merely to produce apparent parity.

Power disparity may appear through:

- Higher ordinary Attack and Defense Power.
- Better clash reliability.
- Greater resistance or immunity when canonically supported.
- Stronger Basics and Techniques, not only stronger Ultimates.
- Superior action economy, Speed pathways, area pressure, or survivability.
- The ability to force weaker opponents into avoidance, protection, setup, or opportunistic play.

A weaker character remains meaningful through lore-appropriate contribution such as efficiency, support, preparation, information, equipment, deception, survival, niche utility, or a narrow canonical exploit.

The review question is not "Can this character duel every other character fairly?" It is:

> Does this character make a meaningful, lore-accurate contribution to a three-character team?

Even team contribution is not required to be mathematically identical. Intentional asymmetry is allowed and should be documented rather than hidden.

## 3. Preserve signature hax

Defining hax should retain its defining function.

Examples:

- DIO's Time Stop should meaningfully stop enemy action.
- Light's Death Note should remain a true defeat route rather than ordinary Mental damage.
- Sealing should seal.
- Copying should copy within canonical boundaries.
- Resurrection should return a defeated character when its conditions are met.
- Intangibility, time manipulation, soul effects, mind control, erasure, dimensional removal, and similar abilities should not be reduced to generic Power modifiers when their fiction requires a distinct mechanic.

When a signature ability is too easy to access, balance the **route** before weakening the effect.

Preferred access controls include:

1. Canonical conditions.
2. Energy or Ultimate Meter cost.
3. Personal resources.
4. Visible preparation.
5. Speed and interruption windows.
6. Position or target requirements.
7. Duration or consumable fuel.
8. Frequency limits.
9. Canonical aftermath or vulnerability.
10. Once-per-game or replacement lifecycle only when appropriate.

A successfully prepared ability may be intentionally overwhelming. Counterplay can occur before activation, during resolution, or after the effect ends; it does not need to remain equally available at every stage.

## 4. Lore accuracy precedes conventional balance

Use this order when designing or reviewing a mechanic:

1. Determine what the ability canonically does.
2. Determine the selected version and continuity boundaries.
3. Identify canonical requirements, limitations, costs, counters, and aftermaths.
4. Translate the ability into existing Universal Arena systems where those systems preserve its function.
5. Add an explicit exception when existing systems cannot represent it faithfully.
6. Evaluate access, frequency, team cost, and counterplay.
7. Adjust raw output only after the previous controls are insufficient.

Do not invent generic drawbacks before checking the source. Do not remove canonical drawbacks because they are inconvenient.

Power benchmarks and complexity limits are design aids, not ceilings. Major deviations are acceptable when they are source-supported and documented.

## 5. Balance the route, not the fantasy

When a powerful mechanic needs regulation, prefer changing:

- How it is prepared.
- How visible its progress is.
- How much shared Energy or Meter it consumes.
- Which personal resource it requires.
- Which card state, form, equipment, target condition, or position it needs.
- How long it lasts.
- How often it can be repeated.
- What it costs the rest of the team.
- What happens afterward.

Avoid arbitrary failure chances on canonically reliable abilities. Randomness should represent genuine uncertainty, chaos, gambling, unstable powers, random inventories, or canonical luck—not serve as a generic nerf.

## 6. Power and hax resistance are separate

Raw strength, damage, durability, Speed, and hax resistance are different canonical questions.

Do not assume:

- High Power grants Mental immunity.
- High durability prevents sealing or soul manipulation.
- Great movement speed permits action during stopped time.
- Magical power negates all supernatural systems.
- A stronger character automatically ignores alternate defeat conditions.
- A weaker character's hax automatically works regardless of canonical requirements.

Resistance, immunity, targeting restrictions, and effect immunity must be supported by the selected version or explicit crossover rules.

This allows outcomes such as DIO successfully stopping time against a physically superior opponent while still being unable to overcome that opponent's durability without sufficient offensive output.

## 7. Minimal crossover equalization

Universal Arena assumes only the minimum compatibility necessary for a match to function.

By default, characters can:

- Perceive one another sufficiently to participate.
- Select legal targets.
- Clash through the abstract combat system.
- Affect one another unless a specific rule says otherwise.

This does **not** automatically make fictional systems identical.

Ki, Chakra, Reiatsu, Nen, Cursed Energy, magic, psychic power, Stands, technology, and other systems remain distinct unless an effect explicitly relates them. Magic negation does not automatically negate Ki. Energy absorption does not automatically absorb every supernatural system. Source-system tags may be added for mechanics that care about those distinctions.

## 8. Separate magnitude from classification

Damage Types, Attack Tags, Properties, range, and area describe how an action interacts. They do not determine its magnitude.

A handgun bullet and Jiren's punch may both be Physical but should have radically different Power. Slash does not automatically cut every target. Pierce does not inherently bypass Shield. Blunt does not automatically Stun.

Rules v2 uses broad Damage Types:

- Physical
- Energy
- Magical
- Mental
- Spiritual

Elemental, material, technological, or phenomenological qualities such as Electric, Fire, Ice, Sonic, Explosive, Radiation, or Haki are optional **Properties**. Properties have no universal effect unless another rule references them.

New Damage Types, Properties, Attack Tags, and source-system tags must be additive, registry-based, and migratable.

## 9. Team contribution, not required composition

Universal Arena does not require an MMO trinity, lane roles, or one character from each category.

A team should instead be reviewed for:

- Immediate usable actions.
- Survival coverage.
- Interaction with the opponent.
- A credible defeat plan.
- Shared Energy and Meter compatibility.
- Hand and setup pressure.
- Speed and position coverage.
- Ability to continue after one character is defeated.

Roles, Archetypes, Capability Tags, economy profiles, and synergy metadata are descriptive tools. They do not grant mechanics and should not force team composition.

## 10. Open synergy over named-pair bonuses

Prefer synergy through shared game language:

- Global statuses.
- Position and Distance.
- Speed and timing.
- Attack categories and Properties.
- Card access.
- Energy and Meter.
- Protection and target manipulation.
- Setup and payoff conditions.

Avoid ordinary effects that say "if allied with [specific character]" or "if this franchise is present." Named relationships belong only in scenarios, dedicated duo/team characters, or mechanics whose canonical identity truly requires that exact partner.

A good synergy remains meaningful with future characters.

## 11. Basics establish the floor; Techniques create the ceiling

Each character contributes exactly two Basic cards and three Technique cards to the shared starting deck.

Basics should express dependable, foundational actions. The default recommendation is:

- One proactive Basic.
- One reactive, defensive, maintenance, or survival-oriented Basic.

This is not mandatory. A character may survive through Attack clashes, movement, Evade, Counter, Cover, regeneration, control, transformation, or another lore-accurate method.

Do not require generic names such as Strike and Defend. Use canonical names where possible. Stable slot IDs preserve structure even when card names differ.

Techniques should express the character's engine, signature decisions, progression, flexibility, or payoff. Transformations and variants should change decisions, not merely add Power.

## 12. Five cards are a deliberate compression

Not every famous action belongs in the starting five.

Select actions that create distinct gameplay decisions. Every component should have:

- A canonical job: what it represents in the source.
- A gameplay job: why the kit needs it.

Use:

- Innates for continuous truths.
- Statuses for persistent state.
- Created cards for temporary, prepared, conditional, or expandable breadth.
- `Becomes` for genuine state-dependent replacement.
- Ultimate pathways for climactic options and variants.
- Omission when an action is redundant, outside the version boundary, or not useful to the kit.

Maintain source metadata for considered-but-omitted actions so omissions are intentional and reviewable.

## 13. Shared economy, personal identity

Each team uses one shared draw pile, hand, Energy pool, and Ultimate Meter pool. Character cards still have explicit owners.

Normally:

- Only the owner plays its card.
- Personal statuses and resources belong to that character.
- Created cards inherit source-character ownership unless specified otherwise.
- Defeating a character removes its owned cards from active circulation.

Shared resources should create meaningful allocation decisions without erasing personal engines.

A high-demand character may consume most of the team's Energy or Meter, but should normally retain a useful low-investment floor and provide payoff proportional to the opportunity cost imposed on both allies.

## 14. Counterplay must preserve identity

Counterplay is meaningful decision-making, not equal power.

A major effect should document its interaction profile, including applicable channels such as:

- Visible setup.
- Resource commitment.
- Interruptible preparation.
- Target protection.
- Position requirements.
- Source vulnerability.
- Duration or fuel.
- Aftermath.
- Specific canonical counters.

Do not add universal diminishing returns, universal tenacity, or universal counterspells. Use scoped, lore-supported resistances and explicit effects.

Unique transformations and personal resources are immune to generic Cleanse, Dispel, and Purge by default unless an effect explicitly says otherwise.

## 15. Clear rules enable expressive exceptions

A lore-first game still requires deterministic resolution.

Rules v2 should define:

- Target locking and movement behavior.
- Timing and effect scopes.
- Clash and Use rolls.
- Multihit erosion.
- Simultaneous area batches.
- Defeat and resurrection.
- Ownership and card destinations.
- Status consumption and expiry.
- Rounding and clamping.
- Random eligibility and replayability.

Once defaults are clear, character text may override them through Rule Priority.

An exception must state exactly what it changes. Do not rely on vague narrative assumptions during play.

## 16. Extensibility and retroactive compatibility

All major systems must support additive expansion and intentional migration.

Use stable IDs and registries for:

- Damage Types.
- Properties.
- Attack Tags.
- Effect Tags.
- Roles, Archetypes, and Capability Tags.
- Status modes and persistence.
- Timings and events.
- Target and area definitions.
- Card lifecycle destinations.
- Defeat states and resurrection modes.
- Effect primitives and condition kinds.

Keep `schemaVersion` separate from `rulesVersion`.

When behavior changes:

1. Add an ordered migration.
2. Preserve legacy IDs as temporary aliases.
3. Update structured canonical data.
4. Validate that active data no longer depends on deprecated identifiers.
5. Record the interpretation change in a changelog.
6. Run roster-wide regression checks.

Do not silently reinterpret old content.

## 17. Inspiration policy

Universal Arena may take design inspiration from games such as Limbus Company, Library of Ruina, Slay the Spire, Slay the Spire 2, Morimens, and Chaos Zero Nightmare.

Borrow patterns that strengthen Universal Arena's own identity, including:

- Potency and Count.
- Multi-part attacks losing components through clashes.
- Explicit action sequencing.
- Persistent Counter actions.
- Strong card lifecycle vocabulary.
- Personal resources and companions.
- Visible threshold mechanics.
- Team cooperation without identity loss.

Do not import a complete subsystem merely because it works elsewhere. Universal Sanity, Stress, Stagger, Coins, Emotion, relics, or companion systems should only become universal if Universal Arena independently needs them. Otherwise, use them as character-specific or scenario mechanics when lore supports them.

## 18. Approval doctrine

A character or rule is ready only when all of the following are true:

- The selected version is clearly bounded.
- Mandatory character-feel goals are written.
- Major mechanics have source support.
- Power disparity is intentional.
- Signature hax retains its defining function.
- Access controls preserve rather than replace the fantasy.
- Team and economy consequences are understood.
- Structured behavior is authoritative and complete.
- Edge cases are deterministic.
- Exceptions and uncertainty are documented.
- The design can be expanded and migrated without rewriting unrelated content.

When conventional balance and character authenticity conflict, preserve authenticity first, then improve access, opportunity cost, counterplay, and documentation.