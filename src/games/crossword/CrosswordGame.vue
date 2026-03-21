<template>
  <div v-if="puzzle" class="crossword-game">
    <!-- Current clue display -->
    <div class="crossword-game__clue-header">
      <span class="crossword-game__clue-label">AKTUELLER HINWEIS</span>
      <p v-if="currentClue" class="crossword-game__clue-text">
        <span class="crossword-game__clue-number">{{ currentClue.number }}.</span>
        {{ currentClue.clue }}
      </p>
      <p v-else class="crossword-game__clue-text crossword-game__clue-text--placeholder">
        Klicke auf eine Zelle, um zu beginnen
      </p>
    </div>

    <!-- Hidden input for native mobile keyboard -->
    <input
      ref="hiddenInput"
      class="crossword-game__hidden-input"
      type="text"
      autocomplete="off"
      autocorrect="off"
      autocapitalize="characters"
      spellcheck="false"
      inputmode="text"
      @input="onNativeInput"
      @keydown="onNativeKeydown"
    />

    <!-- Grid -->
    <div class="crossword-game__grid-wrapper">
      <CrosswordGrid
        :grid="puzzle.grid"
        :clues="puzzle.clues"
        :selected-cell="selectedCellObj"
        :selected-direction="selectedDirection"
        :user-input="userInputMap"
        @cell-select="onCellSelectWithFocus"
      />
    </div>

    <!-- Clues -->
    <CrosswordClues
      :clues="puzzle.clues"
      :selected-clue="currentClue"
      :completed-clues="completedClueKeys"
      @clue-select="onClueSelectWithFocus"
    />

    <!-- Action buttons -->
    <div class="crossword-game__actions">
      <button class="crossword-game__btn crossword-game__btn--outlined" @click="onRevealHint">
        <Info :size="18" />
        Hinweis geben
      </button>
      <button class="crossword-game__btn crossword-game__btn--ghost" @click="onReset">
        <RotateCcw :size="18" />
        Zurücksetzen
      </button>
    </div>

    <!-- Fallback keyboard only for desktop -->
    <CrosswordKeyboard
      v-if="!isMobile"
      @key-press="onKeyPress"
      @backspace="onBackspace"
      @enter="onEnter"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import { getRandomPuzzle } from '@/generators/crossword.generator'
import CrosswordGrid from './CrosswordGrid.vue'
import CrosswordClues from './CrosswordClues.vue'
import CrosswordKeyboard from './CrosswordKeyboard.vue'
import { Check, Info, RotateCcw } from 'lucide-vue-next'
import type { Difficulty, GameResult } from '@/types/game'
import type { CrosswordPuzzleData, CrosswordClue } from '@/data/crossword-puzzles/types'

const hiddenInput = ref<HTMLInputElement | null>(null)
const isMobile = ref(false)

onMounted(() => {
  isMobile.value = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ||
    ('ontouchstart' in window && window.innerWidth < 768)
})

function focusHiddenInput() {
  if (isMobile.value && hiddenInput.value) {
    hiddenInput.value.value = ''
    hiddenInput.value.focus()
  }
}

function onCellSelectWithFocus(cell: { row: number; col: number }) {
  onCellSelectObj(cell)
  nextTick(() => focusHiddenInput())
}

function onClueSelectWithFocus(clue: CrosswordClue) {
  onClueSelect(clue)
  nextTick(() => focusHiddenInput())
}

function onNativeInput(e: Event) {
  const input = e.target as HTMLInputElement
  const val = input.value
  if (val && val.length > 0) {
    const lastChar = val.slice(-1)
    if (/[a-zA-ZäöüÄÖÜß]/.test(lastChar)) {
      onKeyPress(lastChar.toUpperCase())
    }
  }
  input.value = ''
}

function onNativeKeydown(e: KeyboardEvent) {
  if (e.key === 'Backspace') {
    e.preventDefault()
    onBackspace()
  } else if (e.key === 'Enter') {
    e.preventDefault()
    onEnter()
  }
}

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
const puzzle = ref<CrosswordPuzzleData | null>(null)
const userGrid = ref<string[][]>([])
const selectedCell = ref<[number, number] | null>(null)
const selectedDirection = ref<'across' | 'down'>('across')
const completedClueNumbers = ref<number[]>([])
const correctLetters = ref(0)
const totalLetters = ref(0)
const startTime = ref(Date.now())
const hintsUsed = ref(0)

// --- Bridges for child component interfaces ---

