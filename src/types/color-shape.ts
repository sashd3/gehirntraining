export type ShapeType =
  | 'circle'
  | 'square'
  | 'triangle'
  | 'diamond'
  | 'star'
  | 'hexagon'
  | 'pentagon'
  | 'heart'
  | 'arrow'
  | 'cross'
  | 'crescent'

export type ColorType =
  | 'red'
  | 'blue'
  | 'green'
  | 'yellow'
  | 'purple'
  | 'orange'
  | 'pink'
  | 'brown'
  | 'cyan'
  | 'gold'
  | 'silver'
  | 'navy'
  | 'lime'

export type GameMode = 'color' | 'shape' | 'mixed' | 'stroop'

export interface ColorShapeStimulus {
  id: string
  shape: ShapeType
  color: ColorType
  label: string         // the text displayed (may be incongruent)
  isCongruent: boolean   // does the label match the actual property?
  matchProperty: 'color' | 'shape' // what should the user match on?
  correctAnswer: boolean // should the user accept or reject?
  gameMode: GameMode     // which mode generated this stimulus
  stroopColor?: ColorType // for stroop mode: the color the word text claims
}

export interface ColorShapeResponse {
  stimulusId: string
  responded: boolean
  responseTime: number   // milliseconds
  isCorrect: boolean
  userAnswer: boolean
}

export interface ColorShapeState {
  stimuli: ColorShapeStimulus[]
  currentIndex: number
  responses: ColorShapeResponse[]
  score: number
  maxScore: number
  isComplete: boolean
  timePerStimulus: number // milliseconds allowed per stimulus
  startedAt: number
  elapsedTime: number
  streak: number
  bestStreak: number
}
