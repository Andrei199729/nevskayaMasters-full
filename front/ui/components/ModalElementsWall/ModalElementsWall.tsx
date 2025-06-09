import {Modal, View, Pressable, StyleSheet} from 'react-native';
import {
  IAddBlockDimensions,
  IDataElementsWall,
  IElementData,
} from '../../../shared/types';
import {Colors} from '../../../shared/tokens';
import {Dispatch, SetStateAction, useState} from 'react';
import ModalFormElement from '../ModalFormElement/ModalFormElement';
import ElementWall from '../ElementWall/ElementWall';
import {arrDataElementsWall} from '../../../shared/texts';

interface IModalElementsWall {
  modalVisible: boolean | number | null;
  numberWall: number;
  setModalVisible: Dispatch<SetStateAction<boolean | number | null>>;
  onSaveElement: (element: IDataElementsWall) => void;
  onSaveElementSize: (
    element: IElementData,
    wallId: number,
    elementId?: number,
  ) => void;
}

export default function ModalElementsWall({
  modalVisible,
  setModalVisible,
  numberWall,
  onSaveElement,
  onSaveElementSize,
  ...props
}: IModalElementsWall) {
  const [element, setElement] = useState<number | boolean | null>(false);
  const [nameElementWall, setNameElementWall] = useState<IDataElementsWall>(
    {} as IDataElementsWall,
  );

  const onClickElement = async (data: IDataElementsWall, index: number) => {
    setElement(!element);
    setNameElementWall(data);
    onSaveElement(data); // Сохраняем данные только при наличии данных
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={typeof modalVisible === 'boolean' && modalVisible}
      onRequestClose={() => {
        setElement(false);
      }}>
      <ModalFormElement
        modalVisible={element}
        setModalVisible={setModalVisible}
        setModalVisibleWall={setElement}
        numberWall={numberWall}
        nameElementWall={nameElementWall.nameElement}
        onSaveElementSize={onSaveElementSize}
      />
      <View>
        <Pressable
          onPress={() => {
            setElement(element);
          }}>
          <View style={styles.elementsWallContainer}>
            {arrDataElementsWall?.map((data, index) => {
              return (
                <ElementWall
                  nameElement={data.nameElement}
                  stateElement={data.stateElement}
                  position={index + 1}
                  onPress={() => onClickElement(data, index)}
                  key={index}
                />
              );
            })}
          </View>
        </Pressable>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  elementsWallContainer: {
    maxWidth: '100%',
    width: '100%',
    backgroundColor: Colors.white,
    position: 'absolute',
    top: 630,
    borderColor: Colors.black,
    borderWidth: 1,
  },

  elementVentilation: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: Colors.black,
    borderStyle: 'solid',
    borderRadius: 1000,
    backgroundColor: Colors.menuBottom,
  },

  elementDoor: {
    width: 30,
    height: 40,
    borderWidth: 1,
    borderColor: Colors.black,
    borderStyle: 'solid',
  },

  elementWindow: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: Colors.black,
    borderStyle: 'solid',
  },
});
