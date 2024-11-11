import type { Meta, StoryObj } from '@storybook/vue3'

import UiChip from './ui-chip.vue'

const meta = {
  title: 'UI/Chip',
  component: UiChip,
  args: {
    default: '562 of 1K',
  },
} satisfies Meta<typeof UiChip>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {}

export const Filled: Story = {
  args: { filled: true, default: '#12' },
}
