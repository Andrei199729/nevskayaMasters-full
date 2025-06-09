import {StyleSheet, Text, View} from 'react-native';
import {Colors, Fonts, Gaps, Radius} from '../tokens';
import PencilIcon from '../../assets/images/icon/iconFunc/pencil';
import {ObjectStatus} from '../types';

interface IObjectApplication {
  status: ObjectStatus;
}

function ObjectApplication({status, ...props}: IObjectApplication) {
  const statusState = (status: string) => {
    switch (status) {
      case ObjectStatus.Created:
        return Colors.almostWhite;
      case ObjectStatus.Running:
        return Colors.goldenYellow;
      case ObjectStatus.Completed:
        return Colors.lightGrayFour;
      default:
        return 'Ошибка статуса';
    }
  };
  const opacityText = status === ObjectStatus.Completed ? 0.2 : 1;
  const opacity = status === ObjectStatus.Completed ? 1 : 0.5;

  return (
    <View
      style={{
        ...styles.objectApplicationContainer,
        backgroundColor: statusState(status),
      }}>
      <View style={styles.blockApplication}>
        <View style={styles.boxApplication}>
          <Text
            style={{
              ...styles.textApplication,
              opacity: opacityText,
            }}>
            № заявки
          </Text>
          <View style={styles.boxPencilApplication}>
            <Text
              style={[
                styles.textApplication,
                styles.textOpacityApplication,
                {opacity: opacity},
              ]}>
              01.01.2024 в 18:00
            </Text>
            {status === ObjectStatus.Completed && <PencilIcon />}
          </View>
        </View>
        <View style={styles.boxPencilApplication}>
          <Text style={styles.textApplication}>Статус</Text>
          {status === ObjectStatus.Completed && <PencilIcon />}
        </View>
      </View>
      <Text
        style={[
          styles.textApplication,
          styles.addressApplication,
          {opacity: opacityText},
        ]}>
        Санкт-Петербург, ул. 8 марта, 50, кв 19, 8 этаж
      </Text>
      <View style={styles.contactCallApplication}>
        <Text
          style={[
            styles.textApplication,
            styles.textOpacityApplication,
            {
              opacity:
                status === ObjectStatus.Completed ? opacityText : opacity,
            },
          ]}>
          Контакт для связи:
        </Text>
        <Text
          style={{
            ...styles.textApplication,
            opacity: opacityText,
          }}>
          +7 (920) 006-84-00
        </Text>
      </View>
      <View style={styles.boxCompanyApplication}>
        <Text
          style={{
            ...styles.textApplication,
            opacity: opacityText,
          }}>
          Компания ООО “Замеры”
        </Text>
        <View style={styles.boxProductsCountApplication}>
          <Text
            style={[
              styles.textApplication,
              styles.textOpacityApplication,
              {
                opacity:
                  status === ObjectStatus.Completed ? opacityText : opacity,
              },
            ]}>
            Изделий
          </Text>
          <Text
            style={[
              styles.textApplication,
              styles.textOpacityApplication,
              {
                opacity:
                  status === ObjectStatus.Completed ? opacityText : opacity,
              },
            ]}>
            (10)
          </Text>
        </View>
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
    textDecorationLine: 'underline',
  },
  contactCallApplication: {
    flexDirection: 'column',
    gap: Gaps.g8,
  },
  boxCompanyApplication: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  boxProductsCountApplication: {
    flexDirection: 'row',
    gap: Gaps.g6,
  },
  boxPencilApplication: {
    flexDirection: 'row',
    gap: Gaps.g6,
    alignItems: 'center',
  },
});

export default ObjectApplication;
