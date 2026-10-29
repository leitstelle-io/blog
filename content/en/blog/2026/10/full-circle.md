---
published_at: "2026-10-28"
title: "Coming full circle"
description: "The browser game becomes a true firefighting game: dispatch and incident command in one, on a real map, with fire, water and co-op. Why I'm going back to the roots – and what I'm taking with me."
cover: "/images/game/hero-nacht-1280.webp"
---

![A turntable ladder at a burning house, firefighters at work](/images/game/post-house-fire-1280.webp)

# Coming full circle 🚒

In 2015 I wrote here for the first time about my dream: a firefighting game of my own. Fuelled by `Emergency 1–4`, `Feuerwache.net`, `LstSim.de` and later `Leitstellenspiel.de`. A good ten years later, that dream has taken a turn – back to where it started.

## What happened during the break

In early 2025 I paused the project to train as an industrial firefighter (Werkfeuerwehrmann). That time changed how I see the game. Anyone who has stood at an incident knows: nothing happens on scene by itself. Someone has to dismount, fetch the equipment, build the water supply and make the calls. That was exactly what the game was missing.

## What the browser version was

Until now, `leitstelle.io` was a browser game: Laravel, Vue and MapLibre, a map of any place you like, vehicles as icons driving along real roads. Working with `OSRM` and `Overpass`, the custom map tiles, the map debugging tool – all of it taught me an incredible amount.

::video-slot{poster="/images/blog/10-first-steps-with-osrm.png" caption="The last state of the browser version"}
::

But honestly, it was a dispatch game like many others: you dispatch, a timer runs out, done. Exciting for a few calls, but not the game I dreamed of in 2015.

## The turn

My passion always came from two sides: the dispatch centre from `Leitstellenspiel.de` and `LstSim.de`, and the incident scene from `Emergency`. Leitstelle now brings both together and goes beyond them. You take the emergency call, alert the right vehicles from real stations – and when they arrive, you take over yourself.

## What the game is now

**Real map, real data.** The entire district of Freising, built from OpenStreetMap and the Bavarian terrain model: 83 fire stations, 3,716 hydrants and more than 130 vehicles modelled on the real brigades. Calls come in with real addresses.

![An HLF responding at blue hour](/images/game/post-blue-hour-drive-1280.webp)

**Dispatcher and commander.** Vehicles wait for their crew, drive real roads and report their status like on the radio. On scene you dismount the crew, fetch hose, cutter or saw from the truck and set up the turntable ladder.

**Fire and water, simulated.** A fire grows when too little water reaches it. You lay the supply line to a hydrant, draft from a stream or build long hose lays truck to truck.

![The water supply from the stream is up while the next alarm comes in](/images/game/post-draft-line-1280.webp)

**Together with friends.** You play co-op in the same world. Everyone takes charge of their own vehicles, and the game only pauses when everyone agrees.

![Three players in co-op with the player list and a pause vote](/images/game/post-coop-1280.webp)

And because bugs are part of development, there's `Summi`: a little drone with big eyes that lets you report bugs right from inside the game.

![Summi, the bug-report drone, as a 3D model](/images/game/post-summi-1280.webp)

## New tech, old knowledge

Leitstelle no longer runs in the browser. It's a desktop game for macOS, Windows and Linux, built with `Rust` and `Bevy`. None of the old PHP code survived, but a lot of the knowledge did: the research on stations and vehicles, the logic behind alarm keywords and dispatch, the ideas around reconnaissance and calling in more units. The browser version wasn't a detour, it was the foundation.

## Freising first, then Germany and beyond

The first district is Freising. I know it well, and every detail there can be checked. The technology behind it, though, is built for the whole of Germany – and beyond.

## What's next

- calls that are reported wrongly, and reconnaissance that shows what's really going on
- wind that spreads fires to neighbouring buildings
- a living world where traffic forms an emergency lane
- rescue service, police and THW
- a persistent world that keeps running around the clock
- a companion app for on the go

There's deliberately no date yet. I'll announce the first playtests on [Discord](https://discord.gg/cdRq3bztJu) and in the [forum](https://forum.leitstelle.io) first. Drop by, tell me about your stations and vehicles, and let's build the firefighting game we've always dreamed of – together.

Coming full circle. See you soon!

André
