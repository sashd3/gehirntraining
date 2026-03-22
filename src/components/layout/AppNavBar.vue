<script setup lang="ts">
import { computed, ref, watch, nextTick } from 'vue'
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

const activeIndex = computed(() => tabs.findIndex(t => t.name === activeTab.value))

function navigateTo(tab: NavTab) {
  if (route.path !== tab.route) {
    router.push(tab.route)
  }
}
</script>

<template>
  <nav class="navbar" role="tablist" aria-label="Hauptnavigation">
    <!-- Background shape: bar + hump as ONE unified shape -->
    <svg class="navbar__bg" viewBox="0 0 390 86" preserveAspectRatio="none" aria-hidden="true">
      <path
        class="navbar__bg-path"
        :d="activeIndex === 0
          ? 'M0 28 C45 28, 50 0, 65 0 S85 28, 130 28 L390 28 L390 86 L0 86 Z'
          : activeIndex === 1
            ? 'M0 28 L130 28 C175 28, 180 0, 195 0 S215 28, 260 28 L390 28 L390 86 L0 86 Z'
            : 'M0 28 L260 28 C305 28, 310 0, 325 0 S345 28, 390 28 L390 86 L0 86 Z'
        "
      />
    </svg>

    <div class="navbar__inner">
      <button
        v-for="(tab, i) in tabs"
        :key="tab.name"
        class="navbar__tab"
        :class="{ 'navbar__tab--active': activeTab === tab.name }"
        role="tab"
        :aria-selected="activeTab === tab.name"
        :aria-label="tab.label"
        @click="navigateTo(tab)"
      >
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
  height: 86px;
  padding-bottom: var(--safe-area-bottom);

  &__bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  &__bg-path {
    fill: var(--color-bg-elevated, #FFFFFF);
    stroke: var(--color-border-light, rgba(0, 0, 0, 0.08));
    stroke-width: 1;
    vector-effect: non-scaling-stroke;
    transition: d 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  &__inner {
    display: flex;
    align-items: flex-end;
    justify-content: space-around;
    height: 100%;
    max-width: var(--content-max-width);
    margin: 0 auto;
    position: relative;
    z-index: 1;
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

    &--active {
      color: var(--color-primary);

      .navbar__icon {
        transform: translateY(-18px);
        background: var(--color-primary);
        color: #FFFFFF;
        box-shadow: 0 4px 14px rgba(0, 0, 0, 0.18);
      }
    }
  }

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

  &__label {
    font-size: 11px;
    font-weight: 600;
    line-height: 1;
    letter-spacing: 0.02em;
    color: var(--color-primary);
  }
}

@media (prefers-reduced-motion: reduce) {
  .navbar__icon,
  .navbar__bg-path {
    transition: none;
  }
}
</style>
