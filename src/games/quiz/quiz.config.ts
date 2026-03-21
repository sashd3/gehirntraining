import type { GameConfig } from '@/types/game'

export const quizConfig: GameConfig = {
  id: 'quiz',
  nameKey: 'games.quiz.name',
  descriptionKey: 'games.quiz.description',
  icon: 'help-circle',
  color: '#9B8AB8',
  category: 'knowledge',
  difficulties: ['easy', 'medium', 'hard'],
  defaultDifficulty: 'easy',
  estimatedDuration: { easy: 3, medium: 5, hard: 8 },
  component: () => import('./QuizGame.vue'),
}
