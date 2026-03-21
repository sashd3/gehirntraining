<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import type { Difficulty } from '@/types/game'
import type { ColorShapeStimulus, ColorShapeResponse } from '@/types/color-shape'
import {
  generateColorShapeRound,
  getTimePerStimulus,
  calculateStimulusScore,
  getColorValue,
} from '@/generators/color-shape.generator'

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

type GamePhase = 'ready' | 'playing' | 'feedback' | 'complete'

const phase = ref<GamePhase>('ready')
const stimuli = ref<ColorShapeStimulus[]>([])
const currentIndex = ref(0)
const responses = ref<ColorShapeResponse[]>([])
const totalScore = ref(0)
const streak = ref(0)
const bestStreak = ref(0)
const timePerStimulus = ref(3000)
const stimulusStartTime = ref(0)
const timeRemaining = ref(100) // percentage
const lastFeedback = ref<'correct' | 'wrong' | 'timeout' | ''>('')
const lastReactionTime = ref(0)
const startedAt = ref(0)
const elapsedTime = ref(0)
let timerInterval: ReturnType<typeof setInterval> | null = null
let stimulusTimer: ReturnType<typeof setInterval> | null = null
let feedbackTimeout: ReturnType<typeof setTimeout> | null = null

// ---------------------------------------------------------------------------
// Computed
// ---------------------------------------------------------------------------

const currentStimulus = computed((): ColorShapeStimulus | null => {
  if (currentIndex.value >= stimuli.value.length) return null
  return stimuli.value[currentIndex.value]
})

const totalStimuli = computed(() => stimuli.value.length)
const correctCount = computed(() => responses.value.filter(r => r.isCorrect).length)

const maxScore = computed(() => totalStimuli.value * 150)

const score = computed(() => totalScore.value)

const formattedTime = computed(() => {
  const mins = Math.floor(elapsedTime.value / 60)
  const secs = elapsedTime.value % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
})

const matchPropertyLabel = computed(() => {
  if (!currentStimulus.value) return ''
  return currentStimulus.value.matchProperty === 'color' ? 'Farbe' : 'Form'
})

// ---------------------------------------------------------------------------
// Shape SVG paths
// ---------------------------------------------------------------------------

function getShapePath(shape: string): string {
  switch (shape) {
    case 'circle':
      return '' // handled separately
    case 'square':
      return 'M 15,15 L 85,15 L 85,85 L 15,85 Z'
    case 'triangle':
      return 'M 50,10 L 90,90 L 10,90 Z'
    case 'star':
      return 'M 50,5 L 61,35 L 95,35 L 68,57 L 79,90 L 50,70 L 21,90 L 32,57 L 5,35 L 39,35 Z'
    case 'diamond':
      return 'M 50,5 L 90,50 L 50,95 L 10,50 Z'
    default:
      return ''
  }
}

// ---------------------------------------------------------------------------
// Methods
// ---------------------------------------------------------------------------

function initGame() {
  stimuli.value = generateColorShapeRound(props.difficulty)
  timePerStimulus.value = getTimePerStimulus(props.difficulty)
  currentIndex.value = 0
  responses.value = []
  totalScore.value = 0
  streak.value = 0
  bestStreak.value = 0
  lastFeedback.value = ''
  lastReactionTime.value = 0
  startedAt.value = Date.now()
  elapsedTime.value = 0
  phase.value = 'ready'
}

function startGame() {
  phase.value = 'playing'
  startTimer()
  startStimulus()
}

