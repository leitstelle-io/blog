---
target: pages/index.vue
total_score: 24
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 0
target_identity: "file:/Users/wellerli/Dev/leitstelle/blog/pages/index.vue"
target_fingerprint: "sha256:3f0747f9214744bbbfa3220269f8151de6cd9d312135c897fb636622fa3c92ad"
target_path: /Users/wellerli/Dev/leitstelle/blog/pages/index.vue
timestamp: 2026-10-28T18-30-41Z
slug: pages-index-vue
closed: true
---
Method: dual-agent (A: design review · B: detector + browser evidence)
Run notes: Chrome extension not connected. A used headless Chrome over CDP against a temporary server on 3124 (3001 runs a stale Tailwind config): full pages at 1440/390//en, first screens at 1024/1280/768, mobile menu, lightbox, Tab order. Laptop-width and text-balance findings verified by the orchestrator. Temporary server stopped.

## Design Health Score
| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | "Video folgt" badge looks like a play button but is inert |
| 2 | Match System / Real World | 3 | B 1–4, THL 1–3, FMS, HLF/DLK/TLF unexplained for gamers |
| 3 | User Control and Freedom | 3 | Lightbox has no prev/next |
| 4 | Consistency and Standards | 3 | H1 shrinks from 60px to 48px at 1280px; footer lacks "Entwicklungsstand"; text-balance doesn't render |
| 5 | Error Prevention | 3 | Inert video badge |
| 6 | Recognition Rather Than Recall | 3 | Desktop language switch only in footer |
| 7 | Flexibility and Efficiency | n/a | One-visit landing page |
| 8 | Aesthetic and Minimalist Design | 3 | Hero image twice; dispatcher+commander line three times; status twice |
| 9 | Error Recovery | 3 | Empty devlog fallback points to Discord |
| 10 | Help and Documentation | n/a | Landing page; FAQ one click away |
| Total | | 24/32 | Good (75%) |

## Design Specificity Verdict
Authored: dispatch HUD screenshot shares the site's window chrome; domain-true copy; all real footage. Slips: stock section order; looks like a console but doesn't behave like one (beacon blue unused, no live status).
Deterministic scan: source 0 findings (15 files); rendered (desktop, 390, /en) 1 each = Nuxt DevTools "ms" label, false positive. No overlays.

## Priority Issues
- [P2] No word on who builds it or that he's a trained Werkfeuerwehrmann. Fix: one signed sentence in community.body (lang/de.ts:27 + en), or a "Entwickler" fact row. Command: clarify.
- [P2] Hero breaks its own rule at laptop widths: 1024x768 tagline/CTA/status below fold (image up to 72svh, H1 60px); 1280x720 overlay copy covers the first engine and hoses. Fix: cap image ~55svh and H1 48px at lg (hero.vue:7, :27); at xl shift object-position right or narrow tagline ~32ch. Command: adapt.
- [P2] Phone lightbox shrinks the image (366px window, p-5 body -> ~322px vs 358px inline); no prev/next. Fix: flush pixel-window variant below sm; prev/next + arrow keys. Command: adapt.
- [P3] text-balance is a no-op on Tailwind 3.3.3. Fix: upgrade to ^3.4 (@nuxtjs/tailwindcss >=6.10) or [text-wrap:balance] in 6 places. Command: typeset.
- [P3] "Video folgt" badge is a false affordance (raised bevel + play triangle, inert div). Fix: recessed bevel-in label, no triangle in hero. Command: clarify.

## Persona Red Flags
- Jordan: no "desktop game" above the fold (platforms ~4,800px down); "Übernehmen." ambiguous; jargon unexplained; no name behind "ich".
- Riley: inert badge; no lightbox prev/next; featured post repeats hero image; Pixelify 14px "2015" reads "2018"; footer missing Entwicklungsstand.
- Casey: good — Discord on first screen, 44px targets, buttons before tagline; bad — ~7,800px page, ~1,900px gallery, lightbox shrinks image.
- Markus (volunteer squad leader): loves the HUD alarms; no fire-service author; hero can't be enlarged; check "83 Feuerwachen" vs Feuerwehrhäuser, "Polizei" given Bavarian ILS scope, B/THL catalogue match.

## Minor Observations
- Featured post cover = hero image; give the post its own cover.
- Pixelify digits at text-sm ambiguous; use text-base/semibold for numbers.
- Hero copy left edge 64px vs container 176px at 1440 (96px at 1280).
- Status panel is a full sentence in Pixelify (strains Pixel Is Chrome).
- Steckbrief Status + Erscheinen repeat the hero panel; merge.
- First feature is the pale county map; lead with the dispatch row instead.
- Mobile menu has no backdrop scrim.

## Questions to Consider
- What if the status line said who you are?
- Do phones need six gallery shots, or three?
- One honest place for beacon blue — a status lamp next to "In Entwicklung"?
- Should the video badge exist at all, or could a 3-second loop carry "alive" now?
