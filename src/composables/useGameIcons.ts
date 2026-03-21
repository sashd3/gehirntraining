/**
 * SVG path data for game-themed icons.
 * Each icon is designed for a 24x24 viewBox.
 */
export const gameIconPaths: Record<string, string> = {
  // Quiz: lightbulb (idea/knowledge)
  quiz: 'M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17a1 1 0 001 1h6a1 1 0 001-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7zm2 13h-4v-1.42c0-.27-.13-.52-.35-.68A5.01 5.01 0 017 9c0-2.76 2.24-5 5-5s5 2.24 5 5a5.01 5.01 0 01-2.65 4.4c-.22.16-.35.41-.35.68V15zM9 19h6v1a2 2 0 01-2 2h-2a2 2 0 01-2-2v-1z',

  // Crossword: grid with letters
  crossword: 'M3 3h18v18H3V3zm2 2v14h14V5H5zm2 2h4v4H7V7zm6 0h4v4h-4V7zm-6 6h4v4H7v-4zm6 0h4v4h-4v-4z',

  // Sudoku: 3x3 grid
  sudoku: 'M3 3h18v18H3V3zm2 2v14h14V5H5zm4 0v14M13 5v14M5 9h14M5 13h14',

  // Memory: two cards
  memory: 'M4 4h6a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm10 0h6a2 2 0 012 2v10a2 2 0 01-2 2h-6a2 2 0 01-2-2V6a2 2 0 012-2zM7 9a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm10 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3z',

  // Word Search: magnifying glass with letters
  'word-search': 'M15.5 14h-.79l-.28-.27A6.47 6.47 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z',

  // Number Sequence: hash/numbers
  'number-sequence': 'M4 8h16M4 16h16M8 4v16M16 4v16',

  // Color & Shape: palette
  'color-shape': 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-1 0-.83.67-1.5 1.5-1.5H16c3.31 0 6-2.69 6-6 0-4.96-4.48-9-10-9zm-5.5 9a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm3-4a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm5 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm3 4a1.5 1.5 0 110-3 1.5 1.5 0 010 3z',
}

/** Returns SVG path data for a given game ID */
export function getGameIconPath(gameId: string): string {
  return gameIconPaths[gameId] || gameIconPaths.quiz
}

/** Whether the icon uses stroke (line-based) vs fill */
export const strokeIcons = new Set(['sudoku', 'number-sequence'])
