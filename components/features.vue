<script setup>
import MapIcon from "~/components/icons/map.vue";
import HumansIcon from "~/components/icons/humans.vue";
import ControllerIcon from "~/components/icons/controller.vue";
import SparklesIcon from "~/components/icons/sparkles.vue";
const features = [
  {
    icon: MapIcon,
    translationKey: 'map',
  },
  {
    icon: HumansIcon,
    translationKey: 'multiplayer',
  },
  {
    icon: ControllerIcon,
    translationKey: 'realism',
  },
  {
    icon: SparklesIcon,
    translationKey: 'variety',
  }
]
</script>

<template>
  <div class="prose prose-xl text-black flex flex-col font-medium leading-normal">
    <ul class="grid gap-x-3.5 gap-y-4 p-0 lg:-mx-32 lg:grid-cols-2">
      <template v-for="feature in features">
        <li class="not-prose bg-[#f5f5f5] m-0 flex flex-col rounded-2xl p-8">
          <div class="-ml-1.5 mb-3 self-start">
            <component :is="feature.icon"/>
          </div>
          <div class="flex flex-col gap-2"><p class="font-bold">{{ $t(`features.${feature.translationKey}.title`) }}</p>
            <p class="text-secondary">
              {{ $t(`features.${feature.translationKey}.description`) }}
            </p>
          </div>
        </li>
      </template>
    </ul>
  </div>
</template>