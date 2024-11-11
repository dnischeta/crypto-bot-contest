import type { Meta, StoryObj } from '@storybook/vue3'

import UiNotification from './ui-notification.vue'
import { ICONS } from './consts'

const meta = {
  title: 'UI/Notification',
  component: UiNotification,
  argTypes: {
    iconName: { control: 'select', options: ICONS },
  },
  args: {
    title: 'You Bought a Gift',
    caption: 'Now send it to your friend.',
    buttonText: 'Send',
    iconName: 'gift-delicious-cake',
  },
} satisfies Meta<typeof UiNotification>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {}

export const NoCaption: Story = {
  args: {
    caption: undefined,
  },
}

export const NoIcon: Story = {
  args: {
    iconName: undefined,
  },
}

export const NoButton: Story = {
  args: {
    buttonText: undefined,
  },
}
