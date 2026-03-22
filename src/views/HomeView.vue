<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useProgressStore } from '@/stores/progress.store'
import { useDailyChallengeStore } from '@/stores/daily-challenge.store'
import { gameRegistry, getGameById } from '@/engine/game-registry'
import { getGameIconComponent } from '@/composables/useGameIcons'
import {
  Flame, Star, ChevronRight, Clock, Layers, Check, Play,
  Brain, Lightbulb, Zap, BookOpen, Puzzle
} from 'lucide-vue-next'

const router = useRouter()
const { t } = useI18n()
const progressStore = useProgressStore()
const dailyChallengeStore = useDailyChallengeStore()

// Background slideshow for daily challenge
const heroSlides = [
  '/images/slides/slide-1.jpg',
  '/images/slides/slide-2.jpg',
  '/images/slides/slide-3.jpg',
  '/images/slides/slide-4.jpg',
  '/images/slides/slide-5.jpg',
  '/images/slides/slide-6.jpg',
]
const currentSlide = ref(0)
let slideTimer: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  slideTimer = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % heroSlides.length
  }, 5000)
})

onUnmounted(() => {
  if (slideTimer) clearInterval(slideTimer)
})

const streak = computed(() => progressStore.streak.currentStreak)
const totalScore = computed(() => {
  // Sum up scores from all game progress
  let sum = 0
  for (const game of gameRegistry) {
    const progress = progressStore.getGameProgress(game.id)
    sum += progress.bestScore ?? 0
  }
  return sum || progressStore.overallStats.totalGamesPlayed * 150
})
const dailyChallenge = computed(() => dailyChallengeStore.today)
const dailyGame = computed(() =>
  dailyChallenge.value ? getGameById(dailyChallenge.value.gameId) : null
)

const dailyChallengeSubtitle = computed(() => {
  if (!dailyGame.value) return ''
  const subtitles: Record<string, string> = {
    knowledge: 'Testen Sie Ihr Wissen heute',
    language: 'Stärken Sie Ihren Wortschatz heute',
    logic: 'Trainieren Sie Ihr logisches Denken heute',
    memory: 'Schärfen Sie Ihr Gedächtnis heute',
    speed: 'Steigern Sie Ihre Reaktionszeit heute',
  }
  return subtitles[dailyGame.value.category] ?? ''
})

const dailyEstimatedMinutes = computed(() => {
  if (!dailyGame.value || !dailyChallenge.value) return null
  return dailyGame.value.estimatedDuration[dailyChallenge.value.difficulty] ?? 10
})

const dailyCategoryLabel = computed(() => {
  if (!dailyGame.value) return ''
  return t(`categories.${dailyGame.value.category}`)
})

// Group games by category for the "Trainingsbereiche" section
const categoryIcon: Record<string, any> = {
  knowledge: Lightbulb,
  logic: Puzzle,
  memory: Brain,
  speed: Zap,
  language: BookOpen,
}

const categoryColors: Record<string, string> = {
  knowledge: '#9B8AB8',
  logic: '#6BBFAE',
  memory: '#5AB5A3',
  speed: '#B87BC5',
  language: '#8B7BB5',
}

function getGameCompletion(gameId: string): number {
  const progress = progressStore.getGameProgress(gameId)
  return Math.min(progress.totalPlayed / 30, 1)
}

function openGame(gameId: string) {
  router.push(`/game/${gameId}`)
}

function openDailyChallenge() {
  if (dailyChallenge.value) {
    router.push(`/game/${dailyChallenge.value.gameId}?daily=true`)
  }
}
</script>

