import type { Difficulty } from '@/types/game'
import type { WordSearchPuzzle, WordSearchWord, WordDirection } from '@/types/word-search'

/**
 * Word search puzzle generator.
 * Places German words on a grid and fills remaining cells with random letters.
 */

// German word lists grouped by length for better placement
const GERMAN_WORDS: string[] = [
  // 3-4 letters
  'BAUM', 'HAUS', 'HUND', 'BUCH', 'BERG', 'MOND', 'TIER', 'BROT',
  'FISCH', 'GOLD', 'HAND', 'HERZ', 'KIND', 'LIED', 'MEER', 'NEST',
  // 5 letters
  'APFEL', 'BLUME', 'STERN', 'WOLKE', 'VOGEL', 'TISCH', 'STUHL',
  'LAMPE', 'KATZE', 'MILCH', 'GARTEN', 'SONNE', 'REGEN', 'STEIN',
  'ENGEL', 'KERZE', 'BIRNE', 'FARBE', 'NACHT', 'TRAUM',
  // 6 letters
  'BLUMEN', 'BRUDER', 'GLUECK', 'KIRCHE', 'KUCHEN', 'LERNEN',
  'MORGEN', 'NATUR', 'REISEN', 'SCHULE', 'FREUDE', 'HIMMEL',
  'KAFFEE', 'FENSTER', 'WINTER', 'SOMMER', 'HERBST', 'WASSER',
  // 7+ letters
  'FRIEDEN', 'FREIHEIT', 'FREUNDE', 'GEDULD', 'FAMILIE',
  'ABEND', 'LIEBE', 'STERNE', 'WIESE', 'BRILLE', 'PFLANZE',
  'FREUND', 'GARTEN', 'STRAND', 'WETTER',
]

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

/** Shuffle an array in-place */
function shuffle<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

/** Get grid size and word count for difficulty */
function getDifficultyParams(difficulty: Difficulty): {
  rows: number
  cols: number
  wordCount: { min: number; max: number }
  directions: WordDirection[]
} {
  switch (difficulty) {
    case 'easy':
      return {
        rows: 8,
        cols: 8,
        wordCount: { min: 4, max: 5 },
        directions: ['horizontal', 'vertical'],
      }
    case 'medium':
      return {
        rows: 10,
        cols: 10,
        wordCount: { min: 6, max: 7 },
        directions: ['horizontal', 'vertical', 'diagonal-down-right', 'diagonal-down-left'],
      }
    case 'hard':
      return {
        rows: 12,
        cols: 12,
        wordCount: { min: 8, max: 10 },
        directions: [
          'horizontal', 'vertical',
          'diagonal-down-right', 'diagonal-down-left',
          'horizontal-reverse', 'vertical-reverse',
          'diagonal-up-right', 'diagonal-up-left',
        ],
      }
  }
}

/** Get the row/col delta for a direction */
function getDirectionDelta(direction: WordDirection): { dr: number; dc: number } {
  switch (direction) {
    case 'horizontal':           return { dr: 0, dc: 1 }
    case 'vertical':             return { dr: 1, dc: 0 }
    case 'diagonal-down-right':  return { dr: 1, dc: 1 }
    case 'diagonal-down-left':   return { dr: 1, dc: -1 }
    case 'horizontal-reverse':   return { dr: 0, dc: -1 }
    case 'vertical-reverse':     return { dr: -1, dc: 0 }
    case 'diagonal-up-right':    return { dr: -1, dc: 1 }
    case 'diagonal-up-left':     return { dr: -1, dc: -1 }
  }
}

