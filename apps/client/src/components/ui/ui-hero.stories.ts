import type { Meta, StoryObj } from '@storybook/vue3'

import UiHero from './ui-hero.vue'
import { ICONS } from './consts'

const meta = {
  title: 'UI/Hero',
  component: UiHero,
  argTypes: {
    icon: { control: 'select', options: ICONS },
  },
} satisfies Meta<typeof UiHero>

export default meta
type Story = StoryObj<typeof meta>

export const WithIcon: Story = {
  args: { title: 'Buy and Send Gifts', icon: 'gift' },
}

export const WithIconAndCaption: Story = {
  args: {
    title: 'Buy and Send Gifts',
    icon: 'gift',
    caption: 'Unique gifts for everyone by Crypto Pay.',
  },
}

export const NoIcon: Story = {
  args: {
    title: 'Buy and Send Gifts',
    caption: 'Unique gifts for everyone by Crypto Pay.',
  },
}
