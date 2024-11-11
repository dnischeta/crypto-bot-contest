<script setup lang="ts">
import { ROUTES } from '@/router'
</script>

<template>
  <div class="no-results">
    <img class="no-results-img" src="/img/logo.png" />
    <slot> {{ $t('gift.no-gifts') }} </slot>
    <RouterLink class="store-link" :to="{ name: ROUTES.store }">{{
      $t('button.open-store')
    }}</RouterLink>
  </div>
</template>

<style scoped>
.no-results {
  margin: 8px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 12px;
  background-color: var(--color-bg-secondary);
  padding: 32px 16px;
  gap: 16px;
}

.no-results-img {
  width: 100px;
  height: 100px;
}

.store-link {
  color: var(--color-primary);
}
</style>
