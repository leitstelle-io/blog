<script setup lang="ts">
const {locales, locale} = useI18n()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()

const availableLocales = computed(() => locales.value.filter(i => i.code !== locale.value))

const externalLinks = [
  {label: 'Discord', to: 'https://discord.gg/cdRq3bztJu'},
  {label: 'Forum', to: 'https://forum.leitstelle.io'},
]
</script>

<template>
  <footer class="border-t-2 border-[var(--bevel-hi)] bg-[var(--bevel-lo)]">
    <div class="relative mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 lg:px-8">
      <summi class="absolute -top-14 right-4 lg:-top-[5.5rem] lg:right-8"/>
      <div class="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between sm:pr-[196px] lg:pr-64">
        <nuxt-link :to="localePath('/')" class="self-start sm:self-auto">
          <brand/>
        </nuxt-link>
        <nav class="flex flex-wrap gap-x-8 gap-y-3 font-pixel text-muted [@media(pointer:coarse)]:gap-y-0" :aria-label="$t('footer.label')">
          <nuxt-link :to="localePath('/blog')" class="inline-flex items-center hover:text-ink [@media(pointer:coarse)]:min-h-11">Devlog</nuxt-link>
          <nuxt-link :to="localePath('/faq')" class="inline-flex items-center hover:text-ink [@media(pointer:coarse)]:min-h-11">FAQ</nuxt-link>
          <nuxt-link
              v-for="link in externalLinks"
              :key="link.to"
              :to="link.to"
              external
              target="_blank"
              rel="noopener"
              class="inline-flex items-center hover:text-ink [@media(pointer:coarse)]:min-h-11"
          >
            {{ link.label }}<span class="sr-only">{{ ' ' + $t('nav.newTab') }}</span>
          </nuxt-link>
          <nuxt-link
              v-for="other in availableLocales"
              :key="other.code"
              :to="switchLocalePath(other.code)"
              :lang="other.code"
              class="inline-flex items-center text-amber hover:text-amber-hi [@media(pointer:coarse)]:min-h-11"
          >
            {{ other.name }}
          </nuxt-link>
        </nav>
      </div>
      <div class="flex flex-col gap-2 text-xs leading-relaxed text-muted sm:flex-row sm:justify-between sm:gap-8">
        <p>{{ $t('footer.attribution') }}</p>
        <p class="shrink-0">
          {{ $t('footer.by') }}
          <nuxt-link to="https://wellerli.com" external target="_blank" rel="noopener" class="font-pixel text-ink hover:text-amber">wellerli<span class="sr-only">{{ ' ' + $t('nav.newTab') }}</span></nuxt-link>
          <span class="text-alarm"> &hearts;</span>
        </p>
      </div>
    </div>
  </footer>
</template>
