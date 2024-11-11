import { retrieveLaunchParams } from '@telegram-apps/sdk-vue'

export function usePlatform() {
  const lp = retrieveLaunchParams()

  return {
    isMobile: ['ios', 'android'].includes(lp.platform),
  }
}
