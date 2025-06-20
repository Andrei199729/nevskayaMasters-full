import {StyleSheet, Text, View} from 'react-native';
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
  PathScreen,
  PathScreenAuth,
  RootStackParamList,
} from '../../shared/types';
import useInput from '../../hooks/useInput';
import {RadioButton} from 'react-native-paper';
import auth from '../../utils/auth';
import * as Keychain from 'react-native-keychain';
import api from '../../utils/api';

function RegisterScreen({navigation}: INavigationScreenProps) {
  const emailInput = useInput('');
  const passwordInput = useInput('');
  const repeatPassword = useInput('');
  // const choiceRights = useInput('');
  const [choiceRights, setChoiceRights] = useState('');
  const [checked, setChecked] = useState('first');
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

  const handleRegistration = async (
    email: string,
    password: string,
    rules: string,
  ) => {
    try {
      auth
        .register(email, password, rules)
        .then((res: any) => {
          if (res) {
            // handleInfoTooltip({
            //   union: unionTrue,
            //   text: 'Вы успешно зарегистрировались!',
            // });
            Keychain.resetGenericPassword();
            Keychain.setGenericPassword('authToken', res.token);
            api.setToken(res.token);
            navigation.navigate(PathScreenAuth.Login);
            console.log(res, 'Вы успешно зарегистрировались');
          }
        })
        .catch((err: any) => {
          console.log(err);
          // handleInfoTooltip({
          //   union: unionFalse,
          //   text: 'Что-то пошло не так! Попробуйте ещё раз.',
          // });
        });
    } catch (err) {
      console.error('❌ Ошибка регистрации:', err);
    }
  };

  return (
    <HeaderScreen>
      <AuthSection
        title="Регистрация"
        navigation={navigation}
        textBtn={'Войти'}
        pathLink={'Login'}
        textWithBtn="Уже есть профиль?">
        <View style={styles.inputs}>
          <View style={styles.container}>
            <Text style={styles.label}>Выберите тип управления:</Text>
            <View style={{padding: 5}}>
              <RadioButton.Group
                onValueChange={newValue => setChoiceRights(newValue)}
                value={choiceRights}>
                <View style={styles.containerRadio}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <RadioButton value={ChoiceRights.Supervisor} />
                    <Text>Руководитель</Text>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <RadioButton value={ChoiceRights.Manager} />
                    <Text>Менеджер</Text>
                  </View>
                </View>
              </RadioButton.Group>
            </View>
          </View>
          <Input
            textPlaceholder="Введите Email"
            inputModeText="email"
            onChangeText={emailInput.onChangeText}
            isSelectActive={emailInput.isActive}
          />
          <Input
            textPlaceholder="Введите Пароль"
            isPassword
            onChangeText={passwordInput.onChangeText}
            errorState={inputError}
            isSelectActive={passwordInput.isActive}
          />
          <Input
            textPlaceholder="Повторите пароль"
            isPassword
            onChangeText={repeatPassword.onChangeText}
            isSelectActive={repeatPassword.isActive}
            errorState={inputError}
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
        </View>
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
  containerRadio: {
    flexDirection: 'row',
  },
});

export default RegisterScreen;
