<script setup lang="ts">
export interface BaseCardProps {
  /** Use elevated shadow style (default cards have subtle shadow) */
  elevated?: boolean
  /** Inner padding */
  padding?: 'none' | 'sm' | 'md' | 'lg'
  /** Make the card tappable with press feedback */
  clickable?: boolean
  /** Use inset/grouped style (secondary background, no shadow) */
  inset?: boolean
}

const props = withDefaults(defineProps<BaseCardProps>(), {
  elevated: false,
  padding: 'md',
  clickable: false,
  inset: false,
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

function handleClick(event: MouseEvent) {
  if (props.clickable) {
    emit('click', event)
  }
}
</script>

<template>
  <div
    class="base-card"
    :class="[
      `base-card--padding-${padding}`,
      {
        'base-card--elevated': elevated,
        'base-card--clickable': clickable,
        'base-card--inset': inset,
      },
    ]"
    :role="clickable ? 'button' : undefined"
    :tabindex="clickable ? 0 : undefined"
    @click="handleClick"
    @keydown.enter="handleClick"
    @keydown.space.prevent="handleClick"
  >
    <slot />
  </div>
</template>

<style scoped lang="scss">
.base-card {
  // iOS-style card: white background, rounded corners, subtle shadow
  background-color: var(--color-bg-elevated);
  border-radius: var(--radius-lg); // 12px — iOS standard
  box-shadow: var(--shadow-card); // Very subtle: 0 1px 3px
  border: none; // No borders — shadows only, like iOS
  transition:
    box-shadow var(--duration-fast) var(--ease-default),
    transform var(--duration-fast) var(--ease-default);

  // ---- Elevated — stronger shadow ----
  &--elevated {
    box-shadow: var(--shadow-md);
  }

  // ---- Inset — grouped table style (no shadow, secondary bg) ----
  &--inset {
    background-color: var(--color-bg-secondary);
    box-shadow: none;
  }

  // ---- Padding ----
  &--padding-none {
    padding: 0;
  }

  &--padding-sm {
    padding: var(--space-sm);
  }

  &--padding-md {
    padding: var(--space-md);
  }

  &--padding-lg {
    padding: var(--space-lg);
  }

  // ---- Clickable — press feedback ----
  &--clickable {
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      box-shadow: var(--shadow-md);
    }

    &:active {
      transform: scale(0.98);
      box-shadow: var(--shadow-sm);
    }

    &:focus-visible {
      outline: 3px solid var(--color-border-focus);
      outline-offset: 2px;
    }
  }
}
</style>
