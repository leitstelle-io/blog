<script setup lang="ts">
// Shows the video once a file is set via `src`; until then the poster plus a "video coming soon" badge
defineProps<{
  src?: string
  poster: string
  posterSrcset?: string
  posterSizes?: string
  caption?: string
  alt?: string
  cover?: boolean
  // Light layers laid over the poster with the same fit as the poster, so they line up at any crop.
  // They're only shown while there's no video: the footage brings its own light.
  lights?: {src: string, class: string}[]
}>()
</script>

<template>
  <figure class="not-prose relative m-0" :class="cover ? 'h-full w-full' : 'my-8'">
    <div class="relative overflow-hidden bg-night-2" :class="cover ? 'h-full w-full' : 'bevel aspect-video p-[2px]'">
      <video
          v-if="src"
          :src="src"
          :poster="poster"
          class="h-full w-full object-cover"
          autoplay
          muted
          loop
          playsinline
          :controls="!cover"
      />
      <template v-else>
        <img
            :src="poster"
            :srcset="posterSrcset"
            :sizes="posterSizes"
            :alt="alt ?? ''"
            :fetchpriority="cover ? 'high' : undefined"
            width="1280"
            height="720"
            class="h-full w-full object-cover"
        >
        <img
            v-for="light in lights"
            :key="light.src"
            :src="light.src"
            alt=""
            aria-hidden="true"
            decoding="async"
            width="1280"
            height="720"
            class="light-layer absolute inset-0 h-full w-full object-cover"
            :class="light.class"
        >
        <div
            v-if="!cover"
            class="bevel absolute bottom-4 right-4 flex items-center gap-2 bg-night-2/90 px-3 py-2 font-pixel text-sm text-ink"
        >
          <span class="inline-block h-0 w-0 border-y-[6px] border-l-[10px] border-y-transparent border-l-amber" aria-hidden="true"></span>
          {{ $t('video.soon') }}
        </div>
      </template>
    </div>
    <figcaption v-if="caption" class="mt-2 font-pixel text-sm text-muted">{{ caption }}</figcaption>
  </figure>
</template>
