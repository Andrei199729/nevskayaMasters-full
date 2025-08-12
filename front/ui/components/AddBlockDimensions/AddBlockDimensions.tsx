import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {Colors, Fonts} from '../../../shared/tokens';
import {
  ClickButtonBlockDimensions,
  ClickSelection,
  IAddBlockDimensions,
  IDataElementsWall,
  IElementData,
  IExternalSizeWall,
  TClickButtonBlockDimensions,
} from '../../../shared/types';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import ModalWall from '../ModalWall/ModalWall';
import BlockStateElements from '../BlockStateElements/BlockStateElements';
import SizeWallText from '../../../shared/SizeWallText/SizeWallText';
import {useDispatch, useSelector} from '../../../services/hooks';
import {
  setClickDataWall,
  setDataObj,
  setEditElement,
  setElementsData,
  setNumberCurrentWall,
  setUpdateSizeWalls,
  setVisibleElements,
} from '../../../services/actions/room';
import {isValidArray} from '../../../utils/validators';
import ButtonCustom from '../../../shared/ButtonCustom/ButtonCustom';
import {setDataEditWall, setSelectedLine} from '../../../services/actions/draw';
import {
  setModalVisible,
  setModalVisibleBacklight,
  setOpenFormDataSize,
} from '../../../services/actions/modalOpen';

