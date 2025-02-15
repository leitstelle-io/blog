<script setup>
const {params} = useRoute()
const {locale} = useI18n()

const {data: gameState, refresh} = await useAsyncData(
    'gameState',
    () => queryContent(locale.value, 'game-state').findOne()
)

if (!gameState.value) await clearError({redirect: '/'})

watchEffect(locale, refresh(), {
  immediate: true
})
</script>

<template>
  <div class="mx-auto flex w-full max-w-3xl flex-col gap-16 px-4 py-12 lg:px-0 lg:py-32">
    <article class="mx-auto prose prose-gray">
      <ContentRendererMarkdown :value="gameState"/>
    </article>
  </div>
</template>
