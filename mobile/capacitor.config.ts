import { CapacitorConfig } from '@capacitor/cli';

const isDev = process.env.BUILD_MODE === 'development';
console.log('Mobile isDev: ', isDev);

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
    url: isDev ? 'http://192.168.1.2:3000' : undefined,
    cleartext: isDev ? true : undefined,
  },
};

export default config;
