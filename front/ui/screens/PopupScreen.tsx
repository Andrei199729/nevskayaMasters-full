import {Pressable, StyleSheet, Text, View} from 'react-native';
import MainScreen from './MainScreen';
import HeaderScreen from './HeaderScreen';
import {ReactNode} from 'react';
import {Colors, Gaps, Radius} from '../../shared/tokens';
import Close from '../../assets/images/icon/iconFunc/CloseIcon';
import Title from '../../shared/Title/Title';
import {PathScreenHeader} from '../../shared/types';
import LinearGradient from 'react-native-linear-gradient';

interface IPopupScreen {
  children: ReactNode;
  mainTitle: string;
  path?: string;
  closePopup?: () => void;
}

export default function PopupScreen({children, ...props}: IPopupScreen) {
  return (
    <HeaderScreen>
      <MainScreen path={props.path}>
        <View
          style={{
            ...styles.containerPopup,
            flex: props.path === PathScreenHeader.Search ? 1 : 0,
          }}>
          <LinearGradient
            colors={[Colors.darkGrayCold, Colors.darkGrayLight]}
            start={{x: 1, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.gradient}>
            <View style={styles.titlePopup}>
              <Title title={props.mainTitle} styleTitle={styles.title} />
              <Pressable {...props} onPress={props.closePopup}>
                <Close />
              </Pressable>
            </View>
            {children}
          </LinearGradient>
        </View>
      </MainScreen>
    </HeaderScreen>
  );
}

const styles = StyleSheet.create({
  containerPopup: {
    // padding: 18,
    // backgroundColor: Colors.lightGrayFive,
    // borderRadius: Radius.r8,
    // zIndex: -1,
    // gap: Gaps.g18,
    paddingBottom: 50,
  },
  title: {color: Colors.white},
  gradient: {
    borderRadius: Radius.r8,
    padding: 18,
    zIndex: -1,
    gap: Gaps.g18,
  },
  titlePopup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
