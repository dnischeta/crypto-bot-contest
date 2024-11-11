<script setup lang="ts">
import { getGiftMetaById } from '@/model/gift'
import type { AppEventWithUserNames } from '@crypto-bot-contest/types'
import { computed } from 'vue'
import UiRow from './ui/ui-row.vue'
import UiIcon from './ui/ui-icon.vue'
import type { Icon } from './ui/consts'
import { formatPrice } from '@/utils/price'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  action: AppEventWithUserNames
  currentUserId: number
}>()

const { t } = useI18n()

const giftMeta = computed(() => getGiftMetaById(props.action.giftId))

const actionType = computed(() => {
  switch (props.action.type) {
    case 'gift-purchased':
      return t('gift.buy-gift')
    case 'gift-send':
      return t('gift.send-gift')
    default:
      return ''
  }
})

const isSender = computed(
  () =>
    props.action.type === 'gift-send' &&
    props.action.senderId === props.currentUserId,
)
const isReceiver = computed(
  () =>
    props.action.type === 'gift-send' &&
    props.action.receiverId === props.currentUserId,
)

const iconName = computed<Icon>(() => {
  if (props.action.type === 'gift-purchased') {
    return 'store'
  }

  return isSender.value ? 'plane' : 'receive'
})
</script>

<template>
  <UiRow>
    <template #prepend>
      <div class="img">
        <UiIcon size="xl" :name="giftMeta!.img" />
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
    <div class="action-gift-name">{{ giftMeta?.name }}</div>
    <template #append>
      <template v-if="action.type === 'gift-purchased'"
        >-&nbsp;{{ formatPrice(giftMeta!.price) }}</template
      >
      <template v-else-if="isSender"
        >{{ $t('general.to') }}
        <span class="accent">{{ action.receiverFirstName }}</span></template
      >
      <template v-else-if="isReceiver"
        >{{ $t('general.from') }}
        <span class="accent">{{ action.senderFirstName }}</span></template
      >
    </template>
  </UiRow>
</template>

<style scoped>
.img {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-bg-secondary);
  border-radius: 10px;
  width: 40px;
  height: 40px;
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

.action-gift-name {
  font-size: 17px;
  font-weight: 510;
  line-height: 22px;
}

.accent {
  color: var(--color-accent-blue);
}
</style>
