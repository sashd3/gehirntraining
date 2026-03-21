import type { Difficulty } from '@/types/game'
import type { QuizQuestion, QuizCategory } from '@/types/quiz'
import { historyQuestions } from '@/data/quiz-questions/history.de'
import { scienceQuestions } from '@/data/quiz-questions/science.de'
import { geographyQuestions } from '@/data/quiz-questions/geography.de'
import { generalQuestions } from '@/data/quiz-questions/general.de'
import { swissEuropeQuestions } from '@/data/quiz-questions/swiss-europe.de'

// Map data-file questions to the app's QuizQuestion type
type RawQuestion = (typeof historyQuestions)[number]

function toQuizQuestion(raw: RawQuestion, category: QuizCategory): QuizQuestion {
  return {
    id: raw.id,
    category,
    question: raw.question,
    answers: raw.answers,
    correctAnswerIndex: raw.correctIndex,
    difficulty: raw.difficulty,
    explanation: raw.explanation ?? '',
  }
}

/** Get all questions for a given category, converted to the app QuizQuestion type */
function getQuestionsByCategory(category: QuizCategory): QuizQuestion[] {
  switch (category) {
    case 'history':
      return historyQuestions.map((q) => toQuizQuestion(q, 'history'))
    case 'science':
      return scienceQuestions.map((q) => toQuizQuestion(q, 'science'))
    case 'geography':
      return geographyQuestions.map((q) => toQuizQuestion(q, 'geography'))
    case 'general':
      return generalQuestions.map((q) => toQuizQuestion(q, 'general'))
    case 'swiss-europe':
      return swissEuropeQuestions.map((q) => toQuizQuestion(q, 'swiss-europe'))
  }
}

/** Fisher-Yates shuffle */
function shuffle<T>(arr: T[]): T[] {
  const result = [...arr]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

/**
 * Select quiz questions based on category, difficulty, and desired count.
 *
 * - If category is 'mixed', picks evenly from all four categories.
 * - Filters by difficulty, then shuffles and returns up to `count` questions.
 */
export function selectQuizQuestions(
  category: QuizCategory | 'mixed',
  difficulty: Difficulty,
  count: number,
): QuizQuestion[] {
  if (category === 'mixed') {
    return selectMixedQuestions(difficulty, count)
  }

  const allForCategory = getQuestionsByCategory(category)
  const filtered = allForCategory.filter((q) => q.difficulty === difficulty)
  return shuffle(filtered).slice(0, count)
}

/**
 * Pick questions evenly from all categories for a mixed quiz.
 */
function selectMixedQuestions(difficulty: Difficulty, count: number): QuizQuestion[] {
  const categories: QuizCategory[] = ['history', 'science', 'geography', 'general', 'swiss-europe']
  const perCategory = Math.ceil(count / categories.length)
  const pool: QuizQuestion[] = []

  for (const cat of categories) {
    const filtered = getQuestionsByCategory(cat).filter((q) => q.difficulty === difficulty)
    pool.push(...shuffle(filtered).slice(0, perCategory))
  }

  return shuffle(pool).slice(0, count)
}
