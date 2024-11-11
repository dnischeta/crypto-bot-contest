import { reatomRef } from '@reatom/npm-vue'
import { computed, watch } from 'vue'
import { fetchUserActions } from '@/model/user-actions'
import { useCurrentUser } from '@/composables/use-current-user'
import { ctx } from '@/model'

export function useUserActions() {
  const { currentUser } = useCurrentUser()

  const actions = reatomRef(fetchUserActions.dataAtom)
  const statuses = reatomRef(fetchUserActions.statusesAtom)
  const loading = computed(() => statuses.value.isPending)
  const error = computed(() => statuses.value.isRejected)

  watch(
    currentUser,
    () => {
      fetchUserActions(ctx, currentUser.value!.telegramId)
    },
    { immediate: true },
  )

  return {
    actions,
    loading,
    error,
  }
}
