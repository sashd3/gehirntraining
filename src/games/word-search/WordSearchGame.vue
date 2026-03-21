<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import type { Difficulty } from '@/types/game'
import type { WordSearchPuzzle, WordSearchWord } from '@/types/word-search'
import {
  generateWordSearchPuzzle,
  checkWordSelection,
  getWordCells,
} from '@/generators/word-search.generator'

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

const puzzle = ref<WordSearchPuzzle | null>(null)
const foundWords = ref<string[]>([])
const selectionStart = ref<{ row: number; col: number } | null>(null)
const selectionEnd = ref<{ row: number; col: number } | null>(null)
const highlightedCells = ref<Set<string>>(new Set())
const hintsUsed = ref(0)
const moves = ref(0)
const isComplete = ref(false)
const startedAt = ref(0)
const elapsedTime = ref(0)
const feedbackMessage = ref('')
const feedbackType = ref<'success' | 'error' | ''>('')
let timerInterval: ReturnType<typeof setInterval> | null = null
let feedbackTimeout: ReturnType<typeof setTimeout> | null = null

// ---------------------------------------------------------------------------
// Computed
// ---------------------------------------------------------------------------

const totalWords = computed(() => puzzle.value?.words.length ?? 0)
const wordsRemaining = computed(() => totalWords.value - foundWords.value.length)

const score = computed(() => {
  const wordScore = foundWords.value.length * 150
  const hintPenalty = hintsUsed.value * 75
  return Math.max(0, wordScore - hintPenalty)
})

const maxScore = computed(() => totalWords.value * 150)

const formattedTime = computed(() => {
  const mins = Math.floor(elapsedTime.value / 60)
  const secs = elapsedTime.value % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
})

const isCellHighlighted = computed(() => {
  return (row: number, col: number) => highlightedCells.value.has(`${row}-${col}`)
})

const isCellSelected = computed(() => {
  if (!selectionStart.value) return () => false
  const start = selectionStart.value
  const end = selectionEnd.value
  if (!end) {
    return (row: number, col: number) =>
      row === start.row && col === start.col
  }
  return (row: number, col: number) => {
    return isOnLine(start.row, start.col, end.row, end.col, row, col)
  }
})

// ---------------------------------------------------------------------------
// Methods
// ---------------------------------------------------------------------------

function isOnLine(
  r1: number, c1: number,
  r2: number, c2: number,
  r: number, c: number
): boolean {
  const dr = Math.sign(r2 - r1)
  const dc = Math.sign(c2 - c1)
  const len = Math.max(Math.abs(r2 - r1), Math.abs(c2 - c1))

  for (let i = 0; i <= len; i++) {
    if (r1 + dr * i === r && c1 + dc * i === c) return true
  }
  return false
}

