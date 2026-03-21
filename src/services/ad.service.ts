export class AdService {
  private static instance: AdService
  private enabled = false

  static getInstance(): AdService {
    if (!AdService.instance) {
      AdService.instance = new AdService()
    }
    return AdService.instance
  }

  isEnabled(): boolean {
    return this.enabled
  }

  setEnabled(enabled: boolean): void {
    this.enabled = enabled
  }

  async initialize(): Promise<void> {
    // Stub: Initialize ad SDK (e.g., AdMob)
    console.log('[AdService] Initialized (stub)')
  }

  async showInterstitial(): Promise<boolean> {
    if (!this.enabled) return false
    // Stub: Show interstitial ad
    console.log('[AdService] Show interstitial (stub)')
    return Promise.resolve(true)
  }

  async showBanner(): Promise<boolean> {
    if (!this.enabled) return false
    // Stub: Show banner ad
    console.log('[AdService] Show banner (stub)')
    return Promise.resolve(true)
  }

  async hideBanner(): Promise<boolean> {
    // Stub: Hide banner ad
    console.log('[AdService] Hide banner (stub)')
    return Promise.resolve(true)
  }

  async showRewarded(): Promise<boolean> {
    if (!this.enabled) return false
    // Stub: Show rewarded ad, returns true if user watched full ad
    console.log('[AdService] Show rewarded (stub)')
    return Promise.resolve(true)
  }
}

export const adService = AdService.getInstance()
