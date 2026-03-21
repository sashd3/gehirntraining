<script setup lang="ts">
import AppNavBar from './AppNavBar.vue'

export interface AppLayoutProps {
  /** Whether to show the bottom tab bar */
  showNav?: boolean
}

withDefaults(defineProps<AppLayoutProps>(), {
  showNav: true,
})
</script>

<template>
  <div class="app-layout">
    <!--
      No fixed header. Content scrolls freely with inline titles.
      Each view includes its own AppHeader for iOS-style large titles.
    -->
    <main
      class="app-layout__main"
      :class="{ 'app-layout__main--with-nav': showNav }"
    >
      <router-view />
    </main>

    <AppNavBar v-if="showNav" />
  </div>
</template>

<style scoped lang="scss">
.app-layout {
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  background-color: var(--color-bg-primary);

  &__main {
    flex: 1;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;

    // Safe area top — content can scroll under the status bar area
    padding-top: var(--safe-area-top);

    &--with-nav {
      // Reserve space for the bottom tab bar + safe area
      padding-bottom: var(--navbar-total-height);
    }
  }
}
</style>
