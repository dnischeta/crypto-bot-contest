<script setup lang="ts">
import { computed } from 'vue'
import type { User } from '@crypto-bot-contest/types'
import UiChip from './ui-chip.vue'

const COLORS = [
  '#FF885E', // Оранжевый
  '#DC4979', // Розовый
  '#9A52FF', // Фиолетовый
  '#4BD964', // Зеленый
  '#4BB9FF', // Голубой
  '#FFB300', // Желтый
] as const

const props = withDefaults(
  defineProps<{
    user: Pick<User, 'firstName' | 'lastName' | 'telegramId'>
    src?: string | null
    loading?: boolean
    error?: boolean
    size?: 'sm' | 'md' | 'lg'
    chip?: string
  }>(),
  { size: 'md' },
)

const initials = computed(() =>
  [props.user.firstName, props.user.lastName]
    .filter(Boolean)
    .map(s => s!.charAt(0).toUpperCase())
    .join(''),
)

const backgroundColor = computed(() => {
  return COLORS[props.user.telegramId % COLORS.length]
})
</script>

<template>
  <div class="avatar" :class="[`avatar--size-${size}`]">
    <div
      v-if="loading || error || !src"
      class="avatar-mock"
      :style="{ backgroundColor }"
    >
      {{ initials }}
    </div>
    <img v-else class="avatar-img" :src="src!" />
    <UiChip v-if="chip" class="avatar-chip" filled>{{ chip }}</UiChip>
  </div>
</template>

<style scoped>
.avatar {
  position: relative;
  border-radius: 50%;
}

.avatar--size-sm {
  width: 16px;
  height: 16px;
}

.avatar--size-md {
  width: 40px;
  height: 40px;
}

.avatar--size-lg {
  width: 100px;
  height: 100px;
}

.avatar--size-sm .avatar-mock {
  font-size: 8px;
  line-height: 16px;
}

.avatar--size-md .avatar-mock {
  font-size: 20px;
  line-height: 40px;
}

.avatar--size-lg .avatar-mock {
  font-size: 50px;
  line-height: 100px;
}

.avatar-mock {
  height: 100%;
  width: 100%;
  border-radius: 50%;
  color: var(--color-white);
  font-weight: 600;
  text-align: center;
}

.avatar-img {
  height: 100%;
  width: 100%;
  border-radius: 50%;
}

.avatar-chip {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 40%);
}
</style>
