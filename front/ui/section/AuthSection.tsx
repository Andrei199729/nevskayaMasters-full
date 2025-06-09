import {StyleSheet, Text, View} from 'react-native';
import {Colors, Fonts, Gaps} from '../../shared/tokens';
import ButtonLink from '../../shared/ButtonLink/ButtonLink';
import Title from '../../shared/Title/Title';
import {NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../../shared/types';

interface AuthSectionProps {
  children: React.ReactNode;
  title: string;
  navigation: NavigationProp<RootStackParamList>;
  textBtn?: string;
  pathLink?: string;
  textWithBtn?: string;
}

function AuthSection({children, ...props}: AuthSectionProps) {
  return (
    <View style={styles.content}>
      <View style={styles.form}>
        <Title title={props.title} />
        {children}
        <View style={styles.blockQuestion}>
          <Text style={styles.question}>{props.textWithBtn}</Text>
          <ButtonLink
            navigationPath={props.navigation}
            textBtn={props.textBtn}
            path={props.pathLink}
          />
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  content: {
    maxWidth: '100%',
    width: '100%',
    height: '100%',
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
    paddingTop: 24,
    zIndex: -1,
  },
  form: {
    gap: Gaps.g18,
  },
  blockQuestion: {
    gap: 4,
    flexDirection: 'row',
  },
  question: {
    fontFamily: Fonts.regular,
    fontSize: Fonts.f14,
    color: Colors.black,
    opacity: 0.5,
  },
});

export default AuthSection;
