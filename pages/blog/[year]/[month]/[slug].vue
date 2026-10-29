<script setup>
const route = useRoute()
const {locale} = useI18n()
const localePath = useLocalePath()
const formatDate = useFormattedDate()

const {data: blogPost} = await useAsyncData(
    `post-${route.path}`,
    () => queryContent(locale.value, 'blog', route.params.year, route.params.month, route.params.slug)
        .findOne(),
    {watch: [locale]}
)

if (!blogPost.value) {
  throw createError({statusCode: 404, statusMessage: 'Post not found', fatal: true})
}

useHead(() => ({
  title: blogPost.value?.title,
  meta: [
    {name: 'description', content: blogPost.value?.description},
    {property: 'og:title', content: blogPost.value?.title},
    {property: 'og:description', content: blogPost.value?.description},
    // Social previews don't reliably render webp, those posts keep the site's jpg
    ...(blogPost.value?.cover && !blogPost.value.cover.endsWith('.webp')
        ? [{property: 'og:image', content: `https://leitstelle.io${blogPost.value.cover}`}]
        : []),
  ],
}))
</script>

<template>
  <main class="mx-auto w-full max-w-3xl px-4 py-16 lg:py-24">
    <nuxt-link :to="localePath('/blog')" class="font-pixel text-sm text-muted hover:text-amber">
      <span aria-hidden="true">&larr;</span> Devlog
    </nuxt-link>
    <time :datetime="blogPost?.published_at" class="mt-8 block font-pixel text-sm text-amber">{{ formatDate(blogPost?.published_at) }}</time>
    <article class="prose prose-lg prose-night mt-2 max-w-none prose-h1:text-4xl prose-h1:leading-tight prose-h2:mt-14">
      <ContentRendererMarkdown :value="blogPost"/>
    </article>
  </main>
</template>
