import { computed } from 'vue'
import { reatomRef } from '@reatom/npm-vue'
import { fetchOwnGifts, getGiftMetaById } from '@/model/gift'

export function useOwnGifts() {
  const gifts = reatomRef(fetchOwnGifts.dataAtom)
  const loading = reatomRef(fetchOwnGifts.pendingAtom)
  const noGifts = computed(() => gifts.value.length === 0)

  const giftsWithMeta = computed(() => {
    return gifts.value.map(g => ({
      gift: g,
      meta: getGiftMetaById(g.giftId),
    }))
  })

  return { gifts: giftsWithMeta, loading, noGifts }
}
