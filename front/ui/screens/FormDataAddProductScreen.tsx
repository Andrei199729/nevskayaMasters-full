import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {Input} from '../../shared/Input/Input';
import {useCallback} from 'react';
import useInput from '../../hooks/useInput';
import {PathScreen, RootStackParamList} from '../../shared/types';
import ButtonCustom from '../../shared/ButtonCustom/ButtonCustom';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import Draw from '../components/Draw/Draw';
import {useDispatch, useSelector} from '../../services/hooks';
import {addRoom} from '../../services/actions/room';

export default function FormDataAddProductScreen() {
  const navigation =
    useNavigation<
      NavigationProp<RootStackParamList, PathScreen.UnwrappedProduct>
    >();
  const dispatch = useDispatch();
  const {sizeWalls} = useSelector(state => state.room);
  const nameRoom = useInput('');

  const onSaveDataWall = useCallback(() => {
    if (!sizeWalls.length) {
      console.warn('⚠️ Нет данных для сохранения!');
      return;
    }
    dispatch(addRoom(nameRoom.value, sizeWalls))
      .then(result => {
        if (!result) return;
        const {dataProduct, nameRoom} = result;
        navigation.navigate('UnwrappedProduct', {
          dataProduct: dataProduct,
          nameRoom: nameRoom,
        });
      })
      .catch(err => console.log(err));
  }, [sizeWalls, dispatch, nameRoom.value, navigation]);

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
      <ScrollView
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        // contentContainerStyle={{paddingBottom: 50}}
        contentContainerStyle={{flexGrow: 1}}>
        <View
          style={{flex: 1, justifyContent: 'space-between', paddingBottom: 16}}>
          <View>
            <Text>Введите название комнаты</Text>
            <Input onChangeText={nameRoom.onChangeText} />
          </View>
          <View>
            {/* <Text>Выберите количество стен</Text>
            <SelectCustom
              isSelect
              options={arrCountWall}
              textDefaultSelect={selectedTextDefault.defaultCount}
              isActiveBtnState={(item: boolean) => setIsActiveBtn(item)}
              onSelectedReset={() => {}}
              countWallText={(item: string) => setCountWall(item)}
            /> */}
            <View>
              <Draw />
            </View>
          </View>

          <ButtonCustom textBtn="Сохранить данные" onPress={onSaveDataWall} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
