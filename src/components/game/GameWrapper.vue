<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useGameStore } from '@/stores/game.store'
import { useProgressStore } from '@/stores/progress.store'
import { useUserStore } from '@/stores/user.store'
import { useTimer } from '@/composables/useTimer'
import { useSound } from '@/composables/useSound'
import { getGameIconComponent } from '@/composables/useGameIcons'
import { ChevronLeft, Pause, Star } from 'lucide-vue-next'
import type { Difficulty, GameResult } from '@/types/game'

const props = defineProps<{
  gameId: string
  gameName: string
  gameColor: string
  difficulty: Difficulty
}>()

const emit = defineEmits<{
  'difficulty-change': [difficulty: Difficulty]
}>()

const router = useRouter()
const { t } = useI18n()
const gameStore = useGameStore()
const progressStore = useProgressStore()
const userStore = useUserStore()
const { play } = useSound()
const { elapsed, formattedTime: formatted, start: startTimer, pause: pauseTimer, resume: resumeTimer, reset: resetTimer } = useTimer()

const phase = ref<'setup' | 'playing' | 'paused' | 'complete'>('setup')
const result = ref<GameResult | null>(null)
const selectedDifficulty = ref<Difficulty>(props.difficulty)

const showTimer = computed(() => userStore.settings.showTimer)

function startGame() {
  phase.value = 'playing'
  gameStore.startSession(props.gameId, selectedDifficulty.value, false)
  startTimer()
  play('tap')
}

function pauseGame() {
  phase.value = 'paused'
  pauseTimer()
  gameStore.pauseSession()
}

function resumeGame() {
  phase.value = 'playing'
  resumeTimer()
  gameStore.resumeSession()
}

function onGameComplete(gameResult: GameResult) {
  pauseTimer()
  phase.value = 'complete'
  result.value = gameResult
  play('complete')

  const session = {
    gameId: props.gameId,
    difficulty: selectedDifficulty.value,
    startedAt: Date.now() - elapsed.value * 1000,
    completedAt: Date.now(),
    score: gameResult.score,
    maxScore: gameResult.maxScore,
    duration: elapsed.value,
    moves: 0,
    hintsUsed: gameResult.hintsUsed,
    isComplete: true,
    isDailyChallenge: false,
  }
  progressStore.recordGameSession(session)
  gameStore.completeSession(gameResult)
}

function playAgain() {
  phase.value = 'setup'
  result.value = null
  resetTimer()
}

function goHome() {
  router.push('/')
}

function changeDifficulty(diff: Difficulty) {
  selectedDifficulty.value = diff
  emit('difficulty-change', diff)
}

onUnmounted(() => {
  pauseTimer()
})
</script>

