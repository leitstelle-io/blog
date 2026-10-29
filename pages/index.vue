<script setup lang="ts">
const {t} = useI18n()

useSeoMeta({
  title: () => t('seo.title'),
  ogTitle: () => `Leitstelle – ${t('seo.title')}`,
  description: () => t('seo.description'),
  ogDescription: () => t('seo.description'),
})
</script>

<template>
  <main class="flex flex-col gap-24 pb-24">
    <hero/>
    <features/>
    <gallery/>
    <fleet-hud/>
    <spec-sheet/>
    <follow-section/>
  </main>
</template>
