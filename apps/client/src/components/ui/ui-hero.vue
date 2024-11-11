<script setup lang="ts">
import type { Icon } from './consts'
import UiIcon from './ui-icon.vue'

defineProps<{
  title: string
  caption?: string
  icon?: Icon
}>()
</script>

<template>
  <div class="hero">
    <UiIcon v-if="icon" class="hero-icon" :name="icon" size="auto" />
    <h1>{{ title }}</h1>
    <span v-if="caption" class="hero-caption caption">{{ caption }}</span>
  </div>
</template>

<style scoped>
.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 0 16px;
}

.hero-icon {
  margin-bottom: 16px;
}

.hero-caption {
  margin-top: 8px;
  text-align: center;
}
</style>