<template>
  <div class="home">
    <!-- Stats Row -->
    <div class="stats-row">
      <div class="stat-chip">
        <Flame :size="18" class="stat-chip__icon stat-chip__icon--flame" />
        <span class="stat-chip__text">{{ streak }} {{ t('home.streakLabel', 'Tage in Folge') }}</span>
      </div>
      <div class="stat-chip">
        <Star :size="18" class="stat-chip__icon stat-chip__icon--star" />
        <span class="stat-chip__text">{{ totalScore.toLocaleString('de-DE') }} {{ t('home.totalPointsLabel', 'Gesamtpunkte') }}</span>
      </div>
    </div>

    <!-- Daily Challenge with background slideshow -->
    <div
      v-if="dailyGame && dailyChallenge"
      class="daily-card"
      :class="{ 'daily-card--completed': dailyChallenge.completed }"
    >
      <!-- Slideshow background -->
      <div class="daily-card__slides">
        <img
          v-for="(slide, i) in heroSlides"
          :key="i"
          :src="slide"
          :class="{ active: currentSlide === i }"
          class="daily-card__slide"
          alt=""
        />
        <div class="daily-card__overlay" />
      </div>
      <span class="daily-card__label">{{ t('home.dailyChallengeLabel', 'Tagesherausforderung') }}</span>
      <h2 class="daily-card__title">{{ t(dailyGame.nameKey) }}</h2>
      <p class="daily-card__desc">{{ dailyChallengeSubtitle }}</p>
      <div class="daily-card__meta">
        <span v-if="dailyEstimatedMinutes" class="daily-card__tag">
          <Clock :size="14" />
          ~{{ dailyEstimatedMinutes }} Min.
        </span>
        <span v-if="dailyCategoryLabel" class="daily-card__tag">
          <Layers :size="14" />
          {{ dailyCategoryLabel }}
        </span>
      </div>
      <button
        class="daily-card__btn"
        :disabled="dailyChallenge.completed"
        @click="openDailyChallenge"
      >
        <template v-if="dailyChallenge.completed">
          <Check :size="20" />
          {{ t('home.challengeCompleted', 'Abgeschlossen') }}
        </template>
        <template v-else>
          {{ t('home.startChallenge', 'Jetzt Spielen') }}
          <Play :size="18" fill="currentColor" />
        </template>
      </button>
    </div>

    <!-- Training Areas -->
    <h2 class="section-heading">{{ t('home.gamesSection', 'Trainingsbereiche') }}</h2>

    <div class="game-grid">
      <button
        v-for="game in gameRegistry"
        :key="game.id"
        class="game-card"
        @click="openGame(game.id)"
      >
        <div class="game-card__icon-area" :style="{ backgroundColor: (categoryColors[game.category] || game.color) + '12' }">
          <component :is="getGameIconComponent(game.id)" :size="28" :color="categoryColors[game.category] || game.color" />
        </div>
        <div class="game-card__body">
          <span class="game-card__name">{{ t(game.nameKey) }}</span>
          <span class="game-card__desc">{{ t(game.descriptionKey) }}</span>
        </div>
        <div class="game-card__progress-ring">
          <svg viewBox="0 0 36 36" class="game-card__ring-svg">
            <circle
              class="game-card__ring-bg"
              cx="18" cy="18" r="15.9"
              fill="none"
              stroke-width="3"
            />
            <circle
              class="game-card__ring-fill"
              cx="18" cy="18" r="15.9"
              fill="none"
              stroke-width="3"
              :stroke="categoryColors[game.category] || game.color"
              :stroke-dasharray="`${getGameCompletion(game.id) * 100} ${100 - getGameCompletion(game.id) * 100}`"
              stroke-dashoffset="25"
            />
          </svg>
        </div>
        <ChevronRight :size="18" class="game-card__arrow" />
      </button>
    </div>

    <!-- Motivational Quote -->
    <div class="quote-block">
      <p class="quote-block__text">
        {{ t('home.motivationalQuote', 'Der Geist ist kein Gefäß, das gefüllt, sondern ein Feuer, das entfacht werden will.') }}
      </p>
      <span class="quote-block__author">-- Plutarch</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// All colors use CSS custom properties from the design system

// ---------------------------------------------------------------------------
// Layout
// ---------------------------------------------------------------------------
.home {
  padding: 0 var(--space-md, 16px);
  padding-top: calc(var(--safe-area-top, 0px) + var(--space-lg, 24px));
  padding-bottom: calc(var(--navbar-total-height, 80px) + var(--space-xl, 32px));
  max-width: var(--content-max-width, 600px);
  margin: 0 auto;
  font-family: var(--font-family, -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif);
  background-color: var(--color-bg-primary);
  min-height: 100vh;
  min-height: 100dvh;
}

// ---------------------------------------------------------------------------
// Stats Row
// ---------------------------------------------------------------------------
.stats-row {
  display: flex;
  gap: var(--space-sm, 8px);
  margin-bottom: var(--space-xl, 32px);
  flex-wrap: wrap;
}

.stat-chip {
  display: flex;
  align-items: center;
  gap: 6px;
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border-light, rgba(0,0,0,0.06));
  border-radius: 20px;
  padding: 8px 14px;

  &__icon {
    flex-shrink: 0;

    &--flame {
      color: var(--color-accent-light);
    }

    &--star {
      color: var(--color-accent-light);
    }
  }

  &__text {
    font-size: 13px;
    font-weight: 600;
    color: var(--color-text-primary);
    white-space: nowrap;
  }
}

