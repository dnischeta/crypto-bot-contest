import { reatomRef } from '@reatom/npm-vue'
import { computed, onUnmounted } from 'vue'
import { fetchLeaderboard, setSearchDebounced } from '@/model/leaderboard'
import { atom } from '@reatom/core'

export function useLeaderboard() {
  const searchAtom = atom('')
  searchAtom.onChange(setSearchDebounced)
  const searchRef = reatomRef(searchAtom)
  const leaderboard = reatomRef(fetchLeaderboard.dataAtom)
  const statuses = reatomRef(fetchLeaderboard.statusesAtom)

  const loading = computed(() => statuses.value.isPending)
  const error = computed(() => statuses.value.isRejected)

  onUnmounted(() => {
    searchRef.value = ''
  })

  return {
    search: searchRef,
    leaderboard,
    loading,
    error,
  }
}
