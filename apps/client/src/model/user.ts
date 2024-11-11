import { action, atom } from '@reatom/core'
import type { User } from '@crypto-bot-contest/types'
import * as api from '@/api/user'

export const currentUserAtom = atom<User | null>(null)

export const login = action(async (ctx, initDataRaw: string) => {
  const response = await api.login({ initDataRaw })

  // TODO: handle error properly
  if (!response.ok) {
    throw response.error
  }

  currentUserAtom(ctx, response.result)
})
