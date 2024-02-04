<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  date: String | Date;
}>();

const formattedDate = ref(
  new Intl.DateTimeFormat('de-DE', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC'
  }).format(new Date(props.date))
);
</script>


<template>
  <time :datetime="formattedDate" class="xl:pointer-events-auto text-sm font-medium text-black">
    {{ formattedDate }}
  </time>
</template>
