import {
  Text,
  Animated,
  Pressable,
  StyleSheet,
  PressableProps,
} from 'react-native';
import {Colors, Fonts, Radius} from '../tokens';

function ButtonClear({
  textBtn,
  disabledState,
  ...props
}: PressableProps & {
  textBtn: string;
  disabledState: boolean;
}) {
  return (
    <Pressable {...props}>
      <Animated.View
        style={{...styles.buttonClear, opacity: disabledState ? 0.2 : 1}}>
        <Text style={styles.buttonText}>{textBtn}</Text>
      </Animated.View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  buttonClear: {
    borderRadius: Radius.r8,
    maxWidth: '100%',
    width: '100%',
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.black,
    borderStyle: 'solid',
    borderWidth: 1,
  },
  buttonText: {
    color: Colors.black,
    fontFamily: Fonts.medium,
    fontSize: Fonts.f14,
    lineHeight: 21.6,
  },
});

export default ButtonClear;
