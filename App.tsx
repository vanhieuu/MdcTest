import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Provider} from 'react-redux';
import RootNavigation from './src/navigation/root-navigation';
import {store} from './src/store';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <RootNavigation />
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
