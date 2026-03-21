import type { Difficulty } from '@/types/game'
import type { MemoryCard, MemoryTheme } from '@/types/memory'

/**
 * Memory card matching game generator.
 * Creates pairs of emoji cards shuffled on a grid.
 */

const THEME_EMOJIS: Record<string, { symbol: string; label: string }[]> = {
  animals: [
    { symbol: '🐶', label: 'Hund' },
    { symbol: '🐱', label: 'Katze' },
    { symbol: '🐭', label: 'Maus' },
    { symbol: '🐰', label: 'Hase' },
    { symbol: '🐻', label: 'Bär' },
    { symbol: '🐸', label: 'Frosch' },
    { symbol: '🐵', label: 'Affe' },
    { symbol: '🐔', label: 'Huhn' },
    { symbol: '🐧', label: 'Pinguin' },
    { symbol: '🦁', label: 'Löwe' },
    { symbol: '🐮', label: 'Kuh' },
    { symbol: '🐷', label: 'Schwein' },
  ],
  food: [
    { symbol: '🍎', label: 'Apfel' },
    { symbol: '🍐', label: 'Birne' },
    { symbol: '🍊', label: 'Orange' },
    { symbol: '🍋', label: 'Zitrone' },
    { symbol: '🍇', label: 'Trauben' },
    { symbol: '🍓', label: 'Erdbeere' },
    { symbol: '🍑', label: 'Pfirsich' },
    { symbol: '🍒', label: 'Kirschen' },
    { symbol: '🫐', label: 'Blaubeere' },
    { symbol: '🥝', label: 'Kiwi' },
    { symbol: '🍌', label: 'Banane' },
    { symbol: '🥭', label: 'Mango' },
  ],
  nature: [
    { symbol: '🌹', label: 'Rose' },
    { symbol: '🌷', label: 'Tulpe' },
    { symbol: '🌻', label: 'Sonnenblume' },
    { symbol: '🌺', label: 'Hibiskus' },
    { symbol: '🌸', label: 'Kirschblüte' },
    { symbol: '💐', label: 'Blumenstrauß' },
    { symbol: '🌼', label: 'Gänseblümchen' },
    { symbol: '🪻', label: 'Lavendel' },
    { symbol: '🌵', label: 'Kaktus' },
    { symbol: '🌿', label: 'Farn' },
    { symbol: '🍀', label: 'Kleeblatt' },
    { symbol: '🌾', label: 'Ähre' },
  ],
  symbols: [
    { symbol: '🚗', label: 'Auto' },
    { symbol: '🚕', label: 'Taxi' },
    { symbol: '🚌', label: 'Bus' },
    { symbol: '🚑', label: 'Krankenwagen' },
    { symbol: '🚒', label: 'Feuerwehr' },
    { symbol: '🚚', label: 'Lastwagen' },
    { symbol: '🏎️', label: 'Rennwagen' },
    { symbol: '🚲', label: 'Fahrrad' },
    { symbol: '🛵', label: 'Roller' },
    { symbol: '🚂', label: 'Lokomotive' },
    { symbol: '🛶', label: 'Kanu' },
    { symbol: '⛵', label: 'Segelboot' },
  ],
  numbers: [
    { symbol: '1️⃣', label: 'Eins' },
    { symbol: '2️⃣', label: 'Zwei' },
    { symbol: '3️⃣', label: 'Drei' },
    { symbol: '4️⃣', label: 'Vier' },
    { symbol: '5️⃣', label: 'Fünf' },
    { symbol: '6️⃣', label: 'Sechs' },
    { symbol: '7️⃣', label: 'Sieben' },
    { symbol: '8️⃣', label: 'Acht' },
    { symbol: '9️⃣', label: 'Neun' },
    { symbol: '🔟', label: 'Zehn' },
    { symbol: '💯', label: 'Hundert' },
    { symbol: '🔢', label: 'Zahlen' },
  ],
}

/** Shuffle an array in-place (Fisher-Yates) */
function shuffle<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

/** Get the number of pairs for a difficulty */
function getPairCount(difficulty: Difficulty): number {
  switch (difficulty) {
    case 'easy':
      return 6 // 4x3 grid
    case 'medium':
      return 8 // 4x4 grid
    case 'hard':
      return 10 // 5x4 grid
  }
}

/** Get grid dimensions for a difficulty */
export function getGridDimensions(difficulty: Difficulty): { cols: number; rows: number } {
  switch (difficulty) {
    case 'easy':
      return { cols: 4, rows: 3 }
    case 'medium':
      return { cols: 4, rows: 4 }
    case 'hard':
      return { cols: 5, rows: 4 }
  }
}

/**
 * Generate a memory board with shuffled card pairs.
 */
export function generateMemoryBoard(difficulty: Difficulty, theme: MemoryTheme): MemoryCard[] {
  const pairCount = getPairCount(difficulty)
  const themeItems = THEME_EMOJIS[theme] ?? THEME_EMOJIS.animals

  // Select random items for the pairs
  const selected = shuffle([...themeItems]).slice(0, pairCount)

  // Create pairs of cards
  const cards: MemoryCard[] = []
  for (let i = 0; i < selected.length; i++) {
    const item = selected[i]
    const pairId = `pair-${i}`

    cards.push({
      id: `card-${i}-a`,
      pairId,
      symbol: item.symbol,
      label: item.label,
      isFlipped: false,
      isMatched: false,
    })

    cards.push({
      id: `card-${i}-b`,
      pairId,
      symbol: item.symbol,
      label: item.label,
      isFlipped: false,
      isMatched: false,
    })
  }

  // Shuffle all cards
  return shuffle(cards)
}

/** Get available themes */
export function getAvailableThemes(): MemoryTheme[] {
  return Object.keys(THEME_EMOJIS) as MemoryTheme[]
}

/** Get theme display info */
export function getThemePreview(theme: MemoryTheme): string[] {
  const items = THEME_EMOJIS[theme] ?? THEME_EMOJIS.animals
  return items.slice(0, 4).map(i => i.symbol)
}
