import {Modal, View, Text, StyleSheet} from 'react-native';
import {IElementWallRoom, Mode} from '../../../shared/types';
import {Colors, Fonts} from '../../../shared/tokens';
import {useCallback, useState} from 'react';
import ModalFormElement from '../ModalFormElement/ModalFormElement';
import ButtonCustom from '../../../shared/ButtonCustom/ButtonCustom';
import {useDispatch, useSelector} from '../../../services/hooks';
import {
  deleteElement,
  setVisibleElements,
} from '../../../services/actions/room';
import {isValidArray} from '../../../utils/validators';
import {setIsVisibleEditModal} from '../../../services/actions/modalOpen';
import PositionTextModal from '../PositionTextModal/PositionTextModal';

interface IModalSizesElement {
  nameElement: string;
  position: number;
  element: IElementWallRoom;
  wallIndex: number;
  mode: Mode;
}

export default function ModalSizesElement({
  nameElement,
  position,
  element,
  wallIndex,
  mode,
}: IModalSizesElement) {
  const dispatch = useDispatch();
  const {
    sizeWalls,
    numberCurrentWall,
    visibleElements,
    currentRoomId,
    activeElementId,
  } = useSelector(state => state.room);
  const [clickButtonEdit, setClickButtonEdit] = useState(false);

  const onClickModalClose = useCallback(() => {
    dispatch(setVisibleElements({index: position, isVisible: false}));
  }, [dispatch, position]);

  const onClickEdit = useCallback(() => {
    if (!element.data) return;
    // Здесь вам нужно найти элемент в массиве element, соответствующий текущей позиции

    if (element.data) {
      setClickButtonEdit(true);
      dispatch(
        setIsVisibleEditModal({
          isVisible: true,
          wallNumber: wallIndex,
          wallNumberElement: activeElementId,
        }),
      );
    }
  }, [element, setClickButtonEdit, dispatch, wallIndex, activeElementId]);

  const onDeleteElement = useCallback(
    (
      currentRoomId: string | null,
      wallId: number,
      elementId: number | null,
      positionEl: number,
    ) => {
      if (!isValidArray(sizeWalls, 'sizeWalls')) return sizeWalls;
      dispatch(deleteElement(currentRoomId, wallId, elementId, positionEl));
      dispatch(setVisibleElements({index: positionEl, isVisible: false}));
    },
    [dispatch, sizeWalls],
  );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={!!visibleElements[position]}
      onRequestClose={onClickModalClose}>
      <ModalFormElement
        numberWall={position + 1}
        nameElementWall={nameElement}
        dataEditElement={element.data}
        clickButtonEdit={clickButtonEdit}
        mode={mode}
      />
      <View style={styles.modalView}>
        <Text style={styles.textName}>
          {position + 1}. {nameElement}
        </Text>
        <View style={styles.blockData}>
          <PositionTextModal
            textElement={element?.data.locationElementTop}
            namePosition="Расположение сверху"
            numberPosition={1}
          />
          <PositionTextModal
            textElement={element?.data.locationElementBottom}
            namePosition="Расположение снизу"
            numberPosition={2}
          />
          <PositionTextModal
            textElement={element?.data.locationElementRight}
            namePosition="Расположение справа"
            numberPosition={3}
          />
          <PositionTextModal
            textElement={element?.data.locationElementLeft}
            namePosition="Расположение слева"
            numberPosition={4}
          />
          <PositionTextModal
            textElement={element?.data.widthTop}
            namePosition="Размер стены сверху"
            numberPosition={5}
          />
          <PositionTextModal
            textElement={element?.data.widthBottom}
            namePosition="Размер стены снизу"
            numberPosition={6}
          />
          <PositionTextModal
            textElement={element?.data.heightRight}
            namePosition="Размер стены справа"
            numberPosition={7}
          />
          <PositionTextModal
            textElement={element?.data.heightLeft}
            namePosition="Размер стены слева"
            numberPosition={8}
          />
          <PositionTextModal
            textElement={element?.data.radiusElement}
            namePosition="Радиус стены"
            numberPosition={9}
          />
        </View>
        <View style={styles.blockBtns}>
          <ButtonCustom textBtn="Редактировать" onPress={onClickEdit} />
          <ButtonCustom
            textBtn="Удалить"
            onPress={() =>
              onDeleteElement(
                currentRoomId,
                numberCurrentWall,
                activeElementId,
                position,
              )
            }
          />
          <ButtonCustom textBtn="Закрыть" onPress={onClickModalClose} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  // centeredView: {
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   position: 'relative',
  //   zIndex: 1,
  modalView: {
    width: 320,
    position: 'absolute',
    top: 23,
    left: -20,
    borderRadius: 20,
    margin: 30,
    backgroundColor: Colors.white,
    padding: 20,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    elevation: 20,
  },
  textName: {
    fontSize: Fonts.f24,
    fontWeight: '700',
    color: Colors.black,
    marginBottom: 20,
  },
  blockData: {
    gap: 10,
  },
  blockBtns: {
    marginTop: 20,
    gap: 10,
  },
});
