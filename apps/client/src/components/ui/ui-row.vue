<template>
  <li class="row">
    <slot name="prepend" />
    <div class="info">
      <slot />
    </div>
    <div v-if="$slots.append" class="append">
      <slot name="append" />
    </div>
  </li>
</template>

<style scoped>
.row {
  position: relative;
  padding: 8px 16px;
  display: flex;
}

.row::after {
  content: '';
  position: absolute;
  bottom: 0;
  right: 16px;
  left: calc(16px + 40px + 16px);
  border-bottom: solid 0.33px var(--color-separator);
}

.info {
  margin: 0 auto 0 16px;
}

.append {
  align-self: center;
  font-size: 15px;
  line-height: 22px;
  font-weight: 510;
}
</style>
