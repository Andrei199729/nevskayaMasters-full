import {KeyboardAvoidingView, Platform, StyleSheet} from 'react-native';
import AuthSection from '../section/AuthSection';
import ButtonCustom from '../../shared/ButtonCustom/ButtonCustom';
import {Input} from '../../shared/Input/Input';
import {Gaps} from '../../shared/tokens';
import {useEffect, useState} from 'react';
import {errorTextEmail} from '../../shared/texts';
import ErrorText from '../../shared/ErrorText/ErrorText';
import HeaderScreen from './HeaderScreen';
import useInput from '../../hooks/useInput';
import {postLoginAuth} from '../../services/actions/user';
import {useDispatch, useSelector} from '../../services/hooks';

function LoginScreen({navigation}: any) {
  const dispatch = useDispatch();
  const {accessToken} = useSelector(state => state.user);
  const emailInput = useInput('123456789@mail.ru');
  const passwordInput = useInput('123456789');
  // const emailInput = useInput('');
  // const passwordInput = useInput('');
  const [disabledLoginState, setDisabledLoginState] = useState<boolean>(true);
  const [emailError, setEmailError] = useState<boolean>(true);
  const [localError, setLocalError] = useState<string | undefined>(
    errorTextEmail,
  );

  // const [email, setEmail] = useState('');

  useEffect(() => {
    const isFormValid =
      emailInput.value.length > 0 && passwordInput.value.length > 6; // Проверяем, что и email, и пароль введены
    setEmailError(emailInput.value.length === 0); // Устанавливаем ошибку, если email некорректен
    setDisabledLoginState(!isFormValid); // Отключаем кнопку, если форма не валидна
  }, [emailInput, passwordInput]);

  useEffect(() => {
    if (accessToken) {
      navigation.navigate('Main');
    }
  }, [accessToken, navigation]);

  const onSubmitMainScreen = (email: string, password: string) => {
    dispatch(postLoginAuth(email, password));
  };

  return (
    <HeaderScreen>
      <AuthSection
        title="Авторизация"
        navigation={navigation}
        textBtn={'Восстановить пароль'}
        pathLink={'RestorePassword'}
        textWithBtn="Забыли пароль?">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.inputs}>
          <Input
            textPlaceholder="Введите Email"
            inputModeText="email"
            onChangeText={emailInput.onChangeText}
            errorState={emailError}
            isSelectActive={emailInput.isActive}
          />
          <Input
            textPlaceholder="Введите Пароль"
            isPassword
            onChangeText={passwordInput.onChangeText}
            isSelectActive={passwordInput.isActive}
          />
          <ButtonCustom
            textBtn="Авторизоваться"
            disabledState={disabledLoginState}
            onPress={() =>
              onSubmitMainScreen(emailInput.value, passwordInput.value)
            }
          />
        </KeyboardAvoidingView>
        {emailError && emailInput.value.length > 0 && (
          <ErrorText errorText={localError} />
        )}
      </AuthSection>
    </HeaderScreen>
  );
}

const styles = StyleSheet.create({
  inputs: {
    gap: Gaps.g8,
  },
});

export default LoginScreen;
