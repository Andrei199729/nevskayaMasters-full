import {Text, Pressable, StyleSheet} from 'react-native';
import {Colors, Fonts} from '../tokens';

function ButtonLink({
  navigationPath,
  textBtn,
  path,
}: {
  navigationPath?: any;
  textBtn?: string;
  path?: string;
}) {
  const handlePress = () => {
    if (navigationPath && path) {
      navigationPath.navigate(path, {name: textBtn});
    }
  };
  console.log(JSON.stringify(navigationPath, null, 2), 'navigationPath');

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
