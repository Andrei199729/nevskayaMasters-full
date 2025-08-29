import {Modal, View, Pressable, StyleSheet} from 'react-native';
import {IDataElementsWall} from '../../../shared/types';
import {Colors} from '../../../shared/tokens';
import {useState} from 'react';
import ModalFormElement from '../ModalFormElement/ModalFormElement';
import ElementWall from '../ElementWall/ElementWall';
import {arrDataElementsWall} from '../../../shared/texts';
import {useDispatch, useSelector} from '../../../services/hooks';
import {
  setElementModalVisible,
  setElementsWallModalVisible,
} from '../../../services/actions/modalOpen';
import {setDataObj} from '../../../services/actions/room';

interface IModalElementsWall {
  numberWall: number;
  wallIndex: number;
}

export default function ModalElementsWall({
  numberWall,
  wallIndex,
  ...props
}: IModalElementsWall) {
  const dispatch = useDispatch();
  const {elementsWallModalVisible} = useSelector(state => state.modalOpen);
  // занести в редакс nameElementWall
  const [nameElementWall, setNameElementWall] = useState<IDataElementsWall>(
    {} as IDataElementsWall,
  );

  const isCurrentElementsModalVisible =
    elementsWallModalVisible.isVisible &&
    elementsWallModalVisible.wallNumber === wallIndex;

  const onClickElement = async (data: IDataElementsWall, index: number) => {
    dispatch(
      setElementModalVisible({
        isVisible: true,
        wallNumber: wallIndex,
        wallNumberElement: index,
      }),
    );
    setNameElementWall(data);

    dispatch(setDataObj(data));

    // Сохраняем данные только при наличии данных
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isCurrentElementsModalVisible}
      onRequestClose={() => {
        dispatch(
          setElementModalVisible({
            isVisible: false,
            wallNumber: null,
            wallNumberElement: null,
          }),
        );
      }}>
      <ModalFormElement
        numberWall={numberWall}
        nameElementWall={nameElementWall.nameElement}
        wallIndex={wallIndex}
      />
      <View>
        <Pressable
          onPress={() => {
            dispatch(
              setElementsWallModalVisible({isVisible: false, wallNumber: null}),
            );
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
