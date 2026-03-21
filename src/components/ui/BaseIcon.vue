<script setup lang="ts">
import { computed } from 'vue'

export interface BaseIconProps {
  name: string
  size?: number
  color?: string
}

const props = withDefaults(defineProps<BaseIconProps>(), {
  size: 24,
  color: 'currentColor',
})

// Icon SVG path data map
// Each icon is a single SVG path (24x24 viewBox)
const iconMap: Record<string, string> = {
  home: 'M3 12.5L12 3.5l9 9v8.5a1 1 0 01-1 1h-5v-6h-6v6H4a1 1 0 01-1-1v-8.5z',
  chart:
    'M3 3v18h18M7 16v-4m4 4V9m4 7v-6m4 6V5',
  settings:
    'M12 15a3 3 0 100-6 3 3 0 000 6zm7.94-2.06a1.22 1.22 0 00.24 1.34l.04.04a1.5 1.5 0 11-2.12 2.12l-.04-.04a1.22 1.22 0 00-1.34-.24 1.22 1.22 0 00-.74 1.12v.12a1.5 1.5 0 11-3 0v-.06a1.22 1.22 0 00-.8-1.12 1.22 1.22 0 00-1.34.24l-.04.04a1.5 1.5 0 11-2.12-2.12l.04-.04a1.22 1.22 0 00.24-1.34 1.22 1.22 0 00-1.12-.74H4.5a1.5 1.5 0 110-3h.06a1.22 1.22 0 001.12-.8 1.22 1.22 0 00-.24-1.34l-.04-.04a1.5 1.5 0 112.12-2.12l.04.04a1.22 1.22 0 001.34.24h.06a1.22 1.22 0 00.74-1.12V4.5a1.5 1.5 0 013 0v.06a1.22 1.22 0 00.74 1.12 1.22 1.22 0 001.34-.24l.04-.04a1.5 1.5 0 112.12 2.12l-.04.04a1.22 1.22 0 00-.24 1.34v.06a1.22 1.22 0 001.12.74h.12a1.5 1.5 0 110 3h-.06a1.22 1.22 0 00-1.12.74z',
  back: 'M15 19l-7-7 7-7',
  play: 'M6 4l14 8-14 8V4z',
  pause: 'M6 4h4v16H6V4zm8 0h4v16h-4V4z',
  check: 'M5 13l4 4L19 7',
  x: 'M18 6L6 18M6 6l12 12',
  star: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
  trophy:
    'M6 9H3a1 1 0 00-1 1v1a5 5 0 004 4.9V19H4v2h16v-2h-2v-3.1A5 5 0 0022 11v-1a1 1 0 00-1-1h-3V4a1 1 0 00-1-1H7a1 1 0 00-1 1v5zm2-4h8v8a4 4 0 01-8 0V5zM4 11v-1h2v3.83A3 3 0 014 11zm16 0a3 3 0 01-2 2.83V10h2v1z',
  'sound-on':
    'M11 5L6 9H2v6h4l5 4V5zm5.54 2.46a5 5 0 010 7.07M14.12 9.88a2.5 2.5 0 010 3.54',
  'sound-off':
    'M11 5L6 9H2v6h4l5 4V5zm12 4l-4 4m0-4l4 4',
  sun: 'M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42M12 7a5 5 0 100 10 5 5 0 000-10z',
  moon: 'M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z',
  hint: 'M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3m.08 4h.01M12 2a10 10 0 100 20 10 10 0 000-20z',
  undo: 'M3 7v6h6M3 13a9 9 0 0118 0 9 9 0 01-15 6.7',
  erase:
    'M20 20H7l-5-5a1 1 0 010-1.41L13.17 2.17a2 2 0 012.83 0l5.66 5.66a2 2 0 010 2.83L14 18.32',
  clock: 'M12 2a10 10 0 100 20 10 10 0 000-20zm0 4v6l4 2',
  'arrow-right': 'M5 12h14m-7-7l7 7-7 7',
  info: 'M12 2a10 10 0 100 20 10 10 0 000-20zm0 9v5m0-8h.01',
}

const isStroke = computed(() => {
  // These icons are drawn with strokes rather than fills
  const strokeIcons = [
    'back', 'check', 'x', 'chart', 'sound-on', 'sound-off',
    'sun', 'hint', 'undo', 'clock', 'arrow-right', 'info',
  ]
  return strokeIcons.includes(props.name)
})

const pathData = computed(() => iconMap[props.name] || iconMap['info'])
</script>

<template>
  <svg
    class="base-icon"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    :fill="isStroke ? 'none' : color"
    :stroke="isStroke ? color : 'none'"
    :stroke-width="isStroke ? 2 : 0"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <path :d="pathData" />
  </svg>
</template>

<style scoped lang="scss">
.base-icon {
  display: inline-block;
  vertical-align: middle;
  flex-shrink: 0;
}
</style>
