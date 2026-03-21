import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { GameSession, GameCategory } from '@/types/game'
import type {
  GameProgress,
  GameSessionSummary,
  StreakData,
  OverallStats,
  Achievement,
} from '@/types/progress'
import { storageService } from '@/services/storage.service'
import { cloudSaveDebounced } from '@/services/cloud-sync.service'

const PROGRESS_KEY = 'brain-training:progress'
const STATS_KEY = 'brain-training:overall-stats'
const STREAK_KEY = 'brain-training:streak'
const HISTORY_KEY = 'brain-training:session-history'
const ACHIEVEMENTS_KEY = 'brain-training:achievements'

function createDefaultProgress(gameId: string): GameProgress {
  return {
    gameId,
    totalPlayed: 0,
    totalScore: 0,
    bestScore: 0,
    bestTime: null,
    averageScore: 0,
    averageTime: 0,
    currentDifficulty: 'easy',
    lastPlayedAt: null,
    streakCount: 0,
    perfectGames: 0,
    totalHintsUsed: 0,
    starCounts: { 1: 0, 2: 0, 3: 0 },
  }
}

function createDefaultOverallStats(): OverallStats {
  return {
    totalGamesPlayed: 0,
    totalScore: 0,
    totalTimePlayed: 0,
    averageScore: 0,
    averageAccuracy: 0,
    favoriteGame: null,
    favoriteCategory: null,
    gamesPlayedByCategory: {
      knowledge: 0,
      logic: 0,
      memory: 0,
      speed: 0,
      language: 0,
    },
  }
}

function createDefaultStreak(): StreakData {
  return {
    currentStreak: 0,
    longestStreak: 0,
    lastPlayedDate: null,
  }
}

function calculateStars(score: number, maxScore: number): 1 | 2 | 3 {
  const ratio = maxScore > 0 ? score / maxScore : 0
  if (ratio >= 0.9) return 3
  if (ratio >= 0.6) return 2
  return 1
}

function getTodayDateString(): string {
  return new Date().toISOString().split('T')[0]
}

export const useProgressStore = defineStore('progress', () => {
  const gameProgress = ref<Record<string, GameProgress>>({})
  const overallStats = ref<OverallStats>(createDefaultOverallStats())
  const streak = ref<StreakData>(createDefaultStreak())
  const sessionHistory = ref<GameSessionSummary[]>([])
  const achievements = ref<Achievement[]>([])

  const totalGamesPlayed = computed(() => overallStats.value.totalGamesPlayed)
  const totalScore = computed(() => overallStats.value.totalScore)
  const currentStreak = computed(() => streak.value.currentStreak)
  const longestStreak = computed(() => streak.value.longestStreak)

  function getGameProgress(gameId: string): GameProgress {
    if (!gameProgress.value[gameId]) {
      gameProgress.value[gameId] = createDefaultProgress(gameId)
    }
    return gameProgress.value[gameId]
  }

  async function recordGameSession(session: GameSession): Promise<void> {
    const progress = getGameProgress(session.gameId)
    const stars = calculateStars(session.score, session.maxScore)

    // Update game progress
    progress.totalPlayed += 1
    progress.totalScore += session.score
    progress.lastPlayedAt = Date.now()
    progress.totalHintsUsed += session.hintsUsed

    if (session.score > progress.bestScore) {
      progress.bestScore = session.score
    }

    if (progress.bestTime === null || session.duration < progress.bestTime) {
      progress.bestTime = session.duration
    }

    progress.averageScore = progress.totalScore / progress.totalPlayed
    progress.averageTime =
      (progress.averageTime * (progress.totalPlayed - 1) + session.duration) /
      progress.totalPlayed

    if (session.score === session.maxScore) {
      progress.perfectGames += 1
    }

    progress.starCounts[stars] += 1

    // Update overall stats
    overallStats.value.totalGamesPlayed += 1
    overallStats.value.totalScore += session.score
    overallStats.value.totalTimePlayed += session.duration
    overallStats.value.averageScore =
      overallStats.value.totalScore / overallStats.value.totalGamesPlayed

    // Update streak
    updateStreak()

    // Add to session history
    const summary: GameSessionSummary = {
      gameId: session.gameId,
      difficulty: session.difficulty,
      score: session.score,
      maxScore: session.maxScore,
      duration: session.duration,
      stars,
      completedAt: Date.now(),
      isDailyChallenge: session.isDailyChallenge,
    }
    sessionHistory.value.unshift(summary)

    // Keep only last 100 sessions
    if (sessionHistory.value.length > 100) {
      sessionHistory.value = sessionHistory.value.slice(0, 100)
    }

    // Persist locally + sync to cloud
    await saveAll()
    cloudSaveDebounced()
  }

  function updateStreak(): void {
    const today = getTodayDateString()

    if (streak.value.lastPlayedDate === today) {
      // Already played today, no streak change
      return
    }

    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const yesterdayStr = yesterday.toISOString().split('T')[0]

    if (streak.value.lastPlayedDate === yesterdayStr) {
      // Played yesterday, increment streak
      streak.value.currentStreak += 1
    } else {
      // Missed a day, reset streak
      streak.value.currentStreak = 1
    }

    if (streak.value.currentStreak > streak.value.longestStreak) {
      streak.value.longestStreak = streak.value.currentStreak
    }

    streak.value.lastPlayedDate = today
  }

  async function loadAllProgress(): Promise<void> {
    const [savedProgress, savedStats, savedStreak, savedHistory] =
      await Promise.all([
        storageService.get<Record<string, GameProgress>>(PROGRESS_KEY),
        storageService.get<OverallStats>(STATS_KEY),
        storageService.get<StreakData>(STREAK_KEY),
        storageService.get<GameSessionSummary[]>(HISTORY_KEY),
      ])

    if (savedProgress) gameProgress.value = savedProgress
    if (savedStats) overallStats.value = { ...createDefaultOverallStats(), ...savedStats }
    if (savedStreak) streak.value = { ...createDefaultStreak(), ...savedStreak }
    if (savedHistory) sessionHistory.value = savedHistory
  }

  async function saveAll(): Promise<void> {
    await Promise.all([
      storageService.set(PROGRESS_KEY, gameProgress.value),
      storageService.set(STATS_KEY, overallStats.value),
      storageService.set(STREAK_KEY, streak.value),
      storageService.set(HISTORY_KEY, sessionHistory.value),
    ])
  }

  async function resetAllProgress(): Promise<void> {
    gameProgress.value = {}
    overallStats.value = createDefaultOverallStats()
    streak.value = createDefaultStreak()
    sessionHistory.value = []
    achievements.value = []
    await saveAll()
  }

  return {
    gameProgress,
    overallStats,
    streak,
    sessionHistory,
    achievements,
    totalGamesPlayed,
    totalScore,
    currentStreak,
    longestStreak,
    getGameProgress,
    recordGameSession,
    loadAllProgress,
    resetAllProgress,
  }
})
