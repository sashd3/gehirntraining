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
// Design tokens
$bg-primary: #fef8f3;
$bg-secondary: #f2ede8;
$bg-elevated: #ffffff;
$text-primary: #1d1b19;
$text-secondary: #434752;
$text-muted: #7c7a85;
$navy: #003173;
$orange: #944a00;
$orange-light: #fc8f34;
$success: #003d0b;
$error: #ba1a1a;

.quiz-answer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  min-height: 72px;
  padding: 14px 12px;
  border: none;
  border-radius: 16px;
  background-color: $bg-elevated;
  color: $text-primary;
  font-size: 15px;
  font-weight: 600;
  font-family: var(--font-family, -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif);
  line-height: 1.35;
  cursor: pointer;
  transition: background-color 0.2s ease, box-shadow 0.2s ease, transform 0.15s ease;
  text-align: center;
  -webkit-tap-highlight-color: transparent;
  position: relative;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);

  &:active:not(:disabled) {
    transform: scale(0.97);
  }

  &:hover:not(:disabled) {
    background-color: darken($bg-elevated, 2%);
  }

  // Letter badge
  &__letter {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 10px;
    background-color: $bg-secondary;
    color: $text-muted;
    font-size: 13px;
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
    color: darken($bg-secondary, 10%);
  }

  &__check {
    color: $navy;
  }

  // --- States ---

  // Selected (before reveal): navy highlight
  &--selected {
    background-color: rgba($navy, 0.06);
    box-shadow: 0 0 0 2px $navy;

    .quiz-answer__letter {
      background-color: $navy;
      color: #ffffff;
    }

    .quiz-answer__check {
      color: $navy;
    }
  }

  // Correct + selected: green
  &--correct {
    background-color: rgba($success, 0.06);
    box-shadow: 0 0 0 2px $success;

    .quiz-answer__letter {
      background-color: $success;
      color: #ffffff;
    }

    .quiz-answer__check {
      color: $success;
    }
  }

  // Wrong + selected: red
  &--wrong {
    background-color: rgba($error, 0.05);
    box-shadow: 0 0 0 2px $error;

    .quiz-answer__letter {
      background-color: rgba($error, 0.12);
      color: $error;
    }

    .quiz-answer__check,
    .quiz-answer__circle {
      color: $error;
    }
  }

  // Correct revealed (not selected): subtle green
  &--reveal-correct {
    box-shadow: 0 0 0 2px $success;
    background-color: $bg-elevated;

    .quiz-answer__letter {
      background-color: $success;
      color: #ffffff;
    }

    .quiz-answer__check {
      color: $success;
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
