<script setup lang="ts">
import { onMounted, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/stores/user.store'
import { useProgressStore } from '@/stores/progress.store'
import { useDailyChallengeStore } from '@/stores/daily-challenge.store'
import { useTheme } from '@/composables/useTheme'

const { locale } = useI18n()
const userStore = useUserStore()
const progressStore = useProgressStore()
const dailyChallengeStore = useDailyChallengeStore()
const { applyTheme } = useTheme()

onMounted(async () => {
  await userStore.loadProfile()
  await progressStore.loadAllProgress()
  await dailyChallengeStore.loadToday()
  applyTheme()
  locale.value = userStore.settings.language
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
