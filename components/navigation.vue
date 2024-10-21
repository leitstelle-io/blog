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
  <div class="flex flex-col md:flex-row items-center justify-between p-4">
    <nuxt-link class="text-black hover:text-yellow-400 flex space-x-2" :to="localePath('/')">
      <img src="/leitstelle.io.logo.png" alt="Das leitstelle.io Logo" class="w-10 h-full">
      <div class="flex items-center gap-3"><span class="text-xl font-bold">leitstelle.io</span></div>
    </nuxt-link>
    <nav class="space-x-10">
      <nuxt-link class="text-black hover:text-yellow-400" to="https://forum.leitstelle.io" external>Forum</nuxt-link>
      <nuxt-link class="text-black hover:text-yellow-400" :to="localePath('/blog')">Blog</nuxt-link>
      <nuxt-link class="text-black hover:text-yellow-400" :to="localePath('/faq')">FAQ</nuxt-link>
      <nuxt-link class="text-black hover:text-yellow-400" external to="https://discord.gg/cdRq3bztJu">Discord</nuxt-link>
    </nav>
    <div class="relative inline-block text-left">
      <div>
        <button @click="open = !open" type="button" class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true">
          <IconsLanguage/>
        </button>
      </div>
      <div v-if="open" ref="target" class="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
        <div class="py-1" role="none">
          <template v-for="locale in availableLocales" :key="locale.code">
            <button
                class="text-gray-700 block px-4 py-2 text-sm hover:text-yellow-400 w-full text-left"
                @click="changeLocale(locale.code)"
            >
              {{locale.name}}
            </button>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
