import type { Meta, StoryObj } from '@storybook/vue3'

import UiTable from './ui-table.vue'
const meta = {
  title: 'UI/Table',
  component: UiTable,
  args: {
    rows: [
      { title: 'Gift', value: 'Delicious Cake' },
      { title: 'Date', value: '06.10.2024 at 00:04' },
      { title: 'Price', value: '1 TON' },
      { title: 'Availability', value: '3 of 10' },
    ],
  },
} satisfies Meta<typeof UiTable>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {}
