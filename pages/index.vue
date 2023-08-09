<script setup lang="ts">
const { data } = await useAsyncData('content', () => {
  return queryContent('/blog').sort({'date': -1}).find()
})
</script>

<template>
  <div class="flex min-h-full flex-col bg-white dark:bg-gray-950">
    <fixed-sidebar>
      <intro />
    </fixed-sidebar>
    <div class="relative flex-auto">
      <timeline />
      <main class="space-y-20 py-20 sm:space-y-32 sm:py-32">
        <template v-for="entry in data">
          <Article :id="entry.routeId" :date="entry.date">
            <ContentRendererMarkdown :value="entry.body" />
          </Article>
        </template>
      </main>
    </div>
  </div>
</template>