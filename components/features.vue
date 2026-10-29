<script setup lang="ts">
import { onClickOutside, onKeyStroke, useEventListener } from '@vueuse/core'

const {t, te} = useI18n()

// One console, four views. `fit` places each shot in the 16:9 viewport: HUD shots must never be cut
// through their interface, so the command shot is shown whole and the co-op shot is anchored to its top edge.
const pillars = [
  {key: 'world', small: 'pillar-county-800', smallWidth: 800, large: 'pillar-county', width: 1139, height: 1129, fit: 'object-cover object-[50%_50%]'},
  {key: 'command', small: 'post-blue-hour-drive-1280', smallWidth: 1280, large: 'post-blue-hour-drive', width: 2560, height: 1440, fit: 'object-contain'},
  {key: 'simulation', small: 'pillar-water-800', smallWidth: 800, large: 'pillar-water', width: 2400, height: 1800, fit: 'object-cover object-[50%_55%]'},
  {key: 'coop', small: 'pillar-coop-800', smallWidth: 800, large: 'pillar-coop', width: 1600, height: 1200, fit: 'object-cover object-[50%_0%]'},
]

const specs = (key: string) => t(`features.${key}.specs`).split(' · ').map((label, i) => ({
  label,
  note: te(`features.${key}.notes.${i}`) ? t(`features.${key}.notes.${i}`) : null,
  id: `note-${key}-${i}`,
}))

// Notes open on hover and focus; a tap pins one open on touch screens
const pinned = ref<string | null>(null)
const bar = ref(null)
onClickOutside(bar, () => pinned.value = null, {ignore: ['[data-note]']})
onKeyStroke('Escape', () => pinned.value = null)

const active = ref(0)
const current = computed(() => pillars[active.value])
const tabs: (HTMLButtonElement | null)[] = []

const select = (index: number, focus = false) => {
  active.value = (index + pillars.length) % pillars.length
  pinned.value = null
  if (focus) tabs[active.value]?.focus()
}

// Tabs pattern: arrows move between the keys, Home and End jump to the ends
const onTabKeydown = (event: KeyboardEvent) => {
  const moves: Record<string, number> = {ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1}
  if (event.key in moves) select(active.value + moves[event.key], true)
  else if (event.key === 'Home') select(0, true)
  else if (event.key === 'End') select(pillars.length - 1, true)
  else return
  event.preventDefault()
}

