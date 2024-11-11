<template>
  <Transition name="fade">
    <div v-if="show" class="error-notification">
      <div class="error-content">
        <span class="error-icon">⚠️</span>
        <span class="error-message">{{ message }}</span>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  message: string
  duration?: number
}>()

const show = ref(true)

if (props.duration !== 0) {
  setTimeout(() => {
    show.value = false
  }, props.duration || 3000)
}
</script>

<style scoped>
.error-notification {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--tg-theme-bg-color);
  border: 1px solid var(--tg-theme-hint-color);
  padding: 12px 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1000;
}

.error-content {
  display: flex;
  align-items: center;
  gap: 8px;
}

.error-message {
  color: var(--tg-theme-text-color);
  font-size: 14px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
