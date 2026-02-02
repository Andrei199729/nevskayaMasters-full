import {Dimensions, StyleSheet, View} from 'react-native';
import HeaderScreen from './HeaderScreen';
import MainScreen from './MainScreen';
import {Colors, Gaps, Radius} from '../../shared/tokens';
import Square from '../components/Square/Square';
import ButtonCustom from '../../shared/ButtonCustom/ButtonCustom';

export default function CreateProjectScreen() {
  const array = Array.from({length: 9}).fill(0);
  const {width} = Dimensions.get('window');
  const squareSize = (width - 50) / 3;

  return (
    <HeaderScreen>
      <MainScreen>
        <View style={styles.squares}>
          {array.map((square, index) => {
            return <Square key={index} size={squareSize} />;
          })}
        </View>
        <View style={styles.drawing}></View>
        <ButtonCustom textBtn="Скачать PDF-файл" disabledState={false} />
      </MainScreen>
    </HeaderScreen>
  );
}

const styles = StyleSheet.create({
  drawing: {
    borderRadius: Radius.r8,
    backgroundColor: Colors.black,
    width: 'auto',
    height: 202,
  },
  squares: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: Gaps.g8,
  },
});
