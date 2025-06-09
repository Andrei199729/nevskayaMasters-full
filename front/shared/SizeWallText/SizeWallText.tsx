import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import {Fonts, Colors} from '../tokens';

interface ISizeWallText {
  wallPosition?: ViewStyle;
  dataText: string | undefined;
}

export default function SizeWallText({dataText, wallPosition}: ISizeWallText) {
  return (
    <View style={[styles.sizeWall, wallPosition]}>
      <Text style={styles.textDimensions}>{dataText}</Text>
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
