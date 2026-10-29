<script setup lang="ts">
const {t, locale} = useI18n()

// The four vehicles that already have their own model in the game, with the game's own data
// (engine8 assets/rules/vehicles.ron): model, tank size and the equipment they carry, in the HUD's order.
const vehicles = [
  {key: 'hlf', name: 'HLF 20', model: '/models/hlf.glb', tank: 1600, gear: ['hose', 'cutter', 'chainsaw', 'pump', 'supply', 'ladder', 'atemschutz', 'wbk', 'luefter']},
  {key: 'dlk', name: 'DLK 23-12', model: '/models/sk-dlk.glb', tank: 0, gear: ['hose', 'supply', 'wbk']},
  {key: 'lf8', name: 'LF 8', model: '/models/t2-lf8.glb', tank: 600, gear: ['hose', 'chainsaw', 'supply', 'ladder', 'atemschutz', 'wbk', 'luefter']},
  {key: 'tsf', name: 'TSF', model: '/models/t1-tsf.glb', tank: 0, gear: ['hose', 'cutter', 'chainsaw', 'pump', 'supply', 'ladder', 'atemschutz']},
]
const largestTank = Math.max(...vehicles.map(v => v.tank))

// The game's equipment hotkeys (assets/rules/equipment.ron)
const hotkeys: Record<string, string> = {
  hose: 'H', cutter: 'T', chainsaw: 'Z', pump: 'O', supply: 'V', ladder: 'R', atemschutz: 'X', wbk: 'Y', luefter: 'Ö',
}

// FMS status 1–4 with the standard BOS colours, as the game shows them (assets/rules/fms.ron)
const statuses = [
  {code: 1, color: '#2a5bff', ink: 'var(--ink)'},
  {code: 2, color: '#2e9e44', ink: 'var(--ink)'},
  {code: 3, color: '#f08a24', ink: 'var(--night)'},
  {code: 4, color: '#e6c229', ink: 'var(--night)'},
]
const statusOf = (code: number) => statuses.find(s => s.code === code)!

const selected = ref(0)
const current = computed(() => vehicles[selected.value])

// Every vehicle starts at the station with its lights off; status 3 or 4 puts the blue lights on,
// as on a real call, and L (or the key in the viewer) switches them by hand
const status = reactive<Record<string, number>>(Object.fromEntries(vehicles.map(v => [v.key, 2])))
const lights = reactive<Record<string, boolean>>(Object.fromEntries(vehicles.map(v => [v.key, false])))
const setStatus = (code: number) => {
  status[current.value.key] = code
  lights[current.value.key] = code >= 3
}

const cards: (HTMLButtonElement | null)[] = []
const select = (index: number, focus = false) => {
  selected.value = (index + vehicles.length) % vehicles.length
  if (focus) cards[selected.value]?.focus()
}
const onCardKeydown = (event: KeyboardEvent) => {
  const moves: Record<string, number> = {ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1}
  if (event.key in moves) select(selected.value + moves[event.key], true)
  else if (event.key === 'Home') select(0, true)
  else if (event.key === 'End') select(vehicles.length - 1, true)
  else return
  event.preventDefault()
}

const litres = (n: number) => t('fleet.litres', {n: n.toLocaleString(locale.value === 'de' ? 'de-DE' : 'en-GB')})

const {target, live} = useLive()
</script>

