import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {View, Text, Button, StyleSheet, FlatList} from 'react-native';
import {
  PanGestureHandler,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Svg, {Path, Circle} from 'react-native-svg';
import DrawElement from '../DrawElement/DrawElement';
import AddSizeWall from '../AddSizeWall/AddSizeWall';
import AddBlockDimensions from '../AddBlockDimensions/AddBlockDimensions';
import ButtonCustom from '../../../shared/ButtonCustom/ButtonCustom';
import {Colors, Fonts} from '../../../shared/tokens';
import {
  ClickSelection,
  DasharrayStrokeValue,
  IDrawing,
  IExternalSizeWall,
  IPaths,
  IPoint,
  IWall,
} from '../../../shared/types';
import LineSvg from '../../../shared/LineSvg/LineSvg';
interface IDraw {
  setSizeWalls: Dispatch<SetStateAction<IDrawing[]>>;
  sizeWalls: IDrawing[];
  setNumberCurrentWall: Dispatch<SetStateAction<number | boolean | null>>;
  numberCurrentWall: number | boolean | null;
  setModalVisibleBacklight: Dispatch<SetStateAction<number | boolean | null>>;
  modalVisibleBacklight: number | boolean | null;
}
export default function Draw({
  setSizeWalls,
  sizeWalls,
  setNumberCurrentWall,
  numberCurrentWall,
  setModalVisibleBacklight,
  modalVisibleBacklight,
}: IDraw) {
  const [modalVisible, setModalVisible] = useState<number | boolean | null>(
    false,
  );
  const [openFormDataSize, setOpenFormDataSize] = useState<boolean>(false);
  // Хранит массив объектов, каждый из которых представляет путь (path) и его длину.
  const [paths, setPaths] = useState<IPaths[]>([]);
  // массив стен

  // Хранит текущий путь, который пользователь рисует.
  const [currentPath, setCurrentPath] = useState<string>('');
  // Сохраняет последнюю точку, чтобы реализовать привязку при близком расположении.
  const [lastPoint, setLastPoint] = useState<IPoint | null>(null);
  // Хранит все точки, используемые для вычислений, включая углы.
  const [points, setPoints] = useState<IPoint[]>([]);
  // Хранит углы между линиями для отображения дополнительной информации.
  const [angles, setAngles] = useState<number[]>([]); // Массив углов между линиями

  const [countWallDraw, setCountWallDraw] = useState(0); // Количество стен
  const [wallsData, setWallsData] = useState<IWall[]>([]); // который будет хранить все AddBlockDimensions
  const [selectedLine, setSelectedLine] = useState<number | null>(null);

  const [indexLineWallDraw, setIndexLineWallDraw] = useState(0); // клик на линию
  const [isStyleLine, setIsStyleLine] = useState(false); // клик на линию
  const [strokeDasharrays, setStrokeDasharrays] = useState<{
    [key: number]: string;
  }>({});
  const [dataEditWall, setDataEditWall] = useState<IExternalSizeWall>({
    id: 0,
    heightRight: '',
    heightLeft: '',
    widthTop: '',
    widthBottom: '',
    wallAngleDegree: '',
    radiusWall: '',
    valueDegree: '',
  });

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
      setCurrentPath((prev: string) => {
        const newPath = `${prev} L${Math.round(adjustedPoint.x)},${Math.round(
          adjustedPoint.y,
        )}`;
        return newPath;
      }); // Добавляем точку в текущий путь.
    } else {
      // Если это первая точка новой линии, проверяем привязку
      const startPoint =
        points.length > 0 && isNearPoint(points[points.length - 1], {x, y})
          ? points[points.length - 1]
          : adjustedPoint;
      if (isNaN(startPoint.x) || isNaN(startPoint.y)) {
        return;
      }
      setCurrentPath(`M${startPoint.x},${startPoint.y}`); // Начало нового пути.
      setLastPoint(startPoint); // Устанавливаем первую точку.
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
          setPaths([...paths, {path: newPath, length: newLength}]); // Добавляем новый путь, если его еще нет в paths
          setPoints([...points, {x: startX, y: startY}, {x: endX, y: endY}]); // Обновляем точки
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
              setPaths(prevPaths => [
                ...prevPaths,
                {path: closingPath, length: newLength},
              ]);
            }
          }
        }
        // addLineToLastRoom(startX, startY, endX, endY);
      }
    }

    setCurrentPath('');
    setLastPoint(null);
  };

  // Показывает уведомление о сохранении.
  const saveDrawing = () => {
    setSizeWalls(prevDrawing => {
      // Определяем номер стены
      const numberWall = prevDrawing.length;
      const countWallDraw = paths.length;
      // Строим структуру для сохранения
      const drawingData = {
        numberWall,
        countWallDraw,
        shapes: paths.map((path, index) => ({
          id: index + 1,
          path: path.path, // Путь
          length: path.length, // Длина линии
          points: points, // Все точки на рисунке
        })),
        walls: wallsData,
      };

      // Обновляем состояние и передаём в `onSaveSizeWall`
      const newDrawing = [...prevDrawing, {drawingData}];
      return newDrawing;
    });

    setCountWallDraw(countWallDraw);
    // Очистка путей после сохранения
    setPaths([]);
  };
  const isLast = (index: number, paths: IPaths[]): boolean =>
    index === paths.length - 1;

  const handleSaveWallSize = (size: IExternalSizeWall, numberWall: number) => {
    if (!size) {
      console.warn('Нет данных для сохранения размера стены');
      return;
    }

    // Убедимся, что все поля имеют строковые значения
    const normalizedSize = {
      ...size,
      heightRight: size.heightRight || '', // Заменяем undefined на пустую строку
      heightLeft: size.heightLeft || '',
      widthTop: size.widthTop || '',
      widthBottom: size.widthBottom || '',
      wallAngleDegree: size.wallAngleDegree || '',
      radiusWall: size.radiusWall || '',
      valueDegree: size.valueDegree || '',
    };

    setWallsData(prevWalls => {
      const updatedWalls = prevWalls.map(wall =>
        wall.numberWall === numberWall - 1
          ? {...wall, size: normalizedSize}
          : wall,
      );
      return prevWalls.some(wall => wall.numberWall === numberWall - 1)
        ? updatedWalls
        : [...prevWalls, {size: normalizedSize, numberWall: numberWall - 1}];
    });

    setIsStyleLine(true);
    if (openFormDataSize) setIsStyleLine(false);
    updateStrokeDasharray(numberWall - 1);
  };

  const onClickLine = (index: number) => {
    setSelectedLine(prev => (prev === index ? null : index));
    setIndexLineWallDraw(index);
  };

  const [isEditing, setIsEditing] = useState(false); //состояние для редактирования

  const onClickEditDataWall = (
    size: IExternalSizeWall | undefined,
    currentWall: number,
  ) => {
    if (!size) {
      return [];
    } else {
      setDataEditWall(size);
    }
  };

  const onClickWallIncrease = (
    size: IExternalSizeWall | undefined,
    wallIndex: number,
    click: ClickSelection.Wall | ClickSelection.Button,
  ) => {
    switch (click) {
      case ClickSelection.Wall:
        // Логика, если клик был сделан на стену
        setNumberCurrentWall(wallIndex);
        onClickLine(wallIndex);

        setIsEditing(false);

        if (size) {
          setModalVisible(true);
          setModalVisibleBacklight(false);
          setOpenFormDataSize(false);
        } else {
          setModalVisible(false);
          setModalVisibleBacklight(true);
          setOpenFormDataSize(true);
        }

        break;

      case ClickSelection.Button:
        // Логика, если клик был сделан на кнопку
        setNumberCurrentWall(wallIndex);
        setIsEditing(true); // Можно выполнять какие-то другие действия для кнопки
        onClickEditDataWall(size, wallIndex);

        setModalVisible(false);
        setModalVisibleBacklight(true);
        setOpenFormDataSize(true);

        break;

      default:
        // Логика по умолчанию (если нужно обработать другие случаи)
        break;
    }
  };
  //
  // Функция для обновления состояния strokeDasharray
  const updateStrokeDasharray = (index: number) => {
    setStrokeDasharrays(prev => {
      const newDasharray = prev[index] === '0' ? '10' : '0'; // Пример: переключаем между '10' и '0'
      return {...prev, [index]: newDasharray};
    });
  };

  useEffect(() => {
    // Обновляем количество линий для последнего рисунка
    if (sizeWalls.length > 0) {
      const lastDrawing = sizeWalls[sizeWalls.length - 1];
      setCountWallDraw(lastDrawing?.drawingData?.shapes?.length - 1);
    }
  }, [sizeWalls]);

  useEffect(() => {
    if (wallsData.length === 0) return;

    setSizeWalls(prevSizeWalls => {
      const updatedWalls = prevSizeWalls.map(
        (drawing: IDrawing, index: number) => {
          if (index === prevSizeWalls.length - 1) {
            return {
              ...drawing,
              drawingData: {
                ...drawing.drawingData,
                walls: [...wallsData], // Синхронизируем wallsData с drawingData
              },
            };
          }
          return drawing;
        },
      );

      return updatedWalls;
    });
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
                    isLast={isLast}
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
                numberWall={index}
                drawing={drawing?.drawingData}
                isLast={isLast}
                setCountWallDraw={() =>
                  setCountWallDraw(drawing?.drawingData?.shapes.length)
                }
                onClickLine={onClickLine}
                selectedLine={selectedLine}
                isStyleLine={isStyleLine}
                openFormDataSize={openFormDataSize}
                setStrokeDasharrays={setStrokeDasharrays}
                strokeDasharrays={strokeDasharrays}
              />
            );
          })
        ) : (
          <Text>No walls to display</Text> // Если массив пуст
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
                  numberWall={index + 1}
                  setSizeWalls={setSizeWalls}
                  setNumberCurrentWall={setNumberCurrentWall}
                  numberCurrentWall={numberCurrentWall}
                  setModalVisibleBacklight={setModalVisibleBacklight}
                  modalVisibleBacklight={modalVisibleBacklight && currentWall}
                  saveSizeWall={wallsData || {}}
                  setModalVisible={setModalVisible}
                  modalVisible={modalVisible && currentWall}
                  onClickEditDataWall={onClickEditDataWall}
                  onClickWallIncrease={onClickWallIncrease}
                  setIsVisibleEditModal={() => {}}
                  externalData={undefined}
                />
                {wallsData[index]?.size && (
                  <ButtonCustom
                    textBtn="Редактировать стену"
                    onPress={() =>
                      onClickWallIncrease(
                        wallsData[index]?.size,
                        index,
                        ClickSelection.Button,
                      )
                    }
                  />
                )}
              </View>
            );
          }}
        />
        {openFormDataSize && (
          <AddSizeWall
            numberWall={numberCurrentWall}
            onSaveSizeWall={handleSaveWallSize}
            dataEditWall={dataEditWall}
            setModalVisibleBacklight={setModalVisibleBacklight}
            setOpenFormDataSize={setOpenFormDataSize}
          />
        )}
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
