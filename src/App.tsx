// SPDX-License-Identifier: BUSL-1.1

import {AnimatedSplash} from '@components/AnimatedSplash';
import {Router} from '@navigation/Router';
import {persistor, store} from '@store/configureStore';
import React from 'react';
import {Platform, StatusBar, StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {enableFreeze} from 'react-native-screens';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

if (Platform.OS === 'android') {
  enableFreeze();
}

export function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <StatusBar translucent backgroundColor="transparent" />
          <GestureHandlerRootView style={styles.container}>
            <Router />
          </GestureHandlerRootView>
        </PersistGate>
        <AnimatedSplash />
      </Provider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
});
