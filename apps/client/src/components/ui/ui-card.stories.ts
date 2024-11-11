import type { Meta, StoryObj } from '@storybook/vue3'

import UiCard from './ui-card.vue'

const meta = {
  title: 'UI/Card',
  component: UiCard,
  argTypes: {
    size: { control: 'select', options: ['lg', 'sm'] },
  },
} satisfies Meta<typeof UiCard>

export default meta
type Story = StoryObj<typeof meta>

export const Large: Story = {
  args: { size: 'lg' },
}

export const Small: Story = {
  args: { size: 'sm' },
}
