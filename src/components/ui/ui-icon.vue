<script setup lang="ts">
import type { Icon } from './consts'

withDefaults(defineProps<{ name: Icon; size?: 'sm' }>(), { size: 'sm' })

const icons: Record<Icon, string> = {
  eth: './img/icon-eth.png',
  ton: './img/icon-ton.png',
  usdt: './img/icon-usdt.png',
}
</script>

<template>
  <img :class="['icon', `icon--${size}`]" :src="icons[name]" />
</template>

<style scoped>
.icon--sm {
  width: 24px;
  height: 24px;
}
</style>
