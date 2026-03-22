import { useUserStore } from '@/stores/user.store'

type SoundEffect = 'tap' | 'correct' | 'wrong' | 'complete' | 'flip' | 'hint' | 'tick'

// Map sound effects to MP3 files in /public/sounds/
const SOUND_FILES: Partial<Record<SoundEffect, string>> = {
  correct: '/sounds/correct.mp3',
  wrong: '/sounds/wrong.mp3',
  complete: '/sounds/complete.mp3',
}

// Cache loaded audio elements
const audioCache: Record<string, HTMLAudioElement> = {}

function getAudio(src: string): HTMLAudioElement {
  if (!audioCache[src]) {
    audioCache[src] = new Audio(src)
    audioCache[src].preload = 'auto'
  }
  return audioCache[src]
}

export function useSound() {
  const userStore = useUserStore()

  function isEnabled(): boolean {
    return userStore.settings.soundEnabled
  }

  function play(effect: SoundEffect): void {
    if (!isEnabled()) return

    const file = SOUND_FILES[effect]
    if (file) {
      // Play MP3 file
      try {
        const audio = getAudio(file)
        audio.currentTime = 0
        audio.volume = 0.5
        audio.play().catch(() => {
          // Browser may block autoplay — ignore silently
        })
      } catch {
        // Ignore errors
      }
    }
    // Effects without MP3 files (tap, flip, hint, tick) are silent
    // They can be added later by placing MP3s in /public/sounds/
  }

  function playTap() { play('tap') }
  function playCorrect() { play('correct') }
  function playWrong() { play('wrong') }
  function playComplete() { play('complete') }
  function playFlip() { play('flip') }

  return {
    play,
    playTap,
    playCorrect,
    playWrong,
    playComplete,
    playFlip,
    isEnabled,
  }
}
