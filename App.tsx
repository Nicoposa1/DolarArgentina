/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { HomeScreen } from './src/screen/HomeScreen';
import { Provider } from 'react-redux';
import { store } from './src/store';

function App(): JSX.Element {
  return (
    // <SafeAreaView>
    <Provider store={store}>
    <GestureHandlerRootView style={{flex: 1}}>
      <HomeScreen />
    </GestureHandlerRootView>
    </Provider>
  );
}

export default App;
