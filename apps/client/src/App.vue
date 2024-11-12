<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import { StarportCarrier } from 'vue-starport'
import { reatomRef, useAction } from '@reatom/npm-vue'
import { retrieveLaunchParams, postEvent } from '@telegram-apps/sdk-vue'
import UiPage from './components/ui/ui-page.vue'
import { login } from './model/user'
import { fetchGifts } from './model/gift'
import UiNavigation from './components/ui/ui-navigation.vue'
import { usePlatform } from './composables/use-platform'
import { useInitApp } from './composables/use-init-app'
import { useScrollPosition } from './composables/use-scroll-position'
import { ROUTES } from './router'
import { useMainButton } from './composables/use-main-button'
import { useI18n } from 'vue-i18n'
import { useLocale } from './composables/use-locale'
import { useInitTheme } from './composables/use-theme'
import UiSpinner from './components/ui/ui-spinner.vue'

useInitTheme()
useLocale()
const { t } = useI18n()
const { isMainButtonVisible } = useMainButton()
const loginBound = useAction(login)
const fetchGiftsBound = useAction(fetchGifts)
const fetchingGifts = reatomRef(fetchGifts.pendingAtom)
const route = useRoute()
const { processStartParam } = useInitApp()
const scrollEl = ref<{ getScrollTop: () => number | undefined }>()
const { scrollTop } = useScrollPosition(scrollEl)

const navItems = computed(() => [
  {
    name: ROUTES.store,
    text: t('navigation.store'),
    to: { name: ROUTES.store },
  },
  {
    name: ROUTES.ownGifts,
    text: t('navigation.own-gifts'),
    to: { name: ROUTES.ownGifts },
  },
  {
    name: ROUTES.leaderboard,
    text: t('navigation.leaderboard'),
    to: { name: ROUTES.leaderboard },
  },
  { name: ROUTES.me, text: t('navigation.profile'), to: { name: ROUTES.me } },
])

const navigationVisible = computed(() => {
  if (!route.name) {
    return false
  }

  return [
    ROUTES.store,
    ROUTES.ownGifts,
    ROUTES.leaderboard,
    ROUTES.me,
    ROUTES.profile,
  ].includes(route.name as ROUTES)
})

postEvent('web_app_expand')

const ready = ref(false)

const launchParams = retrieveLaunchParams()

const { isMobile } = usePlatform()

loginBound(launchParams.initDataRaw)
  .then(() => Promise.all([fetchGiftsBound(), processStartParam()]))
  .then(() => {
    ready.value = true
  })
</script>

<template>
  <StarportCarrier>
    <UiPage
      ref="scrollEl"
      :mobile="isMobile"
      :is-main-button-visible="isMainButtonVisible"
      :scrollTop="scrollTop"
    >
      <RouterView v-if="ready && !fetchingGifts" />
      <UiSpinner v-else size="lg" style="margin: auto" />
    </UiPage>
  </StarportCarrier>
  <Teleport to="#footer">
    <UiNavigation v-show="navigationVisible" :items="navItems" />
  </Teleport>
</template>
