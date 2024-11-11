<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, shallowRef, watch } from 'vue'
import lottie from 'lottie-web'
import type { AnimationItem } from 'lottie-web'
import { animationsCache } from './ui-lottie-cache'
import type { Animation } from './consts'
import { assetUrl } from '@/utils/asset-url'

const DESTROY_TIMEOUT = 300

const props = withDefaults(
  defineProps<{
    name: Animation
    size?: 'sm' | 'md' | 'lg'
    loop?: boolean
    autoplay?: boolean
    inheritColor?: boolean
    loopTimeout?: number
    lazy?: boolean
  }>(),
  {
    loop: true,
    autoplay: true,
    loopTimeout: 1000,
    lazy: true,
  },
)

const el = ref<HTMLDivElement>()
const animation = shallowRef<AnimationItem>()
const observer = shallowRef<IntersectionObserver>()

watch(
  () => props.name,
  () => {
    if (!animation.value) {
      return
    }

    animation.value.destroy()
    createAnimation()
  },
)

onMounted(() => {
  if (!props.lazy) {
    loadAndCreateAnimation()
    return
  }

  observer.value = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      loadAndCreateAnimation()
      observer.value?.disconnect()
      observer.value = undefined
    }
  })

  observer.value.observe(el.value!)
})

onUnmounted(() => {
  observer.value?.disconnect()
  setTimeout(() => {
    animation.value?.destroy()
  }, DESTROY_TIMEOUT)
})

async function loadAndCreateAnimation() {
  if (!animationsCache[props.name]) {
    const response = await fetch(assetUrl(`/animations/${props.name}.json`))
    animationsCache[props.name] = await response.json()
  }

  createAnimation()
}

function createAnimation() {
  animation.value = lottie.loadAnimation({
    container: el.value!,
    animationData: animationsCache[props.name],
    loop: props.loop && props.loopTimeout === 0,
    autoplay: props.autoplay,
  })

  if (props.loop && props.loopTimeout) {
    animation.value.addEventListener('complete', () => {
      setTimeout(() => {
        animation.value?.stop()
        animation.value?.play()
      }, props.loopTimeout)
    })
  }
}

function run() {
  if (!animation.value) {
    return
  }

  animation.value.stop()
  animation.value.play()
}

defineExpose({ run })
</script>

<template>
  <div
    ref="el"
    :class="[
      'lottie',
      size ? `lottie--${size}` : null,
      inheritColor ? 'lottie--inherit-color' : null,
    ]"
  />
</template>

<style scoped>
.lottie.lottie--inherit-color :deep(svg path) {
  fill: currentColor !important;
}

.lottie--sm {
  width: 26px;
  height: 26px;
}

.lottie-md {
  width: 80px;
  height: 80px;
}

.lottie--lg {
  width: 128px;
  height: 128px;
}

.lottie path {
  fill: red !important;
}
</style>
