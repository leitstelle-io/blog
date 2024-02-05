<script setup lang="ts">
const {setLocale} = useI18n()
const localePath = useLocalePath()
const open = ref(false)

import { onClickOutside } from '@vueuse/core'
const target = ref(null)
onClickOutside(target, event => open.value = !open.value)

const changeLocale = (locale) => {
  setLocale(locale)
  open.value = !open.value
}
</script>

<template>
  <div class="flex flex-col md:flex-row items-center justify-between p-4">
    <nuxt-link class="text-black hover:text-yellow-400" to="/">
      <div class="flex items-center gap-3"><span class="text-xl font-bold">leitstelle.io</span></div>
    </nuxt-link>
    <nav class="space-x-10">
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
          <button @click="changeLocale('de')" class="text-gray-700 block px-4 py-2 text-sm hover:text-yellow-400 w-full text-left">Deutsch</button>
          <button @click="changeLocale('en')" class="text-gray-700 block px-4 py-2 text-sm hover:text-yellow-400 w-full text-left">English</button>
        </div>
      </div>
    </div>
  </div>
</template>
