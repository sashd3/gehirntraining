<template>
  <div class="crossword-keyboard">
    <!-- Special characters row -->
    <div class="crossword-keyboard__row crossword-keyboard__row--special">
      <button
        v-for="char in specialChars"
        :key="char"
        class="crossword-keyboard__key crossword-keyboard__key--special"
        @click="$emit('key-press', char)"
      >
        {{ char }}
      </button>
    </div>

    <!-- QWERTZ rows -->
    <div
      v-for="(row, rowIndex) in keyboardRows"
      :key="rowIndex"
      class="crossword-keyboard__row"
    >
      <button
        v-for="key in row"
        :key="key"
        class="crossword-keyboard__key"
        @click="$emit('key-press', key)"
      >
        {{ key }}
      </button>
    </div>

    <!-- Bottom row with backspace and enter -->
    <div class="crossword-keyboard__row crossword-keyboard__row--actions">
      <button
        class="crossword-keyboard__key crossword-keyboard__key--action crossword-keyboard__key--backspace"
        :aria-label="t('common.back')"
        @click="$emit('backspace')"
      >
        &#x232B;
      </button>
      <button
        class="crossword-keyboard__key crossword-keyboard__key--action crossword-keyboard__key--enter"
        @click="$emit('enter')"
      >
        &#x23CE;
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineEmits<{
  'key-press': [key: string]
  backspace: []
  enter: []
}>()

const keyboardRows = [
  ['Q', 'W', 'E', 'R', 'T', 'Z', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Y', 'X', 'C', 'V', 'B', 'N', 'M'],
]

const specialChars = ['Ä', 'Ö', 'Ü', 'ß']
</script>

<style lang="scss" scoped>
.crossword-keyboard {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: var(--space-sm) var(--space-xs);
  background-color: var(--color-bg-secondary);
  border-radius: var(--radius-lg) var(--radius-lg) 0 0;
  border-top: 1px solid var(--color-border-light);
  font-family: var(--font-family);

  &__row {
    display: flex;
    justify-content: center;
    gap: 5px;

    &--special {
      margin-bottom: 2px;
    }

    &--actions {
      gap: var(--space-sm);
    }
  }

  &__key {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 32px;
    height: 44px;
    padding: var(--space-xs) var(--space-sm);
    border: none;
    border-radius: 6px;
    background-color: var(--color-bg-elevated);
    color: var(--color-text-primary);
    font-size: var(--font-size-md);
    font-weight: var(--font-weight-semibold);
    font-family: var(--font-family);
    cursor: pointer;
    box-shadow: 0 1px 2px rgba(45, 37, 64, 0.1);
    transition: background-color var(--duration-fast) var(--ease-default),
      transform var(--duration-fast) var(--ease-default);
    flex: 1;
    max-width: 40px;
    -webkit-tap-highlight-color: transparent;
    user-select: none;

    @include focus-ring;

    &:active {
      transform: scale(0.92);
      background-color: var(--color-bg-tertiary);
    }

    &--special {
      background-color: var(--color-primary-lighter, var(--color-bg-tertiary));
      color: var(--color-primary);
      font-weight: var(--font-weight-bold);
      max-width: 56px;
    }

    &--action {
      flex: 1.5;
      max-width: 72px;
      font-size: var(--font-size-lg);
    }

    &--backspace {
      background-color: var(--color-bg-tertiary);
      color: var(--color-text-secondary);
    }

    &--enter {
      background-color: var(--color-primary);
      color: var(--color-text-on-accent);
    }
  }
}
</style>
