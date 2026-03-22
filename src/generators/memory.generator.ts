import type { Difficulty } from '@/types/game'
import type { MemoryCard, MemoryTheme } from '@/types/memory'
import { photoThemes, getPhotoTheme } from '@/data/themes/photo-themes'

/**
 * Memory card matching game generator.
 * Creates pairs of emoji or photo cards shuffled on a grid.
 */

const THEME_EMOJIS: Record<string, { symbol: string; label: string }[]> = {
  animals: [
    { symbol: '\u{1F436}', label: 'Hund' },
    { symbol: '\u{1F431}', label: 'Katze' },
    { symbol: '\u{1F42D}', label: 'Maus' },
    { symbol: '\u{1F430}', label: 'Hase' },
    { symbol: '\u{1F43B}', label: 'Baer' },
    { symbol: '\u{1F438}', label: 'Frosch' },
    { symbol: '\u{1F435}', label: 'Affe' },
    { symbol: '\u{1F414}', label: 'Huhn' },
    { symbol: '\u{1F427}', label: 'Pinguin' },
    { symbol: '\u{1F981}', label: 'Loewe' },
    { symbol: '\u{1F42E}', label: 'Kuh' },
    { symbol: '\u{1F437}', label: 'Schwein' },
  ],
  food: [
    { symbol: '\u{1F34E}', label: 'Apfel' },
    { symbol: '\u{1F350}', label: 'Birne' },
    { symbol: '\u{1F34A}', label: 'Orange' },
    { symbol: '\u{1F34B}', label: 'Zitrone' },
    { symbol: '\u{1F347}', label: 'Trauben' },
    { symbol: '\u{1F353}', label: 'Erdbeere' },
    { symbol: '\u{1F351}', label: 'Pfirsich' },
    { symbol: '\u{1F352}', label: 'Kirschen' },
    { symbol: '\u{1FAD0}', label: 'Blaubeere' },
    { symbol: '\u{1F95D}', label: 'Kiwi' },
    { symbol: '\u{1F34C}', label: 'Banane' },
    { symbol: '\u{1F96D}', label: 'Mango' },
  ],
  nature: [
    { symbol: '\u{1F339}', label: 'Rose' },
    { symbol: '\u{1F337}', label: 'Tulpe' },
    { symbol: '\u{1F33B}', label: 'Sonnenblume' },
    { symbol: '\u{1F33A}', label: 'Hibiskus' },
    { symbol: '\u{1F338}', label: 'Kirschbluete' },
    { symbol: '\u{1F490}', label: 'Blumenstrauss' },
    { symbol: '\u{1F33C}', label: 'Gaensebluemchen' },
    { symbol: '\u{1FABB}', label: 'Lavendel' },
    { symbol: '\u{1F335}', label: 'Kaktus' },
    { symbol: '\u{1F33F}', label: 'Farn' },
    { symbol: '\u{1F340}', label: 'Kleeblatt' },
    { symbol: '\u{1F33E}', label: 'Aehre' },
  ],
  symbols: [
    { symbol: '\u{1F697}', label: 'Auto' },
    { symbol: '\u{1F695}', label: 'Taxi' },
    { symbol: '\u{1F68C}', label: 'Bus' },
    { symbol: '\u{1F691}', label: 'Krankenwagen' },
    { symbol: '\u{1F692}', label: 'Feuerwehr' },
    { symbol: '\u{1F69A}', label: 'Lastwagen' },
    { symbol: '\u{1F3CE}\u{FE0F}', label: 'Rennwagen' },
    { symbol: '\u{1F6B2}', label: 'Fahrrad' },
    { symbol: '\u{1F6F5}', label: 'Roller' },
    { symbol: '\u{1F682}', label: 'Lokomotive' },
    { symbol: '\u{1F6F6}', label: 'Kanu' },
    { symbol: '\u{26F5}', label: 'Segelboot' },
  ],
  numbers: [
    { symbol: '1\u{FE0F}\u{20E3}', label: 'Eins' },
    { symbol: '2\u{FE0F}\u{20E3}', label: 'Zwei' },
    { symbol: '3\u{FE0F}\u{20E3}', label: 'Drei' },
    { symbol: '4\u{FE0F}\u{20E3}', label: 'Vier' },
    { symbol: '5\u{FE0F}\u{20E3}', label: 'Fuenf' },
    { symbol: '6\u{FE0F}\u{20E3}', label: 'Sechs' },
    { symbol: '7\u{FE0F}\u{20E3}', label: 'Sieben' },
    { symbol: '8\u{FE0F}\u{20E3}', label: 'Acht' },
    { symbol: '9\u{FE0F}\u{20E3}', label: 'Neun' },
    { symbol: '\u{1F51F}', label: 'Zehn' },
    { symbol: '\u{1F4AF}', label: 'Hundert' },
    { symbol: '\u{1F522}', label: 'Zahlen' },
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
      return 6 // 12 cards
    case 'medium':
      return 8 // 16 cards
    case 'hard':
      return 10 // 20 cards
  }
}

