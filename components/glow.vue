<script setup>
import { ref, onMounted } from 'vue';

const desktopGradientId = ref('');
const mobileGradientId = ref('');


onMounted(() => {
  desktopGradientId.value = `${id()}-desktop`;
  mobileGradientId.value = `${id()}-mobile`;
});

const id = () => `id-${Math.random().toString(36).substr(2, 9)}`;

</script>

<template>
  <div class="absolute inset-0 -z-10 overflow-hidden bg-gray-950 lg:right-[calc(max(2rem,50%-38rem)+40rem)] lg:min-w-[32rem]">
    <svg
      class="absolute -bottom-48 left-[-40%] h-[80rem] w-[180%] lg:-right-40 lg:bottom-auto lg:left-auto lg:top-[-40%] lg:h-[180%] lg:w-[80rem]"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="desktop" cx="100%">
          <stop offset="0%" stop-color="rgba(248, 56, 56, 0.6)" />
          <stop offset="53.95%" stop-color="rgba(255, 0, 71, 0.3)" />
          <stop offset="100%" stop-color="rgba(23, 14, 10, 0.1)" />
        </radialGradient>
        <radialGradient id="mobile" cy="100%">
          <stop offset="0%" stop-color="rgba(248, 56, 56, 0.6)" />
          <stop offset="53.95%" stop-color="rgba(255, 0, 71, 0.3)" />
          <stop offset="100%" stop-color="rgba(23, 14, 10, 0.1)" />
        </radialGradient>
      </defs>
      <rect
        width="100%"
        height="100%"
        fill="url(#desktop)"
        class="hidden lg:block"
      />
      <rect
        width="100%"
        height="100%"
        fill="url(#mobile)"
        class="block lg:hidden"
      />
    </svg>
    <div class="absolute inset-x-0 bottom-0 right-0 h-px bg-white mix-blend-overlay lg:left-auto lg:top-0 lg:h-auto lg:w-px"></div>
  </div>
</template>

