import {
  Lightbulb, Grid3x3, Hash, Layers, Search, Binary, Palette
} from 'lucide-vue-next'
import type { Component } from 'vue'

export const gameIconComponents: Record<string, Component> = {
  quiz: Lightbulb,
  crossword: Grid3x3,
  sudoku: Hash,
  memory: Layers,
  'word-search': Search,
  'number-sequence': Binary,
  'color-shape': Palette,
}

export function getGameIconComponent(gameId: string): Component {
  return gameIconComponents[gameId] || Lightbulb
}