/** Try to place a word on the grid. Returns placement info or null if impossible. */
function tryPlaceWord(
  grid: (string | null)[][],
  word: string,
  rows: number,
  cols: number,
  directions: WordDirection[]
): WordSearchWord | null {
  const shuffledDirs = shuffle([...directions])

  for (const direction of shuffledDirs) {
    const { dr, dc } = getDirectionDelta(direction)
    const len = word.length

    // Determine valid start positions
    const startPositions: { row: number; col: number }[] = []
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // Check if word fits from this position
        const endRow = r + dr * (len - 1)
        const endCol = c + dc * (len - 1)
        if (endRow >= 0 && endRow < rows && endCol >= 0 && endCol < cols) {
          startPositions.push({ row: r, col: c })
        }
      }
    }

    shuffle(startPositions)

    for (const { row, col } of startPositions) {
      // Check if word can be placed here without conflicts
      let canPlace = true
      for (let i = 0; i < len; i++) {
        const r = row + dr * i
        const c = col + dc * i
        const existing = grid[r][c]
        if (existing !== null && existing !== word[i]) {
          canPlace = false
          break
        }
      }

      if (canPlace) {
        // Place the word
        for (let i = 0; i < len; i++) {
          grid[row + dr * i][col + dc * i] = word[i]
        }
        return {
          word,
          startRow: row,
          startCol: col,
          direction,
          found: false,
        }
      }
    }
  }

  return null
}

/**
 * Generate a word search puzzle.
 */
export function generateWordSearchPuzzle(difficulty: Difficulty): WordSearchPuzzle {
  const params = getDifficultyParams(difficulty)
  const { rows, cols, wordCount, directions } = params

  const targetCount = wordCount.min + Math.floor(Math.random() * (wordCount.max - wordCount.min + 1))

  // Filter words that fit in the grid
  const maxLen = Math.max(rows, cols)
  const availableWords = shuffle(
    GERMAN_WORDS.filter(w => w.length <= maxLen)
  )

  // Create empty grid
  const grid: (string | null)[][] = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => null)
  )

  // Place words
  const placedWords: WordSearchWord[] = []
  for (const word of availableWords) {
    if (placedWords.length >= targetCount) break

    // Skip if word is too similar to already placed words
    if (placedWords.some(pw => pw.word === word)) continue

    const placement = tryPlaceWord(grid, word, rows, cols, directions)
    if (placement) {
      placedWords.push(placement)
    }
  }

  // Fill remaining cells with random letters
  const filledGrid: string[][] = grid.map(row =>
    row.map(cell => cell ?? ALPHABET[Math.floor(Math.random() * ALPHABET.length)])
  )

  return {
    grid: filledGrid,
    rows,
    cols,
    words: placedWords,
  }
}

/**
 * Check if a selection matches a word in the puzzle.
 * Returns the matched word or null.
 */
export function checkWordSelection(
  puzzle: WordSearchPuzzle,
  startRow: number,
  startCol: number,
  endRow: number,
  endCol: number
): string | null {
  for (const wordInfo of puzzle.words) {
    if (wordInfo.found) continue

    const { dr, dc } = getDirectionDelta(wordInfo.direction)
    const len = wordInfo.word.length
    const wordEndRow = wordInfo.startRow + dr * (len - 1)
    const wordEndCol = wordInfo.startCol + dc * (len - 1)

    // Check forward match
    if (
      startRow === wordInfo.startRow &&
      startCol === wordInfo.startCol &&
      endRow === wordEndRow &&
      endCol === wordEndCol
    ) {
      return wordInfo.word
    }

    // Check reverse match
    if (
      startRow === wordEndRow &&
      startCol === wordEndCol &&
      endRow === wordInfo.startRow &&
      endCol === wordInfo.startCol
    ) {
      return wordInfo.word
    }
  }

  return null
}

/**
 * Get the cells occupied by a placed word.
 */
export function getWordCells(
  word: WordSearchWord
): { row: number; col: number }[] {
  const { dr, dc } = getDirectionDelta(word.direction)
  const cells: { row: number; col: number }[] = []
  for (let i = 0; i < word.word.length; i++) {
    cells.push({
      row: word.startRow + dr * i,
      col: word.startCol + dc * i,
    })
  }
  return cells
}
