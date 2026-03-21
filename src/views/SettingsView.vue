<script setup lang="ts">
import { computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/stores/user.store'
import { useTheme } from '@/composables/useTheme'

const { t, locale } = useI18n()
const userStore = useUserStore()
const { toggleTheme, currentTheme } = useTheme()

const settings = computed(() => userStore.settings)

function updateSetting<K extends keyof typeof settings.value>(
  key: K,
  value: (typeof settings.value)[K]
) {
  userStore.updateSettings({ [key]: value })
  if (key === 'language') {
    locale.value = value as string
  }
}

const fontSizeOptions = [
  { value: 'normal' as const, label: 'Normal' },
  { value: 'large' as const, label: 'Groß' },
  { value: 'extra-large' as const, label: 'Sehr Groß' },
]

const themeOptions = [
  { value: 'light' as const, label: 'Hell' },
  { value: 'dark' as const, label: 'Dunkel' },
  { value: 'system' as const, label: 'System' },
]
</script>

<template>
  <div class="settings">
    <!-- iOS large title -->
    <header class="settings-header">
      <h1 class="large-title">Einstellungen</h1>
    </header>

    <!-- Display Section -->
    <section class="settings-group">
      <h2 class="group-header">Anzeige</h2>
      <div class="group-card">
        <!-- Theme -->
        <div class="setting-row">
          <span class="setting-label">{{ t('settings.theme') }}</span>
          <div class="segmented-control">
            <button
              v-for="opt in themeOptions"
              :key="opt.value"
              class="segment"
              :class="{ active: settings.theme === opt.value }"
              @click="updateSetting('theme', opt.value)"
            >
              {{ opt.label }}
            </button>
          </div>
        </div>

        <div class="divider" />

        <!-- Font Size -->
        <div class="setting-row">
          <span class="setting-label">{{ t('settings.fontSize') }}</span>
          <div class="segmented-control">
            <button
              v-for="opt in fontSizeOptions"
              :key="opt.value"
              class="segment"
              :class="{ active: settings.fontSize === opt.value }"
              @click="updateSetting('fontSize', opt.value)"
            >
              {{ opt.label }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Sound & Haptics Section -->
    <section class="settings-group">
      <h2 class="group-header">Ton & Haptik</h2>
      <div class="group-card">
        <div class="setting-row toggle-row">
          <span class="setting-label">{{ t('settings.sound') }}</span>
          <button
            class="ios-toggle"
            :class="{ on: settings.soundEnabled }"
            :aria-pressed="settings.soundEnabled"
            role="switch"
            @click="updateSetting('soundEnabled', !settings.soundEnabled)"
          >
            <span class="toggle-knob" />
          </button>
        </div>

        <div class="divider" />

        <div class="setting-row toggle-row">
          <span class="setting-label">{{ t('settings.haptics') }}</span>
          <button
            class="ios-toggle"
            :class="{ on: settings.hapticEnabled }"
            :aria-pressed="settings.hapticEnabled"
            role="switch"
            @click="updateSetting('hapticEnabled', !settings.hapticEnabled)"
          >
            <span class="toggle-knob" />
          </button>
        </div>
      </div>
    </section>

    <!-- Gameplay Section -->
    <section class="settings-group">
      <h2 class="group-header">Spieleinstellungen</h2>
      <div class="group-card">
        <div class="setting-row toggle-row">
          <span class="setting-label">Timer anzeigen</span>
          <button
            class="ios-toggle"
            :class="{ on: settings.showTimer }"
            :aria-pressed="settings.showTimer"
            role="switch"
            @click="updateSetting('showTimer', !settings.showTimer)"
          >
            <span class="toggle-knob" />
          </button>
        </div>

        <div class="divider" />

        <div class="setting-row toggle-row">
          <span class="setting-label">Schwierigkeit automatisch</span>
          <button
            class="ios-toggle"
            :class="{ on: settings.autoAdvanceDifficulty }"
            :aria-pressed="settings.autoAdvanceDifficulty"
            role="switch"
            @click="updateSetting('autoAdvanceDifficulty', !settings.autoAdvanceDifficulty)"
          >
            <span class="toggle-knob" />
          </button>
        </div>
      </div>
    </section>

    <!-- Language Section -->
    <section class="settings-group">
      <h2 class="group-header">Sprache</h2>
      <div class="group-card">
        <div class="setting-row">
          <div class="segmented-control">
            <button
              class="segment"
              :class="{ active: settings.language === 'de' }"
              @click="updateSetting('language', 'de')"
            >Deutsch</button>
            <button
              class="segment"
              :class="{ active: settings.language === 'be' }"
              @click="updateSetting('language', 'be')"
            >Bärndütsch</button>
            <button
              class="segment"
              :class="{ active: settings.language === 'en' }"
              @click="updateSetting('language', 'en')"
            >English</button>
          </div>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section class="settings-group">
      <h2 class="group-header">{{ t('settings.about') }}</h2>
      <div class="group-card">
        <div class="about-content">
          <p class="about-name">Gehirntraining</p>
          <p class="about-version">Version 0.1.0</p>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.settings {
  padding: 0 var(--space-md);
  padding-top: calc(var(--safe-area-top, 0px) + var(--space-xl));
  padding-bottom: calc(var(--navbar-total-height, 80px) + var(--space-xl));
  max-width: var(--content-max-width);
  margin: 0 auto;
}

// ---------------------------------------------------------------------------
// Header
// ---------------------------------------------------------------------------
.settings-header {
  margin-bottom: var(--space-xl);
}

.large-title {
  font-size: var(--font-size-large-title, 38px);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  letter-spacing: var(--letter-spacing-tight);
  line-height: var(--line-height-tight);
}

// ---------------------------------------------------------------------------
// Settings groups — iOS grouped table style
// ---------------------------------------------------------------------------
.settings-group {
  margin-bottom: var(--space-xl);
}

.group-header {
  font-size: var(--font-size-footnote, 15px);
  font-weight: var(--font-weight-regular);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
  padding: 0 var(--space-md);
  margin-bottom: var(--space-xs);
}

.group-card {
  background: var(--color-bg-elevated);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card);
  overflow: hidden;
}

// ---------------------------------------------------------------------------
// Setting rows
// ---------------------------------------------------------------------------
.setting-row {
  padding: var(--space-md) var(--space-md);
}

.setting-label {
  font-size: var(--font-size-body, 20px);
  font-weight: var(--font-weight-regular);
  color: var(--color-text-primary);
  display: block;
  margin-bottom: var(--space-sm);
}

.toggle-row {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .setting-label {
    margin-bottom: 0;
    flex: 1;
    min-width: 0;
  }
}

.divider {
  height: 1px;
  background: var(--color-border-light, #EDE8F2);
  margin-left: var(--space-md);
}

// ---------------------------------------------------------------------------
// iOS Segmented Control
// ---------------------------------------------------------------------------
.segmented-control {
  display: flex;
  background: var(--color-bg-secondary);
  border-radius: var(--radius-sm);
  padding: 2px;
  gap: 2px;
}

.segment {
  flex: 1;
  padding: var(--space-xs) var(--space-sm);
  border: none;
  border-radius: calc(var(--radius-sm) - 1px);
  background: transparent;
  color: var(--color-text-secondary);
  font-size: var(--font-size-subhead, 18px);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-default);
  min-height: var(--touch-target-min);
  white-space: nowrap;

  &.active {
    background: var(--color-bg-elevated);
    color: var(--color-text-primary);
    font-weight: var(--font-weight-semibold);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  }
}

// ---------------------------------------------------------------------------
// iOS Toggle Switch
// ---------------------------------------------------------------------------
.ios-toggle {
  width: 51px;
  height: 31px;
  border: none;
  border-radius: 15.5px;
  background: var(--color-bg-tertiary);
  position: relative;
  cursor: pointer;
  transition: background var(--duration-normal) var(--ease-default);
  flex-shrink: 0;
  padding: 0;

  &.on {
    background: var(--color-primary, #9B8AB8);

    .toggle-knob {
      transform: translateX(20px);
    }
  }
}

.toggle-knob {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 27px;
  height: 27px;
  border-radius: 50%;
  background: #FFFFFF;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15), 0 0 1px rgba(0, 0, 0, 0.1);
  transition: transform var(--duration-normal) var(--ease-default);
}

// ---------------------------------------------------------------------------
// About section
// ---------------------------------------------------------------------------
.about-content {
  padding: var(--space-xl) var(--space-md);
  text-align: center;
}

.about-icon {
  font-size: 48px;
  margin-bottom: var(--space-sm);
}

.about-name {
  font-size: var(--font-size-title3, 23px);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-2xs, 4px);
}

.about-version {
  font-size: var(--font-size-footnote, 15px);
  color: var(--color-text-tertiary);
}
</style>
