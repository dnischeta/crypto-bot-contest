<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { reatomRef } from '@reatom/npm-vue'
import { Starport } from 'vue-starport'

import { ROUTES } from '@/router'

import UiAvatar from '@/components/ui/ui-avatar.vue'
import GiftProfile from '@/components/gift-profile.vue'
import NoGifts from '@/components/no-results.vue'
import UiButton from '@/components/ui/ui-button.vue'
import UiSelectOfTwo from '@/components/ui/ui-select-of-two.vue'
import UiSpinner from '@/components/ui/ui-spinner.vue'
import type { Option } from '@/components/ui/ui-select-of-two.vue'
import { THEME_DARK_ICON, THEME_LIGHT_ICON } from '@/components/ui/consts'

import { useAvatar } from '@/composables/use-avatar'
import { useReceivedGifts } from '@/composables/use-receiced-gifts'
import { useProfile } from '@/composables/use-profile'
import { useLocale } from '@/composables/use-locale'
import { useTheme } from '@/composables/use-theme'

import { currentUserAtom } from '@/model/user'
import { getGiftMetaById } from '@/model/gift'

const themeOptions: [Option, Option] = [
  { value: 'light', html: THEME_LIGHT_ICON },
  { value: 'dark', html: THEME_DARK_ICON },
]
const langOptions: [Option, Option] = [
  { value: 'en', html: 'EN' },
  { value: 'ru', html: 'RU' },
]

const { locale } = useLocale()
const route = useRoute()
const { theme } = useTheme()

const currentUser = reatomRef(currentUserAtom)

const id = computed(() => {
  if (!route.params.id) {
    return currentUser.value!.telegramId
  }

  return parseInt(route.params.id as string, 10)
})

const { profile, profileAtom, loading, userRank } = useProfile(id)
const avatar = useAvatar(profile)
const gifts = useReceivedGifts(profileAtom)

const noGifts = computed(() => gifts.gifts.value?.length === 0)
const isOwnProfile = computed(
  () => profile.value?.telegramId === currentUser.value?.telegramId,
)
</script>

<template>
  <UiSpinner v-if="loading" size="lg" style="margin: auto" />
  <div v-else-if="profile">
    <div class="head">
      <div class="head-section">
        <UiSelectOfTwo
          v-if="isOwnProfile"
          v-model="theme"
          alt="Theme select"
          :options="themeOptions"
        />
        <Starport
          class="avatar"
          :port="profile.telegramId.toString(10)"
          :duration="250"
          style="width: 100px; height: 100px"
        >
          <UiAvatar
            :user="profile"
            :src="avatar.avatarSrc.value"
            :loading="avatar.loading.value"
            :error="avatar.isError.value"
            size="lg"
            :chip="userRank ? `#${userRank.position}` : undefined"
          />
        </Starport>
        <UiSelectOfTwo
          v-if="isOwnProfile"
          v-model="locale"
          alt="Language select"
          :options="langOptions"
        />
      </div>
      <h1 class="name">{{ profile.firstName }}</h1>
      <span class="gifts-qty caption"
        >{{
          $tc('profile.gift-received-qty', profile.receivedGiftCount, {
            qty: profile.receivedGiftCount,
          })
        }}
      </span>
      <UiButton
        v-if="isOwnProfile"
        class="recent-actions"
        :to="{ name: ROUTES.history }"
        variant="text"
        >{{ $t('history.title') }}</UiButton
      >
    </div>
    <UiSpinner v-if="gifts.loading.value" class="spinner" size="md" />
    <NoGifts v-else-if="noGifts">
      {{
        isOwnProfile
          ? $t('profile.no-gifts-message-own')
          : $t('profile.no-gifts-message', { name: profile.firstName })
      }}
    </NoGifts>
    <ul v-else class="gifts-list">
      <li v-for="gift in gifts.gifts.value" :key="gift._id">
        <GiftProfile
          :gift="getGiftMetaById(gift.giftId)!"
          :received-gift="gift"
        />
      </li>
    </ul>
  </div>
</template>

<style scoped>
.head {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;
  margin-bottom: 16px;
}

.head-section {
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.head-section *:last-child {
  margin-left: auto;
}

.head-section *:first-child {
  margin-right: auto;
}

.name {
  line-height: var(--line-height-xl);
  margin: 20px 0 4px;
}

.gifts-qty {
  margin-bottom: 24px;
}

.recent-actions {
  font-size: var(--font-size-xl);
  line-height: var(--line-height-lg);
  height: var(--line-height-lg);
  font-weight: var(--font-weight-semibold);
}

.spinner {
  margin: auto;
}

.gifts-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  padding: 8px 16px;
}
</style>
