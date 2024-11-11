import type { Meta, StoryObj } from '@storybook/vue3'

import UiSpinner from './ui-spinner.vue'

const meta = {
  title: 'UI/Spinner',
  component: UiSpinner,
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof UiSpinner>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {}
