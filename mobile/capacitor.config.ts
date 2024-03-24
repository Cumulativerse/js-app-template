import { CapacitorConfig } from '@capacitor/cli';

// https://capacitorjs.com/docs/config#schema

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'Mobile App Template',
  webDir: '../core/out',
  plugins: {
    SplashScreen: {
      launchShowDuration: 0,
    },
  },
  server: {
    androidScheme: 'https',
  },
};

export default config;
