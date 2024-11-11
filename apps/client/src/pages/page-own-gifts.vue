<script setup lang="ts">
import GiftOwn from '@/components/gift-own.vue'
import UiHero from '@/components/ui/ui-hero.vue'
import NoGifts from '@/components/no-results.vue'
import { useOwnGifts } from '@/composables/use-own-gifts'
import UiSpinner from '@/components/ui/ui-spinner.vue'

const { gifts, loading, noGifts } = useOwnGifts()
</script>

<template>
  <UiHero :title="$t('own-gifts.title')" :caption="$t('own-gifts.subtitle')" />
  <UiSpinner v-if="loading" size="lg" style="margin: auto" />
  <NoGifts v-else-if="noGifts" />
  <ul class="gift-list" v-else>
    <li v-for="gift in gifts" :key="gift.gift._id">
      <GiftOwn :gift="gift.meta!" :purchased-gift="gift.gift" />
    </li>
  </ul>
</template>

<style scoped>
.gift-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  padding: 8px 16px;
}
</style>
