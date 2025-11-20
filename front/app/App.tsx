import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Navigate from './Navigate';
import {ButtonProvider} from '../shared/ButtonContext/ButtonContext';
import {Provider} from 'react-redux';
import store from '../services/store';
import {Colors} from '../shared/tokens';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, Layout, Text} from '@ui-kitten/components';
import {default as theme} from '../assets/theme.json';
function App(): React.JSX.Element {
  return (
    <ApplicationProvider {...eva} theme={{...eva.light, ...theme}}>
      <Provider store={store}>
        <SafeAreaView style={styles.container}>
          <ButtonProvider>
            <Navigate />
          </ButtonProvider>
        </SafeAreaView>
      </Provider>
    </ApplicationProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});

export default App;
