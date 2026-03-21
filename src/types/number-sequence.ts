import type { Difficulty } from './game'

export type SequencePattern =
  | 'arithmetic'      // +n each step
  | 'geometric'       // *n each step
  | 'fibonacci'       // sum of previous two
  | 'square'          // n^2
  | 'cube'            // n^3
  | 'prime'           // prime numbers
  | 'triangular'      // triangular numbers
  | 'alternating'     // alternating +a, +b
  | 'power-of-two'    // 2^n
  | 'custom'          // custom formula

export interface NumberSequencePuzzle {
  id: string
  sequence: number[]
  hiddenIndices: number[]    // indices the user must fill
  pattern: SequencePattern
  difficulty: Difficulty
  hint: string
  explanation: string
}

export interface NumberSequenceState {
  puzzle: NumberSequencePuzzle
  userAnswers: Record<number, number | null> // index -> user's answer
  revealedHints: number
  isComplete: boolean
  isCorrect: boolean
  startedAt: number
  elapsedTime: number
  attempts: number
}
