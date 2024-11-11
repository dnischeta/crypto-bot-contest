import { popup } from '@telegram-apps/sdk-vue'

export function usePopup() {
  if (!popup.isSupported()) {
    console.warn('Popup is not supported.')

    return {
      open: () => {},
    }
  }

  function open(config: { title: string; message: string }) {
    popup.open(config)
  }

  return { open }
}
