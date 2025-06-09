import {View, StyleSheet} from 'react-native';
import Header from '../components/Header/Header';

function HeaderScreen({children}: {children: React.ReactNode}) {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>{children}</View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});

export default HeaderScreen;
