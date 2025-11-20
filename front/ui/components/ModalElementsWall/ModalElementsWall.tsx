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
  setModalVisible,
} from '../../../services/actions/modalOpen';
import {setDataObj} from '../../../services/actions/room';
import BlockStateElements from '../BlockStateElements/BlockStateElements';
import Close from '../../../assets/images/icon/iconFunc/CloseIcon';
import ButtonClose from '../../../shared/ButtonClose/ButtonClose';

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
  const handleClose = useCallback(() => {
    // dispatch(setModalVisible({isVisible: false, wallNumber: null}));
    dispatch(
      setElementModalVisible({
        isVisible: false,
        wallNumber: null,
        wallNumberElement: null,
      }),
    );
  }, [dispatch]);
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
          <View style={styles.elementsWallContainer}>
            <ButtonClose
              handleClose={handleClose}
              styleClose={styles.btnClosePopup}
            />
            {renderedElements}
          </View>
        </Pressable>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  elementsWallContainer: {
    width: '24%',
    padding: 20,
    backgroundColor: Colors.white,
    position: 'absolute',
    top: 30,
    left: 0,
    borderRadius: 20,
    margin: 20,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    elevation: 20,
  },
  btnClosePopup: {
    top: 10,
    right: 10,
  },
});
