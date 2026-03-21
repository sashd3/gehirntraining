<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import type { Difficulty } from '@/types/game'
import type { NumberSequencePuzzle } from '@/types/number-sequence'
import {
  generateSequencePuzzle,
  checkAnswer,
  getCorrectAnswer,
} from '@/generators/number-sequence.generator'

const props = defineProps<{
  difficulty: Difficulty
  isPaused: boolean
}>()

const emit = defineEmits<{
  'score-update': [score: number]
  'game-complete': [result: { score: number; maxScore: number; duration: number; moves: number; hintsUsed: number }]
}>()

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------

const ROUNDS_PER_GAME = 5

const currentPuzzle = ref<NumberSequencePuzzle | null>(null)
const userInput = ref('')
const currentRound = ref(0)
const correctCount = ref(0)
const totalAttempts = ref(0)
const hintsUsed = ref(0)
const isComplete = ref(false)
const roundFeedback = ref<'correct' | 'wrong' | 'hint' | ''>('')
const showExplanation = ref(false)
const startedAt = ref(0)
const elapsedTime = ref(0)
let timerInterval: ReturnType<typeof setInterval> | null = null
let feedbackTimeout: ReturnType<typeof setTimeout> | null = null

// ---------------------------------------------------------------------------
// Computed
// ---------------------------------------------------------------------------

const score = computed(() => {
  const baseScore = correctCount.value * 200
  const hintPenalty = hintsUsed.value * 50
  return Math.max(0, baseScore - hintPenalty)
})

const maxScore = computed(() => ROUNDS_PER_GAME * 200)

const formattedTime = computed(() => {
  const mins = Math.floor(elapsedTime.value / 60)
  const secs = elapsedTime.value % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
})

const displaySequence = computed(() => {
  if (!currentPuzzle.value) return []
  return currentPuzzle.value.sequence.map((num, idx) => ({
    value: num,
    isHidden: currentPuzzle.value!.hiddenIndices.includes(idx),
    index: idx,
  }))
})

// ---------------------------------------------------------------------------
// Methods
// ---------------------------------------------------------------------------

function initGame() {
  currentRound.value = 0
  correctCount.value = 0
  totalAttempts.value = 0
  hintsUsed.value = 0
  isComplete.value = false
  startedAt.value = Date.now()
  elapsedTime.value = 0
  startTimer()
  nextRound()
}

function nextRound() {
  userInput.value = ''
  roundFeedback.value = ''
  showExplanation.value = false
  currentPuzzle.value = generateSequencePuzzle(props.difficulty)
}

function startTimer() {
  stopTimer()
  timerInterval = setInterval(() => {
    if (!props.isPaused && !isComplete.value) {
      elapsedTime.value = Math.floor((Date.now() - startedAt.value) / 1000)
    }
  }, 1000)
}

function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval)
    timerInterval = null
  }
}

function appendDigit(digit: string) {
  if (roundFeedback.value || isComplete.value || props.isPaused) return
  if (userInput.value.length < 6) {
    userInput.value += digit
  }
}

function appendMinus() {
  if (roundFeedback.value || isComplete.value || props.isPaused) return
  if (userInput.value.length === 0) {
    userInput.value = '-'
  }
}

function clearInput() {
  if (roundFeedback.value || isComplete.value || props.isPaused) return
  userInput.value = ''
}

function backspace() {
  if (roundFeedback.value || isComplete.value || props.isPaused) return
  userInput.value = userInput.value.slice(0, -1)
}

function submitAnswer() {
  if (!currentPuzzle.value || userInput.value === '' || roundFeedback.value || isComplete.value || props.isPaused) return

  const answer = parseInt(userInput.value, 10)
  if (isNaN(answer)) return

  totalAttempts.value++
  const hiddenIdx = currentPuzzle.value.hiddenIndices[0]
  const correct = checkAnswer(currentPuzzle.value, hiddenIdx, answer)

  if (correct) {
    correctCount.value++
    roundFeedback.value = 'correct'
  } else {
    roundFeedback.value = 'wrong'
  }

  emit('score-update', score.value)

  if (feedbackTimeout) clearTimeout(feedbackTimeout)
  feedbackTimeout = setTimeout(() => {
    currentRound.value++

    if (currentRound.value >= ROUNDS_PER_GAME) {
      isComplete.value = true
      stopTimer()
      emit('game-complete', {
        score: score.value,
        maxScore: maxScore.value,
        duration: elapsedTime.value,
        moves: totalAttempts.value,
        hintsUsed: hintsUsed.value,
      })
    } else {
      nextRound()
    }
  }, 2000)
}

