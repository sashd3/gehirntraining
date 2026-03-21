export type ShapeType = 'circle' | 'square' | 'triangle' | 'diamond' | 'star' | 'hexagon'
export type ColorType = 'red' | 'blue' | 'green' | 'yellow' | 'purple' | 'orange'

export interface ColorShapeStimulus {
  id: string
  shape: ShapeType
  color: ColorType
  label: string         // the text displayed (may be incongruent)
  isCongruent: boolean   // does the label match the actual property?
  matchProperty: 'color' | 'shape' // what should the user match on?
  correctAnswer: boolean // should the user accept or reject?
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
