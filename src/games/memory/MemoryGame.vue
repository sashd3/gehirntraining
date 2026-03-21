<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import type { Difficulty } from '@/types/game'
import type { MemoryCard, MemoryTheme } from '@/types/memory'
import {
  generateMemoryBoard,
  getGridDimensions,
  getAvailableThemes,
  getThemePreview,
} from '@/generators/memory.generator'
import { Lightbulb, Trophy } from 'lucide-vue-next'

const props = defineProps<{
  difficulty: Difficulty
  isPaused: boolean
}>()

const emit = defineEmits<{
  'score-update': [score: number]
  'game-complete': [result: { score: number; maxScore: number; duration: number; moves: number; hintsUsed: number }]
}>()

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------

type GamePhase = 'theme-select' | 'playing' | 'complete'

const phase = ref<GamePhase>('theme-select')
const selectedTheme = ref<MemoryTheme>('animals')
const cards = ref<MemoryCard[]>([])
const flippedCards = ref<string[]>([])
const matchedPairs = ref(0)
const totalPairs = ref(0)
const moves = ref(0)
const isLocked = ref(false)
const hintsUsed = ref(0)
const startedAt = ref(0)
const elapsedTime = ref(0)
let timerInterval: ReturnType<typeof setInterval> | null = null

// ---------------------------------------------------------------------------
// Computed
// ---------------------------------------------------------------------------

const gridDims = computed(() => getGridDimensions(props.difficulty))
const availableThemes = computed(() => getAvailableThemes())

const score = computed(() => {
  if (totalPairs.value === 0) return 0
  const pairScore = matchedPairs.value * 100
  const movePenalty = Math.max(0, (moves.value - totalPairs.value) * 10)
  const hintPenalty = hintsUsed.value * 50
  return Math.max(0, pairScore - movePenalty - hintPenalty)
})

const maxScore = computed(() => totalPairs.value * 100)

const formattedTime = computed(() => {
  const mins = Math.floor(elapsedTime.value / 60)
  const secs = elapsedTime.value % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
})

// ---------------------------------------------------------------------------
// Methods
// ---------------------------------------------------------------------------

function selectTheme(theme: MemoryTheme) {
  selectedTheme.value = theme
}

function startGame() {
  const board = generateMemoryBoard(props.difficulty, selectedTheme.value)
  cards.value = board
  totalPairs.value = board.length / 2
  matchedPairs.value = 0
  moves.value = 0
  flippedCards.value = []
  isLocked.value = false
  hintsUsed.value = 0
  startedAt.value = Date.now()
  elapsedTime.value = 0
  phase.value = 'playing'
  startTimer()
}

function startTimer() {
  stopTimer()
  timerInterval = setInterval(() => {
    if (!props.isPaused && phase.value === 'playing') {
      elapsedTime.value = Math.floor((Date.now() - startedAt.value) / 1000)
    }
  }, 1000)
}

function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval)
    timerInterval = null
  }
}

function flipCard(cardId: string) {
  if (isLocked.value || props.isPaused || phase.value !== 'playing') return

  const card = cards.value.find(c => c.id === cardId)
  if (!card || card.isFlipped || card.isMatched) return

  if (flippedCards.value.length >= 2) return

  card.isFlipped = true
  flippedCards.value.push(cardId)

  if (flippedCards.value.length === 2) {
    moves.value++
    checkMatch()
  }
}

function checkMatch() {
  isLocked.value = true

  const [id1, id2] = flippedCards.value
  const card1 = cards.value.find(c => c.id === id1)!
  const card2 = cards.value.find(c => c.id === id2)!

  if (card1.pairId === card2.pairId) {
    setTimeout(() => {
      card1.isMatched = true
      card2.isMatched = true
      matchedPairs.value++
      flippedCards.value = []
      isLocked.value = false
      emit('score-update', score.value)

      if (matchedPairs.value === totalPairs.value) {
        phase.value = 'complete'
        stopTimer()
        emit('game-complete', {
          score: score.value,
          maxScore: maxScore.value,
          duration: elapsedTime.value,
          moves: moves.value,
          hintsUsed: hintsUsed.value,
        })
      }
    }, 400)
  } else {
    setTimeout(() => {
      card1.isFlipped = false
      card2.isFlipped = false
      flippedCards.value = []
      isLocked.value = false
    }, 1000)
  }
}

function useHint() {
  if (isLocked.value || props.isPaused || phase.value !== 'playing') return

  const unmatchedCards = cards.value.filter(c => !c.isMatched && !c.isFlipped)
  if (unmatchedCards.length < 2) return

  const pairMap = new Map<string, MemoryCard[]>()
  for (const card of unmatchedCards) {
    const list = pairMap.get(card.pairId) ?? []
    list.push(card)
    pairMap.set(card.pairId, list)
  }

  const completePair = Array.from(pairMap.values()).find(list => list.length === 2)
  if (!completePair) return

  hintsUsed.value++
  isLocked.value = true

  completePair[0].isFlipped = true
  completePair[1].isFlipped = true

  setTimeout(() => {
    completePair[0].isFlipped = false
    completePair[1].isFlipped = false
    isLocked.value = false
  }, 1500)
}

