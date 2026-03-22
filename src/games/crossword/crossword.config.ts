import type { GameConfig } from '@/types/game'

export const crosswordConfig: GameConfig = {
  id: 'crossword',
  nameKey: 'games.crossword.name',
  descriptionKey: 'games.crossword.description',
  icon: 'grid-3x3',
  color: '#D4956B',
  category: 'language',
  difficulties: ['easy', 'medium', 'hard'],
  defaultDifficulty: 'easy',
  estimatedDuration: { easy: 5, medium: 10, hard: 20 },
  component: () => import('./CrosswordGame.vue'),
}
