import { useStorage } from '@vueuse/core'
import { computed, watch } from 'vue'
import { postEvent } from '@telegram-apps/sdk-vue'

type Theme = 'light' | 'dark'

let initialized = false

export function useInitTheme() {
  initialized = true
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
  const initialTheme = systemTheme.matches ? 'dark' : 'light'

  const theme = useStorage<Theme>('GIFT_APP_THEME', initialTheme)

  systemTheme.addEventListener('change', e => {
    if (!localStorage.getItem('GIFT_APP_THEME')) {
      theme.value = e.matches ? 'dark' : 'light'
    }
  })

  watch(
    theme,
    newTheme => {
      document.documentElement.classList.remove('theme-light', 'theme-dark')
      document.documentElement.classList.add(`theme-${newTheme}`)

      const color = newTheme === 'dark' ? '#1c1c1e' : '#ffffff'
      postEvent('web_app_set_header_color', { color })
      postEvent('web_app_set_bottom_bar_color', { color })
      postEvent('web_app_set_background_color', { color })
    },
    { immediate: true },
  )
}

export function useTheme() {
  if (!initialized) {
    throw new Error('Theme is not initialized')
  }

  const theme = useStorage<Theme>('GIFT_APP_THEME', 'light')
  const bgColor = computed(() =>
    theme.value === 'dark' ? '#1c1c1e' : '#ffffff',
  )

  return { theme, bgColor }
}
