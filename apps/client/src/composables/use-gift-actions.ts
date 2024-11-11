import { computed, watch, type Ref } from 'vue'
import { atom } from '@reatom/core'
import { ctx } from '@/model'
import { fetchGiftActions } from '@/model/gift-actions'
import { reatomRef } from '@reatom/npm-vue'
import type { AppEventWithUserNames } from '@crypto-bot-contest/types'

export function useGiftActions(giftMetaId: Ref<number>) {
  const giftActions = atom<AppEventWithUserNames[]>([])
  const actions = reatomRef(giftActions)
  const statuses = reatomRef(fetchGiftActions.statusesAtom)
  const loading = computed(() => statuses.value.isPending)
  const error = computed(() => statuses.value.isRejected)

  watch(
    giftMetaId,
    async () => {
      giftActions(ctx, await fetchGiftActions(ctx, giftMetaId.value))
    },
    { immediate: true },
  )

  return {
    actions,
    loading,
    error,
  }
}
