import { atom } from '@reatom/core'
import { reatomRef } from '@reatom/npm-vue'
import type { Ref } from 'vue'
import { computed, watch } from 'vue'
import { fetchAvatar } from '@/model/avatar'
import { ctx } from '@/model'

export function useAvatar(user: Ref<{ telegramId: number } | undefined>) {
  const avatarAtom = atom<string | null>(null)
  const avatarRef = reatomRef(avatarAtom)
  const statuses = reatomRef(fetchAvatar.statusesAtom)
  const loading = computed(() => statuses.value.isPending)
  const isError = computed(() => statuses.value.isRejected)

  watch(
    user,
    async () => {
      if (!user.value?.telegramId) {
        return
      }

      avatarAtom(ctx, await fetchAvatar(ctx, user.value.telegramId))
    },
    { immediate: true },
  )

  return {
    avatarSrc: avatarRef,
    loading,
    isError,
  }
}
