<template>
  <div class="crossword-clues">
    <!-- Waagerecht section -->
    <div class="crossword-clues__section">
      <div class="crossword-clues__section-header">
        <h3 class="crossword-clues__section-title">Waagerecht</h3>
      </div>
      <div class="crossword-clues__list">
        <button
          v-for="clue in acrossClues"
          :key="`across-${clue.number}`"
          class="crossword-clues__item"
          :class="{
            'crossword-clues__item--active': isSelected(clue),
            'crossword-clues__item--completed': isCompleted(clue),
          }"
          @click="$emit('clue-select', clue)"
        >
          <span class="crossword-clues__number">{{ clue.number }}</span>
          <span
            class="crossword-clues__text"
            :class="{ 'crossword-clues__text--completed': isCompleted(clue) }"
          >
            {{ clue.clue }}
          </span>
          <span v-if="isCompleted(clue)" class="crossword-clues__check">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8.5L6.5 12L13 4.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
        </button>
      </div>
    </div>

    <!-- Senkrecht section -->
    <div class="crossword-clues__section">
      <div class="crossword-clues__section-header">
        <h3 class="crossword-clues__section-title">Senkrecht</h3>
      </div>
      <div class="crossword-clues__list">
        <button
          v-for="clue in downClues"
          :key="`down-${clue.number}`"
          class="crossword-clues__item"
          :class="{
            'crossword-clues__item--active': isSelected(clue),
            'crossword-clues__item--completed': isCompleted(clue),
          }"
          @click="$emit('clue-select', clue)"
        >
          <span class="crossword-clues__number">{{ clue.number }}</span>
          <span
            class="crossword-clues__text"
            :class="{ 'crossword-clues__text--completed': isCompleted(clue) }"
          >
            {{ clue.clue }}
          </span>
          <span v-if="isCompleted(clue)" class="crossword-clues__check">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8.5L6.5 12L13 4.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { CrosswordClue } from '@/data/crossword-puzzles/types'

const props = defineProps<{
  clues: CrosswordClue[]
  selectedClue: CrosswordClue | null
  completedClues: Set<string>
}>()

defineEmits<{
  'clue-select': [clue: CrosswordClue]
}>()

const acrossClues = computed(() =>
  props.clues
    .filter((c) => c.direction === 'across')
    .sort((a, b) => a.number - b.number),
)

const downClues = computed(() =>
  props.clues
    .filter((c) => c.direction === 'down')
    .sort((a, b) => a.number - b.number),
)

function isSelected(clue: CrosswordClue): boolean {
  if (!props.selectedClue) return false
  return (
    props.selectedClue.number === clue.number &&
    props.selectedClue.direction === clue.direction
  )
}

function isCompleted(clue: CrosswordClue): boolean {
  return props.completedClues.has(`${clue.direction}-${clue.number}`)
}
</script>

<style lang="scss" scoped>
.crossword-clues {
  display: flex;
  flex-direction: column;
  gap: 0;
  background-color: var(--color-bg-elevated, #FFFFFF);
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04);
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif;

  // --- Section ---
  &__section {
    &:not(:last-child) {
      border-bottom: 1px solid var(--color-border-light, #E8E5EC);
    }
  }

  &__section-header {
    padding: var(--space-md, 16px) var(--space-md, 16px) var(--space-xs, 4px);
    border-bottom: 2px solid var(--color-text-primary, #2D2540);
    margin: 0 var(--space-md, 16px);
  }

  &__section-title {
    margin: 0;
    font-size: var(--font-size-md, 16px);
    font-weight: 700;
    color: var(--color-text-primary, #2D2540);
    letter-spacing: 0.01em;
  }

  // --- Scrollable clue list ---
  &__list {
    max-height: 200px;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    padding: var(--space-xs, 4px) 0;
  }

  // --- Individual clue ---
  &__item {
    display: flex;
    align-items: flex-start;
    gap: var(--space-sm, 10px);
    width: 100%;
    padding: var(--space-sm, 10px) var(--space-md, 16px);
    min-height: 44px;
    border: none;
    background: none;
    text-align: left;
    cursor: pointer;
    transition: background-color 0.15s ease;
    -webkit-tap-highlight-color: transparent;
    font-family: inherit;

    &:active {
      background-color: var(--color-bg-secondary, #F4F2F7);
    }

    // Active/selected clue highlight
    &--active {
      background-color: rgba(155, 138, 184, 0.1);
    }

    // Completed clue — subtle
    &--completed {
      opacity: 0.65;
    }
  }

  // --- Clue number ---
  &__number {
    font-size: var(--font-size-sm, 14px);
    font-weight: 700;
    color: var(--color-primary, #9B8AB8);
    min-width: 24px;
    flex-shrink: 0;
    padding-top: 1px;
  }

  // --- Clue text ---
  &__text {
    flex: 1;
    font-size: var(--font-size-md, 16px);
    line-height: 1.45;
    color: var(--color-text-primary, #2D2540);

    &--completed {
      text-decoration: line-through;
      color: var(--color-text-secondary, #8A8494);
    }
  }

  // --- Checkmark for completed ---
  &__check {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: var(--color-success, #5CB885);
    padding-top: 2px;
  }
}
</style>
