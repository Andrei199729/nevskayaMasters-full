import {StyleSheet, Text, View} from 'react-native';
import {Input} from '../../../shared/Input/Input';
import {Colors, Fonts} from '../../../shared/tokens';

interface IBlockInputFormElement {
  namePosition: string;
  numberPosition: number;
  value: string;
  onChangeText: (text: string) => void;
}
export default function BlockInputFormElement({
  namePosition,
  numberPosition,
  value,
  onChangeText,
}: IBlockInputFormElement) {
  return (
    <View style={styles.blockInput}>
      <Text style={styles.textFormElement}>
        {numberPosition}. {namePosition}
      </Text>
      <Input
        value={value}
        onChangeText={onChangeText}
        inputModeText={'numeric'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textFormElement: {
    marginBottom: 5,
    fontSize: Fonts.f16,
    color: Colors.black,
  },
  blockInput: {
    width: '48%',
  },
});
