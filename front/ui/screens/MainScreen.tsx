import {useMemo, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Colors} from '../../shared/tokens';
import Tomorrow from '../../assets/images/icon/iconFunc/tomorrow';
import NotProcessed from '../../assets/images/icon/iconFunc/not-processed';
import CreateTask from '../../assets/images/icon/iconFunc/createTask';
import ButtonMenuBottom from '../../shared/ButtonMenuBottom/ButtonMenuBottom';
import {IMainScreen} from '../../shared/types';
import MainContent from '../components/MainContent/MainContent';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useDispatch} from '../../services/hooks';
import {
  addApplication,
  resetFormApplication,
  resetViewApplicationId,
} from '../../services/actions/apartment';
import {resetRooms} from '../../services/actions/room';

interface IMenuBottomState {
  icon: JSX.Element;
  state: boolean;
  text: string | null;
  btn: string | null;
}

type RootStackParamList = {
  UnwrappedProduct: undefined;
};

type MenuBottomNavigationProp = StackNavigationProp<RootStackParamList>;
function MainScreen({children, ...props}: IMainScreen) {
  const dispatch = useDispatch();
  const navigation = useNavigation<MenuBottomNavigationProp>();
  //  мемоизируем массив иконок
  const initialButtons = useMemo<IMenuBottomState[]>(
    () => [
      {
        icon: <NotProcessed />,
        state: false,
        text: 'Не обработанные',
        btn: null,
      },
      {icon: <Tomorrow />, state: false, text: 'На завтра', btn: null},
      {icon: <CreateTask />, state: false, text: null, btn: 'UnwrappedProduct'},
      {
        icon: <NotProcessed />,
        state: false,
        text: 'Не обработанные',
        btn: null,
      },
      {icon: <Tomorrow />, state: false, text: 'На завтра', btn: null},
    ],
    [],
  ); // ← массив создаётся один раз при монтировании
  const [buttonActive, setButtonActive] = useState(initialButtons);
  const onClickBtnHeader = (index: number) => {
    const newActiveButtons = buttonActive.map((active, i) => ({
      ...active,
      state: i === index ? !active.state : false,
    }));
    setButtonActive(newActiveButtons);

    const screenNameMenuBtn = newActiveButtons[index].btn;
    if (screenNameMenuBtn === 'UnwrappedProduct') {
      dispatch(resetRooms());
      dispatch(resetFormApplication());
      dispatch(addApplication());
      dispatch(resetViewApplicationId());
      navigation.navigate('UnwrappedProduct');
    }
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <MainContent
          children={children}
          mainTitle={props.mainTitle}
          path={props.path}
        />
      </ScrollView>
      <View style={styles.menuBottom}>
        {buttonActive.map((active, index) => (
          <ButtonMenuBottom
            key={index}
            onPressClick={() => onClickBtnHeader(index)}
            icon={active.icon}
            text={active.text}
            isActive={active.state}
            btn={active.btn}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    position: 'relative',
    paddingBottom: 48,
    flex: 1,
    zIndex: -1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  menuBottom: {
    position: 'absolute',
    bottom: 0,
    maxWidth: '100%',
    width: '100%',
    flex: 1,
    backgroundColor: Colors.menuBottom,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
});

export default MainScreen;
