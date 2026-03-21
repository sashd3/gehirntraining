<script setup lang="ts">
import {
  Home, BarChart3, Settings, ChevronLeft, ChevronRight,
  Play, Pause, Check, X, Star, Trophy,
  Volume2, VolumeX, Sun, Moon, HelpCircle,
  Undo2, Eraser, Clock, ArrowRight, Info,
  Flame, Gamepad2, Search, Delete
} from 'lucide-vue-next'
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  name: string
  size?: number
  color?: string
  strokeWidth?: number
}>(), {
  size: 24,
  color: 'currentColor',
  strokeWidth: 2,
})

const iconMap: Record<string, any> = {
  home: Home, chart: BarChart3, settings: Settings,
  back: ChevronLeft, 'chevron-right': ChevronRight,
  play: Play, pause: Pause, check: Check, x: X,
  star: Star, trophy: Trophy,
  'sound-on': Volume2, 'sound-off': VolumeX,
  sun: Sun, moon: Moon, hint: HelpCircle,
  undo: Undo2, erase: Eraser, clock: Clock,
  'arrow-right': ArrowRight, info: Info,
  flame: Flame, gamepad: Gamepad2, search: Search,
  delete: Delete,
}

const IconComponent = computed(() => iconMap[props.name] || Info)
</script>

<template>
  <component :is="IconComponent" :size="size" :color="color" :stroke-width="strokeWidth" class="base-icon" />
</template>

<style scoped lang="scss">
.base-icon {
  display: inline-block;
  vertical-align: middle;
  flex-shrink: 0;
}
</style>
