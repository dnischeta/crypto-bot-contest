import type { Meta, StoryObj } from '@storybook/vue3'
import { vueRouter } from 'storybook-vue3-router'
import { createMemoryHistory } from 'vue-router'

import UiNavigation from './ui-navigation.vue'

const meta = {
  title: 'UI/Navigation',
  component: UiNavigation,
  decorators: [
    vueRouter([], {
      vueRouterOptions: {
        routes: [
          { name: 'store', path: '/', component: () => {} },
          { name: 'gifts', path: '/gifts', component: () => {} },
          { name: 'leaderboard', path: '/leaderboard', component: () => {} },
          { name: 'me', path: '/me', component: () => {} },
        ],
        history: createMemoryHistory(),
      },
    }),
  ],
} satisfies Meta<typeof UiNavigation>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    items: [
      { name: 'store', text: 'Store', to: { name: 'store' } },
      { name: 'gifts', text: 'Gifts', to: { name: 'gifts' } },
      { name: 'leaderboard', text: 'Leaderboard', to: { name: 'leaderboard' } },
      { name: 'me', text: 'Profile', to: { name: 'me' } },
    ],
  },
}
