<script setup lang="ts">
defineProps<{ size: 'lg' | 'sm' }>()
</script>

<template>
  <article :class="['card', `card--${size}`]">
    <div class="head">
      <slot name="head" />
    </div>
    <div class="body">
      <slot />
    </div>
    <slot name="footer" />
  </article>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--color-bg-secondary);
  border-radius: 12px;
  padding: 8px 12px 12px;
  text-align: center;
  aspect-ratio: 1/1.4;
}

.card--lg {
  padding-bottom: 16px;
  background-size: 100%;
  background-image: url(/img/bg-tg-pattern.png);
  background-position: center;
  background-blend-mode: overlay;
}

.head {
  margin-bottom: 4px;
  display: flex;
  align-self: stretch;
  color: var(--color-label-secondary);
}

.card--lg .head {
  margin-bottom: 8px;
}

.body:not(:last-child) {
  margin-bottom: 8px;
}

.card--lg .body:not(:last-child) {
  margin-bottom: 12px;
}
</style>
