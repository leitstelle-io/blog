<script setup lang="ts">
// The development state as the game's call list: what's in, what's being worked on, what's next.
// No dates, only order. `wide` lays the four stages out two by two (the status page).
defineProps<{
  wide?: boolean
}>()

const {t, tm, rt} = useI18n()
const localePath = useLocalePath()

const stages = [
  {key: 'done', color: '#2e9e44'},
  {key: 'doing', color: '#f08a24'},
  {key: 'next', color: '#e6c229'},
  {key: 'later', color: 'var(--muted)'},
] as const

const items = (stage: string) => (tm(`spec.items.${stage}`) as unknown[]).map(item => rt(item as any))

const {target, live} = useLive()
</script>

<template>
  <div ref="target" :data-live="live">
    <pixel-window as="div" flush fill class="h-full">
      <template #title>
        <span>{{ t('spec.window') }}</span>
        <span class="hidden items-center gap-2 font-normal text-ink/80 sm:flex">
          <span class="status-lamp" aria-hidden="true"></span>{{ t('spec.status') }}
        </span>
      </template>
      <!-- Wide: what's in runs down the left beside what's in progress and next; later closes underneath -->
      <div class="grid flex-1 gap-2 p-2" :class="wide ? 'sm:grid-cols-2' : ''">
        <!-- On phones the status sits under the title bar, so neither wraps into two cramped lines -->
        <p class="flex items-center gap-2 px-2 pb-1 pt-1 font-pixel text-sm text-ink/80 sm:hidden">
          <span class="status-lamp" aria-hidden="true"></span>{{ t('spec.status') }}
        </p>
        <section v-for="stage in stages" :key="stage.key" class="bevel bg-night-3 p-4" :class="wide ? ['lg:p-6', {done: 'sm:row-span-2 flex flex-col [&>a]:mt-auto [&>a]:pt-5', later: 'sm:col-span-2'}[stage.key as string]] : ''" :aria-labelledby="`stage-${stage.key}`">
          <h3 :id="`stage-${stage.key}`" class="flex items-center gap-3 font-pixel font-semibold text-ink" :class="wide ? 'text-lg' : ''">
            <span class="h-3 w-3 shrink-0" :style="{backgroundColor: stage.color}" aria-hidden="true"></span>
            {{ t(`spec.${stage.key}`) }}
            <!-- System face for the count: Pixelify's 5 reads as an S -->
            <span class="ml-auto font-sans text-xs font-normal tabular-nums text-muted" :aria-label="t('spec.count', {n: items(stage.key).length})">{{ items(stage.key).length }}</span>
          </h3>
          <ul class="mt-3 grid gap-1.5 pl-6 leading-relaxed" :class="[stage.key === 'later' ? 'text-ink/65' : 'text-ink/85', wide ? (stage.key === 'later' ? 'sm:grid-cols-3 sm:gap-x-8' : '') : 'text-sm']">
            <li v-for="item in items(stage.key)" :key="item" class="relative">
              <span
                  class="absolute -left-6 top-[0.5em] h-2 w-2"
                  :class="stage.key === 'done' ? 'bg-[#2e9e44]' : stage.key === 'doing' ? 'doing-mark bg-[#f08a24]' : 'border border-[var(--bevel-hi)]'"
                  aria-hidden="true"
              ></span>
              {{ item }}
            </li>
          </ul>
          <nuxt-link
              v-if="stage.key === 'done' && wide"
              :to="localePath('/blog/2026/10/full-circle')"
              class="mt-5 inline-flex min-h-11 items-center pl-6 font-pixel text-sm text-amber hover:text-amber-hi"
          >
            {{ t('spec.story') }}&nbsp;<span aria-hidden="true">&rarr;</span>
          </nuxt-link>
        </section>
      </div>
    </pixel-window>
  </div>
</template>

<style scoped>
/* The one item in progress blinks like a busy unit, in whole steps */
.doing-mark {
  animation: doing 1.4s steps(1, end) infinite;
}

@keyframes doing {
  0%, 60% { opacity: 1; }
  61%, 100% { opacity: 0.25; }
}

[data-live="false"] .doing-mark {
  animation-play-state: paused;
}

@media (prefers-reduced-motion: reduce) {
  .doing-mark {
    animation: none;
  }
}
</style>
