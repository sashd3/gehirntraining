export interface MemoryThemeData {
  id: string
  nameKey: string
  symbols: string[]
}

export const memoryThemes: MemoryThemeData[] = [
  {
    id: 'animals',
    nameKey: 'memory.themes.animals',
    symbols: ['🐶', '🐱', '🐭', '🐰', '🐻', '🐸', '🐵', '🐔', '🐧', '🦁', '🐮', '🐷'],
  },
  {
    id: 'fruits',
    nameKey: 'memory.themes.fruits',
    symbols: ['🍎', '🍐', '🍊', '🍋', '🍇', '🍓', '🍑', '🍒', '🫐', '🥝', '🍌', '🥭'],
  },
  {
    id: 'flowers',
    nameKey: 'memory.themes.flowers',
    symbols: ['🌹', '🌷', '🌻', '🌺', '🌸', '💐', '🌼', '🪻', '🌵', '🌿', '🍀', '🌾'],
  },
  {
    id: 'vehicles',
    nameKey: 'memory.themes.vehicles',
    symbols: ['🚗', '🚕', '🚌', '🚑', '🚒', '🚚', '🏎️', '🚲', '🛵', '🚂', '🛶', '⛵'],
  },
]
