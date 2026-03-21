import type { GameConfig } from '@/types/game'

export const numberSequenceConfig: GameConfig = {
  id: 'number-sequence',
  nameKey: 'games.numberSequence.name',
  descriptionKey: 'games.numberSequence.description',
  icon: 'hash',
  color: '#62B8C9',
  category: 'logic',
  difficulties: ['easy', 'medium', 'hard'],
  defaultDifficulty: 'easy',
  estimatedDuration: { easy: 5, medium: 8, hard: 12 },
  component: () => import('./NumberSequenceGame.vue'),
}
