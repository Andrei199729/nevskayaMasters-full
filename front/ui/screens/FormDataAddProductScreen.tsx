import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Input} from '../../shared/Input/Input';
import {useCallback} from 'react';
import useInput from '../../hooks/useInput';
import {PathScreen, RootStackParamList, StatusButton} from '../../shared/types';
import ButtonCustom from '../../shared/ButtonCustom/ButtonCustom';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import Draw from '../components/Draw/Draw';
import {useDispatch, useSelector} from '../../services/hooks';
// import {addRoom} from '../../services/actions/room';
import {Colors, Fonts} from '../../shared/tokens';
import {addRoom} from '../../services/actions/room';

export default function FormDataAddProductScreen() {
  const navigation =
    useNavigation<
      NavigationProp<RootStackParamList, PathScreen.UnwrappedProduct>
    >();
  const dispatch = useDispatch();
  const {sizeWalls, wallsData, countWallDraw} = useSelector(
    state => state.room,
  );
  const {currentIdApplication} = useSelector(state => state.apartment);
  const nameRoom = useInput('');

  const onSaveDataWall = useCallback(() => {
    if (!sizeWalls.length) {
      console.warn('⚠️ Нет данных для сохранения!');
      return;
    }

    dispatch(addRoom(nameRoom.value, sizeWalls, currentIdApplication))
      .then(result => {
        if (!result) return;
        const {dataProduct, name} = result;
        navigation.navigate('UnwrappedProduct', {
          dataProduct: dataProduct,
          nameRoom: name,
        });
      })
      .catch(err => console.log(err));
  }, [sizeWalls, dispatch, nameRoom.value, currentIdApplication, navigation]);
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
      <ScrollView
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <View style={styles.blockNameRoom}>
          <View style={styles.blockInput}>
            <Text style={styles.textName}>Введите название комнаты</Text>
            <Input onChangeText={nameRoom.onChangeText} />
          </View>
          <Draw />
          <ButtonCustom
            textBtn="Сохранить данные"
            onPress={onSaveDataWall}
            disabledState={
              wallsData.length !== countWallDraw || !nameRoom.value
            }
            statusButton={StatusButton.DisabledButton}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  blockNameRoom: {
    flex: 1,

    paddingHorizontal: 16,
    paddingBottom: 50,
  },
  blockInput: {
    gap: 10,
  },
  textName: {
    color: Colors.black,
    fontSize: Fonts.f24,
  },
});
