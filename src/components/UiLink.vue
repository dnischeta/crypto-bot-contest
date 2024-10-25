<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { openLink } from '@telegram-apps/sdk-vue';

const props = defineProps({
  // @ts-expect-error Route customization
  ...RouterLink.props,
  inactiveClass: String,
});

const isExternalLink = computed(() => {
  if (typeof props.to !== 'string') {
    return false;
  }
  
  // Compute if target path is external. In this case we would like to open link using
  // TMA method.
  const targetUrl = new URL(props.to, window.location.toString());
  const currentUrl = new URL(window.location.toString());
  
  return targetUrl.protocol !== currentUrl.protocol
    || targetUrl.host !== currentUrl.host;
})

function onExternalLinkClick() {
  openLink(props.to);
}
</script>

<template>
  <!-- @vue-expect-error -->
  <a
    v-if="isExternalLink"
    v-bind="$attrs"
    class="link"
    :href="to"
    @click.prevent="onExternalLinkClick"
  >
    <slot />
  </a>
  <!-- @vue-expect-error -->
  <RouterLink
    v-else
    v-bind="{...$props, ...$attrs}"
    class="link"
  >
    <slot />
  </RouterLink>
</template>

<style scoped>
.link {
  text-decoration: none;
  color: var(--tg-theme-link-color);
}
</style>