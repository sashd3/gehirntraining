<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Home, BarChart3, Settings } from 'lucide-vue-next'

interface NavTab {
  name: string
  label: string
  icon: any
  route: string
}

const tabs: NavTab[] = [
  { name: 'home', label: 'Home', icon: Home, route: '/' },
  { name: 'progress', label: 'Fortschritt', icon: BarChart3, route: '/progress' },
  { name: 'settings', label: 'Einstellungen', icon: Settings, route: '/settings' },
]

const route = useRoute()
const router = useRouter()

const activeTab = computed(() => {
  const path = route.path
  const match = tabs.find(
    (tab) => path === tab.route || (tab.route !== '/' && path.startsWith(tab.route)),
  )
  return match?.name || 'home'
})

function navigateTo(tab: NavTab) {
  if (route.path !== tab.route) {
    router.push(tab.route)
  }
}
</script>

<template>
  <nav class="app-navbar" role="tablist" aria-label="Hauptnavigation">
    <div class="app-navbar__inner">
      <button
        v-for="tab in tabs"
        :key="tab.name"
        class="app-navbar__tab"
        :class="{ 'app-navbar__tab--active': activeTab === tab.name }"
        role="tab"
        :aria-selected="activeTab === tab.name"
        :aria-label="tab.label"
        @click="navigateTo(tab)"
      >
        <span class="app-navbar__icon">
          <component :is="tab.icon" :size="24" />
        </span>
        <span class="app-navbar__label">{{ tab.label }}</span>
      </button>
    </div>
  </nav>
</template>

<style scoped lang="scss">
.app-navbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: var(--z-header);

  // Warm cream translucent tab bar — Stitch spec
  background-color: rgba(254, 248, 243, 0.85);
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);

  // NO border — use background shift only (Stitch spec)
  border-top: none;

  // Safe area at bottom (iPhone notch area)
  padding-bottom: var(--safe-area-bottom);

  // Dark mode adjustments — navy-based
  [data-theme='dark'] & {
    background-color: rgba(17, 24, 39, 0.88);
    border-top: none;
  }

  &__inner {
    display: flex;
    align-items: stretch;
    justify-content: space-around;
    height: 49px; // Standard tab bar height
    max-width: var(--content-max-width);
    margin: 0 auto;
  }

  &__tab {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2px;
    flex: 1;
    min-width: var(--touch-target-min);
    padding: var(--space-2xs) var(--space-xs);
    color: var(--color-text-tertiary); // #737783 — muted
    -webkit-tap-highlight-color: transparent;
    transition:
      color var(--duration-fast) var(--ease-default),
      transform var(--duration-fast) var(--ease-default);

    &:active {
      transform: scale(0.90);
    }

    &:focus-visible {
      outline: 3px solid var(--color-border-focus);
      outline-offset: -3px;
      border-radius: var(--radius-md);
    }

    // Active tab — Deep Navy (Stitch spec: #003173)
    &--active {
      color: #003173;
      color: var(--color-primary);
    }
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: var(--radius-full);
    transition: color var(--duration-fast) var(--ease-default);
  }

  &__label {
    font-size: 10px; // Tab bar label size — intentionally small
    font-weight: var(--font-weight-medium);
    line-height: 1;
    letter-spacing: 0.01em;

    .app-navbar__tab--active & {
      font-weight: var(--font-weight-semibold);
      color: #003173;
      color: var(--color-primary);
    }
  }
}
</style>
