<script setup lang="ts">
const {locale} = useI18n()

const blogPosts = ref()

const fetchPosts = async () => {
  const {data} = await useAsyncData(`content/${locale.value}/blog`, () => {
    return queryContent(`${locale.value}/blog`).sort({'published_at': -1}).find()
  })
  blogPosts.value = data.value
}

fetchPosts()

watch(() => locale.value, fetchPosts)
</script>
<template>
  <div class="mx-auto flex w-full max-w-3xl flex-col gap-16 px-4 py-12 lg:px-0 lg:py-32">
    <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{{ $t('blog.title') }}</h2>
    <div class="space-y-16">
      <template v-for="blog in blogPosts">
        <article class="flex flex-col items-start justify-between">
          <div class="flex items-center gap-x-4 text-xs">
            <time :datetime="blog?.published_at" class="text-gray-500">{{ blog?.published_at }}</time>
            <!-- TODO ADD TAGS -->
            <!--<a href="#" class="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">Marketing</a>-->
          </div>
          <div class="group relative">
            <h3 class="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
              <nuxt-link :to="blog?._path?.substring(3)">
                <span class="absolute inset-0"></span>
                {{ blog.title }}
              </nuxt-link>
            </h3>
            <p class="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{{ blog.description }}</p>
          </div>
        </article>
      </template>
    </div>
  </div>
</template>
