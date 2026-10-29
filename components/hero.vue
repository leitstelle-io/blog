<script setup lang="ts">
import { useEventListener } from '@vueuse/core'

const beacon = ref(false)
let timer: ReturnType<typeof setTimeout> | undefined

const setBeacon = (on: boolean, seconds?: number) => {
  clearTimeout(timer)
  beacon.value = on
  if (on && seconds) timer = setTimeout(() => beacon.value = false, seconds * 1000)
}

// L toggles the blue lights, as it does in the game
useEventListener('keydown', (event: KeyboardEvent) => {
  if (event.key.toLowerCase() !== 'l' || event.altKey || event.ctrlKey || event.metaKey) return
  if ((event.target as HTMLElement).closest?.('input, textarea, select, [contenteditable]')) return
  setBeacon(!beacon.value)
})

onBeforeUnmount(() => clearTimeout(timer))

// The still frame comes alive until the video exists: the fire's spill flickers and the
// light bars of the four vehicles flash in two groups. All three layers are cut from the frame itself.
const {target, live} = useLive()
const lights = [
  {src: '/images/game/hero-nacht-firelight.webp', class: 'firelight'},
  {src: '/images/game/hero-nacht-beacons-a.webp', class: 'scene-beacon'},
  {src: '/images/game/hero-nacht-beacons-b.webp', class: 'scene-beacon scene-beacon-late'},
]
</script>

<template>
  <!--
    The copy never covers the scene: below xl it follows below the image,
    from xl it sits top-left over the neighbouring house. There the image is scaled up from
    the top-left corner so the first engine moves out from under the buttons and the status panel.
  -->
  <section ref="target" :data-live="live" class="relative isolate flex flex-col overflow-hidden xl:block xl:h-[calc(100svh-4rem)] xl:min-h-[600px]">
    <div data-cursor="scene" class="relative -z-10 h-[56svh] min-h-[320px] sm:aspect-video sm:h-auto sm:max-h-[72svh] lg:max-h-[55svh] xl:absolute xl:inset-0 xl:h-auto xl:max-h-none xl:min-h-0 xl:aspect-auto">
      <!-- Set `src` to /videos/gameplay.mp4 once the recording is in public/videos -->
      <video-slot
          cover
          poster="/images/game/hero-nacht-1280.webp"
          poster-srcset="/images/game/hero-nacht-1280.webp 1280w, /images/game/hero-nacht.webp 2560w"
          poster-sizes="100vw"
          :alt="$t('hero.posterAlt')"
          :lights="lights"
          class="[&_:is(img,video)]:object-[50%_55%] xl:[&_:is(img,video)]:origin-top-left xl:[&_:is(img,video)]:scale-[1.12] xl:[&_:is(img,video)]:object-[50%_40%]"
      />
      <div class="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-night to-transparent xl:h-1/4"></div>
      <div class="pointer-events-none absolute inset-0 hidden bg-[radial-gradient(ellipse_70%_75%_at_0%_0%,rgb(18_18_42/0.92),rgb(18_18_42/0.55)_45%,transparent_75%)] xl:block"></div>
      <!-- A recessed label, not a raised key: nothing to press until the video exists -->
      <p class="bevel-in absolute right-4 top-4 bg-night-2/90 px-3 py-2 font-pixel text-sm text-muted xl:right-8 xl:top-6">
        {{ $t('video.soon') }}
      </p>
    </div>

    <!-- Below xl the buttons come before the tagline so Discord is reachable on the first screen -->
    <div class="relative mx-auto flex w-full max-w-6xl flex-col px-4 pb-4 pt-2 lg:px-8 xl:mx-0 xl:max-w-none xl:px-16 xl:pb-0 xl:pt-20">
      <h1 class="max-w-2xl text-balance font-pixel text-4xl font-semibold leading-tight text-ink [text-shadow:0_2px_16px_rgb(18_18_42/0.9)] sm:text-5xl xl:max-w-[15ch] 2xl:text-6xl">
        {{ $t('hero.title') }}
      </h1>
      <p class="order-last mt-6 max-w-[56ch] text-lg leading-relaxed text-ink/90 [text-shadow:0_1px_10px_rgb(18_18_42/0.9)] xl:order-none xl:max-w-[38ch] 2xl:max-w-[44ch]">
        {{ $t('hero.tagline') }}
      </p>
      <div class="mt-6 xl:mt-10">
        <div class="flex flex-wrap gap-3">
          <pixel-button to="https://discord.gg/cdRq3bztJu" external variant="primary">
            {{ $t('hero.discord') }} <span aria-hidden="true">&rarr;</span>
          </pixel-button>
          <pixel-button to="https://forum.leitstelle.io" external>
            Forum
          </pixel-button>
        </div>
        <p class="bevel mt-4 flex w-fit max-w-[46ch] items-baseline gap-3 bg-night-2/90 px-3 py-2 font-pixel text-sm leading-relaxed text-ink/80 xl:max-w-[30ch]">
          <span class="status-lamp" aria-hidden="true"></span>
          <span class="text-balance">{{ $t('hero.status') }}</span>
        </p>
      </div>
    </div>

    <!-- Below xl the alarm follows the copy; from xl it hangs top-right over the scene, clear of the fire -->
    <div class="mx-auto mt-4 w-full max-w-6xl px-4 lg:px-8 xl:absolute xl:right-8 xl:top-20 xl:mt-0 xl:w-[24rem] xl:px-0">
      <alarm-toast class="max-w-md" @alert="setBeacon(true, 10)"/>
    </div>
  </section>

  <beacon-lights :on="beacon"/>
</template>
