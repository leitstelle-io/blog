---
name: Leitstelle
description: The night-shift dispatch console of a firefighting game, carried over from the game's own window chrome onto the web.
colors:
  night: "#12122a"
  night-2: "#1b1a3a"
  night-3: "#25244a"
  bevel-hi: "#3a3766"
  bevel-lo: "#08081a"
  ink: "#ffe9c8"
  muted: "#a9a3c9"
  brand: "#8e2a22"
  brand-hi: "#b0412f"
  brand-lo: "#5e1a15"
  amber: "#e08a1e"
  amber-hi: "#ffd27a"
  amber-lo: "#8a4f0c"
  beacon: "#2f6bff"
  beacon-soft: "#7fa2ff"
  alarm: "#c8282c"
  select: "#5cff8f"
  fms-1: "#2a5bff"
  fms-2: "#2e9e44"
  fms-3: "#f08a24"
  fms-4: "#e6c229"
typography:
  display:
    fontFamily: "Pixelify Sans, ui-monospace, monospace"
    fontSize: "3.75rem"
    fontWeight: 600
    lineHeight: 1.25
    fontFeature: "\"liga\" 0, \"clig\" 0"
  headline:
    fontFamily: "Pixelify Sans, ui-monospace, monospace"
    fontSize: "3rem"
    fontWeight: 600
    lineHeight: 1.25
    fontFeature: "\"liga\" 0, \"clig\" 0"
  title:
    fontFamily: "Pixelify Sans, ui-monospace, monospace"
    fontSize: "1.875rem"
    fontWeight: 600
    lineHeight: 1.375
    fontFeature: "\"liga\" 0, \"clig\" 0"
  body-lead:
    fontFamily: "ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.625
  body:
    fontFamily: "ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Pixelify Sans, ui-monospace, monospace"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.25
    fontFeature: "\"liga\" 0, \"clig\" 0"
  fine-print:
    fontFamily: "ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.625
rounded:
  none: "0px"
spacing:
  bevel: "2px"
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "20px"
  xl: "32px"
  2xl: "40px"
  page: "64px"
  section: "96px"
components:
  button-primary:
    backgroundColor: "{colors.amber}"
    textColor: "{colors.night}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "8px 16px"
  button-primary-hover:
    backgroundColor: "{colors.amber-hi}"
    textColor: "{colors.night}"
  button-secondary:
    backgroundColor: "{colors.night-3}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "8px 16px"
  button-secondary-hover:
    backgroundColor: "{colors.bevel-hi}"
    textColor: "{colors.ink}"
  window-title-bar:
    backgroundColor: "{colors.brand}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "6px 12px"
  window-body:
    backgroundColor: "{colors.night-2}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "20px"
  spec-chip:
    backgroundColor: "{colors.bevel-lo}"
    textColor: "{colors.amber-hi}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "6px 12px"
  post-card:
    backgroundColor: "{colors.night-2}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "20px"
  post-card-hover:
    backgroundColor: "{colors.night-3}"
  faq-summary:
    backgroundColor: "{colors.night-2}"
    textColor: "{colors.ink}"
    padding: "16px 20px"
  faq-summary-open:
    backgroundColor: "{colors.brand}"
    textColor: "{colors.ink}"
  nav-link:
    textColor: "{colors.muted}"
  nav-link-active:
    textColor: "{colors.amber}"
---

# Design System: Leitstelle

## Overview

**Creative North Star: "The Night Shift Console"**

The site is the dispatch desk at two in the morning. The room is dark indigo, the windows on the desk are lit, and the keys you're meant to press glow amber. Everything is taken from the game's own UI: the same night colour grading, the same bevelled pixel windows with an oxblood title bar, the same Pixelify Sans lettering. A visitor should feel they've stepped out of the game into the room where it's run.

It's **cinematic** first. Real in-game screenshots, shown big, carry the story, and the hero is a full-viewport night fire with the text set into the darkness at the bottom left. Around the imagery the chrome is **warm under pressure**: Sodium Amber and Lamp-lit Parchment against cold Midnight Indigo, the calm, focused urgency of a shift where something is always burning somewhere. Density is low. Sections breathe at 96px, and the page alternates between the contained 72rem column and footage that runs edge to edge: the features play in one game console you operate, the gallery is a reel that runs off the screen, and the page closes on a calm pixel window. Nothing is tied to scrolling: the page scrolls like a page.

