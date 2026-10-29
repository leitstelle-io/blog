<script setup lang="ts">
import { useEventListener, usePreferredReducedMotion, useResizeObserver } from '@vueuse/core'

// The game's own vehicle models (engine8 assets/models), drawn the way the game draws them:
// toon shading, a fixed 40° camera that turns in 30° steps, chunky pixels and hard shadows.
// The beacons are the models' own beacon parts, flashing in two groups like real light bars.
const props = defineProps<{
  src: string
  label: string
  beacons: boolean
  live: boolean
}>()

const emit = defineEmits<{ toggleBeacons: [] }>()

const {t} = useI18n()
const reducedMotion = usePreferredReducedMotion()

const wrap = ref<HTMLElement | null>(null)
const canvas = ref<HTMLCanvasElement | null>(null)
const state = ref<'loading' | 'ready' | 'error'>('loading')

const STEP = Math.PI / 6
// The game snaps its camera to 15° + n·30°; start on a three-quarter front view
const snap = (angle: number) => Math.round((angle - STEP / 2) / STEP) * STEP + STEP / 2
let targetYaw = snap(-Math.PI / 4)
let yaw = targetYaw

let three: typeof import('three') | undefined
let renderer: import('three').WebGLRenderer | undefined
let scene: import('three').Scene | undefined
let camera: import('three').PerspectiveCamera | undefined
let pivot: import('three').Group | undefined
let beaconGroups: {meshes: import('three').Mesh[], glows: import('three').Sprite[], delay: number}[] = []
let frame = 0
let dirty = true
let loadToken = 0

// Double flash, then dark: the same 1.4s pattern as the scene lights on the hero
const flashOn = (time: number) => {
  const t01 = (time % 1400) / 1400
  return t01 < 0.07 || (t01 >= 0.14 && t01 < 0.21)
}

// Half resolution: chunky like the game, but fine parts (shutter grooves, ladder rungs) still read
const pixelSize = () => 2

// The game's camera: 40° down, close to isometric, far enough back that the vehicle fits
// whichever way it's turned, in whichever field of view is narrower
let radius = 4
let lookY = 1
const frameCamera = () => {
  if (!three || !camera) return
  const vertical = three.MathUtils.degToRad(camera.fov / 2)
  const horizontal = Math.atan(Math.tan(vertical) * camera.aspect)
  // Room around the vehicle, so it stands in the scene rather than filling the frame
  const distance = radius / Math.sin(Math.min(vertical, horizontal)) * 1.35
  const tilt = three.MathUtils.degToRad(40)
  camera.position.set(0, lookY + Math.sin(tilt) * distance, Math.cos(tilt) * distance)
  camera.lookAt(0, lookY, 0)
}

const resize = () => {
  if (!renderer || !camera || !wrap.value) return
  const {clientWidth: w, clientHeight: h} = wrap.value
  const px = pixelSize()
  renderer.setSize(Math.max(1, Math.round(w / px)), Math.max(1, Math.round(h / px)), false)
  camera.aspect = w / Math.max(1, h)
  camera.updateProjectionMatrix()
  frameCamera()
  dirty = true
}

const setup = async () => {
  three = await import('three')
  const THREE = three
  renderer = new THREE.WebGLRenderer({canvas: canvas.value!, antialias: false, alpha: true})
  renderer.setPixelRatio(1)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.BasicShadowMap
  renderer.outputColorSpace = THREE.SRGBColorSpace

  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(24, 1, 0.1, 200)

  // Blue hour: cool sky, a warm low sun from the front left
  scene.add(new THREE.HemisphereLight(0xa9b8ff, 0x1b1a3a, 1.4))
  const sun = new THREE.DirectionalLight(0xffd9a8, 2.6)
  sun.position.set(6, 10, 7)
  sun.castShadow = true
  sun.shadow.mapSize.set(1024, 1024)
  Object.assign(sun.shadow.camera, {left: -7, right: 7, top: 7, bottom: -7, near: 1, far: 40})
  // Double-sided faces shadow themselves without an offset along the normal (dark stripes)
  sun.shadow.bias = -0.0004
  sun.shadow.normalBias = 0.04
  scene.add(sun)

  const ground = new THREE.Mesh(
      new THREE.CircleGeometry(9, 48),
      new THREE.MeshToonMaterial({color: 0x34335a, gradientMap: gradient()}),
  )
  ground.rotation.x = -Math.PI / 2
  ground.receiveShadow = true
  scene.add(ground)

  pivot = new THREE.Group()
  scene.add(pivot)

  resize()
  loop()
}

