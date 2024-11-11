<script setup lang="ts">
import { computed, toRef } from 'vue'
import { Starport } from 'vue-starport'
import { useAvatar } from '@/composables/use-avatar'
import type { UserRank } from '@crypto-bot-contest/types'
import UiRow from './ui/ui-row.vue'
import UiAvatar from './ui/ui-avatar.vue'
import UiIcon from './ui/ui-icon.vue'
import UiChip from './ui/ui-chip.vue'

const props = defineProps<{ row: UserRank; isCurrentUser?: boolean }>()

const user = toRef(() => props.row.user)

const avatar = useAvatar(user)

const name = computed(() => {
  const firstLast = [user.value.firstName, user.value.lastName]
    .filter(Boolean)
    .join(' ')

  return firstLast.length > 0 ? firstLast : user.value.username
})
</script>

<template>
  <UiRow>
    <template #prepend>
      <Starport
        :port="row.user.telegramId.toString(10)"
        :duration="300"
        style="width: 40px; height: 40px"
        keep-alive
      >
        <UiAvatar
          :user="row.user"
          :src="avatar.avatarSrc.value"
          :loading="avatar.loading.value"
          :error="avatar.isError.value"
        />
      </Starport>
    </template>
    <div class="name-wrapper">
      <h2 class="name">{{ name }}</h2>
      <UiChip v-if="isCurrentUser" filled sm>{{ $t('general.you') }}</UiChip>
    </div>
    <div class="gifts-qty">
      <UiIcon name="gift" size="sm" />
      {{
        $tc('leaderboard.gifts-qty', user.receivedGiftCount, {
          qty: user.receivedGiftCount,
        })
      }}
    </div>
    <template #append
      ><span class="rank">#&nbsp;{{ row.position }}</span></template
    >
  </UiRow>
</template>

<style scoped>
.name-wrapper {
  display: flex;
  align-items: center;
  gap: 6px;
}

.name {
  font-weight: 500;
}

.gifts-qty {
  display: flex;
  align-items: center;
  color: var(--color-accent-blue);
  gap: 6px;
  font-size: var(--font-size-md);
  line-height: var(--line-height-sm);
  font-weight: var(--font-weight-regular);
  letter-spacing: var(--letter-spacing-normal);
}

.rank {
  color: var(--color-label-secondary);
}
</style>
