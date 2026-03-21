import type { Difficulty } from './game'

export type SudokuBoard = (number | null)[][]
export type SudokuNotes = Set<number>[][]

export interface SudokuPuzzle {
  initial: SudokuBoard
  solution: SudokuBoard
  difficulty: Difficulty
  givens: number // number of pre-filled cells
}

export interface SudokuMove {
  row: number
  col: number
  previousValue: number | null
  newValue: number | null
  previousNotes: Set<number>
  newNotes: Set<number>
  timestamp: number
}

export interface SudokuState {
  puzzle: SudokuPuzzle
  board: SudokuBoard
  notes: SudokuNotes
  selectedCell: { row: number; col: number } | null
  isNotesMode: boolean
  moveHistory: SudokuMove[]
  errors: { row: number; col: number }[]
  hintsUsed: number
  isComplete: boolean
  startedAt: number
  elapsedTime: number
}
