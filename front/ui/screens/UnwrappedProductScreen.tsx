import {Alert, Pressable, StyleSheet, Text, View} from 'react-native';
import ButtonCustom from '../../shared/ButtonCustom/ButtonCustom';
import {Colors, Fonts, Gaps} from '../../shared/tokens';
import {useCallback, useEffect, useState} from 'react';
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
import api from '../../utils/api';
import * as Keychain from 'react-native-keychain';
import auth from '../../utils/auth';
import {useDispatch, useSelector} from 'react-redux';
import {checkUserAuth} from '../../services/actions/user';

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
  // const {dataProduct, nameRoom} = route.params ?? {};
  const dispatch = useDispatch();
  const {userData} = useSelector((state: any) => state.user);
  const [email, setEmail] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productsRooms, setProductsRooms] = useState<IProductRoom[]>([]);
  const onClickAddProduct = () => {
    navigation.navigate('FormDataAddProduct');
  };

  const onClickLinkProduct = (productRoom: IProductRoom) => {
    navigation.navigate('Product', {
      productRoom: productRoom,
    });
  };

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<any>([]);

  useEffect(() => {
    dispatch(checkUserAuth());
  }, [dispatch]);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const loadProducts = async () => {
        setLoading(true);
        try {
          const data = await api.getInitialProducts();
          if (isActive && data?.product && Array.isArray(data.product)) {
            setProductsRooms(data.product);
          } else {
            console.warn('Некорректный формат данных от API');
          }
        } catch (error) {
          console.error('Ошибка при загрузке продуктов:', error);
        } finally {
          setLoading(false);
        }
      };

      loadProducts();

      return () => {
        isActive = false; // предотвращает обновление состояния, если экран ушёл
      };
    }, []),
  ); // пустой массив зависимостей — чтобы вызвать один раз при монтировании

  useEffect(() => {
    const {nameRoom, dataProduct} = route.params ?? {};
    const userId = userData?.data?._id;
    console.log(userData, 'userData');

    if (nameRoom && dataProduct && userId) {
      setProductsRooms((prevProducts: any) => {
        const existingRoomIndex = prevProducts.findIndex(
          (room: {nameRoom: any; owner: any}) =>
            room.nameRoom === nameRoom && room.owner === userId,
        );

        if (existingRoomIndex !== -1) {
          const updatedRooms = [...prevProducts];
          updatedRooms[existingRoomIndex].dataProduct = dataProduct;
          return updatedRooms;
        } else {
          return [
            ...prevProducts,
            {
              nameRoom,
              dataProduct,
              owner: userId, // 👈 добавляем владельца
            },
          ];
        }
      });
    }
  }, [route.params]);
  useEffect(() => {
    console.log('ROUTE PARAMS:', route.params); // 🧪 добавь лог
  }, [route.params]);
  // if (!props.currentUser?.data?._id) {
  //   return <Text>Загрузка пользователя...</Text>;
  // }
  if (loading) return <Text>Загрузка изделий...</Text>;

  return (
    <HeaderScreen>
      <MainScreen key={productsRooms.length} mainTitle={`№ ${'заявки'}`}>
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
            {userData?.data?._id && productsRooms.length > 0 ? (
              productsRooms
                .filter(data => data?.owner === userData?.data?._id)
                .map((productRoom, index) => (
                  <Pressable
                    key={index}
                    onPress={() => onClickLinkProduct(productRoom)}>
                    <Text style={styles.textProduct}>
                      {index + 1} {productRoom.nameRoom}
                    </Text>
                  </Pressable>
                ))
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
