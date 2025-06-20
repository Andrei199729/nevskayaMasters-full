import {ScrollView, Text, View} from 'react-native';
import {Input} from '../../shared/Input/Input';
import {useContext, useState} from 'react';
import useInput from '../../hooks/useInput';
import SelectCustom from '../../shared/SelectCustom/SelectCustom';
import {arrCountWall} from '../../shared/texts';
import {IDrawing, PathScreen, RootStackParamList} from '../../shared/types';
import ButtonCustom from '../../shared/ButtonCustom/ButtonCustom';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import Draw from '../components/Draw/Draw';
import IndexWallContext from '../../context/IndexWallContext/IndexWallContext';
import api from '../../utils/api';

export default function FormDataAddProductScreen() {
  const navigation =
    useNavigation<
      NavigationProp<RootStackParamList, PathScreen.UnwrappedProduct>
    >();
  const nameRoom = useInput('');
  const [selectedTextDefault, setSelectedTextDefault] = useState({
    defaultCount: 'Выберите количество стен',
  });

  const [isActiveBtn, setIsActiveBtn] = useState<boolean>(true);
  const [countWall, setCountWall] = useState('');
  const [sizeWalls, setSizeWalls] = useState<IDrawing[]>([]);
  const [modalVisibleBacklight, setModalVisibleBacklight] = useState<
    boolean | number | null
  >(false);
  const indexWallContext = useContext(IndexWallContext);
  if (!indexWallContext) {
    return null;
  }
  const {activeWallIndex, setActiveWallIndex} = indexWallContext;

  const onSaveDataWall = () => {
    if (!sizeWalls.length) {
      console.warn('⚠️ Нет данных для сохранения!');
      return;
    }
    api
      .addProduct(nameRoom.value, sizeWalls)
      .then(({nameRoom, dataProduct}) => {
        navigation.navigate('UnwrappedProduct', {
          dataProduct: dataProduct,
          nameRoom: nameRoom,
        });
      })
      .catch(err => console.log(err));
  };

  return (
    <ScrollView horizontal={false} showsHorizontalScrollIndicator={false}>
      <View>
        <Text>Введите название комнаты</Text>
        <Input onChangeText={nameRoom.onChangeText} />
      </View>
      <View>
        <Text>Выберите количество стен</Text>
        <SelectCustom
          isSelect
          options={arrCountWall}
          textDefaultSelect={selectedTextDefault.defaultCount}
          isActiveBtnState={(item: boolean) => setIsActiveBtn(item)}
          onSelectedReset={() => {}}
          countWallText={(item: string) => setCountWall(item)}
        />
        <View>
          <Draw
            setSizeWalls={setSizeWalls}
            sizeWalls={sizeWalls}
            setNumberCurrentWall={setActiveWallIndex}
            numberCurrentWall={activeWallIndex}
            setModalVisibleBacklight={setModalVisibleBacklight}
            modalVisibleBacklight={modalVisibleBacklight}
          />
        </View>
      </View>

      {!isActiveBtn && (
        <ButtonCustom textBtn="Сохранить данные" onPress={onSaveDataWall} />
      )}
      <ButtonCustom textBtn="Сохранить данные" onPress={onSaveDataWall} />
    </ScrollView>
  );
}
