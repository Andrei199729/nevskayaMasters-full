import {Pressable, StyleSheet} from 'react-native';

export default function ButtonHeader({
  onPressClick,
  isActive,
  icon,
}: {
  onPressClick: () => void;
  isActive: boolean;
  icon: JSX.Element;
}) {
  return (
    <Pressable
      style={{...styles.buttonHeader, opacity: isActive ? 0.5 : 1}}
      onPress={onPressClick}>
      {icon}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonHeader: {
    padding: 9,
    cursor: 'pointer',
  },
});