const selectedCellObj = computed(() => {
  if (!selectedCell.value) return null
  return { row: selectedCell.value[0], col: selectedCell.value[1] }
})

const userInputMap = computed(() => {
  const map: Record<string, string> = {}
  for (let r = 0; r < userGrid.value.length; r++) {
    for (let c = 0; c < (userGrid.value[r]?.length ?? 0); c++) {
      const val = userGrid.value[r][c]
      if (val && val !== '#') {
        map[`${r}-${c}`] = val
      }
    }
  }
  return map
})

const completedClueKeys = computed(() => {
  if (!puzzle.value) return new Set<string>()
  const keys = new Set<string>()
  for (const clue of puzzle.value.clues) {
    if (completedClueNumbers.value.includes(clue.number)) {
      keys.add(`${clue.direction}-${clue.number}`)
    }
  }
  return keys
})

// --- Computed ---

const currentClue = computed(() => {
  if (!selectedCell.value || !puzzle.value) return null
  const [row, col] = selectedCell.value
  return (
    puzzle.value.clues.find(
      (c) => c.direction === selectedDirection.value && isInClueRange(row, col, c),
    ) ?? null
  )
})

// --- Helpers ---

function isInClueRange(row: number, col: number, clue: CrosswordClue): boolean {
  if (clue.direction === 'across') {
    return row === clue.row && col >= clue.col && col < clue.col + clue.answer.length
  } else {
    return col === clue.col && row >= clue.row && row < clue.row + clue.answer.length
  }
}

function initGame() {
  const p = getRandomPuzzle(props.difficulty)
  if (!p) return
  puzzle.value = p
  userGrid.value = p.grid.map((row) => row.map((cell) => (cell === '#' ? '#' : '')))
  totalLetters.value = p.grid.reduce(
    (sum, row) => sum + row.filter((c) => c !== '#').length,
    0,
  )
  correctLetters.value = 0
  completedClueNumbers.value = []
  hintsUsed.value = 0
  startTime.value = Date.now()

  const firstClue = p.clues.find((c) => c.direction === 'across') ?? p.clues[0]
  if (firstClue) {
    selectedCell.value = [firstClue.row, firstClue.col]
    selectedDirection.value = firstClue.direction
  } else {
    selectedCell.value = null
  }
}

function onCellSelectObj(cell: { row: number; col: number }) {
  if (props.isPaused || !puzzle.value) return
  const { row, col } = cell
  if (puzzle.value.grid[row]?.[col] === '#') return

  if (
    selectedCell.value &&
    selectedCell.value[0] === row &&
    selectedCell.value[1] === col
  ) {
    const newDir = selectedDirection.value === 'across' ? 'down' : 'across'
    const hasClue = puzzle.value.clues.some(
      (c) => c.direction === newDir && isInClueRange(row, col, c),
    )
    if (hasClue) selectedDirection.value = newDir
  } else {
    selectedCell.value = [row, col]
    const hasAcross = puzzle.value.clues.some(
      (c) => c.direction === 'across' && isInClueRange(row, col, c),
    )
    const hasDown = puzzle.value.clues.some(
      (c) => c.direction === 'down' && isInClueRange(row, col, c),
    )
    if (hasAcross && !hasDown) selectedDirection.value = 'across'
    else if (!hasAcross && hasDown) selectedDirection.value = 'down'
  }
}

function onClueSelect(clue: CrosswordClue) {
  if (props.isPaused) return
  selectedCell.value = [clue.row, clue.col]
  selectedDirection.value = clue.direction
}

function onKeyPress(key: string) {
  if (props.isPaused || !selectedCell.value || !puzzle.value) return
  const [row, col] = selectedCell.value
  if (puzzle.value.grid[row]?.[col] === '#') return

  const upperKey = key.toUpperCase()
  const oldVal = userGrid.value[row][col]
  if (oldVal && oldVal.toUpperCase() === puzzle.value.grid[row][col].toUpperCase()) {
    correctLetters.value--
  }
  userGrid.value[row][col] = upperKey
  if (upperKey === puzzle.value.grid[row][col].toUpperCase()) {
    correctLetters.value++
  }
  emit('score-update', correctLetters.value)
  checkCompletedClues()
  advanceCell()
  if (isGameComplete()) {
    completeGame()
  }
}

