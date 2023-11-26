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

function App(): JSX.Element {
  return (
    // <SafeAreaView>
    <GestureHandlerRootView style={{flex: 1}}>
      <HomeScreen />
    </GestureHandlerRootView>
    // </SafeAreaView>
  );
}

export default App;
