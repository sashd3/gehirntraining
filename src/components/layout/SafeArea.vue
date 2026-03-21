<script setup lang="ts">
export interface SafeAreaProps {
  top?: boolean
  bottom?: boolean
}

withDefaults(defineProps<SafeAreaProps>(), {
  top: false,
  bottom: false,
})
</script>

<template>
  <div
    class="safe-area"
    :class="{
      'safe-area--top': top,
      'safe-area--bottom': bottom,
    }"
  >
    <slot />
  </div>
</template>

<style scoped lang="scss">
.safe-area {
  &--top {
    padding-top: var(--safe-area-top);
  }

  &--bottom {
    padding-bottom: var(--safe-area-bottom);
  }
}
</style>
