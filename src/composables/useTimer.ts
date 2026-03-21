import { ref, computed, onUnmounted } from 'vue'

export function useTimer() {
  const elapsed = ref(0) // seconds
  const isRunning = ref(false)
  let intervalId: ReturnType<typeof setInterval> | null = null
  let startTimestamp = 0
  let accumulatedTime = 0

  const formattedTime = computed(() => {
    const totalSeconds = elapsed.value
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  })

  const formattedTimeWithHours = computed(() => {
    const totalSeconds = elapsed.value
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    }
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  })

  function start() {
    if (isRunning.value) return
    isRunning.value = true
    startTimestamp = Date.now()
    intervalId = setInterval(() => {
      const now = Date.now()
      elapsed.value = accumulatedTime + Math.floor((now - startTimestamp) / 1000)
    }, 250) // Update 4 times/sec for smoother display
  }

  function pause() {
    if (!isRunning.value) return
    isRunning.value = false
    accumulatedTime = elapsed.value
    if (intervalId !== null) {
      clearInterval(intervalId)
      intervalId = null
    }
  }

  function resume() {
    start()
  }

  function reset() {
    pause()
    elapsed.value = 0
    accumulatedTime = 0
    startTimestamp = 0
  }

  function setTime(seconds: number) {
    elapsed.value = seconds
    accumulatedTime = seconds
    if (isRunning.value) {
      startTimestamp = Date.now()
    }
  }

  onUnmounted(() => {
    if (intervalId !== null) {
      clearInterval(intervalId)
      intervalId = null
    }
  })

  return {
    elapsed,
    isRunning,
    formattedTime,
    formattedTimeWithHours,
    start,
    pause,
    resume,
    reset,
    setTime,
  }
}
