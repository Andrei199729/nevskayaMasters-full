import {StyleSheet, Text, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Fonts} from '../../../shared/tokens';

interface IPositionTextModal {
  textElement: string;
  namePosition: string;
  numberPosition: number;
}
export default function PositionTextModal({
  textElement,
  namePosition,
  numberPosition,
}: IPositionTextModal) {
  return (
    <>
      {textElement !== '' && (
        <View style={styles.blockText}>
          <Text style={styles.text}>
            {numberPosition}. {namePosition}
          </Text>
          <Text style={styles.text}>{textElement}</Text>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  blockText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: Fonts.f18,
    color: Colors.black,
  },
});
