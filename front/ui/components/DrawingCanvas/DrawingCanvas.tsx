import React, {useCallback, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import Svg, {Circle, Path} from 'react-native-svg';
import LineSvg from '../../../shared/LineSvg/LineSvg';
import {Colors, Fonts} from '../../../shared/tokens';
import {DasharrayStrokeValue, IPoint} from '../../../shared/types';
import {useDispatch, useSelector} from '../../../services/hooks';
import {
  setCurrentPath,
  setLastPoint,
  setPaths,
  setPoints,
} from '../../../services/actions/room';

const DrawingCanvas = () => {
  const dispatch = useDispatch();
  const {currentPath, lastPoint, paths, points} = useSelector(
    state => state.room,
  );

  // Пороговое значение расстояния для автоматической привязки точек.
  const DISTANCE_THRESHOLD = 20; // Порог для автоматического соединения
  // Функция вычисляет длину линии между двумя точками по формуле расстояния.
  const calculateLength = useCallback((p1: IPoint, p2: IPoint) => {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
  }, []);
  // Проверка на близость двух точек
  // Проверяет, находятся ли две точки на расстоянии меньше DISTANCE_THRESHOLD
  const isNearPoint = useCallback(
    (point1: IPoint, point2: IPoint) => {
      const distance = calculateLength(point1, point2);
      return distance <= DISTANCE_THRESHOLD;
    },
    [calculateLength],
  );
  // Обработчик события при движении пальца
  const onGestureEvent = useCallback(
    (event: any) => {
      console.log(event, 'event');

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
    },
    [lastPoint, isNearPoint, currentPath, dispatch, points],
  );

  // Обработчик события завершения жеста (отпускание пальца)
  // Проверяет возможность замыкания линии и добавляет новый путь.

  const onGestureEnd = useCallback(() => {
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
  }, [
    currentPath,
    dispatch,
    lastPoint,
    calculateLength,
    paths,
    points,
    isNearPoint,
  ]);

  const renderedLines = useMemo(() => {
    /* Рендер всех линий */
    return paths.map((line, index) => {
      const pathParts = line.path.split(' ');
      const startCoords = pathParts[0].slice(1).split(',');
      const endCoords = pathParts[pathParts.length - 1].slice(1).split(',');

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
    });
  }, [paths]);

  return (
    <GestureHandlerRootView style={styles.drawingArea}>
      <View style={styles.drawingContainer}>
        <Svg style={StyleSheet.absoluteFill}>
          {renderedLines}

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
            <Circle cx={lastPoint.x} cy={lastPoint.y} r={5} fill={Colors.red} />
          )}
        </Svg>

        <PanGestureHandler
          onGestureEvent={onGestureEvent}
          onEnded={onGestureEnd}>
          <View style={StyleSheet.absoluteFill} />
        </PanGestureHandler>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
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
});

export default DrawingCanvas;
