import type { GameProgress } from '@/types/progress'

/**
 * Determine if a player should advance to a higher difficulty.
 *
 * Criteria for advancement:
 * - At least 5 games played at current difficulty
 * - Average score >= 70% of max possible
 * - At least 2 three-star results
 * - No more than 1 one-star result in the last 5 games
 */
export function shouldIncreaseDifficulty(progress: GameProgress): boolean {
  // Need at least 5 games played
  if (progress.totalPlayed < 5) return false

  // Already at highest difficulty
  if (progress.currentDifficulty === 'hard') return false

  // Need at least 2 three-star results
  if (progress.starCounts[3] < 2) return false

  // Average score should be decent (using bestScore as a proxy for max possible)
  if (progress.bestScore > 0 && progress.averageScore / progress.bestScore < 0.7) return false

  // Check ratio of perfect games
  if (progress.perfectGames / progress.totalPlayed < 0.2) return false

  return true
}

/**
 * Calculate the star rating for a game result.
 *
 * Stars are based on the ratio of score to maxScore:
 * - 3 stars: >= 90%
 * - 2 stars: >= 60%
 * - 1 star:  < 60%
 */
export function calculateStars(score: number, maxScore: number): 1 | 2 | 3 {
  if (maxScore <= 0) return 1

  const ratio = score / maxScore

  if (ratio >= 0.9) return 3
  if (ratio >= 0.6) return 2
  return 1
}

/**
 * Get the next difficulty level
 */
export function getNextDifficulty(current: 'easy' | 'medium' | 'hard'): 'easy' | 'medium' | 'hard' {
  switch (current) {
    case 'easy': return 'medium'
    case 'medium': return 'hard'
    case 'hard': return 'hard'
  }
}

/**
 * Get the previous difficulty level
 */
export function getPreviousDifficulty(current: 'easy' | 'medium' | 'hard'): 'easy' | 'medium' | 'hard' {
  switch (current) {
    case 'easy': return 'easy'
    case 'medium': return 'easy'
    case 'hard': return 'medium'
  }
}

/**
 * Calculate a difficulty multiplier for scoring
 */
export function getDifficultyMultiplier(difficulty: 'easy' | 'medium' | 'hard'): number {
  switch (difficulty) {
    case 'easy': return 1.0
    case 'medium': return 1.5
    case 'hard': return 2.0
  }
}
