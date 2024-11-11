import type { Meta, StoryObj } from '@storybook/vue3'

import GiftProfile from './gift-profile.vue'

const meta = {
  title: 'Gift/Profile',
  component: GiftProfile,
  args: {
    style: { width: '115px' },
  },
} satisfies Meta<typeof GiftProfile>

export default meta
type Story = StoryObj<typeof meta>

export const DeliciousCake: Story = {
  args: {
    gift: {
      id: 1,
      name: 'Delicious Cake',
      totalQty: 10000,
      soldQty: 1,
      img: 'gift-delicious-cake',
      price: {
        amount: 10,
        asset: 'USDT',
      },
    },
    receivedGift: {
      _id: 'asdf',
      giftId: 1,
      ownerId: 1,
      senderFirstName: 'Name',
      purchasedAt: new Date().toISOString(),
      receivedAt: new Date().toISOString(),
      receiverId: 2,
      sentAt: new Date().toISOString(),
      status: 'received',
    },
  },
}

export const GreenStar: Story = {
  args: {
    gift: {
      id: 2,
      name: 'Green star',
      totalQty: 3000,
      soldQty: 1,
      img: 'gift-green-star',
      price: {
        amount: 5,
        asset: 'TON',
      },
    },
    receivedGift: {
      _id: 'asdf',
      giftId: 1,
      ownerId: 1,
      senderFirstName: 'Name',
      purchasedAt: new Date().toISOString(),
      receivedAt: new Date().toISOString(),
      receiverId: 2,
      sentAt: new Date().toISOString(),
      status: 'received',
    },
  },
}
