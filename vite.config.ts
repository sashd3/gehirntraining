import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/mixins" as *;\n`,
      },
    },
  },
  build: {
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks: {
          'game-quiz': ['./src/games/quiz/QuizGame.vue'],
          'game-sudoku': ['./src/games/sudoku/SudokuGame.vue'],
          'game-crossword': ['./src/games/crossword/CrosswordGame.vue'],
          'game-memory': ['./src/games/memory/MemoryGame.vue'],
          'game-wordsearch': ['./src/games/word-search/WordSearchGame.vue'],
          'game-numbers': ['./src/games/number-sequence/NumberSequenceGame.vue'],
          'game-colorshape': ['./src/games/color-shape/ColorShapeGame.vue'],
        },
      },
    },
  },
})
