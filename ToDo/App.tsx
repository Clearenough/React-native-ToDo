import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import Header from './src/components/Header';
import Tasks from './src/components/Tasks';
import {store} from './src/store/store';
import 'react-native-gesture-handler';

function App(): JSX.Element {
  return (
    <GestureHandlerRootView style={styles.container}>
      <Provider store={store}>
        <SafeAreaView style={styles.container}>
          <Header />
          <Tasks />
        </SafeAreaView>
      </Provider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
