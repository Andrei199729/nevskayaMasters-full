import {Pressable, StyleSheet, Text, View} from 'react-native';
import ButtonCustom from '../../shared/ButtonCustom/ButtonCustom';
import {Colors, Fonts, Gaps} from '../../shared/tokens';
import {useCallback, useEffect} from 'react';
import HeaderScreen from './HeaderScreen';
import {
  IDrawing,
  IProductRoom,
  ObjectStatus,
  PathScreen,
  RootStackParamList,
} from '../../shared/types';
import MainScreen from './MainScreen';
import UnwrappedProductObject from '../../shared/UnwrappedProductObject/UnwrappedProductObject';
import Title from '../../shared/Title/Title';
import ButtonDownload from '../../shared/ButtonDownload/ButtonDownload';
import ButtonAddProduct from '../../shared/ButtonAddProduct/ButtonAddProduct';
import {
  NavigationProp,
  RouteProp,
  useFocusEffect,
} from '@react-navigation/native';
import {checkUserAuth} from '../../services/actions/user';
import {
  addOrUpdateRoom,
  getRoomsInitial,
  resetCurrentDrawing,
  setCurrentRoomId,
} from '../../services/actions/room';
import {useDispatch, useSelector} from '../../services/hooks';
import {setResetLinedasharrays} from '../../services/actions/draw';
import {setOpenFormDataSize} from '../../services/actions/modalOpen';

type TUnwrappedProductScreenRouteProp = RouteProp<
  {
    UnwrappedProduct: {
      dataProduct: IDrawing[];
      nameRoom: string;
    };
  },
  'UnwrappedProduct'
>;

interface IUnwrappedProductScreen {
  applicationNumber?: string;
  navigation: NavigationProp<RootStackParamList, PathScreen.Product>;
  route: any;
}

function UnwrappedProductScreen({
  navigation,
  route,
  ...props
}: IUnwrappedProductScreen) {
  const dispatch = useDispatch();
  const {userData} = useSelector(state => state.user);
  const {roomData, loading} = useSelector(state => state.room);
  const onClickAddProduct = () => {
    navigation.navigate('FormDataAddProduct');
    dispatch(resetCurrentDrawing());
    dispatch(setResetLinedasharrays());
  };

  const onClickLinkProduct = (roomId: any) => {
    dispatch(
      setOpenFormDataSize({
        isOpen: false,
        wallNumber: null,
      }),
    );
    dispatch(setCurrentRoomId(roomId));
    navigation.navigate('Product');
  };

  useEffect(() => {
    dispatch(checkUserAuth());
  }, [dispatch]);

  useFocusEffect(
    useCallback(() => {
      dispatch(
        setOpenFormDataSize({
          isOpen: false,
          wallNumber: null,
        }),
      );
      dispatch(getRoomsInitial());
    }, [dispatch]),
  );

  useEffect(() => {
    const {nameRoom, dataProduct} = route.params ?? {};
    const userId = userData?.data?._id;

    if (nameRoom && dataProduct && userId) {
      dispatch(addOrUpdateRoom({nameRoom, dataProduct, owner: userId}));
    }
  }, [route.params, userData?.data?._id, dispatch]);

  if (loading) return <Text>Загрузка изделий...</Text>;

  return (
    <HeaderScreen>
      <MainScreen mainTitle={`№ ${'заявки'}`}>
        <UnwrappedProductObject status={ObjectStatus.Created} />
        <View style={styles.boxTitle}>
          <Title title="Название вида объекта" />
          <Text style={styles.subTitle}>4 этаж</Text>
        </View>
        <ButtonCustom
          textBtn="Добавить фото и размеры лифта"
          disabledState={false}
        />
        <Text style={styles.text}>
          Но современная методология разработки, а также свежий взгляд на
          привычные вещи — безусловно открывает новые горизонты для позиций,
          занимаемых участниками в отношении поставленных задач #изделие
          #изделие.2
        </Text>
        <View style={styles.boxTitle}>
          <View style={styles.boxAdd}>
            <Title title="Изделия" />
            <ButtonAddProduct onClickAddProduct={onClickAddProduct} />
          </View>
          <View style={styles.boxTitle}>
            {userData?.data?._id && roomData?.length > 0 ? (
              roomData
                ?.filter(
                  (data: {owner: string}) =>
                    data?.owner === userData?.data?._id,
                )
                .map((productRoom: IProductRoom, index: number) => {
                  return (
                    <Pressable
                      key={index}
                      onPress={() => onClickLinkProduct(index)}>
                      <Text style={styles.textProduct}>
                        {index + 1} {productRoom.nameRoom}
                      </Text>
                    </Pressable>
                  );
                })
            ) : (
              <Text style={styles.text}>Нет доступных изделий</Text>
            )}
          </View>
        </View>
        <View style={styles.boxTitle}>
          <Title title="Файлы от менеджера" />
          <ButtonDownload textBtn="Полезный файл от менеджера" />
          <ButtonDownload textBtn="Полезный файл от менеджера №2" />
        </View>
        <View style={styles.boxTitle}>
          <Title title="Комментарий к заявке" />
          <Text style={styles.text}>
            Но современная методология разработки, а также свежий взгляд на
            привычные вещи — безусловно открывает новые горизонты для позиций,
            занимаемых участниками в отношении поставленных задач #изделие
            #изделие.2
          </Text>
          <ButtonCustom textBtn="Добавить комментарий" disabledState={false} />
        </View>
      </MainScreen>
    </HeaderScreen>
  );
}

const styles = StyleSheet.create({
  boxTitle: {
    gap: Gaps.g12,
  },
  subTitle: {
    fontFamily: Fonts.regular,
    fontSize: Fonts.f14,
    color: Colors.black,
  },
  text: {
    fontFamily: Fonts.regular,
    fontSize: Fonts.f12,
    color: Colors.black,
  },
  textProduct: {
    fontFamily: Fonts.regular,
    fontSize: Fonts.f14,
    color: Colors.black,
    paddingVertical: 6,
  },
  boxAdd: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default UnwrappedProductScreen;
