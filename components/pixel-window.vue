<script setup lang="ts">
defineProps<{
  title?: string
  as?: string
  // Drop the body padding, so content (like a lightbox image) runs edge to edge inside the bevel frame
  flush?: boolean
  // Stretch the body to the window's height as a column, so content can sit at the bottom (mt-auto)
  // when windows side by side share one height
  fill?: boolean
}>()
</script>

<template>
  <component :is="as ?? 'section'" class="bevel bg-night-2 p-[2px]" :class="fill ? 'flex flex-col' : undefined">
    <div v-if="title || $slots.title" class="flex items-center justify-between gap-3 bg-brand px-3 py-1.5 font-pixel font-semibold text-ink">
      <slot name="title">
        <span>{{ title }}</span>
      </slot>
    </div>
    <div :class="[flush ? undefined : 'p-5', fill ? 'flex flex-1 flex-col' : undefined]">
      <slot/>
    </div>
  </component>
</template>
