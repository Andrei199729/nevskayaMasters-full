import {Pressable, StyleProp, StyleSheet, ViewStyle} from 'react-native';
import Close from '../../assets/images/icon/iconFunc/CloseIcon';

interface ButtonCloseProps {
  handleClose: () => void; // функция закрытия
  styleClose: StyleProp<ViewStyle>;
}

function ButtonClose({handleClose, styleClose}: ButtonCloseProps) {
  return (
    <Pressable style={[styles.btnClosePopup, styleClose]} onPress={handleClose}>
      <Close size={17} />
    </Pressable>
  );
}
const styles = StyleSheet.create({
  btnClosePopup: {
    padding: 10,
    position: 'absolute',
  },
});

export default ButtonClose;
