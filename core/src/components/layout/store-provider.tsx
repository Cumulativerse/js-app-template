'use client';

import { AppTypeDetect } from '@/components/layout/app-type-detect';
// Redux
import { Provider } from 'react-redux';
import { store } from '@/lib/redux/store';

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <AppTypeDetect />
      {children}
    </Provider>
  );
}
