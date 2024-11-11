import type { Meta, StoryObj } from '@storybook/vue3'

import UiIcon from './ui-icon.vue'
import { ICONS } from './consts'

const meta = {
  title: 'UI/Icon',
  component: UiIcon,
  argTypes: {
    name: { control: 'select', options: ICONS },
    size: { control: 'select', options: ['sm', 'unset'] },
  },
} satisfies Meta<typeof UiIcon>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: { name: 'TON' },
}

export const Filled: Story = {
  args: { name: 'TON', filled: true },
}
