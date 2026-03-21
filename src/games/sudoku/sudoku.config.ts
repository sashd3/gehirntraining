import type { GameConfig } from '@/types/game'

export const sudokuConfig: GameConfig = {
  id: 'sudoku',
  nameKey: 'games.sudoku.name',
  descriptionKey: 'games.sudoku.description',
  icon: 'grid',
  color: '#6BBFAE',
  category: 'logic',
  difficulties: ['easy', 'medium', 'hard'],
  defaultDifficulty: 'easy',
  estimatedDuration: { easy: 10, medium: 20, hard: 35 },
  component: () => import('./SudokuGame.vue'),
}
