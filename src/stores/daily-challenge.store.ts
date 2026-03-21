import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { DailyChallenge } from '@/types/progress'
import type { Difficulty } from '@/types/game'
import { storageService } from '@/services/storage.service'

const TODAY_KEY = 'brain-training:daily-challenge-today'
const HISTORY_KEY = 'brain-training:daily-challenge-history'

const GAME_IDS = ['quiz', 'sudoku', 'memory', 'crossword', 'word-search', 'number-sequence', 'color-shape']
const DIFFICULTIES: Difficulty[] = ['easy', 'medium', 'hard']

function dateToSeed(dateStr: string): number {
  let hash = 0
  for (let i = 0; i < dateStr.length; i++) {
    const char = dateStr.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32-bit integer
  }
  return Math.abs(hash)
}

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

function getTodayDateString(): string {
  return new Date().toISOString().split('T')[0]
}

export const useDailyChallengeStore = defineStore('daily-challenge', () => {
  const today = ref<DailyChallenge | null>(null)
  const history = ref<DailyChallenge[]>([])

  const isCompletedToday = computed(() => today.value?.completed ?? false)
  const todayScore = computed(() => today.value?.score ?? null)
  const completedCount = computed(() => history.value.filter(c => c.completed).length)

  function generateDailyChallenge(dateStr?: string): DailyChallenge {
    const date = dateStr ?? getTodayDateString()
    const seed = dateToSeed(date)
    const gameIndex = Math.floor(seededRandom(seed) * GAME_IDS.length)
    const difficultyIndex = Math.floor(seededRandom(seed + 1) * DIFFICULTIES.length)

    return {
      date,
      gameId: GAME_IDS[gameIndex],
      difficulty: DIFFICULTIES[difficultyIndex],
      seed,
      completed: false,
      score: null,
      completedAt: null,
    }
  }

  async function loadToday(): Promise<void> {
    const todayStr = getTodayDateString()

    // Load history
    const savedHistory = await storageService.get<DailyChallenge[]>(HISTORY_KEY)
    if (savedHistory) {
      history.value = savedHistory
    }

    // Load today's challenge
    const savedToday = await storageService.get<DailyChallenge>(TODAY_KEY)
    if (savedToday && savedToday.date === todayStr) {
      today.value = savedToday
    } else {
      // Generate new challenge for today
      today.value = generateDailyChallenge(todayStr)
      await storageService.set(TODAY_KEY, today.value)
    }
  }

  async function completeChallenge(score: number): Promise<void> {
    if (!today.value || today.value.completed) return

    today.value.completed = true
    today.value.score = score
    today.value.completedAt = Date.now()

    // Add to history
    history.value.unshift({ ...today.value })

    // Keep only last 365 days
    if (history.value.length > 365) {
      history.value = history.value.slice(0, 365)
    }

    await Promise.all([
      storageService.set(TODAY_KEY, today.value),
      storageService.set(HISTORY_KEY, history.value),
    ])
  }

  async function resetDailyChallenge(): Promise<void> {
    today.value = generateDailyChallenge()
    await storageService.set(TODAY_KEY, today.value)
  }

  return {
    today,
    history,
    isCompletedToday,
    todayScore,
    completedCount,
    generateDailyChallenge,
    loadToday,
    completeChallenge,
    resetDailyChallenge,
  }
})
