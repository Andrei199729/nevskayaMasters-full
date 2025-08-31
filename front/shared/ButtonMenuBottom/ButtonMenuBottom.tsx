import {Pressable, StyleSheet, Text} from 'react-native';
import {Colors, Fonts, Gaps, Radius} from '../tokens';

export default function ButtonMenuBottom({
  onPressClick,
  isActive,
  icon,
  text,
  btn,
}: {
  onPressClick: () => void;
  isActive: boolean;
  icon: JSX.Element;
  text: string | null;
  btn: string | null;
}) {
  const getButtonStyle = (btn: string | null, isActive: boolean) => [
    styles.buttonHeader,
    {
      opacity: isActive ? 0.5 : 1,
      justifyContent: 'center' as const,
    },
    btn === 'CreateProject' && {
      backgroundColor: Colors.lightGrayThree,
      borderRadius: Radius.rC,
      width: 36,
      height: 36,
    },
  ];

  return (
    <Pressable style={getButtonStyle(btn, isActive)} onPress={onPressClick}>
      {icon}
      {btn !== 'CreateProject' && (
        <Text style={styles.textMenuBottom}>{text}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonHeader: {
    flexDirection: 'column',
    cursor: 'pointer',
    gap: Gaps.g6,
    alignItems: 'center',
  },
  textMenuBottom: {
    fontFamily: Fonts.medium,
    fontSize: Fonts.f9,
    color: Colors.white,
  },
});