<template>
  <section ref="target" :data-live="live" class="mx-auto w-full max-w-6xl px-4 lg:px-8" aria-labelledby="fleet-title">
    <h2 id="fleet-title" class="max-w-3xl text-balance font-pixel text-3xl font-semibold leading-tight text-ink sm:text-5xl">{{ t('fleet.title') }}</h2>
    <p class="mt-5 max-w-[60ch] text-lg leading-relaxed text-ink/80">{{ t('fleet.lead') }}</p>

    <pixel-window as="div" flush :title="t('fleet.window')" class="mt-12 lg:mt-16">

      <div class="grid lg:grid-cols-12">
        <!-- The vehicles as keys, like the game's bottom bar; first on small screens, so you pick before you look -->
        <div
            role="tablist"
            :aria-label="t('fleet.vehicles')"
            class="order-1 col-span-full flex gap-2 overflow-x-auto border-b-2 border-[var(--bevel-lo)] p-2 [scrollbar-width:none] lg:order-3 lg:grid lg:grid-cols-4 lg:border-b-0 lg:border-t-2"
            @keydown="onCardKeydown"
        >
          <button
              v-for="(vehicle, index) in vehicles"
              :id="`vehicle-${vehicle.key}`"
              :key="vehicle.key"
              :ref="el => cards[index] = el as HTMLButtonElement | null"
              type="button"
              role="tab"
              :aria-selected="selected === index"
              aria-controls="vehicle-panel"
              :tabindex="selected === index ? 0 : -1"
              class="flex min-h-14 min-w-[10rem] shrink-0 flex-col justify-center gap-1 px-4 py-2 text-left font-pixel transition-colors"
              :class="selected === index ? 'bevel-in bg-[var(--bevel-lo)] outline outline-2 -outline-offset-2 outline-select' : 'bevel bg-night-3 hover:bg-[var(--bevel-hi)]'"
              @click="select(index)"
          >
            <span class="flex items-center justify-between gap-3 text-ink">
              {{ vehicle.name }}
              <span v-if="lights[vehicle.key]" class="status-lamp" aria-hidden="true"></span>
            </span>
            <span class="flex items-center gap-1.5 text-xs text-ink/80">
              <span class="h-2.5 w-2.5 shrink-0" :style="{backgroundColor: statusOf(status[vehicle.key]).color}" aria-hidden="true"></span>
              {{ status[vehicle.key] }} · {{ t(`fleet.status.${status[vehicle.key]}.short`) }}
            </span>
          </button>
        </div>

        <!-- The game's own model, turnable, with its real beacons -->
        <div class="order-2 aspect-[4/3] border-b-2 border-[var(--bevel-lo)] bg-[radial-gradient(ellipse_at_50%_35%,var(--night-3),var(--bevel-lo)_75%)] sm:aspect-[16/10] lg:order-1 lg:col-span-7 lg:aspect-auto lg:min-h-[32rem] lg:border-b-0 lg:border-r-2">
          <ClientOnly>
            <vehicle-viewer
                :src="current.model"
                :label="t('fleet.viewerLabel', {name: current.name})"
                :beacons="lights[current.key]"
                :live="live"
                @toggle-beacons="lights[current.key] = !lights[current.key]"
            />
          </ClientOnly>
        </div>

        <div
            id="vehicle-panel"
            role="tabpanel"
            :aria-labelledby="`vehicle-${current.key}`"
            class="order-3 p-5 lg:order-2 lg:col-span-5 lg:p-6"
        >
          <h3 class="font-pixel text-2xl font-semibold text-ink">{{ current.name }}</h3>
          <p class="mt-1 font-pixel text-sm text-muted">{{ t(`fleet.${current.key}.long`) }}</p>
          <p class="mt-3 leading-relaxed text-ink/85">{{ t(`fleet.${current.key}.role`) }}</p>

          <dl class="mt-5 grid grid-cols-2 gap-4 font-pixel text-sm">
            <div>
              <dt class="text-xs text-muted">{{ t('fleet.basis') }}</dt>
              <dd class="mt-1 text-ink">{{ t(`fleet.${current.key}.basis`) }}</dd>
            </div>
            <div>
              <dt class="text-xs text-muted">{{ t('fleet.tank') }}</dt>
              <dd class="mt-1 text-ink">
                {{ current.tank ? litres(current.tank) : t('fleet.noTank') }}
                <span class="mt-1.5 block h-2 w-full bg-[var(--bevel-lo)] shadow-[inset_1px_1px_0_var(--bevel-lo),inset_-1px_-1px_0_var(--bevel-hi)]" aria-hidden="true">
                  <span class="tank-fill block h-full bg-beacon-soft" :style="{width: `${(current.tank / largestTank) * 100}%`}"></span>
                </span>
              </dd>
            </div>
          </dl>

          <p class="mt-5 font-pixel text-xs text-muted">{{ t('fleet.equipment') }}</p>
          <ul class="mt-2 flex flex-wrap gap-2 font-pixel text-sm">
            <li v-for="item in current.gear" :key="item" class="bevel-in flex items-center gap-2 bg-[var(--bevel-lo)] px-2.5 py-1.5 text-amber-hi">
              <kbd class="bevel bg-night-3 px-1.5 font-pixel text-xs leading-5 text-ink" :aria-label="`${t('fleet.hotkey')} ${hotkeys[item]}`">{{ hotkeys[item] }}</kbd>
              {{ t(`fleet.gear.${item}`) }}
            </li>
          </ul>

          <!-- FMS: give the selected vehicle a status, as it would over the radio -->
          <div class="mt-6 border-t-2 border-[var(--bevel-lo)] pt-5">
            <p class="font-pixel text-ink">{{ t('fleet.fms') }}</p>
            <div class="mt-3 grid grid-cols-4 gap-2" role="group" :aria-label="`${t('fleet.fms')}: ${current.name}`">
              <button
                  v-for="s in statuses"
                  :key="s.code"
                  type="button"
                  class="fms-key flex min-h-12 items-center justify-center font-pixel text-xl font-semibold"
                  :class="status[current.key] === s.code ? 'bevel-in outline outline-2 outline-offset-2 outline-ink' : 'bevel'"
                  :style="{backgroundColor: s.color, color: s.ink, '--bevel-hi': 'rgb(var(--ink-rgb) / 0.45)', '--bevel-lo': 'rgb(8 8 26 / 0.55)'}"
                  :aria-pressed="status[current.key] === s.code"
                  :aria-label="`${s.code} – ${t(`fleet.status.${s.code}.name`)}`"
                  @click="setStatus(s.code)"
              >
                {{ s.code }}
              </button>
            </div>
            <p class="mt-3 flex items-center gap-3 font-pixel text-sm text-ink" aria-live="polite">
              <span class="h-3.5 w-3.5 shrink-0 shadow-[inset_1px_1px_0_rgb(var(--ink-rgb)/0.45),inset_-1px_-1px_0_rgb(8_8_26/0.55)]" :style="{backgroundColor: statusOf(status[current.key]).color}" aria-hidden="true"></span>
              <span><span class="font-semibold">{{ status[current.key] }}</span> · {{ t(`fleet.status.${status[current.key]}.name`) }}</span>
            </p>
            <p class="mt-2 text-sm leading-relaxed text-ink/70">{{ t('fleet.fmsHint') }}</p>
          </div>
        </div>
      </div>
    </pixel-window>
  </section>
</template>

<style scoped>
/* The tank gauge fills in steps when you switch vehicles, like the game's meters */
.tank-fill {
  transition: width 240ms steps(6, end);
}

.fms-key {
  transition: filter 120ms ease-out;
}

.fms-key:hover {
  filter: brightness(1.12);
}

@media (prefers-reduced-motion: reduce) {
  .tank-fill {
    transition: none;
  }
}
</style>