<template>
  <div class="game-wrapper">
    <!-- ===================================================================
         SETUP PHASE
         =================================================================== -->
    <div v-if="phase === 'setup'" class="game-setup">
      <div class="setup-nav">
        <button class="back-btn" @click="goHome">
          <ChevronLeft :size="20" />
          <span>{{ t('common.back') }}</span>
        </button>
      </div>

      <div class="setup-content">
        <!-- Game icon -->
        <div class="setup-icon" :style="{ backgroundColor: gameColor + '18' }">
          <component :is="getGameIconComponent(gameId)" :size="44" :color="gameColor" />
        </div>

        <h1 class="setup-title">{{ gameName }}</h1>

        <!-- Difficulty pills -->
        <div class="difficulty-section">
          <span class="difficulty-label">{{ t('common.difficulty') }}</span>
          <div class="difficulty-pills">
            <button
              v-for="diff in (['easy', 'medium', 'hard'] as Difficulty[])"
              :key="diff"
              class="pill"
              :class="{ active: selectedDifficulty === diff }"
              @click="changeDifficulty(diff)"
            >
              {{ t(`common.${diff}`) }}
            </button>
          </div>
        </div>

        <!-- Start button -->
        <button
          class="start-btn"
          @click="startGame"
        >
          {{ t('common.start') }}
        </button>
      </div>
    </div>

    <!-- ===================================================================
         PLAYING PHASE
         =================================================================== -->
    <div v-else-if="phase === 'playing' || phase === 'paused'" class="game-playing">
      <!-- Minimal game header -->
      <div class="play-header">
        <button class="pause-btn" @click="pauseGame" aria-label="Pause">
          <Pause :size="20" />
        </button>

        <div class="play-header-center">
          <span v-if="showTimer" class="timer-text">{{ formatted }}</span>
          <span v-else class="game-name-text">{{ gameName }}</span>
        </div>

        <span class="diff-pill" :style="{ backgroundColor: gameColor + '15', color: gameColor }">
          {{ t(`common.${selectedDifficulty}`) }}
        </span>
      </div>

      <!-- Game content area -->
      <div class="game-area">
        <slot
          :difficulty="selectedDifficulty"
          :is-paused="phase === 'paused'"
          :on-complete="onGameComplete"
        />
      </div>

      <!-- Pause overlay — frosted glass -->
      <Transition name="fade">
        <div v-if="phase === 'paused'" class="pause-overlay" @click="resumeGame">
          <div class="pause-sheet" @click.stop>
            <div class="pause-icon-area">
              <Pause :size="48" color="var(--color-primary, #9B8AB8)" />
            </div>
            <h2 class="pause-title">{{ t('common.pause') }}</h2>
            <p class="pause-subtitle">{{ t('common.tapToResume') || 'Tippen zum Fortsetzen' }}</p>
            <button class="resume-btn" @click="resumeGame">
              {{ t('common.resume') }}
            </button>
            <button class="quit-btn" @click="goHome">
              {{ t('common.quit') }}
            </button>
          </div>
        </div>
      </Transition>
    </div>

    <!-- ===================================================================
         COMPLETE PHASE
         =================================================================== -->
    <div v-else-if="phase === 'complete' && result" class="game-complete">
      <div class="complete-content">
        <!-- Stars -->
        <div class="stars-row">
          <span
            v-for="i in 3"
            :key="i"
            class="star"
            :class="{ filled: i <= result.stars }"
          >
            <Star :size="48" fill="currentColor" :stroke-width="0" />
          </span>
        </div>

        <h1 class="complete-title">{{ t('gameComplete.congratulations') }}</h1>

        <!-- Result card -->
        <div class="result-card">
          <div class="result-item">
            <span class="result-label">{{ t('common.score') }}</span>
            <span class="result-value">{{ result.score }} / {{ result.maxScore }}</span>
          </div>
          <div class="result-divider" />
          <div class="result-item">
            <span class="result-label">{{ t('common.time') }}</span>
            <span class="result-value">{{ formatted }}</span>
          </div>
          <template v-if="result.isNewBest">
            <div class="result-divider" />
            <div class="new-record">
              {{ t('gameComplete.newRecord') }}
            </div>
          </template>
        </div>

        <!-- Actions -->
        <div class="complete-actions">
          <button
            class="action-primary"
            @click="playAgain"
          >
            {{ t('gameComplete.playAgain') }}
          </button>
          <button class="action-secondary" @click="goHome">
            {{ t('gameComplete.backToHome') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.game-wrapper {
  min-height: 100vh;
  min-height: 100dvh;
  background: var(--color-bg-primary);
  display: flex;
  flex-direction: column;
}

// ==========================================================================
// SETUP PHASE
// ==========================================================================
.game-setup {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: calc(var(--safe-area-top, 0px) + var(--space-sm)) var(--space-md) var(--safe-area-bottom, 0px);
}

.setup-nav {
  padding: var(--space-xs) 0;
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2xs, 4px);
  background: none;
  border: none;
  color: var(--color-primary, #9B8AB8);
  font-size: var(--font-size-body, 20px);
  font-family: inherit;
  padding: var(--space-xs);
  cursor: pointer;
  min-height: var(--touch-target-min);
  border-radius: var(--radius-sm);

  svg {
    flex-shrink: 0;
  }
}

.setup-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-lg);
  max-width: 400px;
  margin: 0 auto;
  width: 100%;
  padding-bottom: var(--space-2xl);
}

