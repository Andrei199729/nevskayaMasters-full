import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {Colors, Fonts} from '../../../shared/tokens';
import {
  IDataElementsWall,
  IElement,
  IElementData,
  IExternalSizeWall,
  ISaveSizeWall,
} from '../../../shared/types';
import ModalElementsWall from '../ModalElementsWall/ModalElementsWall';
import ElementWallAdd from '../ElementWallAdd/ElementWallAdd';
import SizeWallTextModal from '../../../shared/SizeWallTextModal/SizeWallTextModal';
import {useDispatch, useSelector} from '../../../services/hooks';
import {
  setElementsWallModalVisible,
  setModalVisible,
} from '../../../services/actions/modalOpen';
import {setVisibleElements} from '../../../services/actions/room';
interface IModalWall {
  numberWall: number;
  saveSizeWall?: ISaveSizeWall | undefined;
  wallIndex: number;
  addElementToData: (data: IElementData, wallId: number) => void;
  onSaveElement: (dataEl: IDataElementsWall, index: number) => void;
  updateSizeWalls: (data: IElementData, wallId: number) => void;
  editElement: (updatedData: any, wallId: number, elementId: number) => void;
  externalData?: IExternalSizeWall | undefined;
  mode: 'edit' | 'view';
}
export default function ModalWall({
  numberWall,
  saveSizeWall,
  wallIndex,
  addElementToData,
  onSaveElement,
  updateSizeWalls,
  editElement,
  externalData,
  currentWall,
  mode,
  ...props
}: IModalWall & any) {
  const dispatch = useDispatch();
  const {elementsData} = useSelector(state => state.room);
  const {modalVisible} = useSelector(state => state.modalOpen);
  const isCurrentWallModalVisible =
    modalVisible.isVisible && modalVisible.wallNumber === wallIndex;

  let size = saveSizeWall?.[wallIndex]?.size;

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

  const onSaveDataElement = (data: IElementData, wallId: number) => {
    addElementToData(data, wallId);
    updateSizeWalls(data, wallId);
  };

  const handleClose = () => {
    dispatch(setModalVisible({isVisible: false, wallNumber: currentWall}));
  };
  const elementsForCurrentWall = elementsData.filter(
    el => el.wallId === numberWall - 1,
  );
  // Обновляем, если `elementsData` изменилось
  const elementsToRender =
    mode === 'edit'
      ? elementsForCurrentWall
      : externalData?.arrElements?.elements ?? [];
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
                {/* {elementsForCurrentWall?.map(
                  (element: IElement, index: number) => {
                    return (
                      <ElementWallAdd
                        key={index}
                        element={element}
                        position={index}
                        nameElement={element?.dataObj?.nameElement || ''}
                        stateElement={element?.dataObj?.stateElement || ''}
                        onPressVisible={() => setVisible(index, true)}
                        setVisible={setVisible}
                        editElement={editElement}
                        wallIndex={wallIndex}
                      />
                    );
                  },
                )} */}
                {elementsToRender.length > 0 &&
                  elementsToRender.map((element: IElement, index: number) => {
                    return (
                      <ElementWallAdd
                        key={index}
                        element={element}
                        position={index}
                        nameElement={element?.dataObj?.nameElement || ''}
                        stateElement={element?.dataObj?.stateElement || ''}
                        onPressVisible={() =>
                          dispatch(setVisibleElements({index, isVisible: true}))
                        }
                        editElement={editElement}
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
        onSaveElement={onSaveElement}
        onSaveElementSize={onSaveDataElement}
        wallIndex={wallIndex}
        editElement={editElement}
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