function startTimer() {
  stopTimer()
  timerInterval = setInterval(() => {
    if (!props.isPaused && phase.value !== 'complete') {
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

function startStimulus() {
  if (currentIndex.value >= stimuli.value.length) {
    completeGame()
    return
  }

  stimulusStartTime.value = Date.now()
  timeRemaining.value = 100
  phase.value = 'playing'

  // Countdown timer for the stimulus
  stopStimulusTimer()
  stimulusTimer = setInterval(() => {
    if (props.isPaused) return
    const elapsed = Date.now() - stimulusStartTime.value
    timeRemaining.value = Math.max(0, 100 - (elapsed / timePerStimulus.value) * 100)

    if (timeRemaining.value <= 0) {
      handleTimeout()
    }
  }, 50)
}

function stopStimulusTimer() {
  if (stimulusTimer) {
    clearInterval(stimulusTimer)
    stimulusTimer = null
  }
}

function handleTimeout() {
  stopStimulusTimer()
  const stimulus = currentStimulus.value
  if (!stimulus) return

  responses.value.push({
    stimulusId: stimulus.id,
    responded: false,
    responseTime: timePerStimulus.value,
    isCorrect: false,
    userAnswer: false,
  })

  streak.value = 0
  lastFeedback.value = 'timeout'
  lastReactionTime.value = 0
  phase.value = 'feedback'

  advanceAfterFeedback()
}

function respond(answer: boolean) {
  if (phase.value !== 'playing' || props.isPaused || !currentStimulus.value) return
  stopStimulusTimer()

  const stimulus = currentStimulus.value
  const reactionTime = Date.now() - stimulusStartTime.value
  const isCorrect = answer === stimulus.correctAnswer

  const stimScore = calculateStimulusScore(isCorrect, reactionTime, timePerStimulus.value)
  totalScore.value += stimScore

  if (isCorrect) {
    streak.value++
    if (streak.value > bestStreak.value) bestStreak.value = streak.value
    lastFeedback.value = 'correct'
  } else {
    streak.value = 0
    lastFeedback.value = 'wrong'
  }

  lastReactionTime.value = reactionTime

  responses.value.push({
    stimulusId: stimulus.id,
    responded: true,
    responseTime: reactionTime,
    isCorrect,
    userAnswer: answer,
  })

  emit('score-update', score.value)
  phase.value = 'feedback'

  advanceAfterFeedback()
}

function advanceAfterFeedback() {
  if (feedbackTimeout) clearTimeout(feedbackTimeout)
  feedbackTimeout = setTimeout(() => {
    currentIndex.value++
    if (currentIndex.value >= stimuli.value.length) {
      completeGame()
    } else {
      startStimulus()
    }
  }, 1200)
}

function completeGame() {
  phase.value = 'complete'
  stopTimer()
  stopStimulusTimer()

  emit('game-complete', {
    score: totalScore.value,
    maxScore: maxScore.value,
    duration: elapsedTime.value,
    moves: responses.value.filter(r => r.responded).length,
    hintsUsed: 0,
  })
}

// ---------------------------------------------------------------------------
// Lifecycle
// ---------------------------------------------------------------------------

onMounted(() => {
  initGame()
})

onUnmounted(() => {
  stopTimer()
  stopStimulusTimer()
  if (feedbackTimeout) clearTimeout(feedbackTimeout)
})

watch(() => props.difficulty, () => {
  initGame()
})
</script>

<template>
  <div class="colorshape-game" :class="{ 'colorshape-game--paused': isPaused }">
    <!-- Ready screen -->
    <div v-if="phase === 'ready'" class="colorshape-ready">
      <h2 class="colorshape-ready__title">Farben &amp; Formen</h2>
      <p class="colorshape-ready__desc">
        Entscheide so schnell wie moeglich, ob das angezeigte Wort
        zur {{ difficulty === 'easy' ? 'Farbe' : 'Farbe oder Form' }} passt.
      </p>
      <p class="colorshape-ready__info">
        {{ totalStimuli }} Runden &middot; {{ (timePerStimulus / 1000).toFixed(1) }}s pro Runde
      </p>
      <button class="colorshape-start-btn" @click="startGame">
        Start
      </button>
    </div>

    <!-- Playing / Feedback -->
    <template v-if="phase === 'playing' || phase === 'feedback'">
      <!-- Header -->
      <div class="colorshape-header">
        <div class="colorshape-header__progress">{{ currentIndex + 1 }}/{{ totalStimuli }}</div>
        <div class="colorshape-header__streak" v-if="streak > 1">Serie: {{ streak }}</div>
        <div class="colorshape-header__score">{{ totalScore }}</div>
      </div>

      <!-- Timer bar -->
      <div class="colorshape-timer">
        <div
          class="colorshape-timer__bar"
          :style="{ width: `${timeRemaining}%` }"
          :class="{
            'colorshape-timer__bar--low': timeRemaining < 30,
          }"
        />
      </div>

      <!-- Stimulus display -->
      <div class="colorshape-stimulus" v-if="currentStimulus">
        <div class="colorshape-stimulus__question">
          Passt das Wort zur {{ matchPropertyLabel }}?
        </div>

        <!-- Shape -->
        <div class="colorshape-stimulus__shape">
          <svg viewBox="0 0 100 100" class="colorshape-shape-svg">
            <circle
              v-if="currentStimulus.shape === 'circle'"
              cx="50" cy="50" r="40"
              :fill="getColorValue(currentStimulus.color)"
            />
            <path
              v-else
              :d="getShapePath(currentStimulus.shape)"
              :fill="getColorValue(currentStimulus.color)"
            />
          </svg>
        </div>

        <!-- Label -->
        <div class="colorshape-stimulus__label">
          {{ currentStimulus.label }}
        </div>
      </div>

      <!-- Feedback display -->
      <div
        v-if="phase === 'feedback'"
        class="colorshape-feedback"
        :class="`colorshape-feedback--${lastFeedback}`"
      >
        <template v-if="lastFeedback === 'correct'">
          Richtig! ({{ lastReactionTime }}ms)
        </template>
        <template v-else-if="lastFeedback === 'wrong'">
          Falsch!
        </template>
        <template v-else-if="lastFeedback === 'timeout'">
          Zu langsam!
        </template>
      </div>

      <!-- Response buttons -->
      <div class="colorshape-buttons" v-if="phase === 'playing'">
        <button
          class="colorshape-btn colorshape-btn--yes"
          @click="respond(true)"
        >
          Stimmt
        </button>
        <button
          class="colorshape-btn colorshape-btn--no"
          @click="respond(false)"
        >
          Stimmt nicht
        </button>
      </div>
    </template>

    <!-- Complete -->
    <div v-if="phase === 'complete'" class="colorshape-complete">
      <div class="colorshape-complete__card">
        <h2 class="colorshape-complete__title">Ergebnis</h2>
        <p class="colorshape-complete__score">{{ totalScore }} Punkte</p>
        <div class="colorshape-complete__stats">
          <div class="colorshape-stat">
            <span class="colorshape-stat__label">Richtig</span>
            <span class="colorshape-stat__value">{{ correctCount }}/{{ totalStimuli }}</span>
          </div>
          <div class="colorshape-stat">
            <span class="colorshape-stat__label">Beste Serie</span>
            <span class="colorshape-stat__value">{{ bestStreak }}</span>
          </div>
          <div class="colorshape-stat">
            <span class="colorshape-stat__label">Zeit</span>
            <span class="colorshape-stat__value">{{ formattedTime }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.colorshape-game {
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

.colorshape-game--paused {
  filter: blur(4px);
  pointer-events: none;
}

/* Ready screen */
.colorshape-ready {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-lg);
  padding: var(--space-2xl) var(--space-md);
  text-align: center;
}

.colorshape-ready__title {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin: 0;
}

.colorshape-ready__desc {
  font-size: var(--font-size-md);
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
  margin: 0;
  max-width: 320px;
}

.colorshape-ready__info {
  font-size: var(--font-size-sm);
  color: var(--color-text-tertiary);
  margin: 0;
  padding: var(--space-xs) var(--space-md);
  background-color: var(--color-bg-secondary);
  border-radius: var(--radius-full);
}

.colorshape-start-btn {
  padding: var(--space-md) var(--space-3xl);
  background: var(--color-primary);
  color: var(--color-text-on-accent);
  border: none;
  border-radius: var(--radius-lg);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  font-family: var(--font-family);
  cursor: pointer;
  min-height: var(--touch-target-large);
  transition: all var(--duration-fast) var(--ease-default);
  -webkit-tap-highlight-color: transparent;
  box-shadow: var(--shadow-md);
}

.colorshape-start-btn:active {
  transform: scale(0.97);
  background: var(--color-primary-dark, #7B6A9B);
}

/* Header */
.colorshape-header {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: var(--space-xs) 0;
}

.colorshape-header__progress,
.colorshape-header__score {
  padding: var(--space-xs) var(--space-sm);
  background-color: var(--color-bg-elevated);
  border-radius: var(--radius-full);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  box-shadow: var(--shadow-sm);
}

.colorshape-header__streak {
  padding: var(--space-xs) var(--space-sm);
  background-color: var(--color-warning-bg);
  border-radius: var(--radius-full);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-semibold);
  color: var(--color-warning-text);
}

/* Timer */
.colorshape-timer {
  width: 100%;
  height: 6px;
  background: var(--color-primary-lighter, var(--color-bg-tertiary));
  border-radius: var(--radius-full);
  overflow: hidden;
}

.colorshape-timer__bar {
  height: 100%;
  background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
  border-radius: var(--radius-full);
  transition: width 50ms linear;
}

.colorshape-timer__bar--low {
  background: var(--color-error);
}

/* Stimulus */
.colorshape-stimulus {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-lg);
  padding: var(--space-xl) 0;
  background-color: var(--color-bg-elevated);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-card, var(--shadow-sm));
  width: 100%;
}

.colorshape-stimulus__question {
  font-size: var(--font-size-md);
  color: var(--color-text-secondary);
  text-align: center;
}

.colorshape-stimulus__shape {
  width: 150px;
  height: 150px;
}

.colorshape-shape-svg {
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 2px 4px rgba(45, 37, 64, 0.15));
}

.colorshape-stimulus__label {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
}

/* Feedback */
.colorshape-feedback {
  padding: var(--space-sm) var(--space-xl);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  text-align: center;
  animation: feedbackPop var(--duration-normal) var(--ease-spring, var(--ease-bounce));
}

.colorshape-feedback--correct {
  background-color: var(--color-success-bg);
  color: var(--color-success-text);
}

.colorshape-feedback--wrong {
  background-color: var(--color-error-bg);
  color: var(--color-error-text);
}

.colorshape-feedback--timeout {
  background-color: var(--color-warning-bg);
  color: var(--color-warning-text);
}

@keyframes feedbackPop {
  0% { transform: scale(0.8); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}

/* Response buttons */
.colorshape-buttons {
  display: flex;
  gap: var(--space-md);
  width: 100%;
  padding: var(--space-md) 0;
}

.colorshape-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: var(--touch-target-large);
  border: none;
  border-radius: 12px;
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  font-family: var(--font-family);
  color: var(--color-text-on-accent);
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-default);
  -webkit-tap-highlight-color: transparent;
  box-shadow: var(--shadow-md);
}

.colorshape-btn:active {
  transform: scale(0.95);
}

.colorshape-btn--yes {
  background: var(--color-success);
}

.colorshape-btn--yes:active {
  background: #4AA077;
}

.colorshape-btn--no {
  background: var(--color-error);
}

.colorshape-btn--no:active {
  background: #C94D4D;
}

/* Complete */
.colorshape-complete {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: var(--space-xl) 0;
}

.colorshape-complete__card {
  background: var(--color-bg-elevated);
  border-radius: var(--radius-xl);
  padding: var(--space-2xl);
  text-align: center;
  box-shadow: var(--shadow-xl);
  width: 100%;
}

.colorshape-complete__title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-md);
}

.colorshape-complete__score {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
  margin: 0 0 var(--space-lg);
}

.colorshape-complete__stats {
  display: flex;
  justify-content: space-around;
  gap: var(--space-md);
}

.colorshape-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: var(--space-xs) var(--space-sm);
  background-color: var(--color-bg-secondary);
  border-radius: var(--radius-md);
  min-width: 80px;
}

.colorshape-stat__label {
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
  font-weight: var(--font-weight-medium);
}

.colorshape-stat__value {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
}
</style>
