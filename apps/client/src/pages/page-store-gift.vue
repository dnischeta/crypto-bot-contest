<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import GiftStore from '@/components/gift-store.vue'
import UiIcon from '@/components/ui/ui-icon.vue'
import { formatPrice } from '@/utils/price'
import { getGiftMetaById } from '@/model/gift'
import UiChip from '@/components/ui/ui-chip.vue'
import { formatQty } from '@/utils/qty'
import { useGiftActions } from '@/composables/use-gift-actions'
import GiftActionRow from '@/components/gift-action-row.vue'
import { useGiftPurchase } from '@/composables/use-gift-purchase'

const route = useRoute()

const giftId = computed(() => parseInt(route.params.id as string, 10))
useGiftPurchase(giftId)
const { actions, loading, error } = useGiftActions(giftId)
const gift = computed(() => getGiftMetaById(giftId.value)!)
</script>

<template>
  <div class="img">
    <GiftStore :gift="gift" only-img />
  </div>
  <div class="head">
    <div class="title">
      <h1>{{ gift.name }}</h1>
      <UiChip>
        {{
          $t('store.qty', {
            soldQty: formatQty(gift.soldQty),
            totalQty: formatQty(gift.totalQty),
          })
        }}
      </UiChip>
    </div>
    <span class="caption">{{ $t('store.gift-caption') }}</span>
    <span class="price">
      <UiIcon :name="gift.price.asset" filled />
      {{ formatPrice(gift.price) }}
    </span>
  </div>
  <template v-if="actions.length > 0">
    <div class="gap" />
    <div>
      <div class="caption caption--sm recent-actions-head">
        {{ $t('history.title') }}
      </div>
      <ul>
        <GiftActionRow
          v-for="action in actions"
          :key="action._id"
          :action="action"
        />
      </ul>
    </div>
  </template>
</template>

<style scoped>
.img {
  padding: 16px 16px 0;
}

.head {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  padding: 12px 16px;
}

.title {
  display: flex;
  align-items: center;
  gap: 12px;
}

.price {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  gap: 8px;
  font-weight: var(--font-weight-semibold);
}

.gap {
  height: 12px;
  background-color: var(--color-bg-gap);
}

.recent-actions-head {
  padding: 24px 16px 12px;
  text-transform: uppercase;
  font-size: var(--font-size-md);
}
</style>
