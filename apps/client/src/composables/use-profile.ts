import { reatomRef } from '@reatom/npm-vue'
import { computed, watch, type Ref } from 'vue'
import { ctx } from '@/model'
import { fetchProfile, fetchUserRank } from '@/model/profile'

export function useProfile(id: Ref<number>) {
  watch(
    id,
    async () => {
      await Promise.all([
        fetchProfile(ctx, id.value),
        fetchUserRank(ctx, id.value),
      ])
    },
    { immediate: true },
  )

  const profile = reatomRef(fetchProfile.dataAtom)
  const statuses = reatomRef(fetchProfile.statusesAtom)
  const userRank = reatomRef(fetchUserRank.dataAtom)
  const loading = computed(() => statuses.value.isPending)
  const error = computed(() => statuses.value.isRejected)

  return {
    profileAtom: fetchProfile.dataAtom,
    profile,
    loading,
    error,
    userRank,
  }
}
