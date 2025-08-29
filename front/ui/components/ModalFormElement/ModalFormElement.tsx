import {Modal, View, Text, StyleSheet} from 'react-native';
import {useCallback, useEffect} from 'react';
import {IElementData, Mode} from '../../../shared/types';
import {Colors} from '../../../shared/tokens';
import {Input} from '../../../shared/Input/Input';
import ButtonCustom from '../../../shared/ButtonCustom/ButtonCustom';
import useInput from '../../../hooks/useInput';
import {useDispatch, useSelector} from '../../../services/hooks';
import {
  setElementModalVisible,
  setElementsWallModalVisible,
  setIsVisibleEditModal,
} from '../../../services/actions/modalOpen';
import {
  addElementRoom,
  setActiveElementId,
  setElementsData,
  setUpdateElementsData,
  setUpdateSizeWalls,
} from '../../../services/actions/room';
import {isValidArray} from '../../../utils/validators';

interface IModalFormElement {
  nameElementWall: string;
  numberWall: number;
  dataEditElement?: IElementData;
  wallIndex: number;
  clickButtonEdit?: any;
  mode: 'view' | 'edit';
}

export default function ModalFormElement({
  numberWall,
  nameElementWall,
  dataEditElement,
  wallIndex,
  clickButtonEdit,
  mode,
  ...props
}: IModalFormElement) {
  const dispatch = useDispatch();
  const {isVisibleEditModal, elementModal} = useSelector(
    state => state.modalOpen,
  );

  const {
    numberCurrentWall,
    dataObj,
    currentRoomId,
    sizeWalls,
    roomData,
    activeElementId,
  } = useSelector(state => state.room);

  const locationElementTop = useInput(
    dataEditElement?.locationElementTop || '',
  );
  const locationElementRight = useInput(
    dataEditElement?.locationElementRight || '',
  );
  const locationElementLeft = useInput(
    dataEditElement?.locationElementLeft || '',
  );
  const locationElementBottom = useInput(
    dataEditElement?.locationElementBottom || '',
  );
  const widthTop = useInput(dataEditElement?.widthTop || '');
  const widthBottom = useInput(dataEditElement?.widthBottom || '');
  const heightLeft = useInput(dataEditElement?.heightLeft || '');
  const heightRight = useInput(dataEditElement?.heightRight || '');
  const radiusElement = useInput(dataEditElement?.radiusElement || '');
  const roomIndex = roomData.findIndex(
    (room: {id: any}, index: number) => index === currentRoomId,
  );
  const idElement = (numberCurrentWall + 33) * 1000 + Date.now() * 33;

  const onSaveEditedElement = (
    updatedData: IElementData,
    numberEl: number | null,
  ) => {
    dispatch(
      setUpdateElementsData(
        numberCurrentWall,
        numberEl,
        updatedData,
        dataObj,
        currentRoomId,
      ),
    ); // Обновляем состояние
    dispatch(
      setIsVisibleEditModal({
        isVisible: false,
        wallNumber: null,
        wallNumberElement: null,
      }),
    ); // Закрываем модальное окно редактирования
    // setClickButtonEdit(false);
  };

  const onSaveElement = (data: IElementData, wallId: number) => {
    dispatch(setElementsData(data, dataObj, wallId, currentRoomId));
    if (!isValidArray(sizeWalls, 'sizeWalls')) return sizeWalls;
    //  Создаем глубокую копию массива стен
    dispatch(
      setUpdateSizeWalls(data, dataObj, numberCurrentWall, wallId, roomIndex),
    );
  };

  const onSaveDataElement = () => {
    const numericNumberWall = typeof numberWall === 'number' ? numberWall : 0;
    const numberElement = numericNumberWall - 1;
    const updatedDataObjectSizeElement = {
      nameElementWall,
      locationElementTop: locationElementTop.value,
      locationElementRight: locationElementRight.value,
      locationElementLeft: locationElementLeft.value,
      locationElementBottom: locationElementBottom.value,
      widthTop: widthTop.value,
      widthBottom: widthBottom.value,
      heightLeft: heightLeft.value,
      heightRight: heightRight.value,
      radiusElement: radiusElement.value,
    };

    if (dataEditElement) {
      // редактирование существующего элемента
      onSaveEditedElement(updatedDataObjectSizeElement, activeElementId);
    } else {
      //  добавление нового элемента
      switch (mode) {
        case Mode.View: {
          dispatch(
            addElementRoom(
              currentRoomId,
              numberCurrentWall,
              updatedDataObjectSizeElement,
              dataObj,
              idElement,
            ),
          );
          dispatch(setActiveElementId(idElement));
          break;
        }
        case Mode.Edit: {
          onSaveElement(updatedDataObjectSizeElement, numberElement);
          break;
        }
        default:
          break;
      }
      console.log(updatedDataObjectSizeElement, 'updatedDataObjectSizeElement');
    }
    dispatch(
      setElementsWallModalVisible({
        isVisible: false,
        wallNumber: null,
      }),
    );

    dispatch(
      setElementModalVisible({
        isVisible: false,
        wallNumber: null,
        wallNumberElement: null,
      }),
    );
  };

  const stateFormElemnt = clickButtonEdit
    ? isVisibleEditModal.isVisible
    : elementModal.isVisible;

  useEffect(() => {
    if (dataEditElement) {
      locationElementTop.onChangeText(dataEditElement.locationElementTop || '');
      locationElementBottom.onChangeText(
        dataEditElement.locationElementBottom || '',
      );
      locationElementLeft.onChangeText(
        dataEditElement.locationElementLeft || '',
      );
      locationElementRight.onChangeText(
        dataEditElement.locationElementRight || '',
      );
      widthTop.onChangeText(dataEditElement.widthTop || '');
      widthBottom.onChangeText(dataEditElement.widthBottom || '');
      heightLeft.onChangeText(dataEditElement.heightLeft || '');
      heightRight.onChangeText(dataEditElement.heightRight || '');
      radiusElement.onChangeText(dataEditElement.radiusElement || '');
    }
  }, [dataEditElement]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={stateFormElemnt}
      onRequestClose={() =>
        dispatch(
          setElementModalVisible({
            isVisible: false,
            wallNumber: null,
            wallNumberElement: null,
          }),
        )
      }>
      <View
        style={{
          backgroundColor: Colors.white,
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: Colors.black,
        }}>
        <Text>
          {numberWall} {nameElementWall}
        </Text>
        <View>
          <Text>1 расположение сверху</Text>
          <Input
            value={locationElementTop.value}
            onChangeText={locationElementTop.onChangeText}
            inputModeText={'numeric'}
          />
        </View>
        <View>
          <Text>2 расположение справа</Text>
          <Input
            value={locationElementRight.value}
            onChangeText={locationElementRight.onChangeText}
            inputModeText={'numeric'}
          />
        </View>
        <View>
          <Text>3 расположение снизу</Text>
          <Input
            value={locationElementBottom.value}
            onChangeText={locationElementBottom.onChangeText}
            inputModeText={'numeric'}
          />
        </View>
        <View>
          <Text>4 расположение слева</Text>
          <Input
            value={locationElementLeft.value}
            onChangeText={locationElementLeft.onChangeText}
            inputModeText={'numeric'}
          />
        </View>
        <View>
          <Text>5 размер элемента сверху</Text>
          <Input
            value={widthTop.value}
            onChangeText={widthTop.onChangeText}
            inputModeText={'numeric'}
          />
        </View>
        <View>
          <Text>6 размер элемента справа</Text>
          <Input
            value={heightRight.value}
            onChangeText={heightRight.onChangeText}
            inputModeText={'numeric'}
          />
        </View>
        <View>
          <Text>7 размер элемента снизу</Text>
          <Input
            value={widthBottom.value}
            onChangeText={widthBottom.onChangeText}
            inputModeText={'numeric'}
          />
        </View>
        <View>
          <Text>8 размер элемента слева</Text>
          <Input
            value={heightLeft.value}
            onChangeText={heightLeft.onChangeText}
            inputModeText={'numeric'}
          />
        </View>
        <View>
          <Text>9 радиус элемента</Text>
          <Input
            value={radiusElement.value}
            onChangeText={radiusElement.onChangeText}
            inputModeText={'numeric'}
          />
        </View>
        <ButtonCustom textBtn="Сохранить данные" onPress={onSaveDataElement} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({});
