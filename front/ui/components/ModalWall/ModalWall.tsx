import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useCallback, useMemo} from 'react';
import {Colors, Fonts} from '../../../shared/tokens';
import {IElementWallRoom, IWallSize, Mode} from '../../../shared/types';
import ModalElementsWall from '../ModalElementsWall/ModalElementsWall';
import ElementWallAdd from '../ElementWallAdd/ElementWallAdd';
import SizeWallTextModal from '../../../shared/SizeWallTextModal/SizeWallTextModal';
import {useDispatch, useSelector} from '../../../services/hooks';
import {
  setElementsWallModalVisible,
  setModalVisible,
} from '../../../services/actions/modalOpen';
import {
  setActiveElementId,
  setVisibleElements,
} from '../../../services/actions/room';
import ButtonClose from '../../../shared/ButtonClose/ButtonClose';
import {
  getBlockHeightModalWall,
  getBlockWidthModalWall,
} from '../../../features/features';
interface IModalWall {
  numberWall: number;
  wallIndex: number;
  externalData?: IWallSize;
  mode: Mode;
  currentWall?: boolean;
  elementsToRender: IElementWallRoom[];
}
export default function ModalWall({
  numberWall,
  wallIndex,
  externalData,
  mode,
  elementsToRender,
}: IModalWall) {
  const dispatch = useDispatch();
  const {wallsData} = useSelector(state => state.room);
  const {modalVisible} = useSelector(state => state.modalOpen);
  const isCurrentWallModalVisible =
    modalVisible.isVisible && modalVisible.wallNumber === wallIndex;

  const size = useMemo(() => {
    return wallsData?.[wallIndex]?.size;
  }, [wallsData, wallIndex]);

  const {
    widthTop,
    widthBottom,
    heightRight,
    heightLeft,
    radiusWall,
    wallAngleDegree,
  } = useMemo(() => {
    return {
      widthTop: size?.widthTop || externalData?.widthTop,
      widthBottom: size?.widthBottom || externalData?.widthBottom,
      heightRight: size?.heightRight || externalData?.heightRight,
      heightLeft: size?.heightLeft || externalData?.heightLeft,
      radiusWall: size?.radiusWall || externalData?.radiusWall,
      wallAngleDegree: size?.wallAngleDegree || externalData?.wallAngleDegree,
    };
  }, [size, externalData]);

  const onClickElementModal = useCallback(() => {
    dispatch(
      setElementsWallModalVisible({isVisible: true, wallNumber: wallIndex}),
    );
    dispatch(setModalVisible({isVisible: true, wallNumber: wallIndex}));
  }, [dispatch, wallIndex]);

  const handleClose = useCallback(() => {
    dispatch(setModalVisible({isVisible: false, wallNumber: null}));
  }, [dispatch]);

  const onPressVisible = useCallback(
    (index: number, idElement: number) => {
      dispatch(setVisibleElements({index, isVisible: true}));
      dispatch(setActiveElementId(idElement));
    },
    [dispatch],
  );

  const renderElements = useMemo(() => {
    return elementsToRender.map((element: IElementWallRoom, index: number) => {
      return (
        <ElementWallAdd
          key={index}
          element={element}
          position={index}
          nameElement={element?.dataObj?.nameElement || ''}
          stateElement={element?.dataObj?.stateElement || ''}
          onPressVisible={() => {
            onPressVisible(index, element.id);
          }}
          mode={mode}
          wallIndex={wallIndex}
        />
      );
    });
  }, [elementsToRender, mode, wallIndex, onPressVisible]);

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isCurrentWallModalVisible}
        onRequestClose={handleClose}>
        <TouchableWithoutFeedback onPress={handleClose}>
          <View style={styles.centeredView}>
            <Text style={[styles.textDimensions, styles.textPosition]}>
              Стена №{numberWall}
            </Text>

            <View style={styles.modalView}>
              <View style={styles.renderElements}>
                {elementsToRender.length > 0 && renderElements}
              </View>
              <ButtonClose
                handleClose={handleClose}
                styleClose={styles.btnClosePopup}
              />
              <Pressable onPress={onClickElementModal}>
                <View
                  style={{
                    backgroundColor: Colors.white,
                  }}>
                  <View
                    style={[
                      styles.wallBlock,
                      styles.addedWall,
                      styles.addedWallModal,
                    ]}>
                    <SizeWallTextModal
                      modalVisibleTextModal={isCurrentWallModalVisible}
                      wallPosition={styles.widthTop}
                      dataText={widthTop}
                    />
                    <SizeWallTextModal
                      modalVisibleTextModal={isCurrentWallModalVisible}
                      wallPosition={styles.wallRight}
                      dataText={heightRight}
                    />
                    <SizeWallTextModal
                      modalVisibleTextModal={isCurrentWallModalVisible}
                      wallPosition={styles.wallBottom}
                      dataText={widthBottom}
                    />
                    <SizeWallTextModal
                      modalVisibleTextModal={isCurrentWallModalVisible}
                      wallPosition={styles.wallLeft}
                      dataText={heightLeft}
                    />
                    {radiusWall && (
                      <>
                        <View
                          style={[
                            styles.sizeWall,
                            styles.borderLineAngle,
                          ]}></View>
                        <SizeWallTextModal
                          modalVisibleTextModal={isCurrentWallModalVisible}
                          wallPosition={styles.radiusWall}
                          dataText={radiusWall}
                        />
                      </>
                    )}
                  </View>
                  <View>
                    {wallAngleDegree ? (
                      <Text
                        style={{
                          ...styles.textDimensions,
                          fontSize: modalVisible ? Fonts.f24 : Fonts.f12,
                        }}>
                        {wallAngleDegree}
                      </Text>
                    ) : null}
                  </View>
                </View>
              </Pressable>
            </View>
            <ModalElementsWall
              numberWall={numberWall}
              wallIndex={wallIndex}
              mode={mode}
            />
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    position: 'relative',
    backgroundColor: Colors.white,
    borderRadius: 20,
    width: getBlockWidthModalWall(),
    margin: 20,
    maxHeight: '100%',
    height: getBlockHeightModalWall(),
    overflow: 'hidden',
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    elevation: 20,
  },
  wallBlock: {
    borderRadius: 20,
  },
  addedWall: {
    position: 'relative',
  },
  addedWallModal: {
    width: '100%',
    height: '100%',
  },
  sizeWall: {
    position: 'absolute',
  },
  widthTop: {
    left: '50%',
    top: '5%',
    transform: [{translateX: -10}],
  },
  wallRight: {
    right: '5%',
    top: '50%',
    transform: [{translateY: -10}],
  },
  wallBottom: {
    bottom: '5%',
    left: '50%',
    transform: [{translateX: -10}],
  },
  wallLeft: {
    top: '50%',
    left: '5%',
    transform: [{translateY: -10}],
  },
  borderLineAngle: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.black,
    borderStyle: 'dashed',
    top: '60%',
    width: '100%',
  },
  radiusWall: {
    top: '50%',
    left: '50%',
    transform: [{translateX: -2}],
  },

  textDimensions: {
    color: Colors.black,
    fontSize: Fonts.f16,
  },
  textPosition: {
    fontFamily: Fonts.bold,
    fontWeight: 700,
    fontSize: Fonts.f24,
  },
  btnClosePopup: {
    top: 15,
    right: 15,
    zIndex: 2,
  },
  renderElements: {
    position: 'absolute',
    top: '10%',
    left: '10%',
    zIndex: 4,
  },
});
