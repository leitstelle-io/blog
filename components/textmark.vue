<script setup>
const props = defineProps({
  size: String
})

const size = computed(() => `after:p-${props.size ?? 4}`)
</script>

<template>
  <span class="relative group">
    <span class="absolute bg-yellow-300 w-[105%] h-full -z-10 -ml-1 rotate-1 group-hover:rotate-3 transition-all ease-in duration-75 rounded"></span>
    <span

    >
      <slot/>
    </span>

  </span>
</template>