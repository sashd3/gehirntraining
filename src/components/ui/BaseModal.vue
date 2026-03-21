<script setup lang="ts">
import { watch, onMounted, onUnmounted, ref } from 'vue'
import BaseIcon from './BaseIcon.vue'

export interface BaseModalProps {
  modelValue: boolean
  title?: string
  closable?: boolean
}

const props = withDefaults(defineProps<BaseModalProps>(), {
  title: undefined,
  closable: true,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const modalRef = ref<HTMLElement | null>(null)

function close() {
  if (props.closable) {
    emit('update:modelValue', false)
  }
}

function handleBackdropClick(event: MouseEvent) {
  if (event.target === event.currentTarget) {
    close()
  }
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && props.closable) {
    close()
  }
}

// Lock body scroll when modal is open
watch(
  () => props.modelValue,
  (isOpen) => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  },
)

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="modelValue"
        ref="modalRef"
        class="base-modal"
        role="dialog"
        aria-modal="true"
        :aria-label="title"
        @click="handleBackdropClick"
      >
        <div class="base-modal__content modal__content">
          <div v-if="title || closable" class="base-modal__header">
            <h2 v-if="title" class="base-modal__title">{{ title }}</h2>
            <button
              v-if="closable"
              class="base-modal__close"
              aria-label="Schliessen"
              @click="close"
            >
              <BaseIcon name="x" :size="24" />
            </button>
          </div>
          <div class="base-modal__body">
            <slot />
          </div>
          <div v-if="$slots.footer" class="base-modal__footer">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped lang="scss">
.base-modal {
  position: fixed;
  inset: 0;
  z-index: var(--z-modal);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-lg);
  background-color: var(--color-bg-overlay);

  &__content {
    position: relative;
    width: 100%;
    max-width: 480px;
    max-height: 90vh;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    background-color: var(--color-bg-elevated);
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-xl);
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-md);
    padding: var(--space-lg) var(--space-lg) 0;
  }

  &__title {
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-bold);
    line-height: var(--line-height-tight);
    color: var(--color-text-primary);
    flex: 1;
  }

  &__close {
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--touch-target-min);
    height: var(--touch-target-min);
    border-radius: var(--radius-full);
    color: var(--color-text-secondary);
    transition:
      background-color var(--duration-fast) var(--ease-default),
      color var(--duration-fast) var(--ease-default);
    flex-shrink: 0;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background-color: var(--color-bg-tertiary);
      color: var(--color-text-primary);
    }

    &:active {
      background-color: var(--color-bg-secondary);
    }

    &:focus-visible {
      outline: 3px solid var(--color-border-focus);
      outline-offset: 2px;
    }
  }

  &__body {
    padding: var(--space-lg);
  }

  &__footer {
    display: flex;
    gap: var(--space-sm);
    justify-content: flex-end;
    padding: 0 var(--space-lg) var(--space-lg);
  }
}

// Transition (matching global .modal- transition classes)
.modal-enter-active {
  transition: opacity var(--duration-normal) var(--ease-default);

  .base-modal__content {
    transition:
      transform var(--duration-slow) var(--ease-bounce),
      opacity var(--duration-slow) var(--ease-default);
  }
}

.modal-leave-active {
  transition: opacity var(--duration-normal) var(--ease-default);

  .base-modal__content {
    transition:
      transform var(--duration-normal) var(--ease-in),
      opacity var(--duration-normal) var(--ease-default);
  }
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;

  .base-modal__content {
    opacity: 0;
    transform: scale(0.92) translateY(16px);
  }
}
</style>
