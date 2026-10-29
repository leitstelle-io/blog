<template>
  <!-- One section, two windows of the same height: the latest devlog post and the open calls to join -->
  <section class="mx-auto w-full max-w-6xl px-4 lg:px-8" aria-labelledby="follow-title">
    <h2 id="follow-title" class="max-w-3xl text-balance font-pixel text-3xl font-semibold leading-tight text-ink sm:text-5xl">{{ $t('follow.title') }}</h2>
    <p class="mt-5 max-w-[60ch] text-lg leading-relaxed text-ink/80">{{ $t('follow.lead') }}</p>
    <div class="mt-12 grid gap-4 lg:mt-16 lg:grid-cols-12">
      <blog-list class="lg:col-span-7"/>
      <community-cta class="lg:col-span-5"/>
    </div>
  </section>
</template>
