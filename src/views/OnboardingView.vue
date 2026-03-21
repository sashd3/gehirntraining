<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/stores/user.store'

const router = useRouter()
const { t } = useI18n()
const userStore = useUserStore()

const step = ref(0)
const name = ref('')
const selectedFontSize = ref<'normal' | 'large' | 'extra-large'>('normal')

const totalSteps = 3

function nextStep() {
  if (step.value < totalSteps - 1) {
    step.value++
  } else {
    complete()
  }
}

function setFontSize(size: 'normal' | 'large' | 'extra-large') {
  selectedFontSize.value = size
  document.documentElement.setAttribute('data-font-size', size)
}

async function complete() {
  await userStore.updateSettings({
    fontSize: selectedFontSize.value,
  })
  if (name.value.trim()) {
    userStore.profile.displayName = name.value.trim()
  }
  await userStore.completeOnboarding()
  router.replace('/')
}
</script>

<template>
  <div class="onboarding">
    <!-- Step dots -->
    <div class="step-dots">
      <span
        v-for="i in totalSteps"
        :key="i"
        class="dot"
        :class="{ active: step >= i - 1, current: step === i - 1 }"
      />
    </div>

    <!-- Step 0: Welcome -->
    <Transition name="step" mode="out-in">
      <div v-if="step === 0" key="welcome" class="step-content">
        <div class="step-visual">
          <div class="welcome-icon">🧠</div>
        </div>
        <h1 class="step-title">Willkommen!</h1>
        <p class="step-subtitle">Gehirntraining für jeden Tag</p>
        <p class="step-description">
          Trainieren Sie Ihr Gehirn mit Quiz-Fragen, Kreuzworträtseln,
          Sudoku und vielen weiteren Spielen.
        </p>
        <div class="step-actions">
          <button class="primary-btn" @click="nextStep">Weiter</button>
        </div>
      </div>

      <!-- Step 1: Name -->
      <div v-else-if="step === 1" key="name" class="step-content">
        <div class="step-visual">
          <div class="welcome-icon">👋</div>
        </div>
        <h1 class="step-title">Wie heißen Sie?</h1>
        <p class="step-subtitle">Damit wir Sie begrüßen können</p>
        <input
          v-model="name"
          type="text"
          class="name-input"
          placeholder="Ihr Name (optional)"
          autocomplete="name"
        />
        <div class="step-actions">
          <button class="primary-btn" @click="nextStep">Weiter</button>
          <button class="text-btn" @click="nextStep">Überspringen</button>
        </div>
      </div>

      <!-- Step 2: Font Size -->
      <div v-else-if="step === 2" key="font" class="step-content">
        <div class="step-visual">
          <div class="welcome-icon">🔤</div>
        </div>
        <h1 class="step-title">Schriftgröße</h1>
        <p class="step-subtitle">Wählen Sie eine angenehme Größe</p>

        <div class="font-options">
          <button
            class="font-option"
            :class="{ active: selectedFontSize === 'normal' }"
            @click="setFontSize('normal')"
          >
            <span class="font-option-label">Normal</span>
            <span class="font-preview" style="font-size: 18px;">Beispieltext</span>
          </button>
          <button
            class="font-option"
            :class="{ active: selectedFontSize === 'large' }"
            @click="setFontSize('large')"
          >
            <span class="font-option-label">Groß</span>
            <span class="font-preview" style="font-size: 22px;">Beispieltext</span>
          </button>
          <button
            class="font-option"
            :class="{ active: selectedFontSize === 'extra-large' }"
            @click="setFontSize('extra-large')"
          >
            <span class="font-option-label">Sehr Groß</span>
            <span class="font-preview" style="font-size: 28px;">Beispieltext</span>
          </button>
        </div>

        <div class="step-actions">
          <button class="primary-btn gradient" @click="complete">Los geht's!</button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.onboarding {
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--space-2xl) var(--space-lg);
  padding-top: calc(var(--safe-area-top, 0px) + var(--space-2xl));
  background: var(--color-bg-primary);
}

