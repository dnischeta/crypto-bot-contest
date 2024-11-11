import './styles/theme.css'
import './styles/typography.css'
import './index.css'

import { createReatomVue } from '@reatom/npm-vue'
import { retrieveLaunchParams } from '@telegram-apps/sdk-vue'
import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import { locales } from './locales'
import App from './App.vue'
import router from './router'
import { init } from './init'
import { ctx as reatomCtx } from './model/index'
import { log } from './utils/logger'
import UiErrorNotification from './components/ui/ui-error-notification.vue'

import './mockEnv.ts'

const lp = retrieveLaunchParams()
init(lp.startParam === 'debug')

const app = createApp(App)

app.config.errorHandler = (err, instance, info) => {
  log(err as Error, {
    componentInfo: info,
    componentName: instance?.$.type.name,
  })

  const errorNotification = createApp(UiErrorNotification, {
    message: 'Something went wrong. Please try again.',
    duration: 5000,
  })

  const errorContainer = document.createElement('div')
  document.body.appendChild(errorContainer)
  errorNotification.mount(errorContainer)
}

window.addEventListener('unhandledrejection', event => {
  log(event.reason, { type: 'unhandledRejection' })

  const errorNotification = createApp(UiErrorNotification, {
    message: 'Network error. Please check your connection.',
    duration: 5000,
  })

  const errorContainer = document.createElement('div')
  document.body.appendChild(errorContainer)
  errorNotification.mount(errorContainer)
})

app.use(
  createI18n({
    locale: lp.initData?.user?.languageCode,
    fallbackLocale: 'en',
    messages: locales,
  }),
)

app.use(createReatomVue(reatomCtx))
app.use(router)
app.mount('#app')
