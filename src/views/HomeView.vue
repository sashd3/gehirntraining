<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useProgressStore } from '@/stores/progress.store'
import { useDailyChallengeStore } from '@/stores/daily-challenge.store'
import { gameRegistry, getGameById } from '@/engine/game-registry'
import { getGameIconPath, strokeIcons } from '@/composables/useGameIcons'

const router = useRouter()
const { t } = useI18n()
const progressStore = useProgressStore()
const dailyChallengeStore = useDailyChallengeStore()

const streak = computed(() => progressStore.streak.currentStreak)
const totalGames = computed(() => progressStore.overallStats.totalGamesPlayed)
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

function getGameCompletion(gameId: string): number {
  const progress = progressStore.getGameProgress(gameId)
  // Normalize: cap at 30 games for 100% bar fill
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
      <div class="stat-card">
        <div class="stat-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M12 23c-1.1 0-2.1-.3-3-1C5.4 20 3 16.4 3 12c0-2 .6-3.8 1.7-5.2C6 5 8.5 3.5 12 1c3.5 2.5 6 4 7.3 5.8C20.4 8.2 21 10 21 12c0 4.4-2.4 8-6 10-.9.7-1.9 1-3 1z" fill="#FF6B35"/>
          </svg>
        </div>
        <div class="stat-content">
          <span class="stat-label">{{ t('home.streakLabel', 'TAGE IN FOLGE') }}</span>
          <span class="stat-value">{{ streak }}</span>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M17 4H7a2 2 0 00-2 2v2a2 2 0 002 2h1l-1 6h2l.5-3h5l.5 3h2l-1-6h1a2 2 0 002-2V6a2 2 0 00-2-2zM7 8V6h10v2H7zm7.5 8h-5l.5-3h4l.5 3zM6 20h12" stroke="#7C6BC4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="stat-content">
          <span class="stat-label">{{ t('home.totalGamesLabel', 'GESAMTSPIELE') }}</span>
          <span class="stat-value">{{ totalGames }}</span>
        </div>
      </div>
    </div>

    <!-- Daily Challenge -->
    <div
      v-if="dailyGame && dailyChallenge"
      class="daily-challenge"
      :class="{ 'daily-challenge--completed': dailyChallenge.completed }"
    >
      <div class="daily-challenge__badge">{{ t('home.todayBadge', 'HEUTE') }}</div>
      <h2 class="daily-challenge__title">{{ t(dailyGame.nameKey) }}</h2>
      <p class="daily-challenge__subtitle">{{ dailyChallengeSubtitle }}</p>
      <div class="daily-challenge__meta">
        <span v-if="dailyEstimatedMinutes" class="daily-challenge__tag">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/>
            <path d="M12 7v5l3 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          ~{{ dailyEstimatedMinutes }} Min.
        </span>
        <span v-if="dailyCategoryLabel" class="daily-challenge__tag">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Fokus: {{ dailyCategoryLabel }}
        </span>
      </div>
      <button
        class="daily-challenge__btn"
        :disabled="dailyChallenge.completed"
        @click="openDailyChallenge"
      >
        <template v-if="dailyChallenge.completed">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          {{ t('home.challengeCompleted', 'ABGESCHLOSSEN') }}
        </template>
        <template v-else>
          {{ t('home.startChallenge', 'HERAUSFORDERUNG STARTEN') }}
        </template>
      </button>
    </div>

    <!-- Game List -->
    <h2 class="section-title">{{ t('home.gamesSection', 'Wähle dein Training') }}</h2>

    <div class="game-list">
      <button
        v-for="game in gameRegistry"
        :key="game.id"
        class="game-card"
        @click="openGame(game.id)"
      >
        <div class="game-card__icon" :style="{ backgroundColor: game.color + '18' }">
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            :fill="strokeIcons.has(game.id) ? 'none' : game.color"
            :stroke="strokeIcons.has(game.id) ? game.color : 'none'"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path :d="getGameIconPath(game.id)" />
          </svg>
        </div>
        <div class="game-card__body">
          <span class="game-card__name">{{ t(game.nameKey) }}</span>
          <span class="game-card__desc">{{ t(game.descriptionKey) }}</span>
          <div class="game-card__progress">
            <div
              class="game-card__progress-fill"
              :style="{
                width: (getGameCompletion(game.id) * 100) + '%',
                backgroundColor: game.color,
              }"
            />
          </div>
        </div>
        <div class="game-card__chevron">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </button>
    </div>

    <!-- Motivational Quote -->
    <p class="motivational-quote">
      {{ t('home.motivationalQuote', 'Ein wacher Geist ist die schönste Form der Vitalität.') }}
    </p>
  </div>
</template>

<style lang="scss" scoped>
// ---------------------------------------------------------------------------
// Layout
// ---------------------------------------------------------------------------
.home {
  padding: 0 var(--space-md);
  padding-top: calc(var(--safe-area-top, 0px) + var(--space-lg));
  padding-bottom: calc(var(--navbar-total-height, 80px) + var(--space-xl));
  max-width: var(--content-max-width);
  margin: 0 auto;
  font-family: var(--font-family);
}

// ---------------------------------------------------------------------------
// Stats Row
// ---------------------------------------------------------------------------
.stats-row {
  display: flex;
  gap: var(--space-sm);
  margin-bottom: var(--space-lg);
}

.stat-card {
  flex: 1;
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  background: var(--color-bg-elevated);
  border-radius: var(--radius-lg);
  padding: var(--space-sm) var(--space-md);
  box-shadow: var(--shadow-card);
  min-height: 44px;
}

