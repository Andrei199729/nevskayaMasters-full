import {Modal, View, Text, StyleSheet} from 'react-native';
import {IElementWallRoom, IProductRoom, Mode} from '../../../shared/types';
import {Colors, Fonts} from '../../../shared/tokens';
import {useCallback, useMemo, useState} from 'react';
import ModalFormElement from '../ModalFormElement/ModalFormElement';
import ButtonCustom from '../../../shared/ButtonCustom/ButtonCustom';
import {useDispatch, useSelector} from '../../../services/hooks';
import {
  deleteElement,
  setVisibleElements,
} from '../../../services/actions/room';
import {isValidArray} from '../../../utils/validators';
import {setIsVisibleEditModal} from '../../../services/actions/modalOpen';

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
  ...props
}: IModalSizesElement) {
  const dispatch = useDispatch();
  const {
    sizeWalls,
    numberCurrentWall,
    visibleElements,
    roomData,
    currentRoomId,
    activeElementId,
  } = useSelector(state => state.room);
  const [clickButtonEdit, setClickButtonEdit] = useState(false);

  const onClickModalClose = useCallback(() => {
    dispatch(setVisibleElements({index: position, isVisible: false}));
  }, [dispatch, position]);

  const room = useMemo(() => {
    return roomData.find((r: IProductRoom) => r._id === currentRoomId);
  }, [roomData, currentRoomId]);

  const wall = useMemo(() => {
    return room?.dataProduct[0]?.drawingData?.walls?.[numberCurrentWall];
  }, [room, numberCurrentWall]);

  const elementData = useMemo(() => {
    return wall?.size?.arrElements?.elements?.[position]?.data;
  }, [wall, position]);

  const onClickEdit = useCallback(() => {
    if (!element.data) return;
    // Здесь вам нужно найти элемент в массиве element, соответствующий текущей позиции

    if (elementData) {
      setClickButtonEdit(true);
      dispatch(
        setIsVisibleEditModal({
          isVisible: true,
          wallNumber: wallIndex,
          wallNumberElement: activeElementId,
        }),
      );
    }
  }, [
    element,
    setClickButtonEdit,
    dispatch,
    wallIndex,
    activeElementId,
    elementData,
  ]);

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
        dataEditElement={elementData}
        clickButtonEdit={clickButtonEdit}
        mode={mode}
      />
      <View style={styles.modalView}>
        <Text style={styles.textName}>
          {position + 1}. {nameElement}
        </Text>
        <View style={styles.blockData}>
          {elementData?.locationElementTop !== '' && (
            <View style={styles.blockText}>
              <Text style={styles.text}>1. Расположение сверху</Text>
              <Text style={styles.text}>{elementData?.locationElementTop}</Text>
            </View>
          )}
          {elementData?.locationElementBottom !== '' && (
            <View style={styles.blockText}>
              <Text style={styles.text}>2. Расположение снизу</Text>
              <Text style={styles.text}>
                {elementData?.locationElementBottom}
              </Text>
            </View>
          )}
          {elementData?.locationElementRight !== '' && (
            <View style={styles.blockText}>
              <Text style={styles.text}>3. Расположение справа</Text>
              <Text style={styles.text}>
                {elementData?.locationElementRight}
              </Text>
            </View>
          )}
          {elementData?.locationElementLeft !== '' && (
            <View style={styles.blockText}>
              <Text style={styles.text}>4. Расположение слева</Text>
              <Text style={styles.text}>
                {elementData?.locationElementLeft}
              </Text>
            </View>
          )}
          {elementData?.widthTop !== '' && (
            <View style={styles.blockText}>
              <Text style={styles.text}>5. Размер стены сверху</Text>
              <Text style={styles.text}>{elementData?.widthTop}</Text>
            </View>
          )}
          {elementData?.widthBottom !== '' && (
            <View style={styles.blockText}>
              <Text style={styles.text}>6. Размер стены снизу</Text>
              <Text style={styles.text}>{elementData?.widthBottom}</Text>
            </View>
          )}
          {elementData?.heightRight !== '' && (
            <View style={styles.blockText}>
              <Text style={styles.text}>7. Размер стены справа</Text>
              <Text style={styles.text}>{elementData?.heightRight}</Text>
            </View>
          )}
          {elementData?.heightLeft !== '' && (
            <View style={styles.blockText}>
              <Text style={styles.text}>8. Размер стены слева</Text>
              <Text style={styles.text}>{elementData?.heightLeft}</Text>
            </View>
          )}
          {elementData?.radiusElement !== '' && (
            <View style={styles.blockText}>
              <Text style={styles.text}>9. Радиус стены</Text>
              <Text style={styles.text}>{elementData?.radiusElement}</Text>
            </View>
          )}
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

  blockText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: Fonts.f18,
    color: Colors.black,
  },
  blockBtns: {
    marginTop: 20,
    gap: 10,
  },
});
