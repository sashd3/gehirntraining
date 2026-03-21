import { useUserStore } from '@/stores/user.store'

type ImpactStyle = 'light' | 'medium' | 'heavy'

let Haptics: any = null
let HapticsImpactStyle: any = null

async function loadHaptics() {
  if (Haptics) return { Haptics, HapticsImpactStyle }
  try {
    const mod = await import('@capacitor/haptics')
    Haptics = mod.Haptics
    HapticsImpactStyle = mod.ImpactStyle
    return { Haptics, HapticsImpactStyle }
  } catch {
    return { Haptics: null, HapticsImpactStyle: null }
  }
}

export function useHaptics() {
  const userStore = useUserStore()

  function isEnabled(): boolean {
    return userStore.settings.hapticEnabled
  }

  async function impact(style: ImpactStyle = 'medium'): Promise<void> {
    if (!isEnabled()) return

    try {
      const { Haptics: H, HapticsImpactStyle: S } = await loadHaptics()
      if (H && S) {
        const styleMap: Record<ImpactStyle, any> = {
          light: S.Light,
          medium: S.Medium,
          heavy: S.Heavy,
        }
        await H.impact({ style: styleMap[style] })
      } else {
        // Web fallback using vibration API
        if (navigator.vibrate) {
          const durationMap: Record<ImpactStyle, number> = {
            light: 10,
            medium: 20,
            heavy: 40,
          }
          navigator.vibrate(durationMap[style])
        }
      }
    } catch {
      // Silently fail - haptics not critical
    }
  }

  async function notification(type: 'success' | 'warning' | 'error' = 'success'): Promise<void> {
    if (!isEnabled()) return

    try {
      const { Haptics: H } = await loadHaptics()
      if (H) {
        await H.notification({ type })
      } else if (navigator.vibrate) {
        const patterns: Record<string, number[]> = {
          success: [10, 50, 10],
          warning: [20, 40, 20],
          error: [30, 30, 30, 30, 30],
        }
        navigator.vibrate(patterns[type])
      }
    } catch {
      // Silently fail
    }
  }

  async function selectionClick(): Promise<void> {
    if (!isEnabled()) return

    try {
      const { Haptics: H } = await loadHaptics()
      if (H) {
        await H.selectionClick()
      } else if (navigator.vibrate) {
        navigator.vibrate(5)
      }
    } catch {
      // Silently fail
    }
  }

  function light() { return impact('light') }
  function medium() { return impact('medium') }
  function heavy() { return impact('heavy') }

  return {
    impact,
    notification,
    selectionClick,
    light,
    medium,
    heavy,
    isEnabled,
  }
}
