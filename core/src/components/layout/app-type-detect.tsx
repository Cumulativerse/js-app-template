'use client';

import { useEffect } from 'react';
import { SplashScreen } from '@capacitor/splash-screen';
import { useAppDispatch } from '@/lib/redux/hooks';
import { updateAppType } from '@/lib/redux/features/environment/environment-slice';

export default function AppTypeDetect() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(updateAppType());
  }, [dispatch]);

  // Disables the splash screen for mobile apps.
  SplashScreen.hide();

  return null;
}
