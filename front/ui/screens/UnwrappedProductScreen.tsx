import {Pressable, StyleSheet, Text, View} from 'react-native';
import ButtonCustom from '../../shared/ButtonCustom/ButtonCustom';
import {Colors, Fonts, Gaps} from '../../shared/tokens';
import {useEffect, useState} from 'react';
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
import {NavigationProp, RouteProp} from '@react-navigation/native';

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
  const {dataProduct, nameRoom} = route.params ?? {};

  const [productsRooms, setProductsRooms] = useState<IProductRoom[]>([]);

  const onClickAddProduct = () => {
    navigation.navigate('FormDataAddProduct');
  };

  const onClickLinkProduct = (productRoom: IProductRoom) => {
    navigation.navigate('Product', {
      productRoom: productRoom,
    });
  };

  useEffect(() => {
    if (nameRoom && dataProduct) {
      setProductsRooms(prevProducts => {
        const existingRoomIndex = prevProducts.findIndex(
          room => room.nameRoom === nameRoom,
        );

        if (existingRoomIndex !== -1) {
          const updatedRooms = [...prevProducts];
          updatedRooms[existingRoomIndex].dataProduct = dataProduct;
          return updatedRooms;
        } else {
          return [
            ...prevProducts,
            {
              nameRoom: nameRoom,
              dataProduct: dataProduct,
            },
          ];
        }
      });
    }
  }, [route.params]);
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
            {productsRooms?.map((productRoom: IProductRoom, index: number) => {
              return (
                <Pressable
                  key={index}
                  onPress={() => onClickLinkProduct(productRoom)}>
                  <Text style={styles.textProduct}>
                    {index + 1}
                    {productRoom.nameRoom}
                  </Text>
                </Pressable>
              );
            })}
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
