import '../src/theme.css'
import '../src/index.css'
import type { Preview } from '@storybook/vue3'
import { setup } from '@storybook/vue3'
import { createI18n } from 'vue-i18n'
import { locales} from '../src/locales'

setup((app) => {
  app.use(createI18n({
    locale: 'en',
    messages: locales
  }))
})

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
