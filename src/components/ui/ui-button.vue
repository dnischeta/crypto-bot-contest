<script setup lang="ts">
import type { Icon } from './consts'
import UiIcon from './ui-icon.vue'

defineProps<{ icon?: Icon }>()
</script>

<template>
  <button :class="{ button: true, ['button--icon']: icon }">
    <UiIcon v-if="icon" :name="icon" />
    <slot />
  </button>
</template>

<style scoped>
.button {
  display: inline-flex;
  align-items: center;
  font-family: inherit;
  height: 30px;
  background-color: var(--color-accent-blue);
  color: var(--color-white);
  font-weight: 600;
  letter-spacing: 0;
  font-size: 13px;
  line-height: 18px;
  border: none;
  border-radius: 15px;
  padding: 0 25px;
}

.button--icon {
  padding: 0 16px 0 12px;
}
</style>
