export interface CrosswordClue {
  number: number
  direction: 'across' | 'down'
  clue: string
  answer: string
  row: number
  col: number
}

export interface CrosswordPuzzleData {
  id: string
  difficulty: 'easy' | 'medium' | 'hard'
  width: number
  height: number
  /** Grid: '#' for black cells, ' ' for empty white cells */
  grid: string[][]
  clues: CrosswordClue[]
}
