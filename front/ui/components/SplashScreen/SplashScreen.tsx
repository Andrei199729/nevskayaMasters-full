import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Colors} from '../../../shared/tokens';
import SplashIcon from '../../../assets/images/icon/iconFunc/SplashIcon';
import {RootStackParamList} from '../../../shared/types';
import {StackScreenProps} from '@react-navigation/stack';

type Props = StackScreenProps<RootStackParamList, 'Splash'>;
// Экран загрузки
export default function SplashScreen({navigation}: Props) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Register');
    }, 3000);

    return () => clearTimeout(timer);
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
