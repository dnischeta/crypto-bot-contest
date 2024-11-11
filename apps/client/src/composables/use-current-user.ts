import { reatomRef } from '@reatom/npm-vue'
import { currentUserAtom } from '@/model/user'

export function useCurrentUser() {
  const currentUser = reatomRef(currentUserAtom)

  return { currentUser }
}
