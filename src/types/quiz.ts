import type { Difficulty } from './game'

export type QuizCategory = 'history' | 'science' | 'geography' | 'general' | 'swiss-europe'

export interface QuizQuestion {
  id: string
  category: QuizCategory
  question: string
  answers: string[]
  correctAnswerIndex: number
  difficulty: Difficulty
  explanation: string
}

export interface QuizAnswer {
  questionId: string
  selectedIndex: number
  isCorrect: boolean
  timeSpent: number // milliseconds
}

export interface QuizState {
  questions: QuizQuestion[]
  currentQuestionIndex: number
  answers: QuizAnswer[]
  score: number
  maxScore: number
  isComplete: boolean
  timeRemaining: number | null
  streak: number
  bestStreak: number
}
