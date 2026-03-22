<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useProgressStore } from '@/stores/progress.store'
import { gameRegistry } from '@/engine/game-registry'
import { getGameIconComponent } from '@/composables/useGameIcons'

const { t } = useI18n()
const progressStore = useProgressStore()

const stats = computed(() => progressStore.overallStats)
const streak = computed(() => progressStore.streak)

const gameStats = computed(() =>
  gameRegistry.map(game => ({
    ...game,
    progress: progressStore.getGameProgress(game.id),
  })).filter(g => g.progress && g.progress.totalPlayed > 0)
)

function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  if (h > 0) return `${h}h ${m}m`
  if (m > 0) return `${m}m`
  return '0m'
}
</script>

<template>
  <div class="progress">
    <!-- iOS large title -->
    <header class="progress-header">
      <h1 class="large-title">Fortschritt</h1>
    </header>

    <!-- Big stat cards -->
    <div class="stats-grid">
      <div class="stat-card">
        <span class="stat-number">{{ stats.totalGamesPlayed }}</span>
        <span class="stat-label">Spiele</span>
      </div>
      <div class="stat-card">
        <span class="stat-number">{{ formatTime(stats.totalTimePlayed) }}</span>
        <span class="stat-label">Gesamtzeit</span>
      </div>
      <div class="stat-card accent">
        <span class="stat-number">{{ streak.currentStreak }}</span>
        <span class="stat-label">Serie</span>
      </div>
      <div class="stat-card">
        <span class="stat-number">{{ streak.longestStreak }}</span>
        <span class="stat-label">Rekord</span>
      </div>
    </div>

    <!-- Per-Game Stats -->
    <template v-if="gameStats.length > 0">
      <h2 class="section-title">Pro Spiel</h2>
      <div class="game-stats-list">
        <div
          v-for="game in gameStats"
          :key="game.id"
          class="game-stat-card"
        >
          <div class="gsc-body">
            <div class="gsc-header">
              <component :is="getGameIconComponent(game.id)" :size="24" :color="game.color" class="gsc-icon" />
              <div class="gsc-title-area">
                <h3 class="gsc-name">{{ t(game.nameKey) }}</h3>
                <span class="gsc-count">{{ game.progress!.totalPlayed }} Spiele</span>
              </div>
            </div>
            <div class="gsc-stats">
              <div class="gsc-stat">
                <span class="gsc-stat-label">Bester</span>
                <span class="gsc-stat-value">{{ game.progress!.bestScore }}</span>
              </div>
              <div class="gsc-stat">
                <span class="gsc-stat-label">Durchschnitt</span>
                <span class="gsc-stat-value">{{ Math.round((game.progress!.averageScore / 100) * 100) }}%</span>
              </div>
              <div class="gsc-stat">
                <span class="gsc-stat-label">Level</span>
                <span class="gsc-stat-value">{{ t(`common.${game.progress!.currentDifficulty}`) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- Empty State -->
    <div v-else class="empty-state">
      <div class="empty-icon-placeholder"></div>
      <h2 class="empty-title">Noch keine Statistiken</h2>
      <p class="empty-text">
        Spiele dein erstes Spiel, um<br />
        deinen Fortschritt zu verfolgen!
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.progress {
  padding: 0 var(--space-md);
  padding-top: calc(var(--safe-area-top, 0px) + var(--space-xl));
  padding-bottom: calc(var(--navbar-total-height, 80px) + var(--space-xl));
  max-width: var(--content-max-width);
  margin: 0 auto;
}

// ---------------------------------------------------------------------------
// Header
// ---------------------------------------------------------------------------
.progress-header {
  margin-bottom: var(--space-lg);
}

.large-title {
  font-size: var(--font-size-large-title, 38px);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  letter-spacing: var(--letter-spacing-tight);
  line-height: var(--line-height-tight);
}

// ---------------------------------------------------------------------------
// Stats grid
// ---------------------------------------------------------------------------
.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-sm);
  margin-bottom: var(--space-xl);
}

.stat-card {
  background: var(--color-bg-elevated);
  border-radius: var(--radius-lg);
  padding: var(--space-md);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2xs, 4px);
  box-shadow: var(--shadow-card);
  text-align: center;

  &.accent {
    background: var(--color-primary-lighter, #E8E0F0);

    .stat-number {
      color: var(--color-primary-dark, #7B6A9B);
    }

    .stat-label {
      color: var(--color-primary, #9B8AB8);
    }
  }
}

.stat-icon {
  font-size: 24px;
  line-height: 1;
}

.stat-number {
  font-size: var(--font-size-title1, 32px);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  line-height: var(--line-height-tight);
}

.stat-label {
  font-size: var(--font-size-footnote, 15px);
  color: var(--color-text-secondary);
  font-weight: var(--font-weight-medium);
}

// ---------------------------------------------------------------------------
// Section title
// ---------------------------------------------------------------------------
.section-title {
  font-size: var(--font-size-title2, 25px);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-md);
}

// ---------------------------------------------------------------------------
// Per-game stat cards — with colored left accent
// ---------------------------------------------------------------------------
.game-stats-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.game-stat-card {
  background: var(--color-bg-elevated);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card);
  overflow: hidden;
  border: 1px solid var(--color-border-light, rgba(0,0,0,0.06));
}

.gsc-body {
  flex: 1;
  padding: var(--space-md);
}

.gsc-header {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  margin-bottom: var(--space-sm);
}

.gsc-icon {
  font-size: 24px;
  line-height: 1;
}

.gsc-title-area {
  flex: 1;
  min-width: 0;
}

.gsc-name {
  font-size: var(--font-size-headline, 20px);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  line-height: var(--line-height-snug, 1.25);
}

.gsc-count {
  font-size: var(--font-size-footnote, 15px);
  color: var(--color-text-secondary);
}

.gsc-stats {
  display: flex;
  gap: var(--space-md);
  padding-top: var(--space-sm);
  border-top: 1px solid var(--color-border-light, #EDE8F2);
}

.gsc-stat {
  flex: 1;
  text-align: center;
}

.gsc-stat-label {
  display: block;
  font-size: var(--font-size-caption1, 14px);
  color: var(--color-text-tertiary);
  margin-bottom: var(--space-2xs, 4px);
}

.gsc-stat-value {
  font-size: var(--font-size-headline, 20px);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
}

// ---------------------------------------------------------------------------
// Empty state
// ---------------------------------------------------------------------------
.empty-state {
  text-align: center;
  padding: var(--space-3xl) var(--space-xl);
}

.empty-icon {
  font-size: 64px;
  margin-bottom: var(--space-md);
}

.empty-title {
  font-size: var(--font-size-title2, 25px);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-xs);
}

.empty-text {
  font-size: var(--font-size-body, 20px);
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
}
</style>
