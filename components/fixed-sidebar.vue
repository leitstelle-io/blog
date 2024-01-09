<script setup>
import Glow from './glow.vue';
</script>

<template>
  <div
    class="relative flex-none overflow-hidden px-6 lg:pointer-events-none lg:fixed lg:inset-0 lg:z-40 lg:flex lg:px-0"
  >
    <glow/>
    <div
      class="relative flex w-full lg:pointer-events-auto lg:mr-[calc(max(2rem,50%-38rem)+40rem)] lg:min-w-[32rem] lg:overflow-y-auto lg:overflow-x-hidden lg:pl-[max(4rem,calc(50%-38rem))]"
    >
      <div class="mx-auto max-w-lg lg:mx-0 lg:flex lg:w-96 lg:max-w-none lg:flex-col lg:before:flex-1 lg:before:pt-6">
        <div class="pb-16 pt-20 sm:pb-20 sm:pt-32 lg:py-20">
          <div class="relative">
            <!--            <StarField class="-right-44 top-14" />-->
            <slot></slot>
          </div>
        </div>
        <div class="flex flex-1 items-end justify-center pb-4 lg:justify-start lg:pb-6">
          <p class="flex items-baseline gap-x-2 text-[0.8125rem]/6 text-gray-500">
            <a
              href="https://wellerli.com"
              class="group cursor-pointer relative isolate flex items-center rounded-lg px-2 py-0.5 text-[0.8125rem]/6 font-medium dark:text-white/30 text-black/30 transition-colors hover:text-sky-300"
            >
              <span
                class="absolute inset-0 -z-10 scale-75 rounded-lg dark:bg-white/5 bg-black/5 opacity-0 transition group-hover:scale-100 group-hover:opacity-100"
              ></span>
              made by&nbsp;<span class="self-baseline dark:text-white text-black">wellerli</span>
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
