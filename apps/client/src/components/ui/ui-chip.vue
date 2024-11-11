<script setup lang="ts">
defineProps<{
  filled?: boolean
  sm?: boolean
}>()
</script>

<template>
  <div class="chip" :class="{ 'chip--filled': filled, 'chip--sm': sm }">
    <slot />
  </div>
</template>

<style scoped>
.chip {
  position: relative;
  display: inline-block;
  padding: 0px 8px;
  border-radius: 50px;
  color: var(--color-primary);
  overflow: hidden;
  font-size: 14px;
  line-height: 22px;
  font-weight: 500;
}

.chip--sm {
  padding: 0px 6px;
  font-size: 11px;
  line-height: 14px;
  font-weight: 500;
  border-radius: 6px;
}

.chip--filled {
  border: 2px solid var(--color-white);
  color: var(--color-white);
}

.chip--filled.chip--sm {
  border: none;
}

.chip::after {
  position: absolute;
  content: '';
  inset: 0;
  background-color: var(--color-primary);
  opacity: 0.12;
  z-index: -1;
  border-radius: 50px;
}

.chip--filled::after {
  background-color: var(--color-label-secondary);
  opacity: 1;
}
</style>
