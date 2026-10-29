<script setup lang="ts">
import { useScroll } from '@vueuse/core'

const shots = [
  {file: 'blue-hour-fires', key: 'blueHour', wide: true},
  {file: 'day-overview', key: 'day'},
  {file: 'night-beacons', key: 'beacons'},
  {file: 'golden-hour', key: 'golden'},
  {file: 'altstadt-day', key: 'altstadt'},
  {file: 'isar-fields', key: 'isar', wide: true},
]

const dialog = ref<HTMLDialogElement | null>(null)
// Index of the open shot, null while the dialog is closed
const index = ref<number | null>(null)
const current = computed(() => index.value === null ? null : shots[index.value])
const position = computed(() => (index.value ?? 0) + 1)
// Thumbnail buttons by shot index; a function ref keeps the order, a v-for ref array doesn't
const thumbs: (HTMLButtonElement | null)[] = []

const show = async (i: number) => {
  index.value = i
  // Render the window before opening, so showModal can focus the close button
  await nextTick()
  dialog.value?.showModal()
}
const close = () => dialog.value?.close()

// Move through the shots, wrapping around at both ends
const step = (by: number) => {
  if (index.value === null) return
  index.value = (index.value + by + shots.length) % shots.length
}

const onKeydown = (event: KeyboardEvent) => {
  if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return
  if (event.key === 'ArrowLeft') step(-1)
  else if (event.key === 'ArrowRight') step(1)
  else return
  event.preventDefault()
}

// The reel scrolls one shot at a time; its arrows dim at either end
const reel = ref<HTMLElement | null>(null)
const {arrivedState} = useScroll(reel)
const scrollReel = (by: number) => {
  const first = reel.value?.querySelector('li')
  if (!reel.value || !first) return
  const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  reel.value.scrollBy({left: by * (first.offsetWidth + 16), behavior: smooth ? 'smooth' : 'auto'})
}

// The dialog hands focus back to the thumbnail that opened it; move it on to the
// thumbnail of the shot that was open last, so the page picks up where the viewer left off
const onClose = () => {
  const last = index.value
  index.value = null
  if (last !== null) thumbs[last]?.focus()
}
</script>

