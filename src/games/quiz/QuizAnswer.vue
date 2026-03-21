<template>
  <button
    class="quiz-answer"
    :class="{
      'quiz-answer--selected': isSelected && !showResult,
      'quiz-answer--correct': showResult && isCorrect && isSelected,
      'quiz-answer--wrong': showResult && isSelected && !isCorrect,
      'quiz-answer--reveal-correct': showResult && isCorrect && !isSelected,
      'quiz-answer--disabled': showResult,
    }"
    :disabled="showResult"
    @click="$emit('select')"
  >
    <span class="quiz-answer__letter">{{ indexLabel }}</span>
    <span class="quiz-answer__text">{{ text }}</span>
    <span v-if="showResult && isCorrect && isSelected" class="quiz-answer__icon quiz-answer__icon--correct">
      <Check :size="20" />
    </span>
    <span v-if="showResult && isSelected && !isCorrect" class="quiz-answer__icon quiz-answer__icon--wrong">
      <X :size="18" />
    </span>
    <span v-if="showResult && isCorrect && !isSelected" class="quiz-answer__icon quiz-answer__icon--correct">
      <Check :size="20" />
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Check, X } from 'lucide-vue-next'

const props = defineProps<{
  text: string
  index: number
  isCorrect: boolean
  isSelected: boolean
  showResult: boolean
}>()

defineEmits<{
  select: []
}>()

const indexLabel = computed(() => String.fromCharCode(65 + props.index))
</script>

<style lang="scss" scoped>
.quiz-answer {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  width: 100%;
  min-height: 52px;
  padding: var(--space-md) var(--space-lg);
  border: 1.5px solid var(--color-border-light, #E8E5EC);
  border-radius: 12px;
  background-color: var(--color-bg-elevated, #FFFFFF);
  color: var(--color-text-primary);
  font-size: var(--font-size-md, 16px);
  font-weight: var(--font-weight-medium, 500);
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif;
  line-height: var(--line-height-normal, 1.5);
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
  -webkit-tap-highlight-color: transparent;

  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  &:hover:not(:disabled) {
    border-color: var(--color-primary, #9B8AB8);
    background-color: rgba(155, 138, 184, 0.06);
  }

  // Letter badge — circle with A/B/C/D
  &__letter {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: var(--color-bg-secondary, #F4F2F7);
    color: var(--color-text-secondary, #8A8494);
    font-size: var(--font-size-sm, 14px);
    font-weight: 700;
    flex-shrink: 0;
    transition: all 0.2s ease;
  }

  &__text {
    flex: 1;
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 24px;
    height: 24px;

    &--correct {
      color: var(--color-success, #5CB885);
    }

    &--wrong {
      color: var(--color-error, #E25C5C);
    }
  }

  // --- States ---

  // Selected (before reveal): lilac border, light lilac bg
  &--selected {
    border-color: var(--color-primary, #9B8AB8);
    background-color: rgba(155, 138, 184, 0.08);

    .quiz-answer__letter {
      background-color: var(--color-primary, #9B8AB8);
      color: #FFFFFF;
    }
  }

  // Correct + selected: green border, green checkmark, light green bg
  &--correct {
    border-color: var(--color-success, #5CB885);
    background-color: rgba(92, 184, 133, 0.08);

    .quiz-answer__letter {
      background-color: var(--color-success, #5CB885);
      color: #FFFFFF;
    }
  }

  // Wrong + selected: subtle red border, red X, very light red bg (NOT full red!)
  &--wrong {
    border-color: var(--color-error, #E25C5C);
    background-color: rgba(226, 92, 92, 0.06);

    .quiz-answer__letter {
      background-color: rgba(226, 92, 92, 0.12);
      color: var(--color-error, #E25C5C);
    }
  }

  // Correct revealed (not selected): green border only, no bg change
  &--reveal-correct {
    border-color: var(--color-success, #5CB885);
    border-width: 2px;
    background-color: var(--color-bg-elevated, #FFFFFF);

    .quiz-answer__letter {
      background-color: var(--color-success, #5CB885);
      color: #FFFFFF;
    }
  }

  // Disabled state for non-relevant answers
  &--disabled {
    cursor: default;
    opacity: 0.5;

    &.quiz-answer--correct,
    &.quiz-answer--wrong,
    &.quiz-answer--reveal-correct {
      opacity: 1;
    }
  }
}
</style>
