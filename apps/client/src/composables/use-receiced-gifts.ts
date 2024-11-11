import { computed } from 'vue'
import { reatomResource, withDataAtom, withStatusesAtom } from '@reatom/async'
import { reatomRef } from '@reatom/npm-vue'
import { getReceivedGifts } from '@/api/gift'
import type { AtomMut } from '@reatom/core'
import type { User } from '@crypto-bot-contest/types'

// TODO: extract model/receivedGifts
export function useReceivedGifts(userAtom: AtomMut<User | undefined>) {
  const fetchGifts = reatomResource(async ctx => {
    const user = ctx.spy(userAtom)

    if (!user) {
      return []
    }

    const response = await ctx.schedule(() => getReceivedGifts(user.telegramId))

    if (!response.ok) {
      return []
    }

    return response.result
  }, 'fetchUserReceivedGifts').pipe(withDataAtom(), withStatusesAtom())

  const gifts = reatomRef(fetchGifts.dataAtom)
  const statuses = reatomRef(fetchGifts.statusesAtom)
  const loading = computed(() => statuses.value.isPending)
  const error = computed(() => statuses.value.isRejected)

  return {
    loading,
    error,
    gifts,
  }
}
