<script setup lang="ts">
import BaseIcon from './BaseIcon.vue'

export interface BaseButtonProps {
  /** Button style variant */
  variant?: 'primary' | 'secondary' | 'tinted' | 'outline' | 'ghost' | 'plain' | 'accent' | 'danger'
  /** Button size */
  size?: 'sm' | 'md' | 'lg'
  /** Disable the button */
  disabled?: boolean
  /** Show loading spinner */
  loading?: boolean
  /** Full width button */
  fullWidth?: boolean
  /** Icon name (from BaseIcon) */
  icon?: string
  /** Use pill/rounded shape */
  rounded?: boolean
}

const props = withDefaults(defineProps<BaseButtonProps>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
  fullWidth: false,
  icon: undefined,
  rounded: false,
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

function handleClick(event: MouseEvent) {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>

<template>
  <button
    class="base-button"
    :class="[
      `base-button--${variant}`,
      `base-button--${size}`,
      {
        'base-button--full-width': fullWidth,
        'base-button--loading': loading,
        'base-button--icon-only': icon && !$slots.default,
        'base-button--rounded': rounded,
      },
    ]"
    :disabled="disabled || loading"
    :aria-disabled="disabled || loading"
    :aria-busy="loading"
    @click="handleClick"
  >
    <span v-if="loading" class="base-button__spinner" aria-hidden="true" />
    <span v-if="icon && !loading" class="base-button__icon" aria-hidden="true">
      <BaseIcon :name="icon" :size="size === 'lg' ? 24 : size === 'sm' ? 20 : 22" />
    </span>
    <span v-if="$slots.default" class="base-button__content" :class="{ 'sr-only': loading }">
      <slot />
    </span>
    <span v-if="loading" class="sr-only">Wird geladen...</span>
  </button>
</template>

<style scoped lang="scss">
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-xs);
  font-family: var(--font-family);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-tight);
  text-align: center;
  white-space: nowrap;
  border: none;
  border-radius: var(--radius-md); // 10px — iOS button radius
  cursor: pointer;
  position: relative;
  transition:
    background-color var(--duration-fast) var(--ease-default),
    color var(--duration-fast) var(--ease-default),
    transform var(--duration-fast) var(--ease-default),
    opacity var(--duration-fast) var(--ease-default);
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;

  // iOS-style press feedback
  &:active:not(:disabled) {
    transform: scale(0.97);
  }

  &:focus-visible {
    outline: 3px solid var(--color-border-focus);
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    pointer-events: none;
  }

  // ---- Variants ----

  // Filled lilac
  &--primary {
    background-color: var(--color-primary);
    color: var(--color-text-on-accent);

    &:hover:not(:disabled) {
      background-color: var(--color-primary-dark);
    }

    &:active:not(:disabled) {
      background-color: var(--color-primary-darker);
    }
  }

  // Tinted — light lilac bg, dark lilac text (iOS tinted button)
  &--secondary,
  &--tinted {
    background-color: var(--color-primary-lighter);
    color: var(--color-primary-darker);

    &:hover:not(:disabled) {
      background-color: var(--color-primary-light);
    }

    &:active:not(:disabled) {
      background-color: var(--color-primary-light);
    }
  }

  // Outline — subtle border
  &--outline {
    background-color: transparent;
    color: var(--color-primary);
    border: 1.5px solid var(--color-primary-light);

    &:hover:not(:disabled) {
      background-color: var(--color-primary-bg);
    }

    &:active:not(:disabled) {
      background-color: var(--color-primary-lighter);
    }
  }

  // Ghost / Plain — text-only, iOS plain button
  &--ghost,
  &--plain {
    background-color: transparent;
    color: var(--color-primary);

    &:hover:not(:disabled) {
      background-color: var(--color-primary-bg);
    }

    &:active:not(:disabled) {
      background-color: var(--color-primary-lighter);
    }
  }

  // Accent — green-turquoise for positive actions
  &--accent {
    background-color: var(--color-accent);
    color: var(--color-text-on-accent);

    &:hover:not(:disabled) {
      background-color: var(--color-accent-hover);
    }

    &:active:not(:disabled) {
      background-color: var(--color-accent-active);
    }
  }

  // Danger
  &--danger {
    background-color: var(--color-error);
    color: var(--color-text-on-accent);

    &:hover:not(:disabled) {
      background-color: #c94444;
    }

    &:active:not(:disabled) {
      background-color: #b53a3a;
    }
  }

  // ---- Sizes ----

  &--sm {
    min-height: var(--touch-target-min); // 44px
    padding: var(--space-xs) var(--space-md);
    font-size: var(--font-size-subhead);
    border-radius: var(--radius-sm);
  }

  &--md {
    min-height: var(--touch-target-preferred); // 50px
    padding: var(--space-sm) var(--space-lg);
    font-size: var(--font-size-body);
  }

  &--lg {
    min-height: var(--touch-target-large); // 56px
    padding: var(--space-md) var(--space-xl);
    font-size: var(--font-size-headline);
    border-radius: var(--radius-lg);
  }

  // ---- Modifiers ----

  &--full-width {
    width: 100%;
  }

  &--icon-only {
    padding: var(--space-sm);
    aspect-ratio: 1;
    border-radius: var(--radius-full);
  }

  &--rounded {
    border-radius: var(--radius-full);
  }

  &--loading {
    pointer-events: none;
  }

  // ---- Children ----

  &__spinner {
    position: absolute;
    width: 22px;
    height: 22px;
    border: 2.5px solid var(--color-primary-light);
    border-top-color: var(--color-primary);
    border-radius: 50%;
    animation: base-button-spin 0.7s linear infinite;
  }

  // Spinner colors for filled variants
  &--primary &__spinner,
  &--accent &__spinner,
  &--danger &__spinner {
    border-color: rgba(255, 255, 255, 0.3);
    border-top-color: #ffffff;
  }

  &__icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  &__content {
    display: inline-flex;
    align-items: center;
    gap: var(--space-xs);
  }
}

@keyframes base-button-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
