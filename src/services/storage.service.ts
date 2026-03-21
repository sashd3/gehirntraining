/**
 * Storage service with Capacitor Preferences for native and localStorage for web.
 * Detects native platform automatically.
 */

function isNativePlatform(): boolean {
  try {
    return typeof (window as any)?.Capacitor?.isNativePlatform === 'function'
      && (window as any).Capacitor.isNativePlatform()
  } catch {
    return false
  }
}

let _preferences: any = null
let _checkedNative = false
let _isNative = false

async function getPreferences() {
  if (!_checkedNative) {
    _isNative = isNativePlatform()
    _checkedNative = true
  }

  if (!_isNative) return null
  if (_preferences) return _preferences

  try {
    const mod = await import('@capacitor/preferences')
    _preferences = mod.Preferences
    return _preferences
  } catch {
    return null
  }
}

export class StorageService {
  private static instance: StorageService

  static getInstance(): StorageService {
    if (!StorageService.instance) {
      StorageService.instance = new StorageService()
    }
    return StorageService.instance
  }

  async get<T>(key: string): Promise<T | null> {
    try {
      const prefs = await getPreferences()
      if (prefs) {
        const { value } = await prefs.get({ key })
        if (value === null || value === undefined) return null
        return JSON.parse(value) as T
      }
    } catch {
      // fallback to localStorage
    }

    try {
      const value = localStorage.getItem(key)
      if (value === null) return null
      return JSON.parse(value) as T
    } catch {
      return null
    }
  }

  async set<T>(key: string, value: T): Promise<void> {
    const serialized = JSON.stringify(value)

    try {
      const prefs = await getPreferences()
      if (prefs) {
        await prefs.set({ key, value: serialized })
        return
      }
    } catch {
      // fallback to localStorage
    }

    try {
      localStorage.setItem(key, serialized)
    } catch {
      // storage full or unavailable
    }
  }

  async remove(key: string): Promise<void> {
    try {
      const prefs = await getPreferences()
      if (prefs) {
        await prefs.remove({ key })
        return
      }
    } catch {
      // fallback
    }

    try {
      localStorage.removeItem(key)
    } catch {
      // ignore
    }
  }

  async clear(): Promise<void> {
    try {
      const prefs = await getPreferences()
      if (prefs) {
        await prefs.clear()
        return
      }
    } catch {
      // fallback
    }

    try {
      localStorage.clear()
    } catch {
      // ignore
    }
  }
}

export const storageService = StorageService.getInstance()
