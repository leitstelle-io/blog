<script setup lang="ts">
const props = defineProps<{
  id: string;
  date: string;
}>();
</script>

<template>
  <header class="relative mb-10 xl:mb-0">
    <div class="pointer-events-none absolute left-[max(-0.5rem,calc(50%-18.625rem))] top-0 z-50 flex h-4 items-center justify-end gap-x-2 lg:left-0 lg:right-[calc(max(2rem,50%-38rem)+40rem)] lg:min-w-[32rem] xl:h-8">
      <nuxt-link :to="`#${props.id}`" class="inline-flex">
        <formatted-date
          :date="date"
          class="hidden xl:pointer-events-auto xl:block xl:text-2xs/4 xl:font-medium xl:text-white/50"
        />
      </nuxt-link>
      <div class="h-[0.0625rem] w-3.5 bg-gray-400 lg:-mr-3.5 xl:mr-0 xl:bg-gray-300"></div>
    </div>
    <content-wrapper>
      <div class="flex">
        <nuxt-link :to="`#${props.id}`" class="inline-flex">
          <formatted-date
            :date="props.date"
            class="text-2xs/4 font-medium text-gray-500 dark:text-white/50 xl:hidden"
          />
        </nuxt-link>
      </div>
    </content-wrapper>
  </header>
</template>
