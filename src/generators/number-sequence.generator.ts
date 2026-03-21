import type { Difficulty } from '@/types/game'
import type { NumberSequencePuzzle, SequencePattern } from '@/types/number-sequence'

/**
 * Number sequence puzzle generator.
 * Creates various mathematical sequences with one missing number.
 */

let puzzleCounter = 0

function nextId(): string {
  return `seq-${Date.now()}-${++puzzleCounter}`
}

/** Generate a random integer between min and max (inclusive) */
function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/** Pick a random element from an array */
function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

// ---------------------------------------------------------------------------
// Sequence generators by pattern type
// ---------------------------------------------------------------------------

interface SequenceResult {
  sequence: number[]
  pattern: SequencePattern
  hint: string
  explanation: string
}

function generateArithmetic(): SequenceResult {
  const step = randInt(1, 12) * (Math.random() < 0.3 ? -1 : 1)
  const start = randInt(1, 50)
  const length = randInt(5, 7)
  const sequence: number[] = []

  for (let i = 0; i < length; i++) {
    sequence.push(start + step * i)
  }

  const sign = step > 0 ? '+' : '-'
  return {
    sequence,
    pattern: 'arithmetic',
    hint: `Jede Zahl wird um ${Math.abs(step)} ${step > 0 ? 'erhoeht' : 'verringert'}.`,
    explanation: `Arithmetische Folge: ${sign}${Math.abs(step)} pro Schritt.`,
  }
}

function generateGeometric(): SequenceResult {
  const factor = pickRandom([2, 3, 4, 5])
  const start = randInt(1, 5)
  const length = 5
  const sequence: number[] = []

  for (let i = 0; i < length; i++) {
    sequence.push(start * Math.pow(factor, i))
  }

  return {
    sequence,
    pattern: 'geometric',
    hint: `Jede Zahl wird mit ${factor} multipliziert.`,
    explanation: `Geometrische Folge: x${factor} pro Schritt.`,
  }
}

function generateSquare(): SequenceResult {
  const offset = randInt(0, 3)
  const length = 6
  const sequence: number[] = []

  for (let i = 1; i <= length; i++) {
    sequence.push((i + offset) * (i + offset))
  }

  return {
    sequence,
    pattern: 'square',
    hint: 'Jede Zahl ist eine Quadratzahl.',
    explanation: `Quadratzahlen: ${offset + 1}^2, ${offset + 2}^2, ${offset + 3}^2, ...`,
  }
}

function generateFibonacciLike(): SequenceResult {
  const a = randInt(1, 5)
  const b = randInt(1, 5)
  const length = 7
  const sequence: number[] = [a, b]

  for (let i = 2; i < length; i++) {
    sequence.push(sequence[i - 1] + sequence[i - 2])
  }

  return {
    sequence,
    pattern: 'fibonacci',
    hint: 'Jede Zahl ist die Summe der zwei vorherigen.',
    explanation: `Fibonacci-artige Folge: Jedes Glied = Summe der beiden Vorgaenger.`,
  }
}

function generatePrime(): SequenceResult {
  const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47]
  const startIdx = randInt(0, 5)
  const length = 6
  const sequence = primes.slice(startIdx, startIdx + length)

  return {
    sequence,
    pattern: 'prime',
    hint: 'Die Zahlen sind aufeinanderfolgende Primzahlen.',
    explanation: 'Primzahlenfolge: Zahlen, die nur durch 1 und sich selbst teilbar sind.',
  }
}

function generateTriangular(): SequenceResult {
  const offset = randInt(0, 3)
  const length = 6
  const sequence: number[] = []

  for (let i = 1; i <= length; i++) {
    const n = i + offset
    sequence.push((n * (n + 1)) / 2)
  }

  return {
    sequence,
    pattern: 'triangular',
    hint: 'Die Differenzen zwischen den Zahlen steigen um 1.',
    explanation: 'Dreieckszahlen: 1, 3, 6, 10, 15, 21, ...',
  }
}

function generateAlternating(): SequenceResult {
  const stepA = randInt(2, 6)
  const stepB = randInt(2, 6)
  const start = randInt(1, 20)
  const length = 7
  const sequence: number[] = [start]

  for (let i = 1; i < length; i++) {
    const step = i % 2 === 1 ? stepA : stepB
    sequence.push(sequence[i - 1] + step)
  }

  return {
    sequence,
    pattern: 'alternating',
    hint: `Die Schritte wechseln zwischen +${stepA} und +${stepB}.`,
    explanation: `Alternierende Folge: abwechselnd +${stepA} und +${stepB}.`,
  }
}

function generatePowerOfTwo(): SequenceResult {
  const startExp = randInt(0, 3)
  const length = 6
  const sequence: number[] = []

  for (let i = 0; i < length; i++) {
    sequence.push(Math.pow(2, startExp + i))
  }

  return {
    sequence,
    pattern: 'power-of-two',
    hint: 'Jede Zahl ist das Doppelte der vorherigen.',
    explanation: `Zweierpotenzen: 2^${startExp}, 2^${startExp + 1}, 2^${startExp + 2}, ...`,
  }
}

// ---------------------------------------------------------------------------
// Main generator
// ---------------------------------------------------------------------------

/** Get generators available for each difficulty */
function getGeneratorsForDifficulty(difficulty: Difficulty): (() => SequenceResult)[] {
  switch (difficulty) {
    case 'easy':
      return [generateArithmetic]
    case 'medium':
      return [generateGeometric, generateSquare, generateAlternating, generatePowerOfTwo]
    case 'hard':
      return [generateFibonacciLike, generatePrime, generateTriangular, generateAlternating]
  }
}

/**
 * Generate a number sequence puzzle.
 * One number in the sequence is hidden for the user to fill in.
 */
export function generateSequencePuzzle(difficulty: Difficulty): NumberSequencePuzzle {
  const generators = getGeneratorsForDifficulty(difficulty)
  const generator = pickRandom(generators)
  const result = generator()

  // Pick a position to hide (not the first or last for easier understanding)
  const hideIndex = randInt(1, result.sequence.length - 2)

  return {
    id: nextId(),
    sequence: result.sequence,
    hiddenIndices: [hideIndex],
    pattern: result.pattern,
    difficulty,
    hint: result.hint,
    explanation: result.explanation,
  }
}

/**
 * Check if the user's answer is correct for a given index.
 */
export function checkAnswer(puzzle: NumberSequencePuzzle, index: number, answer: number): boolean {
  return puzzle.sequence[index] === answer
}

/**
 * Get the correct answer for a hidden index.
 */
export function getCorrectAnswer(puzzle: NumberSequencePuzzle, index: number): number {
  return puzzle.sequence[index]
}
