import React, {useEffect} from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {Colors} from '../../../shared/tokens';
import SplashIcon from '../../../assets/images/icon/iconFunc/SplashIcon';

const Stack = createStackNavigator();

// Экран загрузки
export default function SplashScreen({navigation}: any) {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Register'); // Переход на главный экран
    }, 3000);
  }, []);

  return (
    <View style={styles.splashContainer}>
      {/* <Image source={require('./assets/logo.png')} style={styles.logo} /> */}
      <SplashIcon />
    </View>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.splashScreenColor,
  },
  text: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
