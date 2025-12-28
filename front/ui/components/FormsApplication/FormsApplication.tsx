import {StyleSheet, Text, View} from 'react-native';
// import {useDispatch, useSelector} from '../../../services/hooks';
import useInput from '../../../hooks/useInput';
import {useCallback, useState} from 'react';
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
} from '../../../services/actions/apartment';

export default function FormsApplication({}) {
  const dispatch = useDispatch();
  const {isVisible} = useSelector(state => state.apartment);

  const addressApplication = useInput('');
  const nameCompany = useInput('');
  const telSalon = useInput('');
  const telManager = useInput('');
  const telClient = useInput('');
  const telForeman = useInput('');
  const dateRegistration = useInput('');
  const nameClient = useInput('');
  const price = useInput('');
  // const [viewInput, setViewInput] = useState<boolean>(true);
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

  //   useEffect(() => {
  //     if (dataWall.dataEditWall) {
  //       heightRight.onChangeText(dataWall.dataEditWall.heightRight || '');
  //       widthTop.onChangeText(dataWall.dataEditWall.widthTop || '');
  //       heightLeft.onChangeText(dataWall.dataEditWall.heightLeft || '');
  //       widthBottom.onChangeText(dataWall.dataEditWall.widthBottom || '');
  //       radiusWall.onChangeText(dataWall.dataEditWall.radiusWall || '');
  //       wallAngleDegree.onChangeText(dataWall.dataEditWall.wallAngleDegree || '');
  //       valueDegree.onChangeText(dataWall.dataEditWall.valueDegree || '');
  //     }
  //   }, [
  //     dataWall.dataEditWall,
  //     heightLeft,
  //     heightRight,
  //     radiusWall,
  //     valueDegree,
  //     wallAngleDegree,
  //     widthBottom,
  //     widthTop,
  //   ]);
  console.log(isVisible, 'isVisible');

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
            <View>
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
            onPress={onSaveDataApplication}
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
  },
  wallBlockInput: {
    gap: 10,
  },

  wallBlockText: {
    fontFamily: Fonts.regular,
    fontSize: Fonts.f16,
    color: Colors.black,
  },

  label: {
    margin: 8,
  },

  textNumb: {
    fontSize: Fonts.f16,
    color: Colors.black,
    fontWeight: '600',
    marginBottom: 10,
  },
  blockRadio: {
    padding: 20,
  },
  blockRadioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
