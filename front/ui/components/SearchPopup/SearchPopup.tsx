import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import PopupScreen from '../../screens/PopupScreen';
import {Colors, Fonts, Radius} from '../../../shared/tokens';
import ButtonCustom from '../../../shared/ButtonCustom/ButtonCustom';
import {data} from '../../../shared/texts';
import {useNavigation, useNavigationState} from '@react-navigation/native';
import {Input} from '../../../shared/Input/Input';
import {IDataItem} from '../../../shared/types';

export default function SearchPopup() {
  const navigation = useNavigation();
  const currentRouteName = useNavigationState(
    state => state.routes[state.index].name,
  );

  const [searchText, setSearchText] = useState('');
  const [isActiveBtn, setIsActiveBtn] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [isDimmed, setIsDimmed] = useState(true);
  const [isSelectActive, setIsSelectActive] = useState(true);
  const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(searchText.toLowerCase()),
  );
  const closePopup = () => {
    navigation.goBack();
  };

  const onChangeText = (text: string) => {
    setSearchText(text);
    setIsOpen(true);
    setIsActiveBtn(false);
    setIsSelectActive(!isSelectActive);
  };

  const handleOptionSelect = (option: IDataItem) => {
    setSearchText(option.name);
    setIsOpen(false);
    setIsDimmed(false);
    setIsSelectActive(!isSelectActive);
  };
  return (
    <PopupScreen
      mainTitle="Поиск"
      closePopup={closePopup}
      path={currentRouteName}>
      <View style={styles.blockSearch}>
        <View>
          <Input
            textPlaceholder="Введите ваш запрос"
            isSearch
            value={searchText}
            onChangeText={onChangeText}
            isOpenSearch={isOpen}
            isSelectActive={isSelectActive}
            isDimmed={isDimmed}
            setSearchText={setSearchText}
          />
          {isOpen && (
            <View style={styles.selectContent}>
              <FlatList
                data={filteredData}
                keyExtractor={item => item.id}
                nestedScrollEnabled={true}
                renderItem={({item, index}) => (
                  <Pressable
                    onPress={() => handleOptionSelect(item)}
                    style={({pressed}) => [
                      styles.dropdownSelect,
                      {
                        backgroundColor: pressed
                          ? Colors.goldenYellow
                          : Colors.white,
                      },
                      index === data.length - 1 && styles.lastSelect,
                    ]}>
                    <Text style={styles.textOption}>{item.name}</Text>
                  </Pressable>
                )}
              />
            </View>
          )}
        </View>
        {/* <View style={styles.blockBtn}> */}
        <ButtonCustom
          textBtn="Найти"
          disabledState={isActiveBtn}
          style={styles.btn}
        />
        {/* </View> */}
      </View>
    </PopupScreen>
  );
}

const styles = StyleSheet.create({
  blockSearch: {
    height: '100%',
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingBottom: 50,
  },
  textOption: {
    fontSize: Fonts.f12,
    fontFamily: Fonts.regular,
    color: Colors.black,
  },
  lastSelect: {
    borderBottomLeftRadius: Radius.r8,
    borderBottomRightRadius: Radius.r8,
  },
  dropdownSelect: {
    paddingVertical: 4,
    paddingLeft: 18,
  },
  btn: {
    maxWidth: '100%',
    width: '100%',
  },
  selectContent: {
    backgroundColor: Colors.white,
    marginTop: 16,
    paddingTop: 18,
    borderRadius: Radius.r8,
  },
});
