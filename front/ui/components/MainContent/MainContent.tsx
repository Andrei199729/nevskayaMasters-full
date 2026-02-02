import {StyleSheet, View} from 'react-native';
import Title from '../../../shared/Title/Title';
import {IMainScreen} from '../../../shared/types';
import {Colors, Gaps} from '../../../shared/tokens';

export default function MainContent({children, mainTitle, path}: IMainScreen) {
  const containerStyle = [
    styles.mainContent,
    path === 'main' ? styles.mainGapMain : styles.mainGapOther,
  ];
  return (
    <View style={containerStyle}>
      {mainTitle && <Title title={mainTitle} />}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContent: {
    maxWidth: '100%',
    width: '100%',
    height: '100%',
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  mainGapMain: {
    gap: Gaps.g14,
  },
  mainGapOther: {
    gap: Gaps.g24,
  },
});
