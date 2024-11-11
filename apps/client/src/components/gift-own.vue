<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Gift } from '@crypto-bot-contest/types'
import type { GiftMeta } from '@/types'

import UiCard from './ui/ui-card.vue'
import UiButton from './ui/ui-button.vue'
import UiLottie from './ui/ui-lottie.vue'
import UiDrawer from './ui/ui-drawer.vue'
import UiTable from './ui/ui-table.vue'
import { formatPrice } from '@/utils/price'
import { formatQty } from '@/utils/qty'
import { formatDateTime } from '@/utils/date'
import { useI18n } from 'vue-i18n'
import { useClipboard } from '@/composables/use-clipboard'
import { usePopup } from '@/composables/use-popup'

const props = defineProps<{
  gift: GiftMeta
  purchasedGift: Gift
}>()

const detailsVisible = ref(false)

const { t } = useI18n()
const { writeText } = useClipboard()
const { open } = usePopup()

const rows = computed(() => [
  { title: t('gift.table.gift'), value: props.gift.name },
  {
    title: t('gift.table.date'),
    value: formatDateTime(props.purchasedGift.purchasedAt),
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

async function handleSendGift() {
  await writeText(`${import.meta.env.VITE_BOT_NAME} ${props.purchasedGift._id}`)

  open({
    title: t('button.send-to-contact'),
    message: t('gift.send-popup-message'),
  })
}
</script>

<template>
  <UiCard class="gift" size="sm" @click="detailsVisible = true">
    <template #head>
      {{ gift.name }}
    </template>
    <UiLottie class="gift-img" :name="gift.img" />
    <template #footer>
      <UiButton>{{ $t('button.send') }}</UiButton>
    </template>
  </UiCard>
  <UiDrawer
    :visible="detailsVisible"
    :main-button-text="$t('button.send-to-contact')"
    @close="detailsVisible = false"
    @click:main-button="handleSendGift"
  >
    <UiLottie class="gift-details-img" :name="gift.img" />
    <h1 class="gift-details-title">{{ $t('gift.send-gift') }}</h1>
    <UiTable :rows="rows" />
  </UiDrawer>
</template>

<style scoped>
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
  text-transform: capitalize;
}
</style>
