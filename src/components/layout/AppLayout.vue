<script setup lang="ts">
import AppNavBar from './AppNavBar.vue'

export interface AppLayoutProps {
  showNav?: boolean
}

withDefaults(defineProps<AppLayoutProps>(), {
  showNav: true,
})
</script>

<template>
  <div class="app-layout">
    <main
      class="app-layout__main"
      :class="{ 'app-layout__main--with-nav': showNav }"
    >
      <router-view v-slot="{ Component }">
        <transition name="page-fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
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
    padding-top: var(--safe-area-top);

    &--with-nav {
      padding-bottom: var(--navbar-total-height);
    }
  }
}

// Page transition — soft and smooth
.page-fade-enter-active {
  transition: opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1),
              transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.page-fade-leave-active {
  transition: opacity 0.2s cubic-bezier(0.4, 0, 1, 1),
              transform 0.2s cubic-bezier(0.4, 0, 1, 1);
}

.page-fade-enter-from {
  opacity: 0;
  transform: translateY(8px) scale(0.99);
}

.page-fade-leave-to {
  opacity: 0;
  transform: scale(0.99);
}

@media (prefers-reduced-motion: reduce) {
  .page-fade-enter-active,
  .page-fade-leave-active {
    transition: none;
  }

  .page-fade-enter-from,
  .page-fade-leave-to {
    transform: none;
  }
}
</style>
