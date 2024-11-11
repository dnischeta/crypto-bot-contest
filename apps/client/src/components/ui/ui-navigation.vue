<script setup lang="ts">
import { useRoute, RouterLink } from 'vue-router'
import type { RouterLinkProps } from 'vue-router'
import { ref } from 'vue'
import UiLottie from './ui-lottie.vue'
import type { Animation } from './consts'
import { watch } from 'vue'

defineProps<{
  items: Array<{ name: string; to: RouterLinkProps['to']; text: string }>
}>()

const activeName = ref('')

const nameToAnimation: Record<string, Animation> = {
  gift: 'tab-gifts',
  leaderboard: 'tab-leaderboard',
  store: 'tab-store',
  me: 'tab-profile',
}

const animationRefs: Record<string, { run(): void }> = {}
const route = useRoute()

watch(
  () => route.name,
  (to, from) => {
    if (to !== from) {
      activeName.value = to as string
      animationRefs[to as string]?.run()
    }
  },
  { immediate: true },
)

function register(el: { run: () => void }, name: string) {
  animationRefs[name] = el
}
</script>

<template>
  <nav class="navigation">
    <ul class="navigation-list">
      <li v-for="item in items" :key="item.name">
        <RouterLink
          class="navigation-item"
          :class="{ 'navigation-item--active': activeName === item.name }"
          :to="item.to"
        >
          <!-- @vue-expect-error -->
          <UiLottie
            :ref="el => register(el, item.name)"
            class="navigation-item-img"
            :name="nameToAnimation[item.name] ?? 'tab-gifts'"
            :autoplay="false"
            :loop="false"
            inherit-color
          />
          <span class="navigation-item-text">{{ item.text }}</span>
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.navigation {
  background-color: var(--color-bg-tab-bar);
  padding-top: 8px;
}

.navigation-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

.navigation-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 10px;
  line-height: 12px;
  font-weight: 500;
  padding: 4px 0;
}

.navigation-item,
.navigation-item:active,
.navigation-item:visited {
  color: var(--color-label-tab-bar);
  text-decoration: none;
}

@keyframes text-activation {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-2px);
  }
  100% {
    transform: translateY(0);
  }
}

.navigation-item.navigation-item--active .navigation-item-text {
  animation-name: text-activation;
  animation-duration: 250ms;
}

.navigation-item.navigation-item--active,
.navigation-item.navigation-item--active:active,
.navigation-item.navigation-item--active:visited {
  color: var(--color-primary);
}

.navigation-item-img {
  width: 26px;
  height: 26px;
  margin-bottom: 4px;
}
</style>
