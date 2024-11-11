import { getGiftActions } from '@/api/actions'
import { reatomAsync, withCache, withStatusesAtom } from '@reatom/async'

export const fetchGiftActions = reatomAsync(async (ctx, giftMetaId: number) => {
  const response = await getGiftActions(giftMetaId)

  if (!response.ok) {
    throw response.error
  }

  return response.result
}, 'fetchGiftActions').pipe(withCache(), withStatusesAtom())
