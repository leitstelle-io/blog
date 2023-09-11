<template>
  <NuxtLink v-bind="$attrs" :class="linkClasses">
    <span class="absolute inset-0 -z-10 scale-75 rounded-lg bg-white/5 opacity-0 transition group-hover:scale-100 group-hover:opacity-100"></span>
    <slot name="icon" v-bind:class="iconClasses"/>
    <span class="self-baseline text-white">
      <slot name="label"/>
    </span>
  </NuxtLink>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  children: null,
  className: String,
  compact: Boolean,
  large: Boolean,
  icon: Function
});

const linkClasses = computed(() =>
  `${props.className} group relative isolate flex items-center rounded-lg px-2 py-0.5 text-[0.8125rem]/6 font-medium text-white/30 transition-colors ${
    props.compact ? 'gap-x-2' : 'gap-x-3'
  } hover:text-sky-300`
);

const iconClasses = computed(() => `flex-none ${props.large ? 'h-6 w-6' : 'h-4 w-4'}`);
</script>