<template>
  <section class="w-full">
    <div class="mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-x-8 gap-y-4 px-4 lg:px-8">
      <h2 class="max-w-3xl text-balance font-pixel text-3xl font-semibold leading-tight text-ink sm:text-5xl">{{ $t('gallery.title') }}</h2>
      <!-- Swipe, shift-scroll or the scrollbar move the reel too; the arrows are for mouse users -->
      <div class="hidden shrink-0 gap-1 sm:flex">
        <button type="button" class="bevel flex h-11 w-11 items-center justify-center bg-night-3 text-ink transition-opacity hover:bg-[var(--bevel-hi)] disabled:pointer-events-none disabled:opacity-40" :disabled="arrivedState.left" @click="scrollReel(-1)">
          <span class="sr-only">{{ $t('gallery.previous') }}</span>
          <svg class="pixelated h-5 w-5" viewBox="0 0 10 10" shape-rendering="crispEdges" aria-hidden="true">
            <rect x="6" y="2" width="1" height="1" fill="currentColor"/>
            <rect x="5" y="3" width="1" height="1" fill="currentColor"/>
            <rect x="3" y="4" width="2" height="2" fill="currentColor"/>
            <rect x="5" y="6" width="1" height="1" fill="currentColor"/>
            <rect x="6" y="7" width="1" height="1" fill="currentColor"/>
          </svg>
        </button>
        <button type="button" class="bevel flex h-11 w-11 items-center justify-center bg-night-3 text-ink transition-opacity hover:bg-[var(--bevel-hi)] disabled:pointer-events-none disabled:opacity-40" :disabled="arrivedState.right" @click="scrollReel(1)">
          <span class="sr-only">{{ $t('gallery.next') }}</span>
          <svg class="pixelated h-5 w-5" viewBox="0 0 10 10" shape-rendering="crispEdges" aria-hidden="true">
            <rect x="3" y="2" width="1" height="1" fill="currentColor"/>
            <rect x="4" y="3" width="1" height="1" fill="currentColor"/>
            <rect x="5" y="4" width="2" height="2" fill="currentColor"/>
            <rect x="4" y="6" width="1" height="1" fill="currentColor"/>
            <rect x="3" y="7" width="1" height="1" fill="currentColor"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- A reel that runs off the right edge of the screen: every shot shares one height, wide ones run longer -->
    <ul ref="reel" class="reel mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4">
      <li
          v-for="(shot, i) in shots"
          :key="shot.file"
          class="shrink-0 snap-start"
          :class="shot.wide ? 'w-[calc(var(--shot-h)*21/9)]' : 'w-[calc(var(--shot-h)*16/9)]'"
      >
        <figure class="m-0">
          <button
              :ref="el => thumbs[i] = el as HTMLButtonElement | null"
              type="button"
              data-cursor="scene"
              class="bevel group block w-full bg-night-2 p-[2px]"
              :aria-label="`${$t(`gallery.items.${shot.key}`)} – ${$t('gallery.enlarge')}`"
              aria-haspopup="dialog"
              @click="show(i)"
          >
            <img
                :src="`/images/game/${shot.file}-1280.webp`"
                :srcset="`/images/game/${shot.file}-1280.webp 1280w, /images/game/${shot.file}.webp 2560w`"
                :sizes="shot.wide ? '(min-width: 1024px) 1050px, 85vw' : '(min-width: 1024px) 800px, 64vw'"
                alt=""
                class="block h-[var(--shot-h)] w-full object-cover transition-opacity group-hover:opacity-90"
                loading="lazy"
                width="1280"
                height="720"
            >
          </button>
          <figcaption class="mt-2 font-pixel text-sm text-muted">{{ $t(`gallery.items.${shot.key}`) }}</figcaption>
        </figure>
      </li>
    </ul>

    <dialog
        ref="dialog"
        class="max-h-none max-w-none bg-transparent p-0 backdrop:bg-[rgb(18_18_42/0.92)]"
        aria-labelledby="gallery-dialog-title"
        @click.self="close"
        @close="onClose"
        @keydown="onKeydown"
    >
      <!-- Chrome is 60px tall (2px frame top and bottom, 56px title bar), so 5rem leaves 10px above and below -->
      <pixel-window
          v-if="current"
          flush
          class="window-open w-[min(calc(100vw-0.5rem),1600px,calc((100svh-5rem)*16/9))] sm:w-[min(94vw,1600px,calc((100svh-5rem)*16/9))]"
      >
        <template #title>
          <span id="gallery-dialog-title" class="min-w-0 flex-1 text-sm leading-tight sm:text-[1rem]" aria-live="polite" aria-atomic="true">
            {{ $t(`gallery.items.${current.key}`) }}<span class="sr-only">, {{ $t('gallery.position', {n: position, total: shots.length}) }}</span>
          </span>
          <div class="flex shrink-0 items-center gap-1">
            <span class="mr-2 hidden font-normal text-ink/80 sm:inline" aria-hidden="true">{{ position }}&thinsp;/&thinsp;{{ shots.length }}</span>
            <button type="button" class="bevel flex h-11 w-11 items-center justify-center bg-night-3 text-ink hover:bg-[var(--bevel-hi)]" @click="step(-1)">
              <span class="sr-only">{{ $t('gallery.previous') }}</span>
              <svg class="pixelated h-5 w-5" viewBox="0 0 10 10" shape-rendering="crispEdges" aria-hidden="true">
                <rect x="6" y="2" width="1" height="1" fill="currentColor"/>
                <rect x="5" y="3" width="1" height="1" fill="currentColor"/>
                <rect x="3" y="4" width="2" height="2" fill="currentColor"/>
                <rect x="5" y="6" width="1" height="1" fill="currentColor"/>
                <rect x="6" y="7" width="1" height="1" fill="currentColor"/>
              </svg>
            </button>
            <button type="button" class="bevel flex h-11 w-11 items-center justify-center bg-night-3 text-ink hover:bg-[var(--bevel-hi)]" @click="step(1)">
              <span class="sr-only">{{ $t('gallery.next') }}</span>
              <svg class="pixelated h-5 w-5" viewBox="0 0 10 10" shape-rendering="crispEdges" aria-hidden="true">
                <rect x="3" y="2" width="1" height="1" fill="currentColor"/>
                <rect x="4" y="3" width="1" height="1" fill="currentColor"/>
                <rect x="5" y="4" width="2" height="2" fill="currentColor"/>
                <rect x="4" y="6" width="1" height="1" fill="currentColor"/>
                <rect x="3" y="7" width="1" height="1" fill="currentColor"/>
              </svg>
            </button>
            <button type="button" autofocus class="bevel flex h-11 w-11 items-center justify-center bg-night-3 text-ink hover:bg-[var(--bevel-hi)]" @click="close">
              <span class="sr-only">{{ $t('gallery.close') }}</span>
              <svg class="pixelated h-5 w-5" viewBox="0 0 10 10" shape-rendering="crispEdges" aria-hidden="true">
                <rect x="2" y="2" width="1" height="1" fill="currentColor"/>
                <rect x="3" y="3" width="1" height="1" fill="currentColor"/>
                <rect x="4" y="4" width="2" height="2" fill="currentColor"/>
                <rect x="6" y="6" width="1" height="1" fill="currentColor"/>
                <rect x="7" y="7" width="1" height="1" fill="currentColor"/>
                <rect x="7" y="2" width="1" height="1" fill="currentColor"/>
                <rect x="6" y="3" width="1" height="1" fill="currentColor"/>
                <rect x="3" y="6" width="1" height="1" fill="currentColor"/>
                <rect x="2" y="7" width="1" height="1" fill="currentColor"/>
              </svg>
            </button>
          </div>
        </template>
        <img
            :key="current.file"
            :src="`/images/game/${current.file}.webp`"
            :srcset="`/images/game/${current.file}-1280.webp 1280w, /images/game/${current.file}.webp 2560w`"
            sizes="(min-width: 1702px) 1596px, (min-width: 640px) calc(94vw - 4px), calc(100vw - 12px)"
            :alt="$t(`gallery.items.${current.key}`)"
            class="shot-in block aspect-video w-full object-cover"
            width="2560"
            height="1440"
        >
      </pixel-window>
    </dialog>
  </section>
</template>

<style scoped>
/* Shots line up with the page column on the left and run off the screen on the right */
.reel {
  --shot-h: clamp(9rem, 36vw, 28rem);
  --reel-pad: max(1rem, calc((100% - 72rem) / 2 + 1rem));
  padding-inline: var(--reel-pad);
  scroll-padding-inline: var(--reel-pad);
}

@media (min-width: 1024px) {
  .reel {
    --reel-pad: max(2rem, calc((100% - 72rem) / 2 + 2rem));
  }
}
</style>
