import { getUser, getUserRank } from '@/api/user'
import {
  reatomAsync,
  withCache,
  withDataAtom,
  withStatusesAtom,
} from '@reatom/async'

export const fetchProfile = reatomAsync(async (ctx, telegramId: number) => {
  const response = await getUser({ telegramId })

  if (!response.ok) {
    throw response.error
  }

  return response.result
}, 'fetchProfile').pipe(withDataAtom(), withCache(), withStatusesAtom())

export const fetchUserRank = reatomAsync(async (ctx, telegramId: number) => {
  const response = await getUserRank({ telegramId })

  if (!response.ok) {
    throw response.error
  }

  return response.result
}, 'fetchUserRank').pipe(withDataAtom(), withCache(), withStatusesAtom())
