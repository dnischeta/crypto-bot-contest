<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { RouterLinkProps } from 'vue-router'
import type { Icon } from './consts'
import UiIcon from './ui-icon.vue'

defineProps<{
  icon?: Icon
  to?: RouterLinkProps['to']
  variant?: 'text'
  fullWidth?: boolean
  disabled?: boolean
}>()
</script>

<template>
  <component
    :is="to ? RouterLink : 'button'"
    :class="{
      button: true,
      'button--icon': icon,
      [`button--${variant}`]: variant,
      'button--full-width': fullWidth,
      'button--disabled': disabled,
    }"
    :disabled="disabled"
    :to
  >
    <UiIcon v-if="icon" :name="icon" />
    <slot />
  </component>
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
  text-decoration: none;
  cursor: pointer;
}

.button--full-width {
  width: 100%;
  height: 50px;
  border-radius: 12px;
  font-size: 17px;
  line-height: 22px;
  justify-content: center;
}

.button--text {
  background-color: transparent;
  color: var(--color-accent-blue);
}

.button:visited {
  color: var(--color-white);
  text-decoration: none;
}

.button--text:visited {
  color: var(--color-accent-blue);
}

.button--icon {
  padding: 0 16px 0 12px;
}

.button.button--disabled {
  cursor: default;
  background-color: var(--color-bg-tab-bar);
  color: var(--color-label-tab-bar);
}

.button--text.button--disabled {
  background-color: transparent;
}
</style>
