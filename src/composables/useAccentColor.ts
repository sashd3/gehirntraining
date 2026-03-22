/**
 * Dynamic accent color system.
 * Presets for quick selection + free color picker that auto-generates the full palette.
 */

export interface ColorPreset {
  id: string
  name: string
  primary: string
  accent: string
}

export const colorPresets: ColorPreset[] = [
  { id: 'lilac', name: 'Flieder', primary: '#9B8AB8', accent: '#6BBFAE' },
  { id: 'ocean', name: 'Ozean', primary: '#5B8DB8', accent: '#6BBFAE' },
  { id: 'sage', name: 'Salbei', primary: '#7BA68E', accent: '#B8A06B' },
  { id: 'rose', name: 'Rosenholz', primary: '#B88A98', accent: '#8DB8AE' },
  { id: 'earth', name: 'Erdton', primary: '#A68B6B', accent: '#6BA6A6' },
  { id: 'berry', name: 'Beere', primary: '#8B6BA6', accent: '#A6886B' },
]

// --- HSL Utilities ---

function hexToHsl(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  const l = (max + min) / 2
  let h = 0, s = 0
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
      case g: h = ((b - r) / d + 2) / 6; break
      case b: h = ((r - g) / d + 4) / 6; break
    }
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)]
}

function hslToHex(h: number, s: number, l: number): string {
  s /= 100; l /= 100
  const a = s * Math.min(l, 1 - l)
  const f = (n: number) => {
    const k = (n + h / 30) % 12
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    return Math.round(255 * color).toString(16).padStart(2, '0')
  }
  return `#${f(0)}${f(8)}${f(4)}`
}

// --- Palette Generation ---

export function generatePaletteFromHex(primary: string): Record<string, string> {
  const [h, s, l] = hexToHsl(primary)

  // Generate complementary accent: shift hue by ~150°
  const accentH = (h + 150) % 360

  return {
    primary: primary,
    primaryDark: hslToHex(h, Math.min(s + 10, 100), Math.max(l - 15, 20)),
    primaryLight: hslToHex(h, Math.max(s - 10, 10), Math.min(l + 18, 85)),
    primaryLighter: hslToHex(h, Math.max(s - 25, 5), Math.min(l + 30, 93)),
    primaryBg: hslToHex(h, Math.max(s - 35, 3), Math.min(l + 36, 96)),
    // Backgrounds — very light tint of the primary color
    bgPrimary: hslToHex(h, Math.max(s - 40, 3), 97),
    bgSecondary: hslToHex(h, Math.max(s - 35, 4), 94),
    bgTertiary: hslToHex(h, Math.max(s - 30, 5), 91),
    // Borders — subtle tint
    border: hslToHex(h, Math.max(s - 20, 8), 88),
    borderLight: hslToHex(h, Math.max(s - 25, 5), 92),
    // Text stays readable — dark tinted
    textPrimary: hslToHex(h, Math.min(s, 30), 16),
    textSecondary: hslToHex(h, Math.min(s - 5, 20), 38),
    textTertiary: hslToHex(h, Math.min(s - 10, 15), 58),
    // Accent — complementary
    accent: hslToHex(accentH, Math.min(s + 5, 60), Math.min(l + 5, 55)),
    accentLight: hslToHex(accentH, Math.max(s - 15, 10), Math.min(l + 22, 82)),
    accentLighter: hslToHex(accentH, Math.max(s - 30, 5), Math.min(l + 35, 94)),
    borderFocus: primary,
  }
}

// --- Apply to DOM ---

export function applyColorFromHex(hex: string): void {
  const palette = generatePaletteFromHex(hex)
  const root = document.documentElement

  // Primary palette
  root.style.setProperty('--color-primary', palette.primary)
  root.style.setProperty('--color-primary-dark', palette.primaryDark)
  root.style.setProperty('--color-primary-darker', palette.primaryDark)
  root.style.setProperty('--color-primary-light', palette.primaryLight)
  root.style.setProperty('--color-primary-lighter', palette.primaryLighter)
  root.style.setProperty('--color-primary-bg', palette.primaryBg)

  // Backgrounds — tinted with the chosen color
  root.style.setProperty('--color-bg-primary', palette.bgPrimary)
  root.style.setProperty('--color-bg-secondary', palette.bgSecondary)
  root.style.setProperty('--color-bg-tertiary', palette.bgTertiary)

  // Borders — subtle tint
  root.style.setProperty('--color-border', palette.border)
  root.style.setProperty('--color-border-light', palette.borderLight)
  root.style.setProperty('--color-border-focus', palette.borderFocus)

  // Text — tinted dark
  root.style.setProperty('--color-text-primary', palette.textPrimary)
  root.style.setProperty('--color-text-secondary', palette.textSecondary)
  root.style.setProperty('--color-text-tertiary', palette.textTertiary)

  // Accent — complementary
  root.style.setProperty('--color-accent', palette.accent)
  root.style.setProperty('--color-accent-light', palette.accentLight)
  root.style.setProperty('--color-accent-lighter', palette.accentLighter)
}

export function applyPreset(presetId: string): void {
  const preset = colorPresets.find(p => p.id === presetId)
  if (preset) {
    applyColorFromHex(preset.primary)
    // Override accent with preset's specific accent
    const root = document.documentElement
    const accentPalette = generatePaletteFromHex(preset.accent)
    root.style.setProperty('--color-accent', preset.accent)
    root.style.setProperty('--color-accent-light', accentPalette.primaryLight)
    root.style.setProperty('--color-accent-lighter', accentPalette.primaryLighter)
  }
}

// Backwards compat
export function applyColorPreset(preset: ColorPreset): void {
  applyPreset(preset.id)
}

export function getPresetById(id: string): ColorPreset {
  return colorPresets.find(p => p.id === id) || colorPresets[0]
}
