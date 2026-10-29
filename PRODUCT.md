# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two groups, weighted equally:

- **Emergency-sim players**, mostly German-speaking, who grew up on dispatch and incident-scene games and want more depth than "dispatch, timer runs out, done".
- **Real firefighters** (volunteer, professional, industrial) who judge the game on accuracy and will notice when a vehicle, alarm keyword or procedure is wrong.

They come to leitstelle.io to see what the game is, check whether it's real enough to care about, follow development, and join the community.

## Product Purpose

leitstelle.io is the public home of **Leitstelle**, a desktop firefighting game in development. The site presents the game, carries the devlog (posts going back to 2015) and an FAQ, and funnels visitors into the community.

The game: you run the dispatch centre *and* command the scene yourself, on a real map with real fire stations, real hydrants and the brigades' real vehicles. It starts with the district (Landkreis) of Freising, with the whole of Germany and beyond to follow.

**Success right now** (no playtest or store page exists yet): a visitor joins the Discord or the forum. Playtests will be announced there first. The devlog gives followers a reason to come back.

## Positioning

Dispatcher and incident commander in one. Other games do one or the other; in Leitstelle the call comes in at a real address, you alert units from real stations, and when they arrive you dismount the crew, fetch the equipment, set up the ladder and build the water supply yourself. Nothing happens on its own. Every detail of the first district is checkable against reality, and the author is a trained firefighter (Werkfeuerwehrmann).

## Operating Context

- Visitors arrive from Discord, the forum, sim-gaming communities and fire-brigade circles; many read in German.
- The site is a Nuxt 3 app with @nuxt/content (Markdown posts and FAQ under `content/de` and `content/en`), Tailwind and @nuxtjs/i18n. German is the default locale (`prefix_and_default`), English sits alongside, and every page and post exists in both.
- Community channels: Discord (`https://discord.gg/cdRq3bztJu`) for quick chat and news, which lands there first, and the forum (`https://forum.leitstelle.io`) for longer discussions and anything worth finding again.
- Fathom analytics is loaded site-wide.

## Capabilities and Constraints

- **The game:** native desktop on macOS, Windows and Linux, built with Rust and Bevy. It doesn't run in the browser and isn't publicly playable yet.
- **What can be said publicly:** real OSM-based map of Freising, real stations, hydrants and vehicles; fire and water simulation (hydrants, open water, long hose lays, tanker shuttles); alarm keywords and FMS radio status; co-op ("with friends", solo, LAN, online; keep the co-op description general); Summi, the bug-report drone; a 24/7 persistent world later.
- **Live numbers:** the station, hydrant and vehicle counts change during development. Check the engine8 docs (`/Users/wellerli/Dev/2026/engine8/docs`) before writing copy. At the time of writing the site says 83 stations, 3,716 hydrants and 130+ vehicles.
- **Scope:** fire brigade now. Rescue service (Rettungsdienst), police and THW are planned for later.
- **No launch date.** Don't promise one or imply one.
- **Terminology:** the public name is "Leitstelle" with no suffix (in-game it reads "Leitstelle Freising" because Freising is the first map). Use real German fire-service terms (HLF, Drehleiter, B 1–4, THL 1–3, FMS) and keep them accurate.
- **Legacy:** the old browser game's map demo (`components/map.vue`) stays in the codebase but off the homepage.
- **Open:** no Steam/store page and no playtest sign-up mechanism exists yet.

## Brand Commitments

- Name: Leitstelle. Domain: leitstelle.io. Existing logo assets are in `public/` (`logo-pixel.svg`, `leitstelle.io.logo.png`).
- Voice: first person and honest, from a solo developer. Posts are signed "André". It speaks plainly about what works and what doesn't, avoids hype, and makes no promises it can't keep.
- New copy doesn't name other games. Older devlog posts that name them stay as written.

## Evidence on Hand

- Real in-game screenshots in `public/images/game/` (hero night fire, blue hour, day overview, golden hour, Altstadt, Isar fields, night beacons, the four feature images, post images including co-op and Summi), each in full size and 1280px webp.
- More game art and look references in the engine8 repo (`art/`, `docs/look`).
- A devlog dating from 2015 to 2026 (`content/*/blog`), plus the FAQ and the game-state page.
- **Missing, to be provided by the user:** the gameplay video for the hero (`/videos/gameplay.mp4`) and the recording of the old web version for the "Coming full circle" post.
- **Doesn't exist, so don't make it up:** testimonials, player counts, press quotes, reviews, a release date, pricing, store links.

## Product Principles

1. **Real or nothing.** Every station, vehicle, term and procedure shown must stand up to a firefighter's scrutiny. The game's real footage is the proof, so show it.
2. **Both seats, one game.** Always present dispatch and on-scene command together. That pairing is the reason the game exists.
3. **Honest about the stage.** It's in development, there's no date, and the site says so plainly and points people to Discord and the forum for what comes next.
4. **Community first.** Every surface should make it easy to join the Discord or forum, because that's where playtests and news land.
5. **German first, English alongside.** Write German as the primary language and keep both locales matched.

## Accessibility & Inclusion

No product-specific standard has been set beyond sensible web defaults. Every page must work in both German and English.
