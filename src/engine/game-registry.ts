import type { GameConfig, GameCategory } from '@/types/game'
import { quizConfig } from '@/games/quiz/quiz.config'
import { sudokuConfig } from '@/games/sudoku/sudoku.config'
import { crosswordConfig } from '@/games/crossword/crossword.config'
import { memoryConfig } from '@/games/memory/memory.config'
import { wordSearchConfig } from '@/games/word-search/word-search.config'
import { numberSequenceConfig } from '@/games/number-sequence/number-sequence.config'
import { colorShapeConfig } from '@/games/color-shape/color-shape.config'

/**
 * Central game registry with all available games.
 */
export const gameRegistry: GameConfig[] = [
  quizConfig,
  crosswordConfig,
  sudokuConfig,
  memoryConfig,
  wordSearchConfig,
  numberSequenceConfig,
  colorShapeConfig,
]

/**
 * Register a game configuration in the registry
 */
export function registerGame(config: GameConfig): void {
  const exists = gameRegistry.findIndex(g => g.id === config.id)
  if (exists >= 0) {
    gameRegistry[exists] = config
  } else {
    gameRegistry.push(config)
  }
}

/**
 * Get a game config by its ID
 */
export function getGameById(id: string): GameConfig | undefined {
  return gameRegistry.find(game => game.id === id)
}

/**
 * Get all registered games
 */
export function getAllGames(): GameConfig[] {
  return [...gameRegistry]
}

/**
 * Get games filtered by category
 */
export function getGamesByCategory(category: GameCategory): GameConfig[] {
  return gameRegistry.filter(game => game.category === category)
}

/**
 * Get all unique categories that have at least one registered game
 */
export function getAvailableCategories(): GameCategory[] {
  const categories = new Set<GameCategory>(gameRegistry.map(g => g.category))
  return Array.from(categories)
}

/**
 * Get the count of games per category
 */
export function getGameCountByCategory(): Record<GameCategory, number> {
  const counts: Record<GameCategory, number> = {
    knowledge: 0,
    logic: 0,
    memory: 0,
    speed: 0,
    language: 0,
  }
  for (const game of gameRegistry) {
    counts[game.category] += 1
  }
  return counts
}
