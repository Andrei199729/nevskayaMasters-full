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
          {element?.data.locationElementTop !== '' && (
            <View style={styles.blockText}>
              <Text style={styles.text}>1. Расположение сверху</Text>
              <Text style={styles.text}>
                {element?.data.locationElementTop}
              </Text>
            </View>
          )}
          {element?.data.locationElementBottom !== '' && (
            <View style={styles.blockText}>
              <Text style={styles.text}>2. Расположение снизу</Text>
              <Text style={styles.text}>
                {element?.data.locationElementBottom}
              </Text>
            </View>
          )}
          {element?.data.locationElementRight !== '' && (
            <View style={styles.blockText}>
              <Text style={styles.text}>3. Расположение справа</Text>
              <Text style={styles.text}>
                {element?.data.locationElementRight}
              </Text>
            </View>
          )}
          {element?.data.locationElementLeft !== '' && (
            <View style={styles.blockText}>
              <Text style={styles.text}>4. Расположение слева</Text>
              <Text style={styles.text}>
                {element?.data.locationElementLeft}
              </Text>
            </View>
          )}
          {element?.data.widthTop !== '' && (
            <View style={styles.blockText}>
              <Text style={styles.text}>5. Размер стены сверху</Text>
              <Text style={styles.text}>{element?.data.widthTop}</Text>
            </View>
          )}
          {element?.data.widthBottom !== '' && (
            <View style={styles.blockText}>
              <Text style={styles.text}>6. Размер стены снизу</Text>
              <Text style={styles.text}>{element?.data.widthBottom}</Text>
            </View>
          )}
          {element?.data.heightRight !== '' && (
            <View style={styles.blockText}>
              <Text style={styles.text}>7. Размер стены справа</Text>
              <Text style={styles.text}>{element?.data.heightRight}</Text>
            </View>
          )}
          {element?.data.heightLeft !== '' && (
            <View style={styles.blockText}>
              <Text style={styles.text}>8. Размер стены слева</Text>
              <Text style={styles.text}>{element?.data.heightLeft}</Text>
            </View>
          )}
          {element?.data.radiusElement !== '' && (
            <View style={styles.blockText}>
              <Text style={styles.text}>9. Радиус стены</Text>
              <Text style={styles.text}>{element?.data.radiusElement}</Text>
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
