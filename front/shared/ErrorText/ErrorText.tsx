import {StyleSheet, Text} from 'react-native';
import {Fonts, Colors} from '../tokens';
interface IErrorText {
  errorText: string | undefined;
}

function ErrorText({errorText}: IErrorText) {
  return <Text style={styles.errorText}>{errorText}</Text>;
}

const styles = StyleSheet.create({
  errorText: {
    fontFamily: Fonts.regular,
    fontSize: Fonts.f12,
    color: Colors.red,
  },
});

export default ErrorText;
