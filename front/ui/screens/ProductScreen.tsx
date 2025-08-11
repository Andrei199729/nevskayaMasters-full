import {FlatList, Text, View} from 'react-native';
import HeaderScreen from './HeaderScreen';
import MainScreen from './MainScreen';
import AddBlockDimensions from '../components/AddBlockDimensions/AddBlockDimensions';
import {useState} from 'react';
import {
  IDrawing,
  IExternalSizeWall,
  IWall,
  PathScreen,
  RootStackParamList,
} from '../../shared/types';
import DrawElement from '../components/DrawElement/DrawElement';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
} from '@react-navigation/native';
import ButtonCustom from '../../shared/ButtonCustom/ButtonCustom';
import AddSizeWall from '../components/AddSizeWall/AddSizeWall';
import api from '../../utils/api';
import {useDispatch, useSelector} from '../../services/hooks';
import {setCountWallDraw} from '../../services/actions/room';

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
  const dispatch = useDispatch();
  const {numberCurrentWall, wallsData} = useSelector(state => state.room);
  const {openFormDataSize} = useSelector(state => state.modalOpen);
  const {dataWall} = useSelector(state => state.draw);

  const navigation =
    useNavigation<
      NavigationProp<RootStackParamList, PathScreen.UnwrappedProduct>
    >();

  if (!productRoom || !productRoom.dataProduct) {
    // Обработать ошибку или вернуть заглушку
    return <Text>Нет данных для отображения</Text>;
  }

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
                numberWallIndex={index}
                setCountWallDraw={() =>
                  dispatch(setCountWallDraw(room?.drawingData?.shapes.length))
                }
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
            // const safeArrElements = Array.isArray(
            //   wall?.size?.arrElements?.elements,
            // )
            //   ? wall?.size?.arrElements?.elements
            //   : [];
            const currentWall = index === numberCurrentWall;

            return (
              <View style={{flexDirection: 'column', marginHorizontal: 10}}>
                <AddBlockDimensions
                  numberWall={wall.wallIndex + 1}
                  saveSizeWall={wallsData || {}}
                  externalData={wall.size || {}}
                  index={index}
                  currentWall={currentWall}
                />
              </View>
            );
          }}
        />
        {openFormDataSize && <AddSizeWall dataEditWall={dataWall} />}
      </MainScreen>
    </HeaderScreen>
  );
}
