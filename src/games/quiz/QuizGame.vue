<template>
  <div class="quiz-game">
    <!-- Header: Progress text + thin progress bar -->
    <div class="quiz-game__header">
      <div class="quiz-game__progress-row">
        <span class="quiz-game__progress-counter">
          {{ currentQuestionIndex + 1 }}/{{ totalQuestions }}
        </span>
        <span class="quiz-game__score-badge">
          {{ score }} {{ t('common.score') }}
        </span>
      </div>
      <div class="quiz-game__progress-track">
        <div
          class="quiz-game__progress-fill"
          :style="{ width: `${progressPercent}%` }"
        />
      </div>
    </div>

    <!-- Question + Answers (animated transition) -->
    <Transition name="quiz-slide" mode="out-in">
      <div :key="currentQuestionIndex" class="quiz-game__body">
        <!-- Question card -->
        <div class="quiz-game__question-card">
          <QuizQuestion
            v-if="currentQuestion"
            :question="currentQuestion"
          />
        </div>

        <!-- Answer options -->
        <div class="quiz-game__answers">
          <QuizAnswer
            v-for="(answer, idx) in currentQuestion?.answers ?? []"
            :key="`${currentQuestionIndex}-${idx}`"
            :text="answer"
            :index="idx"
            :is-correct="idx === currentQuestion?.correctAnswerIndex"
            :is-selected="selectedAnswerIndex === idx"
            :show-result="showResult"
            @select="handleAnswer(idx)"
          />
        </div>

        <!-- Explanation (shown below answers after answering) -->
        <Transition name="explanation-fade">
          <div
            v-if="showResult && currentQuestion?.explanation"
            class="quiz-game__explanation"
          >
            <p class="quiz-game__explanation-text">
              {{ currentQuestion.explanation }}
            </p>
          </div>
        </Transition>
      </div>
    </Transition>

    <!-- Bottom feedback toast (slides up from bottom) -->
    <Transition name="toast-slide">
      <div
        v-if="showResult"
        class="quiz-game__toast"
        :class="{
          'quiz-game__toast--correct': isLastAnswerCorrect,
          'quiz-game__toast--wrong': !isLastAnswerCorrect,
        }"
      >
        <span class="quiz-game__toast-icon">
          <Check v-if="isLastAnswerCorrect" :size="22" />
          <X v-else :size="20" />
        </span>
        <span class="quiz-game__toast-text">
          {{ isLastAnswerCorrect
            ? `Richtig! +${POINTS_PER_CORRECT} Punkte verdient.`
            : 'Leider falsch.'
          }}
        </span>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Difficulty, GameResult } from '@/types/game'
import type { QuizQuestion as QuizQuestionType } from '@/types/quiz'
import { selectQuizQuestions } from '@/generators/quiz.generator'
import QuizQuestion from './QuizQuestion.vue'
import QuizAnswer from './QuizAnswer.vue'
import { Check, X } from 'lucide-vue-next'

const QUESTIONS_PER_GAME = 10
const POINTS_PER_CORRECT = 150
const AUTO_ADVANCE_DELAY = 2500

const props = defineProps<{
  difficulty: Difficulty
  isPaused: boolean
}>()

const emit = defineEmits<{
  'score-update': [score: number]
  'game-complete': [result: GameResult]
}>()

const { t } = useI18n()

// --- State ---
const questions = ref<QuizQuestionType[]>([])
const currentQuestionIndex = ref(0)
const selectedAnswerIndex = ref<number | null>(null)
const showResult = ref(false)
const score = ref(0)
const correctCount = ref(0)
const startTime = ref(Date.now())
const autoAdvanceTimer = ref<ReturnType<typeof setTimeout> | null>(null)

// --- Computed ---
const totalQuestions = computed(() => questions.value.length)

const currentQuestion = computed(() => questions.value[currentQuestionIndex.value] ?? null)

const progressPercent = computed(() => {
  if (totalQuestions.value === 0) return 0
  return ((currentQuestionIndex.value + 1) / totalQuestions.value) * 100
})

const isLastAnswerCorrect = computed(() => {
  if (selectedAnswerIndex.value === null || !currentQuestion.value) return false
  return selectedAnswerIndex.value === currentQuestion.value.correctAnswerIndex
})

// --- Methods ---
function initGame() {
  questions.value = selectQuizQuestions('mixed', props.difficulty, QUESTIONS_PER_GAME)
  currentQuestionIndex.value = 0
  selectedAnswerIndex.value = null
  showResult.value = false
  score.value = 0
  correctCount.value = 0
  startTime.value = Date.now()
}

function handleAnswer(index: number) {
  if (showResult.value || props.isPaused) return

  selectedAnswerIndex.value = index
  showResult.value = true

  const question = currentQuestion.value
  if (!question) return

  const isCorrect = index === question.correctAnswerIndex

  if (isCorrect) {
    score.value += POINTS_PER_CORRECT
    correctCount.value++
    emit('score-update', score.value)
  }

  // Auto-advance after delay
  autoAdvanceTimer.value = setTimeout(() => {
    advanceToNext()
  }, AUTO_ADVANCE_DELAY)
}

