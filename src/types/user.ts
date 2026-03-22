export type ThemeMode = 'light' | 'dark' | 'system'
export type FontSize = 'normal' | 'large' | 'extra-large'
export type AppLanguage = 'de' | 'en' | 'be'

export interface UserSettings {
  theme: ThemeMode
  colorPreset: string
  soundEnabled: boolean
  hapticEnabled: boolean
  fontSize: FontSize
  language: AppLanguage
  showTimer: boolean
  autoAdvanceDifficulty: boolean
  adsEnabled: boolean
}

export interface UserProfile {
  id: string
  displayName: string
  createdAt: number
  onboardingCompleted: boolean
  settings: UserSettings
}

export const defaultUserSettings: UserSettings = {
  theme: 'light',
  colorPreset: 'lilac',
  soundEnabled: true,
  hapticEnabled: true,
  fontSize: 'normal',
  language: 'de',
  showTimer: true,
  autoAdvanceDifficulty: true,
  adsEnabled: true,
}

export const defaultUserProfile: UserProfile = {
  id: '',
  displayName: '',
  createdAt: 0,
  onboardingCompleted: false,
  settings: { ...defaultUserSettings },
}
