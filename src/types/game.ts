export type Difficulty = 'easy' | 'medium' | 'hard'
export type GameCategory = 'knowledge' | 'logic' | 'memory' | 'speed' | 'language'

export interface GameConfig {
  id: string
  nameKey: string
  descriptionKey: string
  icon: string
  color: string
  category: GameCategory
  difficulties: Difficulty[]
  defaultDifficulty: Difficulty
  estimatedDuration: Record<Difficulty, number> // minutes
  component: () => Promise<any>
}

export interface GameSession {
  gameId: string
  difficulty: Difficulty
  startedAt: number
  completedAt: number | null
  score: number
  maxScore: number
  duration: number
  moves: number
  hintsUsed: number
  isComplete: boolean
  isDailyChallenge: boolean
}

export interface GameResult {
  score: number
  maxScore: number
  duration: number
  accuracy: number
  hintsUsed: number
  isNewBest: boolean
  stars: 1 | 2 | 3
}
