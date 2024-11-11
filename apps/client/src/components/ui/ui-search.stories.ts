import type { Meta, StoryObj } from '@storybook/vue3'

import UiSearch from './ui-search.vue'
import { ref } from 'vue'

const meta = {
  title: 'UI/Search',
  render: () => ({
    components: { UiSearch },
    setup() {
      const search = ref('')
      return { search }
    },
    template: `<UiSearch v-model="search" />`,
  }),
} satisfies Meta<typeof UiSearch>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {}