.stat-icon {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: var(--radius-md);
  background: var(--color-bg-secondary, rgba(0, 0, 0, 0.04));
}

.stat-content {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.stat-label {
  font-size: var(--font-size-caption2, 11px);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-tertiary);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide, 0.06em);
  line-height: 1.2;
}

.stat-value {
  font-size: var(--font-size-title2, 25px);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  line-height: 1.15;
}

// ---------------------------------------------------------------------------
// Daily Challenge Card
// ---------------------------------------------------------------------------
.daily-challenge {
  background: linear-gradient(135deg, var(--color-primary, #9B8AB8) 0%, var(--color-accent, #6BBFAE) 100%);
  border-radius: var(--radius-xl);
  padding: var(--space-lg);
  margin-bottom: var(--space-xl);
  text-align: center;
  box-shadow: 0 8px 24px rgba(107, 191, 174, 0.25);

  &--completed {
    opacity: 0.8;
  }
}

.daily-challenge__badge {
  display: inline-block;
  font-size: var(--font-size-caption2, 11px);
  font-weight: var(--font-weight-bold);
  color: rgba(255, 255, 255, 0.85);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide, 0.1em);
  background: rgba(255, 255, 255, 0.2);
  padding: var(--space-3xs, 2px) var(--space-sm);
  border-radius: var(--radius-full);
  margin-bottom: var(--space-sm);
}

.daily-challenge__title {
  font-size: var(--font-size-large-title, 34px);
  font-weight: var(--font-weight-bold);
  color: #fff;
  margin-bottom: var(--space-2xs, 4px);
  line-height: var(--line-height-tight, 1.1);
}

.daily-challenge__subtitle {
  font-size: var(--font-size-body, 17px);
  color: rgba(255, 255, 255, 0.88);
  margin-bottom: var(--space-md);
  line-height: var(--line-height-normal, 1.4);
}

.daily-challenge__meta {
  display: flex;
  justify-content: center;
  gap: var(--space-sm);
  margin-bottom: var(--space-lg);
  flex-wrap: wrap;
}

.daily-challenge__tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: var(--font-size-caption1, 13px);
  font-weight: var(--font-weight-medium);
  color: rgba(255, 255, 255, 0.9);
  background: rgba(255, 255, 255, 0.18);
  padding: var(--space-3xs, 3px) var(--space-sm);
  border-radius: var(--radius-full);

  svg {
    flex-shrink: 0;
  }
}

.daily-challenge__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-xs);
  width: 100%;
  padding: var(--space-md) var(--space-lg);
  background: var(--color-accent, #6BBFAE);
  color: #fff;
  border: none;
  border-radius: var(--radius-lg);
  font-size: var(--font-size-headline, 17px);
  font-weight: var(--font-weight-bold);
  font-family: var(--font-family);
  letter-spacing: var(--letter-spacing-wide, 0.04em);
  cursor: pointer;
  min-height: 52px;
  box-shadow: 0 4px 14px rgba(107, 191, 174, 0.4);
  transition: transform var(--duration-fast, 0.15s) var(--ease-default, ease),
              opacity var(--duration-fast, 0.15s) var(--ease-default, ease);

  &:active {
    transform: scale(0.97);
  }

  &:disabled {
    background: rgba(255, 255, 255, 0.35);
    box-shadow: none;
    cursor: default;

    &:active {
      transform: none;
    }
  }
}

// ---------------------------------------------------------------------------
// Section Title
// ---------------------------------------------------------------------------
.section-title {
  font-size: var(--font-size-title2, 25px);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-md);
}

// ---------------------------------------------------------------------------
// Game List (full-width horizontal cards)
// ---------------------------------------------------------------------------
.game-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  margin-bottom: var(--space-xl);
}

.game-card {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  background: var(--color-bg-elevated);
  border: none;
  border-radius: var(--radius-lg);
  padding: var(--space-md);
  cursor: pointer;
  box-shadow: var(--shadow-card);
  text-align: left;
  font-family: var(--font-family);
  min-height: 72px;
  width: 100%;
  transition: transform var(--duration-fast, 0.15s) var(--ease-default, ease);

  &:active {
    transform: scale(0.98);
  }
}

.game-card__icon {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
}

.game-card__body {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.game-card__name {
  font-size: var(--font-size-body, 17px);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  line-height: var(--line-height-snug, 1.25);
}

.game-card__desc {
  font-size: var(--font-size-caption1, 13px);
  color: var(--color-text-secondary);
  line-height: var(--line-height-normal, 1.4);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.game-card__progress {
  height: 4px;
  background: var(--color-bg-secondary, rgba(0, 0, 0, 0.06));
  border-radius: 2px;
  margin-top: 4px;
  overflow: hidden;
}

.game-card__progress-fill {
  height: 100%;
  border-radius: 2px;
  min-width: 0;
  transition: width 0.4s var(--ease-default, ease);
}

.game-card__chevron {
  flex-shrink: 0;
  color: var(--color-text-tertiary);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
}

// ---------------------------------------------------------------------------
// Motivational Quote
// ---------------------------------------------------------------------------
.motivational-quote {
  text-align: center;
  font-style: italic;
  font-size: var(--font-size-footnote, 14px);
  color: var(--color-text-tertiary);
  line-height: var(--line-height-relaxed, 1.6);
  padding: var(--space-md) var(--space-lg);
  margin-bottom: var(--space-lg);
}

// ---------------------------------------------------------------------------
// Reduced motion
// ---------------------------------------------------------------------------
@media (prefers-reduced-motion: reduce) {
  .daily-challenge__btn,
  .game-card {
    transition: none;
  }

  .game-card__progress-fill {
    transition: none;
  }
}
</style>
