import type { Meta, StoryObj } from '@storybook/vue3'
import { vueRouter } from 'storybook-vue3-router'

import UiButton from './ui-button.vue'
import { ICONS } from './consts'

const meta = {
  title: 'UI/Button',
  component: UiButton,
  decorators: [vueRouter()],
  argTypes: {
    icon: { control: 'select', options: ICONS },
  },
  args: {
    default: 'Click',
  },
} satisfies Meta<typeof UiButton>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {}

export const Disabled: Story = {
  args: { disabled: true },
}

export const WithIcon: Story = {
  args: {
    icon: 'TON',
    default: '1000 TON',
  },
}

export const Link: Story = {
  args: {
    to: { path: '/' },
    icon: 'TON',
    default: '1000 TON',
  },
}

export const FullWidth: Story = {
  args: {
    default: 'Send Gift',
    fullWidth: true,
  },
}

export const Text: Story = {
  args: { variant: 'text' },
}

export const TextDisabled: Story = {
  args: { variant: 'text', disabled: true },
}
