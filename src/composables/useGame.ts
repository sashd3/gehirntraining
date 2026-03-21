import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useGameStore } from '@/stores/game.store'
import { useProgressStore } from '@/stores/progress.store'
import type { Difficulty, GameResult } from '@/types/game'

export function useGame() {
  const router = useRouter()
  const gameStore = useGameStore()
  const progressStore = useProgressStore()

  const isPlaying = computed(() => gameStore.isPlaying)
  const isPaused = computed(() => gameStore.isPaused)
  const activeSession = computed(() => gameStore.activeSession)

  function startGame(gameId: string, difficulty: Difficulty, isDailyChallenge = false) {
    gameStore.startSession(gameId, difficulty, isDailyChallenge)
  }

  function pauseGame() {
    gameStore.pauseSession()
  }

  function resumeGame() {
    gameStore.resumeSession()
  }

  function incrementMoves() {
    gameStore.incrementMoves()
  }

  function useHint() {
    gameStore.incrementHints()
  }

  async function endGame(score: number, maxScore: number): Promise<GameResult | null> {
    const session = gameStore.completeSession(score, maxScore)
    if (!session) return null

    // Get previous best to check for new record
    const progress = progressStore.getGameProgress(session.gameId)
    const isNewBest = score > progress.bestScore

    // Record the session in progress
    await progressStore.recordGameSession(session)

    // Calculate stars
    const ratio = maxScore > 0 ? score / maxScore : 0
    let stars: 1 | 2 | 3 = 1
    if (ratio >= 0.9) stars = 3
    else if (ratio >= 0.6) stars = 2

    const result: GameResult = {
      score,
      maxScore,
      duration: session.duration,
      accuracy: maxScore > 0 ? Math.round((score / maxScore) * 100) : 0,
      hintsUsed: session.hintsUsed,
      isNewBest,
      stars,
    }

    return result
  }

  function quitGame() {
    gameStore.resetSession()
    router.push({ name: 'home' })
  }

  return {
    isPlaying,
    isPaused,
    activeSession,
    startGame,
    pauseGame,
    resumeGame,
    endGame,
    quitGame,
    incrementMoves,
    useHint,
  }
}
