import type { Difficulty } from '@/types/game'
import type { SudokuBoard, SudokuPuzzle } from '@/types/sudoku'

/**
 * Sudoku puzzle generator using backtracking.
 * Generates a complete valid board, then removes cells based on difficulty.
 */

const GRID_SIZE = 9
const BOX_SIZE = 3

/** Shuffle an array in-place (Fisher-Yates) */
function shuffle<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

/** Check if placing `num` at (row, col) is valid on the board */
function isValid(board: SudokuBoard, row: number, col: number, num: number): boolean {
  // Check row
  for (let c = 0; c < GRID_SIZE; c++) {
    if (board[row][c] === num) return false
  }

  // Check column
  for (let r = 0; r < GRID_SIZE; r++) {
    if (board[r][col] === num) return false
  }

  // Check 3x3 box
  const boxRow = Math.floor(row / BOX_SIZE) * BOX_SIZE
  const boxCol = Math.floor(col / BOX_SIZE) * BOX_SIZE
  for (let r = boxRow; r < boxRow + BOX_SIZE; r++) {
    for (let c = boxCol; c < boxCol + BOX_SIZE; c++) {
      if (board[r][c] === num) return false
    }
  }

  return true
}

/** Fill the board completely using backtracking */
function fillBoard(board: SudokuBoard): boolean {
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      if (board[row][col] === null) {
        const numbers = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9])
        for (const num of numbers) {
          if (isValid(board, row, col, num)) {
            board[row][col] = num
            if (fillBoard(board)) return true
            board[row][col] = null
          }
        }
        return false
      }
    }
  }
  return true
}

/** Create an empty 9x9 board */
function createEmptyBoard(): SudokuBoard {
  return Array.from({ length: GRID_SIZE }, () =>
    Array.from({ length: GRID_SIZE }, () => null)
  )
}

/** Deep clone a board */
function cloneBoard(board: SudokuBoard): SudokuBoard {
  return board.map(row => [...row])
}

/** Get the number of givens for a difficulty */
function getGivensRange(difficulty: Difficulty): { min: number; max: number } {
  switch (difficulty) {
    case 'easy':
      return { min: 38, max: 42 }
    case 'medium':
      return { min: 30, max: 37 }
    case 'hard':
      return { min: 24, max: 29 }
  }
}

/**
 * Generate a Sudoku puzzle with the given difficulty.
 * Returns the initial board (with blanks) and the full solution.
 */
export function generateSudokuPuzzle(difficulty: Difficulty): SudokuPuzzle {
  // Step 1: Generate a complete valid board
  const solution = createEmptyBoard()
  fillBoard(solution)

  // Step 2: Remove cells based on difficulty
  const { min, max } = getGivensRange(difficulty)
  const targetGivens = min + Math.floor(Math.random() * (max - min + 1))
  const cellsToRemove = GRID_SIZE * GRID_SIZE - targetGivens

  const initial = cloneBoard(solution)

  // Create a shuffled list of all cell positions
  const positions: { row: number; col: number }[] = []
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      positions.push({ row: r, col: c })
    }
  }
  shuffle(positions)

  // Remove cells
  let removed = 0
  for (const { row, col } of positions) {
    if (removed >= cellsToRemove) break
    if (initial[row][col] !== null) {
      initial[row][col] = null
      removed++
    }
  }

  const givens = GRID_SIZE * GRID_SIZE - removed

  return {
    initial,
    solution: solution as number[][],
    difficulty,
    givens,
  }
}

/**
 * Validate whether placing `num` at (row, col) is a valid move
 * on the current board state.
 */
export function validateMove(
  board: SudokuBoard,
  row: number,
  col: number,
  num: number
): boolean {
  // Temporarily clear the cell for validation
  const saved = board[row][col]
  board[row][col] = null
  const valid = isValid(board, row, col, num)
  board[row][col] = saved
  return valid
}

/**
 * Get a hint: find an empty cell and return the correct value from the solution.
 */
export function getSudokuHint(
  puzzle: SudokuPuzzle,
  current: SudokuBoard
): { row: number; col: number; value: number } | null {
  // Collect all empty or incorrect cells
  const candidates: { row: number; col: number; value: number }[] = []

  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      if (current[r][c] === null || current[r][c] !== puzzle.solution[r][c]) {
        candidates.push({
          row: r,
          col: c,
          value: puzzle.solution[r][c],
        })
      }
    }
  }

  if (candidates.length === 0) return null

  // Return a random candidate
  const idx = Math.floor(Math.random() * candidates.length)
  return candidates[idx]
}

/**
 * Check if the board is fully and correctly solved.
 */
export function isBoardComplete(board: SudokuBoard, solution: number[][]): boolean {
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      if (board[r][c] !== solution[r][c]) return false
    }
  }
  return true
}