function advanceToNext() {
  clearAutoAdvanceTimer()

  if (currentQuestionIndex.value < totalQuestions.value - 1) {
    currentQuestionIndex.value++
    selectedAnswerIndex.value = null
    showResult.value = false
  } else {
    completeGame()
  }
}

function completeGame() {
  const duration = Math.round((Date.now() - startTime.value) / 1000)
  const maxScore = totalQuestions.value * POINTS_PER_CORRECT
  const accuracy = totalQuestions.value > 0
    ? Math.round((correctCount.value / totalQuestions.value) * 100)
    : 0

  let stars: 1 | 2 | 3 = 1
  if (accuracy >= 90) stars = 3
  else if (accuracy >= 60) stars = 2

  const result: GameResult = {
    score: score.value,
    maxScore,
    duration,
    accuracy,
    hintsUsed: 0,
    isNewBest: false,
    stars,
  }

  emit('game-complete', result)
}

function clearAutoAdvanceTimer() {
  if (autoAdvanceTimer.value) {
    clearTimeout(autoAdvanceTimer.value)
    autoAdvanceTimer.value = null
  }
}

// --- Pause handling ---
watch(
  () => props.isPaused,
  (paused) => {
    if (paused) {
      clearAutoAdvanceTimer()
    }
  },
)

// --- Lifecycle ---
onMounted(() => {
  initGame()
})

onBeforeUnmount(() => {
  clearAutoAdvanceTimer()
})
</script>

<style lang="scss" scoped>
.quiz-game {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg, 24px);
  padding: var(--space-md, 16px);
  padding-bottom: 80px; // space for toast
  max-width: var(--content-max-width, 600px);
  margin: 0 auto;
  width: 100%;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif;
  position: relative;
  min-height: 100%;

  // --- Header ---
  &__header {
    padding: 0 var(--space-xs, 4px);
  }

  &__progress-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--space-xs, 4px);
  }

  &__progress-counter {
    font-size: var(--font-size-sm, 14px);
    font-weight: 600;
    color: var(--color-text-secondary, #8A8494);
  }

  &__score-badge {
    font-size: var(--font-size-sm, 14px);
    font-weight: 600;
    color: var(--color-primary, #9B8AB8);
  }

  &__progress-track {
    width: 100%;
    height: 4px;
    background-color: rgba(155, 138, 184, 0.15);
    border-radius: 100px;
    overflow: hidden;
  }

  &__progress-fill {
    height: 100%;
    background-color: var(--color-primary, #9B8AB8);
    border-radius: 100px;
    transition: width 0.4s ease-out;
  }

  // --- Body ---
  &__body {
    display: flex;
    flex-direction: column;
    gap: var(--space-lg, 24px);
  }

  // --- Question card ---
  &__question-card {
    background-color: var(--color-bg-elevated, #FFFFFF);
    border-radius: 16px;
    padding: var(--space-xl, 32px) var(--space-lg, 24px);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04);
    text-align: center;
  }

  // --- Answer list ---
  &__answers {
    display: flex;
    flex-direction: column;
    gap: var(--space-sm, 10px);
  }

  // --- Explanation (inline, below answers) ---
  &__explanation {
    padding: var(--space-md, 16px) var(--space-lg, 24px);
    background-color: var(--color-bg-secondary, #F4F2F7);
    border-radius: 12px;
  }

  &__explanation-text {
    margin: 0;
    font-size: var(--font-size-md, 16px);
    line-height: 1.6;
    color: var(--color-text-secondary, #8A8494);
  }

  // --- Bottom toast ---
  &__toast {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    gap: var(--space-sm, 10px);
    padding: var(--space-md, 16px) var(--space-lg, 24px);
    padding-bottom: calc(var(--space-md, 16px) + env(safe-area-inset-bottom, 0px));
    z-index: 100;

    &--correct {
      background-color: var(--color-success, #5CB885);
      color: #FFFFFF;
    }

    &--wrong {
      background-color: var(--color-bg-elevated, #FFFFFF);
      color: var(--color-text-primary, #2D2540);
      border-top: 1px solid var(--color-border-light, #E8E5EC);
    }
  }

  &__toast-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 28px;
    height: 28px;
  }

  &__toast-text {
    font-size: var(--font-size-md, 16px);
    font-weight: 600;
    line-height: 1.4;
  }
}

// --- Transitions ---

// Question slide in/out
.quiz-slide-enter-active {
  transition: opacity 0.35s ease-out, transform 0.35s ease-out;
}
.quiz-slide-leave-active {
  transition: opacity 0.2s ease-in, transform 0.2s ease-in;
}
.quiz-slide-enter-from {
  opacity: 0;
  transform: translateX(30px);
}
.quiz-slide-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

// Explanation fade in
.explanation-fade-enter-active {
  transition: opacity 0.4s ease-out, transform 0.4s ease-out;
}
.explanation-fade-enter-from {
  opacity: 0;
  transform: translateY(8px);
}
.explanation-fade-enter-to {
  opacity: 1;
  transform: translateY(0);
}

// Toast slides up from bottom
.toast-slide-enter-active {
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}
.toast-slide-leave-active {
  transition: transform 0.25s ease-in;
}
.toast-slide-enter-from {
  transform: translateY(100%);
}
.toast-slide-leave-to {
  transform: translateY(100%);
}
</style>
