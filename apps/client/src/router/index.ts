import { createRouter, createWebHistory } from 'vue-router'
import { backButton } from '@telegram-apps/sdk-vue'
import StorePage from '@/pages/page-store.vue'
import StoreGiftPage from '@/pages/page-store-gift.vue'
import GiftsPage from '@/pages/page-own-gifts.vue'
import GiftPurchasedPage from '@/pages/page-gift-purchased.vue'
import ProfilePage from '@/pages/page-profile.vue'
import GiftReceivedPage from '@/pages/page-gift-received.vue'
import LeaderboardPage from '@/pages/page-leaderboard.vue'
import RecentActionsPage from '@/pages/page-history.vue'

export enum ROUTES {
  store = 'store',
  storeGift = 'storeGift',

  ownGifts = 'ownGifts',

  leaderboard = 'leaderboard',
  profile = 'profile',

  me = 'me',
  history = 'history',

  giftPurchased = 'giftPurchased',
  giftReceived = 'giftReceived',
}

export const routes = [
  {
    path: '/',
    name: ROUTES.store,
    component: StorePage,
  },
  {
    path: '/:id',
    name: ROUTES.storeGift,
    component: StoreGiftPage,
  },

  { path: '/gifts', name: ROUTES.ownGifts, component: GiftsPage },

  {
    path: '/leaderboard',
    name: ROUTES.leaderboard,
    component: LeaderboardPage,
  },
  { path: '/profile/:id', name: ROUTES.profile, component: ProfilePage },

  { path: '/me', name: ROUTES.me, component: ProfilePage },
  { path: '/me/recent', name: ROUTES.history, component: RecentActionsPage },

  {
    path: '/purchased/:id',
    name: ROUTES.giftPurchased,
    component: GiftPurchasedPage,
  },
  {
    path: '/received/:id',
    name: ROUTES.giftReceived,
    component: GiftReceivedPage,
  },
]

const router = createRouter({
  routes,
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  },
})

let offClick: () => void
router.afterEach(to => {
  if (
    [ROUTES.store, ROUTES.ownGifts, ROUTES.leaderboard, ROUTES.me].includes(
      to.name as ROUTES,
    )
  ) {
    if (offClick) {
      offClick()
    }
    backButton.hide()
  } else {
    backButton.show()
    offClick = backButton.onClick(() => {
      router.go(-1)
    })
  }
})

export default router
