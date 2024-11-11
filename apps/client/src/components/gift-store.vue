<script setup lang="ts">
import { formatQty } from '@/utils/qty'
import { formatPrice } from '@/utils/price'
import type { GiftMeta } from '@/types'

import UiCard from './ui/ui-card.vue'
import UiButton from './ui/ui-button.vue'
import UiLottie from './ui/ui-lottie.vue'
import { Starport } from 'vue-starport'
import { computed } from 'vue'
import { ROUTES } from '@/router'

const props = defineProps<{
  gift: GiftMeta
  onlyImg?: boolean
}>()

const soldOut = computed(() => props.gift.soldQty >= props.gift.totalQty)
</script>

<template>
  <UiCard
    class="gift"
    :class="{ 'gift--only-img': onlyImg }"
    :accent-color="gift.accentColor"
    size="lg"
  >
    <template v-if="!onlyImg" #head>
      <span class="gift-head">
        {{
          $t('store.qty', {
            soldQty: formatQty(gift.soldQty),
            totalQty: formatQty(gift.totalQty),
          })
        }}
      </span>
    </template>
    <Starport
      :port="gift.id.toString(10)"
      :style="onlyImg ? 'width:75%;height:75%;' : 'width:128px;height:128px;'"
      :duration="300"
      keep-alive
    >
      <UiLottie class="gift-img" :name="gift.img" :lazy="false" />
    </Starport>
    <h2 v-if="!onlyImg">{{ gift.name }}</h2>
    <template v-if="!onlyImg" #footer>
      <UiButton v-if="soldOut" disabled>{{ $t('store.sold-out') }}</UiButton>
      <UiButton
        v-else
        :to="{ name: ROUTES.storeGift, params: { id: gift.id } }"
        :icon="gift.price.asset"
      >
        {{ formatPrice(gift.price) }}
      </UiButton>
    </template>
  </UiCard>
</template>

<style scoped>
.gift--only-img {
  aspect-ratio: 1/1;
}

.gift-head {
  margin-left: auto;
}

.gift-img {
  margin-bottom: 4px;
  width: 128px;
  height: 128px;
}

.gift--only-img .gift-img {
  margin: auto;
  width: 75%;
  height: 75%;
}
</style>
