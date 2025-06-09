import {StyleSheet, Text, TextStyle} from 'react-native';
import {Fonts, Colors} from '../tokens';

interface ITitle {
  title?: string;
  styleTitle?: TextStyle;
}

export default function Title({title, styleTitle}: ITitle) {
  return <Text style={[styles.title, styleTitle]}>{title}</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontFamily: Fonts.medium,
    fontSize: Fonts.f24,
    color: Colors.black,
    lineHeight: 28,
  },
});
