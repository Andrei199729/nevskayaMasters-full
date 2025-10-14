import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Navigate from './Navigate';
import {ButtonProvider} from '../shared/ButtonContext/ButtonContext';
import {Provider} from 'react-redux';
import store from '../services/store';
import {Colors} from '../shared/tokens';
function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <ButtonProvider>
          <Navigate />
        </ButtonProvider>
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});

export default App;
