import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.trainyourbrain.app',
  appName: 'Train your Brain',
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
    scheme: 'Train your Brain',
    contentInset: 'automatic',
  },
}

export default config
