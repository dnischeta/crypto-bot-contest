import { request } from '@/utils/request'
import type { ApiGetLeaderboardResponse } from '@crypto-bot-contest/types'

const paths = {
  leaderboard: (search: string) => {
    if (search.length < 3) {
      return '/leaderboard'
    }

    return `/leaderboard?s=${search}`
  },
}

export async function getLeaderboard(search: string) {
  return await request<ApiGetLeaderboardResponse>(paths.leaderboard(search))
}
