<script setup lang="ts">
import { watch } from 'vue'
import { useRouter } from 'vue-router'
import UiHero from '@/components/ui/ui-hero.vue'
import { useUserActions } from '@/composables/use-user-action'
import { useCurrentUser } from '@/composables/use-current-user'
import { formatDate } from '@/utils/date'
import ProfileActionRow from '@/components/profile-action-row.vue'
import { useMainButton } from '@/composables/use-main-button'
import { ROUTES } from '@/router'
import { useI18n } from 'vue-i18n'
import UiSpinner from '@/components/ui/ui-spinner.vue'

const { t } = useI18n()
const router = useRouter()
const mainButton = useMainButton()
const { currentUser } = useCurrentUser()
const { actions, loading } = useUserActions()

watch(loading, () => {
  if (!loading.value && actions.value.length === 0) {
    mainButton.showButton({
      text: t('button.open-store'),
      cb: () => {
        router.push({ name: ROUTES.store })
      },
    })
  } else {
    mainButton.hideButton()
  }
})
</script>

<template>
  <UiSpinner v-if="loading" class="spinner" size="lg" />
  <template v-else-if="actions.length === 0">
    <div class="no-results">
      <img class="no-results-img" src="/img/logo.png" />
      <UiHero
        :title="$t('history.empty')"
        :caption="$t('history.empty-text')"
      />
    </div>
  </template>
  <template v-else>
    <UiHero :title="$t('history.title')" :caption="$t('history.subtitle')" />
    <div v-for="{ date, events } in actions" :key="date">
      <div class="date caption caption--sm">{{ formatDate(date) }}</div>
      <ul>
        <ProfileActionRow
          v-for="action in events"
          :key="action._id"
          :action
          :current-user-id="currentUser!.telegramId"
        />
      </ul>
    </div>
  </template>
</template>

<style scoped>
.spinner {
  margin: auto;
}

.no-results {
  margin: auto;
  text-align: center;
}

.no-results-img {
  margin-bottom: -8px;
  width: 100px;
  height: 100px;
}

.date {
  padding: 24px 16px 12px;
  text-transform: uppercase;
}
</style>
