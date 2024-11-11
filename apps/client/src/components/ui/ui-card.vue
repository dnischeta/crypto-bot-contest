<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ size: 'lg' | 'sm'; accentColor?: string }>()

// accentColor supports only #RRGGBB format
// TODO: support other formats
const accentBackground = computed(() => {
  if (!props.accentColor) {
    return 'var(--color-bg-secondary)'
  }

  return `linear-gradient(to top, ${props.accentColor}1A, ${props.accentColor}33)`
})
</script>

<template>
  <article
    :class="['card', `card--${size}`, { ['card--accent']: accentColor }]"
  >
    <div v-if="accentColor" class="card-accent" />
    <div v-if="$slots.head" class="head caption caption--sm">
      <slot name="head" />
    </div>
    <div class="body">
      <slot />
    </div>
    <div v-if="$slots.footer" class="footer">
      <slot name="footer" />
    </div>
  </article>
</template>

<style scoped>
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 12px;
  padding: 8px 12px 12px;
  text-align: center;
  aspect-ratio: 1/1.4;
}

.card:not(.card--accent) {
  background: var(--color-bg-secondary);
}

.card--lg {
  padding-bottom: 16px;
  background-size: cover;
  background-image: url(/img/bg-tg-pattern.png);
  background-position: center;
  background-repeat: no-repeat;
}

.card-accent {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: v-bind(accentBackground);
  border-radius: 12px;
}

.head {
  margin-bottom: 4px;
  display: flex;
  justify-content: center;
  align-self: stretch;
}

.card--lg .head {
  margin-bottom: 8px;
}

.body {
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.body:not(:last-child) {
  margin-bottom: 8px;
}

.card--lg .body:not(:last-child) {
  margin-bottom: 12px;
}

.footer {
  margin-top: auto;
}
</style>
