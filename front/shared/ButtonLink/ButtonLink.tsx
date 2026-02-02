import {Text, Pressable, StyleSheet} from 'react-native';
import {Colors, Fonts} from '../tokens';
import {NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../types';

interface ButtonLinkProps {
  navigationPath?: NavigationProp<RootStackParamList>;
  textBtn?: string;
  path?: any;
}

function ButtonLink({navigationPath, textBtn, path}: ButtonLinkProps) {
  const handlePress = () => {
    if (navigationPath && path) {
      navigationPath.navigate(path, {name: textBtn});
    }
  };

  return (
    <Pressable onPress={handlePress} style={styles.button}>
      <Text style={styles.buttonText}>{textBtn}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    maxWidth: '100%',
    width: '100%',
  },
  buttonText: {
    color: Colors.black,
    fontFamily: Fonts.regular,
    fontSize: Fonts.f14,
    textDecorationLine: 'underline',
  },
});

export default ButtonLink;
