<script setup lang="ts">
const head = useLocaleHead({addSeoAttributes: true})

useHead(() => ({
  titleTemplate: (title?: string) => title && title !== 'Leitstelle' ? `${title} · Leitstelle` : 'Leitstelle',
  htmlAttrs: {
    lang: head.value.htmlAttrs?.lang,
  },
  link: head.value.link ?? [],
  meta: head.value.meta ?? [],
}))
</script>

<template>
  <div class="flex min-h-screen flex-col bg-night text-ink">
    <a
        href="#main"
        class="bevel sr-only bg-amber font-pixel font-semibold text-night [--bevel-hi:var(--amber-hi)] [--bevel-lo:var(--amber-lo)] focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-50 focus:px-4 focus:py-3"
    >
      {{ $t('nav.skip') }}
    </a>
    <navigation/>
    <div id="main" class="flex-1 focus:outline-none" tabindex="-1">
      <slot/>
    </div>
    <site-footer/>
  </div>
</template>