// ---------------------------------------------------------------------------
// Lifecycle
// ---------------------------------------------------------------------------

onUnmounted(() => {
  stopTimer()
})

watch(() => props.difficulty, () => {
  phase.value = 'theme-select'
  stopTimer()
})
</script>

<template>
  <div class="memory-game" :class="{ 'memory-game--paused': isPaused }">
    <!-- Theme Selection -->
    <div v-if="phase === 'theme-select'" class="memory-theme-select">
      <h2 class="memory-theme-select__title">Thema wählen</h2>
      <div class="memory-theme-select__grid">
        <button
          v-for="theme in availableThemes"
          :key="theme"
          class="memory-theme-btn"
          :class="{ 'memory-theme-btn--selected': selectedTheme === theme }"
          @click="selectTheme(theme)"
        >
          <span class="memory-theme-btn__preview">
            {{ getThemePreview(theme).join(' ') }}
          </span>
          <span class="memory-theme-btn__name">{{ theme }}</span>
        </button>
      </div>
      <button
        class="memory-start-btn"
        @click="startGame"
      >
        Spiel starten
      </button>
    </div>

    <!-- Playing Phase -->
    <template v-if="phase === 'playing' || phase === 'complete'">
      <!-- Header -->
      <div class="memory-header">
        <div class="memory-header__stat">
          <span class="memory-header__label">Zeit</span>
          <span class="memory-header__value">{{ formattedTime }}</span>
        </div>
        <div class="memory-header__stat memory-header__stat--primary">
          <span class="memory-header__label">Paare</span>
          <span class="memory-header__value">{{ matchedPairs }}/{{ totalPairs }}</span>
        </div>
        <div class="memory-header__stat">
          <span class="memory-header__label">Züge</span>
          <span class="memory-header__value">{{ moves }}</span>
        </div>
      </div>

      <!-- Card Grid -->
      <div
        class="memory-grid"
        :style="{
          gridTemplateColumns: `repeat(${gridDims.cols}, 1fr)`,
          gridTemplateRows: `repeat(${gridDims.rows}, 1fr)`,
        }"
        role="grid"
        aria-label="Memory Spielfeld"
      >
        <button
          v-for="card in cards"
          :key="card.id"
          class="memory-card"
          :class="{
            'memory-card--flipped': card.isFlipped || card.isMatched,
            'memory-card--matched': card.isMatched,
          }"
          :aria-label="card.isFlipped || card.isMatched ? card.label : 'Verdeckte Karte'"
          @click="flipCard(card.id)"
        >
          <div class="memory-card__inner">
            <div class="memory-card__front">
              <span class="memory-card__symbol">?</span>
            </div>
            <div class="memory-card__back">
              <span class="memory-card__emoji">{{ card.symbol }}</span>
            </div>
          </div>
        </button>
      </div>

      <!-- Hint button -->
      <div class="memory-actions">
        <button
          class="memory-hint-btn"
          :disabled="phase === 'complete' || isLocked"
          aria-label="Hinweis"
          @click="useHint"
        >
          <Lightbulb :size="18" class="memory-hint-btn__icon" />
          Hinweis ({{ hintsUsed }})
        </button>
      </div>

      <!-- Completion overlay -->
      <Transition name="memory-complete">
        <div v-if="phase === 'complete'" class="memory-complete">
          <div class="memory-complete__card">
            <div class="memory-complete__icon"><Trophy :size="48" /></div>
            <h2 class="memory-complete__title">Alle Paare gefunden!</h2>
            <p class="memory-complete__score">{{ score }} Punkte</p>
            <p class="memory-complete__stats">
              Zeit: {{ formattedTime }} &middot; Züge: {{ moves }} &middot; Hinweise: {{ hintsUsed }}
            </p>
          </div>
        </div>
      </Transition>
    </template>
  </div>
</template>

<style scoped>
.memory-game {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-md);
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  position: relative;
  font-family: var(--font-family);
}

.memory-game--paused {
  filter: blur(4px);
  pointer-events: none;
}

/* Theme Selection */
.memory-theme-select {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-lg);
  width: 100%;
}

.memory-theme-select__title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin: 0;
}

.memory-theme-select__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-sm);
  width: 100%;
}

.memory-theme-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-xs);
  padding: var(--space-lg);
  background: var(--color-bg-elevated);
  border: 2px solid var(--color-border-light);
  border-radius: 12px;
  cursor: pointer;
  min-height: var(--touch-target-large);
  font-family: var(--font-family);
  transition: all var(--duration-fast) var(--ease-default);
  -webkit-tap-highlight-color: transparent;
  box-shadow: var(--shadow-sm);
}

