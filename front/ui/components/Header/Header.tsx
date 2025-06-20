import {Pressable, StyleSheet, Text, View} from 'react-native';
import {Colors, Fonts, Gaps, Radius} from '../../../shared/tokens';
import ButtonHeader from '../../../shared/ButtonHeader/ButtonHeader';
import {useContext, useEffect, useState} from 'react';
import Search from '../../../assets/images/icon/iconFunc/search';
import FilterIcon from '../../../assets/images/icon/iconFunc/filter-icon';
import ProfileIcon from '../../../assets/images/icon/iconFunc/profile-icon';
import {useNavigation, useNavigationState} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {PathScreenAuth, PathScreenHeader} from '../../../shared/types';
import ProfilePopup from '../ProfilePopup/ProfilePopup';
import ButtonContext from '../../../shared/ButtonContext/ButtonContext';
import LogoIcon from '../../../assets/images/icon/iconFunc/LogoIcon';
import * as Keychain from 'react-native-keychain';
import api from '../../../utils/api';

interface IButtonState {
  icon: JSX.Element; // Элемент JSX для иконки
  state: boolean;
  pathScreen?: string;
}
type RootStackParamList = {
  Search: undefined;
  Filter: undefined;
  Profile: undefined;
  Register: undefined;
};

type HeaderNavigationProp = StackNavigationProp<RootStackParamList>;

export default function Header({setProducts, setCurrentUser}: any) {
  const navigation = useNavigation<HeaderNavigationProp>();
  const currentRouteName = useNavigationState(
    state => state.routes[state.index].name,
  );
  const {activeButtonIndex, setActiveButtonIndex} = useContext(ButtonContext);
  const [buttonActive, setButtonActive] = useState<Array<IButtonState>>([
    {icon: <Search />, state: false, pathScreen: PathScreenHeader.Search},
    {icon: <FilterIcon />, state: false, pathScreen: PathScreenHeader.Filter},
    {icon: <ProfileIcon />, state: false, pathScreen: PathScreenHeader.Profile},
  ]);
  const [profilePopup, setProfilePopup] = useState<boolean>(false);

  useEffect(() => {
    return () => {
      setActiveButtonIndex(null);
    };
  }, []);

  const onClickBtnHeader = (index: number) => {
    const newActiveButtons = buttonActive.map((active, i) => ({
      ...active,
      state: i === index ? !active.state : false,
    }));
    const newActiveButtonsDisabled = buttonActive.map((active, i) => ({
      ...active,
      state: false,
    }));
    setButtonActive(newActiveButtons);
    const screenName = newActiveButtons[index].pathScreen;
    setActiveButtonIndex(index);
    if (
      currentRouteName === PathScreenAuth.Login ||
      currentRouteName === PathScreenAuth.NewPassword ||
      currentRouteName === PathScreenAuth.Register ||
      currentRouteName === PathScreenAuth.RestorePassword ||
      currentRouteName === PathScreenAuth.Success
    ) {
      setButtonActive(newActiveButtonsDisabled);
      navigation.canGoBack();
      setActiveButtonIndex(null);
    } else {
      if (screenName !== PathScreenHeader.Profile) {
        navigation.navigate(screenName as keyof RootStackParamList);
      }
      setProfilePopup(
        prevState => screenName === PathScreenHeader.Profile && !prevState,
      );
    }
  };
  const onLogout = async () => {
    try {
      setProducts([]);
      setCurrentUser(null);
      await Keychain.resetGenericPassword();
      api.setToken('');
      navigation.reset({
        index: 0,
        routes: [{name: PathScreenAuth.Register}],
      });
      console.log('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  return (
    <View style={styles.header}>
      <View>
        <LogoIcon />
      </View>
      <View style={styles.blockButtonsHeader}>
        <Pressable onPress={onLogout}>
          <Text>Выход</Text>
        </Pressable>
        {buttonActive.map((active, index) => (
          <ButtonHeader
            key={index}
            onPressClick={() => onClickBtnHeader(index)}
            icon={active.icon}
            isActive={activeButtonIndex === index}
          />
        ))}
      </View>
      {profilePopup && <ProfilePopup />}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.goldenYellow,
    position: 'relative',
  },
  logo: {
    backgroundColor: Colors.lightGray,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: Radius.r20,
  },
  logoText: {
    fontFamily: Fonts.regular,
    fontSize: Fonts.f14,
    color: Colors.black,
  },
  blockButtonsHeader: {
    flexDirection: 'row',
    gap: Gaps.g6,
  },
});
