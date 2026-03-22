/**
 * Dynamic accent color system.
 * User picks a base color, and we generate the full palette from it.
 */

export interface ColorPreset {
  id: string
  name: string
  primary: string
  primaryLight: string
  primaryLighter: string
  primaryBg: string
  primaryDark: string
  accent: string
  accentLight: string
  accentLighter: string
}

export const colorPresets: ColorPreset[] = [
  {
    id: 'lilac',
    name: 'Flieder',
    primary: '#9B8AB8',
    primaryLight: '#C4B5D4',
    primaryLighter: '#E8E0F0',
    primaryBg: '#F3EFF8',
    primaryDark: '#7B6A9B',
    accent: '#6BBFAE',
    accentLight: '#8DD4C5',
    accentLighter: '#E5F5F1',
  },
  {
    id: 'ocean',
    name: 'Ozean',
    primary: '#5B8DB8',
    primaryLight: '#9DC0DB',
    primaryLighter: '#E0EDF5',
    primaryBg: '#EFF5FA',
    primaryDark: '#3D6F9B',
    accent: '#6BBFAE',
    accentLight: '#8DD4C5',
    accentLighter: '#E5F5F1',
  },
  {
    id: 'sage',
    name: 'Salbei',
    primary: '#7BA68E',
    primaryLight: '#A8C9B5',
    primaryLighter: '#E0F0E7',
    primaryBg: '#EFF7F2',
    primaryDark: '#5E8A72',
    accent: '#B8A06B',
    accentLight: '#D4C48D',
    accentLighter: '#F5F0E5',
  },
  {
    id: 'rose',
    name: 'Rosenholz',
    primary: '#B88A98',
    primaryLight: '#D4B5BF',
    primaryLighter: '#F0E0E6',
    primaryBg: '#F8EFF2',
    primaryDark: '#9B6A7B',
    accent: '#8DB8AE',
    accentLight: '#B5D4CC',
    accentLighter: '#E5F2EF',
  },
  {
    id: 'earth',
    name: 'Erdton',
    primary: '#A68B6B',
    primaryLight: '#C9B5A0',
    primaryLighter: '#F0E6DA',
    primaryBg: '#F7F2EC',
    primaryDark: '#8A705A',
    accent: '#6BA6A6',
    accentLight: '#A0C9C9',
    accentLighter: '#E0F0F0',
  },
  {
    id: 'berry',
    name: 'Beere',
    primary: '#8B6BA6',
    primaryLight: '#B5A0C9',
    primaryLighter: '#E6DAF0',
    primaryBg: '#F2ECF7',
    primaryDark: '#705A8A',
    accent: '#A6886B',
    accentLight: '#C9B5A0',
    accentLighter: '#F0E6DA',
  },
]

export function applyColorPreset(preset: ColorPreset): void {
  const root = document.documentElement
  root.style.setProperty('--color-primary', preset.primary)
  root.style.setProperty('--color-primary-light', preset.primaryLight)
  root.style.setProperty('--color-primary-lighter', preset.primaryLighter)
  root.style.setProperty('--color-primary-bg', preset.primaryBg)
  root.style.setProperty('--color-primary-dark', preset.primaryDark)
  root.style.setProperty('--color-primary-darker', preset.primaryDark)
  root.style.setProperty('--color-accent', preset.accent)
  root.style.setProperty('--color-accent-light', preset.accentLight)
  root.style.setProperty('--color-accent-lighter', preset.accentLighter)
  root.style.setProperty('--color-border-focus', preset.primary)
}

export function getPresetById(id: string): ColorPreset {
  return colorPresets.find(p => p.id === id) || colorPresets[0]
}
