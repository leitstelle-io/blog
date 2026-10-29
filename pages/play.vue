<script setup>
const {t} = useI18n()
const formatDate = useFormattedDate()

// Update with every change to the board (spec.items in lang/*.ts)
const UPDATED = '2026-10-29'

useSeoMeta({
  title: () => t('status.title'),
  description: () => t('status.lead'),
  ogDescription: () => t('status.lead'),
})
</script>

<template>
  <main class="flex flex-col gap-24 pb-24 pt-16 lg:pt-24">
    <section class="mx-auto w-full max-w-6xl px-4 lg:px-8" aria-labelledby="status-title">
      <h1 id="status-title" class="max-w-3xl text-balance font-pixel text-4xl font-semibold leading-tight text-ink sm:text-5xl">{{ t('status.title') }}</h1>
      <p class="mt-5 max-w-[60ch] text-lg leading-relaxed text-ink/80">{{ t('status.lead') }}</p>
      <p class="mt-4 font-pixel text-sm text-muted">
        <time :datetime="UPDATED">{{ t('status.updated', {date: formatDate(UPDATED)}) }}</time>
      </p>
      <dev-board wide class="mt-10 lg:mt-14"/>
    </section>
    <follow-section/>
  </main>
</template>
