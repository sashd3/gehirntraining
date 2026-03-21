import type { Difficulty } from '@/types/game'
import type { ColorShapeStimulus, ShapeType, ColorType } from '@/types/color-shape'

/**
 * Color/Shape reaction game generator.
 * Creates stimuli where the user must identify colors, shapes, or mismatches.
 */

const SHAPES: ShapeType[] = ['circle', 'square', 'triangle', 'star', 'diamond']
const COLORS: ColorType[] = ['red', 'blue', 'green', 'yellow', 'purple', 'orange']

const COLOR_LABELS: Record<ColorType, string> = {
  red: 'Rot',
  blue: 'Blau',
  green: 'Gruen',
  yellow: 'Gelb',
  purple: 'Lila',
  orange: 'Orange',
}

const SHAPE_LABELS: Record<ShapeType, string> = {
  circle: 'Kreis',
  square: 'Quadrat',
  triangle: 'Dreieck',
  star: 'Stern',
  diamond: 'Diamant',
}

let stimulusCounter = 0

function nextId(): string {
  return `stim-${Date.now()}-${++stimulusCounter}`
}

/** Pick a random element from an array */
function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

/** Pick a random element that is NOT equal to the excluded value */
function pickRandomExcluding<T>(arr: T[], exclude: T): T {
  const filtered = arr.filter(item => item !== exclude)
  return filtered[Math.floor(Math.random() * filtered.length)]
}

/** Get difficulty parameters */
function getDifficultyParams(difficulty: Difficulty): {
  stimulusCount: number
  timePerStimulus: number
  matchProperty: 'color' | 'shape' | 'both'
  incongruentChance: number
} {
  switch (difficulty) {
    case 'easy':
      return {
        stimulusCount: 5,
        timePerStimulus: 3000,
        matchProperty: 'color',
        incongruentChance: 0, // always congruent for easy
      }
    case 'medium':
      return {
        stimulusCount: 8,
        timePerStimulus: 2000,
        matchProperty: 'both',
        incongruentChance: 0.3,
      }
    case 'hard':
      return {
        stimulusCount: 12,
        timePerStimulus: 1500,
        matchProperty: 'both',
        incongruentChance: 0.5,
      }
  }
}

/**
 * Generate a round of color/shape stimuli.
 */
export function generateColorShapeRound(difficulty: Difficulty): ColorShapeStimulus[] {
  const params = getDifficultyParams(difficulty)
  const stimuli: ColorShapeStimulus[] = []

  for (let i = 0; i < params.stimulusCount; i++) {
    const shape = pickRandom(SHAPES)
    const color = pickRandom(COLORS)
    const matchProperty: 'color' | 'shape' =
      params.matchProperty === 'both'
        ? pickRandom(['color', 'shape'] as const)
        : params.matchProperty as 'color'

    const isCongruent = Math.random() >= params.incongruentChance

    let label: string
    if (isCongruent) {
      // Label matches the actual property
      label = matchProperty === 'color' ? COLOR_LABELS[color] : SHAPE_LABELS[shape]
    } else {
      // Label does NOT match — pick a different one
      if (matchProperty === 'color') {
        const wrongColor = pickRandomExcluding(COLORS, color)
        label = COLOR_LABELS[wrongColor]
      } else {
        const wrongShape = pickRandomExcluding(SHAPES, shape)
        label = SHAPE_LABELS[wrongShape]
      }
    }

    // For easy/medium: user should say if the label matches the displayed property
    // correctAnswer: true = label matches reality, false = it doesn't
    stimuli.push({
      id: nextId(),
      shape,
      color,
      label,
      isCongruent,
      matchProperty,
      correctAnswer: isCongruent,
    })
  }

  return stimuli
}

/**
 * Get the time allowed per stimulus for a difficulty.
 */
export function getTimePerStimulus(difficulty: Difficulty): number {
  const params = getDifficultyParams(difficulty)
  return params.timePerStimulus
}

/**
 * Calculate score for a response based on accuracy and speed.
 */
export function calculateStimulusScore(
  isCorrect: boolean,
  responseTime: number,
  timeAllowed: number
): number {
  if (!isCorrect) return 0

  // Base score of 100, bonus for faster responses
  const speedRatio = Math.max(0, 1 - responseTime / timeAllowed)
  const speedBonus = Math.round(speedRatio * 50)
  return 100 + speedBonus
}

/**
 * Get the CSS color value for a ColorType
 */
export function getColorValue(color: ColorType): string {
  const colorMap: Record<ColorType, string> = {
    red: '#dc2626',
    blue: '#2563eb',
    green: '#16a34a',
    yellow: '#ca8a04',
    purple: '#7c3aed',
    orange: '#ea580c',
  }
  return colorMap[color]
}

/**
 * Generate response options for a stimulus
 */
export function generateResponseOptions(
  stimulus: ColorShapeStimulus,
  _difficulty: Difficulty
): { label: string; value: boolean }[] {
  return [
    { label: 'Stimmt', value: true },
    { label: 'Stimmt nicht', value: false },
  ]
}
