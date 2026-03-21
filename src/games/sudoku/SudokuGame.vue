<script setup lang="ts">
import { ref, reactive, computed, watch, onMounted, onUnmounted } from 'vue'
import type { Difficulty } from '@/types/game'
import type { SudokuBoard, SudokuPuzzle, SudokuMove } from '@/types/sudoku'
import {
  generateSudokuPuzzle,
  validateMove,
  getSudokuHint,
  isBoardComplete,
} from '@/generators/sudoku.generator'

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

const puzzle = ref<SudokuPuzzle | null>(null)
const board = ref<SudokuBoard>([])
const notes = ref<Set<number>[][]>([])
const selectedCell = ref<{ row: number; col: number } | null>(null)
const isNotesMode = ref(false)
const moveHistory = ref<SudokuMove[]>([])
const errors = ref<Set<string>>(new Set())
const hintsUsed = ref(0)
const isComplete = ref(false)
const startedAt = ref(0)
const elapsedTime = ref(0)
const moveCount = ref(0)
let timerInterval: ReturnType<typeof setInterval> | null = null

// ---------------------------------------------------------------------------
// Computed
// ---------------------------------------------------------------------------

const score = computed(() => {
  if (!puzzle.value) return 0
  const totalCells = 81 - puzzle.value.givens
  let filled = 0
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (puzzle.value.initial[r][c] === null && board.value[r]?.[c] !== null) {
        if (board.value[r][c] === puzzle.value.solution[r][c]) {
          filled++
        }
      }
    }
  }
  const baseScore = Math.round((filled / totalCells) * 1000)
  const hintPenalty = hintsUsed.value * 50
  return Math.max(0, baseScore - hintPenalty)
})

const maxScore = computed(() => 1000)

const isGivenCell = computed(() => {
  if (!puzzle.value) return () => false
  return (row: number, col: number) => puzzle.value!.initial[row][col] !== null
})

const isSelectedCell = computed(() => {
  return (row: number, col: number) =>
    selectedCell.value?.row === row && selectedCell.value?.col === col
})

const isHighlightedCell = computed(() => {
  if (!selectedCell.value) return () => false
  const { row: sr, col: sc } = selectedCell.value
  return (row: number, col: number) => {
    if (row === sr || col === sc) return true
    const boxRow = Math.floor(sr / 3) * 3
    const boxCol = Math.floor(sc / 3) * 3
    if (
      row >= boxRow && row < boxRow + 3 &&
      col >= boxCol && col < boxCol + 3
    ) {
      return true
    }
    return false
  }
})

const isSameNumber = computed(() => {
  if (!selectedCell.value) return () => false
  const { row: sr, col: sc } = selectedCell.value
  const selectedValue = board.value[sr]?.[sc]
  if (selectedValue === null) return () => false
  return (row: number, col: number) => {
    return board.value[row]?.[col] === selectedValue && !(row === sr && col === sc)
  }
})

const hasError = computed(() => {
  return (row: number, col: number) => errors.value.has(`${row}-${col}`)
})

const cellNotes = computed(() => {
  return (row: number, col: number): Set<number> => {
    if (!notes.value[row]) return new Set()
    return notes.value[row][col] ?? new Set()
  }
})

const formattedTime = computed(() => {
  const mins = Math.floor(elapsedTime.value / 60)
  const secs = elapsedTime.value % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
})

// ---------------------------------------------------------------------------
// Methods
// ---------------------------------------------------------------------------

