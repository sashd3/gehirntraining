export type MemoryTheme = 'animals' | 'food' | 'nature' | 'symbols' | 'numbers' | 'photo-nature' | 'photo-animals' | 'photo-cities' | 'photo-buildings'

export interface MemoryCard {
  id: string
  pairId: string
  symbol: string
  label: string
  imageUrl?: string
  isFlipped: boolean
  isMatched: boolean
}

export interface MemoryState {
  cards: MemoryCard[]
  flippedCards: string[] // card ids currently flipped
  matchedPairs: number
  totalPairs: number
  moves: number
  theme: MemoryTheme
  isLocked: boolean // prevent flipping during animation
  isComplete: boolean
  startedAt: number
  elapsedTime: number
  hintsUsed: number
}
