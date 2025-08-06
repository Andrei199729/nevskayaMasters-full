import {FlatList, Text, View} from 'react-native';
import HeaderScreen from './HeaderScreen';
import MainScreen from './MainScreen';
import AddBlockDimensions from '../components/AddBlockDimensions/AddBlockDimensions';
import {useContext, useState} from 'react';
import {
  ClickSelection,
  IDrawing,
  IExternalSizeWall,
  IPaths,
  IWall,
  PathScreen,
  RootStackParamList,
} from '../../shared/types';
import DrawElement from '../components/DrawElement/DrawElement';
import IndexWallContext from '../../context/IndexWallContext/IndexWallContext';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
} from '@react-navigation/native';
import ButtonCustom from '../../shared/ButtonCustom/ButtonCustom';
import AddSizeWall from '../components/AddSizeWall/AddSizeWall';
import api from '../../utils/api';

type TProductScreenRouteProp = RouteProp<
  {ProductScreen: {productRoom: {dataProduct: IDrawing[]; nameRoom: string}}},
  'ProductScreen'
>;

interface IProductScreen {
  applicationNumber?: string;
  route: any;
}

export default function ProductScreen({route, ...props}: IProductScreen) {
  const {productRoom} = route.params || {};

  const navigation =
    useNavigation<
      NavigationProp<RootStackParamList, PathScreen.UnwrappedProduct>
    >();
  const [modalVisible, setModalVisible] = useState<number | boolean | null>(
    null,
  );
  const [modalVisibleBacklight, setModalVisibleBacklight] = useState<
    number | boolean | null
  >(null);
  const [dataEditWall, setDataEditWall] = useState<any>({
    id: 0,
    heightRight: '',
    heightLeft: '',
    widthTop: '',
    widthBottom: '',
    wallAngleDegree: '',
    radiusWall: '',
    valueDegree: '',
  });

  const [wallsData, setWallsData] = useState<IWall[]>([]); // который будет хранить все AddBlockDimensions
  const [sizeWalls, setSizeWalls] = useState<any>(productRoom.dataProduct);

  const [openFormDataSize, setOpenFormDataSize] = useState<boolean>(false);

  const isLast = (index: number, paths: IPaths[]) => index === paths.length - 1;
  const indexWallContext = useContext(IndexWallContext);

  if (!indexWallContext) {
    return null;
  }
  const {activeWallIndex, setActiveWallIndex} = indexWallContext;
  const openModalVisible = (wallIndex: number, index: number) => {
    const stateModal = wallIndex === index ? wallIndex : null;

    setModalVisible(stateModal);
    setModalVisibleBacklight(stateModal);
  };
  if (!productRoom || !productRoom.dataProduct) {
    // Обработать ошибку или вернуть заглушку
    return <Text>Нет данных для отображения</Text>;
  }

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
  ) => {
    // Логика, если клик был сделан на кнопку
    setActiveWallIndex(wallIndex);
    // setIsEditing(true); // Можно выполнять какие-то другие действия для кнопки
    onClickEditDataWall(size, wallIndex);

    setModalVisible(false);
    setModalVisibleBacklight(true);
    setOpenFormDataSize(true);

    // Логика по умолчанию (если нужно обработать другие случаи)
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

    // setIsStyleLine(true);
    // if (openFormDataSize) setIsStyleLine(false);
    // updateStrokeDasharray(numberWall - 1);
  };
  const onSaveDataWall = () => {
    if (!wallsData.length) {
      console.warn('⚠️ Нет данных для сохранения!');
      return;
    }

    if (!productRoom || !Array.isArray(productRoom.dataProduct)) {
      console.warn(
        '⚠️ Продукт не найден или dataProduct не является массивом!',
      );
      return;
    }
    const updatedDataProduct = productRoom.dataProduct.map(
      (drawing: {drawingData: {walls: any[]}}) => {
        const updatedWalls = drawing.drawingData.walls.map((wall: any) => {
          const updated = wallsData.find(w => w.numberWall === wall.numberWall);

          return updated
            ? {
                ...wall,
                size: {
                  ...updated.size,
                },
              }
            : wall;
        });

        return {
          ...drawing,
          drawingData: {
            ...drawing.drawingData,
            walls: updatedWalls,
          },
        };
      },
    );
    api
      .editProduct({dataProduct: updatedDataProduct}, productRoom._id)
      .then(({response}) => {
        navigation.goBack();
      })
      .catch(err => console.log(err));
  };

  return (
    <HeaderScreen>
      <MainScreen mainTitle={`Комната: ${productRoom.nameRoom}`}>
        {productRoom?.dataProduct
          .filter((room: {drawingData: any}) => room && room.drawingData)
          .map((room: IDrawing, index: number) => {
            return (
              <DrawElement
                key={index}
                drawing={room?.drawingData}
                isLast={isLast}
                numberWall={index}
                setCountWallDraw={() => {}}
                isStyleLine={false}
                openFormDataSize={false}
                setStrokeDasharrays={() => {}}
                onClickLine={() => {}}
              />
            );
          })}
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={productRoom?.dataProduct
            .filter((room: {drawingData: any}) => room && room.drawingData)
            .flatMap((room: IDrawing) =>
              room.drawingData.walls.map((wall: IWall, wallIndex: number) => ({
                ...wall,
                wallIndex,
              })),
            )}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item: wall, index}) => {
            const isActiveWall = wall.wallIndex === index;
            const safeArrElements = Array.isArray(
              wall?.size?.arrElements?.elements,
            )
              ? wall?.size?.arrElements?.elements
              : [];

            return (
              <View style={{flexDirection: 'column', marginHorizontal: 10}}>
                <AddBlockDimensions
                  numberWall={wall.wallIndex + 1}
                  arrElements={safeArrElements}
                  setNumberCurrentWall={setActiveWallIndex}
                  numberCurrentWall={activeWallIndex}
                  saveSizeWall={wallsData || {}}
                  setModalVisibleBacklight={setModalVisibleBacklight}
                  modalVisibleBacklight={
                    modalVisibleBacklight === wall.wallIndex
                  }
                  setModalVisible={setModalVisible}
                  modalVisible={modalVisible === wall.wallIndex}
                  onClickWallIncrease={() =>
                    openModalVisible(wall.wallIndex, index)
                  }
                  setIsVisibleEditModal={() => {}}
                  setSizeWalls={setSizeWalls}
                  onClickEditDataWall={() =>
                    onClickEditDataWall(wall?.size, index)
                  }
                  externalData={wall.size || {}}
                />
                <ButtonCustom
                  textBtn="Редактировать стену"
                  onPress={() => onClickWallIncrease(wall?.size, index)}
                />
              </View>
            );
          }}
        />
        {openFormDataSize && (
          <AddSizeWall
            numberWall={activeWallIndex}
            onSaveSizeWall={handleSaveWallSize}
            dataEditWall={dataEditWall}
            setModalVisibleBacklight={setModalVisibleBacklight}
            setOpenFormDataSize={setOpenFormDataSize}
          />
        )}
        <ButtonCustom textBtn="Сохранить комнату" onPress={onSaveDataWall} />
      </MainScreen>
    </HeaderScreen>
  );
}
