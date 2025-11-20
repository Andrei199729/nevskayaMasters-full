import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useMemo} from 'react';
import {Colors, Fonts, Radius} from '../../../shared/tokens';
import {
  ClickButtonBlockDimensions,
  ClickSelection,
  IAddBlockDimensions,
  IElementWallRoom,
  IWallSize,
  Mode,
  TClickButtonBlockDimensions,
} from '../../../shared/types';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import ModalWall from '../ModalWall/ModalWall';
import BlockStateElements from '../BlockStateElements/BlockStateElements';
import SizeWallText from '../../../shared/SizeWallText/SizeWallText';
import {useDispatch, useSelector} from '../../../services/hooks';
import {
  setClickDataWall,
  setDataEditWall,
  setNumberCurrentWall,
} from '../../../services/actions/room';
import ButtonCustom from '../../../shared/ButtonCustom/ButtonCustom';
import {setSelectedLine} from '../../../services/actions/draw';
import {
  setModalVisible,
  setModalVisibleBacklight,
  setOpenFormDataSize,
} from '../../../services/actions/modalOpen';

export default function AddBlockDimensions({
  numberWall,
  externalData,
  currentWall,
  mode,
}: IAddBlockDimensions) {
  const dispatch = useDispatch();
  const {clickDataWall, elementsData, wallsData} = useSelector(
    state => state.room,
  );

  const {modalVisibleBacklight} = useSelector(state => state.modalOpen);

  const wallIndex = numberWall - 1;

  const size = wallsData?.[wallIndex]?.size;

  const widthTop = size?.widthTop || externalData?.widthTop;
  const widthBottom = size?.widthBottom || externalData?.widthBottom;
  const heightRight = size?.heightRight || externalData?.heightRight;
  const heightLeft = size?.heightLeft || externalData?.heightLeft;
  const radiusWall = size?.radiusWall || externalData?.radiusWall;
  const wallAngleDegree =
    size?.wallAngleDegree || externalData?.wallAngleDegree;

  const roomRanderSize: IWallSize = ClickSelection.Button
    ? externalData || ({} as IWallSize)
    : size || ({} as IWallSize);

  const onClickDataWall = useCallback(
    (isVisible: boolean, nameButton: TClickButtonBlockDimensions) => {
      dispatch(setClickDataWall({isVisible, nameButton}));
    },
    [dispatch],
  );

  const onClickWallIncrease = useCallback(
    (
      size: IWallSize,
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
          // 2. Закрываем текущее модальное
          dispatch(setModalVisible({isVisible: false, wallNumber: null}));
          // 3. Включаем подсветку
          dispatch(setModalVisibleBacklight(true));
          // 4. Открываем форму для ввода размера стены
          dispatch(
            setOpenFormDataSize({
              isOpen: true,
              wallNumber,
            }),
          );
          // 5. Если есть размер — передаем данные для редактирования
          if (size) {
            dispatch(
              setDataEditWall({
                dataEditWall: size,
                currentWall: wallNumber,
              }),
            );
          } else {
            return [];
          }
          break;
        default:
          // Логика по умолчанию (если нужно обработать другие случаи)
          break;
      }
    },
    [dispatch],
  );

  const elementsForCurrentWall = useMemo(() => {
    return elementsData.filter(el => el.id === numberWall - 1);
  }, [elementsData, numberWall]);

  const elementsToRender = useMemo(() => {
    return mode === Mode.Edit
      ? elementsForCurrentWall
      : externalData?.arrElements?.elements ?? [];
  }, [mode, elementsForCurrentWall, externalData?.arrElements?.elements]);

  return (
    <SafeAreaProvider>
      <ModalWall
        numberWall={numberWall}
        externalData={externalData}
        wallIndex={wallIndex}
        currentWall={currentWall}
        mode={mode}
        elementsToRender={elementsToRender}
      />

      <Pressable
        style={styles.blockWall}
        onPress={() =>
          onClickWallIncrease(
            externalData || size,
            wallIndex,
            ClickSelection.Wall,
          )
        }>
        <View style={styles.blockContainerWall}>
          <Text style={styles.textDimensions}>Стена №{numberWall}</Text>
          <View style={[styles.wallBlock, styles.addedWall]}>
            {
              <View style={styles.dataWall}>
                <Pressable
                  onPress={() =>
                    onClickDataWall(
                      !clickDataWall.width,
                      ClickButtonBlockDimensions.Width,
                    )
                  }>
                  <View style={styles.blockView}>
                    <View style={styles.blockViewData}>
                      <Text style={[styles.viewDataText, styles.tc]}>
                        Ширина стены
                      </Text>
                    </View>
                    {clickDataWall.width && (
                      <View style={styles.blockViewData}>
                        <View>
                          <Text style={styles.viewDataText}>
                            Ширина сверху:
                          </Text>
                          <Text style={styles.viewDataText}>{widthTop}</Text>
                        </View>
                        <View>
                          <Text style={styles.viewDataText}>Ширина снизу:</Text>
                          <Text style={styles.viewDataText}>{widthBottom}</Text>
                        </View>
                        <View>
                          <Text style={styles.viewDataText}>
                            Внутренний радиус:
                          </Text>
                          {radiusWall ? (
                            <>
                              <View
                                style={[
                                  styles.sizeWall,
                                  styles.borderLineAngle,
                                ]}></View>
                              <View
                                style={[styles.sizeWall, styles.radiusWall]}>
                                <Text style={styles.viewDataText}>
                                  {radiusWall}
                                </Text>
                              </View>
                            </>
                          ) : (
                            <Text style={styles.viewDataText}>Нет</Text>
                          )}
                        </View>
                      </View>
                    )}
                  </View>
                </Pressable>
                <Pressable
                  onPress={() =>
                    onClickDataWall(
                      !clickDataWall.height,
                      ClickButtonBlockDimensions.Height,
                    )
                  }>
                  <View style={styles.blockView}>
                    <View style={styles.blockViewData}>
                      <Text style={[styles.viewDataText, styles.tc]}>
                        Высота стены
                      </Text>
                    </View>
                    {clickDataWall.height && (
                      <View style={styles.blockViewData}>
                        <View>
                          <Text style={styles.viewDataText}>
                            Высота справа:
                          </Text>
                          <Text style={styles.viewDataText}>{heightRight}</Text>
                        </View>
                        <View>
                          <Text style={styles.viewDataText}>Высота слева:</Text>
                          <Text style={styles.viewDataText}>{heightLeft}</Text>
                        </View>
                        <View>
                          <Text style={styles.viewDataText}>
                            Градус угла стены:
                          </Text>
                          <View>
                            {wallAngleDegree ? (
                              <Text style={styles.viewDataText}>
                                {wallAngleDegree}
                              </Text>
                            ) : null}
                          </View>
                        </View>
                      </View>
                    )}
                  </View>
                </Pressable>
                <Pressable
                  onPress={() =>
                    onClickDataWall(
                      !clickDataWall.elements,
                      ClickButtonBlockDimensions.Elements,
                    )
                  }>
                  <View style={styles.blockView}>
                    <View style={styles.blockViewData}>
                      <Text style={[styles.viewDataText, styles.tc]}>
                        Элементы стены
                      </Text>
                    </View>
                    {clickDataWall.elements && (
                      <View style={styles.blockViewData}>
                        {elementsToRender.length > 0 ? (
                          elementsToRender.map(
                            (element: IElementWallRoom, index: number) => {
                              return (
                                <BlockStateElements
                                  key={index}
                                  nameElement={
                                    element?.dataObj?.nameElement || 'Без имени'
                                  }
                                  stateElement={
                                    element?.dataObj?.stateElement ||
                                    'Не задано'
                                  }
                                  position={index}
                                  // onPressVisible={() => {}}
                                />
                              );
                            },
                          )
                        ) : (
                          <Text style={styles.viewDataText}>
                            Добавьте элементы
                          </Text>
                        )}
                      </View>
                    )}
                  </View>
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
                <View style={[styles.sizeWall, styles.borderLineAngle]}></View>
                <SizeWallText
                  wallPosition={styles.radiusWall}
                  dataText={radiusWall}
                />
              </>
            )}
          </View>
          <View>
            {wallAngleDegree ? (
              <Text style={styles.viewDataText}>{wallAngleDegree}</Text>
            ) : null}
          </View>
        </View>
      </Pressable>
      <ButtonCustom
        textBtn="Редактировать стену"
        onPress={() =>
          onClickWallIncrease(roomRanderSize, wallIndex, ClickSelection.Button)
        }
      />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  wallBlock: {
    width: '100%',
    backgroundColor: Colors.lightGray,
    borderRadius: Radius.r10,
  },
  addedWall: {
    position: 'relative',
    width: 510,
    flex: 1,
    height: 400,
  },

  dataWall: {
    flexDirection: 'row',
    width: '100%',
  },

  viewDataText: {
    color: Colors.black,
    fontSize: Fonts.f14,
  },

  tc: {
    textAlign: 'center',
  },

  blockView: {
    margin: 15,
    gap: 10,
  },

  blockViewData: {
    width: 138,
    padding: 5,
    borderBlockColor: Colors.black,
    borderWidth: 2,
    borderRadius: 3,
    backgroundColor: Colors.white,
  },

  sizeWall: {
    position: 'absolute',
  },

  wallTop: {
    left: '50%',
    top: '15%',
    zIndex: -1,
  },
  wallRight: {
    right: '5%',
    top: '50%',
    transform: [{translateY: -10}],
    zIndex: -1,
  },
  wallBottom: {
    bottom: '5%',
    left: '50%',
    zIndex: -1,
  },
  wallLeft: {
    top: '50%',
    left: '5%',
    transform: [{translateY: -10}],
    zIndex: -1,
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
    fontSize: Fonts.f16,
    textAlign: 'center',
    fontFamily: Fonts.medium,
    fontWeight: '700',
  },

  blockWall: {
    flex: 1,
  },

  blockContainerWall: {
    gap: 10,
  },
});