.setup-icon {
  width: 96px;
  height: 96px;
  border-radius: var(--radius-2xl, 22px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.setup-icon-letter {
  font-size: 44px;
  font-weight: var(--font-weight-bold);
  line-height: 1;
}

.setup-title {
  font-size: var(--font-size-title1, 32px);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  text-align: center;
  letter-spacing: var(--letter-spacing-tight);
}

// Difficulty pills
.difficulty-section {
  width: 100%;
  text-align: center;
}

.difficulty-label {
  display: block;
  font-size: var(--font-size-footnote, 15px);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
  margin-bottom: var(--space-sm);
}

.difficulty-pills {
  display: flex;
  gap: var(--space-xs);
  justify-content: center;
}

.pill {
  padding: var(--space-sm) var(--space-lg);
  border: none;
  border-radius: var(--radius-full);
  background: var(--color-bg-elevated);
  color: var(--color-text-secondary);
  font-size: var(--font-size-subhead, 18px);
  font-weight: var(--font-weight-medium);
  font-family: inherit;
  cursor: pointer;
  min-height: var(--touch-target-min);
  transition: all var(--duration-fast) var(--ease-default);
  box-shadow: var(--shadow-sm);

  &.active {
    background: var(--color-primary, #9B8AB8);
    color: #FFFFFF;
    font-weight: var(--font-weight-semibold);
    box-shadow: var(--shadow-md);
  }
}

.start-btn {
  width: 100%;
  padding: var(--space-md) var(--space-lg);
  border: none;
  border-radius: var(--radius-lg);
  background: var(--color-primary-light, #C4B5D4);
  color: var(--color-primary-dark, #5C4D7A);
  font-size: var(--font-size-title3, 23px);
  font-weight: var(--font-weight-semibold);
  font-family: inherit;
  cursor: pointer;
  min-height: var(--touch-target-large);
  transition: transform var(--duration-fast) var(--ease-default), background 0.2s ease;
  margin-top: var(--space-sm);

  &:active {
    transform: scale(0.97);
    background: var(--color-primary, #9B8AB8);
    color: #FFFFFF;
  }
}

// ==========================================================================
// PLAYING PHASE
// ==========================================================================
.game-playing {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.play-header {
  display: flex;
  align-items: center;
  padding: var(--space-xs) var(--space-md);
  padding-top: calc(var(--safe-area-top, 0px) + var(--space-xs));
  gap: var(--space-sm);
}

.pause-btn {
  width: var(--touch-target-min);
  height: var(--touch-target-min);
  border: none;
  background: var(--color-bg-elevated);
  border-radius: var(--radius-md);
  color: var(--color-text-secondary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-sm);
  flex-shrink: 0;
}

.play-header-center {
  flex: 1;
  text-align: center;
}

.timer-text {
  font-size: var(--font-size-title2, 25px);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  font-variant-numeric: tabular-nums;
  letter-spacing: var(--letter-spacing-wide);
}

.game-name-text {
  font-size: var(--font-size-subhead, 18px);
  color: var(--color-text-secondary);
  font-weight: var(--font-weight-medium);
}

.diff-pill {
  padding: var(--space-2xs, 4px) var(--space-sm);
  border-radius: var(--radius-full);
  font-size: var(--font-size-caption1, 14px);
  font-weight: var(--font-weight-semibold);
  flex-shrink: 0;
}

.game-area {
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

// ==========================================================================
// PAUSE OVERLAY — Frosted glass
// ==========================================================================
.pause-overlay {
  position: fixed;
  inset: 0;
  background: rgba(45, 37, 64, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: var(--z-overlay, 400);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
}

.pause-sheet {
  background: var(--color-bg-elevated);
  border-radius: var(--radius-2xl, 22px);
  padding: var(--space-xl) var(--space-lg);
  text-align: center;
  max-width: 320px;
  width: 85%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-md);
  box-shadow: var(--shadow-xl);
}

.pause-icon-area {
  margin-bottom: var(--space-xs);
}

.pause-title {
  font-size: var(--font-size-title1, 32px);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
}

.pause-subtitle {
  font-size: var(--font-size-body, 20px);
  color: var(--color-text-secondary);
}

.resume-btn {
  width: 100%;
  padding: var(--space-md);
  border: none;
  border-radius: var(--radius-lg);
  background: var(--color-primary, #9B8AB8);
  color: #FFFFFF;
  font-size: var(--font-size-title3, 23px);
  font-weight: var(--font-weight-semibold);
  font-family: inherit;
  cursor: pointer;
  min-height: var(--touch-target-preferred);
  transition: transform var(--duration-fast) var(--ease-default);

  &:active {
    transform: scale(0.97);
  }
}

.quit-btn {
  padding: var(--space-sm) var(--space-md);
  border: none;
  background: none;
  color: var(--color-text-tertiary);
  font-size: var(--font-size-body, 20px);
  font-family: inherit;
  cursor: pointer;
  min-height: var(--touch-target-min);
}

// ==========================================================================
// COMPLETE PHASE
// ==========================================================================
.game-complete {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-xl) var(--space-md);
}

.complete-content {
  text-align: center;
  max-width: 400px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-lg);
}

// Stars
.stars-row {
  display: flex;
  gap: var(--space-sm);
  margin-bottom: var(--space-xs);
}

.star {
  color: #D4D0DC;
  transition: all var(--duration-slow) var(--ease-spring, cubic-bezier(0.34, 1.56, 0.64, 1));

  &.filled {
    color: #F5B731;
    transform: scale(1.1);
  }

  svg {
    display: block;
  }
}

.complete-title {
  font-size: var(--font-size-title1, 32px);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  letter-spacing: var(--letter-spacing-tight);
}

// Result card
.result-card {
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border-light, rgba(0,0,0,0.06));
  border-radius: var(--radius-lg);
  padding: var(--space-md);
  width: 100%;
}

.result-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-sm) var(--space-xs);
}

.result-divider {
  height: 1px;
  background: var(--color-border-light, #EDE8F2);
}

.result-label {
  font-size: var(--font-size-body, 20px);
  color: var(--color-text-secondary);
}

.result-value {
  font-size: var(--font-size-body, 20px);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  font-variant-numeric: tabular-nums;
}

.new-record {
  padding: var(--space-sm) var(--space-xs);
  color: var(--color-accent, #6BBFAE);
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-headline, 20px);
  text-align: center;
}

// Complete actions
.complete-actions {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.action-primary {
  width: 100%;
  padding: var(--space-md) var(--space-lg);
  border: none;
  border-radius: var(--radius-lg);
  background: var(--color-primary, #9B8AB8);
  color: #FFFFFF;
  font-size: var(--font-size-title3, 23px);
  font-weight: var(--font-weight-semibold);
  font-family: inherit;
  cursor: pointer;
  min-height: var(--touch-target-large);
  transition: transform var(--duration-fast) var(--ease-default);

  &:active {
    transform: scale(0.97);
  }
}

.action-secondary {
  width: 100%;
  padding: var(--space-md) var(--space-lg);
  border: 1px solid var(--color-border-light, rgba(0,0,0,0.06));
  border-radius: var(--radius-lg);
  background: var(--color-bg-elevated);
  color: var(--color-text-primary);
  font-size: var(--font-size-body, 20px);
  font-weight: var(--font-weight-medium);
  font-family: inherit;
  cursor: pointer;
  min-height: var(--touch-target-preferred);

  &:active {
    transform: scale(0.97);
  }
}

// ==========================================================================
// Transitions
// ==========================================================================
.fade-enter-active,
.fade-leave-active {
  transition: opacity var(--duration-normal) var(--ease-default);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

// ==========================================================================
// Reduced motion
// ==========================================================================
@media (prefers-reduced-motion: reduce) {
  .star,
  .start-btn,
  .action-primary,
  .action-secondary,
  .resume-btn,
  .pill {
    transition: none;
  }

  .star.filled {
    transform: none;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: none;
  }
}
</style>
