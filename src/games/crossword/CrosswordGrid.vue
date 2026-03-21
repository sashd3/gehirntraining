<template>
  <div
    class="crossword-grid"
    :style="gridStyle"
    role="grid"
    :aria-label="t('games.crossword.name')"
  >
    <template v-for="(row, rowIndex) in grid" :key="rowIndex">
      <div
        v-for="(cell, colIndex) in row"
        :key="`${rowIndex}-${colIndex}`"
        class="crossword-grid__cell"
        :class="cellClasses(rowIndex, colIndex)"
        :role="isBlack(rowIndex, colIndex) ? 'presentation' : 'gridcell'"
        :tabindex="isBlack(rowIndex, colIndex) ? -1 : 0"
        @click="handleCellClick(rowIndex, colIndex)"
      >
        <template v-if="!isBlack(rowIndex, colIndex)">
          <!-- Cell number -->
          <span
            v-if="getCellNumber(rowIndex, colIndex)"
            class="crossword-grid__number"
          >
            {{ getCellNumber(rowIndex, colIndex) }}
          </span>
          <!-- User input -->
          <span class="crossword-grid__letter">
            {{ getUserInput(rowIndex, colIndex) }}
          </span>
        </template>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { CrosswordClue } from '@/data/crossword-puzzles/types'

const props = defineProps<{
  grid: string[][]
  clues: CrosswordClue[]
  selectedCell: { row: number; col: number } | null
  selectedDirection: 'across' | 'down'
  userInput: Record<string, string>
}>()

const emit = defineEmits<{
  'cell-select': [cell: { row: number; col: number }]
}>()

const { t } = useI18n()

const height = computed(() => props.grid.length)
const width = computed(() => (props.grid[0]?.length ?? 0))

const gridStyle = computed(() => ({
  gridTemplateColumns: `repeat(${width.value}, 1fr)`,
  gridTemplateRows: `repeat(${height.value}, 1fr)`,
}))

const cellNumbers = computed(() => {
  const map: Record<string, number> = {}
  for (const clue of props.clues) {
    const key = `${clue.row}-${clue.col}`
    if (!map[key] || clue.number < map[key]) {
      map[key] = clue.number
    }
  }
  return map
})

const selectedWordCells = computed(() => {
  if (!props.selectedCell) return new Set<string>()

  const { row, col } = props.selectedCell
  const clue = findClueForCell(row, col, props.selectedDirection)
  if (!clue) return new Set<string>()

  const cells = new Set<string>()
  for (let i = 0; i < clue.answer.length; i++) {
    const r = clue.direction === 'down' ? clue.row + i : clue.row
    const c = clue.direction === 'across' ? clue.col + i : clue.col
    cells.add(`${r}-${c}`)
  }
  return cells
})

function isBlack(row: number, col: number): boolean {
  return props.grid[row]?.[col] === '#'
}

function getCellNumber(row: number, col: number): number | null {
  return cellNumbers.value[`${row}-${col}`] ?? null
}

function getUserInput(row: number, col: number): string {
  return props.userInput[`${row}-${col}`] ?? ''
}

function isSelectedCell(row: number, col: number): boolean {
  if (!props.selectedCell) return false
  return props.selectedCell.row === row && props.selectedCell.col === col
}

function isInSelectedWord(row: number, col: number): boolean {
  return selectedWordCells.value.has(`${row}-${col}`)
}

function cellClasses(row: number, col: number) {
  return {
    'crossword-grid__cell--black': isBlack(row, col),
    'crossword-grid__cell--selected': isSelectedCell(row, col),
    'crossword-grid__cell--word': !isSelectedCell(row, col) && isInSelectedWord(row, col),
    'crossword-grid__cell--filled': !!getUserInput(row, col),
  }
}

function handleCellClick(row: number, col: number) {
  if (isBlack(row, col)) return
  emit('cell-select', { row, col })
}

function findClueForCell(
  row: number,
  col: number,
  direction: 'across' | 'down',
): CrosswordClue | null {
  for (const clue of props.clues) {
    if (clue.direction !== direction) continue
    for (let i = 0; i < clue.answer.length; i++) {
      const r = clue.direction === 'down' ? clue.row + i : clue.row
      const c = clue.direction === 'across' ? clue.col + i : clue.col
      if (r === row && c === col) return clue
    }
  }
  for (const clue of props.clues) {
    if (clue.direction === direction) continue
    for (let i = 0; i < clue.answer.length; i++) {
      const r = clue.direction === 'down' ? clue.row + i : clue.row
      const c = clue.direction === 'across' ? clue.col + i : clue.col
      if (r === row && c === col) return clue
    }
  }
  return null
}
</script>

<style lang="scss" scoped>
.crossword-grid {
  display: grid;
  gap: 1px;
  background-color: var(--color-border-light);
  border: 2px solid var(--color-text-primary);
  border-radius: var(--radius-md);
  overflow: hidden;
  aspect-ratio: 1;
  max-width: 100%;
  width: 100%;
  font-family: var(--font-family);

  &__cell {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 40px;
    min-height: 40px;
    background-color: var(--color-bg-elevated);
    cursor: pointer;
    transition: background-color var(--duration-fast) var(--ease-default);
    -webkit-tap-highlight-color: transparent;
    user-select: none;

    &--black {
      background-color: var(--color-text-primary, #2D2540);
      cursor: default;
    }

    &--selected {
      background-color: var(--color-primary-light, #C4B5D4);
      z-index: 1;

      .crossword-grid__letter {
        color: var(--color-text-primary);
        font-weight: var(--font-weight-bold);
      }

      .crossword-grid__number {
        color: var(--color-primary-darker, #5C4D7A);
      }
    }

    &--word {
      background-color: var(--color-primary-lighter, #E8E0F0);
    }

    &--filled {
      .crossword-grid__letter {
        font-weight: var(--font-weight-bold);
      }
    }

    &:focus-visible {
      outline: 3px solid var(--color-border-focus);
      outline-offset: -2px;
      z-index: 2;
    }
  }

  &__number {
    position: absolute;
    top: 1px;
    left: 3px;
    font-size: 10px;
    font-weight: var(--font-weight-semibold);
    color: var(--color-text-tertiary);
    line-height: 1;
    pointer-events: none;
  }

  &__letter {
    font-size: var(--font-size-md);
    font-weight: var(--font-weight-medium);
    color: var(--color-text-primary);
    text-transform: uppercase;
    line-height: 1;
    pointer-events: none;
  }
}
</style>
