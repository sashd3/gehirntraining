export type WordDirection =
  | 'horizontal'
  | 'vertical'
  | 'diagonal-down-right'
  | 'diagonal-down-left'
  | 'horizontal-reverse'
  | 'vertical-reverse'
  | 'diagonal-up-right'
  | 'diagonal-up-left'

export interface WordSearchWord {
  word: string
  startRow: number
  startCol: number
  direction: WordDirection
  found: boolean
}

export interface WordSearchPuzzle {
  grid: string[][]
  rows: number
  cols: number
  words: WordSearchWord[]
}

export interface WordSearchState {
  puzzle: WordSearchPuzzle
  foundWords: string[]
  selectedCells: { row: number; col: number }[]
  isSelecting: boolean
  isComplete: boolean
  hintsUsed: number
  startedAt: number
  elapsedTime: number
}
