import React, {useCallback, useEffect, useMemo} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  ListRenderItem,
} from 'react-native';
import DrawElement from '../DrawElement/DrawElement';
import AddSizeWall from '../AddSizeWall/AddSizeWall';
import AddBlockDimensions from '../AddBlockDimensions/AddBlockDimensions';
import {IDrawing, IPoint, Mode} from '../../../shared/types';
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

export default function Draw() {
  const dispatch = useDispatch();
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
  const calculateAngle = useCallback((p1: IPoint, p2: IPoint, p3: IPoint) => {
    if (!p1 || !p2 || !p3) {
      return 0; // Возвращаем 0, если хотя бы одна точка отсутствует
    }
    const v1x = p2.x - p1.x;
    const v1y = p2.y - p1.y;
    const v2x = p3.x - p2.x;
    const v2y = p3.y - p2.y;

    const dotProduct = v1x * v2x + v1y * v2y;
    const magnitudeV1 = Math.sqrt(v1x * v1x + v1y * v1y);
    const magnitudeV2 = Math.sqrt(v2x * v2x + v2y * v2y);

    if (magnitudeV1 === 0 || magnitudeV2 === 0) return 0;

    const angle = Math.acos(dotProduct / (magnitudeV1 * magnitudeV2));
    return angle * (180 / Math.PI);
  }, []);

  // Показывает уведомление о сохранении.
  const saveDrawing = useCallback(() => {
    dispatch(notificationSaveRoom(points, wallsData));
    console.log(JSON.stringify(wallsData, null, 2), 'wallsData');

    dispatch(setCountWallDraw(countWallDraw));
    // Очистка путей после сохранения
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
      dispatch(setCountWallDraw(lastDrawing?.drawingData?.shapes?.length - 1));
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
        <View style={{flexDirection: 'column', gap: 5}}>
          {wallsData[index] && <Text>Редактировать стену №{index + 1}</Text>}
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
    [numberCurrentWall, wallsData],
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
      <Button title="Сохранить рисунок" onPress={saveDrawing} />
      <DrawingCanvas />
      <InfoPanel />
      {/* Отображение сохраненных фигур ниже */}
      <View style={styles.savedDrawingsContainer}>
        <Text>Сохраненные рисунки:</Text>

        {Array.isArray(sizeWalls) && sizeWalls.length > 0 ? (
          savedDrawingsElements
        ) : (
          <Text>Стен не существует</Text> // Если массив пуст
        )}
        <FlatList
          horizontal
          data={wallIndexes}
          keyExtractor={item => item.toString()}
          renderItem={renderWallItem}
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
    padding: 20,
  },
  savedDrawingsContainer: {
    marginTop: 20,
    width: '100%',
  },
});
