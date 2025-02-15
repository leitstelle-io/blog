<template>
  <div class="flex items-center gap-x-6 bg-amber-400 px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
    <p class="text-sm/6 text-black">
      <NuxtLink :to="$t('banner.link')" class="hover:underline">
        <strong class="font-semibold">• {{ $t('banner.info') }} • </strong> {{ $t('banner.text') }}&nbsp;<span aria-hidden="true">&rarr;</span>

      </NuxtLink>
    </p>
    <div class="flex flex-1 justify-end">
      <button type="button" class="-m-3 p-3 focus-visible:outline-offset-[-4px]">
        <span class="sr-only">Dismiss</span>
        <svg class="size-5 text-black" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
          <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
        </svg>
      </button>
    </div>
  </div>
</template>
