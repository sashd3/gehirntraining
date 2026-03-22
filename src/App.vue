<script setup lang="ts">
import { onMounted, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/stores/user.store'
import { useProgressStore } from '@/stores/progress.store'
import { useDailyChallengeStore } from '@/stores/daily-challenge.store'
import { useTheme } from '@/composables/useTheme'
import { cloudLoad, cloudRestore, cloudSaveDebounced } from '@/services/cloud-sync.service'
import { applyPreset, applyColorFromHex } from '@/composables/useAccentColor'

const { locale } = useI18n()
const userStore = useUserStore()
const progressStore = useProgressStore()
const dailyChallengeStore = useDailyChallengeStore()
const { applyTheme } = useTheme()

onMounted(async () => {
  // Try to restore from cloud if local is empty
  const hasLocalProfile = !!localStorage.getItem('brain-training:user-profile')
  if (!hasLocalProfile) {
    await cloudRestore()
  }

  await userStore.loadProfile()
  await progressStore.loadAllProgress()
  await dailyChallengeStore.loadToday()
  applyTheme()
  locale.value = userStore.settings.language
  const colorPref = userStore.settings.colorPreset || 'lilac'
  if (colorPref.startsWith('#')) {
    applyColorFromHex(colorPref)
  } else {
    applyPreset(colorPref)
  }

  // Background: check cloud for newer data
  cloudLoad().then(cloudData => {
    if (cloudData && cloudData.lastSyncedAt) {
      const localProfile = localStorage.getItem('brain-training:user-profile')
      if (localProfile) {
        const local = JSON.parse(localProfile)
        // If cloud data is newer, restore it
        if (cloudData.lastSyncedAt > (local.lastSyncedAt || 0)) {
          cloudRestore().then(() => {
            userStore.loadProfile()
            progressStore.loadAllProgress()
          })
        }
      }
    }
  })
})

watchEffect(() => {
  if (userStore.isLoaded) {
    const fontSize = userStore.settings.fontSize
    document.documentElement.setAttribute('data-font-size', fontSize)
  }
})
</script>

<template>
  <router-view />
</template>

<style lang="scss">
#app {
  width: 100%;
  min-height: 100vh;
  min-height: 100dvh;
  background-color: var(--color-bg-primary);
  color: var(--color-text-primary);
  font-family: var(--font-family);
  font-size: var(--font-size-base);
  line-height: var(--line-height-normal);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
