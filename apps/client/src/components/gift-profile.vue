<script setup lang="ts">
import { computed, ref } from 'vue'
import type { ReceivedGiftWithNames } from '@crypto-bot-contest/types'
import { formatQty } from '@/utils/qty'
import type { GiftMeta } from '@/types'
import { formatDateTime } from '@/utils/date'
import UiCard from './ui/ui-card.vue'
import UiLottie from './ui/ui-lottie.vue'
import UiDrawer from './ui/ui-drawer.vue'
import UiTable from './ui/ui-table.vue'
import { formatPrice } from '@/utils/price'
import UiAvatar from './ui/ui-avatar.vue'
import { useAvatar } from '@/composables/use-avatar'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  gift: GiftMeta
  receivedGift: ReceivedGiftWithNames
}>()

const { t } = useI18n()
const detailsVisible = ref(false)
const { avatarSrc, isError, loading } = useAvatar(
  computed(() => ({ telegramId: props.receivedGift.ownerId })),
)

const rows = computed(() => [
  { title: t('gift.table.from'), value: props.receivedGift.senderFirstName },
  {
    title: t('gift.table.date'),
    value: formatDateTime(props.receivedGift.receivedAt),
  },
  {
    title: t('gift.table.price'),
    icon: props.gift.price.asset,
    value: formatPrice(props.gift.price),
  },
  {
    title: t('gift.table.availability'),
    value: `${formatQty(props.gift.soldQty)} of ${formatQty(props.gift.totalQty)}`,
  },
])
</script>

<template>
  <UiCard class="gift" size="sm" @click="detailsVisible = true">
    <template #head>
      <UiAvatar
        class="gift-sender"
        :user="{
          telegramId: props.receivedGift.ownerId,
          firstName: props.receivedGift.senderFirstName,
        }"
        :src="avatarSrc"
        :error="isError"
        :loading="loading"
        size="sm"
      />
      {{
        $t('store.qty', {
          soldQty: formatQty(gift.soldQty),
          totalQty: formatQty(gift.totalQty),
        })
      }}
    </template>
    <UiLottie class="gift-img" :name="gift.img" />
    <template #footer>
      <h2 class="gift-name">{{ gift.name }}</h2>
    </template>
  </UiCard>
  <UiDrawer
    :visible="detailsVisible"
    main-button-text="Close"
    @close="detailsVisible = false"
    @click:main-button="detailsVisible = false"
  >
    <UiLottie class="gift-details-img" :name="gift.img" />
    <h1 class="gift-details-title">{{ gift.name }}</h1>
    <UiTable :rows="rows" />
  </UiDrawer>
</template>

<style scoped>
.gift-sender {
  margin-right: auto;
}

.gift-img {
  width: 80px;
  height: 80px;
}

.gift-name {
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
}

.gift-img {
  width: 80px;
  height: 80px;
}

.gift-details-img {
  align-self: center;
  width: 150px;
  height: 150px;
  margin-bottom: 12px;
}

.gift-details-title {
  margin-bottom: 24px;
}
</style>
