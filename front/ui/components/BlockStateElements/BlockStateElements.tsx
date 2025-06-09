import {Pressable, View, Text, StyleSheet} from 'react-native';
import {StateElement, TStateElement} from '../../../shared/types';
import {Colors} from '../../../shared/tokens';
interface IBlockStateElements {
  nameElement: string;
  stateElement: TStateElement | string;
  position: number;
  onPressVisible: () => void;
}
export default function BlockStateElements({
  nameElement,
  stateElement,
  position,
  onPressVisible,
  ...props
}: IBlockStateElements) {
  return (
    <Pressable onPress={onPressVisible}>
      <View style={{flexDirection: 'row', gap: 10}}>
        <Text>
          {position + 1} {nameElement}
        </Text>
        {stateElement === StateElement.Ventilation && (
          <View style={styles.elementVentilation}></View>
        )}
        {stateElement === StateElement.Door && (
          <View style={styles.elementDoor}></View>
        )}
        {stateElement === StateElement.Window && (
          <View
            style={{
              ...styles.elementWindow,
              backgroundColor: Colors.green,
            }}></View>
        )}
        {stateElement === StateElement.Socket && (
          <View
            style={{
              ...styles.elementWindow,
              backgroundColor: Colors.red,
            }}></View>
        )}
        {stateElement === StateElement.Battery && (
          <View
            style={{
              ...styles.elementWindow,
              backgroundColor: Colors.lightGray,
            }}></View>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  elementVentilation: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: Colors.black,
    borderStyle: 'solid',
    borderRadius: 1000,
    backgroundColor: Colors.menuBottom,
  },

  elementDoor: {
    width: 30,
    height: 40,
    borderWidth: 1,
    borderColor: Colors.black,
    borderStyle: 'solid',
    backgroundColor: Colors.white,
  },

  elementWindow: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: Colors.black,
    borderStyle: 'solid',
  },
});
