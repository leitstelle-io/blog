<script setup lang="ts">
import { onClickOutside, onKeyStroke, useIntersectionObserver } from '@vueuse/core'

const open = ref(false)
const onScreen = ref(true)
const root = ref<HTMLElement | null>(null)
const button = ref<HTMLButtonElement | null>(null)
const bubble = ref<HTMLElement | null>(null)

useIntersectionObserver(root, ([entry]) => onScreen.value = entry.isIntersecting)

function close(refocus = true) {
  open.value = false
  if (refocus) button.value?.focus({preventScroll: true})
}

onKeyStroke('Escape', () => open.value && close())

// Take focus back unless the click landed on another control
onClickOutside(root, () => {
  if (!open.value) return
  const target = document.activeElement as HTMLElement | null
  close(!target || target === document.body || target.tabIndex < 0)
})

watch(open, async (isOpen) => {
  if (!isOpen) return
  await nextTick()
  bubble.value?.scrollIntoView({block: 'nearest'})
})
</script>

<template>
  <div ref="root" class="z-10">
    <button
        ref="button"
        type="button"
        class="summi-bob block"
        :class="{'summi-paused': !onScreen}"
        :aria-label="open ? $t('summi.close') : $t('summi.open')"
        :aria-expanded="open"
        aria-controls="summi-bubble"
        @click="open = !open"
    >
      <img
          src="/images/summi-sprite.webp"
          alt=""
          width="120"
          height="96"
          loading="lazy"
          decoding="async"
          class="pixelated h-36 w-[180px] lg:h-48 lg:w-60"
          :class="{'summi-happy': open}"
      >
    </button>

    <div
        v-if="open"
        id="summi-bubble"
        ref="bubble"
        class="absolute bottom-full right-0 mb-3 w-72 max-w-[calc(100vw-2rem)] border-2 border-[var(--bevel-lo)] bg-ink px-4 pb-2 pt-3 text-night"
    >
      <p class="font-pixel font-semibold">{{ $t('summi.greeting') }}</p>
      <p class="mt-1 text-sm leading-relaxed">{{ $t('summi.text') }}</p>
      <a
          href="https://forum.leitstelle.io"
          target="_blank"
          rel="noopener"
          class="inline-flex min-h-11 items-center font-pixel font-semibold underline decoration-[var(--amber-lo)] decoration-2 underline-offset-4 hover:decoration-night focus-visible:outline-night"
      >
        {{ $t('summi.action') }}<span class="sr-only">{{ ' ' + $t('nav.newTab') }}</span>
      </a>
      <svg
          class="absolute right-16 top-full -mt-0.5 h-3 w-4"
          viewBox="0 0 8 6"
          shape-rendering="crispEdges"
          aria-hidden="true"
      >
        <rect x="0" y="0" width="8" height="1" fill="var(--ink)"/>
        <rect x="0" y="0" width="1" height="2" fill="var(--bevel-lo)"/>
        <rect x="7" y="0" width="1" height="2" fill="var(--bevel-lo)"/>
        <rect x="1" y="0" width="6" height="2" fill="var(--ink)"/>
        <rect x="1" y="2" width="1" height="2" fill="var(--bevel-lo)"/>
        <rect x="6" y="2" width="1" height="2" fill="var(--bevel-lo)"/>
        <rect x="2" y="2" width="4" height="2" fill="var(--ink)"/>
        <rect x="2" y="4" width="1" height="2" fill="var(--bevel-lo)"/>
        <rect x="5" y="4" width="1" height="2" fill="var(--bevel-lo)"/>
        <rect x="3" y="4" width="2" height="1" fill="var(--ink)"/>
        <rect x="3" y="5" width="2" height="1" fill="var(--bevel-lo)"/>
      </svg>
    </div>
  </div>
</template>

<style scoped>
/* Hovers in whole pixels, like a sprite */
.summi-bob {
  animation: summi-bob 2.4s steps(1, end) infinite;
}

.summi-paused {
  animation-play-state: paused;
}

@keyframes summi-bob {
  0%, 100% { transform: translateY(0); }
  25%, 75% { transform: translateY(-2px); }
  50% { transform: translateY(-4px); }
}

.summi-happy {
  animation: summi-happy 360ms steps(1, end);
}

@keyframes summi-happy {
  0%, 100% { transform: rotate(0); }
  25% { transform: rotate(-3deg); }
  50% { transform: rotate(3deg); }
  75% { transform: rotate(-2deg); }
}

@media (prefers-reduced-motion: reduce) {
  .summi-bob,
  .summi-happy {
    animation: none;
  }
}
</style>
