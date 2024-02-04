<script setup>
const { params } = useRoute()
const { locale } = useI18n()
const blogPost = ref()

const fetchBlogPost = async () => {
  const {data} = await useAsyncData('blog', () => queryContent(
      `${locale.value}/blog/${params.year}/${params.month}/${params.slug}`
  ).findOne())

  if (!data.value) await clearError({redirect: '/'})

  blogPost.value = data.value
}

fetchBlogPost()

watch(() => locale.value, fetchBlogPost)
</script>

<template>
  <div class="mx-auto flex w-full max-w-3xl flex-col gap-16 px-4 py-12 lg:px-0 lg:py-32">
    <article class="prose prose-gray">
      <time :datetime="blogPost?.published_at" class="text-gray-500 text-xs">{{ blogPost?.published_at }}</time>
      <ContentRendererMarkdown :value="blogPost" />
    </article>
  </div>
</template>