function initGame() {
  puzzle.value = generateWordSearchPuzzle(props.difficulty)
  foundWords.value = []
  selectionStart.value = null
  selectionEnd.value = null
  highlightedCells.value = new Set()
  hintsUsed.value = 0
  moves.value = 0
  isComplete.value = false
  feedbackMessage.value = ''
  feedbackType.value = ''
  startedAt.value = Date.now()
  elapsedTime.value = 0
  startTimer()
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

function showFeedback(message: string, type: 'success' | 'error') {
  feedbackMessage.value = message
  feedbackType.value = type
  if (feedbackTimeout) clearTimeout(feedbackTimeout)
  feedbackTimeout = setTimeout(() => {
    feedbackMessage.value = ''
    feedbackType.value = ''
  }, 1500)
}

function tapCell(row: number, col: number) {
  if (isComplete.value || props.isPaused || !puzzle.value) return

  if (!selectionStart.value) {
    selectionStart.value = { row, col }
  } else {
    selectionEnd.value = { row, col }
    moves.value++

    const matchedWord = checkWordSelection(
      puzzle.value,
      selectionStart.value.row,
      selectionStart.value.col,
      row,
      col
    )

    if (matchedWord && !foundWords.value.includes(matchedWord)) {
      foundWords.value.push(matchedWord)

      const wordInfo = puzzle.value.words.find(w => w.word === matchedWord)
      if (wordInfo) {
        wordInfo.found = true
        const cells = getWordCells(wordInfo)
        for (const cell of cells) {
          highlightedCells.value.add(`${cell.row}-${cell.col}`)
        }
      }

      showFeedback(`${matchedWord} gefunden!`, 'success')
      emit('score-update', score.value)

      if (foundWords.value.length === totalWords.value) {
        isComplete.value = true
        stopTimer()
        emit('game-complete', {
          score: score.value,
          maxScore: maxScore.value,
          duration: elapsedTime.value,
          moves: moves.value,
          hintsUsed: hintsUsed.value,
        })
      }
    } else {
      showFeedback('Kein Wort gefunden', 'error')
    }

    selectionStart.value = null
    selectionEnd.value = null
  }
}

function useHint() {
  if (!puzzle.value || isComplete.value || props.isPaused) return

  const unfound = puzzle.value.words.filter(w => !w.found)
  if (unfound.length === 0) return

  hintsUsed.value++

  const word = unfound[Math.floor(Math.random() * unfound.length)]
  const cells = getWordCells(word)

  const hintCells = cells.slice(0, 2)
  for (const cell of hintCells) {
    highlightedCells.value.add(`hint-${cell.row}-${cell.col}`)
  }

  showFeedback(`Suche nach: ${word.word}`, 'success')

  setTimeout(() => {
    for (const cell of hintCells) {
      highlightedCells.value.delete(`hint-${cell.row}-${cell.col}`)
    }
  }, 2000)
}

function isHintCell(row: number, col: number): boolean {
  return highlightedCells.value.has(`hint-${row}-${col}`)
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
  <div class="wordsearch-game" :class="{ 'wordsearch-game--paused': isPaused }">
    <!-- Header -->
    <div class="wordsearch-header">
      <div class="wordsearch-header__pill">
        <span>&#9200;</span>
        <span>{{ formattedTime }}</span>
      </div>
      <div class="wordsearch-header__pill wordsearch-header__pill--accent">
        {{ foundWords.length }}/{{ totalWords }} Woerter
      </div>
    </div>

    <!-- Feedback -->
    <Transition name="ws-feedback">
      <div
        v-if="feedbackMessage"
        class="wordsearch-feedback"
        :class="`wordsearch-feedback--${feedbackType}`"
      >
        <span v-if="feedbackType === 'success'" class="wordsearch-feedback__icon">&#10003;</span>
        <span v-else class="wordsearch-feedback__icon">&#10007;</span>
        {{ feedbackMessage }}
      </div>
    </Transition>

    <!-- Instruction -->
    <p v-if="selectionStart && !selectionEnd" class="wordsearch-instruction">
      Tippe auf den letzten Buchstaben des Wortes
    </p>
    <p v-else-if="!selectionStart" class="wordsearch-instruction">
      Tippe auf den ersten Buchstaben eines Wortes
    </p>

    <!-- Grid -->
    <div
      v-if="puzzle"
      class="wordsearch-grid"
      :style="{
        gridTemplateColumns: `repeat(${puzzle.cols}, 1fr)`,
      }"
      role="grid"
      aria-label="Wortsuche Spielfeld"
    >
      <template v-for="(row, rowIdx) in puzzle.grid" :key="rowIdx">
        <button
          v-for="(letter, colIdx) in row"
          :key="`${rowIdx}-${colIdx}`"
          class="wordsearch-cell"
          :class="{
            'wordsearch-cell--highlighted': isCellHighlighted(rowIdx, colIdx),
            'wordsearch-cell--selected': isCellSelected(rowIdx, colIdx),
            'wordsearch-cell--hint': isHintCell(rowIdx, colIdx),
          }"
          :aria-label="`Buchstabe ${letter}, Zeile ${rowIdx + 1}, Spalte ${colIdx + 1}`"
          @click="tapCell(rowIdx, colIdx)"
        >
          {{ letter }}
        </button>
      </template>
    </div>

    <!-- Word List -->
    <div class="wordsearch-words">
      <h3 class="wordsearch-words__title">Woerter</h3>
      <div class="wordsearch-words__list">
        <span
          v-for="word in puzzle?.words"
          :key="word.word"
          class="wordsearch-word"
          :class="{ 'wordsearch-word--found': word.found }"
        >
          {{ word.word }}
        </span>
      </div>
    </div>

    <!-- Actions -->
    <div class="wordsearch-actions">
      <button
        class="wordsearch-hint-btn"
        :disabled="isComplete"
        @click="useHint"
      >
        <span class="wordsearch-hint-btn__icon">&#128161;</span>
        Hinweis ({{ hintsUsed }})
      </button>
    </div>

    <!-- Completion overlay -->
    <Transition name="ws-complete">
      <div v-if="isComplete" class="wordsearch-complete">
        <div class="wordsearch-complete__card">
          <div class="wordsearch-complete__icon">&#127881;</div>
          <h2 class="wordsearch-complete__title">Alle Woerter gefunden!</h2>
          <p class="wordsearch-complete__score">{{ score }} Punkte</p>
          <p class="wordsearch-complete__stats">
            Zeit: {{ formattedTime }} &middot; Versuche: {{ moves }} &middot; Hinweise: {{ hintsUsed }}
          </p>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.wordsearch-game {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-md);
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  position: relative;
  font-family: var(--font-family);
}

.wordsearch-game--paused {
  filter: blur(4px);
  pointer-events: none;
}

/* Header */
.wordsearch-header {
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: var(--space-sm);
}

.wordsearch-header__pill {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  padding: var(--space-xs) var(--space-md);
  background-color: var(--color-bg-elevated);
  border-radius: var(--radius-full);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  box-shadow: var(--shadow-sm);
}

.wordsearch-header__pill--accent {
  background-color: var(--color-accent-lighter, var(--color-accent-light));
  color: var(--color-accent-text, var(--color-accent));
}

