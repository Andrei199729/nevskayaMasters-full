import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Colors} from '../../../shared/tokens';
import SplashIcon from '../../../assets/images/icon/iconFunc/SplashIcon';

// Экран загрузки
export default function SplashScreen({navigation}: any) {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Register'); // Переход на главный экран
    }, 3000);
  }, [navigation]);

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
});
