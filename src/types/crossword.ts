export interface CrosswordCell {
  letter: string
  number: number | null
  isBlack: boolean
  userInput: string
  isRevealed: boolean
}

export interface CrosswordClue {
  number: number
  text: string
  answer: string
  startRow: number
  startCol: number
  length: number
}

export interface CrosswordPuzzle {
  grid: CrosswordCell[][]
  width: number
  height: number
  cluesAcross: CrosswordClue[]
  cluesDown: CrosswordClue[]
}

export interface CrosswordState {
  puzzle: CrosswordPuzzle
  selectedCell: { row: number; col: number } | null
  selectedDirection: 'across' | 'down'
  selectedClue: CrosswordClue | null
  isComplete: boolean
  hintsUsed: number
  revealedCells: number
  startedAt: number
  elapsedTime: number
  correctCells: number
  totalCells: number
}
