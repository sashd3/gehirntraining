/**
 * Cloud sync service using Netlify Blobs.
 * Syncs user data (profile, progress, streaks) to the cloud.
 * Falls back gracefully if offline or API unavailable.
 */

const API_BASE = '/.netlify/functions/user-data'

// Debounce to avoid too many saves
let saveTimeout: ReturnType<typeof setTimeout> | null = null
const SAVE_DEBOUNCE_MS = 2000

export interface CloudData {
  profile: any
  progress: any
  streak: any
  dailyHistory: any
  lastSyncedAt: number
}

function getUserId(): string | null {
  try {
    const profile = localStorage.getItem('brain-training:user-profile')
    if (profile) {
      const parsed = JSON.parse(profile)
      return parsed.id || null
    }
  } catch {
    // ignore
  }
  return null
}

export async function cloudLoad(): Promise<CloudData | null> {
  const userId = getUserId()
  if (!userId) return null

  try {
    const res = await fetch(`${API_BASE}?userId=${encodeURIComponent(userId)}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    if (!res.ok) return null
    const json = await res.json()
    if (json.exists && json.data) {
      return json.data as CloudData
    }
    return null
  } catch {
    // Offline or API error — return null
    return null
  }
}

export function cloudSaveDebounced(): void {
  if (saveTimeout) clearTimeout(saveTimeout)
  saveTimeout = setTimeout(() => {
    cloudSaveNow()
  }, SAVE_DEBOUNCE_MS)
}

export async function cloudSaveNow(): Promise<boolean> {
  const userId = getUserId()
  if (!userId) return false

  try {
    const data: CloudData = {
      profile: safeGetItem('brain-training:user-profile'),
      progress: safeGetItem('brain-training:progress'),
      streak: safeGetItem('brain-training:streak'),
      dailyHistory: safeGetItem('brain-training:daily-challenge-history'),
      lastSyncedAt: Date.now(),
    }

    const res = await fetch(`${API_BASE}?userId=${encodeURIComponent(userId)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    return res.ok
  } catch {
    return false
  }
}

export async function cloudRestore(): Promise<boolean> {
  const cloudData = await cloudLoad()
  if (!cloudData) return false

  try {
    if (cloudData.profile) {
      localStorage.setItem('brain-training:user-profile', JSON.stringify(cloudData.profile))
    }
    if (cloudData.progress) {
      localStorage.setItem('brain-training:progress', JSON.stringify(cloudData.progress))
    }
    if (cloudData.streak) {
      localStorage.setItem('brain-training:streak', JSON.stringify(cloudData.streak))
    }
    if (cloudData.dailyHistory) {
      localStorage.setItem('brain-training:daily-challenge-history', JSON.stringify(cloudData.dailyHistory))
    }
    return true
  } catch {
    return false
  }
}

function safeGetItem(key: string): any {
  try {
    const val = localStorage.getItem(key)
    return val ? JSON.parse(val) : null
  } catch {
    return null
  }
}
