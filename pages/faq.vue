<script setup lang="ts">
const {locale, t} = useI18n()
const route = useRoute()

useHead({title: 'FAQ'})

const {data: faqContent} = await useAsyncData(
    `faq-${locale.value}`,
    () => queryContent(locale.value, 'faq').find(),
    {watch: [locale]}
)

const categories = ['game', 'tech', 'project', 'community'] as const
type Category = typeof categories[number]

// Plain text of a markdown node, for the question line and for search
const textOf = (node: any): string => node?.value ?? (node?.children ?? []).map(textOf).join(' ')

// Each FAQ file is "# Question" followed by any amount of markdown as the answer
const entries = computed(() => (faqContent.value ?? [])
    .map(entry => {
      const [heading, ...answer] = entry.body.children
      return {
        id: entry._path.split('/').pop() as string,
        category: (categories.includes(entry.category) ? entry.category : 'project') as Category,
        order: entry.order ?? 99,
        question: textOf(heading) || entry.title,
        text: answer.map(textOf).join(' '),
        answer: {...entry, body: {...entry.body, children: answer}},
      }
    })
    .sort((a, b) => categories.indexOf(a.category) - categories.indexOf(b.category) || a.order - b.order))

const query = ref('')
const filter = ref<Category | 'all'>('all')

const matches = (entry: typeof entries.value[number]) => {
  const words = query.value.toLowerCase().split(/\s+/).filter(Boolean)
  const haystack = `${entry.question} ${entry.text}`.toLowerCase()
  return words.every(word => haystack.includes(word))
}
const visible = computed(() => entries.value.filter(e => (filter.value === 'all' || e.category === filter.value) && matches(e)))
const countFor = (category: Category | 'all') => entries.value.filter(e => (category === 'all' || e.category === category) && matches(e)).length

// Grouped by topic while nothing narrows the list down, a flat list otherwise
const groups = computed(() => filter.value === 'all' && !query.value.trim()
    ? categories.map(c => ({category: c, items: visible.value.filter(e => e.category === c)})).filter(g => g.items.length)
    : [{category: null, items: visible.value}])

const open = ref<string[]>([])
const isOpen = (id: string) => open.value.includes(id)
const onToggle = (id: string, event: Event) => {
  const now = (event.target as HTMLDetailsElement).open
  if (now && !isOpen(id)) open.value = [...open.value, id]
  if (!now && isOpen(id)) open.value = open.value.filter(o => o !== id)
}
const allOpen = computed(() => visible.value.length > 0 && visible.value.every(e => isOpen(e.id)))
const toggleAll = () => {
  open.value = allOpen.value ? [] : visible.value.map(e => e.id)
}

// Searching opens what's left, so the answers are right there
watch(query, (q) => {
  if (q.trim()) open.value = visible.value.map(e => e.id)
})

// Deep links: /faq#vehicles opens that question
onMounted(async () => {
  const id = route.hash.slice(1)
  if (!id || !entries.value.some(e => e.id === id)) return
  open.value = [id]
  await nextTick()
  document.getElementById(id)?.scrollIntoView({block: 'start'})
})

const copied = ref<string | null>(null)
let copiedTimer: ReturnType<typeof setTimeout> | undefined
const copyLink = async (id: string) => {
  const url = `${location.origin}${location.pathname}#${id}`
  history.replaceState(null, '', `#${id}`)
  try {
    await navigator.clipboard.writeText(url)
    copied.value = id
    clearTimeout(copiedTimer)
    copiedTimer = setTimeout(() => copied.value = null, 2000)
  } catch {
    // No clipboard access: the address bar now holds the link instead
  }
}
onBeforeUnmount(() => clearTimeout(copiedTimer))
</script>

