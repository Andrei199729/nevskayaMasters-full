import {Pressable, StyleSheet, Text, View} from 'react-native';
import {Colors, Fonts, Gaps, Radius} from '../tokens';
import PencilIcon from '../../assets/images/icon/iconFunc/pencil';
import {IApartments, ObjectStatus, RootStackParamList} from '../types';
import {useCallback} from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from '../../services/hooks';
import {
  currentApplicationId,
  setApplicationId,
  setViewApplicationForm,
} from '../../services/actions/apartment';
import {resetRooms} from '../../services/actions/room';

interface IObjectApplication {
  status?: ObjectStatus;
  item: IApartments;
}

function ObjectApplication({item, status}: IObjectApplication) {
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {apartments} = useSelector(state => state.apartment);

  const applicationId = apartments.find(i => i._id === item._id);

  // const statusState = (status: string) => {
  //   switch (status) {
  //     case ObjectStatus.Created:
  //       return Colors.almostWhite;
  //     case ObjectStatus.Running:
  //       return Colors.goldenYellow;
  //     case ObjectStatus.Completed:
  //       return Colors.lightGrayFour;
  //     default:
  //       return 'Ошибка статуса';
  //   }
  // };
  const opacityText = status === ObjectStatus.Completed ? 0.2 : 1;
  const opacity = status === ObjectStatus.Completed ? 1 : 0.5;
  const handlePress = useCallback(() => {
    if (!applicationId?._id) return;
    dispatch(setApplicationId(applicationId?._id));
    dispatch(currentApplicationId(applicationId?._id));
    dispatch(resetRooms());
    dispatch(setViewApplicationForm(false));
    navigation.navigate('UnwrappedProduct');
  }, [applicationId, dispatch, navigation]);

  return (
    <Pressable
      style={{
        ...styles.objectApplicationContainer,
        // backgroundColor: statusState(status),
      }}
      onPress={handlePress}>
      <View style={styles.blockApplication}>
        <View style={styles.boxApplication}>
          <Text
            style={{
              ...styles.textApplication,
              opacity: opacityText,
            }}>
            {`${applicationId?.dataApplication?.numberApplication} № заявки`}
          </Text>
          <View style={styles.boxPencilApplication}>
            <Text
              style={[
                styles.textApplication,
                styles.textOpacityApplication,
                {opacity: opacity},
              ]}>
              {applicationId?.createdAt?.toLocaleString()}
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
        {applicationId?.dataApplication?.addressApplication}
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
          Контакт для связи
        </Text>
        <Text
          style={{
            ...styles.textApplication,
            opacity: opacityText,
          }}>
          {applicationId?.dataApplication?.telSalon}
        </Text>
      </View>
      <View style={styles.boxCompanyApplication}>
        <Text
          style={{
            ...styles.textApplication,
            opacity: opacityText,
          }}>
          {applicationId?.dataApplication?.nameCompany}
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
            ({applicationId?.rooms?.length || ''})
          </Text>
        </View>
      </View>
    </Pressable>
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
