import { reatomAsync, withCache, withStatusesAtom } from '@reatom/async'
import { getAvatar } from '@/api/avatar'

export const fetchAvatar = reatomAsync(async (ctx, telegramId: number) => {
  try {
    return await getAvatar(telegramId)
  } catch {
    // TODO: handle errors besides 404
    // It's fine if user doesn't have an avatar
    return null
  }
}, 'fetchAvatar').pipe(
  withCache({ length: 25, swr: false }),
  withStatusesAtom(),
)
