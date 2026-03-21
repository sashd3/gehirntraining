<template>
  <div class="quiz-question">
    <span class="quiz-question__category">{{ categoryLabel }}</span>
    <p class="quiz-question__text">{{ question.question }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { QuizQuestion } from '@/types/quiz'

const props = defineProps<{
  question: QuizQuestion
}>()

const { t } = useI18n()

const categoryLabels: Record<string, string> = {
  history: 'Geschichte',
  science: 'Naturwissenschaft',
  geography: 'Geografie',
  general: 'Allgemeinwissen',
}

const categoryLabel = computed(() => categoryLabels[props.question.category] ?? props.question.category)
</script>

<style lang="scss" scoped>
.quiz-question {
  text-align: center;
  padding: var(--space-sm) 0;
  font-family: var(--font-family);

  &__category {
    display: inline-block;
    padding: 5px var(--space-sm);
    background-color: var(--color-primary-lighter, #E8E0F0);
    color: var(--color-primary, #9B8AB8);
    border-radius: var(--radius-full);
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-semibold);
    letter-spacing: var(--letter-spacing-wide);
    text-transform: uppercase;
    margin-bottom: var(--space-md);
  }

  &__text {
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-bold);
    line-height: var(--line-height-relaxed);
    color: var(--color-text-primary);
    margin: 0;
  }
}
</style>
