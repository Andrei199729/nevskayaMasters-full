import {StyleSheet, View} from 'react-native';
import AuthSection from '../section/AuthSection';
import ButtonCustom from '../../shared/ButtonCustom/ButtonCustom';
import {Input} from '../../shared/Input/Input';
import {Gaps} from '../../shared/tokens';
import {useEffect, useState} from 'react';
import {errorNumberCodeRestore} from '../../shared/texts';
import ErrorText from '../../shared/ErrorText/ErrorText';
import HeaderScreen from './HeaderScreen';
import {INavigationScreenProps} from '../../shared/types';
import useInput from '../../hooks/useInput';

function SuccessScreen({navigation}: INavigationScreenProps) {
  const restoreCodeLogin = useInput('');

  const [disabledRestoreCodeState, setDisabledRestoreCodeState] =
    useState<boolean>(true);
  const [restoreCodeCodeError, setRestoreCodeError] = useState<boolean>(false);
  const [localError, setLocalError] = useState<string | undefined>(
    errorNumberCodeRestore,
  );

  useEffect(() => {
    setRestoreCodeError(!restoreCodeLogin.value); // Устанавливаем ошибку, если email некорректен
    setDisabledRestoreCodeState(!restoreCodeLogin.value); // Отключаем кнопку, если форма не валидна
  }, [restoreCodeLogin.value]);

  const onSubmitCode = () => {
    navigation.navigate('NewPassword');
  };

  return (
    <HeaderScreen>
      <AuthSection title="Восстановление пароля" navigation={navigation}>
        <View style={styles.inputs}>
          <Input
            textPlaceholder="Введите код, который пришел на почту"
            inputModeText="numeric"
            keyboardType="numeric"
            onChangeText={restoreCodeLogin.onChangeText}
            isSelectActive={restoreCodeLogin.isActive}
          />
          <ButtonCustom
            textBtn="Отправить"
            disabledState={disabledRestoreCodeState}
            onPress={onSubmitCode}
          />
        </View>
        {restoreCodeCodeError && restoreCodeLogin.value.length > 0 && (
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

export default SuccessScreen;