// The game's own light bands (engine8 looks::Bands::HARD), nearest-filtered so the steps stay hard
let gradientMap: import('three').DataTexture | undefined
const gradient = () => {
  if (gradientMap) return gradientMap
  const THREE = three!
  gradientMap = new THREE.DataTexture(new Uint8Array([105, 105, 165, 165, 215, 215, 255, 255]), 8, 1, THREE.RedFormat)
  gradientMap.minFilter = gradientMap.magFilter = THREE.NearestFilter
  gradientMap.needsUpdate = true
  return gradientMap
}

// A soft round glow in a few hard rings, so it stays pixel art once the canvas is scaled up
let glowMap: import('three').CanvasTexture | undefined
const glowTexture = () => {
  if (glowMap) return glowMap
  const size = 32
  const c = document.createElement('canvas')
  c.width = c.height = size
  const ctx = c.getContext('2d')!
  for (const [r, a] of [[16, 0.06], [11, 0.14], [7, 0.4], [4, 0.95]] as const) {
    ctx.fillStyle = `rgba(255,255,255,${a})`
    ctx.beginPath()
    ctx.arc(size / 2, size / 2, r, 0, Math.PI * 2)
    ctx.fill()
  }
  glowMap = new three!.CanvasTexture(c)
  glowMap.minFilter = glowMap.magFilter = three!.NearestFilter
  return glowMap
}

const isBeacon = (mesh: import('three').Mesh) => {
  let node: import('three').Object3D | null = mesh
  while (node) {
    if (/beacon/i.test(node.name)) return true
    node = node.parent
  }
  const name = (Array.isArray(mesh.material) ? mesh.material[0] : mesh.material)?.name ?? ''
  return /BlueDome|BlueLens/i.test(name)
}

const disposeModel = () => {
  if (!pivot) return
  pivot.traverse((obj: any) => {
    obj.geometry?.dispose?.()
    const mats = Array.isArray(obj.material) ? obj.material : obj.material ? [obj.material] : []
    mats.forEach((m: any) => m.dispose?.())
  })
  pivot.clear()
  beaconGroups.forEach(g => g.glows.forEach(glow => glow.material.dispose()))
  beaconGroups = []
}

