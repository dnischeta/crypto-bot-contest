<script setup lang="ts">
import { reatomRef } from '@reatom/npm-vue'
import UiHero from '@/components/ui/ui-hero.vue'
import GiftStore from '@/components/gift-store.vue'
import { fetchGifts } from '@/model/gift'

const gifts = reatomRef(fetchGifts.dataAtom)
</script>

<template>
  <UiHero
    icon="gift"
    :title="$t('store.title')"
    :caption="$t('store.subtitle')"
  />
  <ul class="list">
    <li v-for="gift in gifts" :key="gift.id" class="list-item">
      <GiftStore :gift="gift" size="lg" />
    </li>
  </ul>
</template>

<style scoped>
.list {
  padding: 16px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
</style>
