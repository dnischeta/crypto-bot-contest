<script setup lang="ts">
import UiButton from '@/components/ui/ui-button.vue'
import UiCard from '@/components/ui/ui-card.vue'
</script>

<template>
  <div
    style="
      display: flex;
      flex-direction: column;
      gap: 20px;
      align-items: center;
    "
  >
    <h1>Title 1</h1>
    <h2>Title 2</h2>
    <span class="text">Text</span>
    <span class="text text--bold">Text Bold</span>
    <span class="caption">Caption</span>
    <UiButton icon="usdt">1000 USDT</UiButton>
    <UiButton icon="eth">1000 ETH</UiButton>
    <UiButton icon="ton">1000 TON</UiButton>
    <UiButton>Send</UiButton>

    <UiCard size="sm">
      <template #head>
        <span class="caption">Delicious Cake</span>
      </template>
      <div style="height: 73px; width: 73px; background-color: red"></div>
      <template #footer>
        <UiButton>Send</UiButton>
      </template>
    </UiCard>
    <UiCard size="lg">
      <template #head>
        <span class="caption" style="margin-left: auto">1 of 10K</span>
      </template>
      <img src="/img/gift-mock.png" style="margin-bottom: 4px" />
      <h2>Delicious Cake</h2>
      <template #footer>
        <UiButton icon="ton">1000 TON</UiButton>
      </template>
    </UiCard>
  </div>
</template>

<style scoped>
.index-page__links {
  list-style: none;
  padding-left: 0;
}

.index-page__link {
  font-weight: bold;
  display: inline-flex;
  gap: 5px;
}

.index-page__link-item + .index-page__link-item {
  margin-top: 10px;
}

.index-page__link-icon {
  width: 20px;
  display: block;
}

.index-page__link-icon svg {
  display: block;
}
</style>
