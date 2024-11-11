import type { Meta, StoryObj } from '@storybook/vue3'

import UiLottie from './ui-lottie.vue'
import { ANIMATIONS } from './consts'

const meta = {
  title: 'UI/Lottie',
  component: UiLottie,
  argTypes: {
    name: { control: 'select', options: ANIMATIONS },
  },
  args: {
    name: ANIMATIONS[0],
    size: 'lg',
  },
} satisfies Meta<typeof UiLottie>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {}
