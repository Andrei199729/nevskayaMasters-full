import {StyleSheet, Text, View} from 'react-native';
import {Colors, Fonts, Gaps, Radius} from '../tokens';
import {ObjectStatus} from '../types';

interface IObjectApplication {
  status: ObjectStatus;
}

function UnwrappedProductObject({status, ...props}: IObjectApplication) {
  console.log(status);

  return (
    <View style={styles.objectApplicationContainer}>
      <View style={styles.blockApplication}>
        <View style={styles.boxApplication}>
          <View style={styles.boxPencilApplication}>
            <Text
              style={[styles.textApplication, styles.textOpacityApplication]}>
              01.01.2024 в 18:00
            </Text>
          </View>
        </View>
        <View style={styles.boxPencilApplication}>
          <Text style={styles.textApplication}>Статус</Text>
        </View>
      </View>
      <Text style={[styles.textApplication, styles.addressApplication]}>
        Санкт-Петербург, ул. 8 марта, 50, кв 19, 8 этаж
      </Text>
      <Text style={styles.textApplication}>Компания ООО “Замеры”</Text>
      <View style={styles.contactCallApplication}>
        <Text style={[styles.textApplication, styles.textOpacityApplication]}>
          Оплата с салона
        </Text>
        <Text
          style={{
            ...styles.textApplication,
          }}>
          +7 (920) 006-84-00
        </Text>
      </View>
      <View style={styles.contactCallApplication}>
        <Text style={[styles.textApplication, styles.textOpacityApplication]}>
          Менеджер
        </Text>
        <Text
          style={{
            ...styles.textApplication,
          }}>
          +7 (926) 876-86-20
        </Text>
      </View>
      <View style={styles.contactCallApplication}>
        <Text style={[styles.textApplication, styles.textOpacityApplication]}>
          Контакт для связи (Клиент)
        </Text>
        <Text
          style={{
            ...styles.textApplication,
          }}>
          +7 (912) 008-98-10
        </Text>
      </View>
      <View style={styles.contactCallApplication}>
        <Text style={[styles.textApplication, styles.textOpacityApplication]}>
          Доп. контакт для связи (Прораб)
        </Text>
        <Text
          style={{
            ...styles.textApplication,
          }}>
          +7 (912) 008-98-10
        </Text>
      </View>
      <View style={styles.contactCallApplication}>
        <Text style={[styles.textApplication, styles.textOpacityApplication]}>
          Дата оформления
        </Text>
        <Text
          style={{
            ...styles.textApplication,
          }}>
          01.01.2024
        </Text>
      </View>
      <View style={styles.boxCompanyApplication}>
        <Text style={[styles.textApplication, styles.addressApplication]}>
          Алексей
        </Text>
        <Text style={[styles.textApplication, styles.addressApplication]}>
          100 000 руб.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  objectApplicationContainer: {
    borderRadius: Radius.r8,
    backgroundColor: Colors.almostWhite,
    padding: 18,
    flexDirection: 'column',
    gap: Gaps.g12,
  },
  blockApplication: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  boxApplication: {
    flexDirection: 'row',
    gap: Gaps.g10,
  },
  textOpacityApplication: {
    opacity: 0.5,
  },
  textApplication: {
    fontFamily: Fonts.regular,
    fontSize: Fonts.f12,
    color: Colors.black,
  },
  addressApplication: {
    fontSize: Fonts.f14,
    textDecorationLine: 'none',
  },
  contactCallApplication: {
    flexDirection: 'column',
    gap: Gaps.g8,
  },
  boxCompanyApplication: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  boxPencilApplication: {
    flexDirection: 'row',
    gap: Gaps.g6,
    alignItems: 'center',
  },
});

export default UnwrappedProductObject;
