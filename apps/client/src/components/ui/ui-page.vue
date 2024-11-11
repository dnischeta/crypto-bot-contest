<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

const props = defineProps<{
  mobile?: boolean
  isMainButtonVisible?: boolean
  scrollTop?: number
}>()

defineExpose({ getScrollTop })

const scrollEl = ref<HTMLElement>()

onMounted(() => {
  watch(
    () => props.scrollTop,
    top => {
      if (top) {
        scrollEl.value?.scrollTo({ top })
      }
    },
    { immediate: true, flush: 'post' },
  )
})

function getScrollTop() {
  return scrollEl.value?.scrollTop
}
</script>

<template>
  <div
    class="page"
    :class="{ 'page--offset-bottom': mobile && !isMainButtonVisible }"
  >
    <main ref="scrollEl" class="page-content">
      <slot />
    </main>
    <aside id="footer" class="page-footer"></aside>
  </div>
</template>

<style scoped>
.page {
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: none;
  display: flex;
  flex-direction: column;
}

.page-content {
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
}

.page-footer {
  background-color: var(--color-bg-tab-bar);
}

.page--offset-bottom .page-footer {
  padding-bottom: 34px;
}
</style>