<template>
  <main class="mx-auto w-full max-w-3xl px-4 py-16 lg:py-24">
    <h1 class="text-balance font-pixel text-4xl font-semibold leading-tight text-ink sm:text-5xl">{{ t('faq.title') }}</h1>
    <p class="mt-4 max-w-[60ch] text-lg leading-relaxed text-ink/80">{{ t('faq.lead') }}</p>

    <!-- Search and topics sit in one console window, like the game's toolbar -->
    <pixel-window as="div" class="mt-10">
      <label for="faq-search" class="font-pixel text-sm text-muted">{{ t('faq.search') }}</label>
      <input
          id="faq-search"
          v-model="query"
          type="search"
          autocomplete="off"
          :placeholder="t('faq.searchPlaceholder')"
          class="bevel-in mt-2 block min-h-11 w-full bg-[var(--bevel-lo)] px-3 py-2 font-pixel text-ink placeholder:text-muted/70 focus-visible:outline-offset-0"
      >
      <div class="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div class="flex flex-wrap gap-2" role="group" :aria-label="t('faq.filter')">
          <button
              v-for="category in ['all', ...categories]"
              :key="category"
              type="button"
              class="flex min-h-11 items-center gap-2 px-3 font-pixel text-sm transition-colors"
              :class="filter === category ? 'bevel-in bg-[var(--bevel-lo)] text-amber-hi' : 'bevel bg-night-3 text-ink hover:bg-[var(--bevel-hi)]'"
              :aria-pressed="filter === category"
              @click="filter = category as Category | 'all'"
          >
            {{ t(`faq.categories.${category}`) }}
            <span class="text-xs text-muted">{{ countFor(category as Category | 'all') }}</span>
          </button>
        </div>
        <button
            type="button"
            class="min-h-11 px-1 font-pixel text-sm text-amber hover:text-amber-hi disabled:opacity-40"
            :disabled="!visible.length"
            @click="toggleAll"
        >
          {{ allOpen ? t('faq.closeAll') : t('faq.openAll') }}
        </button>
      </div>
    </pixel-window>

    <p class="sr-only" aria-live="polite">{{ t('faq.count', visible.length) }}</p>

    <div v-if="visible.length" class="mt-10 flex flex-col gap-10">
      <section v-for="group in groups" :key="group.category ?? 'results'" :aria-labelledby="group.category ? `topic-${group.category}` : undefined">
        <h2 v-if="group.category" :id="`topic-${group.category}`" class="mb-4 font-pixel text-xl font-semibold text-ink">
          {{ t(`faq.categories.${group.category}`) }}
        </h2>
        <div class="flex flex-col gap-3">
          <details
              v-for="entry in group.items"
              :id="entry.id"
              :key="entry.id"
              :open="isOpen(entry.id)"
              class="bevel group scroll-mt-24 bg-night-2 p-[2px]"
              @toggle="onToggle(entry.id, $event)"
          >
            <summary class="flex min-h-14 list-none items-center justify-between gap-6 px-5 py-4 font-pixel text-lg text-ink hover:bg-night-3 group-open:bg-brand [&::-webkit-details-marker]:hidden">
              <span>{{ entry.question }}</span>
              <span class="shrink-0 text-amber group-open:text-ink" aria-hidden="true">
                <span class="group-open:hidden">+</span>
                <span class="hidden group-open:inline">&minus;</span>
              </span>
            </summary>
            <div class="faq-answer px-5 pb-5 pt-4">
              <div class="prose prose-night max-w-none prose-p:my-3 [&_p:first-child]:mt-0 [&_p:last-child]:mb-0">
                <ContentRendererMarkdown :value="entry.answer"/>
              </div>
              <button
                  type="button"
                  class="mt-2 inline-flex min-h-11 items-center font-pixel text-sm text-muted hover:text-amber-hi"
                  @click="copyLink(entry.id)"
              >
                <span aria-live="polite">{{ copied === entry.id ? t('faq.copied') : t('faq.copyLink') }}</span>
              </button>
            </div>
          </details>
        </div>
      </section>
    </div>

    <div v-else class="mt-10 border-2 border-dashed border-[var(--bevel-hi)] px-5 py-8 text-center">
      <p class="font-pixel text-lg text-ink">{{ t('faq.empty') }}</p>
      <p class="mt-2 text-ink/75">{{ t('faq.emptyHint') }}</p>
    </div>

    <pixel-window as="aside" :title="t('faq.more.title')" class="mt-14">
      <p class="leading-relaxed text-ink/80">{{ t('faq.more.body') }}</p>
      <div class="mt-5 flex flex-wrap gap-3">
        <pixel-button to="https://discord.gg/cdRq3bztJu" external variant="primary">
          {{ t('nav.discord') }} <span aria-hidden="true">&rarr;</span>
        </pixel-button>
        <pixel-button to="https://forum.leitstelle.io" external>Forum</pixel-button>
      </div>
    </pixel-window>
  </main>
</template>