Depth comes from 2px pixel bevels, never from blur, gradients on chrome, or rounded corners. Visitors have rejected generic SaaS patterns here: feature-card grids, homemade placeholder icons and eyebrow labels all undercut a game whose whole pitch is its look.

**Key Characteristics:**
- Dark Midnight Indigo canvas with no light mode (`color-scheme: dark`).
- Real game footage as the main material, always framed in a 2px bevel.
- Hard-edged pixel chrome: square corners, inset bevels lit from the top left.
- Pixelify Sans for anything that's chrome or a heading; system sans for running prose.
- One amber key per cluster: the Discord call to action.

## Colors

The palette is taken from the game's night grading and window chrome: cold indigo surfaces, warm parchment text, fire-engine oxblood for chrome and amber for action.

### Primary
- **Sodium Amber** (`amber`): the action colour. It fills the primary button (Join Discord) and colours text links, the active nav item, bullets in prose, and the language switch in the footer. It's also the selection highlight.
- **Glowing Filament** (`amber-hi`): amber's lit state. Primary-button hover, link hover, spec-chip text, inline code, post-card title on hover.
- **Burnt Amber** (`amber-lo`): the dark bevel edge of the primary button and the underline colour of prose links.

### Secondary
- **Fire-Engine Oxblood** (`brand`): window chrome. It fills pixel-window title bars and the open FAQ summary, and draws blockquote borders. It's also the body of the pixel logo.
- **Hot Oxblood** (`brand-hi`): the logo's outline and highlight pixels. Not used in UI chrome yet.
- **Ember Oxblood** (`brand-lo`): oxblood's shadow step. Defined as a token for a bevelled oxblood surface but not used yet.

### Tertiary
- **Blue-Light Beacon** (`beacon`) and **Beacon Haze** (`beacon-soft`): the blue emergency light. Reserved for moments that are about responding. It carries the blue lights overlay, the light bars in the hero scene and the status lamp. Beacon Haze is the lit face of the status lamp; the `glow-beacon` utility is still unused.
- **Alarm Red** (`alarm`): the hard signal red. It marks "ALARM" and fills the Alarm key in the hero toast, and the heart in the footer credit. Keep it for alerts, never decoration.
- **Selection Green** (`select`): the game's selection/confirmation green. Defined but unused on the site.

### Neutral
- **Midnight Indigo** (`night`): the page canvas, the html/body background, the hero scrims and the lightbox backdrop (at 90%).
- **Console Indigo** (`night-2`): window bodies, card bodies, image frames and the FAQ rows. One step up from the canvas.
- **Raised Indigo** (`night-3`): secondary buttons, the mobile-menu toggle, hover state for cards, menu items and FAQ rows.
- **Indigo Rim** (`bevel-hi`): the lit top-left edge of every bevel, the secondary-button hover fill, the footer's top rule, the nav's bottom highlight line, and borders on images and table headers inside prose.
- **Well Black** (`bevel-lo`): the shadow edge of every bevel, recessed wells (spec chips, code blocks, image placeholders) and the footer background.
- **Lamp-lit Parchment** (`ink`): all primary text. Body copy sits at 75–90% opacity of it (`ink/75` card excerpts, `ink/80` leads and descriptions, `ink/90` hero tagline) rather than switching to a grey.
- **Dusk Lavender** (`muted`): secondary text such as nav links at rest, dates, captions, fact-sheet labels, footer links and the attribution line.

Tokens are stored as RGB channels (`--ink-rgb: 255 233 200`), with `--ink: rgb(var(--ink-rgb))` derived from them, so Tailwind opacity modifiers like `text-ink/80` and `bg-night-2/90` compile.

