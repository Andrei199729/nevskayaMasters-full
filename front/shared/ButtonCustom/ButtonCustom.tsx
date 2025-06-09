import {
  Text,
  Animated,
  Pressable,
  StyleSheet,
  PressableProps,
} from 'react-native';
import {Colors, Fonts, Radius} from '../tokens';

function ButtonCustom({
  textBtn,
  disabledState,
  ...props
}: PressableProps & {
  textBtn: string;
  disabledState?: boolean;
}) {
  return (
    <Pressable {...props}>
      <Animated.View
        style={{
          ...styles.button,
          backgroundColor: disabledState
            ? Colors.lightGrayTwo
            : Colors.goldenYellow,
        }}>
        <Text
          style={{
            ...styles.buttonText,
            color: Colors.black,
          }}>
          {textBtn}
        </Text>
      </Animated.View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  button: {
    borderRadius: Radius.r8,
    maxWidth: '100%',
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.lightGrayTwo,
  },
  buttonText: {
    color: Colors.black,
    fontFamily: Fonts.medium,
    fontSize: Fonts.f14,
    lineHeight: 21.6,
  },
});

export default ButtonCustom;
