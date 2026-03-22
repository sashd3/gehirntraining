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

// Page transition
.page-fade-enter-active {
  transition: opacity 0.2s ease;
}

.page-fade-leave-active {
  transition: opacity 0.15s ease;
}

.page-fade-enter-from {
  opacity: 0;
}

.page-fade-leave-to {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .page-fade-enter-active,
  .page-fade-leave-active {
    transition: none;
  }
}
</style>
