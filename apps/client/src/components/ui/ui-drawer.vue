<script setup lang="ts">
import { onUnmounted, watch } from 'vue'
import { useMainButton } from '@/composables/use-main-button'
import UiCloseButton from './ui-close-button.vue'

const props = defineProps<{
  mainButtonText: string
  visible?: boolean
}>()

const emit = defineEmits<{ close: []; 'click:main-button': [] }>()

const mainButton = useMainButton()

watch(
  () => props.visible,
  visible => {
    if (visible) {
      mainButton.showButton({
        text: props.mainButtonText,
        cb: () => {
          emit('click:main-button')
        },
      })
    } else {
      setTimeout(() => {
        mainButton.hideButton()
      }, 250)
    }
  },
)

onUnmounted(() => {
  mainButton.hideButton()
})
</script>

<template>
  <Transition name="v-fade">
    <div v-show="visible" class="overlay" @click="$emit('close')" />
  </Transition>
  <Transition name="v-drawer">
    <div v-if="visible" class="drawer">
      <UiCloseButton class="close-button" @click="$emit('close')" />
      <slot />
    </div>
  </Transition>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  opacity: 0.5;
  background-color: black;
  z-index: 1;
}

.drawer {
  position: fixed;
  z-index: 2;
  bottom: 0;
  right: 0;
  left: 0;
  padding: 16px;
  background-color: var(--color-bg-secondary);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;

  display: flex;
  flex-direction: column;
  text-align: center;
}

.close-button {
  position: absolute;
  top: 12px;
  right: 16px;
}

/* Transitions */
:global(.v-fade-enter-active),
:global(.v-fade-leave-active) {
  transition: opacity 0.25s ease-out;
}

:global(.v-fade-enter-from),
:global(.v-fade-leave-to) {
  opacity: 0 !important;
}

:global(.v-fade-enter-to),
:global(.v-fade-leave-from) {
  opacity: 0.5 !important;
}

:global(.v-drawer-enter-active),
:global(.v-drawer-leave-active) {
  transition: transform 0.25s ease-out;
}

:global(.v-drawer-enter-from),
:global(.v-drawer-leave-to) {
  transform: translateY(100%);
}
</style>
