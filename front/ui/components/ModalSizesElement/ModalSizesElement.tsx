import {Modal, View, Text, StyleSheet} from 'react-native';
import {IElement, IElementData} from '../../../shared/types';
import {Colors} from '../../../shared/tokens';
import {Dispatch, SetStateAction, useState} from 'react';
import ModalFormElement from '../ModalFormElement/ModalFormElement';
import ButtonCustom from '../../../shared/ButtonCustom/ButtonCustom';
import {useDispatch, useSelector} from '../../../services/hooks';

interface IModalSizesElement {
  setVisible: (position: number, bool: boolean) => void;
  isVisible: {[key: number]: boolean};
  nameElement: string;
  position: number;
  element: IElement;
  setModalVisibleWall: Dispatch<SetStateAction<number | boolean | null>>;
  // deleteElement: (wallId: number | boolean | null, elementId: number) => void;
  numberCurrentWall: number | boolean | null;
}

export default function ModalSizesElement({
  setVisible,
  isVisible,
  nameElement,
  position,
  element,
  setModalVisibleWall,
  numberCurrentWall,
  // deleteElement,
  ...props
}: IModalSizesElement) {
  const dispatch = useDispatch();
  const {elementsData} = useSelector(state => state.room);
  const [isVisibleEditModal, setIsVisibleEditModal] = useState<
    number | boolean | null
  >(false);
  const onClickModalClose = () => {
    setVisible(position, false);
  };

  const onClickEdit = () => {
    if (!element.data) return;
    // Здесь вам нужно найти элемент в массиве elementsData, соответствующий текущей позиции
    const elementToEdit = elementsData[position]?.data;

    if (elementToEdit) {
      setIsVisibleEditModal(true);
    }
  };

  const onSaveEditedElement = (updatedData: IElementData) => {
    dispatch(updateElementData(position, updatedData)); // Обновляем состояние
    setIsVisibleEditModal(false); // Закрываем модальное окно редактирования
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={!!isVisible[position]}
      onRequestClose={() => {
        () => setVisible(position, false);
      }}>
      <ModalFormElement
        modalVisible={isVisibleEditModal}
        setModalVisible={setIsVisibleEditModal}
        numberWall={position + 1}
        nameElementWall={nameElement}
        dataEditElement={element.data}
        setModalVisibleWall={setModalVisibleWall}
        numberCurrentWall={numberCurrentWall}
        onSaveElementSize={onSaveEditedElement}
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
                // onPress={() => deleteElement(numberCurrentWall, position)}
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
function updateElementData(position: number, updatedData: IElementData): any {
  throw new Error('Function not implemented.');
}
