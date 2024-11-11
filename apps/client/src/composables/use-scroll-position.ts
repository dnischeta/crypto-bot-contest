import type { Ref } from 'vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const savedPositions: Record<string, number> = {}

export function useScrollPosition(
  scrollEl: Ref<undefined | { getScrollTop: () => number | undefined }>,
) {
  const router = useRouter()
  const scrollTop = ref(0)

  router.beforeEach((to, from, next) => {
    const scrollTop = scrollEl.value?.getScrollTop()
    if (scrollTop) {
      savedPositions[from.path] = scrollTop
    }
    next()
  })

  router.afterEach(to => {
    scrollTop.value = savedPositions[to.path]
    if (scrollTop.value) {
      delete savedPositions[to.path]
    }
  })

  return { scrollTop }
}
