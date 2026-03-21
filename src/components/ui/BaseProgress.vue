<script setup lang="ts">
import { computed } from 'vue'

export interface BaseProgressProps {
  value: number
  color?: string
  height?: number
  showLabel?: boolean
}

const props = withDefaults(defineProps<BaseProgressProps>(), {
  color: 'var(--color-accent)',
  height: 8,
  showLabel: false,
})

const clampedValue = computed(() => Math.min(100, Math.max(0, props.value)))

const fillStyle = computed(() => ({
  width: `${clampedValue.value}%`,
  backgroundColor: props.color,
  height: `${props.height}px`,
}))

const trackStyle = computed(() => ({
  height: `${props.height}px`,
}))
</script>

<template>
  <div
    class="base-progress"
    role="progressbar"
    :aria-valuenow="clampedValue"
    aria-valuemin="0"
    aria-valuemax="100"
    :aria-label="`${clampedValue}% abgeschlossen`"
  >
    <div class="base-progress__track" :style="trackStyle">
      <div class="base-progress__fill" :style="fillStyle" />
    </div>
    <span
      v-if="showLabel"
      class="base-progress__label"
      aria-hidden="true"
    >
      {{ clampedValue }}%
    </span>
  </div>
</template>

<style scoped lang="scss">
.base-progress {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  width: 100%;

  &__track {
    flex: 1;
    background-color: var(--color-bg-tertiary);
    border-radius: var(--radius-full);
    overflow: hidden;
  }

  &__fill {
    border-radius: var(--radius-full);
    transition: width var(--duration-slow) var(--ease-out);
    min-width: 0;
  }

  &__label {
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text-secondary);
    min-width: 3.5ch;
    text-align: right;
    flex-shrink: 0;
  }
}
</style>
