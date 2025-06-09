import {Animated, Pressable, StyleSheet, ViewProps} from 'react-native';
import {Radius, Colors} from '../tokens';
import CreateTask from '../../assets/images/icon/iconFunc/createTask';

interface IButtonAddProduct extends ViewProps {
  onClickAddProduct: () => void;
}

export default function ButtonAddProduct({
  onClickAddProduct,
  ...props
}: IButtonAddProduct) {
  return (
    <Pressable {...props} onPress={onClickAddProduct}>
      <Animated.View style={styles.buttonAdd}>
        <CreateTask />
      </Animated.View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  buttonAdd: {
    borderRadius: Radius.r8,
    maxWidth: 30,
    width: '100%',
    height: 30,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.green,
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: Colors.green,
  },
});
