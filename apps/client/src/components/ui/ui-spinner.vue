<script setup lang="ts">
import UiLottie from './ui-lottie.vue'

withDefaults(defineProps<{ size?: 'sm' | 'md' | 'lg' }>(), { size: 'md' })
</script>

<template>
  <UiLottie :class="[`spinner--size-${size}`]" name="spinner" loop />
</template>

<style scoped>
.spinner--size-sm {
  width: 16px;
  height: 16px;
}

.spinner--size-md {
  width: 32px;
  height: 32px;
}

.spinner--size-lg {
  width: 100px;
  height: 100px;
}
</style>