const load = async (src: string) => {
  if (!three || !pivot || !camera) return
  const THREE = three
  const token = ++loadToken
  state.value = 'loading'
  try {
    const {GLTFLoader} = await import('three/examples/jsm/loaders/GLTFLoader.js')
    const gltf = await new GLTFLoader().loadAsync(src)
    if (token !== loadToken) return
    disposeModel()

    const model = gltf.scene
    const lamps: import('three').Mesh[] = []
    model.traverse((obj: any) => {
      if (!obj.isMesh) return
      const source = obj.material
      if (isBeacon(obj)) {
        obj.material = new THREE.MeshBasicMaterial({color: 0x10206a})
        lamps.push(obj)
        return
      }
      // Keep what the model asks for: all its materials are double-sided (single faces like the
      // TSF's rear shutter vanish otherwise), and glass and smoke are blended
      obj.material = new THREE.MeshToonMaterial({
        color: source.color ?? new THREE.Color(0xffffff),
        emissive: source.emissive ?? new THREE.Color(0x000000),
        emissiveIntensity: source.emissiveIntensity ?? 1,
        side: source.side,
        transparent: source.transparent,
        opacity: source.opacity ?? 1,
        depthWrite: source.depthWrite,
        alphaTest: source.alphaTest,
        gradientMap: gradient(),
      })
      obj.castShadow = !source.transparent
      obj.receiveShadow = true
      source.dispose?.()
    })

    // Stand it on the ground, centred
    const box = new THREE.Box3().setFromObject(model)
    const centre = box.getCenter(new THREE.Vector3())
    model.position.set(-centre.x, -box.min.y, -centre.z)
    const size = box.getSize(new THREE.Vector3())
    radius = size.length() / 2
    lookY = size.y * 0.38

    // Two groups across the vehicle's width, each with a blue light that falls on the cab.
    // Measured before the model joins the turned pivot, so left and right are the vehicle's own.
    model.updateMatrixWorld(true)
    const at = (m: import('three').Mesh) => m.getWorldPosition(new THREE.Vector3())
    const sides = [lamps.filter(l => at(l).z >= 0), lamps.filter(l => at(l).z < 0)].filter(side => side.length)
    // The beacon domes themselves get a glow; LED strips and lenses only light up
    const named = (m: import('three').Mesh) => {
      for (let node: import('three').Object3D | null = m; node; node = node.parent) if (/beacon/i.test(node.name)) return node
      return null
    }
    const domes = sides.map(side => [...new Set(side.map(named).filter(Boolean))] as import('three').Object3D[])
      .map(nodes => nodes.map(node => {
        const box = new THREE.Box3().setFromObject(node)
        return box.getCenter(new THREE.Vector3()).setY(box.max.y)
      }))
    pivot.add(model)

    // A glow sprite per dome instead of real lights: lights would cost every part of the model
    // per pixel, and the game targets integrated graphics
    beaconGroups = sides.map((meshes, i) => {
      const glows = domes[i].map(position => {
        const glow = new THREE.Sprite(new THREE.SpriteMaterial({
          map: glowTexture(), color: 0x3f6dff, transparent: true, opacity: 0,
          blending: THREE.AdditiveBlending, depthWrite: false,
        }))
        glow.position.copy(position).add(new THREE.Vector3(0, 0.1, 0))
        glow.scale.setScalar(radius * 0.3)
        pivot!.add(glow)
        return glow
      })
      return {meshes, glows, delay: i * 700}
    })

    frameCamera()

    state.value = 'ready'
    dirty = true
  } catch {
    if (token === loadToken) state.value = 'error'
  }
}

const loop = () => {
  frame = requestAnimationFrame(loop)
  if (!renderer || !scene || !camera || !pivot) return
  // Off screen nothing moves or flashes, but a pending frame (a model that just loaded) is still drawn
  if (!props.live) {
    if (dirty) {
      renderer.render(scene, camera)
      dirty = false
    }
    return
  }

  const step = reducedMotion.value === 'reduce' ? 1 : 0.18
  if (Math.abs(targetYaw - yaw) > 0.0005) {
    yaw += (targetYaw - yaw) * step
    dirty = true
  } else {
    yaw = targetYaw
  }
  pivot.rotation.y = yaw

  const now = performance.now()
  for (const group of beaconGroups) {
    const lit = props.beacons && (reducedMotion.value === 'reduce' || flashOn(now + group.delay))
    group.meshes.forEach(m => (m.material as import('three').MeshBasicMaterial).color.setHex(lit ? 0x9fb8ff : props.beacons ? 0x1c35a8 : 0x10206a))
    group.glows.forEach(glow => glow.material.opacity = lit ? 1 : 0)
  }
  if (props.beacons) dirty = true

  if (dirty) {
    renderer.render(scene, camera)
    dirty = false
  }
}

const turn = (steps: number) => {
  targetYaw = snap(targetYaw) + steps * STEP
  dirty = true
}

