import {FlatList, Text, View} from 'react-native';
import HeaderScreen from './HeaderScreen';
import MainScreen from './MainScreen';
import AddBlockDimensions from '../components/AddBlockDimensions/AddBlockDimensions';
import {
  IDrawing,
  IWall,
  PathScreen,
  RootStackParamList,
} from '../../shared/types';
import DrawElement from '../components/DrawElement/DrawElement';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import AddSizeWall from '../components/AddSizeWall/AddSizeWall';
import {useDispatch, useSelector} from '../../services/hooks';
import {editRoom, setCountWallDraw} from '../../services/actions/room';
import ButtonCustom from '../../shared/ButtonCustom/ButtonCustom';

interface IProductScreen {
  applicationNumber?: string;
  route: any;
}

export default function ProductScreen({route, ...props}: IProductScreen) {
  const dispatch = useDispatch();
  const {
    wallsData,
    currentRoomId,
    sizeWalls,
    elementsData,
    numberCurrentWall,
    dataObj,
    activeElementId,
  } = useSelector(state => state.room);
  const roomData = useSelector(state =>
    state.room.roomData.find((r: any, index: any) => index === currentRoomId),
  );

  const {openFormDataSize} = useSelector(state => state.modalOpen);
  const navigation =
    useNavigation<
      NavigationProp<RootStackParamList, PathScreen.UnwrappedProduct>
    >();

  if (!roomData || !roomData.dataProduct) {
    // Обработать ошибку или вернуть заглушку
    return <Text>Нет данных для отображения</Text>;
  }
  const onSaveEditDataWall = () => {
    const currentRoomId = roomData._id;
    const activeId = activeElementId; // берём id элемента из Redux

    if (!activeId) return; // если элемент не выбран, ничего не делаем
    const updatedDataProduct = roomData.dataProduct.map((drawing: any) => ({
      ...drawing,
      drawingData: {
        ...drawing.drawingData,
        walls: drawing.drawingData.walls.map((wall: any) => {
          const updatedWall = wallsData.find(
            (w: any) => w.numberWall === wall.numberWall,
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
    }));

    dispatch(
      editRoom(updatedDataProduct, currentRoomId, numberCurrentWall, activeId),
    );
    navigation.goBack();
  };

  const productsArray = Array.isArray(roomData?.dataProduct)
    ? roomData?.dataProduct
    : [roomData?.dataProduct];

  return (
    <HeaderScreen>
      <MainScreen mainTitle={`Комната: ${roomData.nameRoom}`}>
        {productsArray
          .filter((room: any) => room && room.drawingData)
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
          data={productsArray
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

            return (
              <View style={{flexDirection: 'column', marginHorizontal: 10}}>
                <AddBlockDimensions
                  numberWall={wall.wallIndex + 1}
                  externalData={wall.size || {}}
                  index={index}
                  currentWall={isActiveWall}
                  mode="view"
                  onSaveEditDataWall={onSaveEditDataWall}
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
