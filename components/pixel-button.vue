<script setup lang="ts">
const props = defineProps<{
  to: string
  variant?: 'primary' | 'secondary'
  external?: boolean
}>()

const classes = computed(() => props.variant === 'primary'
    ? 'bg-amber text-night [--bevel-hi:var(--amber-hi)] [--bevel-lo:var(--amber-lo)] hover:bg-amber-hi'
    : 'bg-night-3 text-ink hover:bg-[var(--bevel-hi)]')
</script>

<template>
  <nuxt-link
      :to="to"
      :external="external"
      :target="external ? '_blank' : undefined"
      :rel="external ? 'noopener' : undefined"
      class="bevel inline-flex min-h-11 items-center gap-2 px-4 py-2 font-pixel font-semibold leading-none transition-colors"
      :class="classes"
  >
    <slot/>
    <span v-if="external" class="sr-only">{{ ' ' + $t('nav.newTab') }}</span>
  </nuxt-link>
</template>

<style scoped>
/* Pressed key: the bevel flips and the label dips a pixel */
a:active {
  box-shadow:
    inset 2px 2px 0 var(--bevel-lo),
    inset -2px -2px 0 var(--bevel-hi);
  padding-top: calc(0.5rem + 1px);
  padding-bottom: calc(0.5rem - 1px);
}
</style>
