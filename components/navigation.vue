<script setup lang="ts">
const open = ref(false)

import { onClickOutside } from '@vueuse/core'
const target = ref(null)
onClickOutside(target, event => open.value = !open.value)
</script>

<template>
  <header class="bg-white">
    <div class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
      <div class="flex lg:flex-1">
        <nuxt-link class="text-black hover:text-yellow-400 flex space-x-2" :to="localePath('/')">
          <img src="/leitstelle.io.logo.png" alt="Das leitstelle.io Logo" class="w-10 h-full">
          <div class="flex items-center gap-3"><span class="text-xl font-bold">leitstelle.io</span></div>
        </nuxt-link>
      </div>
      <div class="flex lg:hidden">
        <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700" @click="open = !open">
          <span class="sr-only">Open main menu</span>
          <svg class="w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>
      <div class="hidden lg:flex lg:gap-x-12">
        <nuxt-link class="text-black hover:text-yellow-400" :to="localePath('/blog')">Blog</nuxt-link>
        <nuxt-link class="text-black hover:text-yellow-400" :to="localePath('/faq')">FAQ</nuxt-link>
        <nuxt-link class="text-black hover:text-yellow-400" external to="https://discord.gg/cdRq3bztJu">Discord</nuxt-link>
        <nuxt-link class="text-black hover:text-yellow-400" to="https://forum.leitstelle.io" external>Forum</nuxt-link>
      </div>
      <div class="hidden lg:flex lg:flex-1 lg:justify-end">
        <nuxt-link :to="localePath('/play')" class="text-sm/6 font-semibold text-gray-900">Zum Spiel <span aria-hidden="true">&rarr;</span></nuxt-link>
      </div>
    </div>

    <!-- Mobile menu, show/hide based on menu open state. -->
    <div class="lg:hidden" role="dialog" aria-modal="true" v-if="open">
      <!-- Background backdrop, show/hide based on slide-over state. -->
      <div class="fixed inset-0 z-10"></div>
      <div class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <project-state/>
        <div class="flex items-center justify-between px-6 py-6">
          <nuxt-link class="-m-1.5 p-1.5 text-black hover:text-yellow-400 flex space-x-2" :to="localePath('/')">
            <img src="/leitstelle.io.logo.png" alt="Das leitstelle.io Logo" class="w-10 h-full">
            <div class="flex items-center gap-3"><span class="text-xl font-bold">leitstelle.io</span></div>
          </nuxt-link>
          <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700" @click="open = !open" ref="target">
            <span class="sr-only">Close menu</span>
            <svg class="w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="mt-6 flow-root px-6">
          <div class="-my-6 divide-y divide-gray-500/10">
            <div class="space-y-2 py-6">
              <nuxt-link class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50" :to="localePath('/blog')">Blog</nuxt-link>
              <nuxt-link class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50" :to="localePath('/faq')">FAQ</nuxt-link>
              <nuxt-link class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50" external to="https://discord.gg/cdRq3bztJu">Discord</nuxt-link>
              <nuxt-link class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50" to="https://forum.leitstelle.io" external>Forum</nuxt-link>
            </div>
            <div class="py-6">
              <nuxt-link :to="localePath('play')" class="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Zum Spiel</nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
