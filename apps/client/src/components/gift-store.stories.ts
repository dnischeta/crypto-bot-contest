import type { Meta, StoryObj } from '@storybook/vue3'
import { vueRouter } from 'storybook-vue3-router'
import { StarportCarrier } from 'vue-starport'

import GiftStore from './gift-store.vue'
import { createMemoryHistory } from 'vue-router'

const meta = {
  title: 'Gift/Store',
  component: GiftStore,
  decorators: [
    vueRouter([], {
      vueRouterOptions: {
        routes: [{ name: 'gift', path: '/', component: () => {} }],
        history: createMemoryHistory(),
      },
    }),
    () => ({
      components: { StarportCarrier },
      template: '<starport-carrier><story /></starport-carrier>',
    }),
  ],
  args: {
    style: { width: '174px' },
  },
} satisfies Meta<typeof GiftStore>

export default meta
type Story = StoryObj<typeof meta>

export const GreenStar: Story = {
  args: {
    gift: {
      id: 2,
      name: 'Green star',
      totalQty: 3000,
      soldQty: 802,
      img: 'gift-green-star',
      price: {
        amount: 5,
        asset: 'TON',
      },
    },
  },
}

export const SoldOut: Story = {
  args: {
    gift: {
      id: 2,
      name: 'Green star',
      totalQty: 3000,
      soldQty: 3000,
      img: 'gift-green-star',
      price: {
        amount: 5,
        asset: 'TON',
      },
      accentColor: '#FE9F41',
    },
  },
}

export const GreenStarWithAccentColor: Story = {
  args: {
    gift: {
      id: 2,
      name: 'Green star',
      totalQty: 3000,
      soldQty: 802,
      img: 'gift-green-star',
      price: {
        amount: 5,
        asset: 'TON',
      },
      accentColor: '#FE9F41',
    },
  },
}

export const OnlyImage: Story = {
  args: {
    onlyImg: true,
    gift: {
      id: 2,
      name: 'Green star',
      totalQty: 3000,
      soldQty: 802,
      img: 'gift-green-star',
      price: {
        amount: 5,
        asset: 'TON',
      },
      accentColor: '#FE9F41',
    },
  },
}
