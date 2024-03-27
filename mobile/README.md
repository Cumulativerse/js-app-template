# Mobile App

Created by [`@capacitor/create-app`](https://github.com/ionic-team/create-capacitor-app) using:

- `npm init @capacitor/app`
- `npx cap init`
- `npm i @capacitor/android @capacitor/ios`
- `npx cap add android`

and comes with a very minimal shell for building an app.

## Usage

Some notes about created files and folders:

- `npx cap sync` sync core files:
  - Copies dist directory to `android/src/main/assets/public`.
  - Creates files `cordova.js` and `cordova_plugins.js` files in `android/src/main/assets/public`
  - Creates files `capacitor.config.json` and `capacitor.plugins.json` in `android/app/src/main/assets/`
  - Creates folder `android/capacitor-cordova-android-plugins`
  - Creates file `config.xml` in `android/app/src/main/res/xml`
  - Updates files `android/capacitor.settings.gradle`, `android/app/capacitor.build.gradle`
- `npx cap open android` opens Android Studio:
  - Creates folders `android/.gradle` and `android/.idea`
- `npx cap run android` runs emulator (or device):
  - Creates same files with `npx cap sync`
- `npx cap build android` build for android:
  - Creates folder `android/.gradle`
  - Creates folder `android/app/build`
