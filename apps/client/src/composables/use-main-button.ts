import { mainButton, postEvent, useSignal } from '@telegram-apps/sdk-vue'
import { useTheme } from './use-theme'

export function useMainButton() {
  if (!mainButton.isMounted()) {
    mainButton.mount()
  }

  const isMainButtonVisible = useSignal(mainButton.isVisible)
  const { bgColor } = useTheme()

  let currentCallback: (() => void) | null = null

  function showButton({ text, cb }: { text: string; cb: () => void }) {
    mainButton.setParams({
      text,
      isVisible: true,
      isEnabled: true,
      isLoaderVisible: false,
    })
    postEvent('web_app_set_bottom_bar_color', { color: bgColor.value })
    currentCallback = cb
    mainButton.onClick(cb)
  }

  function hideButton() {
    mainButton.setParams({
      isVisible: false,
    })
    if (currentCallback) {
      mainButton.offClick(currentCallback)
      currentCallback = null
    }
  }

  function setPending(isPending: boolean) {
    mainButton.setParams({
      isLoaderVisible: isPending,
      isEnabled: !isPending,
    })
  }

  return {
    isMainButtonVisible,
    showButton,
    hideButton,
    setPending,
  }
}
