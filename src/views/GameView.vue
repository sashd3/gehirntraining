<script setup lang="ts">
import { ref, computed, defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { getGameById } from '@/engine/game-registry'
import GameWrapper from '@/components/game/GameWrapper.vue'
import type { Difficulty } from '@/types/game'
import { SearchX } from 'lucide-vue-next'

const route = useRoute()
const { t } = useI18n()

const gameId = computed(() => route.params.gameId as string)
const gameConfig = computed(() => getGameById(gameId.value))
const difficulty = ref<Difficulty>(gameConfig.value?.defaultDifficulty ?? 'easy')

const GameComponent = computed(() => {
  if (!gameConfig.value) return null
  return defineAsyncComponent(gameConfig.value.component)
})

function onDifficultyChange(diff: Difficulty) {
  difficulty.value = diff
}
</script>

<template>
  <div v-if="gameConfig && GameComponent" class="game-view">
    <GameWrapper
      :game-id="gameConfig.id"
      :game-name="t(gameConfig.nameKey)"
      :game-color="gameConfig.color"
      :difficulty="difficulty"
      @difficulty-change="onDifficultyChange"
    >
      <template #default="{ difficulty: diff, isPaused, onComplete }">
        <component
          :is="GameComponent"
          :difficulty="diff"
          :is-paused="isPaused"
          @game-complete="onComplete"
        />
      </template>
    </GameWrapper>
  </div>
  <div v-else class="game-not-found">
    <div class="not-found-content">
      <p class="not-found-icon"><SearchX :size="48" /></p>
      <p class="not-found-text">Spiel nicht gefunden</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.game-view {
  min-height: 100vh;
  min-height: 100dvh;
  background: var(--color-bg-primary);
}

.game-not-found {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  min-height: 100dvh;
  background: var(--color-bg-primary);
}

.not-found-content {
  text-align: center;
}

.not-found-icon {
  font-size: 48px;
  margin-bottom: var(--space-md);
}

.not-found-text {
  font-size: var(--font-size-title2, 25px);
  color: var(--color-text-secondary);
  font-weight: var(--font-weight-medium);
}
</style>
