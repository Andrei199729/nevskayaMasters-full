import {StyleSheet, Text, View} from 'react-native';
import {Colors, Fonts, Gaps, Radius} from '../tokens';
import {ObjectStatus} from '../types';
import {useSelector} from '../../services/hooks';

interface IformApplication {
  id: number;
  addressApplication: string;
  nameCompany: string;
  telSalon: string;
  telManager: string;
  telClient: string;
  telForeman: string;
  dateRegistration: string;
  nameClient: string;
  price: string;
}
interface IObjectApplication {
  status: ObjectStatus;
}

function UnwrappedProductObject({status}: IObjectApplication) {
  const {applicationId, formApplication, apartments} = useSelector(
    state => state.apartment,
  );
  console.log(formApplication.addressApplication, 'formApplication');

  const applicationData = apartments.find(
    (apartment: any) => apartment._id === applicationId,
  );

  if (!applicationData) return null;
  return (
    <View style={styles.objectApplicationContainer}>
      <View style={styles.blockApplication}>
        <View style={styles.boxApplication}>
          <View style={styles.boxPencilApplication}>
            <Text
              style={[styles.textApplication, styles.textOpacityApplication]}>
              {applicationData?.dataApplication?.dateRegistration ??
                formApplication?.dateRegistration}
            </Text>
          </View>
        </View>
        <View style={styles.boxPencilApplication}>
          <Text style={styles.textApplication}>Статус</Text>
        </View>
      </View>
      <Text style={[styles.textApplication, styles.addressApplication]}>
        {applicationData?.dataApplication?.addressApplication ??
          formApplication?.addressApplication}
      </Text>
      <Text style={styles.textApplication}>
        {applicationData?.dataApplication?.nameCompany}
      </Text>
      <View style={styles.contactCallApplication}>
        <Text style={[styles.textApplication, styles.textOpacityApplication]}>
          Оплата с салона
        </Text>
        <Text
          style={{
            ...styles.textApplication,
          }}>
          {applicationData?.dataApplication?.telSalon}
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
          {applicationData?.dataApplication?.telManager}
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
          {applicationData?.dataApplication?.telClient}
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
          {applicationData?.dataApplication?.telForeman}
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
          {applicationData?.dataApplication?.dateRegistration}
        </Text>
      </View>
      <View style={styles.boxCompanyApplication}>
        <Text style={[styles.textApplication, styles.addressApplication]}>
          {applicationData?.dataApplication?.nameClient}
        </Text>
        <Text style={[styles.textApplication, styles.addressApplication]}>
          {`${applicationData?.dataApplication?.price} руб.`}
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
    marginBottom: 20,
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
