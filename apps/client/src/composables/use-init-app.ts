import { retrieveLaunchParams } from '@telegram-apps/sdk-vue'
import { useRouter } from 'vue-router'
import { receiveGift } from '@/api/gift'
import { ROUTES } from '@/router'

export function useInitApp() {
  const router = useRouter()
  const { startParam } = retrieveLaunchParams()

  async function processStartParam() {
    if (!startParam) {
      return
    }

    const entries = startParam.split('-')

    if (entries.length != 2) {
      console.warn('Unknown startParam format: ', startParam)
      return
    }

    switch (entries[0]) {
      case 'receive': {
        const response = await receiveGift(entries[1])

        if (response.ok) {
          await router.push({
            name: ROUTES.giftReceived,
            params: { id: response.result.giftMetaId },
          })
        }

        break
      }
      default: {
        console.warn('Unknown startParam action: ', entries[0])
      }
    }
  }

  return { processStartParam }
}
