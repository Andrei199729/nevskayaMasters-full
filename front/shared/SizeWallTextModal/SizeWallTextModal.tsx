import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import {Fonts, Colors} from '../tokens';

interface ISizeWallTextModal {
  modalVisible: boolean | number | null;
  wallPosition?: ViewStyle;
  dataText: string | undefined;
}

export default function SizeWallTextModal({
  modalVisible,
  wallPosition,
  dataText,
}: ISizeWallTextModal) {
  return (
    <View style={[styles.sizeWall, wallPosition]}>
      <Text
        style={{
          ...styles.textDimensions,
          fontSize: modalVisible ? Fonts.f24 : Fonts.f12,
        }}>
        {dataText}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  sizeWall: {
    position: 'absolute',
  },
  textDimensions: {
    color: Colors.black,
    fontSize: Fonts.f12,
  },
});
