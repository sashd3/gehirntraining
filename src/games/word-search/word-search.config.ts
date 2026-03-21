import type { GameConfig } from '@/types/game'

export const wordSearchConfig: GameConfig = {
  id: 'word-search',
  nameKey: 'games.wordSearch.name',
  descriptionKey: 'games.wordSearch.description',
  icon: 'search',
  color: '#8B7BB5',
  category: 'language',
  difficulties: ['easy', 'medium', 'hard'],
  defaultDifficulty: 'easy',
  estimatedDuration: { easy: 8, medium: 12, hard: 18 },
  component: () => import('./WordSearchGame.vue'),
}
