import type { GameConfig } from '@/types/game'

export const memoryConfig: GameConfig = {
  id: 'memory',
  nameKey: 'games.memory.name',
  descriptionKey: 'games.memory.description',
  icon: 'layers',
  color: '#5AB5A3',
  category: 'memory',
  difficulties: ['easy', 'medium', 'hard'],
  defaultDifficulty: 'easy',
  estimatedDuration: { easy: 5, medium: 8, hard: 12 },
  component: () => import('./MemoryGame.vue'),
}
