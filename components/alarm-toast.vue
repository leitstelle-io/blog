<script setup lang="ts">
// The in-game alarm toast in miniature: press "Alarm" and the units are alerted, as at the dispatch desk
const emit = defineEmits<{ alert: [] }>()

const alerted = ref(false)
const alert = () => {
  alerted.value = true
  emit('alert')
}
</script>

<template>
  <div class="flex flex-col gap-2" aria-live="polite">
    <div class="toast-in border-2 border-[var(--bevel-lo)] bg-ink px-3 py-2 text-night">
      <div class="flex items-center justify-between gap-3">
        <p class="font-pixel text-sm leading-snug">
          <!-- One line: Vue drops whitespace between elements that sits on its own line -->
          <span class="font-semibold text-alarm">{{ $t('alarm.label') }}</span> <span class="font-semibold">{{ $t('alarm.keyword') }}</span> <span class="text-night/70">· {{ $t('alarm.place') }}</span>
        </p>
        <button
            v-if="!alerted"
            type="button"
            class="bevel inline-flex min-h-11 shrink-0 items-center bg-alarm px-3 font-pixel text-sm font-semibold text-ink transition-colors [--bevel-hi:#e86a6a] [--bevel-lo:var(--brand-lo)] hover:bg-[#d8383c] active:translate-y-px active:[box-shadow:inset_2px_2px_0_var(--bevel-lo),inset_-2px_-2px_0_var(--bevel-hi)]"
            @click="alert"
        >
          {{ $t('alarm.action') }}
        </button>
      </div>
      <p class="mt-1 text-xs leading-snug text-night/70">{{ $t('alarm.hint') }}</p>
    </div>

    <div v-if="alerted" class="toast-sent border-2 border-[var(--bevel-lo)] bg-ink/90 px-3 py-2 text-night">
      <p class="font-pixel text-sm leading-snug">
        <span class="font-semibold">{{ $t('alarm.sent') }}</span> {{ $t('alarm.units') }}
      </p>
      <p class="mt-1 text-xs leading-snug text-night/70">{{ $t('alarm.tip') }}</p>
    </div>
  </div>
</template>

<style scoped>
/* Drops in like the game's toast, then the border flashes alarm red twice */
.toast-in {
  animation:
      toast-drop 500ms cubic-bezier(0.16, 1, 0.3, 1) 700ms both,
      toast-flash 600ms steps(2, jump-none) 1200ms 2;
}

.toast-sent {
  animation: toast-drop 300ms cubic-bezier(0.16, 1, 0.3, 1) both;
}

@keyframes toast-drop {
  from {
    opacity: 0;
    transform: translateY(-12px);
  }
}

@keyframes toast-flash {
  from {
    border-color: var(--alarm);
  }
  to {
    border-color: var(--bevel-lo);
  }
}

@media (prefers-reduced-motion: reduce) {
  .toast-in {
    animation: toast-fade 300ms ease-out 700ms both;
  }

  .toast-sent {
    animation: toast-fade 200ms ease-out both;
  }

  @keyframes toast-fade {
    from {
      opacity: 0;
    }
  }
}
</style>
