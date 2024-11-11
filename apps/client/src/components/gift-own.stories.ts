import type { Meta, StoryObj } from '@storybook/vue3'

import GiftOwn from './gift-own.vue'

const meta = {
  title: 'Gift/Purchased',
  component: GiftOwn,
  args: {
    style: { width: '115px' },
  },
} satisfies Meta<typeof GiftOwn>

export default meta
type Story = StoryObj<typeof meta>

export const DeliciousCake: Story = {
  args: {
    gift: {
      id: 1,
      name: 'Delicious Cake',
      totalQty: 10000,
      soldQty: 5000,
      img: 'gift-delicious-cake',
      price: {
        amount: 10,
        asset: 'USDT',
      },
    },
    purchasedGift: {
      _id: '1',
      giftId: 1,
      ownerId: 1,
      purchasedAt: '2024-01-01',
      status: 'purchased',
    },
  },
}

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
    purchasedGift: {
      _id: '2',
      giftId: 2,
      ownerId: 1,
      purchasedAt: '2024-01-01',
      status: 'purchased',
    },
  },
}