// ---------------------------------------------------------------------------
// Daily Challenge Card
// ---------------------------------------------------------------------------
.daily-card {
  position: relative;
  overflow: hidden;
  border-radius: 20px;
  padding: var(--space-xl, 32px) var(--space-lg, 24px);
  margin-bottom: var(--space-xl, 32px);
  text-align: center;
  min-height: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;

  &--completed {
    opacity: 0.75;
  }

  // Slideshow
  &__slides {
    position: absolute;
    inset: 0;
    z-index: 0;
  }

  &__slide {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    transition: opacity 1.5s ease;

    &.active {
      opacity: 1;
    }
  }

  &__overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.45);
    z-index: 1;
  }

  // All content above the overlay
  &__label, &__title, &__desc, &__meta, &__btn {
    position: relative;
    z-index: 2;
  }

  &__label {
    display: inline-block;
    font-size: 11px;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.85);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: var(--space-sm, 8px);
  }

  &__title {
    font-size: 26px;
    font-weight: 800;
    color: #FFFFFF;
    margin: 0 0 6px 0;
    line-height: 1.15;
  }

  &__desc {
    font-size: 15px;
    color: rgba(255, 255, 255, 0.85);
    margin: 0 0 var(--space-md, 16px) 0;
    line-height: 1.45;
  }

  &__meta {
    display: flex;
    justify-content: center;
    gap: var(--space-md, 16px);
    margin-bottom: var(--space-lg, 24px);
    flex-wrap: wrap;
  }

  &__tag {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 13px;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.7);

    svg {
      flex-shrink: 0;
      color: rgba(255, 255, 255, 0.7);
    }
  }

  &__btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 14px 36px;
    background: var(--color-primary, #9B8AB8);
    color: #fff;
    border: none;
    border-radius: 50px;
    font-size: 15px;
    font-weight: 700;
    font-family: inherit;
    letter-spacing: 0.02em;
    cursor: pointer;
    min-height: 50px;
    box-shadow: 0 4px 16px rgba(155, 138, 184, 0.35);
    transition: transform 0.15s ease, box-shadow 0.15s ease;

    &:active {
      transform: scale(0.97);
    }

    &:disabled {
      background: var(--color-bg-secondary);
      box-shadow: none;
      color: var(--color-text-tertiary);
      cursor: default;
    }
  }
}

// ---------------------------------------------------------------------------
// Section Heading
// ---------------------------------------------------------------------------
.section-heading {
  font-size: 22px;
  font-weight: 800;
  color: var(--color-primary);
  margin: 0 0 var(--space-md, 16px) 0;
}

// ---------------------------------------------------------------------------
// Game Grid (category cards)
// ---------------------------------------------------------------------------
.game-grid {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: var(--space-xl, 32px);
}

.game-card {
  display: flex;
  align-items: center;
  gap: var(--space-md, 16px);
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border-light, rgba(0,0,0,0.06));
  border-radius: 16px;
  padding: 14px 16px;
  cursor: pointer;
  text-align: left;
  font-family: inherit;
  min-height: 72px;
  width: 100%;
  transition: transform 0.15s ease, box-shadow 0.15s ease;

  &:active {
    transform: scale(0.98);
  }

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  }

  &__icon-area {
    flex-shrink: 0;
    width: 48px;
    height: 48px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__body {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  &__name {
    font-size: 16px;
    font-weight: 700;
    color: var(--color-text-primary);
    line-height: 1.25;
  }

  &__desc {
    font-size: 13px;
    color: var(--color-text-tertiary);
    line-height: 1.4;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__progress-ring {
    flex-shrink: 0;
    width: 36px;
    height: 36px;
  }

  &__ring-svg {
    width: 100%;
    height: 100%;
    transform: rotate(-90deg);
  }

  &__ring-bg {
    stroke: var(--color-bg-secondary);
  }

  &__ring-fill {
    transition: stroke-dasharray 0.5s ease;
    stroke-linecap: round;
  }

  &__arrow {
    flex-shrink: 0;
    color: var(--color-text-tertiary);
  }
}

// ---------------------------------------------------------------------------
// Motivational Quote
// ---------------------------------------------------------------------------
.quote-block {
  text-align: center;
  padding: var(--space-lg, 24px) var(--space-md, 16px);
  margin-bottom: var(--space-lg, 24px);

  &__text {
    font-style: italic;
    font-size: 14px;
    color: var(--color-text-tertiary);
    line-height: 1.65;
    margin: 0 0 6px 0;
  }

  &__author {
    font-size: 12px;
    font-weight: 600;
    color: var(--color-text-tertiary);
    opacity: 0.7;
  }
}

// ---------------------------------------------------------------------------
// Reduced motion
// ---------------------------------------------------------------------------
@media (prefers-reduced-motion: reduce) {
  .daily-card__btn,
  .game-card {
    transition: none;
  }

  .game-card__ring-fill {
    transition: none;
  }
}
</style>
