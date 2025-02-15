<script setup lang="ts">
const {locales, locale} = useI18n()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()
const open = ref(false)

import { onClickOutside } from '@vueuse/core'
const target = ref(null)
onClickOutside(target, event => open.value = !open.value)

const availableLocales = computed(() => {
  return (locales.value).filter(i => i.code !== locale.value)
})


const router = useRouter()
const changeLocale = (localeCode: string) => {
  open.value = !open.value
  router.push(switchLocalePath(localeCode))
}
</script>

<template>
  <project-state/>
  <navigation/>
  <slot/>
  <!--<sticky-footer/>-->
  <footer class="">
    <div class="mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-8">
      <nav class="-mb-6 flex flex-wrap justify-center gap-x-12 gap-y-3 text-sm/6" aria-label="Footer">
        <nuxt-link :to="localePath('/blog')" class="text-gray-600 hover:text-gray-900">Blog</nuxt-link>
        <nuxt-link :to="localePath('/faq')" class="text-gray-600 hover:text-gray-900">FAQ</nuxt-link>
        <nuxt-link to="https://discord.gg/cdRq3bztJu" external class="text-gray-600 hover:text-gray-900">Discord</nuxt-link>
        <nuxt-link to="https://forum.leitstelle.io" external class="text-gray-600 hover:text-gray-900">Forum</nuxt-link>
        <template v-for="locale in availableLocales" :key="locale.code">
          <button
              class="text-gray-600 hover:text-gray-900"
              @click="changeLocale(locale.code)"
          >
            {{locale.name}}
          </button>
        </template>
      </nav>
      <p class="mt-10 text-center text-sm/6 text-gray-600 hover:underline hover:text-gray-900"><NuxtLink to="https://wellerli.com">ein Projekt von <textmark size="4">wellerli</textmark></NuxtLink> &hearts;</p>
    </div>
  </footer>
</template>