export default function AddBlockDimensions({
  numberWall,
  saveSizeWall,
  externalData,
  currentWall,
  index,
  mode,
  ...props
}: IAddBlockDimensions & any) {
  const dispatch = useDispatch();
  const {
    sizeWalls,
    dataObj,
    numberCurrentWall,
    clickDataWall,
    elementsData,
    roomData,
    currentRoomId,
    wallsData,
  } = useSelector(state => state.room);

  const {modalVisibleBacklight, openFormDataSize} = useSelector(
    state => state.modalOpen,
  );

  const wallIndex = numberWall - 1;

  let size = saveSizeWall?.[wallIndex]?.size;

  let widthTop = size?.widthTop || externalData?.widthTop;
  let widthBottom = size?.widthBottom || externalData?.widthBottom;
  let heightRight = size?.heightRight || externalData?.heightRight;
  let heightLeft = size?.heightLeft || externalData?.heightLeft;
  let radiusWall = size?.radiusWall || externalData?.radiusWall;
  let wallAngleDegree = size?.wallAngleDegree || externalData?.wallAngleDegree;
  console.log(
    externalData?.arrElements?.elements,
    'externalData?.arrElements?.elements',
  );

  // const [clickDataWall, setClickDataWall] = useState<{
  //   [key: string]: boolean;
  // }>({});

  const roomIndex = roomData.findIndex(
    (room: {id: any}, index: number) => index === currentRoomId,
  );
  const addElementToData = (data: IElementData, wallId: number) => {
    dispatch(setElementsData(data, dataObj, wallId, currentRoomId));
  };

  const onSaveElement = (dataEl: IDataElementsWall) => {
    dispatch(setDataObj(dataEl));
  };

  const updateSizeWalls = (data: IElementData, wallId: number) => {
    if (!isValidArray(sizeWalls, 'sizeWalls')) return sizeWalls;
    //  Создаем глубокую копию массива стен
    dispatch(
      setUpdateSizeWalls(data, dataObj, numberCurrentWall, wallId, roomIndex),
    );
  };

  const editElement = useCallback(
    (updatedData: any, wallId: number, elementId: number) => {
      if (!isValidArray(sizeWalls, 'sizeWalls')) return sizeWalls;
      dispatch(setEditElement(updatedData, dataObj, wallId, elementId));
      dispatch(setVisibleElements({index: elementId, isVisible: false}));
    },
    [],
  );

  const onClickDataWall = (
    isVisible: boolean,
    nameButton: TClickButtonBlockDimensions,
  ) => {
    dispatch(setClickDataWall({isVisible, nameButton}));
  };

  const onClickEditDataWall = (
    size: IExternalSizeWall | undefined,
    currentWall: number,
  ) => {
    if (!size) {
      return [];
    } else {
      // это сделать редакст и передать currentWall
      dispatch(
        setDataEditWall({
          dataEditWall: size,
          currentWall: currentWall,
        }),
      );
    }
  };

  const onClickWallIncrease = (
    size: IExternalSizeWall | undefined,
    wallNumber: number,
    click: ClickSelection.Wall | ClickSelection.Button,
  ) => {
    switch (click) {
      case ClickSelection.Wall:
        // Логика, если клик был сделан на стену
        dispatch(setNumberCurrentWall(wallNumber));
        dispatch(setSelectedLine(wallNumber));

        if (size) {
          dispatch(setModalVisible({isVisible: true, wallNumber}));
          dispatch(setModalVisibleBacklight(false));
          dispatch(
            setOpenFormDataSize({
              isOpen: false,
              wallNumber: 0,
            }),
          );
        } else {
          dispatch(setModalVisible({isVisible: false, wallNumber: null}));
          dispatch(setModalVisibleBacklight(true));
          dispatch(
            setOpenFormDataSize({
              isOpen: true,
              wallNumber,
            }),
          );
        }

        break;

      case ClickSelection.Button:
        // Логика, если клик был сделан на кнопку
        dispatch(setNumberCurrentWall(wallNumber));
        onClickEditDataWall(size, wallNumber);
        dispatch(setModalVisible({isVisible: false, wallNumber: null}));
        dispatch(setModalVisibleBacklight(true));
        dispatch(
          setOpenFormDataSize({
            isOpen: true,
            wallNumber,
          }),
        );

        break;
      default:
        // Логика по умолчанию (если нужно обработать другие случаи)
        break;
    }
  };
  const elementsForCurrentWall = elementsData.filter(
    el => el.wallId === numberWall - 1,
  );
  const elementsToRender =
    mode === 'edit'
      ? elementsForCurrentWall
      : externalData?.arrElements?.elements ?? [];

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.centeredView}>
        <ModalWall
          numberWall={numberWall}
          saveSizeWall={saveSizeWall}
          externalData={externalData}
          wallIndex={wallIndex}
          addElementToData={addElementToData}
          onSaveElement={onSaveElement}
          updateSizeWalls={updateSizeWalls}
          editElement={editElement}
          currentWall={currentWall}
          mode={mode}
        />

        <Pressable
          onPress={() =>
            onClickWallIncrease(
              externalData || size,
              wallIndex,
              ClickSelection.Wall,
            )
          }>
          <View>
            <Text style={styles.textDimensions}>Стена №{numberWall + 1}</Text>
            <View
              style={[
                styles.wallBlock,
                {
                  ...styles.addedWall,
                  borderColor:
                    modalVisibleBacklight && currentWall
                      ? Colors.green
                      : Colors.black,
                },
              ]}>
              {
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 5,
                    margin: 5,
                  }}>
                  <Pressable
                    onPress={() =>
                      onClickDataWall(
                        !clickDataWall.width,
                        ClickButtonBlockDimensions.Width,
                      )
                    }>
                    <View
                      style={{
                        borderBlockColor: 'black',
                        borderWidth: 1,
                        borderStyle: 'solid',
                      }}>
                      <Text>Ширина стены</Text>
                    </View>
                    {clickDataWall.width && (
                      <View
                        style={{
                          borderBlockColor: 'black',
                          borderWidth: 1,
                          borderStyle: 'solid',
                          marginTop: 10,
                          flexDirection: 'column',
                          gap: 10,
                        }}>
                        <View style={{flexDirection: 'column', gap: 5}}>
                          <Text>Ширина сверху:</Text>
                          <Text>{widthTop}</Text>
                        </View>
                        <View style={{flexDirection: 'column', gap: 5}}>
                          <Text>Ширина снизу:</Text>
                          <Text>{widthBottom}</Text>
                        </View>
                        <View style={{flexDirection: 'column', gap: 5}}>
                          <Text>Радиус внутренней стены:</Text>
                          {radiusWall ? (
                            <>
                              <View
                                style={[
                                  styles.sizeWall,
                                  styles.borderLineAngle,
                                ]}></View>
                              <View
                                style={[styles.sizeWall, styles.radiusWall]}>
                                <Text>{radiusWall}</Text>
                              </View>
                            </>
                          ) : (
                            <Text>Нет</Text>
                          )}
                        </View>
                      </View>
                    )}
                  </Pressable>
                  <Pressable
                    onPress={() =>
                      onClickDataWall(
                        !clickDataWall.height,
                        ClickButtonBlockDimensions.Height,
                      )
                    }>
                    <View
                      style={{
                        borderBlockColor: 'black',
                        borderWidth: 1,
                        borderStyle: 'solid',
                      }}>
                      <Text>Высота стены</Text>
                    </View>
                    {clickDataWall.height && (
                      <View
                        style={{
                          borderBlockColor: 'black',
                          borderWidth: 1,
                          borderStyle: 'solid',
                          marginTop: 10,
                          flexDirection: 'column',
                          gap: 10,
                        }}>
                        <View style={{flexDirection: 'column', gap: 5}}>
                          <Text>Высота справа:</Text>
                          <Text>{heightRight}</Text>
                        </View>
                        <View style={{flexDirection: 'column', gap: 5}}>
                          <Text>Высота слева:</Text>
                          <Text>{heightLeft}</Text>
                        </View>
                        <View style={{flexDirection: 'column', gap: 5}}>
                          <Text>Градус угла стены:</Text>
                          <View>
                            {wallAngleDegree ? (
                              <Text>{wallAngleDegree}</Text>
                            ) : null}
                          </View>
                        </View>
                      </View>
                    )}
                  </Pressable>
                  <Pressable
                    onPress={() =>
                      onClickDataWall(
                        !clickDataWall.elements,
                        ClickButtonBlockDimensions.Elements,
                      )
                    }>
                    <View
                      style={{
                        borderBlockColor: 'black',
                        borderWidth: 1,
                        borderStyle: 'solid',
                        padding: 5,
                      }}>
                      <Text>Элементы стены</Text>
                    </View>
                    {clickDataWall.elements && (
                      <View
                        style={{
                          borderBlockColor: 'black',
                          borderWidth: 1,
                          borderStyle: 'solid',
                          marginTop: 10,
                        }}>
                        {elementsToRender.length > 0 ? (
                          elementsToRender.map((element: any, index: any) => {
                            console.log(
                              element,
                              'element----------------------',
                            );

                            return (
                              <BlockStateElements
                                key={index}
                                nameElement={
                                  element?.dataObj?.nameElement || 'Без имени'
                                }
                                stateElement={
                                  element?.dataObj?.stateElement || 'Не задано'
                                }
                                position={index}
                                onPressVisible={() => {}}
                              />
                            );
                          })
                        ) : (
                          <Text>Добавьте элементы</Text>
                        )}
                      </View>
                    )}
                  </Pressable>
                </View>
              }
              <SizeWallText wallPosition={styles.wallTop} dataText={widthTop} />
              <SizeWallText
                wallPosition={styles.wallRight}
                dataText={heightRight}
              />
              <SizeWallText
                wallPosition={styles.wallBottom}
                dataText={widthBottom}
              />
              <SizeWallText
                wallPosition={styles.wallLeft}
                dataText={heightLeft}
              />
              {radiusWall && (
                <>
                  <View
                    style={[styles.sizeWall, styles.borderLineAngle]}></View>
                  <SizeWallText
                    wallPosition={styles.radiusWall}
                    dataText={radiusWall}
                  />
                </>
              )}
            </View>
            <View>
              {wallAngleDegree ? <Text>{wallAngleDegree}</Text> : null}
            </View>
          </View>
        </Pressable>
        {
          <ButtonCustom
            textBtn="Редактировать стену"
            onPress={() =>
              onClickWallIncrease(
                size || externalData,
                wallIndex,
                ClickSelection.Button,
              )
            }
          />
        }
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  wallBlock: {
    width: '100%',
    backgroundColor: Colors.white,
  },
  addedWall: {
    position: 'relative',
    width: 350,
    flex: 1,
    borderWidth: 2,
    borderColor: Colors.black,
    borderStyle: 'solid',
    height: 300,
  },

  sizeWall: {
    position: 'absolute',
  },
  wallTop: {
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
