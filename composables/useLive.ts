import { useDocumentVisibility } from '@vueuse/core'

// Decorative loops only run while their section is on screen and the tab is visible.
// Bind `target` as the section's ref and `live` to its data-live attribute.
export const useLive = () => {
  const target = ref<HTMLElement | null>(null)
  const onScreen = ref(true)
  const visibility = useDocumentVisibility()

  let observer: IntersectionObserver | undefined
  onMounted(() => {
    if (!target.value || typeof IntersectionObserver === 'undefined') return
    observer = new IntersectionObserver((entries) => {
      // Several entries can arrive at once; the newest one is the current state
      const entry = entries[entries.length - 1]
      if (entry) onScreen.value = entry.isIntersecting
    })
    observer.observe(target.value)
  })
  onBeforeUnmount(() => observer?.disconnect())

  const live = computed(() => onScreen.value && visibility.value !== 'hidden')
  return {target, live}
}
