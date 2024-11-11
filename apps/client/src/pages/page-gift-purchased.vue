<script setup lang="ts">
import UiButton from '@/components/ui/ui-button.vue'
import UiLottie from '@/components/ui/ui-lottie.vue'
import UiNotification from '@/components/ui/ui-notification.vue'
import { getGiftMetaById } from '@/model/gift'
import { ROUTES } from '@/router'
import { formatPrice } from '@/utils/price'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

const route = useRoute()
const { t } = useI18n()

const gift = computed(() => {
  return getGiftMetaById(parseInt(route.params.id as unknown as string))
})
</script>

<template>
  <div class="content">
    <div class="image">
      <UiLottie :name="gift!.img" />
      <UiLottie class="effect" name="effect-gift-purchased" />
    </div>
    <h1>{{ $t('gift.purchased') }}</h1>
    <h2>
      {{
        $t('gift.purchased-message', {
          name: gift!.name,
          price: formatPrice(gift!.price),
        })
      }}
    </h2>
  </div>
  <!-- @vue-expect-error TODO: FIX -->
  <UiNotification
    class="notification"
    :title="t('gift.purchased-notification-title')"
    :caption="t('gift.purchased-notification-text')"
    :button-text="t('button.send')"
    :icon-name="gift!.image"
    @button-click="$router.push({ name: ROUTES.ownGifts })"
  />
  <Teleport to="#footer">
    <div class="footer">
      <UiButton :to="{ name: ROUTES.ownGifts }" full-width>{{
        $t('button.send')
      }}</UiButton>
      <UiButton :to="{ name: ROUTES.store }" variant="text" full-width>{{
        $t('button.open-store')
      }}</UiButton>
    </div>
  </Teleport>
</template>

<style scoped>
.page {
  position: relative;
  height: calc(100vh - 58px);
  display: grid;
  place-items: center;
  padding: 16px;
}

.content {
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.image {
  position: relative;
  width: 100px;
  height: 100px;
}

.effect {
  width: 250px;
  height: 250px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

h2 {
  font-weight: 400;
}

.notification {
  position: absolute;
  bottom: 16px;
  left: 16px;
  right: 16px;
}

.footer {
  display: grid;
  grid-template-rows: 1fr 1fr;
  padding: 8px 16px;
  gap: 8px;
  border-top: 0.3px solid var(--color-separator);
}
</style>
