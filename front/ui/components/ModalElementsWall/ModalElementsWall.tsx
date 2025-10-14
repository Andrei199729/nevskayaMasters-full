import {Modal, View, Pressable, StyleSheet} from 'react-native';
import {IDataElementsWall, Mode} from '../../../shared/types';
import {Colors} from '../../../shared/tokens';
import {useCallback, useState} from 'react';
import ModalFormElement from '../ModalFormElement/ModalFormElement';
import {arrDataElementsWall} from '../../../shared/texts';
import {useDispatch, useSelector} from '../../../services/hooks';
import {
  setElementModalVisible,
  setElementsWallModalVisible,
} from '../../../services/actions/modalOpen';
import {setDataObj} from '../../../services/actions/room';
import BlockStateElements from '../BlockStateElements/BlockStateElements';

interface IModalElementsWall {
  numberWall: number;
  wallIndex: number;
  mode: Mode;
}

export default function ModalElementsWall({
  numberWall,
  wallIndex,
  mode,
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

  const onClickElement = useCallback(
    async (data: IDataElementsWall, index: number) => {
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
    },
    [dispatch, wallIndex],
  );

  const renderedElements = arrDataElementsWall.map((data, index) => (
    <BlockStateElements
      nameElement={data.nameElement}
      stateElement={data.stateElement}
      position={index}
      onPressVisible={() => onClickElement(data, index)}
      key={index}
    />
  ));

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
        mode={mode}
      />
      <View>
        <Pressable
          onPress={() => {
            dispatch(
              setElementsWallModalVisible({isVisible: false, wallNumber: null}),
            );
          }}>
          <View style={styles.elementsWallContainer}>{renderedElements}</View>
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
});
