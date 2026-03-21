<template>
  <div class="cw-grid-wrap">
    <div
      class="cw-grid"
      :style="{ gridTemplateColumns: `repeat(${width}, 1fr)` }"
    >
      <div
        v-for="(cell, idx) in flatCells"
        :key="idx"
        class="cw-cell"
        :class="{
          'cw-cell--black': cell.isBlack,
          'cw-cell--selected': cell.isSelected,
          'cw-cell--word': cell.isInWord && !cell.isSelected,
          'cw-cell--filled': !!cell.userLetter,
        }"
        @click="!cell.isBlack && emit('cell-select', { row: cell.row, col: cell.col })"
      >
        <template v-if="!cell.isBlack">
          <span v-if="cell.number" class="cw-cell__num">{{ cell.number }}</span>
          <span class="cw-cell__letter">{{ cell.userLetter }}</span>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
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

const height = computed(() => props.grid.length)
const width = computed(() => props.grid[0]?.length ?? 0)

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
  const clue = findClue(row, col, props.selectedDirection)
  if (!clue) return new Set<string>()
  const cells = new Set<string>()
  for (let i = 0; i < clue.answer.length; i++) {
    const r = clue.direction === 'down' ? clue.row + i : clue.row
    const c = clue.direction === 'across' ? clue.col + i : clue.col
    cells.add(`${r}-${c}`)
  }
  return cells
})

const flatCells = computed(() => {
  const result: Array<{
    row: number; col: number; isBlack: boolean;
    isSelected: boolean; isInWord: boolean;
    number: number | null; userLetter: string;
  }> = []
  for (let r = 0; r < height.value; r++) {
    for (let c = 0; c < width.value; c++) {
      const key = `${r}-${c}`
      const isBlack = props.grid[r]?.[c] === '#'
      const isSelected = props.selectedCell?.row === r && props.selectedCell?.col === c
      result.push({
        row: r, col: c, isBlack, isSelected,
        isInWord: selectedWordCells.value.has(key),
        number: cellNumbers.value[key] ?? null,
        userLetter: props.userInput[key] ?? '',
      })
    }
  }
  return result
})

function findClue(row: number, col: number, dir: 'across' | 'down'): CrosswordClue | null {
  for (const clue of props.clues) {
    if (clue.direction !== dir) continue
    for (let i = 0; i < clue.answer.length; i++) {
      const r = clue.direction === 'down' ? clue.row + i : clue.row
      const c = clue.direction === 'across' ? clue.col + i : clue.col
      if (r === row && c === col) return clue
    }
  }
  return null
}
</script>

<style scoped>
.cw-grid-wrap {
  width: 100%;
  max-width: 360px;
  margin: 0 auto;
}

.cw-grid {
  display: grid;
  gap: 0;
  border: 1px solid #D0CAD9;
  border-radius: 8px;
  overflow: hidden;
  background: #D0CAD9;
}

.cw-cell {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1;
  min-height: 36px;
  background: #FFFFFF;
  border: 0.5px solid #D0CAD9;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
}

.cw-cell--black {
  background: #E8E3EF;
  cursor: default;
}

.cw-cell--selected {
  background: #C4B5D4;
}

.cw-cell--selected .cw-cell__letter {
  color: #2D2540;
  font-weight: 700;
}

.cw-cell--word {
  background: #F0ECF5;
}

.cw-cell--filled .cw-cell__letter {
  font-weight: 600;
}

.cw-cell__num {
  position: absolute;
  top: 2px;
  left: 3px;
  font-size: 9px;
  font-weight: 600;
  color: #9B8AB8;
  line-height: 1;
  pointer-events: none;
}

.cw-cell__letter {
  font-size: 16px;
  font-weight: 500;
  color: #2D2540;
  text-transform: uppercase;
  line-height: 1;
  pointer-events: none;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
}
</style>
