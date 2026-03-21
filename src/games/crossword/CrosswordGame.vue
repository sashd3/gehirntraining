<template>
  <div v-if="puzzle" class="crossword-game">
    <!-- Current clue display -->
    <div v-if="currentClue" class="crossword-game__active-clue">
      <div class="crossword-game__clue-badge">
        <span class="crossword-game__clue-number">{{ currentClue.number }}</span>
        <span class="crossword-game__clue-direction">
          {{ currentClue.direction === 'across' ? 'Waagerecht' : 'Senkrecht' }}
        </span>
      </div>
      <p class="crossword-game__clue-text">{{ currentClue.clue }}</p>
    </div>

    <!-- Grid -->
    <div class="crossword-game__grid-wrapper">
      <CrosswordGrid
        :grid="puzzle.grid"
        :clues="puzzle.clues"
        :selected-cell="selectedCellObj"
        :selected-direction="selectedDirection"
        :user-input="userInputMap"
        @cell-select="onCellSelectObj"
      />
    </div>

    <!-- Score and check -->
    <div class="crossword-game__toolbar">
      <div class="crossword-game__score-pill">
        <span class="crossword-game__score-label">{{ t('common.score') }}</span>
        <span class="crossword-game__score-value">{{ correctLetters }}</span>
      </div>
      <button class="crossword-game__check-btn" @click="onCheckProgress">
        {{ t('common.done') }}
      </button>
    </div>

    <!-- Clues -->
    <CrosswordClues
      :clues="puzzle.clues"
      :selected-clue="currentClue"
      :completed-clues="completedClueKeys"
      @clue-select="onClueSelect"
    />

    <!-- Keyboard -->
    <CrosswordKeyboard
      @key-press="onKeyPress"
      @backspace="onBackspace"
      @enter="onEnter"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { getRandomPuzzle } from '@/generators/crossword.generator'
import CrosswordGrid from './CrosswordGrid.vue'
import CrosswordClues from './CrosswordClues.vue'
import CrosswordKeyboard from './CrosswordKeyboard.vue'
import type { Difficulty, GameResult } from '@/types/game'
import type { CrosswordPuzzleData, CrosswordClue } from '@/data/crossword-puzzles/types'

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
  for (let r = 0; r < puzzle.value.height; r++) {
    for (let c = 0; c < puzzle.value.width; c++) {
      if (puzzle.value.grid[r][c] !== '#' && userGrid.value[r][c] === '') {
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
    hintsUsed: 0,
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
  gap: var(--space-md);
  padding: var(--space-md);
  max-width: var(--content-max-width);
  margin: 0 auto;
  width: 100%;
  font-family: var(--font-family);

  &__active-clue {
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
    padding: var(--space-md) var(--space-lg);
    background-color: var(--color-bg-elevated);
    border-radius: var(--radius-lg);
    border-left: 4px solid var(--color-primary);
    box-shadow: var(--shadow-card, var(--shadow-sm));
    min-height: var(--touch-target-min);
  }

  &__clue-badge {
    display: flex;
    align-items: center;
    gap: var(--space-xs);
  }

  &__clue-number {
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-bold);
    color: var(--color-primary);
  }

  &__clue-direction {
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text-tertiary);
    text-transform: uppercase;
    letter-spacing: var(--letter-spacing-wider);
    padding: 2px 8px;
    background-color: var(--color-primary-lighter, var(--color-bg-tertiary));
    border-radius: var(--radius-full);
  }

  &__clue-text {
    margin: 0;
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-medium);
    line-height: var(--line-height-relaxed);
    color: var(--color-text-primary);
  }

  &__grid-wrapper {
    padding: var(--space-xs) 0;
  }

  &__toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 var(--space-xs);
  }

  &__score-pill {
    display: flex;
    align-items: center;
    gap: var(--space-xs);
    padding: var(--space-xs) var(--space-sm);
    background-color: var(--color-bg-secondary);
    border-radius: var(--radius-full);
  }

  &__score-label {
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
  }

  &__score-value {
    font-size: var(--font-size-md);
    font-weight: var(--font-weight-bold);
    color: var(--color-primary);
  }

  &__check-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: var(--touch-target-min);
    padding: var(--space-sm) var(--space-xl);
    border: none;
    border-radius: var(--radius-md);
    background-color: var(--color-primary);
    color: var(--color-text-on-accent);
    font-size: var(--font-size-md);
    font-weight: var(--font-weight-bold);
    font-family: var(--font-family);
    cursor: pointer;
    transition: all var(--duration-normal) var(--ease-default);
    -webkit-tap-highlight-color: transparent;
    box-shadow: var(--shadow-sm);

    @include focus-ring;

    &:active {
      transform: scale(0.97);
      background-color: var(--color-primary-dark, #7B6A9B);
    }
  }
}
</style>
