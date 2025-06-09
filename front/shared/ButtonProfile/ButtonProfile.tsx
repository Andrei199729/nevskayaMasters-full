import {
  Text,
  Animated,
  Pressable,
  StyleSheet,
  PressableProps,
} from 'react-native';
import {Colors, Fonts} from '../tokens';

function ButtonProfile({
  textBtn,
  ...props
}: PressableProps & {
  textBtn: string;
}) {
  return (
    <Pressable {...props}>
      <Animated.View>
        <Text style={styles.buttonText}>{textBtn}</Text>
      </Animated.View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  buttonText: {
    color: Colors.white,
    fontFamily: Fonts.regular,
    fontSize: Fonts.f14,
  },
});

export default ButtonProfile;
