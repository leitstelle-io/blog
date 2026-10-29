<script setup lang="ts">
import { onClickOutside, onKeyStroke } from '@vueuse/core'

const {t, locales, locale} = useI18n()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()
const route = useRoute()

const open = ref(false)
const panel = ref<HTMLElement | null>(null)
const toggle = ref<HTMLButtonElement | null>(null)
onClickOutside(panel, () => open.value = false, {ignore: [toggle]})
watch(() => route.fullPath, () => open.value = false)

onKeyStroke('Escape', () => {
  if (!open.value) return
  open.value = false
  toggle.value?.focus()
})

watch(open, async (isOpen) => {
  if (!isOpen) return
  await nextTick()
  panel.value?.querySelector<HTMLElement>('a')?.focus()
})

const availableLocales = computed(() => locales.value.filter(i => i.code !== locale.value))

// Start only counts as the current page on the homepage itself; the others stay lit on their sub-pages.
// Worked out from the path, because the post pages aren't nested under /blog in the router.
const trim = (path: string) => path.replace(/\/+$/, '') || '/'
const isActive = (link: {to: string, exact?: boolean, external?: boolean}) => {
  if (link.external) return false
  const here = trim(route.path)
  const to = trim(link.to)
  return link.exact ? here === to : here === to || here.startsWith(`${to}/`)
}

const links = computed(() => [
  {label: t('nav.home'), to: localePath('/'), exact: true},
  {label: 'Devlog', to: localePath('/blog')},
  {label: 'FAQ', to: localePath('/faq')},
  {label: t('nav.status'), to: localePath('/play')},
  {label: 'Forum', to: 'https://forum.leitstelle.io', external: true},
])
</script>

<template>
  <header class="relative z-20 border-b-2 border-[var(--bevel-lo)] bg-night shadow-[0_2px_0_var(--bevel-hi)]">
    <nav class="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 lg:gap-6 lg:px-8" :aria-label="$t('nav.label')">
      <nuxt-link :to="localePath('/')" class="shrink-0">
        <brand/>
      </nuxt-link>

      <div class="hidden items-center gap-8 font-pixel lg:flex">
        <nuxt-link
            v-for="link in links"
            :key="link.to"
            :to="link.to"
            :external="link.external"
            :target="link.external ? '_blank' : undefined"
            :rel="link.external ? 'noopener' : undefined"
            class="relative text-muted transition-colors before:pointer-events-none before:absolute before:-left-3.5 before:top-1/2 before:-mt-1 before:border-y-4 before:border-l-[6px] before:border-y-transparent before:border-l-amber before:opacity-0 before:transition-opacity before:duration-100 before:content-[''] hover:text-ink hover:before:opacity-100 focus-visible:before:opacity-100"
            :class="isActive(link) ? '!text-amber before:!opacity-100' : undefined"
            :aria-current="isActive(link) ? 'page' : undefined"
            active-class=""
            exact-active-class=""
        >
          {{ link.label }}<span v-if="link.external" class="sr-only">{{ ' ' + $t('nav.newTab') }}</span>
        </nuxt-link>
      </div>

      <div class="hidden lg:block">
        <pixel-button to="https://discord.gg/cdRq3bztJu" external variant="primary">
          {{ $t('nav.discord') }} <span aria-hidden="true">&rarr;</span>
        </pixel-button>
      </div>

      <div class="flex shrink-0 items-center gap-2 lg:hidden">
        <pixel-button to="https://discord.gg/cdRq3bztJu" external variant="primary">
          {{ $t('nav.discordShort') }}
        </pixel-button>
        <button
            ref="toggle"
            type="button"
            class="bevel flex h-11 w-11 items-center justify-center bg-night-3 text-ink"
            :aria-expanded="open"
            aria-controls="mobile-menu"
            @click="open = !open"
        >
          <span class="sr-only">{{ open ? $t('nav.close') : $t('nav.open') }}</span>
          <svg class="pixelated h-5 w-5" viewBox="0 0 10 10" shape-rendering="crispEdges" aria-hidden="true">
            <template v-if="!open">
              <rect x="1" y="2" width="8" height="1" fill="currentColor"/>
              <rect x="1" y="5" width="8" height="1" fill="currentColor"/>
              <rect x="1" y="8" width="8" height="1" fill="currentColor"/>
            </template>
            <template v-else>
              <rect x="2" y="2" width="1" height="1" fill="currentColor"/>
              <rect x="3" y="3" width="1" height="1" fill="currentColor"/>
              <rect x="4" y="4" width="2" height="2" fill="currentColor"/>
              <rect x="6" y="6" width="1" height="1" fill="currentColor"/>
              <rect x="7" y="7" width="1" height="1" fill="currentColor"/>
              <rect x="7" y="2" width="1" height="1" fill="currentColor"/>
              <rect x="6" y="3" width="1" height="1" fill="currentColor"/>
              <rect x="3" y="6" width="1" height="1" fill="currentColor"/>
              <rect x="2" y="7" width="1" height="1" fill="currentColor"/>
            </template>
          </svg>
        </button>
      </div>
    </nav>

    <div v-if="open" id="mobile-menu" ref="panel" class="absolute inset-x-4 top-full mt-2 lg:hidden">
      <pixel-window :title="$t('nav.menu')" class="window-open">
        <div class="flex flex-col gap-1 font-pixel text-lg">
          <nuxt-link
              v-for="link in links"
              :key="link.to"
              :to="link.to"
              :external="link.external"
              :target="link.external ? '_blank' : undefined"
              :rel="link.external ? 'noopener' : undefined"
              class="flex min-h-11 items-center px-2 text-ink hover:bg-night-3"
              :class="isActive(link) ? '!text-amber' : undefined"
              :aria-current="isActive(link) ? 'page' : undefined"
              active-class=""
              exact-active-class=""
          >
            {{ link.label }}<span v-if="link.external" class="sr-only">{{ ' ' + $t('nav.newTab') }}</span>
          </nuxt-link>
          <nuxt-link
              v-for="other in availableLocales"
              :key="other.code"
              :to="switchLocalePath(other.code)"
              :lang="other.code"
              class="mt-2 flex min-h-11 items-center border-t-2 border-[var(--bevel-lo)] px-2 text-amber hover:bg-night-3 hover:text-amber-hi"
          >
            {{ other.name }}
          </nuxt-link>
        </div>
      </pixel-window>
    </div>
  </header>
</template>
