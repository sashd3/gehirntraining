<script setup lang="ts">
import { useRouter } from 'vue-router'
import BaseIcon from '@/components/ui/BaseIcon.vue'

export interface AppHeaderProps {
  /** Large title text displayed at the top of the scrollable content */
  title?: string
  /** Show a back chevron for sub-page navigation */
  showBack?: boolean
}

const props = withDefaults(defineProps<AppHeaderProps>(), {
  title: '',
  showBack: false,
})

const router = useRouter()

function goBack() {
  if (window.history.length > 1) {
    router.back()
  } else {
    router.push('/')
  }
}
</script>

<template>
  <header class="app-header">
    <!-- Back button row (only for sub-pages) -->
    <div v-if="showBack" class="app-header__nav-row">
      <button
        class="app-header__back"
        aria-label="Zuruck"
        @click="goBack"
      >
        <BaseIcon name="back" :size="22" />
        <span class="app-header__back-label">Zuruck</span>
      </button>
      <div class="app-header__nav-actions">
        <slot name="actions" />
      </div>
    </div>

    <!-- iOS-style large title — inline, not fixed -->
    <div class="app-header__title-row">
      <h1 class="app-header__title">
        <slot name="title">{{ title }}</slot>
      </h1>
      <div v-if="!showBack" class="app-header__actions">
        <slot name="actions" />
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
.app-header {
  // NOT fixed — this is an inline header in the scrollable content flow
  padding: var(--space-sm) var(--content-padding) var(--space-xs);

  &__nav-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: var(--touch-target-min);
    margin-bottom: var(--space-2xs);
  }

  &__back {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2xs);
    min-height: var(--touch-target-min);
    padding: var(--space-xs) var(--space-xs) var(--space-xs) 0;
    color: var(--color-primary);
    font-size: var(--font-size-body);
    font-weight: var(--font-weight-regular);
    -webkit-tap-highlight-color: transparent;
    transition:
      opacity var(--duration-fast) var(--ease-default),
      transform var(--duration-fast) var(--ease-default);

    &:active {
      opacity: 0.6;
      transform: scale(0.97);
    }

    &:focus-visible {
      outline: 3px solid var(--color-border-focus);
      outline-offset: 2px;
      border-radius: var(--radius-sm);
    }
  }

  &__back-label {
    // iOS shows the previous screen's title — we just show "Zuruck"
    font-size: var(--font-size-body);
    color: var(--color-primary);
  }

  &__nav-actions {
    display: flex;
    align-items: center;
    gap: var(--space-xs);
  }

  &__title-row {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: var(--space-md);
  }

  &__title {
    // iOS large title style
    font-size: var(--font-size-large-title);
    font-weight: var(--font-weight-bold);
    line-height: var(--line-height-tight);
    letter-spacing: var(--letter-spacing-tight);
    color: var(--color-text-primary);
    flex: 1;
    min-width: 0;
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: var(--space-xs);
    flex-shrink: 0;
    padding-bottom: var(--space-2xs);
  }
}
</style>
