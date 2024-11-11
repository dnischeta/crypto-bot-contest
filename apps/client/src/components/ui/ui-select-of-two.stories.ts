import type { Meta, StoryObj } from '@storybook/vue3'

import UiSelectOfTwo from './ui-select-of-two.vue'
import { ref } from 'vue'
import { THEME_DARK_ICON, THEME_LIGHT_ICON } from './consts'

const meta = {
  title: 'UI/SelectOfTwo',
  args: {
    alt: 'Select language',
    options: [
      { value: 'en', html: 'EN' },
      { value: 'ru', html: 'RU' },
    ],
  },
  render: args => ({
    components: { UiSelectOfTwo },
    setup() {
      const mv = ref(args.options[0].value)

      return { args, mv }
    },
    template: `
            <div>
                Value is {{ mv }} <br>
                <UiSelectOfTwo v-model="mv" v-bind="args" />
            </div>
        `,
  }),
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const LanguageSelect: Story = {}

export const ThemeSelect: Story = {
  args: {
    alt: 'Theme select',
    options: [
      {
        value: 'light',
        html: THEME_LIGHT_ICON,
      },
      {
        value: 'dark',
        html: THEME_DARK_ICON,
      },
    ],
  },
}
