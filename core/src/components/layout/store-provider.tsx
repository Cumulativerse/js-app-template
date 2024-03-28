'use client';

import { SplashScreen } from '@capacitor/splash-screen';
// Redux
import { Provider } from 'react-redux';
import { store } from '@/lib/redux/store';

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Disables the splash screen for mobile apps.
  SplashScreen.hide();
  return <Provider store={store}>{children}</Provider>;
}