function initGame() {
  puzzle.value = generateSudokuPuzzle(props.difficulty)
  board.value = puzzle.value.initial.map(row => [...row])
  notes.value = Array.from({ length: 9 }, () =>
    Array.from({ length: 9 }, () => new Set<number>())
  )
  selectedCell.value = null
  isNotesMode.value = false
  moveHistory.value = []
  errors.value = new Set()
  hintsUsed.value = 0
  isComplete.value = false
  moveCount.value = 0
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

function selectCell(row: number, col: number) {
  if (isComplete.value || props.isPaused) return
  if (isGivenCell.value(row, col)) {
    selectedCell.value = { row, col }
    return
  }
  selectedCell.value = { row, col }
}

function enterNumber(num: number) {
  if (!selectedCell.value || isComplete.value || props.isPaused) return
  const { row, col } = selectedCell.value
  if (isGivenCell.value(row, col)) return

  if (isNotesMode.value) {
    const currentNotes = new Set(notes.value[row][col])
    const newNotes = new Set(currentNotes)
    if (newNotes.has(num)) {
      newNotes.delete(num)
    } else {
      newNotes.add(num)
    }

    moveHistory.value.push({
      row,
      col,
      previousValue: board.value[row][col],
      newValue: board.value[row][col],
      previousNotes: currentNotes,
      newNotes: new Set(newNotes),
      timestamp: Date.now(),
    })

    notes.value[row][col] = newNotes
  } else {
    const previousValue = board.value[row][col]
    const previousNotes = new Set(notes.value[row][col])

    moveHistory.value.push({
      row,
      col,
      previousValue,
      newValue: num,
      previousNotes,
      newNotes: new Set(),
      timestamp: Date.now(),
    })

    board.value[row][col] = num
    notes.value[row][col] = new Set()
    moveCount.value++

    const errorKey = `${row}-${col}`
    if (!validateMove(board.value, row, col, num)) {
      errors.value.add(errorKey)
    } else {
      errors.value.delete(errorKey)
    }

    emit('score-update', score.value)

    if (puzzle.value && isBoardComplete(board.value, puzzle.value.solution)) {
      isComplete.value = true
      stopTimer()
      emit('game-complete', {
        score: score.value,
        maxScore: maxScore.value,
        duration: elapsedTime.value,
        moves: moveCount.value,
        hintsUsed: hintsUsed.value,
      })
    }
  }
}

function clearCell() {
  if (!selectedCell.value || isComplete.value || props.isPaused) return
  const { row, col } = selectedCell.value
  if (isGivenCell.value(row, col)) return

  const previousValue = board.value[row][col]
  const previousNotes = new Set(notes.value[row][col])

  moveHistory.value.push({
    row,
    col,
    previousValue,
    newValue: null,
    previousNotes,
    newNotes: new Set(),
    timestamp: Date.now(),
  })

  board.value[row][col] = null
  notes.value[row][col] = new Set()
  errors.value.delete(`${row}-${col}`)
  moveCount.value++
}

function undo() {
  if (moveHistory.value.length === 0 || isComplete.value || props.isPaused) return

  const lastMove = moveHistory.value.pop()!
  board.value[lastMove.row][lastMove.col] = lastMove.previousValue
  notes.value[lastMove.row][lastMove.col] = new Set(lastMove.previousNotes)

  const errorKey = `${lastMove.row}-${lastMove.col}`
  if (lastMove.previousValue !== null) {
    if (!validateMove(board.value, lastMove.row, lastMove.col, lastMove.previousValue)) {
      errors.value.add(errorKey)
    } else {
      errors.value.delete(errorKey)
    }
  } else {
    errors.value.delete(errorKey)
  }

  emit('score-update', score.value)
}

function useHint() {
  if (!puzzle.value || isComplete.value || props.isPaused) return

  const hint = getSudokuHint(puzzle.value, board.value)
  if (!hint) return

  hintsUsed.value++
  selectedCell.value = { row: hint.row, col: hint.col }

  const previousValue = board.value[hint.row][hint.col]
  const previousNotes = new Set(notes.value[hint.row][hint.col])

  moveHistory.value.push({
    row: hint.row,
    col: hint.col,
    previousValue,
    newValue: hint.value,
    previousNotes,
    newNotes: new Set(),
    timestamp: Date.now(),
  })

  board.value[hint.row][hint.col] = hint.value
  notes.value[hint.row][hint.col] = new Set()
  errors.value.delete(`${hint.row}-${hint.col}`)
  moveCount.value++

  emit('score-update', score.value)

  if (isBoardComplete(board.value, puzzle.value.solution)) {
    isComplete.value = true
    stopTimer()
    emit('game-complete', {
      score: score.value,
      maxScore: maxScore.value,
      duration: elapsedTime.value,
      moves: moveCount.value,
      hintsUsed: hintsUsed.value,
    })
  }
}

function toggleNotesMode() {
  isNotesMode.value = !isNotesMode.value
}

// ---------------------------------------------------------------------------
// Lifecycle
// ---------------------------------------------------------------------------

onMounted(() => {
  initGame()
})

onUnmounted(() => {
  stopTimer()
})

watch(() => props.difficulty, () => {
  initGame()
})
</script>

<template>
  <div class="sudoku-game" :class="{ 'sudoku-game--paused': isPaused }">
    <!-- Header bar -->
    <div class="sudoku-header">
      <div class="sudoku-header__pill">
        <span class="sudoku-header__icon">&#9200;</span>
        <span class="sudoku-header__value">{{ formattedTime }}</span>
      </div>
      <div class="sudoku-header__pill sudoku-header__pill--primary">
        <span class="sudoku-header__value">{{ score }} Punkte</span>
      </div>
    </div>

    <!-- Sudoku Grid -->
    <div class="sudoku-grid" role="grid" aria-label="Sudoku Spielfeld">
      <template v-for="(row, rowIdx) in board" :key="rowIdx">
        <button
          v-for="(cell, colIdx) in row"
          :key="`${rowIdx}-${colIdx}`"
          class="sudoku-cell"
          :class="{
            'sudoku-cell--given': isGivenCell(rowIdx, colIdx),
            'sudoku-cell--selected': isSelectedCell(rowIdx, colIdx),
            'sudoku-cell--highlighted': isHighlightedCell(rowIdx, colIdx) && !isSelectedCell(rowIdx, colIdx),
            'sudoku-cell--same-number': isSameNumber(rowIdx, colIdx),
            'sudoku-cell--error': hasError(rowIdx, colIdx),
            'sudoku-cell--box-right': colIdx % 3 === 2 && colIdx < 8,
            'sudoku-cell--box-bottom': rowIdx % 3 === 2 && rowIdx < 8,
          }"
          :aria-label="`Zeile ${rowIdx + 1}, Spalte ${colIdx + 1}${cell ? ', Wert ' + cell : ', leer'}`"
          @click="selectCell(rowIdx, colIdx)"
        >
          <span v-if="cell !== null" class="sudoku-cell__value">{{ cell }}</span>
          <div v-else-if="cellNotes(rowIdx, colIdx).size > 0" class="sudoku-cell__notes">
            <span
              v-for="n in 9"
              :key="n"
              class="sudoku-cell__note"
              :class="{ 'sudoku-cell__note--visible': cellNotes(rowIdx, colIdx).has(n) }"
            >
              {{ cellNotes(rowIdx, colIdx).has(n) ? n : '' }}
            </span>
          </div>
        </button>
      </template>
    </div>

    <!-- Controls -->
    <div class="sudoku-controls">
      <!-- Tool buttons -->
      <div class="sudoku-tools">
        <button
          class="sudoku-tool-btn"
          :class="{ 'sudoku-tool-btn--active': isNotesMode }"
          :aria-pressed="isNotesMode"
          aria-label="Notizen Modus"
          @click="toggleNotesMode"
        >
          <span class="sudoku-tool-btn__icon">&#9998;</span>
          <span class="sudoku-tool-btn__label">Notizen</span>
        </button>

        <button
          class="sudoku-tool-btn"
          aria-label="Rueckgaengig"
          :disabled="moveHistory.length === 0"
          @click="undo"
        >
          <span class="sudoku-tool-btn__icon">&#8634;</span>
          <span class="sudoku-tool-btn__label">Zurueck</span>
        </button>

        <button
          class="sudoku-tool-btn"
          aria-label="Zelle loeschen"
          @click="clearCell"
        >
          <span class="sudoku-tool-btn__icon">&#10060;</span>
          <span class="sudoku-tool-btn__label">Loeschen</span>
        </button>

        <button
          class="sudoku-tool-btn"
          aria-label="Hinweis"
          @click="useHint"
        >
          <span class="sudoku-tool-btn__icon">&#128161;</span>
          <span class="sudoku-tool-btn__label">Hinweis ({{ hintsUsed }})</span>
        </button>
      </div>

      <!-- Number pad -->
      <div class="sudoku-numpad" role="group" aria-label="Zahlen eingeben">
        <button
          v-for="n in 9"
          :key="n"
          class="sudoku-numpad__btn"
          :aria-label="`Zahl ${n}`"
          @click="enterNumber(n)"
        >
          {{ n }}
        </button>
      </div>
    </div>

    <!-- Completion overlay -->
    <Transition name="sudoku-complete">
      <div v-if="isComplete" class="sudoku-complete">
        <div class="sudoku-complete__card">
          <div class="sudoku-complete__icon">&#10003;</div>
          <h2 class="sudoku-complete__title">Geschafft!</h2>
          <p class="sudoku-complete__score">{{ score }} Punkte</p>
          <p class="sudoku-complete__stats">
            Zeit: {{ formattedTime }} &middot; Zuege: {{ moveCount }} &middot; Hinweise: {{ hintsUsed }}
          </p>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.sudoku-game {
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

.sudoku-game--paused {
  filter: blur(4px);
  pointer-events: none;
}

/* Header */
.sudoku-header {
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: var(--space-sm);
}

.sudoku-header__pill {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  padding: var(--space-xs) var(--space-md);
  background-color: var(--color-bg-elevated);
  border-radius: var(--radius-full);
  box-shadow: var(--shadow-sm);
}

.sudoku-header__pill--primary {
  background-color: var(--color-primary-lighter, var(--color-bg-tertiary));
}

.sudoku-header__icon {
  font-size: var(--font-size-sm);
}

.sudoku-header__value {
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
}

/* Grid */
.sudoku-grid {
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  gap: 1px;
  background-color: var(--color-border-light);
  border: 2.5px solid var(--color-text-primary);
  border-radius: var(--radius-md);
  width: 100%;
  aspect-ratio: 1;
  max-width: 400px;
  overflow: hidden;
}

.sudoku-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-bg-elevated);
  border: none;
  cursor: pointer;
  padding: 0;
  min-height: 40px;
  min-width: 40px;
  font-family: var(--font-family);
  transition: background-color var(--duration-fast) var(--ease-default);
  position: relative;
  -webkit-tap-highlight-color: transparent;
}

