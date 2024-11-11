<script setup lang="ts">
import type { Icon } from './consts'
import UiIcon from './ui-icon.vue'

defineProps<{
  rows: Array<{ title: string; icon?: Icon; value: string }>
}>()
</script>

<template>
  <table class="table">
    <tbody>
      <tr v-for="row in rows" :key="row.title" class="row">
        <th class="cell title" scope="row">{{ row.title }}</th>
        <td class="cell">
          <UiIcon v-if="row.icon" :name="row.icon" filled />
          {{ row.value }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.table {
  background-color: var(--color-bg);
  border-radius: 12px;
  border-spacing: 0;
  border-collapse: collapse;
}

.row:not(:first-of-type) {
  border-top: 0.33px solid var(--color-separator);
}

.title {
  color: var(--color-label-secondary);
  border-right: 0.33px solid var(--color-separator);
}

.cell {
  padding: 10px 16px;
  text-align: left;
  font-size: 17px;
  line-height: 22px;
  font-weight: 400;
}

.cell * {
  vertical-align: middle;
}
</style>
