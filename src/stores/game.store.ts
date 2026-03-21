import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { GameSession, Difficulty } from '@/types/game'

export const useGameStore = defineStore('game', () => {
  const activeSession = ref<GameSession | null>(null)
  const isPlaying = ref(false)
  const isPaused = ref(false)

  const currentGameId = computed(() => activeSession.value?.gameId ?? null)
  const currentDifficulty = computed(() => activeSession.value?.difficulty ?? null)
  const currentScore = computed(() => activeSession.value?.score ?? 0)
  const isActive = computed(() => isPlaying.value && !isPaused.value)

  function startSession(gameId: string, difficulty: Difficulty, isDailyChallenge = false): GameSession {
    const session: GameSession = {
      gameId,
      difficulty,
      startedAt: Date.now(),
      completedAt: null,
      score: 0,
      maxScore: 0,
      duration: 0,
      moves: 0,
      hintsUsed: 0,
      isComplete: false,
      isDailyChallenge,
    }
    activeSession.value = session
    isPlaying.value = true
    isPaused.value = false
    return session
  }

  function updateSession(patch: Partial<GameSession>): void {
    if (activeSession.value) {
      activeSession.value = {
        ...activeSession.value,
        ...patch,
      }
    }
  }

  function pauseSession(): void {
    if (isPlaying.value) {
      isPaused.value = true
    }
  }

  function resumeSession(): void {
    if (isPlaying.value && isPaused.value) {
      isPaused.value = false
    }
  }

  function completeSession(score: number, maxScore: number): GameSession | null {
    if (!activeSession.value) return null

    activeSession.value.score = score
    activeSession.value.maxScore = maxScore
    activeSession.value.completedAt = Date.now()
    activeSession.value.duration = Math.round(
      (activeSession.value.completedAt - activeSession.value.startedAt) / 1000
    )
    activeSession.value.isComplete = true

    isPlaying.value = false
    isPaused.value = false

    const completed = { ...activeSession.value }
    return completed
  }

  function incrementMoves(): void {
    if (activeSession.value) {
      activeSession.value.moves += 1
    }
  }

  function incrementHints(): void {
    if (activeSession.value) {
      activeSession.value.hintsUsed += 1
    }
  }

  function resetSession(): void {
    activeSession.value = null
    isPlaying.value = false
    isPaused.value = false
  }

  return {
    activeSession,
    isPlaying,
    isPaused,
    currentGameId,
    currentDifficulty,
    currentScore,
    isActive,
    startSession,
    updateSession,
    pauseSession,
    resumeSession,
    completeSession,
    incrementMoves,
    incrementHints,
    resetSession,
  }
})
