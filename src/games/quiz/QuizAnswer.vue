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
    <span class="quiz-answer__indicator">
      <CheckCircle
        v-if="(isSelected && !showResult) || (showResult && isCorrect)"
        :size="20"
        class="quiz-answer__check"
      />
      <Circle
        v-else
        :size="20"
        class="quiz-answer__circle"
      />
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Circle, CheckCircle } from 'lucide-vue-next'

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
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  min-height: 72px;
  padding: 14px 12px;
  border: 1.5px solid var(--color-border, #E0DAE8);
  border-radius: 16px;
  background-color: var(--color-bg-elevated);
  color: var(--color-text-primary);
  font-size: 15px;
  font-weight: 600;
  font-family: var(--font-family, -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif);
  line-height: 1.35;
  cursor: pointer;
  transition: background-color 0.2s ease, box-shadow 0.2s ease, transform 0.15s ease, border-color 0.2s ease;
  text-align: center;
  -webkit-tap-highlight-color: transparent;
  position: relative;

  &:active:not(:disabled) {
    transform: scale(0.97);
  }

  &:hover:not(:disabled) {
    border-color: var(--color-primary-light, #C4B5D4);
    background-color: var(--color-primary-bg, #F3EFF8);
  }

  // Letter badge
  &__letter {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 34px;
    height: 34px;
    border-radius: 10px;
    background-color: var(--color-primary-lighter, #E8E0F0);
    color: var(--color-primary, #9B8AB8);
    font-size: 14px;
    font-weight: 800;
    flex-shrink: 0;
    transition: background-color 0.2s ease, color 0.2s ease;
  }

  &__text {
    flex: 1;
    font-size: 14px;
    line-height: 1.35;
    word-break: break-word;
  }

  // Selection indicator (top-right area)
  &__indicator {
    position: absolute;
    top: 10px;
    right: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__circle {
    color: var(--color-primary-light, #C4B5D4);
  }

  &__check {
    color: var(--color-primary);
  }

  // --- States ---

  // Selected (before reveal): navy highlight
  &--selected {
    background-color: var(--color-primary-bg, #F3EFF8);
    box-shadow: 0 0 0 2px var(--color-primary);

    .quiz-answer__letter {
      background-color: var(--color-primary);
      color: #ffffff;
    }

    .quiz-answer__check {
      color: var(--color-primary);
    }
  }

  // Correct + selected: green
  &--correct {
    background-color: var(--color-success-bg, #EAF7F0);
    box-shadow: 0 0 0 2px var(--color-success);

    .quiz-answer__letter {
      background-color: var(--color-success);
      color: #ffffff;
    }

    .quiz-answer__check {
      color: var(--color-success);
    }
  }

  // Wrong + selected: red
  &--wrong {
    background-color: var(--color-error-bg, #FDECEC);
    box-shadow: 0 0 0 2px var(--color-error);

    .quiz-answer__letter {
      background-color: var(--color-error-bg, #FDECEC);
      color: var(--color-error);
    }

    .quiz-answer__check,
    .quiz-answer__circle {
      color: var(--color-error);
    }
  }

  // Correct revealed (not selected): subtle green
  &--reveal-correct {
    box-shadow: 0 0 0 2px var(--color-success);
    background-color: var(--color-bg-elevated);

    .quiz-answer__letter {
      background-color: var(--color-success);
      color: #ffffff;
    }

    .quiz-answer__check {
      color: var(--color-success);
    }
  }

  // Disabled state for non-relevant answers
  &--disabled {
    cursor: default;
    opacity: 0.45;

    &.quiz-answer--correct,
    &.quiz-answer--wrong,
    &.quiz-answer--reveal-correct {
      opacity: 1;
    }
  }
}

// Responsive: on very narrow screens, allow cards to be taller
@media (max-width: 340px) {
  .quiz-answer {
    min-height: 64px;
    padding: 12px 10px;

    &__text {
      font-size: 13px;
    }
  }
}
</style>
