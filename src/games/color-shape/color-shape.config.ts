import type { GameConfig } from '@/types/game'

export const colorShapeConfig: GameConfig = {
  id: 'color-shape',
  nameKey: 'games.colorShape.name',
  descriptionKey: 'games.colorShape.description',
  icon: 'palette',
  color: '#B87BC5',
  category: 'speed',
  difficulties: ['easy', 'medium', 'hard'],
  defaultDifficulty: 'easy',
  estimatedDuration: { easy: 3, medium: 5, hard: 8 },
  component: () => import('./ColorShapeGame.vue'),
}
