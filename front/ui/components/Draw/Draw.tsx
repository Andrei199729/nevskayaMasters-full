import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {View, Text, StyleSheet, FlatList, ListRenderItem} from 'react-native';
import DrawElement from '../DrawElement/DrawElement';
import AddSizeWall from '../AddSizeWall/AddSizeWall';
import AddBlockDimensions from '../AddBlockDimensions/AddBlockDimensions';
import {IDrawing, Mode, StatusButton} from '../../../shared/types';
import {useDispatch, useSelector} from '../../../services/hooks';
import {
  clearPaths,
  clearPoints,
  notificationSaveRoom,
  setCountWallDraw,
  updateLastDrawingWalls,
} from '../../../services/actions/room';
import DrawingCanvas from '../DrawingCanvas/DrawingCanvas';
import InfoPanel from '../InfoPanel/InfoPanel';
import ButtonCustom from '../../../shared/ButtonCustom/ButtonCustom';
import {Colors, Fonts} from '../../../shared/tokens';

export default function Draw() {
  const dispatch = useDispatch();
  const [stateViewArea, setStateViewArea] = useState(true);
  // Хранит текущий путь, который пользователь рисует. currentPath
  // который будет хранить все AddBlockDimensions wallsData
  // Хранит массив объектов, каждый из которых представляет путь (path) и его длину. paths
  // Хранит все точки, используемые для вычислений, включая углы. points
  // Сохраняет последнюю точку, чтобы реализовать привязку при близком расположении. lastPoint
  // Количество стен countWallDraw
  // Открытие формы стены размеров openFormDataSize
  // клик на линию isStyleLine;
  const {wallsData, points, sizeWalls, countWallDraw, numberCurrentWall} =
    useSelector(state => state.room);

  const {openFormDataSize} = useSelector(state => state.modalOpen);

  // Функция для вычисления угла между тремя точками
  // Вычисляет угол между тремя точками с использованием скалярного произведения.
  // const calculateAngle = useCallback((p1: IPoint, p2: IPoint, p3: IPoint) => {
  //   if (!p1 || !p2 || !p3) {
  //     return 0; // Возвращаем 0, если хотя бы одна точка отсутствует
  //   }
  //   const v1x = p2.x - p1.x;
  //   const v1y = p2.y - p1.y;
  //   const v2x = p3.x - p2.x;
  //   const v2y = p3.y - p2.y;

  //   const dotProduct = v1x * v2x + v1y * v2y;
  //   const magnitudeV1 = Math.sqrt(v1x * v1x + v1y * v1y);
  //   const magnitudeV2 = Math.sqrt(v2x * v2x + v2y * v2y);

  //   if (magnitudeV1 === 0 || magnitudeV2 === 0) return 0;

  //   const angle = Math.acos(dotProduct / (magnitudeV1 * magnitudeV2));
  //   return angle * (180 / Math.PI);
  // }, []);

  // Показывает уведомление о сохранении.
  const saveDrawing = useCallback(() => {
    dispatch(notificationSaveRoom(points, wallsData));

    dispatch(setCountWallDraw(countWallDraw));
    // Очистка путей после сохранения
    setStateViewArea(false);
    dispatch(clearPaths());
    dispatch(clearPoints());
  }, [dispatch, points, wallsData, countWallDraw]);

  const handleSetCountWallDraw = useCallback(
    (count: number) => {
      dispatch(setCountWallDraw(count));
    },
    [dispatch],
  );

  useEffect(() => {
    // Обновляем количество линий для последнего рисунка
    if (sizeWalls.length > 0) {
      const lastDrawing = sizeWalls[sizeWalls.length - 1];
      dispatch(setCountWallDraw(lastDrawing?.drawingData?.shapes?.length));
    }
  }, [dispatch, sizeWalls]);

  useEffect(() => {
    if (wallsData.length === 0) return;
    dispatch(updateLastDrawingWalls(wallsData));
  }, [dispatch, wallsData]); // Срабатывает, когда изменяется wallsData

  const wallIndexes = useMemo(
    () => Array.from({length: countWallDraw}, (_, index) => index),
    [countWallDraw],
  );

  const renderWallItem: ListRenderItem<number> = useCallback(
    ({item: index}) => {
      const currentWall = index === numberCurrentWall;

      return (
        <View style={styles.blockWalls}>
          {/* {wallsData[index] && <Text>Редактировать стену №{index + 1}</Text>} */}
          <AddBlockDimensions
            key={index}
            index={index}
            numberWall={index + 1}
            currentWall={currentWall}
            mode={Mode.Edit}
          />
        </View>
      );
    },
    [numberCurrentWall],
  );

  const savedDrawingsElements = useMemo(
    () =>
      sizeWalls?.map((drawing: IDrawing, index: number) => {
        return (
          <DrawElement
            key={drawing?.drawingData?.numberWall}
            numberWallIndex={index}
            drawing={drawing?.drawingData}
            setCountWallDraw={() =>
              handleSetCountWallDraw(drawing?.drawingData?.shapes.length)
            }
          />
        );
      }),
    [handleSetCountWallDraw, sizeWalls],
  );

  return (
    <View style={styles.container}>
      <ButtonCustom
        textBtn={stateViewArea ? 'Сохранить рисунок' : 'Рисунок сохранён'}
        style={styles.buttonSave}
        fontsSize={Fonts.f18}
        onPress={saveDrawing}
        statusButton={StatusButton.SaveButton}
        bgStyleState={stateViewArea}
      />
      {stateViewArea ? <DrawingCanvas /> : null}
      <InfoPanel />

      {/* Отображение сохраненных фигур ниже */}
      <View style={styles.savedDrawingsContainer}>
        <Text style={styles.saveText}>Сохраненные стены:</Text>

        {Array.isArray(sizeWalls) && sizeWalls.length > 0 ? (
          savedDrawingsElements
        ) : (
          <Text style={styles.saveText}>Добавьте стены</Text> // Если массив пуст
        )}
        <FlatList
          horizontal
          data={wallIndexes}
          keyExtractor={item => item.toString()}
          renderItem={renderWallItem}
          ItemSeparatorComponent={() => <View style={styles.flatListStyle} />}
        />
        {openFormDataSize.isOpen && <AddSizeWall />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blockWalls: {
    marginBottom: 10,
  },
  savedDrawingsContainer: {
    width: '100%',
  },
  buttonSave: {
    width: 300,
    marginVertical: 20,
  },
  saveText: {
    marginVertical: 10,
    color: Colors.black,
    fontSize: Fonts.f24,
    fontFamily: Fonts.bold,
    fontWeight: '700',
  },
  flatListStyle: {
    width: 10,
  },
});