.memory-theme-btn--selected {
  border-color: var(--color-accent);
  background-color: var(--color-accent-lighter, var(--color-accent-light));
  box-shadow: 0 0 0 3px rgba(107, 191, 174, 0.2);
}

.memory-theme-btn:active {
  transform: scale(0.97);
}

.memory-theme-btn__preview {
  font-size: var(--font-size-2xl);
  line-height: 1.4;
}

.memory-theme-btn__name {
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
  text-transform: capitalize;
}

.memory-start-btn {
  padding: var(--space-md) var(--space-2xl);
  background: var(--color-accent);
  color: var(--color-text-on-accent);
  border: none;
  border-radius: var(--radius-lg);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  font-family: var(--font-family);
  cursor: pointer;
  min-height: var(--touch-target-preferred);
  transition: all var(--duration-fast) var(--ease-default);
  -webkit-tap-highlight-color: transparent;
  box-shadow: var(--shadow-md);
}

.memory-start-btn:active {
  transform: scale(0.97);
  background: var(--color-accent-active, #4D9488);
}

/* Header */
.memory-header {
  display: flex;
  justify-content: space-around;
  width: 100%;
  padding: var(--space-xs) 0;
}

.memory-header__stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: var(--space-xs) var(--space-sm);
  background-color: var(--color-bg-elevated);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  min-width: 80px;
}

.memory-header__stat--primary {
  background-color: var(--color-primary-lighter, var(--color-bg-tertiary));
}

.memory-header__label {
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
  font-weight: var(--font-weight-medium);
}

.memory-header__value {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
}

/* Card Grid */
.memory-grid {
  display: grid;
  gap: var(--space-xs);
  width: 100%;
  max-width: 400px;
}

.memory-card {
  aspect-ratio: 1;
  perspective: 600px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  min-height: var(--touch-target-min);
  -webkit-tap-highlight-color: transparent;
}

.memory-card__inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform var(--duration-slow) var(--ease-default);
  transform-style: preserve-3d;
}

.memory-card--flipped .memory-card__inner {
  transform: rotateY(180deg);
}

.memory-card__front,
.memory-card__back {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  backface-visibility: hidden;
  border-radius: 12px;
}

.memory-card__front {
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark, #7B6A9B));
  box-shadow: var(--shadow-md);
}

.memory-card__symbol {
  font-size: var(--font-size-2xl);
  color: rgba(255, 255, 255, 0.6);
  font-weight: var(--font-weight-bold);
}

.memory-card__back {
  background: var(--color-bg-elevated);
  border: 2px solid var(--color-border-light);
  transform: rotateY(180deg);
  box-shadow: var(--shadow-sm);
}

.memory-card__emoji {
  font-size: var(--font-size-3xl);
  line-height: 1;
}

.memory-card--matched .memory-card__back {
  border-color: var(--color-success);
  background-color: var(--color-success-bg);
  box-shadow: 0 0 12px rgba(92, 184, 133, 0.3);
}

/* Actions */
.memory-actions {
  display: flex;
  justify-content: center;
  padding: var(--space-xs) 0;
}

.memory-hint-btn {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  padding: var(--space-sm) var(--space-xl);
  background: var(--color-bg-elevated);
  border: 1.5px solid var(--color-border-light);
  border-radius: var(--radius-full);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);
  font-family: var(--font-family);
  color: var(--color-text-primary);
  cursor: pointer;
  min-height: var(--touch-target-min);
  transition: all var(--duration-fast) var(--ease-default);
  -webkit-tap-highlight-color: transparent;
  box-shadow: var(--shadow-sm);
}

.memory-hint-btn__icon {
  font-size: var(--font-size-lg);
}

.memory-hint-btn:active {
  transform: scale(0.97);
  background-color: var(--color-bg-secondary);
}

.memory-hint-btn:disabled {
  opacity: 0.4;
  pointer-events: none;
}

/* Completion overlay */
.memory-complete {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg-overlay);
  border-radius: var(--radius-lg);
  z-index: var(--z-overlay);
}

.memory-complete__card {
  background: var(--color-bg-elevated);
  border-radius: var(--radius-xl);
  padding: var(--space-2xl);
  text-align: center;
  box-shadow: var(--shadow-xl);
}

.memory-complete__icon {
  font-size: 48px;
  margin-bottom: var(--space-sm);
}

.memory-complete__title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-md);
}

.memory-complete__score {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary);
  margin: 0 0 var(--space-sm);
}

.memory-complete__stats {
  font-size: var(--font-size-md);
  color: var(--color-text-secondary);
  margin: 0;
}

/* Transition */
.memory-complete-enter-active {
  transition: opacity var(--duration-slow) var(--ease-out);
}

.memory-complete-enter-from {
  opacity: 0;
}
</style>
