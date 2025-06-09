import {StyleSheet, View} from 'react-native';
import AuthSection from '../section/AuthSection';
import ButtonCustom from '../../shared/ButtonCustom/ButtonCustom';
import {Input} from '../../shared/Input/Input';
import {Gaps} from '../../shared/tokens';
import {useEffect, useState} from 'react';
import {errorTextEmailRestore} from '../../shared/texts';
import ErrorText from '../../shared/ErrorText/ErrorText';
import HeaderScreen from './HeaderScreen';
import {INavigationScreenProps} from '../../shared/types';
import useInput from '../../hooks/useInput';

function RestorePasswordScreen({navigation}: INavigationScreenProps) {
  const restoreEmailLogin = useInput('');

  const [disabledRestoreState, setDisabledRestoreState] =
    useState<boolean>(true);
  const [restoreEmailError, setRestoreEmailError] = useState<boolean>(false);
  const [localError, setLocalError] = useState<string | undefined>(
    errorTextEmailRestore,
  );

  useEffect(() => {
    setRestoreEmailError(!restoreEmailLogin.value); // Устанавливаем ошибку, если email некорректен
    setDisabledRestoreState(!restoreEmailLogin.value); // Отключаем кнопку, если форма не валидна
  }, [restoreEmailLogin.value]);

  const onSubmitRestorePassword = () => {
    navigation.navigate('Success');
  };

  return (
    <HeaderScreen>
      <AuthSection title="Восстановление пароля" navigation={navigation}>
        <View style={styles.inputs}>
          <Input
            textPlaceholder="Введите Email"
            inputModeText="email"
            onChangeText={restoreEmailLogin.onChangeText}
            isSelectActive={restoreEmailLogin.isActive}
          />
          <ButtonCustom
            textBtn="Отправить"
            disabledState={disabledRestoreState}
            onPress={onSubmitRestorePassword}
          />
        </View>
        {restoreEmailError && restoreEmailLogin.value.length > 0 && (
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

export default RestorePasswordScreen;
