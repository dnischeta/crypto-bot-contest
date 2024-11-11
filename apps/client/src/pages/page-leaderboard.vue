<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useLeaderboard } from '@/composables/use-leaderboard'
import LeaderboardRow from '@/components/leaderboard-row.vue'
import UiSearch from '@/components/ui/ui-search.vue'
import { useCurrentUser } from '@/composables/use-current-user'
import { ROUTES } from '@/router'
import UiSpinner from '@/components/ui/ui-spinner.vue'

const router = useRouter()
const { search, leaderboard, loading } = useLeaderboard()
const { currentUser } = useCurrentUser()

async function goToUserProfile(userId: number) {
  await router.push({ name: ROUTES.profile, params: { id: userId } })
}
</script>

<template>
  <div class="leaderboard">
    <UiSearch v-model="search" />
    <UiSpinner v-if="loading" class="spinner" size="md" />
    <span v-else-if="leaderboard.length === 0" class="no-results caption"
      >No results</span
    >
    <ul v-else class="list">
      <LeaderboardRow
        v-for="row in leaderboard"
        :key="row.user.telegramId"
        :row
        :isCurrentUser="currentUser?.telegramId === row.user.telegramId"
        @click="goToUserProfile(row.user.telegramId)"
      />
    </ul>
  </div>
</template>

<style scoped>
.leaderboard {
  display: flex;
  flex-direction: column;
}

.spinner,
.no-results {
  margin: auto;
}
</style>
