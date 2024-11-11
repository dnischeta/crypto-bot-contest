<script setup lang="ts">
import type { Icon } from './consts'
import UiIcon from './ui-icon.vue'

defineProps<{
  title: string
  caption?: string
  iconName?: Icon
  buttonText?: string
}>()

defineEmits<{
  'button-click': []
}>()
</script>

<template>
  <div class="notification">
    <UiIcon v-if="iconName" :name="iconName" />
    <div class="text">
      <span class="title">{{ title }}</span>
      <span v-if="caption" class="n-caption">{{ caption }}</span>
    </div>
    <button v-if="buttonText" class="button" @click="$emit('button-click')">
      {{ buttonText }}
    </button>
  </div>
</template>

<style scoped>
.notification {
  background-color: var(--color-bg-notification);
  display: flex;
  align-items: center;
  border-radius: 14px;
  padding: 12px 16px;
  height: 50px;
  color: var(--color-white);
  gap: 12px;
}

.text {
  display: flex;
  flex-direction: column;
}

.title {
  font-size: 14px;
  line-height: 18px;
  font-weight: 590;
  letter-spacing: 0;
}

.n-caption {
  font-size: 14px;
  line-height: 18px;
  font-weight: 400;
  letter-spacing: 0;
}

.button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: var(--color-accent-cyan);
  font-size: 17px;
  line-height: 22px;
  letter-spacing: 0;
  font-weight: 400;
  margin-left: auto;
}
</style>
