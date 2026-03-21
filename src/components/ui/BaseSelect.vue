<script setup lang="ts">
import { computed } from 'vue'

export interface SelectOption {
  value: string | number
  label: string
}

export interface BaseSelectProps {
  modelValue: string | number | null
  options: SelectOption[]
  label?: string
  placeholder?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<BaseSelectProps>(), {
  label: undefined,
  placeholder: 'Bitte auswahlen...',
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
}>()

const selectId = computed(() => `select-${Math.random().toString(36).slice(2, 9)}`)

function handleChange(event: Event) {
  const target = event.target as HTMLSelectElement
  const value = target.value
  // Try to preserve number type if original options use numbers
  const numericOption = props.options.find(
    (opt) => String(opt.value) === value && typeof opt.value === 'number',
  )
  emit('update:modelValue', numericOption ? numericOption.value : value)
}
</script>

<template>
  <div
    class="base-select"
    :class="{ 'base-select--disabled': disabled }"
  >
    <label
      v-if="label"
      :for="selectId"
      class="base-select__label"
    >
      {{ label }}
    </label>
    <div class="base-select__wrapper">
      <select
        :id="selectId"
        class="base-select__native"
        :value="modelValue ?? ''"
        :disabled="disabled"
        @change="handleChange"
      >
        <option v-if="placeholder" value="" disabled>
          {{ placeholder }}
        </option>
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
      <span class="base-select__arrow" aria-hidden="true">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.base-select {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);

  &--disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  &__label {
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text-secondary);
    line-height: var(--line-height-normal);
  }

  &__wrapper {
    position: relative;
    display: flex;
    align-items: center;
  }

  &__native {
    width: 100%;
    min-height: var(--touch-target-min);
    padding: var(--space-sm) var(--space-2xl) var(--space-sm) var(--space-md);
    font-family: var(--font-family);
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-medium);
    color: var(--color-text-primary);
    background-color: var(--color-bg-input);
    border: 2px solid var(--color-border);
    border-radius: var(--radius-lg);
    appearance: none;
    -webkit-appearance: none;
    cursor: pointer;
    transition:
      border-color var(--duration-fast) var(--ease-default),
      box-shadow var(--duration-fast) var(--ease-default);

    &:focus-visible {
      outline: none;
      border-color: var(--color-border-focus);
      box-shadow: 0 0 0 3px var(--color-accent-light);
    }

    &:hover:not(:disabled) {
      border-color: var(--color-text-tertiary);
    }

    // Style the placeholder option
    option[disabled] {
      color: var(--color-text-disabled);
    }
  }

  &__arrow {
    position: absolute;
    right: var(--space-md);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-text-tertiary);
    pointer-events: none;
  }
}
</style>
