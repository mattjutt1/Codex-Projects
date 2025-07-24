import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/store';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <Provider store={store}>
          <AppNavigator />
        </Provider>
      </ApplicationProvider>
    </>
  );
}