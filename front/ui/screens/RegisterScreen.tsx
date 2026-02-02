import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Input} from '../../shared/Input/Input';
import {Gaps} from '../../shared/tokens';
import ButtonCustom from '../../shared/ButtonCustom/ButtonCustom';
import AuthSection from '../section/AuthSection';
import {useEffect, useState} from 'react';
import {errorTextPassword} from '../../shared/texts';
import ErrorText from '../../shared/ErrorText/ErrorText';
import HeaderScreen from './HeaderScreen';
import {
  ChoiceRights,
  INavigationScreenProps,
  PathScreenAuth,
} from '../../shared/types';
import useInput from '../../hooks/useInput';
import {postRegisterAuth} from '../../services/actions/user';
import {useDispatch, useSelector} from '../../services/hooks';
import BlockTypeControl from '../components/BlockTypeControl/BlockTypeControl';

function RegisterScreen({navigation}: INavigationScreenProps) {
  const dispatch = useDispatch();
  const {userData} = useSelector(state => state.user);

  const emailInput = useInput('');
  const passwordInput = useInput('');
  const repeatPassword = useInput('');
  const [choiceRights, setChoiceRights] = useState<ChoiceRights>(
    ChoiceRights.Manager,
  );
  const [disabledState, setDisabledState] = useState<boolean>(true);
  const [inputError, setInputError] = useState<boolean>(false);
  const [localError, setLocalError] = useState<string | undefined>(
    errorTextPassword,
  );

  useEffect(() => {
    // Проверяем, совпадают ли пароли

    if (
      emailInput.value &&
      passwordInput.value === repeatPassword.value &&
      passwordInput.value.length !== 0 &&
      choiceRights
    ) {
      setDisabledState(false);
    } else {
      setDisabledState(true);
    }
  }, [
    emailInput.value,
    passwordInput.value,
    repeatPassword.value,
    choiceRights,
  ]);
  useEffect(() => {
    if (userData && userData?.data?.email === emailInput.value) {
      navigation.navigate(PathScreenAuth.Login);
      emailInput.reset();
      passwordInput.reset();
      repeatPassword.reset();
      setChoiceRights(ChoiceRights.default);
    }
  }, [
    emailInput.value,
    emailInput,
    navigation,
    passwordInput,
    repeatPassword,
    userData,
  ]);

  const handleRegistration = (
    email: string,
    password: string,
    roles: string,
  ) => {
    dispatch(postRegisterAuth(email, password, roles));
    navigation.navigate('Login');
  };

  return (
    <HeaderScreen>
      <AuthSection
        title="Регистрация"
        navigation={navigation}
        textBtn={'Войти'}
        pathLink={'Login'}
        textWithBtn="Уже есть профиль?">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.inputs}>
          <View style={styles.container}>
            <Text style={styles.label}>Выберите тип управления:</Text>
            <BlockTypeControl
              setChoiceRights={setChoiceRights}
              choiceRights={choiceRights}
            />
          </View>
          <Input
            textPlaceholder="Введите Email"
            inputModeText="email"
            onChangeText={emailInput.onChangeText}
            isSelectActive={emailInput.isActive}
            value={emailInput.value}
          />
          <Input
            textPlaceholder="Введите Пароль"
            isPassword
            onChangeText={passwordInput.onChangeText}
            errorState={inputError}
            isSelectActive={passwordInput.isActive}
            value={passwordInput.value}
          />
          <Input
            textPlaceholder="Повторите пароль"
            isPassword
            onChangeText={repeatPassword.onChangeText}
            isSelectActive={repeatPassword.isActive}
            errorState={inputError}
            value={repeatPassword.value}
          />
          <ButtonCustom
            textBtn="Зарегистрироваться"
            disabledState={disabledState}
            onPress={() =>
              handleRegistration(
                emailInput.value,
                passwordInput.value,
                choiceRights,
              )
            }
          />
        </KeyboardAvoidingView>
        {passwordInput.value.length <= 6 ? (
          <ErrorText errorText={localError} />
        ) : null}
      </AuthSection>
    </HeaderScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputs: {
    gap: Gaps.g8,
  },
  label: {
    margin: 8,
  },
});

export default RegisterScreen;
