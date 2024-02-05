<script setup lang="ts">
const {locale} = useI18n()
const localePath = useLocalePath()

const blogPosts = await
    queryContent(`${locale.value}/blog`).sort({'published_at': -1})
        .limit(10)
        .find()
</script>

<template>
  <div class="prose prose-2xl text-black flex flex-col font-medium leading-normal">
    <p class="text-3xl font-bold" id="blog">
      {{ $t('blog.latest') }}
    </p>
    <template v-for="blog in blogPosts">
      <nuxt-link class="my-1 hover:text-yellow-500" :to="blog?._path">
        {{ blog?.title }}
        <!--<formatted-date :date="blog.date"/>-->
      </nuxt-link>
    </template>
  </div>
  <div>
    <nuxt-link :to="localePath('/blog')" class="mt-12 text-base font-normal hover:text-yellow-400">
      {{ $t('blog.readMore') }}
    </nuxt-link>
  </div>
</template>