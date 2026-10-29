<script setup lang="ts">
defineProps<{
  on: boolean
}>()
</script>

<template>
  <!-- Blue light washing in from both screen edges, alternating like two beacons -->
  <div v-if="on" class="pointer-events-none fixed inset-0 z-30" aria-hidden="true">
    <div class="beacon beacon-left absolute inset-y-0 left-0 w-[32vw] bg-[radial-gradient(ellipse_100%_75%_at_0%_50%,rgb(var(--beacon-rgb)/0.7),rgb(var(--beacon-rgb)/0.22)_40%,transparent_72%)]"></div>
    <div class="beacon beacon-right absolute inset-y-0 right-0 w-[32vw] bg-[radial-gradient(ellipse_100%_75%_at_100%_50%,rgb(var(--beacon-rgb)/0.7),rgb(var(--beacon-rgb)/0.22)_40%,transparent_72%)]"></div>
  </div>
</template>

<style scoped>
/* Each side flashes about 1.2 times a second, well under the 3 flashes per second limit */
.beacon {
  mix-blend-mode: screen;
  animation: beacon 0.84s ease-in-out infinite;
}

.beacon-right {
  animation-delay: -0.42s;
}

@keyframes beacon {
  0%, 100% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .beacon {
    animation: none;
    opacity: 0.6;
  }
}
</style>
