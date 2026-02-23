# TODOS

## How the storyline works
Starting with the first scene in the sequence, it jumps to the first tag in order. It takes the dialogue and puts that into the narration box.
I think I ought to revamp it and make everything a chat function rather than have a dialogue or chat entry.

| Friend		| Ambient or Narration	| Foes		|
| ----------	| ----------------		| -----		|
| Blue color	| Grey color			| Red color	|

The order parameter is just for organizations sake at the moment. But the options have a `ref` parameter, which references the tag that goes after that option.
There are a couple of special parameters that need special functions, listed at the end of this document. Some of these include the acquire parameter, which needs a pre-built item, as well as a target specified by the @ tag.
The effect function can do a multitude of things. So far I just have it set to unequip with an @ target parameter and a # to specify what to unequip.
The fight parameters will likely be the most involved, necessitating pre-built enemies, ai's, optional ref tags or a boolean that takes the storyline to the next scene.
I think I may also have to add starting parameters to check, for example, if any of the party survived the first battle, or if only @main survived. Not sure how I'll work that out. Perhaps put a `requred` parameter, and if it's not met, then move on to the next `tag` in `order`?

## acquire functions
	item
		spell-scroll-banish	//banishes all enemies
		cowards-pendant //boosts stats like health or mana
	target
		@main
	
## effect functions
	effect
		unequip
	target
		@main	//target the main character
		\#all	//unequip all equipment
		\#armor	//unequip all armor--that is, chestplate, helmet, boots, greaves, gauntlets, etc.

## fight parameters
	enemies
		skeleton-ancient-warrior
		skeleton-ancient-wizard
		skeleton-ancient-archer
		skeleton-firehurler
		turpis &ai:isolate@main
	ai-target
		!@main
	next-scene
		boolean //moves to the next scene in the storyline
	ref //tag for where to go when the fight is over