// Drag to turn; on release it settles on the game's 30° grid
let dragging: {x: number, yaw: number} | null = null
const onPointerDown = (event: PointerEvent) => {
  dragging = {x: event.clientX, yaw: targetYaw}
  ;(event.currentTarget as HTMLElement).setPointerCapture(event.pointerId)
}
const onPointerMove = (event: PointerEvent) => {
  if (!dragging) return
  targetYaw = dragging.yaw + (event.clientX - dragging.x) * 0.012
  yaw = targetYaw
  dirty = true
}
const onPointerUp = () => {
  if (!dragging) return
  dragging = null
  targetYaw = snap(targetYaw)
}

// Q and E turn the vehicle, L toggles its blue lights, as in the game. Handled before anything else
// on the page, so L here doesn't also switch the hero's blue lights.
useEventListener(window, 'keydown', (event: KeyboardEvent) => {
  if (!props.live || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return
  if ((event.target as HTMLElement).closest?.('input, textarea, select, [contenteditable], dialog')) return
  const key = event.key.toLowerCase()
  if (key === 'q') turn(-1)
  else if (key === 'e') turn(1)
  else if (key === 'l') emit('toggleBeacons')
  else return
  event.stopImmediatePropagation()
}, {capture: true})

useResizeObserver(wrap, resize)
watch(() => props.src, src => load(src))
watch(() => [props.beacons, props.live], () => dirty = true)

onMounted(async () => {
  try {
    await setup()
    await load(props.src)
  } catch {
    state.value = 'error'
  }
})

onBeforeUnmount(() => {
  cancelAnimationFrame(frame)
  disposeModel()
  gradientMap?.dispose()
  glowMap?.dispose()
  renderer?.dispose()
})
</script>

<template>
  <div ref="wrap" class="relative h-full w-full touch-pan-y select-none overflow-hidden" data-cursor="scene">
    <canvas
        ref="canvas"
        class="pixelated block h-full w-full"
        role="img"
        :aria-label="label"
        @pointerdown="onPointerDown"
        @pointermove="onPointerMove"
        @pointerup="onPointerUp"
        @pointercancel="onPointerUp"
    ></canvas>

    <p v-if="state !== 'ready'" class="absolute inset-0 flex items-center justify-center font-pixel text-sm text-muted">
      {{ state === 'error' ? t('fleet.viewerError') : t('fleet.loading') }}
    </p>

    <!-- The game's keys: Q and E turn by 30°, L switches the blue lights -->
    <div class="absolute bottom-3 left-3 flex gap-2 font-pixel text-sm">
      <button type="button" class="bevel flex min-h-11 items-center gap-2 bg-night-3/90 px-3 text-ink hover:bg-[var(--bevel-hi)]" @click="turn(-1)">
        <kbd class="bevel-in bg-[var(--bevel-lo)] px-1.5 text-xs leading-5 text-muted">Q</kbd>
        <span class="sr-only sm:not-sr-only">{{ t('fleet.turnLeft') }}</span>
      </button>
      <button type="button" class="bevel flex min-h-11 items-center gap-2 bg-night-3/90 px-3 text-ink hover:bg-[var(--bevel-hi)]" @click="turn(1)">
        <kbd class="bevel-in bg-[var(--bevel-lo)] px-1.5 text-xs leading-5 text-muted">E</kbd>
        <span class="sr-only sm:not-sr-only">{{ t('fleet.turnRight') }}</span>
      </button>
      <button
          type="button"
          class="flex min-h-11 items-center gap-2 px-3 hover:bg-[var(--bevel-hi)]"
          :class="beacons ? 'bevel-in bg-[var(--bevel-lo)] text-beacon-soft' : 'bevel bg-night-3/90 text-ink'"
          :aria-pressed="beacons"
          @click="emit('toggleBeacons')"
      >
        <kbd class="bevel-in bg-[var(--bevel-lo)] px-1.5 text-xs leading-5 text-muted">L</kbd>
        {{ t('fleet.lights') }}
      </button>
    </div>
  </div>
</template>
