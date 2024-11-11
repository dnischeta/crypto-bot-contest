import { useStorage } from '@vueuse/core'
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'

export function useLocale() {
  const i18n = useI18n()
  // We may use user language code by default
  // Now RU locale is not ready, so let's use en as default
  const locale = useStorage('GIFT_APP_LOCALE', 'en')

  watch(
    locale,
    () => {
      i18n.locale.value = locale.value
    },
    { immediate: true },
  )

  return { locale }
}
