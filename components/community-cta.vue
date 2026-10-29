<script setup lang="ts">
// The game's call list: each way to join is an open call with its own Alarm key.
// Pressing it opens the channel in a new tab and the call reports back "Status 3 · Anfahrt", as a vehicle would.
const calls = [
  {key: 'discord', name: 'Discord', to: 'https://discord.gg/cdRq3bztJu', primary: true},
  {key: 'forum', name: 'Forum', to: 'https://forum.leitstelle.io', primary: false},
]
const responding = reactive<Record<string, boolean>>({})
</script>

<template>
  <pixel-window as="section" flush fill aria-labelledby="community-title">
      <template #title>
        <span>{{ $t('community.window') }}</span>
        <span class="font-normal text-ink/80">{{ $t('community.open', {n: calls.filter(c => !responding[c.key]).length}) }}</span>
      </template>

      <div class="p-5 lg:p-6">
        <h3 id="community-title" class="text-balance font-pixel text-2xl font-semibold leading-snug text-ink">
          {{ $t('community.title') }}
        </h3>
        <p class="mt-3 max-w-[52ch] leading-relaxed text-ink/80">{{ $t('community.body') }}</p>
      </div>

      <ul class="mt-auto flex flex-col gap-2 px-2 pb-2">
        <li
            v-for="call in calls"
            :key="call.key"
            class="bevel flex flex-col gap-4 p-4 transition-colors sm:flex-row sm:items-center lg:flex-col lg:items-stretch xl:flex-row xl:items-center"
            :class="responding[call.key] ? 'bg-[rgb(240_138_36/0.12)]' : 'bg-night-3'"
        >
          <div class="min-w-0 flex-1">
            <p class="font-pixel">
              <span class="font-semibold" :class="call.primary ? 'text-beacon-soft' : 'text-amber-hi'">{{ $t(`community.${call.key}.label`) }}</span>
              <span class="ml-2 font-semibold text-ink">{{ call.name }}</span>
            </p>
            <p class="mt-1 text-sm leading-relaxed text-ink/75">{{ $t(`community.${call.key}.detail`) }}</p>
            <p class="mt-2 flex items-center gap-2 font-pixel text-xs" aria-live="polite">
              <template v-if="responding[call.key]">
                <span class="h-2.5 w-2.5 bg-[#f08a24]" aria-hidden="true"></span>
                <span class="text-ink">{{ $t('community.respondingNote') }}</span>
              </template>
              <template v-else>
                <span class="h-2.5 w-2.5 bg-[#2e9e44]" aria-hidden="true"></span>
                <span class="text-muted">{{ $t(`community.${call.key}.state`) }}</span>
              </template>
            </p>
          </div>
          <pixel-button
              :to="call.to"
              external
              :variant="call.primary ? 'primary' : 'secondary'"
              class="shrink-0 self-start sm:self-center lg:self-start xl:self-center"
              @click="responding[call.key] = true"
          >
            {{ responding[call.key] ? $t('community.responding') : $t('community.alarm') }}
            <span class="sr-only">: {{ call.name }}</span>
            <span aria-hidden="true">&rarr;</span>
          </pixel-button>
        </li>
      </ul>
  </pixel-window>
</template>
