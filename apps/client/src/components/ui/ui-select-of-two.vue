<script setup lang="ts">
import { useVModel } from '@vueuse/core'
export type Option = { html: string; value: string }

const props = defineProps<{
  alt: string
  options: [Option, Option]
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [string]
}>()

const model = useVModel(props, 'modelValue', emit)

function toggle() {
  emit(
    'update:modelValue',
    props.options.find(o => o.value != props.modelValue)!.value,
  )
}
</script>

<template>
  <div class="select-of-two" @click.self="toggle">
    <div v-for="option in options" :key="option.value" class="option">
      <input
        v-model="model"
        class="option-input"
        type="radio"
        :id="option.value"
        :value="option.value"
      />
      <label class="option-label" :for="option.value" v-html="option.html" />
    </div>
  </div>
</template>

<style scoped>
.select-of-two {
  display: inline-flex;
  padding: 2px;
  cursor: pointer;
  background-color: var(--color-bg-secondary);
  border-radius: 100px;
}

.option {
  position: relative;
}

.option-input {
  position: absolute;
  opacity: 0;
  width: 1em;
  height: 1em;
}

.option-label {
  height: 100%;
  display: inline-flex;
  align-items: center;
  padding: 3px 10px;
  font-size: var(--font-size-base);
  line-height: var(--line-height-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-label-secondary);
  border-radius: 100px;
}

.option-input:checked + .option-label {
  background-color: var(--color-white);
  color: var(--color-black);
}
</style>
