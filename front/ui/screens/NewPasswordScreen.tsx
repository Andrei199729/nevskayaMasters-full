import {StyleSheet, View} from 'react-native';
import AuthSection from '../section/AuthSection';
import ButtonCustom from '../../shared/ButtonCustom/ButtonCustom';
import {Input} from '../../shared/Input/Input';
import {Gaps} from '../../shared/tokens';
import {useEffect, useState} from 'react';
import HeaderScreen from './HeaderScreen';
import {INavigationScreenProps} from '../../shared/types';
import useInput from '../../hooks/useInput';

function NewPasswordScreen({navigation}: INavigationScreenProps) {
  const restoreNewPasswordLogin = useInput('');
  const restoreRepeatNewPasswordLogin = useInput('');

  const [disabledRestoreNewPasswordState, setDisabledRestoreNewPasswordState] =
    useState<boolean>(true);

  useEffect(() => {
    const isFormValid =
      restoreNewPasswordLogin.value === restoreRepeatNewPasswordLogin.value &&
      restoreNewPasswordLogin.value.length > 0;
    return isFormValid
      ? setDisabledRestoreNewPasswordState(true)
      : setDisabledRestoreNewPasswordState(false);
  }, [restoreNewPasswordLogin.value, restoreRepeatNewPasswordLogin.value]);

  const onSubmitCode = () => {
    navigation.navigate('SuccessScreen');
  };

  return (
    <HeaderScreen>
      <AuthSection title="Восстановление пароля" navigation={navigation}>
        <View style={styles.inputs}>
          <Input
            textPlaceholder="Введите новый пароль"
            inputModeText="text"
            onChangeText={restoreNewPasswordLogin.onChangeText}
            isSelectActive={restoreNewPasswordLogin.isActive}
          />
          <Input
            textPlaceholder="Повторите новый пароль"
            inputModeText="text"
            onChangeText={restoreRepeatNewPasswordLogin.onChangeText}
            isSelectActive={restoreRepeatNewPasswordLogin.isActive}
          />
          <ButtonCustom
            textBtn="Восстановить пароль"
            disabledState={!disabledRestoreNewPasswordState}
            onPress={onSubmitCode}
          />
        </View>
      </AuthSection>
    </HeaderScreen>
  );
}

const styles = StyleSheet.create({
  inputs: {
    gap: Gaps.g8,
  },
});

export default NewPasswordScreen;
