import React, {useEffect, useState} from 'react';
import {View, Text, Button, StyleSheet, FlatList} from 'react-native';
import {
  PanGestureHandler,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Svg, {Path, Circle} from 'react-native-svg';
import DrawElement from '../DrawElement/DrawElement';
import AddSizeWall from '../AddSizeWall/AddSizeWall';
import AddBlockDimensions from '../AddBlockDimensions/AddBlockDimensions';
import {Colors, Fonts} from '../../../shared/tokens';
import {
  DasharrayStrokeValue,
  IDrawing,
  IPoint,
  Mode,
} from '../../../shared/types';
import LineSvg from '../../../shared/LineSvg/LineSvg';
import {useDispatch, useSelector} from '../../../services/hooks';
import {
  clearPaths,
  clearPoints,
  notificationSaveRoom,
  setCountWallDraw,
  setCurrentPath,
  setLastPoint,
  setPaths,
  setPoints,
  updateLastDrawingWalls,
} from '../../../services/actions/room';

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
  const {
    wallsData,
    currentPath,
    lastPoint,
    paths,
    points,
    sizeWalls,
    countWallDraw,
    numberCurrentWall,
  } = useSelector(state => state.room);

  const {openFormDataSize} = useSelector(state => state.modalOpen);

  // Хранит углы между линиями для отображения дополнительной информации.
  const [angles, setAngles] = useState<number[]>([]); // Массив углов между линиями

  // Пороговое значение расстояния для автоматической привязки точек.
  const DISTANCE_THRESHOLD = 20; // Порог для автоматического соединения
  // Функция вычисляет длину линии между двумя точками по формуле расстояния.
  const calculateLength = (p1: IPoint, p2: IPoint) => {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
  };
  // Проверка на близость двух точек
  // Проверяет, находятся ли две точки на расстоянии меньше DISTANCE_THRESHOLD
  const isNearPoint = (point1: IPoint, point2: IPoint) => {
    const distance = calculateLength(point1, point2);
    return distance <= DISTANCE_THRESHOLD;
  };
  // Функция для вычисления угла между тремя точками
  // Вычисляет угол между тремя точками с использованием скалярного произведения.
  const calculateAngle = (p1: IPoint, p2: IPoint, p3: IPoint) => {
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
  };

  // Обработчик события при движении пальца
  const onGestureEvent = (event: any) => {
    const {x, y} = event.nativeEvent; // Получаем координаты текущего жеста.
    if (isNaN(x) || isNaN(y)) {
      console.warn('Invalid coordinates: x and y must be numbers');
      return; // Прерываем выполнение, если координаты некорректны
    }
    let adjustedPoint = {x, y}; // Точка для добавления.

    if (lastPoint && isNearPoint(lastPoint, {x, y})) {
      // Привязываем к последней точке, если пользователь рядом
      adjustedPoint = lastPoint;
    }

    if (lastPoint) {
      const newPath = `${currentPath} L${Math.round(
        adjustedPoint.x,
      )},${Math.round(adjustedPoint.y)}`;
      dispatch(setCurrentPath(newPath));
      // Добавляем точку в текущий путь.
    } else {
      // Если это первая точка новой линии, проверяем привязку
      const startPoint =
        points.length > 0 && isNearPoint(points[points.length - 1], {x, y})
          ? points[points.length - 1]
          : adjustedPoint;
      const startNewPath = `M${startPoint.x},${startPoint.y}`;
      if (isNaN(startPoint.x) || isNaN(startPoint.y)) {
        return;
      }

      dispatch(setLastPoint(startPoint)); // Устанавливаем первую точку.
      // Начало нового пути.
      dispatch(setCurrentPath(startNewPath));
    }
  };

  // Обработчик события завершения жеста (отпускание пальца)
  // Проверяет возможность замыкания линии и добавляет новый путь.

  const onGestureEnd = () => {
    if (currentPath) {
      const pathParts = currentPath.split(' ');
      const firstCoords = pathParts[0].slice(1).split(',');
      const lastCoords = pathParts[pathParts.length - 1].slice(1).split(',');
      const startX = Math.round(parseFloat(firstCoords[0]));
      const startY = Math.round(parseFloat(firstCoords[1]));
      const endX = Math.round(parseFloat(lastCoords[0]));
      const endY = Math.round(parseFloat(lastCoords[1]));

      if (!isNaN(endX) && !isNaN(endY) && lastPoint) {
        const newLength = Math.round(
          calculateLength(lastPoint, {x: endX, y: endY}),
        );

        // Проверка, добавляем ли мы новый путь
        const newPath = `M${startX},${startY} L${endX},${endY}`;
        const pathExists = paths.some(path => path.path === newPath); // Проверяем, существует ли такой путь

        if (!pathExists) {
          dispatch(setPaths(newPath, newLength)); // Добавляем новый путь, если его еще нет в paths
          dispatch(setPoints(startX, startY, endX, endY)); // Обновляем точки
        }

        // Проверяем замыкание линии на начальную точку первой линии
        if (points.length > 0) {
          const firstPoint = points[0]; // Начальная точка первой линии

          if (isNearPoint({x: endX, y: endY}, firstPoint)) {
            // Добавляем линию, замыкающую путь
            const closingPath = `M${endX},${endY} L${firstPoint.x},${firstPoint.y}`;
            const closingPathExists = paths.some(
              path => path.path === closingPath,
            );

            if (!closingPathExists) {
              dispatch(setPaths(closingPath, newLength));
            }
          }
        }
        // addLineToLastRoom(startX, startY, endX, endY);
      }
    }

    dispatch(setCurrentPath(''));
    dispatch(setLastPoint(null));
  };

  // Показывает уведомление о сохранении.
  const saveDrawing = () => {
    dispatch(notificationSaveRoom(points, wallsData));
    dispatch(setCountWallDraw(countWallDraw));
    // Очистка путей после сохранения
    dispatch(clearPaths());
    dispatch(clearPoints());
  };

  useEffect(() => {
    // Обновляем количество линий для последнего рисунка
    if (sizeWalls.length > 0) {
      const lastDrawing = sizeWalls[sizeWalls.length - 1];
      dispatch(setCountWallDraw(lastDrawing?.drawingData?.shapes?.length - 1));
    }
  }, [sizeWalls]);

  useEffect(() => {
    if (wallsData.length === 0) return;
    dispatch(updateLastDrawingWalls(wallsData));
  }, [wallsData]); // Срабатывает, когда изменяется wallsData

  return (
    <View style={styles.container}>
      <Button title="Сохранить рисунок" onPress={saveDrawing} />

      <GestureHandlerRootView style={styles.drawingArea}>
        <View style={styles.drawingContainer}>
          <Svg style={StyleSheet.absoluteFill}>
            {/* Рендер всех линий */}
            {paths.map((line, index) => {
              const pathParts = line.path.split(' ');
              const startCoords = pathParts[0].slice(1).split(',');
              const endCoords = pathParts[pathParts.length - 1]
                .slice(1)
                .split(',');

              const startX = parseFloat(startCoords[0]);
              const startY = parseFloat(startCoords[1]);
              const endX = parseFloat(endCoords[0]);
              const endY = parseFloat(endCoords[1]);

              const safeStartX = isNaN(startX) ? 0 : startX;
              const safeStartY = isNaN(startY) ? 0 : startY;
              const safeEndX = isNaN(endX) ? 0 : endX;
              const safeEndY = isNaN(endY) ? 0 : endY;

              const midX = (safeStartX + safeEndX) / 2;
              const midY = (safeStartY + safeEndY) / 2;

              // Определяем позицию текста (примерно в середине линии)
              // Проверяем, является ли текущая линия последней

              return (
                <React.Fragment key={index}>
                  <LineSvg
                    d={line.path}
                    stroke={Colors.black}
                    strokeWidth={4}
                    strokeDasharray={DasharrayStrokeValue.Dotted}
                    indexLast={index}
                    indexPaths={paths}
                    midX={midX - 10}
                    midY={midY - 5}
                    fontSize={Fonts.f14}
                    fillSvg={'blue'}
                    fillPath={'none'}
                    textAnchor={'middle'}
                  />
                </React.Fragment>
              );
            })}

            {/* Рендер текущей линии */}
            {currentPath ? (
              <Path
                d={currentPath}
                stroke={Colors.black}
                strokeWidth={4}
                fill="none"
                strokeDasharray={DasharrayStrokeValue.Dotted}
              />
            ) : null}

            {/* Подсветка конечной точки */}
            {lastPoint && (
              <Circle
                cx={lastPoint.x}
                cy={lastPoint.y}
                r={5}
                fill={Colors.red}
              />
            )}
          </Svg>

          <PanGestureHandler
            onGestureEvent={onGestureEvent}
            onEnded={onGestureEnd}>
            <View style={StyleSheet.absoluteFill} />
          </PanGestureHandler>
        </View>
      </GestureHandlerRootView>

      <View style={styles.infoContainer}>
        {paths.map((line, index) => (
          <View key={index}>
            <Text>
              Линия {index + 1}: Длина = {line.length.toFixed(2)} единиц
            </Text>
            {index > 0 &&
              points[index - 1] &&
              points[index] &&
              angles[index - 1] !== undefined && (
                <Text>
                  Угол с предыдущей линией ={' '}
                  {angles[index - 1] ? angles[index - 1].toFixed(2) : 'N/A'}°
                </Text>
              )}
          </View>
        ))}
      </View>
      {/* Отображение сохраненных фигур ниже */}
      <View style={styles.savedDrawingsContainer}>
        <Text>Сохраненные рисунки:</Text>

        {Array.isArray(sizeWalls) && sizeWalls.length > 0 ? (
          sizeWalls?.map((drawing: IDrawing, index: number) => {
            return (
              <DrawElement
                key={index}
                numberWallIndex={index}
                drawing={drawing?.drawingData}
                setCountWallDraw={() =>
                  dispatch(
                    setCountWallDraw(drawing?.drawingData?.shapes.length),
                  )
                }
              />
            );
          })
        ) : (
          <Text>Стен не существует</Text> // Если массив пуст
        )}
        <FlatList
          horizontal
          data={Array.from({length: countWallDraw}, (_, index) => index)}
          keyExtractor={item => item.toString()}
          renderItem={({item: index}) => {
            const currentWall = index === numberCurrentWall;

            return (
              <View style={{flexDirection: 'column', gap: 5}}>
                {wallsData[index] && (
                  <Text>Редактировать стену №{index + 1}</Text>
                )}
                <AddBlockDimensions
                  key={index}
                  index={index}
                  numberWall={index + 1}
                  currentWall={currentWall}
                  externalData={undefined}
                  mode={Mode.Edit}
                />
              </View>
            );
          }}
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
  drawingArea: {
    flex: 1,
    width: '100%',
    height: 400,
    backgroundColor: '#f0f0f0',
  },
  drawingContainer: {
    flex: 1,
    borderColor: 'red',
    borderWidth: 3,
  },
  infoContainer: {
    marginTop: 20,
  },
  savedDrawingsContainer: {
    marginTop: 20,
    width: '100%',
  },
  savedDrawing: {
    width: '100%',
    height: 200,
    marginVertical: 10,
  },
  contentContainer: {
    gap: 5,
    flexGrow: 1,
  },
});
