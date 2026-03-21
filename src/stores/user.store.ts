import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { UserProfile, UserSettings } from '@/types/user'
import { defaultUserProfile, defaultUserSettings } from '@/types/user'
import { storageService } from '@/services/storage.service'

const STORAGE_KEY = 'brain-training:user-profile'

export const useUserStore = defineStore('user', () => {
  const profile = ref<UserProfile>({ ...defaultUserProfile })
  const isLoaded = ref(false)

  const settings = computed(() => profile.value.settings)
  const isOnboardingCompleted = computed(() => profile.value.onboardingCompleted)
  const displayName = computed(() => profile.value.displayName)

  async function loadProfile(): Promise<void> {
    const saved = await storageService.get<UserProfile>(STORAGE_KEY)
    if (saved) {
      profile.value = {
        ...defaultUserProfile,
        ...saved,
        settings: {
          ...defaultUserSettings,
          ...saved.settings,
        },
      }
    } else {
      profile.value = {
        ...defaultUserProfile,
        id: generateId(),
        createdAt: Date.now(),
      }
      await saveProfile()
    }
    isLoaded.value = true
  }

  async function saveProfile(): Promise<void> {
    await storageService.set(STORAGE_KEY, profile.value)
  }

  async function updateSettings(patch: Partial<UserSettings>): Promise<void> {
    profile.value.settings = {
      ...profile.value.settings,
      ...patch,
    }
    await saveProfile()
  }

  async function updateDisplayName(name: string): Promise<void> {
    profile.value.displayName = name
    await saveProfile()
  }

  async function completeOnboarding(): Promise<void> {
    profile.value.onboardingCompleted = true
    await saveProfile()
  }

  async function resetProfile(): Promise<void> {
    profile.value = {
      ...defaultUserProfile,
      id: generateId(),
      createdAt: Date.now(),
    }
    await saveProfile()
  }

  function generateId(): string {
    return `user_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
  }

  return {
    profile,
    isLoaded,
    settings,
    isOnboardingCompleted,
    displayName,
    loadProfile,
    updateSettings,
    updateDisplayName,
    completeOnboarding,
    resetProfile,
  }
})
