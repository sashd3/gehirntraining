import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.braintraining.app',
  appName: 'Gehirntraining',
  webDir: 'dist',
  plugins: {
    SplashScreen: {
      launchAutoHide: false,
      showSpinner: false,
      backgroundColor: '#FFFFFF',
    },
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#FFFFFF',
    },
  },
  ios: {
    scheme: 'Gehirntraining',
    contentInset: 'automatic',
  },
}

export default config
