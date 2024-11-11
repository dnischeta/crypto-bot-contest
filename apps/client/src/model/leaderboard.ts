import {
  reatomResource,
  withCache,
  withDataAtom,
  withStatusesAtom,
} from '@reatom/async'
import { action, atom } from '@reatom/core'
import { withConcurrency } from '@reatom/effects'
import { getLeaderboard } from '@/api/leaderboard'
import { sleep } from '@/utils/sleep'

const searchAtom = atom('', 'leaderboardSearchAtom')

export const fetchLeaderboard = reatomResource(async ctx => {
  const search = ctx.spy(searchAtom)
  const response = await getLeaderboard(search)

  if (!response.ok) {
    throw response.error
  }

  return response.result
}, 'fetchLeaderboard').pipe(withDataAtom([]), withCache(), withStatusesAtom())

export const setSearchDebounced = action<[string]>(async (ctx, value) => {
  await ctx.schedule(() => sleep(250))
  searchAtom(ctx, value)
}).pipe(withConcurrency())
