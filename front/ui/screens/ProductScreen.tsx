import {FlatList, View} from 'react-native';
import HeaderScreen from './HeaderScreen';
import MainScreen from './MainScreen';
import AddBlockDimensions from '../components/AddBlockDimensions/AddBlockDimensions';
import {
  IDrawing,
  IProductRoom,
  IWall,
  Mode,
  PathScreen,
  RootStackParamList,
} from '../../shared/types';
import DrawElement from '../components/DrawElement/DrawElement';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import AddSizeWall from '../components/AddSizeWall/AddSizeWall';
import {useDispatch, useSelector} from '../../services/hooks';
import {editRoom, setCountWallDraw} from '../../services/actions/room';
import ButtonCustom from '../../shared/ButtonCustom/ButtonCustom';
import {useCallback, useMemo} from 'react';

interface IProductScreen {
  applicationNumber?: string;
  route: any;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function ProductScreen({route, ...props}: IProductScreen) {
  const dispatch = useDispatch();
  const {wallsData, currentRoomId, numberCurrentWall, activeElementId} =
    useSelector(state => state.room);
  const roomData = useSelector(state =>
    state.room.roomData.find((r: IProductRoom) => r._id === currentRoomId),
  );

  const {openFormDataSize} = useSelector(state => state.modalOpen);
  const navigation =
    useNavigation<
      NavigationProp<RootStackParamList, PathScreen.UnwrappedProduct>
    >();

  const onSaveEditDataWall = useCallback(() => {
    const currentRoomId = roomData?._id;
    const activeId = activeElementId || null; // берём id элемента из Redux

    // if (!activeId) return; // если элемент не выбран, ничего не делаем
    if (!activeId || !roomData?.dataProduct || !currentRoomId) return;
    const updatedDataProduct = roomData?.dataProduct.map(
      (drawing: IDrawing) => ({
        ...drawing,
        drawingData: {
          ...drawing.drawingData,
          walls: drawing.drawingData.walls.map((wall: IWall) => {
            const updatedWall = wallsData.find(
              (w: IWall) => w.numberWall === wall.numberWall,
            );

            if (!updatedWall) return wall;

            // Делаем глубокую копию нужных полей, а не весь объект
            const updatedSize = {
              heightRight: updatedWall?.size?.heightRight,
              heightLeft: updatedWall?.size?.heightLeft,
              widthTop: updatedWall?.size?.widthTop,
              widthBottom: updatedWall?.size?.widthBottom,
              wallAngleDegree: updatedWall?.size?.wallAngleDegree,
              radiusWall: updatedWall?.size?.radiusWall,
              valueDegree: updatedWall?.size?.valueDegree,
            };

            return {
              ...wall,
              size: {
                ...wall.size,
                ...updatedSize,
                arrElements: {
                  elements: wall.size.arrElements?.elements || [],
                },
              },
            };
          }),
        },
      }),
    );

    dispatch(
      editRoom(updatedDataProduct, currentRoomId, numberCurrentWall, activeId),
    );

    navigation.navigate('UnwrappedProduct');
  }, [
    roomData,
    activeElementId,
    wallsData,
    numberCurrentWall,
    dispatch,
    navigation,
  ]);

  const productsArray = useMemo(() => {
    if (!roomData?.dataProduct) return [];
    return Array.isArray(roomData?.dataProduct)
      ? roomData?.dataProduct
      : [roomData?.dataProduct];
  }, [roomData?.dataProduct]);

  const filteredWalls = useMemo(
    () =>
      productsArray
        .filter((room: IDrawing) => room && room.drawingData)
        .flatMap((room: IDrawing) =>
          room.drawingData.walls.map((wall: IWall, wallIndex: number) => ({
            ...wall,
            wallIndex,
          })),
        ),
    [productsArray],
  );

  return (
    <HeaderScreen>
      <MainScreen mainTitle={`Комната: ${roomData?.nameRoom}`}>
        {productsArray
          .filter((room: IDrawing) => room && room.drawingData)
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
          data={filteredWalls}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item: wall, index}) => {
            const isActiveWall = wall.wallIndex === index;

            return (
              <View style={{flexDirection: 'column', marginHorizontal: 10}}>
                <AddBlockDimensions
                  numberWall={wall.wallIndex + 1}
                  externalData={wall.size || {}}
                  index={index}
                  currentWall={isActiveWall}
                  mode={Mode.View}
                />
              </View>
            );
          }}
        />
        {openFormDataSize.isOpen && <AddSizeWall />}
        <ButtonCustom textBtn="Сохранить данные" onPress={onSaveEditDataWall} />
      </MainScreen>
    </HeaderScreen>
  );
}
