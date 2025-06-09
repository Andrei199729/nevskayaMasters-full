import {useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Colors} from '../../shared/tokens';
import Tomorrow from '../../assets/images/icon/iconFunc/tomorrow';
import NotProcessed from '../../assets/images/icon/iconFunc/not-processed';
import CreateTask from '../../assets/images/icon/iconFunc/createTask';
import ButtonMenuBottom from '../../shared/ButtonMenuBottom/ButtonMenuBottom';
import {IMainScreen} from '../../shared/types';
import MainContent from '../components/MainContent/MainContent';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

interface IMenuBottomState {
  icon: JSX.Element;
  state: boolean;
  text: string | null;
  btn: string | null;
}

type RootStackParamList = {
  CreateProject: undefined;
};

type MenuBottomNavigationProp = StackNavigationProp<RootStackParamList>;

function MainScreen({children, ...props}: IMainScreen) {
  const navigation = useNavigation<MenuBottomNavigationProp>();
  const [buttonActive, setButtonActive] = useState<Array<IMenuBottomState>>([
    {
      icon: <NotProcessed />,
      state: false,
      text: 'Не обработанные',
      btn: null,
    },
    {icon: <Tomorrow />, state: false, text: 'На завтра', btn: null},
    {icon: <CreateTask />, state: false, text: null, btn: 'CreateProject'},
    {
      icon: <NotProcessed />,
      state: false,
      text: 'Не обработанные',
      btn: null,
    },
    {icon: <Tomorrow />, state: false, text: 'На завтра', btn: null},
  ]);
  const onClickBtnHeader = (index: number) => {
    const newActiveButtons = buttonActive.map((active, i) => ({
      ...active,
      state: i === index ? !active.state : false,
    }));
    setButtonActive(newActiveButtons);
    const screenNameMenuBtn = newActiveButtons[index].btn;
    if (screenNameMenuBtn === 'CreateProject') {
      navigation.navigate('CreateProject');
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
  mainContent: {
    maxWidth: '100%',
    width: '100%',
    height: '100%',
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 24,
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
