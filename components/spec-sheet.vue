<script setup lang="ts">
const {t} = useI18n()

// The organisations as units on the dispatch board, in FMS colours: the fire brigade is in
// service (2, green), the others aren't on duty yet (6, out of service)
const orgs = [
  {key: 'fire', code: 2, color: '#2e9e44'},
  {key: 'ems', code: 6, color: 'var(--bevel-lo)'},
  {key: 'police', code: 6, color: 'var(--bevel-lo)'},
  {key: 'thw', code: 6, color: 'var(--bevel-lo)'},
]
</script>

<template>
  <section class="mx-auto w-full max-w-6xl px-4 lg:px-8" aria-labelledby="spec-title">
    <h2 id="spec-title" class="max-w-3xl text-balance font-pixel text-3xl font-semibold leading-tight text-ink sm:text-5xl">{{ t('spec.title') }}</h2>
    <p class="mt-5 max-w-[60ch] text-lg leading-relaxed text-ink/80">{{ t('spec.lead') }}</p>

    <div class="mt-12 grid items-start gap-4 lg:mt-16 lg:grid-cols-12">
      <!-- What it is: three plates of hard facts and the organisations as units on the board -->
      <div class="grid content-start gap-4 lg:col-span-5">
        <pixel-window as="div" :title="t('spec.platform')">
          <ul class="flex flex-wrap gap-2 font-pixel">
            <li v-for="os in ['macOS', 'Windows', 'Linux']" :key="os" class="bevel-in bg-[var(--bevel-lo)] px-3 py-2 text-amber-hi">{{ os }}</li>
          </ul>
          <p class="mt-4 font-pixel text-xs text-muted">{{ t('spec.modes') }}</p>
          <ul class="mt-2 flex flex-wrap gap-2 font-pixel text-sm">
            <li v-for="mode in t('spec.modeList').split(' · ')" :key="mode" class="bevel bg-night-3 px-3 py-1.5 text-ink">{{ mode }}</li>
          </ul>
        </pixel-window>

        <pixel-window as="div" :title="t('spec.map')">
          <div class="flex items-center gap-4 font-pixel">
            <span class="h-3 w-3 shrink-0 bg-[#2e9e44] shadow-[inset_1px_1px_0_rgb(var(--ink-rgb)/0.45),inset_-1px_-1px_0_rgb(8_8_26/0.55)]" aria-hidden="true"></span>
            <span class="text-ink">{{ t('spec.mapNow') }}</span>
          </div>
          <!-- A dotted route out of the county, the way the game draws a drive -->
          <div class="my-2 ml-[5px] h-6 border-l-2 border-dashed border-[var(--bevel-hi)]" aria-hidden="true"></div>
          <div class="flex items-center gap-4 font-pixel">
            <span class="h-3 w-3 shrink-0 bg-[var(--bevel-lo)] shadow-[inset_1px_1px_0_var(--bevel-hi)]" aria-hidden="true"></span>
            <span class="text-muted">{{ t('spec.mapNext') }}</span>
          </div>
        </pixel-window>

        <pixel-window as="div" :title="t('spec.orgs')">
          <ul class="flex flex-col gap-2 font-pixel">
            <li v-for="org in orgs" :key="org.key" class="flex items-center gap-3 px-1" :class="org.code === 2 ? 'text-ink' : 'text-muted'">
              <span
                  class="flex h-7 w-7 shrink-0 items-center justify-center text-sm font-semibold shadow-[inset_1px_1px_0_rgb(var(--ink-rgb)/0.35),inset_-1px_-1px_0_rgb(8_8_26/0.6)]"
                  :class="org.code === 2 ? 'text-ink' : 'text-muted'"
                  :style="{backgroundColor: org.color}"
                  aria-hidden="true"
              >{{ org.code }}</span>
              <span class="flex-1">{{ t(`spec.orgList.${org.key}.name`) }}</span>
              <span class="text-xs">{{ t(`spec.orgList.${org.key}.state`) }}</span>
            </li>
          </ul>
        </pixel-window>
      </div>

      <!-- Where it stands: the development state as the game's call list -->
      <dev-board class="lg:col-span-7"/>
    </div>
  </section>
</template>
