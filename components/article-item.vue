<script setup lang="ts">
const props = defineProps<{
  id: string;
  date: string;
}>();
</script>

<template>
  <article :id="props.id" class="scroll-mt-16" :date="props.date">
    <article-header :id="props.id" :date="props.date" />
    <content-wrapper class="prose prose-slate dark:prose-invert">
      <slot/>
    </content-wrapper>
  </article>
</template>
