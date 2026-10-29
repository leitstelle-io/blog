<script setup lang="ts">
defineProps<{
  size?: 'md' | 'lg'
}>()
</script>

<template>
  <span class="inline-flex items-center gap-3">
    <img
        src="/logo-pixel.svg"
        alt=""
        class="pixelated"
        :class="size === 'lg' ? 'h-12 w-12' : 'h-9 w-9'"
        width="24"
        height="24"
    >
    <span class="font-pixel font-semibold tracking-wide text-ink" :class="size === 'lg' ? 'text-3xl' : 'text-xl'">Leitstelle</span>
  </span>
</template>