// ---------------------------------------------------------------------------
// Step dots
// ---------------------------------------------------------------------------
.step-dots {
  display: flex;
  gap: var(--space-xs);
  margin-bottom: var(--space-2xl);
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-border, #E0DAE8);
  transition: all var(--duration-normal) var(--ease-default);

  &.active {
    background: var(--color-primary-light, #C4B5D4);
  }

  &.current {
    background: var(--color-primary, #9B8AB8);
    width: 24px;
    border-radius: var(--radius-full);
  }
}

// ---------------------------------------------------------------------------
// Step content
// ---------------------------------------------------------------------------
.step-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 400px;
  width: 100%;
  text-align: center;
  gap: var(--space-md);
}

.step-visual {
  margin-bottom: var(--space-md);
}

.welcome-icon {
  font-size: 80px;
  line-height: 1;
  animation: gentle-bounce 2s ease-in-out infinite;
}

@keyframes gentle-bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

.step-title {
  font-size: var(--font-size-title1, 32px);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  letter-spacing: var(--letter-spacing-tight);
}

.step-subtitle {
  font-size: var(--font-size-title3, 23px);
  color: var(--color-text-secondary);
  font-weight: var(--font-weight-regular);
}

.step-description {
  font-size: var(--font-size-body, 20px);
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
  max-width: 320px;
}

// ---------------------------------------------------------------------------
// Name input
// ---------------------------------------------------------------------------
.name-input {
  width: 100%;
  padding: var(--space-md) var(--space-lg);
  border: 2px solid var(--color-border, #E0DAE8);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-title3, 23px);
  font-family: inherit;
  color: var(--color-text-primary);
  background: var(--color-bg-elevated);
  text-align: center;
  min-height: var(--touch-target-large);
  transition: border-color var(--duration-fast) var(--ease-default);

  &:focus {
    outline: none;
    border-color: var(--color-primary, #9B8AB8);
  }

  &::placeholder {
    color: var(--color-text-tertiary);
  }
}

// ---------------------------------------------------------------------------
// Font size options
// ---------------------------------------------------------------------------
.font-options {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.font-option {
  width: 100%;
  padding: var(--space-md) var(--space-lg);
  border: 2px solid var(--color-border, #E0DAE8);
  border-radius: var(--radius-lg);
  background: var(--color-bg-elevated);
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: var(--touch-target-large);
  transition: all var(--duration-fast) var(--ease-default);

  &.active {
    border-color: var(--color-primary, #9B8AB8);
    background: var(--color-primary-bg, #F3EFF8);

    .font-option-label {
      color: var(--color-primary-dark, #7B6A9B);
      font-weight: var(--font-weight-semibold);
    }
  }
}

.font-option-label {
  font-size: var(--font-size-body, 20px);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
}

.font-preview {
  color: var(--color-text-tertiary);
}

// ---------------------------------------------------------------------------
// Actions
// ---------------------------------------------------------------------------
.step-actions {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-sm);
  margin-top: var(--space-lg);
}

.primary-btn {
  width: 100%;
  padding: var(--space-md) var(--space-lg);
  border: none;
  border-radius: var(--radius-lg);
  background: var(--color-primary, #9B8AB8);
  color: #FFFFFF;
  font-size: var(--font-size-title3, 23px);
  font-weight: var(--font-weight-semibold);
  font-family: inherit;
  cursor: pointer;
  min-height: var(--touch-target-large);
  transition: transform var(--duration-fast) var(--ease-default);

  &:active {
    transform: scale(0.97);
  }

  &.gradient {
    background: linear-gradient(135deg, var(--color-primary, #9B8AB8) 0%, var(--color-accent, #6BBFAE) 100%);
  }
}

.text-btn {
  background: none;
  border: none;
  color: var(--color-text-tertiary);
  font-size: var(--font-size-body, 20px);
  font-family: inherit;
  cursor: pointer;
  padding: var(--space-sm) var(--space-md);
  min-height: var(--touch-target-min);
}

// ---------------------------------------------------------------------------
// Step transitions
// ---------------------------------------------------------------------------
.step-enter-active,
.step-leave-active {
  transition: all var(--duration-slow, 350ms) var(--ease-default);
}

.step-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.step-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

// ---------------------------------------------------------------------------
// Reduced motion
// ---------------------------------------------------------------------------
@media (prefers-reduced-motion: reduce) {
  .welcome-icon {
    animation: none;
  }

  .step-enter-active,
  .step-leave-active {
    transition: opacity var(--duration-normal) var(--ease-default);
  }

  .step-enter-from,
  .step-leave-to {
    transform: none;
  }

  .primary-btn {
    transition: none;
  }
}
</style>
