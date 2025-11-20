import {
  Text,
  Animated,
  Pressable,
  StyleSheet,
  PressableProps,
} from 'react-native';
import {Colors, Fonts, Radius} from '../tokens';
import {StatusButton} from '../types';

function ButtonCustom({
  textBtn,
  disabledState,
  fontsSize,
  bgStyleState,
  statusButton,
  ...props
}: PressableProps & {
  textBtn: string;
  disabledState?: boolean;
  fontsSize?: number;
  bgStyleState?: boolean;
  bgColor?: string;
  statusButton?: StatusButton;
}) {
  const stateBg = (statusButton?: StatusButton) => {
    switch (statusButton) {
      case StatusButton.DisabledButton: {
        return disabledState ? Colors.lightGrayTwo : Colors.goldenYellow;
      }
      case StatusButton.SaveButton: {
        return bgStyleState ? Colors.goldenYellow : Colors.green;
      }
      default: {
        return Colors.goldenYellow;
      }
    }
  };
  return (
    <Pressable {...props} disabled={disabledState}>
      <Animated.View
        style={{
          ...styles.button,
          backgroundColor: stateBg(statusButton),
        }}>
        <Text
          style={{
            ...styles.buttonText,
            color: Colors.black,
            fontSize: fontsSize ?? Fonts.f14,
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
    lineHeight: 21.6,
  },
});

export default ButtonCustom;
