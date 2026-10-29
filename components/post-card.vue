<script setup lang="ts">
defineProps<{
  post: Record<string, any>
}>()

const postPath = usePostPath()
const formatDate = useFormattedDate()
</script>

<template>
  <nuxt-link :to="postPath(post._path)" class="bevel group flex h-full flex-col bg-night-2 p-[2px] transition-colors hover:bg-night-3">
    <div class="aspect-[16/7] overflow-hidden bg-[var(--bevel-lo)]">
      <img v-if="post.cover" :src="post.cover" alt="" class="h-full w-full object-cover opacity-90 transition-opacity group-hover:opacity-100" loading="lazy">
      <div v-else class="flex h-full items-center justify-center">
        <img src="/logo-pixel.svg" alt="" class="pixelated h-12 w-12 opacity-60">
      </div>
    </div>
    <div class="flex flex-1 flex-col gap-2 p-5">
      <time :datetime="post.published_at" class="font-pixel text-sm text-muted">{{ formatDate(post.published_at) }}</time>
      <h3 class="font-pixel text-xl font-semibold text-ink group-hover:text-amber-hi">{{ post.title }}</h3>
      <p class="line-clamp-3 text-sm leading-relaxed text-ink/75">{{ post.description }}</p>
    </div>
  </nuxt-link>
</template>
