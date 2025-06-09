import {FlatList, Text} from 'react-native';
import HeaderScreen from './HeaderScreen';
import MainScreen from './MainScreen';
import AddBlockDimensions from '../components/AddBlockDimensions/AddBlockDimensions';
import {useContext, useState} from 'react';
import {IDrawing, IPaths, IWall} from '../../shared/types';
import DrawElement from '../components/DrawElement/DrawElement';
import IndexWallContext from '../../context/IndexWallContext/IndexWallContext';
import {RouteProp} from '@react-navigation/native';

type TProductScreenRouteProp = RouteProp<
  {ProductScreen: {productRoom: {dataProduct: IDrawing[]; nameRoom: string}}},
  'ProductScreen'
>;

interface IProductScreen {
  applicationNumber?: string;
  route: any;
}

export default function ProductScreen({route, ...props}: IProductScreen) {
  const [modalVisible, setModalVisible] = useState<number | boolean | null>(
    null,
  );
  const [modalVisibleBacklight, setModalVisibleBacklight] = useState<
    number | boolean | null
  >(null);

  const {productRoom} = route.params || {};
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
  // console.log(JSON.stringify(productRoom, null, 2), 'productRoom');

  return (
    <HeaderScreen>
      <MainScreen mainTitle={`Комната: ${productRoom.nameRoom}`}>
        {productRoom?.dataProduct.map((room: IDrawing, index: number) => {
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
          data={productRoom?.dataProduct.flatMap((room: IDrawing) =>
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
              <AddBlockDimensions
                numberWall={wall.wallIndex + 1}
                arrElements={safeArrElements}
                setNumberCurrentWall={setActiveWallIndex}
                numberCurrentWall={activeWallIndex}
                saveSizeWall={undefined}
                setModalVisibleBacklight={setModalVisibleBacklight}
                modalVisibleBacklight={modalVisibleBacklight === wall.wallIndex}
                setModalVisible={setModalVisible}
                modalVisible={modalVisible === wall.wallIndex}
                onClickWallIncrease={() =>
                  openModalVisible(wall.wallIndex, index)
                }
                setIsVisibleEditModal={() => {}}
                setSizeWalls={() => {}}
                onClickEditDataWall={() => {}}
                externalData={wall.size || {}}
              />
            );
          }}
        />
      </MainScreen>
    </HeaderScreen>
  );
}
