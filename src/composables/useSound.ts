import { useUserStore } from '@/stores/user.store'

type SoundEffect = 'tap' | 'correct' | 'wrong' | 'complete' | 'flip' | 'hint' | 'tick'

// Simple sound frequencies for Web Audio API fallback
const SOUND_CONFIG: Record<SoundEffect, { frequency: number; duration: number; type: OscillatorType }> = {
  tap: { frequency: 600, duration: 0.05, type: 'sine' },
  correct: { frequency: 880, duration: 0.15, type: 'sine' },
  wrong: { frequency: 220, duration: 0.2, type: 'square' },
  complete: { frequency: 1046, duration: 0.3, type: 'sine' },
  flip: { frequency: 500, duration: 0.08, type: 'triangle' },
  hint: { frequency: 440, duration: 0.1, type: 'sine' },
  tick: { frequency: 800, duration: 0.03, type: 'sine' },
}

let audioContext: AudioContext | null = null

function getAudioContext(): AudioContext | null {
  if (!audioContext) {
    try {
      audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    } catch {
      console.warn('[useSound] Web Audio API not available')
      return null
    }
  }
  return audioContext
}

export function useSound() {
  const userStore = useUserStore()

  function isEnabled(): boolean {
    return userStore.settings.soundEnabled
  }

  function play(effect: SoundEffect): void {
    if (!isEnabled()) return

    const ctx = getAudioContext()
    if (!ctx) return

    const config = SOUND_CONFIG[effect]
    if (!config) return

    try {
      // Resume context if suspended (browser autoplay policy)
      if (ctx.state === 'suspended') {
        ctx.resume()
      }

      const oscillator = ctx.createOscillator()
      const gainNode = ctx.createGain()

      oscillator.type = config.type
      oscillator.frequency.setValueAtTime(config.frequency, ctx.currentTime)

      gainNode.gain.setValueAtTime(0.3, ctx.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + config.duration)

      oscillator.connect(gainNode)
      gainNode.connect(ctx.destination)

      oscillator.start(ctx.currentTime)
      oscillator.stop(ctx.currentTime + config.duration)

      // For "complete" sound, add a second higher note
      if (effect === 'complete') {
        const osc2 = ctx.createOscillator()
        const gain2 = ctx.createGain()
        osc2.type = 'sine'
        osc2.frequency.setValueAtTime(1318, ctx.currentTime + 0.15)
        gain2.gain.setValueAtTime(0.3, ctx.currentTime + 0.15)
        gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.45)
        osc2.connect(gain2)
        gain2.connect(ctx.destination)
        osc2.start(ctx.currentTime + 0.15)
        osc2.stop(ctx.currentTime + 0.45)
      }

      // For "wrong" sound, add a descending note
      if (effect === 'wrong') {
        const osc2 = ctx.createOscillator()
        const gain2 = ctx.createGain()
        osc2.type = 'square'
        osc2.frequency.setValueAtTime(180, ctx.currentTime + 0.1)
        gain2.gain.setValueAtTime(0.2, ctx.currentTime + 0.1)
        gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3)
        osc2.connect(gain2)
        gain2.connect(ctx.destination)
        osc2.start(ctx.currentTime + 0.1)
        osc2.stop(ctx.currentTime + 0.3)
      }
    } catch (e) {
      console.warn('[useSound] Failed to play sound:', effect, e)
    }
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
