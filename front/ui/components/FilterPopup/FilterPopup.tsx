import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import PopupScreen from '../../screens/PopupScreen';
import {Colors, Fonts, Gaps} from '../../../shared/tokens';
import ButtonCustom from '../../../shared/ButtonCustom/ButtonCustom';
import ButtonClear from '../../../shared/ButtonClear/ButtonClear';
import SelectCustom from '../../../shared/SelectCustom/SelectCustom';
import {
  arrSelectCity,
  arrSelectCompany,
  arrSelectPay,
  arrSelectStatus,
} from '../../../shared/texts';
import CalendarElement from '../../../shared/CalendarElement/CalendarElement';
import {useNavigation} from '@react-navigation/native';

export default function FilterPopup() {
  const navigation = useNavigation();
  const [isActiveBtn, setIsActiveBtn] = useState<boolean>(true);
  const [selectedReset, setSelectedReset] = useState<boolean | null>(null);
  const [selectedTextDefault, setSelectedTextDefault] = useState({
    status: 'Статус',
    pay: 'Оплата',
    company: 'Компания',
    city: 'Санкт-Петербург и ЛО',
  });
  const handleClearFilters = () => {
    setSelectedReset(null);
    setIsActiveBtn(true);
  };

  const closePopup = () => {
    navigation.goBack();
  };

  return (
    <PopupScreen mainTitle="Фильтры" closePopup={closePopup}>
      <View style={styles.selectBlock}>
        <SelectCustom
          isSelect
          options={arrSelectStatus}
          textDefaultSelect={selectedTextDefault.status}
          isActiveBtnState={(item: boolean) => setIsActiveBtn(item)}
          onSelectedReset={item => setSelectedReset(item)}
          countWallText={() => {}}
        />
        <SelectCustom
          isSelect
          options={arrSelectPay}
          textDefaultSelect={selectedTextDefault.pay}
          isActiveBtnState={(item: boolean) => setIsActiveBtn(item)}
          onSelectedReset={item => setSelectedReset(item)}
          countWallText={() => {}}
        />
        <SelectCustom
          isSelect
          options={arrSelectCompany}
          textDefaultSelect={selectedTextDefault.company}
          isActiveBtnState={(item: boolean) => setIsActiveBtn(item)}
          onSelectedReset={item => setSelectedReset(item)}
          countWallText={() => {}}
        />
      </View>
      <View style={styles.blockDate}>
        <Text style={styles.textDate}>Дата замера, от-до:</Text>
        <View style={styles.selectBlock}>
          <CalendarElement />
          <CalendarElement />
          <SelectCustom
            isSelect
            options={arrSelectCity}
            textDefaultSelect={selectedTextDefault.city}
            isActiveBtnState={(item: boolean) => setIsActiveBtn(item)}
            onSelectedReset={item => setSelectedReset(item)}
            countWallText={() => {}}
          />
        </View>
      </View>
      <View style={styles.btnBlock}>
        <ButtonCustom
          textBtn="Применить"
          disabledState={isActiveBtn}
          style={styles.btn}
        />
        <ButtonClear
          textBtn="Очистить фильтр"
          style={styles.btn}
          disabledState={isActiveBtn}
          onPress={handleClearFilters}
        />
      </View>
    </PopupScreen>
  );
}
const styles = StyleSheet.create({
  selectBlock: {
    gap: Gaps.g8,
  },
  btnBlock: {
    maxWidth: '100%',
    width: '100%',
    flexDirection: 'row',
    gap: Gaps.g18,
  },
  btn: {
    flex: 1,
    maxWidth: '100%',
    width: '100%',
  },
  blockDate: {
    gap: Gaps.g12,
  },
  textDate: {
    fontFamily: Fonts.regular,
    fontSize: Fonts.f16,
    color: Colors.white,
  },
});
