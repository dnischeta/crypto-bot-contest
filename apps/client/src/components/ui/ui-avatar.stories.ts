import type { Meta, StoryObj } from '@storybook/vue3'

import UiAvatar from './ui-avatar.vue'

const meta = {
  title: 'UI/Avatar',
  component: UiAvatar,
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
  args: {
    src: 'https://via.placeholder.com/150',
    user: {
      firstName: 'Marcus',
      telegramId: 1234,
      lastName: 'Aurelius',
    },
  },
} satisfies Meta<typeof UiAvatar>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {}

export const SizeSm: Story = { args: { size: 'sm' } }

export const SizeLg: Story = { args: { size: 'lg' } }

export const Placeholder: Story = { args: { src: null } }

export const WithChip: Story = {
  args: {
    size: 'lg',
    chip: '#169',
  },
}
