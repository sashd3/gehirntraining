<template>
  <div class="crossword-clues">
    <!-- iOS-style Segmented Control -->
    <div class="crossword-clues__segmented" role="tablist">
      <div
        class="crossword-clues__segment-bg"
        :class="{ 'crossword-clues__segment-bg--right': activeTab === 'down' }"
      />
      <button
        class="crossword-clues__segment"
        :class="{ 'crossword-clues__segment--active': activeTab === 'across' }"
        role="tab"
        :aria-selected="activeTab === 'across'"
        @click="activeTab = 'across'"
      >
        Waagerecht
      </button>
      <button
        class="crossword-clues__segment"
        :class="{ 'crossword-clues__segment--active': activeTab === 'down' }"
        role="tab"
        :aria-selected="activeTab === 'down'"
        @click="activeTab = 'down'"
      >
        Senkrecht
      </button>
    </div>

    <!-- Clue list -->
    <div class="crossword-clues__list" role="tabpanel">
      <button
        v-for="clue in visibleClues"
        :key="`${clue.direction}-${clue.number}`"
        class="crossword-clues__item"
        :class="{
          'crossword-clues__item--selected': isSelected(clue),
          'crossword-clues__item--completed': isCompleted(clue),
        }"
        @click="$emit('clue-select', clue)"
      >
        <span class="crossword-clues__number">{{ clue.number }}.</span>
        <span
          class="crossword-clues__text"
          :class="{ 'crossword-clues__text--completed': isCompleted(clue) }"
        >
          {{ clue.clue }}
        </span>
        <span v-if="isCompleted(clue)" class="crossword-clues__check">&#10003;</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { CrosswordClue } from '@/data/crossword-puzzles/types'

const props = defineProps<{
  clues: CrosswordClue[]
  selectedClue: CrosswordClue | null
  completedClues: Set<string>
}>()

defineEmits<{
  'clue-select': [clue: CrosswordClue]
}>()

const activeTab = ref<'across' | 'down'>('across')

const visibleClues = computed(() =>
  props.clues
    .filter((c) => c.direction === activeTab.value)
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
  border-radius: var(--radius-lg);
  background-color: var(--color-bg-elevated);
  box-shadow: var(--shadow-card, var(--shadow-sm));
  overflow: hidden;
  font-family: var(--font-family);

  // iOS-style segmented control
  &__segmented {
    display: flex;
    position: relative;
    margin: var(--space-sm);
    padding: 2px;
    background-color: var(--color-bg-secondary);
    border-radius: var(--radius-sm);
  }

  &__segment-bg {
    position: absolute;
    top: 2px;
    left: 2px;
    width: calc(50% - 2px);
    height: calc(100% - 4px);
    background-color: var(--color-bg-elevated);
    border-radius: calc(var(--radius-sm) - 1px);
    box-shadow: 0 1px 3px rgba(45, 37, 64, 0.1);
    transition: transform var(--duration-normal) var(--ease-default);

    &--right {
      transform: translateX(100%);
    }
  }

  &__segment {
    flex: 1;
    position: relative;
    z-index: 1;
    padding: var(--space-xs) var(--space-md);
    min-height: var(--touch-target-min);
    border: none;
    background: none;
    color: var(--color-text-secondary);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    font-family: var(--font-family);
    cursor: pointer;
    transition: color var(--duration-normal) var(--ease-default);
    -webkit-tap-highlight-color: transparent;

    &--active {
      color: var(--color-primary);
      font-weight: var(--font-weight-semibold);
    }
  }

  &__list {
    @include scroll-container;
    max-height: 240px;
    padding: 4px 0;
  }

  &__item {
    display: flex;
    align-items: flex-start;
    gap: var(--space-sm);
    width: 100%;
    padding: var(--space-sm) var(--space-md);
    min-height: var(--touch-target-min);
    border: none;
    background: none;
    text-align: left;
    cursor: pointer;
    transition: background-color var(--duration-fast) var(--ease-default);
    -webkit-tap-highlight-color: transparent;
    font-family: var(--font-family);

    @include focus-ring;

    &:active {
      background-color: var(--color-bg-tertiary);
    }

    &--selected {
      background-color: var(--color-primary-lighter, var(--color-bg-tertiary));
    }

    &--completed {
      opacity: 0.7;
    }
  }

  &__number {
    font-size: var(--font-size-md);
    font-weight: var(--font-weight-bold);
    color: var(--color-primary);
    min-width: 28px;
    flex-shrink: 0;
  }

  &__text {
    flex: 1;
    font-size: var(--font-size-md);
    line-height: var(--line-height-normal);
    color: var(--color-text-primary);

    &--completed {
      text-decoration: line-through;
      color: var(--color-text-tertiary);
    }
  }

  &__check {
    color: var(--color-success);
    font-size: var(--font-size-md);
    flex-shrink: 0;
  }
}
</style>
