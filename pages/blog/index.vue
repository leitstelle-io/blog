<script setup lang="ts">
const {locale, t} = useI18n()

useHead({title: 'Devlog'})

const {data: blogPosts} = await useAsyncData(
    `blog-index-${locale.value}`,
    () => queryContent(locale.value, 'blog')
        .sort({'published_at': -1})
        .find(),
    {watch: [locale]}
)
</script>

<template>
  <main class="mx-auto max-w-6xl px-4 py-16 lg:px-8 lg:py-24">
    <h1 class="font-pixel text-4xl font-semibold text-ink sm:text-5xl">Devlog</h1>
    <p class="mt-4 max-w-[60ch] text-lg leading-relaxed text-ink/80">{{ t('blog.lead') }}</p>
    <ul class="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <li v-for="post in blogPosts" :key="post._path">
        <post-card :post="post"/>
      </li>
    </ul>
  </main>
</template>
