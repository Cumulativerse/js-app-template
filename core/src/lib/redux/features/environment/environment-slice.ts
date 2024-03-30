import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '@/lib/redux/store';
import { Capacitor } from '@capacitor/core';

type AppType = 'web' | 'mobile' | 'desktop' | 'extension';

export interface EnvironmentState {
  appType?: AppType;
}

// Initial state
const initialState: EnvironmentState = {
  appType: undefined,
};

const environmentSlice = createSlice({
  name: 'environment',
  // `environmentSlice` will infer the state type from the `initialState` argument
  initialState,
  // Redux Toolkit allows us to write "mutating" logic in reducers. It
  // doesn't actually mutate the state because it uses the Immer library,
  // which detects changes to a "draft state" and produces a brand new
  // immutable state based off those changes
  reducers: {
    updateAppType: (state) => {
      if (window.location.protocol.includes('extension')) {
        state.appType = 'extension';
      } else if (window.desktopApi) {
        state.appType = 'desktop';
      } else if (Capacitor.isNativePlatform()) {
        state.appType = 'mobile';
      } else {
        state.appType = 'web';
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateAppType } = environmentSlice.actions;

// The functions below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectAppType = (state: RootState) => state.environment.appType;

export default environmentSlice.reducer;
