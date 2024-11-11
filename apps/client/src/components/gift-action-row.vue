<script setup lang="ts">
import type { AppEventWithUserNames } from '@crypto-bot-contest/types'
import { computed } from 'vue'
import UiRow from './ui/ui-row.vue'
import UiAvatar from './ui/ui-avatar.vue'
import UiIcon from './ui/ui-icon.vue'
import { useAvatar } from '@/composables/use-avatar'

const props = defineProps<{ action: AppEventWithUserNames }>()

const sender = computed(() => ({
  telegramId: props.action.senderId,
  firstName: props.action.senderFirstName,
}))

const avatar = useAvatar(sender)

const actionType = computed(() => {
  switch (props.action.type) {
    case 'gift-purchased':
      return 'Buy gift'
    case 'gift-send':
      return 'Send gift'
    default:
      return ''
  }
})

const iconName = computed(() => {
  switch (props.action.type) {
    case 'gift-purchased':
      return 'store'
    case 'gift-send':
    default:
      return 'plane'
  }
})
</script>

<template>
  <UiRow>
    <template #prepend>
      <div class="icon-wrapper">
        <UiAvatar :src="avatar.avatarSrc.value" :user="sender" />
        <UiIcon
          class="icon-indicator"
          :name="iconName"
          size="md"
          filled
          outlined
        />
      </div>
    </template>
    <div class="action-type">{{ actionType }}</div>
    <div class="action-text">
      <template v-if="action.type === 'gift-send'">
        <span class="accent">{{ action.senderFirstName }}</span> sent a gift to
        <span class="accent">{{ action.receiverFirstName }}</span>
      </template>
      <template v-else-if="action.type === 'gift-purchased'">
        <span class="accent">{{ action.senderFirstName }}</span> bought a gift
      </template>
    </div>
    <template #append></template>
  </UiRow>
</template>

<style scoped>
.icon-wrapper {
  position: relative;
}

.icon-indicator {
  position: absolute;
  bottom: 0;
  right: -4px;
}

.action-type {
  font-weight: 400;
  font-size: 13px;
  line-height: 16px;
  color: var(--color-label-secondary);
}

.action-text {
  font-size: 17px;
  font-weight: 510;
  line-height: 22px;
}

.accent {
  color: var(--color-accent-blue);
}
</style>
