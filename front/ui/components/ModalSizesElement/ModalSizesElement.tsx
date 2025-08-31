import {Modal, View, Text, StyleSheet} from 'react-native';
import {IElementWallRoom, IProductRoom, Mode} from '../../../shared/types';
import {Colors} from '../../../shared/tokens';
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
      <View style={{position: 'absolute', top: -50, left: 100}}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View>
              <Text>
                {position + 1} {nameElement}
              </Text>
              {elementData?.locationElementTop !== '' && (
                <View>
                  <Text> 1 расположение сверху</Text>
                  <Text>{elementData?.locationElementTop}</Text>
                </View>
              )}
              {elementData?.locationElementBottom !== '' && (
                <View>
                  <Text> 2 расположение снизу</Text>
                  <Text>{elementData?.locationElementBottom}</Text>
                </View>
              )}
              {elementData?.locationElementRight !== '' && (
                <View>
                  <Text> 3 расположение справа</Text>
                  <Text>{elementData?.locationElementRight}</Text>
                </View>
              )}
              {elementData?.locationElementLeft !== '' && (
                <View>
                  <Text> 4 расположение слева</Text>
                  <Text>{elementData?.locationElementLeft}</Text>
                </View>
              )}
              {elementData?.widthTop !== '' && (
                <View>
                  <Text> 5 размер стены сверху</Text>
                  <Text>{elementData?.widthTop}</Text>
                </View>
              )}
              {elementData?.widthBottom !== '' && (
                <View>
                  <Text> 6 размер стены снизу</Text>
                  <Text>{elementData?.widthBottom}</Text>
                </View>
              )}
              {elementData?.heightRight !== '' && (
                <View>
                  <Text> 7 размер стены справа</Text>
                  <Text>{elementData?.heightRight}</Text>
                </View>
              )}
              {elementData?.heightLeft !== '' && (
                <View>
                  <Text> 8 размер стены слева</Text>
                  <Text>{elementData?.heightLeft}</Text>
                </View>
              )}
              {elementData?.radiusElement !== '' && (
                <View>
                  <Text> 9 радиус стены</Text>
                  <Text>{elementData?.radiusElement}</Text>
                </View>
              )}
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
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    height: 500,
    zIndex: 1,
  },
  modalView: {
    margin: 30,
    backgroundColor: 'white',
    padding: 20,
    shadowColor: Colors.green,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    elevation: 10,
  },
});