/* Feedback */
.wordsearch-feedback {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  padding: var(--space-xs) var(--space-lg);
  border-radius: var(--radius-full);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-semibold);
  text-align: center;
}

.wordsearch-feedback__icon {
  font-size: var(--font-size-md);
}

.wordsearch-feedback--success {
  background-color: var(--color-success-bg);
  color: var(--color-success-text);
}

.wordsearch-feedback--error {
  background-color: var(--color-error-bg);
  color: var(--color-error-text);
}

/* Instruction */
.wordsearch-instruction {
  font-size: var(--font-size-sm);
  color: var(--color-text-tertiary);
  margin: 0;
  text-align: center;
  padding: var(--space-xs) var(--space-md);
  background-color: var(--color-bg-secondary);
  border-radius: var(--radius-full);
}

/* Grid */
.wordsearch-grid {
  display: grid;
  gap: 3px;
  width: 100%;
  max-width: 400px;
  padding: var(--space-xs);
  background-color: var(--color-bg-elevated);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card, var(--shadow-sm));
}

.wordsearch-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1;
  min-height: 36px;
  background: var(--color-bg-primary);
  border: none;
  border-radius: var(--radius-sm);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-bold);
  font-family: var(--font-family-mono);
  color: var(--color-text-primary);
  cursor: pointer;
  padding: 0;
  transition: all var(--duration-fast) var(--ease-default);
  -webkit-tap-highlight-color: transparent;
}

.wordsearch-cell:active {
  transform: scale(0.90);
}

.wordsearch-cell--selected {
  background-color: var(--color-primary-lighter, var(--color-bg-tertiary));
  color: var(--color-primary);
  box-shadow: 0 0 0 2px var(--color-primary);
}

.wordsearch-cell--highlighted {
  background-color: var(--color-accent-lighter, var(--color-accent-light));
  color: var(--color-accent-text, var(--color-accent));
}

.wordsearch-cell--hint {
  background-color: var(--color-warning-bg);
  animation: hintPulse 0.5s ease-in-out infinite alternate;
}

@keyframes hintPulse {
  from { opacity: 0.7; }
  to { opacity: 1; }
}

/* Word List */
.wordsearch-words {
  width: 100%;
}

.wordsearch-words__title {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-secondary);
  margin: 0 0 var(--space-xs);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wider);
}

.wordsearch-words__list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs);
}

.wordsearch-word {
  padding: var(--space-xs) var(--space-sm);
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
  box-shadow: var(--shadow-sm);
}

.wordsearch-word--found {
  background: var(--color-accent-lighter, var(--color-accent-light));
  border-color: var(--color-accent);
  color: var(--color-accent-text, var(--color-accent));
  text-decoration: line-through;
}

/* Actions */
.wordsearch-actions {
  display: flex;
  justify-content: center;
  padding: var(--space-xs) 0;
}

.wordsearch-hint-btn {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  padding: var(--space-sm) var(--space-xl);
  background: var(--color-bg-elevated);
  border: 1.5px solid var(--color-border-light);
  border-radius: var(--radius-full);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);
  font-family: var(--font-family);
  color: var(--color-text-primary);
  cursor: pointer;
  min-height: var(--touch-target-min);
  transition: all var(--duration-fast) var(--ease-default);
  -webkit-tap-highlight-color: transparent;
  box-shadow: var(--shadow-sm);
}

.wordsearch-hint-btn__icon {
  font-size: var(--font-size-lg);
}

.wordsearch-hint-btn:active {
  transform: scale(0.97);
  background-color: var(--color-bg-secondary);
}

.wordsearch-hint-btn:disabled {
  opacity: 0.4;
  pointer-events: none;
}

/* Completion overlay */
.wordsearch-complete {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg-overlay);
  border-radius: var(--radius-lg);
  z-index: var(--z-overlay);
}

.wordsearch-complete__card {
  background: var(--color-bg-elevated);
  border-radius: var(--radius-xl);
  padding: var(--space-2xl);
  text-align: center;
  box-shadow: var(--shadow-xl);
}

.wordsearch-complete__icon {
  font-size: 48px;
  margin-bottom: var(--space-sm);
}

.wordsearch-complete__title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-md);
}

.wordsearch-complete__score {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary);
  margin: 0 0 var(--space-sm);
}

.wordsearch-complete__stats {
  font-size: var(--font-size-md);
  color: var(--color-text-secondary);
  margin: 0;
}

/* Transitions */
.ws-feedback-enter-active {
  transition: opacity var(--duration-fast) var(--ease-out),
    transform var(--duration-fast) var(--ease-out);
}

.ws-feedback-enter-from {
  opacity: 0;
  transform: translateY(-8px);
}

.ws-feedback-leave-active {
  transition: opacity var(--duration-fast) var(--ease-in);
}

.ws-feedback-leave-to {
  opacity: 0;
}

.ws-complete-enter-active {
  transition: opacity var(--duration-slow) var(--ease-out);
}

.ws-complete-enter-from {
  opacity: 0;
}
</style>
