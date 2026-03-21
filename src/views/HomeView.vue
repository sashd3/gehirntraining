<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useProgressStore } from '@/stores/progress.store'
import { useDailyChallengeStore } from '@/stores/daily-challenge.store'
import { gameRegistry, getGameById } from '@/engine/game-registry'
import { getGameIconComponent } from '@/composables/useGameIcons'
import { Flame, Gamepad2, ChevronRight, Clock, Layers, Check, Play } from 'lucide-vue-next'

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
          <Flame :size="20" color="#FF6B35" />
        </div>
        <div class="stat-content">
          <span class="stat-label">{{ t('home.streakLabel', 'TAGE IN FOLGE') }}</span>
          <span class="stat-value">{{ streak }}</span>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">
          <Gamepad2 :size="20" color="#7C6BC4" />
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
          <Clock :size="14" />
          ~{{ dailyEstimatedMinutes }} Min.
        </span>
        <span v-if="dailyCategoryLabel" class="daily-challenge__tag">
          <Layers :size="14" />
          Fokus: {{ dailyCategoryLabel }}
        </span>
      </div>
      <button
        class="daily-challenge__btn"
        :disabled="dailyChallenge.completed"
        @click="openDailyChallenge"
      >
        <template v-if="dailyChallenge.completed">
          <Check :size="20" />
          {{ t('home.challengeCompleted', 'ABGESCHLOSSEN') }}
        </template>
        <template v-else>
          {{ t('home.startChallenge', 'HERAUSFORDERUNG STARTEN') }}
          <Play :size="18" fill="currentColor" />
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
          <component :is="getGameIconComponent(game.id)" :size="28" :color="game.color" />
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
          <ChevronRight :size="20" />
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
  background: var(--color-bg-elevated, #FFFFFF);
  border: 1.5px solid var(--color-border, #E0DAE8);
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
  color: var(--color-primary, #9B8AB8);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide, 0.1em);
  background: var(--color-primary-lighter, #E8E0F0);
  padding: var(--space-3xs, 2px) var(--space-sm);
  border-radius: var(--radius-full);
  margin-bottom: var(--space-sm);
}

.daily-challenge__title {
  font-size: var(--font-size-title1, 28px);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-2xs, 4px);
  line-height: var(--line-height-tight, 1.1);
}

.daily-challenge__subtitle {
  font-size: var(--font-size-body, 17px);
  color: var(--color-text-secondary);
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
  color: var(--color-text-secondary);
  padding: 0;

  svg {
    flex-shrink: 0;
    color: var(--color-text-tertiary);
  }
}

.daily-challenge__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-xs);
  width: auto;
  padding: var(--space-md) var(--space-2xl, 32px);
  background: var(--color-primary, #9B8AB8);
  color: #fff;
  border: none;
  border-radius: var(--radius-full, 50px);
  font-size: var(--font-size-subhead, 15px);
  font-weight: var(--font-weight-bold);
  font-family: var(--font-family);
  letter-spacing: var(--letter-spacing-wide, 0.04em);
  text-transform: uppercase;
  cursor: pointer;
  min-height: 50px;
  box-shadow: 0 4px 14px rgba(155, 138, 184, 0.35);
  transition: transform var(--duration-fast, 0.15s) var(--ease-default, ease);

  &:active {
    transform: scale(0.97);
  }

  &:disabled {
    background: var(--color-border, #E0DAE8);
    box-shadow: none;
    color: var(--color-text-tertiary);
    cursor: default;
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
