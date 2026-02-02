import {Modal, View, Text, StyleSheet} from 'react-native';
import {useCallback, useEffect} from 'react';
import {
  IElementData,
  IProductRoom,
  Mode,
  StatusButton,
} from '../../../shared/types';
import {Colors, Fonts} from '../../../shared/tokens';
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
import ButtonClose from '../../../shared/ButtonClose/ButtonClose';
import {getModalWidthFormElements} from '../../../features/features';
import BlockInputFormElement from '../BlockInputFormElement/BlockInputFormElement';

interface IModalFormElement {
  nameElementWall: string;
  numberWall: number;
  dataEditElement?: IElementData;
  clickButtonEdit?: boolean;
  mode: Mode;
}

export default function ModalFormElement({
  numberWall,
  nameElementWall,
  dataEditElement,
  clickButtonEdit,
  mode,
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
    (room: IProductRoom) => room._id === currentRoomId,
  );

  const idElement = (numberCurrentWall + 33) * 1000 + Date.now() * 33;

  const onSaveEditedElement = useCallback(
    (updatedData: IElementData, numberEl: number | null) => {
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
    },
    [numberCurrentWall, dataObj, currentRoomId, dispatch],
  );

  const onSaveElement = useCallback(
    (data: IElementData, wallId: number) => {
      dispatch(setElementsData(data, dataObj, wallId, currentRoomId));
      if (!isValidArray(sizeWalls, 'sizeWalls')) return sizeWalls;
      //  Создаем глубокую копию массива стен
      dispatch(
        setUpdateSizeWalls(data, dataObj, numberCurrentWall, wallId, roomIndex),
      );
    },
    [dataObj, currentRoomId, sizeWalls, numberCurrentWall, roomIndex, dispatch],
  );

  const onSaveDataElement = useCallback(() => {
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
  }, [
    numberWall,
    nameElementWall,
    locationElementTop.value,
    locationElementRight.value,
    locationElementLeft.value,
    locationElementBottom.value,
    widthTop.value,
    widthBottom.value,
    heightLeft.value,
    heightRight.value,
    radiusElement.value,
    dataEditElement,
    dispatch,
    onSaveEditedElement,
    activeElementId,
    mode,
    currentRoomId,
    numberCurrentWall,
    dataObj,
    idElement,
    onSaveElement,
  ]);

  const stateFormElemnt = clickButtonEdit
    ? isVisibleEditModal.isVisible
    : elementModal.isVisible;

  const handleClose = useCallback(() => {
    if (clickButtonEdit) {
      // закрыть модалку РЕДАКТИРОВАНИЯ
      dispatch(
        setIsVisibleEditModal({
          isVisible: false,
          wallNumber: null,
          wallNumberElement: null,
        }),
      );
    } else {
      // закрыть модалку ДОБАВЛЕНИЯ
      dispatch(
        setElementModalVisible({
          isVisible: false,
          wallNumber: null,
          wallNumberElement: null,
        }),
      );
    }
  }, [dispatch, clickButtonEdit]);

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
  }, [
    dataEditElement,
    heightLeft,
    heightRight,
    locationElementBottom,
    locationElementLeft,
    locationElementRight,
    locationElementTop,
    radiusElement,
    widthBottom,
    widthTop,
  ]);

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
      <View style={styles.containerPopupFormElement}>
        <ButtonClose
          handleClose={handleClose}
          styleClose={styles.btnClosePopup}
        />
        <Text style={styles.textNameElement}>
          {numberWall}. {nameElementWall}
        </Text>
        <View style={styles.blockForm}>
          <BlockInputFormElement
            namePosition="Расположение сверху"
            numberPosition={1}
            value={locationElementTop.value}
            onChangeText={locationElementTop.onChangeText}
          />
          <BlockInputFormElement
            namePosition="Расположение справа"
            numberPosition={2}
            value={locationElementRight.value}
            onChangeText={locationElementRight.onChangeText}
          />
          <BlockInputFormElement
            namePosition="Расположение снизу"
            numberPosition={3}
            value={locationElementBottom.value}
            onChangeText={locationElementBottom.onChangeText}
          />
          <BlockInputFormElement
            namePosition="Расположение слева"
            numberPosition={4}
            value={locationElementLeft.value}
            onChangeText={locationElementLeft.onChangeText}
          />
          <BlockInputFormElement
            namePosition="Размер элемента сверху"
            numberPosition={5}
            value={widthTop.value}
            onChangeText={widthTop.onChangeText}
          />
          <BlockInputFormElement
            namePosition="Размер элемента справа"
            numberPosition={6}
            value={heightRight.value}
            onChangeText={heightRight.onChangeText}
          />
          <BlockInputFormElement
            namePosition="Размер элемента снизу"
            numberPosition={7}
            value={widthBottom.value}
            onChangeText={widthBottom.onChangeText}
          />
          <BlockInputFormElement
            namePosition="Размер элемента слева"
            numberPosition={8}
            value={heightLeft.value}
            onChangeText={heightLeft.onChangeText}
          />
          <BlockInputFormElement
            namePosition="Радиус элемента"
            numberPosition={9}
            value={radiusElement.value}
            onChangeText={radiusElement.onChangeText}
          />
        </View>
        <ButtonCustom
          textBtn="Сохранить данные"
          onPress={onSaveDataElement}
          disabledState={
            !locationElementTop.value ||
            !locationElementBottom.value ||
            !locationElementLeft.value ||
            !locationElementRight.value
          }
          statusButton={StatusButton.DisabledButton}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  containerPopupFormElement: {
    width: getModalWidthFormElements(),
    padding: 15,
    backgroundColor: Colors.white,
    borderStyle: 'solid',
    borderColor: Colors.black,
    borderRadius: 20,
    margin: 'auto',

    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    elevation: 20,
  },

  textNameElement: {
    fontSize: Fonts.f24,
    color: Colors.black,
    fontWeight: '700',
  },
  blockForm: {
    marginTop: 10,
    marginBottom: 20,
    gap: 10,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnClosePopup: {
    top: 10,
    right: 10,
    zIndex: 2,
  },
});
