import {FlatList, StyleSheet, Text, View} from 'react-native';
import AddBlockDimensions from '../AddBlockDimensions/AddBlockDimensions';
import ButtonCustom from '../../../shared/ButtonCustom/ButtonCustom';
import {
  IDrawing,
  ClickSelection,
  IExternalSizeWall,
} from '../../../shared/types';
import AddSizeWall from '../AddSizeWall/AddSizeWall';
import {useState} from 'react';

export default function AddBlockDimensionsContainer({
  setNumberCurrentWall,
  onClickLine,
  setIsEditing,
  setModalVisible,
  setModalVisibleBacklight,
  setOpenFormDataSize,
  //   onClickEditDataWall,
  openFormDataSize,
  numberCurrentWall,
  wallsData,
  setSizeWalls,
  modalVisibleBacklight,
  modalVisible,
  //   dataEditWall,
  setWallsData,
  data,
  setIsStyleLine,
  setStrokeDasharrays,
}: //   updateStrokeDasharray,
any) {
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
  //   const [isStyleLine, setIsStyleLine] = useState(false); // клик на линию
  const updateStrokeDasharray = (index: number) => {
    setStrokeDasharrays((prev: string[]) => {
      const newDasharray = prev[index] === '0' ? '10' : '0'; // Пример: переключаем между '10' и '0'
      return {...prev, [index]: newDasharray};
    });
  };
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

    setWallsData((prevWalls: any[]) => {
      const updatedWalls = prevWalls.map((wall: {numberWall: number}) =>
        wall.numberWall === numberWall - 1
          ? {...wall, size: normalizedSize}
          : wall,
      );
      return prevWalls.some(
        (wall: {numberWall: number}) => wall.numberWall === numberWall - 1,
      )
        ? updatedWalls
        : [...prevWalls, {size: normalizedSize, numberWall: numberWall - 1}];
    });

    setIsStyleLine(true);
    if (openFormDataSize) setIsStyleLine(false);
    updateStrokeDasharray(numberWall - 1);
  };

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
  return (
    <View style={styles.savedDrawingsContainer}>
      <Text>Сохраненные рисунки:</Text>

      <FlatList
        horizontal
        data={data}
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
