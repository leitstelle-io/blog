<script setup>
const {locale} = useI18n()


const {data: faqContent, refresh} = await useAsyncData('faqContent', () => {
  return queryContent(`${locale.value}/faq`).find()
})

watch(() => locale.value, refresh)

const expandedItems = ref([]);
const toggleAnswer = (faqItemPath) => {
  if (expandedItems.value.includes(faqItemPath)) {
    expandedItems.value = expandedItems.value.filter((path) => path !== faqItemPath);
  } else {
    expandedItems.value.push(faqItemPath);
  }
}

const isVisible = (faqItemPath) => expandedItems.value.includes(faqItemPath)
</script>

<template>
  <div class="mx-auto flex w-full max-w-3xl flex-col gap-16 px-4 py-12 lg:px-0 lg:py-32">
    <h2 class="text-2xl font-bold leading-10 tracking-tight text-gray-900">{{ $t('faq.title') }}</h2>
    <dl class="mt-10 space-y-6 divide-y divide-gray-900/10">

      <template v-for="entry in faqContent" :key="entry?._path">

        <div class="pt-6">
          <dt>
            <!-- Expand/collapse question button -->
            <button
                type="button"
                class="flex w-full items-start justify-between text-left text-gray-900"
                aria-controls="faq-0" aria-expanded="false"
            >
                <span class="text-base font-semibold leading-7" @click="toggleAnswer(entry._path)">
                  {{ entry.body.children[0].children[0].value }}
                </span>
              <span class="ml-6 flex h-7 items-center">
                <!--
                  Icon when question is collapsed.

                  Item expanded: "hidden", Item collapsed: ""
                -->
                <svg
                    @click="toggleAnswer(entry._path)"
                    v-if="!isVisible(entry._path)"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6"/>
                </svg>
                <!--
                  Icon when question is expanded.

                  Item expanded: "", Item collapsed: "hidden"
                -->
                <svg
                    @click="toggleAnswer(entry._path)"
                    v-if="isVisible(entry._path)"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M18 12H6"/>
                </svg>
              </span>
            </button>
          </dt>
          <dd class="mt-2 pr-12" id="faq-0" v-if="isVisible(entry._path)">
            <p class="text-base leading-7 text-gray-600">{{ entry.body.children[1].children[0].value }}</p>
          </dd>
        </div>
      </template>
    </dl>
  </div>
</template>
