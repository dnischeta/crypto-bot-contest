<script setup lang="ts">
import { assetUrl } from '@/utils/asset-url'
import type { Icon } from './consts'

withDefaults(
  defineProps<{
    name: Icon
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'auto'
    filled?: boolean
    outlined?: boolean
  }>(),
  {
    size: 'lg',
  },
)

const icons: Record<Icon, { '1x': string; '2x'?: string }> = {
  ETH: { '1x': assetUrl('/img/icon-eth.png') },
  TON: { '1x': assetUrl('/img/icon-ton.png') },
  USDT: { '1x': assetUrl('/img/icon-usdt.png') },
  gift: {
    '1x': assetUrl('/img/icon-gift.png'),
    '2x': assetUrl('/img/icon-gift@2.png'),
  },
  'gift-blue-star': {
    '1x': assetUrl('/img/icon-gift-blue-star.png'),
  },
  'gift-green-star': {
    '1x': assetUrl('/img/icon-gift-green-star.png'),
  },
  'gift-red-star': {
    '1x': assetUrl('/img/icon-gift-red-star.png'),
  },
  'gift-delicious-cake': {
    '1x': assetUrl('/img/icon-gift-delicious-cake.png'),
  },
  plane: {
    '1x': assetUrl('/img/icon-plane.svg'),
  },
  receive: {
    '1x': assetUrl('/img/icon-receive.svg'),
  },
  store: {
    '1x': assetUrl('/img/icon-store.svg'),
  },
  close: {
    '1x': assetUrl('/img/icon-close.svg'),
  },
}

const colors: Partial<Record<Icon, string>> = {
  ETH: '#627EEA',
  TON: '#35AFF1',
  USDT: '#009393',
  plane: 'var(--color-accent-purple)',
  receive: 'var(--color-accent-green)',
  store: 'var(--color-accent-blue)',
}
</script>

<template>
  <img
    :class="[
      'icon',
      `icon--size-${size}`,
      { 'icon--filled': filled, 'icon--outlined': outlined },
    ]"
    :src="icons[name]['1x']"
    :srcset="icons[name]['2x'] ? `${icons[name]['2x']} 2x` : undefined"
    :style="{ backgroundColor: filled ? colors[name] : undefined }"
  />
</template>

<style scoped>
.icon--size-sm {
  width: 12px;
  height: 12px;
}

.icon--size-md {
  width: 16px;
  height: 16px;
}

.icon--size-lg {
  width: 24px;
  height: 24px;
}

.icon--size-xl {
  width: 32px;
  height: 32px;
}

.icon--size-auto {
  width: auto;
  height: auto;
}

.icon--filled {
  object-fit: scale-down;
  border-radius: 50%;
}

.icon--outlined {
  border: 1.33px solid var(--color-white);
}
</style>