.sudoku-cell--given {
  background-color: var(--color-bg-secondary);
}

.sudoku-cell--selected {
  background-color: var(--color-primary-light, #C4B5D4) !important;
  z-index: 1;
}

.sudoku-cell--highlighted:not(.sudoku-cell--selected) {
  background-color: var(--color-primary-lighter, var(--color-bg-tertiary));
}

.sudoku-cell--same-number:not(.sudoku-cell--selected) {
  background-color: var(--color-primary-lighter, var(--color-bg-tertiary));
}

.sudoku-cell--error {
  background-color: var(--color-error-bg) !important;
}

.sudoku-cell--box-right {
  border-right: 2px solid var(--color-text-primary);
}

.sudoku-cell--box-bottom {
  border-bottom: 2px solid var(--color-text-primary);
}

.sudoku-cell__value {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  line-height: 1;
}

.sudoku-cell--given .sudoku-cell__value {
  color: var(--color-text-primary);
  font-weight: var(--font-weight-bold);
}

.sudoku-cell:not(.sudoku-cell--given) .sudoku-cell__value {
  color: var(--color-primary);
  font-weight: var(--font-weight-medium);
}

.sudoku-cell--error .sudoku-cell__value {
  color: var(--color-error);
}

/* Notes */
.sudoku-cell__notes {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  width: 100%;
  height: 100%;
  padding: 1px;
}

.sudoku-cell__note {
  font-size: 9px;
  color: var(--color-text-tertiary);
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}

/* Controls */
.sudoku-controls {
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.sudoku-tools {
  display: flex;
  justify-content: space-around;
  gap: var(--space-xs);
}

.sudoku-tool-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: var(--space-xs) var(--space-sm);
  background: var(--color-bg-elevated);
  border: 1.5px solid var(--color-border-light);
  border-radius: var(--radius-md);
  cursor: pointer;
  min-height: var(--touch-target-min);
  min-width: var(--touch-target-min);
  font-family: var(--font-family);
  transition: all var(--duration-fast) var(--ease-default);
  -webkit-tap-highlight-color: transparent;
  box-shadow: var(--shadow-sm);
}

.sudoku-tool-btn:active {
  transform: scale(0.95);
  background-color: var(--color-bg-secondary);
}

.sudoku-tool-btn--active {
  background-color: var(--color-primary-lighter, var(--color-bg-tertiary));
  border-color: var(--color-primary);
}

.sudoku-tool-btn--active .sudoku-tool-btn__label {
  color: var(--color-primary);
}

.sudoku-tool-btn:disabled {
  opacity: 0.4;
  pointer-events: none;
}

.sudoku-tool-btn__icon {
  font-size: var(--font-size-lg);
  line-height: 1;
}

.sudoku-tool-btn__label {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  white-space: nowrap;
}

/* Number pad */
.sudoku-numpad {
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  gap: var(--space-xs);
}

.sudoku-numpad__btn {
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
  aspect-ratio: 1;
}

.sudoku-numpad__btn:active {
  transform: scale(0.90);
  background-color: var(--color-primary-lighter, var(--color-bg-tertiary));
  border-color: var(--color-primary);
  color: var(--color-primary);
}

/* Completion overlay */
.sudoku-complete {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg-overlay);
  border-radius: var(--radius-lg);
  z-index: var(--z-overlay);
}

.sudoku-complete__card {
  background: var(--color-bg-elevated);
  border-radius: var(--radius-xl);
  padding: var(--space-2xl);
  text-align: center;
  box-shadow: var(--shadow-xl);
}

.sudoku-complete__icon {
  width: 56px;
  height: 56px;
  margin: 0 auto var(--space-md);
  background-color: var(--color-success);
  color: #FFFFFF;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
}

.sudoku-complete__title {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-md);
}

.sudoku-complete__score {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary);
  margin: 0 0 var(--space-sm);
}

.sudoku-complete__stats {
  font-size: var(--font-size-md);
  color: var(--color-text-secondary);
  margin: 0;
}

/* Transition */
.sudoku-complete-enter-active {
  transition: opacity var(--duration-slow) var(--ease-out);
}

.sudoku-complete-enter-from {
  opacity: 0;
}
</style>
