<script setup lang="ts">
import { computed } from 'vue'

export interface BaseToggleProps {
  modelValue: boolean
  label?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<BaseToggleProps>(), {
  label: undefined,
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const toggleId = computed(() => `toggle-${Math.random().toString(36).slice(2, 9)}`)

function toggle() {
  if (!props.disabled) {
    emit('update:modelValue', !props.modelValue)
  }
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === ' ' || event.key === 'Enter') {
    event.preventDefault()
    toggle()
  }
}
</script>

<template>
  <div
    class="base-toggle"
    :class="{ 'base-toggle--disabled': disabled }"
  >
    <label
      v-if="label"
      :for="toggleId"
      class="base-toggle__label"
    >
      {{ label }}
    </label>
    <button
      :id="toggleId"
      class="base-toggle__track"
      :class="{ 'base-toggle__track--on': modelValue }"
      type="button"
      role="switch"
      :aria-checked="modelValue"
      :aria-label="label"
      :disabled="disabled"
      @click="toggle"
      @keydown="handleKeydown"
    >
      <span class="base-toggle__thumb" />
    </button>
  </div>
</template>

<style scoped lang="scss">
.base-toggle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-md);
  min-height: var(--touch-target-min);

  &--disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  &__label {
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-medium);
    color: var(--color-text-primary);
    line-height: var(--line-height-normal);
    cursor: pointer;
    flex: 1;
    -webkit-user-select: none;
    user-select: none;
  }

  &__track {
    position: relative;
    width: 56px;
    height: 32px;
    background-color: var(--color-bg-tertiary);
    border: 2px solid var(--color-border);
    border-radius: var(--radius-full);
    cursor: pointer;
    transition:
      background-color var(--duration-normal) var(--ease-default),
      border-color var(--duration-normal) var(--ease-default);
    flex-shrink: 0;
    -webkit-tap-highlight-color: transparent;
    padding: 0;

    &--on {
      background-color: var(--color-accent);
      border-color: var(--color-accent);

      .base-toggle__thumb {
        transform: translateX(24px);
        background-color: #ffffff;
      }
    }

    &:focus-visible {
      outline: 3px solid var(--color-border-focus);
      outline-offset: 2px;
    }

    &:active:not(:disabled) {
      transform: scale(0.95);
    }
  }

  &__thumb {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 24px;
    height: 24px;
    background-color: var(--color-text-tertiary);
    border-radius: var(--radius-full);
    transition:
      transform var(--duration-normal) var(--ease-bounce),
      background-color var(--duration-normal) var(--ease-default);
    pointer-events: none;
  }
}
</style>