function useHint() {
  if (!currentPuzzle.value || roundFeedback.value || isComplete.value || props.isPaused) return
  hintsUsed.value++
  showExplanation.value = true
}

function revealAnswer() {
  if (!currentPuzzle.value || isComplete.value || props.isPaused) return
  const hiddenIdx = currentPuzzle.value.hiddenIndices[0]
  const correct = getCorrectAnswer(currentPuzzle.value, hiddenIdx)
  userInput.value = String(correct)
}

// ---------------------------------------------------------------------------
// Lifecycle
// ---------------------------------------------------------------------------

onMounted(() => {
  initGame()
})

onUnmounted(() => {
  stopTimer()
  if (feedbackTimeout) clearTimeout(feedbackTimeout)
})

watch(() => props.difficulty, () => {
  initGame()
})
</script>

<template>
  <div class="numseq-game" :class="{ 'numseq-game--paused': isPaused }">
    <!-- Header -->
    <div class="numseq-header">
      <div class="numseq-header__pill">
        <span>&#9200;</span>
        <span>{{ formattedTime }}</span>
      </div>
      <div class="numseq-header__pill">
        <span>Runde {{ currentRound + 1 }}/{{ ROUNDS_PER_GAME }}</span>
      </div>
      <div class="numseq-header__pill numseq-header__pill--accent">
        <span>{{ correctCount }} richtig</span>
      </div>
    </div>

    <!-- Progress dots -->
    <div class="numseq-progress">
      <span
        v-for="i in ROUNDS_PER_GAME"
        :key="i"
        class="numseq-progress__dot"
        :class="{
          'numseq-progress__dot--active': i - 1 === currentRound,
          'numseq-progress__dot--done': i - 1 < currentRound,
        }"
      />
    </div>

    <!-- Sequence Display -->
    <div v-if="currentPuzzle" class="numseq-sequence">
      <div
        v-for="item in displaySequence"
        :key="item.index"
        class="numseq-number"
        :class="{
          'numseq-number--hidden': item.isHidden,
          'numseq-number--correct': item.isHidden && roundFeedback === 'correct',
          'numseq-number--wrong': item.isHidden && roundFeedback === 'wrong',
        }"
      >
        <template v-if="!item.isHidden">{{ item.value }}</template>
        <template v-else-if="roundFeedback">{{ item.value }}</template>
        <template v-else>
          <span class="numseq-number__input">{{ userInput || '?' }}</span>
        </template>
      </div>
    </div>

    <!-- Feedback -->
    <Transition name="feedback-slide">
      <div v-if="roundFeedback" class="numseq-feedback" :class="`numseq-feedback--${roundFeedback}`">
        <template v-if="roundFeedback === 'correct'">
          <span class="numseq-feedback__icon">&#10003;</span> Richtig!
        </template>
        <template v-else-if="roundFeedback === 'wrong'">
          <span class="numseq-feedback__icon">&#10007;</span>
          Leider falsch. Die richtige Antwort war {{ currentPuzzle ? getCorrectAnswer(currentPuzzle, currentPuzzle.hiddenIndices[0]) : '' }}.
        </template>
      </div>
    </Transition>

    <!-- Hint / Explanation -->
    <div v-if="showExplanation && currentPuzzle" class="numseq-hint">
      <span class="numseq-hint__icon">&#128161;</span>
      {{ currentPuzzle.hint }}
    </div>

    <!-- Number Input Pad -->
    <div v-if="!isComplete" class="numseq-input">
      <div class="numseq-input__display">
        <span class="numseq-input__value" :class="{ 'numseq-input__value--placeholder': !userInput }">
          {{ userInput || 'Zahl eingeben...' }}
        </span>
      </div>

      <div class="numseq-numpad">
        <button
          v-for="n in 9"
          :key="n"
          class="numseq-numpad__btn"
          :disabled="!!roundFeedback"
          @click="appendDigit(String(n))"
        >
          {{ n }}
        </button>
        <button
          class="numseq-numpad__btn numseq-numpad__btn--action"
          :disabled="!!roundFeedback"
          @click="appendMinus"
        >
          +/-
        </button>
        <button
          class="numseq-numpad__btn"
          :disabled="!!roundFeedback"
          @click="appendDigit('0')"
        >
          0
        </button>
        <button
          class="numseq-numpad__btn numseq-numpad__btn--action"
          :disabled="!!roundFeedback"
          @click="backspace"
        >
          &#9003;
        </button>
      </div>

      <!-- Action buttons -->
      <div class="numseq-actions">
        <button
          class="numseq-action-btn numseq-action-btn--hint"
          :disabled="!!roundFeedback || showExplanation"
          @click="useHint"
        >
          Hinweis
        </button>
        <button
          class="numseq-action-btn numseq-action-btn--clear"
          :disabled="!!roundFeedback"
          @click="clearInput"
        >
          Loeschen
        </button>
        <button
          class="numseq-action-btn numseq-action-btn--submit"
          :disabled="!userInput || !!roundFeedback"
          @click="submitAnswer"
        >
          Pruefen
        </button>
      </div>
    </div>

    <!-- Completion overlay -->
    <Transition name="complete-fade">
      <div v-if="isComplete" class="numseq-complete">
        <div class="numseq-complete__card">
          <div class="numseq-complete__icon">&#127942;</div>
          <h2 class="numseq-complete__title">Geschafft!</h2>
          <p class="numseq-complete__score">{{ score }} Punkte</p>
          <p class="numseq-complete__detail">
            {{ correctCount }} von {{ ROUNDS_PER_GAME }} richtig
          </p>
          <p class="numseq-complete__stats">
            Zeit: {{ formattedTime }} &middot; Hinweise: {{ hintsUsed }}
          </p>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.numseq-game {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-md);
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  position: relative;
  font-family: var(--font-family);
}

