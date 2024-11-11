import { getUserActions } from '@/api/actions'
import {
  reatomAsync,
  withCache,
  withDataAtom,
  withStatusesAtom,
} from '@reatom/async'

const ONE_MIN = 60 * 1000

// Only for current user for now
export const fetchUserActions = reatomAsync(async (ctx, telegramId: number) => {
  const response = await getUserActions(telegramId)

  if (!response.ok) {
    throw response.error
  }

  return response.result
}, 'fetchUserActions').pipe(
  withDataAtom([]),
  withCache({ length: 1, staleTime: ONE_MIN }),
  withStatusesAtom(),
)
