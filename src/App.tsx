// SPDX-License-Identifier: BUSL-1.1

import {Router} from '@navigation/Router';
import {store} from '@store/configureStore';
import React from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';

export function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <StatusBar translucent backgroundColor="transparent" />
        <GestureHandlerRootView style={styles.container}>
          <Router />
        </GestureHandlerRootView>
      </Provider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
});
