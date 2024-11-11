import type { Meta, StoryObj } from '@storybook/vue3'

import UiCloseButton from './ui-close-button.vue'

const meta = {
  title: 'UI/CloseButton',
  component: UiCloseButton,
} satisfies Meta<typeof UiCloseButton>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {}
