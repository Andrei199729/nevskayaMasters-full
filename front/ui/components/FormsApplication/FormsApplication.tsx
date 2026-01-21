import {StyleSheet, Text, View} from 'react-native';
// import {useDispatch, useSelector} from '../../../services/hooks';
import useInput from '../../../hooks/useInput';
import {useCallback, useEffect, useState} from 'react';
import {Input} from '../../../shared/Input/Input';
import ButtonCustom from '../../../shared/ButtonCustom/ButtonCustom';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Fonts} from '../../../shared/tokens';
import {ObjectStatus, StatusButton} from '../../../shared/types';
import UnwrappedProductObject from '../../../shared/UnwrappedProductObject/UnwrappedProductObject';
import {useDispatch, useSelector} from '../../../services/hooks';
import {
  setFormApplication,
  setViewApplicationForm,
  updateApartmentApplication,
} from '../../../services/actions/apartment';

export default function FormsApplication() {
  const [isInitialized, setIsInitialized] = useState(false);
  const dispatch = useDispatch();
  const {isVisible, apartments, applicationId, formApplication} = useSelector(
    state => state.apartment,
  );
  const applicationData =
    apartments.find((apartment: any) => apartment._id === applicationId) ??
    formApplication;
  const addressApplication = useInput(
    applicationData?.dataApplication?.addressApplication || '',
  );
  const nameCompany = useInput(
    applicationData?.dataApplication?.nameCompany || '',
  );
  const telSalon = useInput(applicationData?.dataApplication?.telSalon || '');
  const telManager = useInput(
    applicationData?.dataApplication?.telManager || '',
  );
  const telClient = useInput(applicationData?.dataApplication?.telClient || '');
  const telForeman = useInput(
    applicationData?.dataApplication?.telForeman || '',
  );
  const dateRegistration = useInput(
    applicationData?.dataApplication?.dateRegistration || '',
  );
  const nameClient = useInput(
    applicationData?.dataApplication?.nameClient || '',
  );
  const price = useInput(applicationData?.dataApplication?.price || '');
  const onSaveDataApplication = useCallback(() => {
    //     // Убедимся, что все поля имеют строковые значения
    const normalizedSize = {
      id: Date.now() + Math.floor(Math.random() * 10000),
      numberApplication: Math.floor(Math.random() * 100),
      addressApplication: addressApplication?.value || '', // Заменяем undefined на пустую строку
      nameCompany: nameCompany?.value || '',
      telSalon: telSalon?.value || '',
      telManager: telManager?.value || '',
      telClient: telClient?.value || '',
      telForeman: telForeman?.value || '',
      dateRegistration: dateRegistration?.value || '',
      nameClient: nameClient?.value || '',
      price: price?.value || '',
      status: '', // узнать какие статусы есть
    };
    dispatch(setFormApplication(normalizedSize));
    dispatch(setViewApplicationForm(false));
    dispatch(updateApartmentApplication(applicationId, normalizedSize));
    setIsInitialized(false);
  }, [
    addressApplication?.value,
    dateRegistration?.value,
    dispatch,
    nameClient?.value,
    nameCompany?.value,
    price?.value,
    telClient?.value,
    telForeman?.value,
    telManager?.value,
    telSalon?.value,
  ]);

  const onEditDataApplication = () => {
    dispatch(setViewApplicationForm(true));
  };

  useEffect(() => {
    if (!isInitialized) return;
    if (applicationData?.dataApplication) {
      addressApplication.onChangeText(
        applicationData?.dataApplication?.addressApplication || '',
      );
      dateRegistration.onChangeText(
        applicationData?.dataApplication?.dateRegistration || '',
      );
      nameClient.onChangeText(
        applicationData?.dataApplication?.nameClient || '',
      );
      nameCompany.onChangeText(
        applicationData?.dataApplication?.nameCompany || '',
      );
      price.onChangeText(applicationData?.dataApplication?.price || '');
      telClient.onChangeText(applicationData?.dataApplication?.telClient || '');
      telForeman.onChangeText(
        applicationData?.dataApplication?.telForeman || '',
      );
      telManager.onChangeText(
        applicationData?.dataApplication?.telManager || '',
      );
      telSalon.onChangeText(applicationData?.dataApplication?.telSalon || '');
      setIsInitialized(true);
    }
  }, [
    addressApplication,
    applicationData?.dataApplication,
    dateRegistration,
    isInitialized,
    nameClient,
    nameCompany,
    price,
    telClient,
    telForeman,
    telManager,
    telSalon,
  ]);

  return (
    <>
      {isVisible && (
        <View style={styles.blockAddSizeWall}>
          <Text style={styles.textNumb}>Введите данные заявки</Text>
          <View style={styles.wallBlock}>
            <View style={styles.wallBlockInput}>
              <Text style={styles.wallBlockText}>Адрес заявки</Text>
              <Input
                value={addressApplication.value}
                onChangeText={addressApplication.onChangeText}
                inputModeText={'text'}
              />
            </View>
            <View style={styles.wallBlockInput}>
              <Text style={styles.wallBlockText}>Название компании</Text>
              <Input
                value={nameCompany.value}
                onChangeText={nameCompany.onChangeText}
                inputModeText={'text'}
              />
            </View>
            <View style={styles.wallBlockInput}>
              <Text style={styles.wallBlockText}>Оплата с салона</Text>
              <Input
                value={telSalon.value}
                onChangeText={telSalon.onChangeText}
                inputModeText={'tel'}
              />
            </View>
            <View style={styles.wallBlockInput}>
              <Text style={styles.wallBlockText}>Менеджер</Text>
              <Input
                value={telManager.value}
                onChangeText={telManager.onChangeText}
                inputModeText={'tel'}
              />
            </View>
            <View style={styles.wallBlockInput}>
              <Text style={styles.wallBlockText}>
                Контакт для связи {'(Клиент)'}
              </Text>
              <Input
                value={telClient.value}
                onChangeText={telClient.onChangeText}
                inputModeText={'tel'}
              />
            </View>
            <View style={styles.wallBlockInput}>
              <Text style={styles.wallBlockText}>
                Доп. контакт для связи {'Прораб'}
              </Text>
              <Input
                value={telForeman.value}
                onChangeText={telForeman.onChangeText}
                inputModeText={'tel'}
              />
            </View>
            <View style={styles.wallBlockInput}>
              <Text style={styles.wallBlockText}>Дата оформления</Text>
              <Input
                value={dateRegistration.value}
                onChangeText={dateRegistration.onChangeText}
                inputModeText={'numeric'}
              />
            </View>
            <View style={styles.wallBlockInput}>
              <Text style={styles.wallBlockText}>Имя</Text>
              <Input
                value={nameClient.value}
                onChangeText={nameClient.onChangeText}
                inputModeText={'text'}
              />
            </View>
            <View style={styles.wallBlockInput}>
              <Text style={styles.wallBlockText}>Стоимость</Text>
              <Input
                value={price.value}
                onChangeText={price.onChangeText}
                inputModeText={'text'}
              />
            </View>
          </View>

          <ButtonCustom
            textBtn="Сохранить данные заявки"
            disabledState={
              !addressApplication.value ||
              !nameCompany.value ||
              !telSalon.value ||
              !telManager.value ||
              !telClient.value ||
              !telForeman.value ||
              !dateRegistration.value ||
              !nameClient.value ||
              !price.value
            }
            onPress={onSaveDataApplication}
            statusButton={StatusButton.DisabledButton}
          />
        </View>
      )}
      {!isVisible && (
        <View>
          <UnwrappedProductObject status={ObjectStatus.Created} />
          <ButtonCustom
            textBtn="Редактировать данные заявки"
            onPress={onEditDataApplication}
          />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  blockAddSizeWall: {
    flex: 1,
    marginBottom: 10,
  },
  wallBlock: {
    maxWidth: '100%',
    width: '100%',
    flexDirection: 'column',
    gap: 10,
    marginBottom: 20,
  },
  wallBlockInput: {
    gap: 10,
  },

  wallBlockText: {
    fontFamily: Fonts.regular,
    fontSize: Fonts.f16,
    color: Colors.black,
  },

  textNumb: {
    fontSize: Fonts.f16,
    color: Colors.black,
    fontWeight: '600',
    marginBottom: 10,
  },
});
