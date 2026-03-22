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
  <nav class="navbar" role="tablist" aria-label="Hauptnavigation">
    <div class="navbar__inner">
      <button
        v-for="tab in tabs"
        :key="tab.name"
        class="navbar__tab"
        :class="{ 'navbar__tab--active': activeTab === tab.name }"
        role="tab"
        :aria-selected="activeTab === tab.name"
        :aria-label="tab.label"
        @click="navigateTo(tab)"
      >
        <!-- Hump SVG behind active icon -->
        <span class="navbar__hump">
          <svg viewBox="0 0 100 28" preserveAspectRatio="none">
            <path d="M0 28 C25 28, 30 0, 50 0 S75 28, 100 28 Z" />
          </svg>
        </span>

        <span class="navbar__icon">
          <component :is="tab.icon" :size="22" />
        </span>
        <span v-if="activeTab === tab.name" class="navbar__label">{{ tab.label }}</span>
      </button>
    </div>
  </nav>
</template>

<style scoped lang="scss">
.navbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: var(--color-bg-elevated, #FFFFFF);
  border-top: 1px solid var(--color-border-light, rgba(0,0,0,0.06));
  padding-bottom: var(--safe-area-bottom);

  &__inner {
    display: flex;
    align-items: flex-end;
    justify-content: space-around;
    height: 60px;
    max-width: var(--content-max-width);
    margin: 0 auto;
    position: relative;
  }

  &__tab {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    gap: 3px;
    flex: 1;
    min-width: var(--touch-target-min);
    padding-bottom: 8px;
    color: var(--color-text-tertiary);
    position: relative;
    -webkit-tap-highlight-color: transparent;
    border: none;
    background: none;
    font-family: inherit;
    cursor: pointer;

    // Active state
    &--active {
      color: var(--color-primary);

      .navbar__hump {
        transform: scaleY(1);
        opacity: 1;
      }

      .navbar__icon {
        transform: translateY(-18px);
        background: var(--color-primary);
        color: #FFFFFF;
        box-shadow: 0 4px 14px rgba(0,0,0,0.18);
      }
    }
  }

  // Hump behind active icon
  &__hump {
    position: absolute;
    top: -16px;
    left: 5%;
    right: 5%;
    height: 30px;
    transform: scaleY(0);
    transform-origin: bottom;
    transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease;
    opacity: 0;
    pointer-events: none;

    svg {
      width: 100%;
      height: 100%;
      display: block;
    }

    path {
      fill: var(--color-bg-elevated, #FFFFFF);
    }
  }

  // Icon circle
  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background: transparent;
    transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
                background 0.3s ease,
                color 0.3s ease,
                box-shadow 0.3s ease;
    z-index: 1;
  }

  // Label — only shown for active tab
  &__label {
    font-size: 11px;
    font-weight: 600;
    line-height: 1;
    letter-spacing: 0.02em;
    color: var(--color-primary);
  }
}

// Reduced motion
@media (prefers-reduced-motion: reduce) {
  .navbar__icon,
  .navbar__hump,
  .navbar__label {
    transition: none;
  }
}
</style>
