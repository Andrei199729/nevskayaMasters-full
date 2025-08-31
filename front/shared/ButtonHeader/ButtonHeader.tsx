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
  const getButtonStyle = (isActive: boolean) => ({
    ...styles.buttonHeader,
    opacity: isActive ? 0.5 : 1,
  });
  return (
    <Pressable style={getButtonStyle(isActive)} onPress={onPressClick}>
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