.numseq-game--paused {
  filter: blur(4px);
  pointer-events: none;
}

/* Header */
.numseq-header {
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: var(--space-xs);
}

.numseq-header__pill {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  padding: var(--space-xs) var(--space-sm);
  background-color: var(--color-bg-elevated);
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  box-shadow: var(--shadow-sm);
}

.numseq-header__pill--accent {
  background-color: var(--color-accent-lighter, var(--color-accent-light));
  color: var(--color-accent-text, var(--color-accent));
}

/* Progress */
.numseq-progress {
  display: flex;
  gap: var(--space-xs);
}

.numseq-progress__dot {
  width: 12px;
  height: 12px;
  border-radius: var(--radius-full);
  background: var(--color-border-light);
  transition: all var(--duration-normal) var(--ease-default);
}

.numseq-progress__dot--active {
  background: var(--color-primary);
  transform: scale(1.3);
  box-shadow: 0 0 8px rgba(155, 138, 184, 0.4);
}

.numseq-progress__dot--done {
  background: var(--color-success);
}

/* Sequence */
.numseq-sequence {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-sm);
  padding: var(--space-lg) 0;
  width: 100%;
}

.numseq-number {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: var(--touch-target-min);
  min-height: var(--touch-target-min);
  padding: var(--space-xs) var(--space-sm);
  background: var(--color-bg-elevated);
  border: 2px solid var(--color-border-light);
  border-radius: var(--radius-full);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  box-shadow: var(--shadow-sm);
}

.numseq-number--hidden {
  border-color: var(--color-primary);
  background-color: var(--color-primary-lighter, var(--color-bg-tertiary));
  border-style: dashed;
}

.numseq-number--correct {
  border-color: var(--color-success);
  background-color: var(--color-success-bg);
  color: var(--color-success-text);
  border-style: solid;
  animation: correctPop var(--duration-slow) var(--ease-out);
}

.numseq-number--wrong {
  border-color: var(--color-error);
  background-color: var(--color-error-bg);
  color: var(--color-error-text);
  border-style: solid;
}

.numseq-number__input {
  color: var(--color-primary);
}

/* Feedback */
.numseq-feedback {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  padding: var(--space-sm) var(--space-lg);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-semibold);
  text-align: center;
}

