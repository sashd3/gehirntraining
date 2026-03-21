import type { Difficulty, GameCategory } from './game'

export interface GameProgress {
  gameId: string
  totalPlayed: number
  totalScore: number
  bestScore: number
  bestTime: number | null
  averageScore: number
  averageTime: number
  currentDifficulty: Difficulty
  lastPlayedAt: number | null
  streakCount: number
  perfectGames: number
  totalHintsUsed: number
  starCounts: Record<1 | 2 | 3, number>
}

export interface GameSessionSummary {
  gameId: string
  difficulty: Difficulty
  score: number
  maxScore: number
  duration: number
  stars: 1 | 2 | 3
  completedAt: number
  isDailyChallenge: boolean
}

export interface DailyChallenge {
  date: string // YYYY-MM-DD
  gameId: string
  difficulty: Difficulty
  seed: number
  completed: boolean
  score: number | null
  completedAt: number | null
}

export interface StreakData {
  currentStreak: number
  longestStreak: number
  lastPlayedDate: string | null // YYYY-MM-DD
}

export interface OverallStats {
  totalGamesPlayed: number
  totalScore: number
  totalTimePlayed: number // seconds
  averageScore: number
  averageAccuracy: number
  favoriteGame: string | null
  favoriteCategory: GameCategory | null
  gamesPlayedByCategory: Record<GameCategory, number>
}

export interface Achievement {
  id: string
  nameKey: string
  descriptionKey: string
  icon: string
  unlockedAt: number | null
  isUnlocked: boolean
  requirement: {
    type: 'games_played' | 'total_score' | 'streak' | 'perfect_game' | 'category_mastery'
    value: number
    gameId?: string
    category?: GameCategory
  }
}
