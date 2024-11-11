import type { Meta, StoryObj } from '@storybook/vue3'

import UiDrawer from './ui-drawer.vue'

const meta = {
  title: 'UI/Drawer',
  component: UiDrawer,
  args: { default: 'Drawer content' },
} satisfies Meta<typeof UiDrawer>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    mainButtonText: 'Send Gift',
  },
}