.numseq-feedback__icon {
  font-size: var(--font-size-lg);
}

.numseq-feedback--correct {
  background-color: var(--color-success-bg);
  color: var(--color-success-text);
}

.numseq-feedback--wrong {
  background-color: var(--color-error-bg);
  color: var(--color-error-text);
}

/* Hint */
.numseq-hint {
  display: flex;
  align-items: flex-start;
  gap: var(--space-xs);
  padding: var(--space-sm) var(--space-md);
  background: var(--color-info-bg);
  color: var(--color-info-text);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-md);
}

.numseq-hint__icon {
  font-size: var(--font-size-lg);
  flex-shrink: 0;
}

/* Input */
.numseq-input {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.numseq-input__display {
  padding: var(--space-md);
  background: var(--color-bg-elevated);
  border: 1.5px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  text-align: center;
  box-shadow: var(--shadow-sm);
}

.numseq-input__value {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
}

.numseq-input__value--placeholder {
  color: var(--color-text-tertiary);
  font-weight: var(--font-weight-regular);
}

/* Number pad */
.numseq-numpad {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-xs);
}

.numseq-numpad__btn {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: var(--touch-target-preferred);
  background: var(--color-bg-elevated);
  border: 1.5px solid var(--color-border-light);
  border-radius: var(--radius-full);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  font-family: var(--font-family);
  color: var(--color-text-primary);
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-default);
  -webkit-tap-highlight-color: transparent;
  box-shadow: var(--shadow-sm);
}

.numseq-numpad__btn:active {
  transform: scale(0.92);
  background-color: var(--color-primary-lighter, var(--color-bg-tertiary));
  border-color: var(--color-primary);
}

.numseq-numpad__btn:disabled {
  opacity: 0.4;
  pointer-events: none;
}

.numseq-numpad__btn--action {
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-semibold);
}

/* Action buttons */
.numseq-actions {
  display: flex;
  gap: var(--space-xs);
}

.numseq-action-btn {
  flex: 1;
  padding: var(--space-sm) var(--space-md);
  border: none;
  border-radius: var(--radius-md);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-semibold);
  font-family: var(--font-family);
  cursor: pointer;
  min-height: var(--touch-target-min);
  transition: all var(--duration-fast) var(--ease-default);
  -webkit-tap-highlight-color: transparent;
}

.numseq-action-btn:active {
  transform: scale(0.97);
}

.numseq-action-btn:disabled {
  opacity: 0.4;
  pointer-events: none;
}

.numseq-action-btn--hint {
  background: var(--color-info-bg);
  color: var(--color-info-text);
}

.numseq-action-btn--clear {
  background: var(--color-bg-secondary);
  color: var(--color-text-primary);
}

.numseq-action-btn--submit {
  background: var(--color-primary);
  color: var(--color-text-on-accent);
  box-shadow: var(--shadow-sm);
}

/* Completion overlay */
.numseq-complete {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg-overlay);
  border-radius: var(--radius-lg);
  z-index: var(--z-overlay);
}

.numseq-complete__card {
  background: var(--color-bg-elevated);
  border-radius: var(--radius-xl);
  padding: var(--space-2xl);
  text-align: center;
  box-shadow: var(--shadow-xl);
}

.numseq-complete__icon {
  font-size: 48px;
  margin-bottom: var(--space-sm);
}

.numseq-complete__title {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-md);
}

.numseq-complete__score {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary);
  margin: 0 0 var(--space-xs);
}

.numseq-complete__detail {
  font-size: var(--font-size-lg);
  color: var(--color-text-secondary);
  margin: 0 0 var(--space-sm);
}

.numseq-complete__stats {
  font-size: var(--font-size-md);
  color: var(--color-text-tertiary);
  margin: 0;
}

/* Transitions */
.feedback-slide-enter-active {
  transition: opacity var(--duration-slow) var(--ease-out),
    transform var(--duration-slow) var(--ease-out);
}

.feedback-slide-enter-from {
  opacity: 0;
  transform: translateY(12px);
}

.complete-fade-enter-active {
  transition: opacity var(--duration-slow) var(--ease-out);
}

.complete-fade-enter-from {
  opacity: 0;
}

@keyframes correctPop {
  0% { transform: scale(0.95); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}
</style>
