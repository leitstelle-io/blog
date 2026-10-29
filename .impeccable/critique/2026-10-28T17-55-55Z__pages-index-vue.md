---
target: pages/index.vue
total_score: 25
max_score: 36
na_heuristics: 7
p0_count: 0
p1_count: 3
target_identity: "file:/Users/wellerli/Dev/leitstelle/blog/pages/index.vue"
target_fingerprint: "sha256:1bd6d2323bb39f7baf15df5343b864ea08cb81be6867daf0a42c9a754ad9a31c"
target_path: /Users/wellerli/Dev/leitstelle/blog/pages/index.vue
timestamp: 2026-10-28T17-55-55Z
slug: pages-index-vue
closed: true
---
Method: dual-agent (A: design review · B: detector + browser evidence)
Run notes: Chrome extension not connected; A reviewed from source + SSR HTML + image assets; B ran source scan and the detector's headless URL scan (1280, 390, /en). Visual claims (fold position, lightbox clipping, focus rings) are inferred from code.

## Design Health Score
| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Game status (in development, no date) only in the fact sheet |
| 2 | Match System / Real World | 3 | Nav labels hardcoded English on DE (navigation.vue:13-18); "Status" unclear |
| 3 | User Control and Freedom | 3 | Mobile menu has no Esc / focus move |
| 4 | Consistency and Standards | 3 | External links open in new tab from buttons, same tab from nav/footer |
| 5 | Error Prevention | 3 | External links don't say they leave the site |
| 6 | Recognition Rather Than Recall | 3 | Discord key hidden in hamburger below 1024px |
| 7 | Flexibility and Efficiency | n/a | One-visit landing page |
| 8 | Aesthetic and Minimalist Design | 3 | Forum twice; story post linked twice; stale cards |
| 9 | Error Recovery | 2 | Lightbox 2560px image without size/loading state; empty blog query shows heading over nothing |
| 10 | Help and Documentation | 2 | Launch-date/playtest FAQ answer not on homepage |
| Total | | 25/36 | Acceptable (69%) |

## Design Specificity Verdict
Top half authored (game grading palette, fire-service verbs in H1, checkable spec chips, real footage, hero copy placed around the fire). From the gallery down it is category-interchangeable: identical H2 + grid sections at 96px. The Night Shift Console idea lives only in colours and type; no dispatch content anywhere; beacon/alarm tokens unused.
Deterministic scan: source 0 findings (14 files); URL scans 1 finding each (undersized-ui-text on Nuxt DevTools "ms" label) = false positive. No overlays (extension not connected).

## Priority Issues
- [P1] Page never says why to join or that the game isn't out. Fix: muted line under hero buttons from FAQ ("In Entwicklung, noch kein Termin. Testrunden kündige ich zuerst im Discord an.") + EN; say "Spiel" in tagline. Command: clarify.
- [P1] Page ends on stale pre-pivot posts (blog-list.vue:5-12 takes newest 4: 2026, 2025, 2024, 2023) and no closing ask. Fix: post-pivot only or one featured + "Devlog since 2015"; closing pixel-window with Discord + Forum keys and one honest sentence. Commands: layout, clarify.
- [P1] Mobile: no Discord action in first viewport (navigation.vue:41 hidden lg:block; hero 56svh + ~6-line tagline); buttons ~32px (pixel-button.vue:18), toggle ~36px. Fix: compact Discord key beside toggle below lg; buttons before tagline on mobile; 44px min height. Command: adapt.
- [P2] Dispatch seat never shown; pillar-command.webp is upscaled/soft. Fix: real Einsätze/ALARM HUD capture paired with the scene (needs user screenshot). Command: bolder.
- [P2] Bare share embeds: no meta description/og:title/og:description, relative og:url, same title both locales. Fix: useSeoMeta per locale in pages/index.vue. Command: harden.

## Persona Red Flags
- Jordan: no "desktop game / not playable / no date" in hero; "Die ganze Geschichte" reads like lore; "Status" ambiguous; THL/FMS unexplained; no Discord-vs-forum explanation.
- Riley: lightbox max-h-none at 94vw likely clips on 1440x800; no prev/next; mobile menu ignores Esc; language switch only in footer.
- Casey: CTA below fold, Discord in hamburger; ~32px buttons, ~24px footer links; lightbox loads 2560px at 390px; hero loads full hero-nacht.webp; pillar-county.webp 398KB no srcset.
- Thomas (volunteer squad leader): no dispatch UI; devlog cards show web-map routing; hero alt "vier Löschfahrzeuge" vs DLK + 3 incl. a van — verify; B 1–4/THL 1–3 and FMS to verify against Bavarian practice.

## Minor Observations
- No :focus-visible style; suggest 2px amber-hi outline, 2px offset.
- No skip link; 6 tab stops before hero CTA.
- Logo alt duplicates visible name; use alt="".
- Gallery figcaption duplicates alt; buttons don't say they enlarge.
- Fact-sheet title is a span, not a heading.
- Organisations line (features.vue:52) floats; move into fact sheet.
- "Rust + Bevy" fact slot speaks to devs; 5 items orphan at 2 columns.
- DESIGN.md Layout section is stale: hero now stacks text below the image under xl.

## Questions to Consider
- Why is the FAQ's reason to join two clicks away instead of under the amber key?
- What if one row showed the alarm list and the burning house as the same incident?
- Should the homepage show devlog history when 3 of 4 cards describe the old game?
- Game windows are parchment under oxblood, the site's are indigo: should visitors recognise the in-game window?