### FMS status (domain colours)
The radio status colours the fire service uses and the game shows (engine8 `assets/rules/fms.ron`): **1** `fms-1` blue, **2** `fms-2` green, **3** `fms-3` orange, **4** `fms-4` yellow. They only ever mean a vehicle's or a channel's status (the FMS keys, the status squares, Mitmachen's Offen/Anfahrt), never decoration. Text on 3 and 4 is Midnight Indigo, on 1 and 2 Lamp-lit Parchment.

### Named Rules
**The One Amber Key Rule.** A filled amber button appears once per cluster (once in the nav, once in the hero, once in the mobile menu), and it is always the community call to action. Every other button is Raised Indigo.

**The Oxblood Is Chrome Rule.** Fire-Engine Oxblood fills title bars and open states. It is never a text colour and never a button fill.

**The Warm Text Rule.** Text is never pure white or neutral grey. Use Lamp-lit Parchment and step it down with opacity, or use Dusk Lavender for secondary text.

## Typography

**Display Font:** Pixelify Sans (fallback `ui-monospace, monospace`), self-hosted at 400 and 600; the 600 weight is preloaded.
**Body Font:** the system sans stack (`ui-sans-serif, system-ui, sans-serif`).

**Character:** a chunky pixel face for anything that belongs to the console (headings, buttons, nav, dates, labels, chips), paired with a neutral system sans for reading. The pixel face gives the identity; the system sans makes long devlog posts readable.

### Hierarchy
- **Display** (600, 2.25rem → 3rem from 640px → 3.75rem from 1536px, line-height 1.25): the hero headline only. Balanced wrapping, max width about 42rem, with a dark text-shadow (`0 2px 16px` Midnight Indigo at 90%) so it holds over footage.
- **Headline** (600, 1.875rem → 3rem from 640px, line-height 1.25): section headings on the homepage and page titles (Devlog, FAQ at 2.25rem → 3rem). Balanced wrapping.
- **Title** (600, 1.5rem → 1.875rem from 640px, line-height 1.375): feature-row headings. Post-card titles use the same face at 1.25rem.
- **Body lead** (400, 1.125rem, line-height 1.625): section intros and the hero tagline, capped at 56–60ch.
- **Body** (400, 1rem, line-height 1.625): feature descriptions (max 52ch) and running prose. Blog posts are set with Tailwind Typography at `prose-lg` in a 48rem column.
- **Label** (400, 0.875rem, Pixelify Sans): dates, captions, fact-sheet labels, spec chips, the "video coming soon" badge. Buttons and nav links use the pixel face at body size with `leading-none` (buttons) or default leading (nav).
- **Fine print** (400, 0.75rem, system sans): the map-data attribution in the footer.

### Named Rules
**The No-Ligature Rule.** Pixelify Sans always runs with `liga` and `clig` off (`.font-pixel` and prose headings). Its fi/fl ligatures render as a single blob.

**The Pixel Is Chrome Rule.** Pixelify Sans is for headings and UI chrome. Running paragraphs, post bodies and FAQ answers are always system sans.

**The Pixelify Five.** Pixelify's "5" is drawn like an "S" at every size and weight, and the font has no alternate. Where a number with a 5 carries meaning, check that it still reads in context.

Balanced headings use `text-balance`, which needs Tailwind 3.4 or later (the project pins `@nuxtjs/tailwindcss` ~6.12.2, which brings 3.4).

## Layout

- **Container:** content sits in a 72rem (`max-w-6xl`) column with 16px gutters, widening to 32px from 1024px. Reading pages (posts, FAQ, status) use a narrower 48rem (`max-w-3xl`) column.
- **Page rhythm:** homepage sections are stacked 96px apart. Each section is `w-full` inside the flex-column `<main>`, because `mx-auto` alone shrinks a flex child to its content. Contained sections (headings, fact sheet, devlog, Mitmachen) alternate with footage (the feature console, the full-bleed gallery reel), so the page breathes between reading and looking. The page ends on the newest devlog post and the Mitmachen window, 96px above the footer, never on archive content. Inner pages pad 64px top and bottom, 96px from 1024px.
- **Hero:** below 1280px (`xl`) the footage sits on top (56svh on phones, 16:9 capped at 72svh from 640px and at 55svh from 1024px) and the copy follows underneath, with the buttons and status panel before the tagline, so the Discord key lands on the first screen at every size down to 1024×768. From `xl` the footage fills the viewport minus the nav (`100svh - 4rem`, minimum 600px), scaled 1.12× from its top-left corner, and the copy sits top-left on a radial Midnight Indigo scrim over the neighbouring house. The status panel narrows to 30ch there, so no copy covers a vehicle at 1280×720 or wider. The H1 steps 36px → 48px (from 640px) → 60px (from 1536px) and never shrinks as the screen grows.
- **Feature console:** the four features live in one pixel window in the 72rem column, operated like the game. The title bar shows the active feature's name and `n / 4`. Under it a toolbar of four bevelled keys, each with a recessed hotkey number (1–4); the selected key is pressed in (recessed bevel, Well Black fill, Glowing Filament text). Then one 16:9 viewport, capped at `100svh − 17rem` so the whole console fits a screen, and a bottom bar with the description (7 columns) and the spec chips (5 columns, right-aligned). It's an ARIA tabs widget: click, arrow keys, Home and End, and 1–4 switch views while the console is on screen (ignored while typing or with modifier keys). Shots swap in four stepped frames (200ms), instantly with reduced motion. HUD screenshots are never cut through their interface: the command shot is shown whole (`object-contain`, dark side bars when capped), the co-op shot is anchored to its top edge. Below 1024px the keys scroll sideways and the bar stacks under the viewport.
- **Gallery reel:** a horizontal, scroll-snapping reel that starts on the page column's left edge and runs off the right of the screen. Every shot has the same height (`clamp(9rem, 36vw, 28rem)`), so panoramic 21:9 shots run longer than the 16:9 ones. From 640px two bevelled arrow keys sit beside the heading and dim at either end; swipe, shift-scroll and the pixel scrollbar move it too.
- **Post lists:** the homepage shows one featured post (a 7/5 split from 1024px, stacked below) plus a link to the full devlog. The devlog index is a 16px-gap grid, 2 columns from 640px and 3 from 1024px.
- **Breakpoints:** only `sm` (640px) and `lg` (1024px) are used. The nav collapses to a pixel-window dropdown below 1024px.

## Elevation & Depth

The system has no drop shadows and no soft elevation. Depth is drawn the way the game draws it: a 2px inset bevel, light on the top-left edge (Indigo Rim) and dark on the bottom-right (Well Black). A raised surface is bevelled outward. A recessed surface, like a pressed button or a spec-chip well, reverses the two edges. Glow is reserved for light sources, as a text-shadow, never as a box glow around chrome.

### Shadow Vocabulary
- **Bevel, raised** (`box-shadow: inset 2px 2px 0 var(--bevel-hi), inset -2px -2px 0 var(--bevel-lo)`): windows, cards, buttons, image frames, FAQ rows, badges. On the amber button the two edges are re-pointed to Glowing Filament and Burnt Amber.
- **Bevel, recessed** (`box-shadow: inset 2px 2px 0 var(--bevel-lo), inset -2px -2px 0 var(--bevel-hi)`): spec chips, and any button while it's pressed (`:active`).
- **Nav underline** (`box-shadow: 0 2px 0 var(--bevel-hi)` under a 2px Well Black border): the header's two-pixel rule, a bevel laid flat.
- **Footage legibility** (`text-shadow: 0 2px 16px rgb(18 18 42 / 0.9)` on the headline, `0 1px 10px` on the tagline): only for text set directly on imagery.
- **Glow, amber / beacon** (`text-shadow: 0 0 12px` amber at 55% / beacon at 70%): defined for lit text such as a status lamp. Not used on shipped pages yet.

### Named Rules
**The Bevel-Not-Shadow Rule.** If something needs to look raised, bevel it. Blurred box-shadows, blur-based glassmorphism and gradient chrome don't belong to this world.

## Shapes

Square pixels everywhere: every corner is 0px. Silhouettes are rectangles with 2px bevel edges, and framed content sits inside a 2px padding so the bevel reads as a frame (image frames, card frames, windows). Pixel-art graphics (the logo, the hamburger and close icons) are drawn on a small grid with `shape-rendering: crispEdges` and rendered with `image-rendering: pixelated` so they stay sharp at any scale. Triangles, like the play mark on the video badge, are built from CSS borders, not smoothed icons.

## Components

### Buttons
Tactile, chunky, meant to be pressed. Always a link styled as a bevelled key.
- **Shape:** square (0px), raised bevel, `inline-flex` with an 8px gap for a trailing `→`, at least 44px tall (`min-h-11`) so it's a real touch target.
- **Primary:** Sodium Amber fill, Midnight Indigo text, Pixelify Sans semibold, 8px × 16px padding, `leading-none`. Its bevel edges switch to Glowing Filament / Burnt Amber.
- **Hover:** fill steps to Glowing Filament. Colour transition at Tailwind's default (150ms, `cubic-bezier(0.4, 0, 0.2, 1)`).
- **Active:** the bevel reverses into the recessed state, so the key looks pushed in.
- **Focus:** every focusable element gets a 2px Glowing Filament outline with a 2px offset (global `:focus-visible`).
- **External:** links that leave the site open in a new tab with `rel="noopener"` and a visually hidden "(öffnet in neuem Tab)" hint.
- **Secondary:** Raised Indigo fill with Parchment text. Hover fills with Indigo Rim. Used for "Read the story", "Forum" and other non-community actions.

### Chips
- **Spec chip:** a recessed Well Black well with Glowing Filament text in Pixelify Sans at 0.875rem, 6px × 12px padding. Lists hard facts under a feature (counts, alarm keywords, modes), with chips wrapped at 8px gaps. Facts only, never marketing adjectives.

### Cards / Containers
- **Pixel window** (signature): a raised-bevel Console Indigo frame with 2px inner padding, an optional Fire-Engine Oxblood title bar (Pixelify semibold, 6px × 12px, flex row so a close button can sit on the right), and a 20px body. Used for the fact sheet, the mobile menu and the gallery lightbox.
- **Post card:** a whole-card link. Raised-bevel Console Indigo frame, a 16:7 cover image at 90% opacity (100% on hover) over a Well Black placeholder that shows the pixel logo at 60% when there's no cover, then date (label, Dusk Lavender), title (Pixelify 1.25rem, Glowing Filament on hover) and a 3-line excerpt at `ink/75`. The frame fills with Raised Indigo on hover.
- **Image frame:** every screenshot sits in a raised bevel with 2px padding on Console Indigo. Prose images get a 2px Indigo Rim border instead.
- **Featured post:** the homepage's single devlog link. Same frame as the post card, with a 16:9 cover on the left 7 columns and date, title, full description and an amber "Weiterlesen →" on the right 5.
- **Status panel:** a bevelled Console Indigo plate at 90% with Pixelify label text at `ink/80`. It's for one honest line of state ("In Entwicklung, noch ohne Termin…") and stays readable over footage.
- **Mitmachen window:** see Mitmachen (Einsätze) below.
- **Feature window:** a pixel window whose oxblood title bar carries the feature heading (`h3`, Pixelify 1.125rem → 1.25rem), with the description and spec chips in the body. It floats over footage, so it is always opaque Console Indigo.

### Navigation
- **Header:** Midnight Indigo at 95% with a 2px Well Black bottom border and a 2px Indigo Rim line beneath it. The brand (pixel logo plus "Leitstelle" in Pixelify semibold) sits on the left, the links in the centre at 32px gaps, and the amber Discord key on the right.
- **Links:** Start, Devlog, FAQ, Entwicklungsstand, Forum. Pixelify Sans in Dusk Lavender, Parchment on hover, Sodium Amber when current. Current is worked out from the path (`aria-current="page"`): Start only on the homepage itself, the others on their sub-pages too (a post lights Devlog).
- **Mobile (below 1024px):** a compact amber "Discord" key and a 44×44 bevelled Raised Indigo toggle with a pixel-drawn hamburger/close icon sit on the right. The toggle opens a pixel window titled "Menü" that floats below the header with 16px side insets. It holds the links at 1.125rem with 44px rows plus the language switch. Esc closes it and returns focus to the toggle.
- **Skip link:** the first focusable element, an amber pixel key that appears top-left on focus and jumps to `#main`.
- **Footer:** a Well Black band with an Indigo Rim top rule, the brand, Dusk Lavender links, the other-language link in amber, and the fine-print attribution.

### FAQ accordion
Native `<details>` rows in raised-bevel Console Indigo frames, 12px apart. The summary is Pixelify 1.125rem with an amber `+` that becomes `−`. Hover fills the summary Raised Indigo, and an open row's summary turns Fire-Engine Oxblood, so it becomes a window title bar over its answer.

### Game messages (parchment toasts)
Everything the *game* says to you uses the in-game toast look: Lamp-lit Parchment background, Midnight Indigo text, a 2px Well Black border, square, no shadow. A Pixelify line leads, then a system-sans hint at `night/70`. Three places use it: the hero alarm, the spec-chip notes and Summi's speech bubble. Site chrome (windows, buttons, panels) stays indigo, so parchment always means "the game is talking".
- **Alarm toast** (hero): "ALARM" in Alarm Red, the keyword in semibold, the place at `night/70`, the hint below, and a bevelled Alarm Red key. It drops in once (500ms, `cubic-bezier(0.16, 1, 0.3, 1)`, 700ms after load) and its border flashes red twice. Pressing Alarm stacks an "Alarmiert: HLF, DLK, TLF" toast under it with the tip that L toggles the blue lights, and starts the blue lights for 10 seconds. From `xl` it hangs top-right over the scene; below that it follows the hero copy.
- **Spec-chip notes:** chips with jargon (B/THL, FMS, Pendelverkehr) are buttons with a dotted Burnt Amber underline. Hover, focus or a tap shows a parchment note above the whole chip row, so it never runs off a phone screen. Esc or a tap elsewhere closes it.

### Blue lights
A fixed, pointer-transparent overlay at z-30: two Blue-Light Beacon radial washes from the left and right screen edges (32vw wide, 70% at the edge), screen-blended and alternating every 0.84s, so each side flashes about 1.2 times a second, under the 3-per-second limit. The Alarm key turns them on for 10 seconds; L toggles them like in the game (ignored while typing or with modifier keys). With reduced motion both sides glow steadily instead.

### Scene lights
Until the gameplay video exists, the hero still frame comes alive. Three light layers cut from the frame itself (`hero-nacht-firelight`, `hero-nacht-beacons-a`, `-b`) sit over the poster with the poster's own fit and scale, so they stay on the fire and the cab roofs at every crop. They're screen-blended: the fire's spill flickers between 50% and 90% in irregular stepped frames (2.6s cycle), and the light bars double-flash in two groups (HLF and MLF, then DLK and TSF, half a cycle apart, 1.4s per cycle, so two flashes every 1.4s). Once the video slot has a `src`, the layers aren't rendered. They pause while the hero is off screen or the tab is hidden (`useLive`, `data-live`). With reduced motion the fire glows at a steady 65% and the light bars stay on at 55%.

### Status lamp
A 10px recessed lamp, a Well Black well tinted with beacon blue, with a Beacon Haze face that double-flashes in step with the light bars. It sits in front of the line that says the game is in development: the hero status panel and the fact sheet's status row. With reduced motion it stays lit.

### Fleet (Auf der Wache)
A pixel window titled "Fuhrpark". A 3D viewer (7 columns) shows the game's own glTF model of the selected vehicle (`public/models`, copied from engine8 `assets/models`): toon-shaded with a three-step ramp, rendered at half resolution and scaled up `pixelated`, in the game's own HARD light bands, double-sided like the source materials, under a fixed 40° camera that turns in the game's 30° steps (drag, Q/E or the keys). The models' own beacon parts double-flash in two groups (1.4s, half a cycle apart), with a stepped additive glow sprite per beacon dome instead of real lights, so integrated graphics stay smooth. Beside it (5 columns): name, long name, role, model basis, tank gauge, the equipment with the game's hotkeys, and the FMS keys 1–4 in the standard BOS colours. Status 3 or 4 switches the blue lights on, L toggles them (only while the fleet is on screen, so it doesn't also fire the hero's lights). A row of vehicle keys (selection green when chosen) carries each vehicle's status. Three.js loads only when this section mounts (client only), and the loop draws only while the section is on screen.

### Dranbleiben (closing section)
The page closes on one section with its own headline ("Dranbleiben") and lead, then two windows side by side (7/5 columns from 1024px, stacked below) that share one height: their title bars are both 36px and both windows end on the same line. `pixel-window`'s `fill` option makes the body a column that fills the window, so the last element can sit at the bottom.
- **Devlog window:** title "Devlog" with the archive link ("Alle Beiträge seit 2015 →") on the right of the title bar. The whole body links to the newest post: a 2:1 cover, then date, title, description and "Weiterlesen →" at the bottom.
- **Mitmachen window:** reads like the game's call list, with an "Offene Einsätze: n" counter in the title bar, a headline and one line from André, then one bevelled row per channel at the bottom (Funkkanal Discord in Beacon Haze, Lagebesprechung Forum in Glowing Filament) with a green "Offen" status square and an Alarm key. In the narrow column (1024–1279px) the key sits under the row's text. Pressing it opens the channel in a new tab, the row reports "Status 3 · Anfahrt" in orange and the counter drops.

### Cursor
The game's pointer in pixels (`public/cursors`, 1× and 2× via `image-set`, plain PNG fallback): Lamp-lit Parchment arrow by default, Sodium Amber arrow over anything pressable, a crosshair with a lit centre over footage (`data-cursor="scene"`: hero, console viewport, gallery shots, the 3D viewer). Fine pointers only; text fields and prose keep the text cursor.

### FAQ page
Seventeen questions in four topics (Spiel, Technik, Projekt, Mitmachen), each file with `category` and `order` frontmatter. A console window holds the search field (Well Black inset) and the topic keys with live counts; searching opens the matching answers. Topic headings group the list while nothing filters it. Every answer has "Link zu dieser Frage kopieren" (deep link `/faq#id` opens it), "Alle öffnen/schließen" sits beside the topics, an empty state invites the question to Discord or the forum, and a closing window points there too.

### Status page (Entwicklungsstand)
`/play`: the page headline and one honest lead (desktop game, not publicly playable yet), the dev board (`dev-board`, the same "Lagemeldung · Entwicklung" window as in the Steckbrief) laid out wide, and then the shared Dranbleiben section (`follow-section`). Wide board: "Steht schon" runs down the left two rows high beside "In Arbeit" and "Als Nächstes"; "Später" closes underneath across the full width with its items in three columns. Below 640px the four stages stack. Under the lead a "Stand: <date>" label (Dusk Lavender, `UPDATED` in `pages/play.vue`, to bump whenever the board changes). "Steht schon" ends with a link to the post "Der Kreis schließt sich". Stage counts are set in the system face, because Pixelify's 5 reads as an S. Below 640px the status line moves out of the title bar onto its own line, so neither wraps.

### Video slot
Shows the footage poster until a video file exists. Inline in posts it's a bevelled 16:9 frame with a "video coming soon" badge bottom-right (Console Indigo at 90%, an amber CSS play triangle, a label in Pixelify). As the hero background it covers the frame with no badge of its own. The hero adds a separate *recessed* "Video folgt" label in Dusk Lavender with no triangle, because nothing there can be pressed yet.

## Motion

The site moves the way the game does: in steps, not glides. Loops use `steps(1, end)` so they change like sprite frames, and only light sources loop (the scene lights, the status lamp, the blue lights overlay, Summi's hover). Every loop pauses off screen and has a reduced-motion state that keeps its meaning: lit, just not moving.

- **Windows open like the game's dialogs:** the lightbox and the mobile menu unfold from the middle in four frames (200ms, `clip-path`). With reduced motion they fade in over 120ms.
- **Lightbox shots** crossfade in 160ms when you step through them.
- **FAQ answers** fade in and settle 4px (220ms, `cubic-bezier(0.16, 1, 0.3, 1)`).
- **Keys** dip a pixel and flip their bevel while pressed.
- **Flash limit:** nothing flashes more than three times a second.

## Do's and Don'ts

### Do:
- **Do** build sections around real in-game screenshots, cropped to the part that matters (`object-position` per image) and framed in the 2px raised bevel.
- **Do** keep every corner at 0px and draw depth only with the 2px bevel pair (Indigo Rim top-left, Well Black bottom-right).
- **Do** keep a single amber key per cluster, always pointing at Discord or the forum.
- **Do** set headings, labels, nav, buttons and dates in Pixelify Sans with ligatures off, and set running prose in system sans.
- **Do** put hard facts (counts, alarm keywords, modes) in recessed spec chips.
- **Do** step text down with Parchment opacity (90 / 80 / 75%) or Dusk Lavender, never a neutral grey.
- **Do** draw any new pixel graphic on a grid with `crispEdges` and render it `pixelated`.
- **Do** use parchment toasts only when the game itself is speaking (alarms, notes, Summi), and borrow the game's real words for them.
- **Do** give every playful touch a reduced-motion path and keep it out of the way of the Discord and Forum buttons.

### Don't:
- **Don't** lay out features as a grid of cards, or as image/text rows that alternate sides. Features are windows over full-screen footage.
- **Don't** draw or drop in placeholder icons. If something needs an image, use real game art.
- **Don't** put eyebrow or kicker labels above headings.
- **Don't** use rounded corners, blurred box-shadows, glassmorphism or gradient fills on chrome.
- **Don't** use Fire-Engine Oxblood for text or buttons. It belongs to title bars and open states.
- **Don't** set long paragraphs in Pixelify Sans.
- **Don't** introduce a light theme. The site is dark by construction (`color-scheme: dark`).
