import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import {Colors, Fonts} from '../../../shared/tokens';
import {
  IElement,
  IElementData,
  IExternalSizeWall,
  Mode,
} from '../../../shared/types';
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
interface IModalWall {
  numberWall: number;
  wallIndex: number;
  updateSizeWalls: (data: IElementData, wallId: number) => void;
  externalData?: any | undefined;
  mode: Mode;
}
export default function ModalWall({
  numberWall,
  wallIndex,
  externalData,
  currentWall,
  mode,
  elementsToRender,
  ...props
}: IModalWall & any) {
  const dispatch = useDispatch();
  const {
    elementsData,
    wallsData,
    roomData,
    numberCurrentWall,
    currentRoomId,
    activeElementId,
  } = useSelector(state => state.room);
  const {modalVisible} = useSelector(state => state.modalOpen);
  const isCurrentWallModalVisible =
    modalVisible.isVisible && modalVisible.wallNumber === wallIndex;

  let size = wallsData?.[wallIndex]?.size;

  let widthTop = size?.widthTop || externalData?.widthTop;
  let widthBottom = size?.widthBottom || externalData?.widthBottom;
  let heightRight = size?.heightRight || externalData?.heightRight;
  let heightLeft = size?.heightLeft || externalData?.heightLeft;
  let radiusWall = size?.radiusWall || externalData?.radiusWall;
  let wallAngleDegree = size?.wallAngleDegree || externalData?.wallAngleDegree;

  const onClickElementModal = () => {
    dispatch(
      setElementsWallModalVisible({isVisible: true, wallNumber: wallIndex}),
    );
    dispatch(setModalVisible({isVisible: true, wallNumber: wallIndex}));
  };

  const handleClose = () => {
    dispatch(setModalVisible({isVisible: false, wallNumber: currentWall}));
  };
  const currentRoom = roomData.find(
    (room: any, index: number) => index === currentRoomId,
  );
  const currentDrawing = currentRoom?.dataProduct?.[0]?.drawingData;
  const currentWallData = currentDrawing?.walls?.find(
    (wall: any) => wall.numberWall === numberCurrentWall,
  );

  const elementsForCurrentWall =
    currentWallData?.size?.arrElements?.elements || [];
  const elementsForCurrent = elementsData.filter(
    el => el.wallId === numberWall - 1,
  );

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isCurrentWallModalVisible}
        onRequestClose={() =>
          dispatch(
            setModalVisible({
              isVisible: false,
              wallNumber: wallIndex,
            }),
          )
        }>
        <TouchableWithoutFeedback onPress={handleClose}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View
                style={{
                  position: 'absolute',
                  top: '10%',
                  left: '10%',
                  zIndex: 4,
                }}>
                {elementsToRender.length > 0 &&
                  elementsToRender.map((element: any, index: number) => {
                    return (
                      <ElementWallAdd
                        key={index}
                        element={element}
                        position={index}
                        nameElement={element?.dataObj?.nameElement || ''}
                        stateElement={element?.dataObj?.stateElement || ''}
                        onPressVisible={() => {
                          dispatch(
                            setVisibleElements({index, isVisible: true}),
                          );
                          dispatch(setActiveElementId(element.id));
                        }}
                        mode={mode}
                        wallIndex={wallIndex}
                      />
                    );
                  })}
              </View>
              <Pressable onPress={onClickElementModal}>
                <View style={{backgroundColor: Colors.white}}>
                  <Text style={styles.textDimensions}>Стена №{numberWall}</Text>
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
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <ModalElementsWall
        numberWall={numberWall}
        wallIndex={wallIndex}
        mode={mode}
      />
    </>
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
  wallBlock: {
    width: '100%',
    backgroundColor: Colors.white,
  },
  addedWall: {
    position: 'relative',
    width: '100%',
    borderWidth: 2,
    borderColor: Colors.black,
    borderStyle: 'solid',
  },
  addedWallModal: {
    width: 400,
    height: '100%',
  },
  sizeWall: {
    position: 'absolute',
  },
  widthTop: {
    left: '50%',
    top: 0,
  },
  wallRight: {
    right: 0,
    top: '50%',
    transform: [{translateY: -10}],
  },
  wallBottom: {
    bottom: 0,
    left: '50%',
  },
  wallLeft: {
    top: '50%',
    left: 0,
    transform: [{translateY: -10}],
  },
  borderLineAngle: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.black,
    borderStyle: 'dashed',
    top: '70%',
    width: '100%',
  },
  radiusWall: {
    top: '50%',
    left: '50%',
    transform: [{translateX: -2}],
  },

  textDimensions: {
    color: Colors.black,
    fontSize: Fonts.f12,
  },
});