/** Check if a theme is a photo theme */
export function isPhotoTheme(theme: MemoryTheme): boolean {
  return theme.startsWith('photo-')
}

/** Get grid dimensions for a difficulty */
export function getGridDimensions(difficulty: Difficulty): { cols: number; rows: number } {
  switch (difficulty) {
    case 'easy':
      return { cols: 3, rows: 4 }   // 6 pairs = 12 cards
    case 'medium':
      return { cols: 4, rows: 4 }   // 8 pairs = 16 cards
    case 'hard':
      return { cols: 4, rows: 5 }   // 10 pairs = 20 cards
  }
}

/**
 * Generate a memory board with shuffled card pairs.
 * Supports both emoji and photo themes.
 */
export function generateMemoryBoard(difficulty: Difficulty, theme: MemoryTheme): MemoryCard[] {
  const pairCount = getPairCount(difficulty)

  if (isPhotoTheme(theme)) {
    return generatePhotoBoardCards(pairCount, theme)
  }

  return generateEmojiBoardCards(pairCount, theme)
}

function generateEmojiBoardCards(pairCount: number, theme: MemoryTheme): MemoryCard[] {
  const themeItems = THEME_EMOJIS[theme] ?? THEME_EMOJIS.animals

  const selected = shuffle([...themeItems]).slice(0, pairCount)

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

  return shuffle(cards)
}

function generatePhotoBoardCards(pairCount: number, theme: MemoryTheme): MemoryCard[] {
  const photoTheme = getPhotoTheme(theme)
  if (!photoTheme) return generateEmojiBoardCards(pairCount, 'animals')

  const selected = shuffle([...photoTheme.entries]).slice(0, pairCount)

  const cards: MemoryCard[] = []
  for (let i = 0; i < selected.length; i++) {
    const entry = selected[i]
    const pairId = `pair-${i}`

    cards.push({
      id: `card-${i}-a`,
      pairId,
      symbol: '',
      label: entry.label,
      imageUrl: entry.imageUrl,
      isFlipped: false,
      isMatched: false,
    })

    cards.push({
      id: `card-${i}-b`,
      pairId,
      symbol: '',
      label: entry.label,
      imageUrl: entry.imageUrl,
      isFlipped: false,
      isMatched: false,
    })
  }

  return shuffle(cards)
}

/** Get available themes (emoji + photo) */
export function getAvailableThemes(): MemoryTheme[] {
  const emojiThemes = Object.keys(THEME_EMOJIS) as MemoryTheme[]
  const photoThemeIds = photoThemes.map(t => t.id) as MemoryTheme[]
  return [...photoThemeIds, ...emojiThemes]
}

/** Get theme display info */
export function getThemePreview(theme: MemoryTheme): string[] {
  if (isPhotoTheme(theme)) {
    const photoTheme = getPhotoTheme(theme)
    return photoTheme ? photoTheme.entries.slice(0, 4).map(e => e.label) : []
  }
  const items = THEME_EMOJIS[theme] ?? THEME_EMOJIS.animals
  return items.slice(0, 4).map(i => i.symbol)
}

/** Get theme display name */
export function getThemeDisplayName(theme: MemoryTheme): string {
  if (isPhotoTheme(theme)) {
    const photoTheme = getPhotoTheme(theme)
    return photoTheme?.name ?? theme
  }
  const names: Record<string, string> = {
    animals: 'Tiere',
    food: 'Essen',
    nature: 'Natur',
    symbols: 'Fahrzeuge',
    numbers: 'Zahlen',
  }
  return names[theme] ?? theme
}

/** Get photo theme preview images (first 4 thumbnails) */
export function getPhotoThemePreviewImages(theme: MemoryTheme): string[] {
  const photoTheme = getPhotoTheme(theme)
  if (!photoTheme) return []
  return photoTheme.entries.slice(0, 4).map(e => e.imageUrl)
}
