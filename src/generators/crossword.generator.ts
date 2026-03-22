import type { Difficulty } from '@/types/game'
import type { CrosswordPuzzleData } from '@/data/crossword-puzzles/types'
import { easyPuzzles } from '@/data/crossword-puzzles/easy.de'
import { easyPuzzles2 } from '@/data/crossword-puzzles/easy-2.de'
import { mediumPuzzles } from '@/data/crossword-puzzles/medium.de'
import { mediumPuzzles2 } from '@/data/crossword-puzzles/medium-2.de'
import { hardPuzzles } from '@/data/crossword-puzzles/hard.de'
import { hardPuzzles2 } from '@/data/crossword-puzzles/hard-2.de'

/** Get the pool of puzzles for a given difficulty */
function getPuzzlePool(difficulty: Difficulty): CrosswordPuzzleData[] {
  switch (difficulty) {
    case 'easy':
      return [...easyPuzzles, ...easyPuzzles2]
    case 'medium':
      return [...mediumPuzzles, ...mediumPuzzles2]
    case 'hard':
      return [...hardPuzzles, ...hardPuzzles2]
    default:
      return [...easyPuzzles, ...easyPuzzles2]
  }
}

/**
 * Load a crossword puzzle by difficulty and optional index.
 * If no index is provided, a random puzzle is selected.
 */
export function loadCrosswordPuzzle(
  difficulty: Difficulty,
  index?: number,
): CrosswordPuzzleData {
  const pool = getPuzzlePool(difficulty)

  if (pool.length === 0) {
    throw new Error(`No crossword puzzles available for difficulty: ${difficulty}`)
  }

  if (index !== undefined && index >= 0 && index < pool.length) {
    return pool[index]
  }

  return pool[Math.floor(Math.random() * pool.length)]
}

/**
 * Get a random puzzle for the given difficulty.
 */
export function getRandomPuzzle(difficulty: Difficulty): CrosswordPuzzleData {
  return loadCrosswordPuzzle(difficulty)
}
