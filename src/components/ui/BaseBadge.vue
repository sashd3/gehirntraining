<script setup lang="ts">
export interface BaseBadgeProps {
  variant?: 'success' | 'warning' | 'info' | 'neutral'
  size?: 'sm' | 'md'
}

withDefaults(defineProps<BaseBadgeProps>(), {
  variant: 'neutral',
  size: 'md',
})
</script>

<template>
  <span
    class="base-badge"
    :class="[`base-badge--${variant}`, `base-badge--${size}`]"
  >
    <slot />
  </span>
</template>

<style scoped lang="scss">
.base-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: var(--font-weight-semibold);
  line-height: 1;
  white-space: nowrap;
  border-radius: var(--radius-full);

  // ---- Sizes ----

  &--sm {
    padding: 2px var(--space-xs);
    font-size: var(--font-size-xs);
    min-height: 22px;
  }

  &--md {
    padding: 4px var(--space-sm);
    font-size: var(--font-size-sm);
    min-height: 28px;
  }

  // ---- Variants ----

  &--success {
    background-color: var(--color-success-bg);
    color: var(--color-success-text);
  }

  &--warning {
    background-color: var(--color-warning-bg);
    color: var(--color-warning-text);
  }

  &--info {
    background-color: var(--color-info-bg);
    color: var(--color-info-text);
  }

  &--neutral {
    background-color: var(--color-bg-tertiary);
    color: var(--color-text-secondary);
  }
}
</style>
