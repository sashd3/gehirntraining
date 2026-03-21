import { ref, watch, onMounted, onUnmounted, computed } from 'vue'
import { useUserStore } from '@/stores/user.store'
import type { ThemeMode } from '@/types/user'

export function useTheme() {
  const userStore = useUserStore()
  const systemPrefersDark = ref(false)
  let mediaQuery: MediaQueryList | null = null
  let mediaHandler: ((e: MediaQueryListEvent) => void) | null = null

  const themeMode = computed(() => userStore.settings.theme)

  const isDark = computed(() => {
    if (themeMode.value === 'dark') return true
    if (themeMode.value === 'light') return false
    return systemPrefersDark.value
  })

  const effectiveTheme = computed<'light' | 'dark'>(() => (isDark.value ? 'dark' : 'light'))

  function applyTheme() {
    const root = document.documentElement
    if (isDark.value) {
      root.setAttribute('data-theme', 'dark')
      root.classList.add('dark')
      root.classList.remove('light')
    } else {
      root.setAttribute('data-theme', 'light')
      root.classList.add('light')
      root.classList.remove('dark')
    }
  }

  async function setTheme(mode: ThemeMode) {
    await userStore.updateSettings({ theme: mode })
    applyTheme()
  }

  async function toggleTheme() {
    const modes: ThemeMode[] = ['light', 'dark', 'system']
    const currentIndex = modes.indexOf(themeMode.value)
    const nextMode = modes[(currentIndex + 1) % modes.length]
    await setTheme(nextMode)
  }

  function initSystemWatcher() {
    if (typeof window === 'undefined') return

    mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    systemPrefersDark.value = mediaQuery.matches

    mediaHandler = (e: MediaQueryListEvent) => {
      systemPrefersDark.value = e.matches
      if (themeMode.value === 'system') {
        applyTheme()
      }
    }

    mediaQuery.addEventListener('change', mediaHandler)
  }

  function destroySystemWatcher() {
    if (mediaQuery && mediaHandler) {
      mediaQuery.removeEventListener('change', mediaHandler)
      mediaQuery = null
      mediaHandler = null
    }
  }

  // Watch for theme changes from store
  watch(themeMode, () => {
    applyTheme()
  })

  onMounted(() => {
    initSystemWatcher()
    applyTheme()
  })

  onUnmounted(() => {
    destroySystemWatcher()
  })

  return {
    themeMode,
    isDark,
    effectiveTheme,
    setTheme,
    toggleTheme,
    applyTheme,
  }
}