function onBackspace() {
  if (props.isPaused || !selectedCell.value || !puzzle.value) return
  const [row, col] = selectedCell.value

  if (userGrid.value[row][col] !== '' && userGrid.value[row][col] !== '#') {
    if (
      userGrid.value[row][col].toUpperCase() ===
      puzzle.value.grid[row][col].toUpperCase()
    ) {
      correctLetters.value--
    }
    userGrid.value[row][col] = ''
    emit('score-update', correctLetters.value)
    checkCompletedClues()
  } else {
    retreatCell()
    if (selectedCell.value) {
      const [r2, c2] = selectedCell.value
      if (userGrid.value[r2][c2] !== '' && userGrid.value[r2][c2] !== '#') {
        if (
          userGrid.value[r2][c2].toUpperCase() ===
          puzzle.value.grid[r2][c2].toUpperCase()
        ) {
          correctLetters.value--
        }
        userGrid.value[r2][c2] = ''
        emit('score-update', correctLetters.value)
        checkCompletedClues()
      }
    }
  }
}

function onEnter() {
  if (!puzzle.value || !currentClue.value) return
  const clues = puzzle.value.clues
  const currentIdx = clues.findIndex(
    (c) =>
      c.number === currentClue.value!.number &&
      c.direction === currentClue.value!.direction,
  )
  const nextClue = clues[(currentIdx + 1) % clues.length]
  if (nextClue) {
    selectedCell.value = [nextClue.row, nextClue.col]
    selectedDirection.value = nextClue.direction
  }
}

function onCheckProgress() {
  if (!puzzle.value) return
  checkCompletedClues()
  if (isGameComplete()) {
    completeGame()
  }
}

function onRevealHint() {
  if (!puzzle.value || !selectedCell.value) return
  const [row, col] = selectedCell.value
  if (puzzle.value.grid[row]?.[col] === '#') return

  const correctLetter = puzzle.value.grid[row][col].toUpperCase()
  const currentVal = userGrid.value[row][col]

  // Only reveal if cell is empty or wrong
  if (currentVal.toUpperCase() !== correctLetter) {
    if (currentVal && currentVal.toUpperCase() === correctLetter) {
      // already correct — do nothing
      return
    }
    // Remove old correct count if overwriting a correct letter
    if (currentVal && currentVal.toUpperCase() === puzzle.value.grid[row][col].toUpperCase()) {
      correctLetters.value--
    }
    userGrid.value[row][col] = correctLetter
    correctLetters.value++
    hintsUsed.value++
    emit('score-update', correctLetters.value)
    checkCompletedClues()
    advanceCell()
    if (isGameComplete()) {
      completeGame()
    }
  }
}

function onReset() {
  if (!puzzle.value) return
  userGrid.value = puzzle.value.grid.map((row) => row.map((cell) => (cell === '#' ? '#' : '')))
  correctLetters.value = 0
  completedClueNumbers.value = []
  emit('score-update', 0)

  const firstClue = puzzle.value.clues.find((c) => c.direction === 'across') ?? puzzle.value.clues[0]
  if (firstClue) {
    selectedCell.value = [firstClue.row, firstClue.col]
    selectedDirection.value = firstClue.direction
  }
}

function advanceCell() {
  if (!selectedCell.value || !puzzle.value) return
  const [row, col] = selectedCell.value
  if (selectedDirection.value === 'across') {
    for (let c = col + 1; c < puzzle.value.width; c++) {
      if (puzzle.value.grid[row][c] !== '#') {
        selectedCell.value = [row, c]
        return
      }
    }
  } else {
    for (let r = row + 1; r < puzzle.value.height; r++) {
      if (puzzle.value.grid[r][col] !== '#') {
        selectedCell.value = [r, col]
        return
      }
    }
  }
}

function retreatCell() {
  if (!selectedCell.value || !puzzle.value) return
  const [row, col] = selectedCell.value
  if (selectedDirection.value === 'across') {
    for (let c = col - 1; c >= 0; c--) {
      if (puzzle.value.grid[row][c] !== '#') {
        selectedCell.value = [row, c]
        return
      }
    }
  } else {
    for (let r = row - 1; r >= 0; r--) {
      if (puzzle.value.grid[r][col] !== '#') {
        selectedCell.value = [r, col]
        return
      }
    }
  }
}

function checkCompletedClues() {
  if (!puzzle.value) return
  completedClueNumbers.value = puzzle.value.clues
    .filter((clue) => {
      for (let i = 0; i < clue.answer.length; i++) {
        const r = clue.direction === 'across' ? clue.row : clue.row + i
        const c = clue.direction === 'across' ? clue.col + i : clue.col
        if (
          userGrid.value[r]?.[c]?.toUpperCase() !==
          clue.answer[i].toUpperCase()
        ) {
          return false
        }
      }
      return true
    })
    .map((c) => c.number)
}

