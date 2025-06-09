import {StyleSheet, View} from 'react-native';
import Title from '../../../shared/Title/Title';
import {IMainScreen} from '../../../shared/types';

export default function MainContent({children, mainTitle, path}: IMainScreen) {
  return (
    <View style={{...styles.mainContent, gap: path === 'main' ? 13 : 24}}>
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
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
});
