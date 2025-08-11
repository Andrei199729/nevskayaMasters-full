import {Modal, View, Text, StyleSheet} from 'react-native';
import {IElement, IElementData} from '../../../shared/types';
import {Colors} from '../../../shared/tokens';
import {Dispatch, SetStateAction, useCallback, useState} from 'react';
import ModalFormElement from '../ModalFormElement/ModalFormElement';
import ButtonCustom from '../../../shared/ButtonCustom/ButtonCustom';
import {useDispatch, useSelector} from '../../../services/hooks';
import {
  deleteElement,
  setUpdateElementsData,
} from '../../../services/actions/room';
import {isValidArray} from '../../../utils/validators';
import {setIsVisibleEditModal} from '../../../services/actions/modalOpen';

interface IModalSizesElement {
  setVisible: (position: number, bool: boolean) => void;
  isVisible: {[key: number]: boolean};
  nameElement: string;
  position: number;
  element: IElement;
  editElement: any;
  wallIndex: number;
}

export default function ModalSizesElement({
  setVisible,
  isVisible,
  nameElement,
  position,
  element,
  editElement,
  wallIndex,
  ...props
}: IModalSizesElement & any) {
  const dispatch = useDispatch();
  const {elementsData, sizeWalls, numberCurrentWall} = useSelector(
    state => state.room,
  );
  const [clickButtonEdit, setClickButtonEdit] = useState(false);
  const onClickModalClose = () => {
    setVisible(position, false);
  };

  const onClickEdit = () => {
    if (!element.data) return;
    // Здесь вам нужно найти элемент в массиве elementsData, соответствующий текущей позиции
    const elementToEdit = elementsData[position]?.data;

    if (elementToEdit) {
      setClickButtonEdit(true);
      dispatch(
        setIsVisibleEditModal({
          isVisible: true,
          wallNumber: wallIndex,
          wallNumberElement: position,
        }),
      );
    }
  };

  const onSaveEditedElement = (updatedData: IElementData) => {
    dispatch(setUpdateElementsData(position, updatedData)); // Обновляем состояние
    dispatch(
      setIsVisibleEditModal({
        isVisible: false,
        wallNumber: null,
        wallNumberElement: null,
      }),
    ); // Закрываем модальное окно редактирования
    // setClickButtonEdit(false);
  };

  const onDeleteElement = useCallback(
    (wallId: number | boolean | null, elementId: number) => {
      if (!isValidArray(sizeWalls, 'sizeWalls')) return sizeWalls;
      dispatch(deleteElement(wallId, elementId));
      setVisible(elementId, false);
    },
    [],
  );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={!!isVisible[position]}
      onRequestClose={() => {
        () => setVisible(position, false);
      }}>
      <ModalFormElement
        numberWall={position + 1}
        nameElementWall={nameElement}
        dataEditElement={element.data}
        onSaveElementSize={onSaveEditedElement}
        editElement={editElement}
        wallIndex={wallIndex}
        clickButtonEdit={clickButtonEdit}
      />
      <View style={{position: 'absolute', top: -50, left: 100}}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View>
              <Text>
                {position + 1} {nameElement}
              </Text>
              {element?.data?.locationElementTop !== '' && (
                <View>
                  <Text> 1 расположение сверху</Text>
                  <Text>{element?.data?.locationElementTop}</Text>
                </View>
              )}
              {element?.data?.locationElementBottom !== '' && (
                <View>
                  <Text> 2 расположение снизу</Text>
                  <Text>{element?.data?.locationElementBottom}</Text>
                </View>
              )}
              {element?.data?.locationElementRight !== '' && (
                <View>
                  <Text> 3 расположение справа</Text>
                  <Text>{element?.data?.locationElementRight}</Text>
                </View>
              )}
              {element?.data?.locationElementLeft !== '' && (
                <View>
                  <Text> 4 расположение слева</Text>
                  <Text>{element?.data?.locationElementLeft}</Text>
                </View>
              )}
              {element?.data?.widthTop !== '' && (
                <View>
                  <Text> 5 размер стены сверху</Text>
                  <Text>{element?.data?.widthTop}</Text>
                </View>
              )}
              {element?.data?.widthBottom !== '' && (
                <View>
                  <Text> 6 размер стены снизу</Text>
                  <Text>{element?.data?.widthBottom}</Text>
                </View>
              )}
              {element?.data?.heightRight !== '' && (
                <View>
                  <Text> 7 размер стены справа</Text>
                  <Text>{element?.data?.heightRight}</Text>
                </View>
              )}
              {element?.data?.heightLeft !== '' && (
                <View>
                  <Text> 8 размер стены слева</Text>
                  <Text>{element?.data?.heightLeft}</Text>
                </View>
              )}
              {element?.data?.radiusElement !== '' && (
                <View>
                  <Text> 9 радиус стены</Text>
                  <Text>{element?.data?.radiusElement}</Text>
                </View>
              )}
              <ButtonCustom textBtn="Редактировать" onPress={onClickEdit} />
              <ButtonCustom
                textBtn="Удалить"
                onPress={() => onDeleteElement(numberCurrentWall, position)}
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
