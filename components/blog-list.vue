<script setup lang="ts">
const {locale} = useI18n()
const localePath = useLocalePath()
const postPath = usePostPath()
const formatDate = useFormattedDate()

// Only the newest post: older ones describe the earlier browser version and live in the devlog
const {data: posts} = await useAsyncData(
    `blog-latest-${locale.value}`,
    () => queryContent(locale.value, 'blog')
        .sort({'published_at': -1})
        .limit(1)
        .find(),
    {watch: [locale]}
)
const post = computed(() => posts.value?.[0])
</script>

<template>
  <pixel-window as="section" flush fill aria-labelledby="devlog-title">
    <template #title>
      <h3 id="devlog-title">{{ $t('follow.window') }}</h3>
      <nuxt-link :to="localePath('/blog')" class="-my-1.5 inline-flex items-center py-1.5 font-normal text-ink/85 hover:text-amber-hi">
        {{ $t('follow.archive') }}&nbsp;<span aria-hidden="true">&rarr;</span>
      </nuxt-link>
    </template>

    <nuxt-link v-if="post" :to="postPath(post._path)" class="group flex flex-1 flex-col transition-colors hover:bg-night-3">
      <div class="aspect-[2/1] overflow-hidden border-b-2 border-[var(--bevel-lo)] bg-[var(--bevel-lo)]">
        <img
            v-if="post.cover"
            :src="post.cover"
            alt=""
            width="1280"
            height="720"
            class="h-full w-full object-cover opacity-90 transition-opacity group-hover:opacity-100"
            loading="lazy"
        >
        <div v-else class="flex h-full items-center justify-center">
          <img src="/logo-pixel.svg" alt="" class="pixelated h-16 w-16 opacity-60">
        </div>
      </div>
      <div class="flex flex-1 flex-col gap-3 p-5 lg:p-6">
        <time :datetime="post.published_at" class="font-pixel text-sm text-muted">{{ formatDate(post.published_at) }}</time>
        <p class="text-balance font-pixel text-2xl font-semibold leading-snug text-ink group-hover:text-amber-hi">{{ post.title }}</p>
        <p class="max-w-[60ch] leading-relaxed text-ink/80">{{ post.description }}</p>
        <span class="mt-auto pt-2 font-pixel text-amber group-hover:text-amber-hi">
          {{ $t('blog.read') }} <span aria-hidden="true">&rarr;</span>
        </span>
      </div>
    </nuxt-link>
    <p v-else class="p-5 text-muted">{{ $t('blog.empty') }}</p>
  </pixel-window>
</template>
