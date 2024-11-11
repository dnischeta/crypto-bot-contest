<script setup lang="ts">
import UiIcon from './ui-icon.vue'
</script>

<template>
  <button class="close-button">
    <UiIcon class="close-button-icon" name="close" />
  </button>
</template>

<style scoped>
.close-button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  background-color: #e3e3e8;
}

.close-button-icon {
  width: 24px;
  height: 24px;
}
</style>
