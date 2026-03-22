import type { Difficulty } from '@/types/game'
import type { ColorShapeStimulus, ShapeType, ColorType, GameMode } from '@/types/color-shape'

/**
 * Color/Shape reaction game generator.
 * Creates stimuli where the user must identify colors, shapes, or mismatches.
 *
 * Difficulty modes:
 * - Easy:   Match color word to shape color. 10 stimuli, 3s per stimulus.
 * - Medium: Mixed mode — some ask about color, some about shape. 12 stimuli, 2s.
 *           30 % incongruent chance.
 * - Hard:   Stroop effect — word says one color but shape is painted in another color.
 *           User must identify the SHAPE's actual color (not the word). 15 stimuli, 1.2s.
 */

const SHAPES: ShapeType[] = [
  'circle', 'square', 'triangle', 'star', 'diamond',
  'hexagon', 'pentagon', 'heart', 'arrow', 'cross', 'crescent',
]

const COLORS: ColorType[] = [
  'red', 'blue', 'green', 'yellow', 'purple', 'orange',
  'pink', 'brown', 'cyan', 'gold', 'silver', 'navy', 'lime',
]

const COLOR_LABELS: Record<ColorType, string> = {
  red: 'Rot',
  blue: 'Blau',
  green: 'Grün',
  yellow: 'Gelb',
  purple: 'Lila',
  orange: 'Orange',
  pink: 'Rosa',
  brown: 'Braun',
  cyan: 'Türkis',
  gold: 'Gold',
  silver: 'Silber',
  navy: 'Marineblau',
  lime: 'Limettengrün',
}

const SHAPE_LABELS: Record<ShapeType, string> = {
  circle: 'Kreis',
  square: 'Quadrat',
  triangle: 'Dreieck',
  star: 'Stern',
  diamond: 'Diamant',
  hexagon: 'Sechseck',
  pentagon: 'Fünfeck',
  heart: 'Herz',
  arrow: 'Pfeil',
  cross: 'Kreuz',
  crescent: 'Halbmond',
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
  gameMode: GameMode
  incongruentChance: number
} {
  switch (difficulty) {
    case 'easy':
      return {
        stimulusCount: 10,
        timePerStimulus: 3000,
        gameMode: 'color',
        incongruentChance: 0, // always congruent for easy
      }
    case 'medium':
      return {
        stimulusCount: 12,
        timePerStimulus: 2000,
        gameMode: 'mixed',
        incongruentChance: 0.3,
      }
    case 'hard':
      return {
        stimulusCount: 15,
        timePerStimulus: 1200,
        gameMode: 'stroop',
        incongruentChance: 0.5,
      }
  }
}

// ---------------------------------------------------------------------------
// Easy mode: match color word to the shape's color
// ---------------------------------------------------------------------------

function generateEasyStimulus(): ColorShapeStimulus {
  const shape = pickRandom(SHAPES)
  const color = pickRandom(COLORS)
  const isCongruent = Math.random() >= 0 // always true for easy
  const label = COLOR_LABELS[color]

  return {
    id: nextId(),
    shape,
    color,
    label,
    isCongruent: true,
    matchProperty: 'color',
    correctAnswer: true,
    gameMode: 'color',
  }
}

function generateEasyStimulusIncongruent(): ColorShapeStimulus {
  const shape = pickRandom(SHAPES)
  const color = pickRandom(COLORS)
  const wrongColor = pickRandomExcluding(COLORS, color)
  const label = COLOR_LABELS[wrongColor]

  return {
    id: nextId(),
    shape,
    color,
    label,
    isCongruent: false,
    matchProperty: 'color',
    correctAnswer: false,
    gameMode: 'color',
  }
}

// ---------------------------------------------------------------------------
// Medium mode: mixed — some ask about color, some about shape
// ---------------------------------------------------------------------------

function generateMixedStimulus(incongruentChance: number): ColorShapeStimulus {
  const shape = pickRandom(SHAPES)
  const color = pickRandom(COLORS)
  const matchProperty: 'color' | 'shape' = pickRandom(['color', 'shape'] as const)
  const isCongruent = Math.random() >= incongruentChance

  let label: string
  if (isCongruent) {
    label = matchProperty === 'color' ? COLOR_LABELS[color] : SHAPE_LABELS[shape]
  } else {
    if (matchProperty === 'color') {
      const wrongColor = pickRandomExcluding(COLORS, color)
      label = COLOR_LABELS[wrongColor]
    } else {
      const wrongShape = pickRandomExcluding(SHAPES, shape)
      label = SHAPE_LABELS[wrongShape]
    }
  }

  return {
    id: nextId(),
    shape,
    color,
    label,
    isCongruent,
    matchProperty,
    correctAnswer: isCongruent,
    gameMode: 'mixed',
  }
}

// ---------------------------------------------------------------------------
// Hard mode: Stroop effect
// The word is a color name (displayed in a DIFFERENT color).
// The shape is painted in the actual color.
// User must say whether the WORD matches the SHAPE's actual color
// (ignoring the misleading text of the word).
// ---------------------------------------------------------------------------

function generateStroopStimulus(incongruentChance: number): ColorShapeStimulus {
  const shape = pickRandom(SHAPES)
  const actualColor = pickRandom(COLORS)

  // Decide whether the word (label) matches the shape's actual color or not
  const isCongruent = Math.random() >= incongruentChance

  let labelColor: ColorType
  if (isCongruent) {
    // The word IS the actual color
    labelColor = actualColor
  } else {
    // The word is a DIFFERENT color — Stroop interference
    labelColor = pickRandomExcluding(COLORS, actualColor)
  }

  const label = COLOR_LABELS[labelColor]

  return {
    id: nextId(),
    shape,
    color: actualColor,
    label,
    isCongruent,
    matchProperty: 'color',
    correctAnswer: isCongruent,
    gameMode: 'stroop',
    stroopColor: labelColor,
  }
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Generate a round of color/shape stimuli.
 */
export function generateColorShapeRound(difficulty: Difficulty): ColorShapeStimulus[] {
  const params = getDifficultyParams(difficulty)
  const stimuli: ColorShapeStimulus[] = []

  for (let i = 0; i < params.stimulusCount; i++) {
    switch (params.gameMode) {
      case 'color': {
        // Easy: half congruent, half incongruent (balanced)
        if (i % 2 === 0) {
          stimuli.push(generateEasyStimulus())
        } else {
          stimuli.push(generateEasyStimulusIncongruent())
        }
        break
      }
      case 'mixed': {
        stimuli.push(generateMixedStimulus(params.incongruentChance))
        break
      }
      case 'stroop': {
        stimuli.push(generateStroopStimulus(params.incongruentChance))
        break
      }
      default: {
        stimuli.push(generateMixedStimulus(params.incongruentChance))
      }
    }
  }

  // Shuffle to avoid predictable patterns
  for (let i = stimuli.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[stimuli[i], stimuli[j]] = [stimuli[j], stimuli[i]]
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
    pink: '#ec4899',
    brown: '#92400e',
    cyan: '#0891b2',
    gold: '#d97706',
    silver: '#6b7280',
    navy: '#1e3a5f',
    lime: '#65a30d',
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

/**
 * Get the German label for a game mode (used in UI).
 */
export function getGameModeLabel(mode: GameMode): string {
  switch (mode) {
    case 'color':
      return 'Farbe erkennen'
    case 'shape':
      return 'Form erkennen'
    case 'mixed':
      return 'Farbe & Form'
    case 'stroop':
      return 'Stroop-Effekt'
  }
}