function isGameComplete(): boolean {
  if (!puzzle.value) return false
  // Check that ALL cells are filled AND correct
  for (let r = 0; r < puzzle.value.height; r++) {
    for (let c = 0; c < puzzle.value.width; c++) {
      if (puzzle.value.grid[r][c] === '#') continue
      if (userGrid.value[r][c].toUpperCase() !== puzzle.value.grid[r][c].toUpperCase()) {
        return false
      }
    }
  }
  return true
}

function completeGame() {
  const duration = Math.round((Date.now() - startTime.value) / 1000)
  const maxScore = totalLetters.value
  const accuracy = maxScore > 0 ? Math.round((correctLetters.value / maxScore) * 100) : 0

  let stars: 1 | 2 | 3 = 1
  if (accuracy >= 90) stars = 3
  else if (accuracy >= 60) stars = 2

  emit('game-complete', {
    score: correctLetters.value,
    maxScore,
    duration,
    accuracy,
    hintsUsed: hintsUsed.value,
    isNewBest: false,
    stars,
  })
}

// --- Lifecycle ---
onMounted(() => {
  initGame()
})

watch(
  () => props.difficulty,
  () => {
    initGame()
  },
)
</script>

<style lang="scss" scoped>
.crossword-game {
  display: flex;
  flex-direction: column;
  gap: var(--space-md, 16px);
  padding: var(--space-md, 16px);
  max-width: var(--content-max-width, 600px);
  margin: 0 auto;
  width: 100%;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif;

  &__hidden-input {
    position: absolute;
    left: -9999px;
    top: -9999px;
    width: 1px;
    height: 1px;
    opacity: 0;
    font-size: 16px; // prevents iOS zoom on focus
  }

  // --- Current clue display ---
  &__clue-header {
    display: flex;
    flex-direction: column;
    gap: var(--space-xs, 4px);
    padding: var(--space-md, 16px) var(--space-lg, 24px);
    background-color: var(--color-bg-elevated, #FFFFFF);
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04);
  }

  &__clue-label {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--color-text-secondary, #8A8494);
  }

  &__clue-number {
    font-weight: 700;
    color: var(--color-primary, #9B8AB8);
  }

  &__clue-text {
    margin: 0;
    font-size: var(--font-size-lg, 18px);
    font-weight: 600;
    line-height: 1.4;
    color: var(--color-text-primary, #2D2540);

    &--placeholder {
      color: var(--color-text-secondary, #8A8494);
      font-weight: 400;
    }
  }

  // --- Grid ---
  &__grid-wrapper {
    padding: var(--space-xs, 4px) 0;
  }

  // --- Action buttons ---
  &__actions {
    display: flex;
    flex-direction: column;
    gap: var(--space-sm, 10px);
    padding: 0 var(--space-xs, 4px);
  }

  &__btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-sm, 10px);
    width: 100%;
    min-height: 48px;
    padding: var(--space-sm, 10px) var(--space-lg, 24px);
    border-radius: 12px;
    font-size: var(--font-size-md, 16px);
    font-weight: 600;
    font-family: inherit;
    cursor: pointer;
    transition: all 0.2s ease;
    -webkit-tap-highlight-color: transparent;

    &:active {
      transform: scale(0.98);
    }

    // "Rätsel prüfen" -- filled accent button
    &--primary {
      border: none;
      background-color: var(--color-accent, #6BBFAE);
      color: #FFFFFF;
      box-shadow: 0 2px 8px rgba(107, 191, 174, 0.25);

      &:active {
        background-color: #5AA99A;
      }
    }

    // "Hinweis geben" -- outlined accent button
    &--outlined {
      border: 2px solid var(--color-accent, #6BBFAE);
      background-color: transparent;
      color: var(--color-accent, #6BBFAE);

      &:active {
        background-color: rgba(107, 191, 174, 0.08);
      }
    }

    // "Zurücksetzen" -- gray outlined button
    &--ghost {
      border: 1.5px solid var(--color-border-light, #E8E5EC);
      background-color: transparent;
      color: var(--color-text-secondary, #8A8494);

      &:active {
        background-color: var(--color-bg-secondary, #F4F2F7);
      }
    }
  }
}
</style>