// 1–4 switch the view while the console is on screen, like the game's hotkeys
const {target, live} = useLive()
useEventListener('keydown', (event: KeyboardEvent) => {
  if (!live.value || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return
  if ((event.target as HTMLElement).closest?.('input, textarea, select, [contenteditable], dialog')) return
  const index = Number(event.key) - 1
  if (Number.isInteger(index) && index >= 0 && index < pillars.length) select(index)
})
</script>

<template>
  <section ref="target" class="mx-auto w-full max-w-6xl px-4 lg:px-8" aria-labelledby="features-title">
    <h2 id="features-title" class="max-w-3xl text-balance font-pixel text-3xl font-semibold leading-tight text-ink sm:text-5xl">{{ t('features.title') }}</h2>
    <p class="mt-5 max-w-[60ch] text-lg leading-relaxed text-ink/80">{{ t('features.lead') }}</p>

    <!-- The console: a game window with a toolbar of keys, one big viewport and a bottom bar, like the game's own HUD -->
    <pixel-window as="div" flush class="mt-12 lg:mt-16">
      <template #title>
        <h3 class="text-balance leading-snug sm:text-lg">{{ t(`features.${current.key}.title`) }}</h3>
        <span class="shrink-0 font-normal text-ink/80" aria-hidden="true">{{ active + 1 }}&thinsp;/&thinsp;{{ pillars.length }}</span>
      </template>

      <div class="flex items-center justify-between gap-4 border-b-2 border-[var(--bevel-lo)] p-2">
        <div
            role="tablist"
            :aria-label="t('features.tablist')"
            class="-m-1 flex gap-2 overflow-x-auto p-1 [scrollbar-width:none]"
            @keydown="onTabKeydown"
        >
          <button
              v-for="(pillar, index) in pillars"
              :id="`tab-${pillar.key}`"
              :key="pillar.key"
              :ref="el => tabs[index] = el as HTMLButtonElement | null"
              type="button"
              role="tab"
              :aria-selected="active === index"
              aria-controls="feature-view"
              :tabindex="active === index ? 0 : -1"
              class="flex min-h-11 shrink-0 items-center gap-2 px-3 font-pixel transition-colors"
              :class="active === index ? 'bevel-in bg-[var(--bevel-lo)] text-amber-hi' : 'bevel bg-night-3 text-ink hover:bg-[var(--bevel-hi)]'"
              @click="select(index)"
          >
            <span class="bevel-in bg-[var(--bevel-lo)] px-1.5 text-xs leading-5 text-muted" aria-hidden="true">{{ index + 1 }}</span>
            {{ t(`features.${pillar.key}.tab`) }}
          </button>
        </div>
        <p class="hidden shrink-0 font-pixel text-sm text-muted lg:block [@media(pointer:coarse)]:hidden">{{ t('features.hotkeys') }}</p>
      </div>

      <div id="feature-view" role="tabpanel" :aria-labelledby="`tab-${current.key}`">
        <!-- All four shots stay mounted, so switching is instant once they've loaded -->
        <!-- 16:9, but never taller than the screen leaves room for: title bar, toolbar and bottom bar stay in view -->
        <div data-cursor="scene" class="relative aspect-video max-h-[max(15rem,calc(100svh-17rem))] w-full overflow-hidden bg-[var(--bevel-lo)]">
          <img
              v-for="(pillar, index) in pillars"
              :key="pillar.key"
              :src="`/images/game/${pillar.small}.webp`"
              :srcset="`/images/game/${pillar.small}.webp ${pillar.smallWidth}w, /images/game/${pillar.large}.webp ${pillar.width}w`"
              sizes="(min-width: 1152px) 1116px, calc(100vw - 2rem)"
              :alt="active === index ? t(`features.${pillar.key}.alt`) : ''"
              :aria-hidden="active !== index"
              :width="pillar.width"
              :height="pillar.height"
              class="console-shot absolute inset-0 h-full w-full"
              :class="[pillar.fit, active === index ? 'opacity-100' : 'opacity-0']"
              loading="lazy"
          >
        </div>

        <div ref="bar" class="grid gap-5 border-t-2 border-[var(--bevel-hi)] p-5 lg:grid-cols-12 lg:items-start lg:gap-10 lg:p-6">
          <p class="leading-relaxed text-ink/85 lg:col-span-7">{{ t(`features.${current.key}.description`) }}</p>
          <!-- Notes are positioned against the whole chip row so they never run off a phone screen -->
          <ul :key="current.key" class="relative flex flex-wrap gap-2 font-pixel text-sm lg:col-span-5 lg:justify-end">
            <li v-for="spec in specs(current.key)" :key="spec.id" class="group" :data-note="spec.note ? '' : undefined">
              <span v-if="!spec.note" class="bevel-in block bg-[var(--bevel-lo)] px-3 py-1.5 text-amber-hi">{{ spec.label }}</span>
              <template v-else>
                <button
                    type="button"
                    class="bevel-in block bg-[var(--bevel-lo)] px-3 py-1.5 text-amber-hi underline decoration-amber-lo decoration-dotted decoration-2 underline-offset-4 transition-colors hover:decoration-amber-hi"
                    :aria-describedby="spec.id"
                    :aria-expanded="pinned === spec.id"
                    @click="pinned = pinned === spec.id ? null : spec.id"
                >
                  {{ spec.label }}
                </button>
                <span
                    :id="spec.id"
                    role="tooltip"
                    class="note pointer-events-none absolute inset-x-0 bottom-full z-10 mb-2 border-2 border-[var(--bevel-lo)] bg-ink px-3 py-2 font-sans text-sm leading-snug text-night opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100"
                    :class="pinned === spec.id ? '!opacity-100' : ''"
                >
                  {{ spec.note }}
                </span>
              </template>
            </li>
          </ul>
        </div>
      </div>
    </pixel-window>
  </section>
</template>

<style scoped>
/* Views change in four frames, like a sprite, not a glide */
.console-shot {
  transition: opacity 200ms steps(4, end);
}

@media (prefers-reduced-motion: reduce) {
  .console-shot {
    transition: none;
  }
}
</style>
