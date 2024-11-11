import { computed, onMounted, onUnmounted, watch, type Ref } from 'vue'
import { useDocumentVisibility } from '@vueuse/core'
import { reatomRef, useAction } from '@reatom/npm-vue'
import { useRouter } from 'vue-router'
import { openTelegramLink } from '@telegram-apps/sdk-vue'
import {
  buyGift,
  checkInvoiceStatus,
  runInvoiceStatusCheck,
  isInvoiceStatusCheckPending,
} from '@/model/gift'
import { useMainButton } from './use-main-button'
import { ctx } from '@/model'
import { ROUTES } from '@/router'

export function useGiftPurchase(giftId: Ref<number>) {
  const mainButton = useMainButton()
  const visibility = useDocumentVisibility()
  const router = useRouter()

  const buyGiftBound = useAction(buyGift)
  const buyGiftStatuses = reatomRef(buyGift.statusesAtom)
  const runInvoiceStatusCheckBound = useAction(runInvoiceStatusCheck)
  const invoiceStatus = reatomRef(checkInvoiceStatus.dataAtom)
  const waitingForPayment = reatomRef(isInvoiceStatusCheckPending)

  const pending = computed(
    () => buyGiftStatuses.value.isPending || waitingForPayment.value,
  )

  watch([pending, visibility], async () => {
    if (visibility.value === 'visible') {
      mainButton.setPending(pending.value)

      if (!pending.value && invoiceStatus.value === 'paid') {
        await router.push({
          name: ROUTES.giftPurchased,
          params: { id: giftId.value },
        })
      }
    }
  })

  onMounted(() => {
    // For some reason calling openTelegramLink causes extra mounting
    mainButton.showButton({
      text: 'Buy a Gift',
      cb: onBuyGiftClick,
    })

    if (pending.value) {
      mainButton.setPending(true)
    }
  })

  onUnmounted(() => {
    mainButton.hideButton()
    reset()
  })

  async function onBuyGiftClick() {
    try {
      const result = await buyGiftBound(giftId.value)
      openTelegramLink(result.invoiceUrl)

      runInvoiceStatusCheckBound(result.invoiceId)
    } catch (error) {
      console.error('Failed to buy gift:', error)
    }
  }

  function reset() {
    checkInvoiceStatus.dataAtom.reset(ctx)
    isInvoiceStatusCheckPending(ctx, false)
  }

  return {
    invoiceStatus,
    pending,
    onBuyGiftClick,
  }
}
