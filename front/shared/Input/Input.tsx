import React, {useState} from 'react';
import {
  View,
  TextInput,
  Pressable,
  StyleSheet,
  InputModeOptions,
  TextInputProps,
  Text,
} from 'react-native';
import {Colors, Fonts, Radius} from '../tokens';
import EyeOpen from '../../assets/images/icon/iconFunc/eye-open';
import EyeClosed from '../../assets/images/icon/iconFunc/eye-closed';
import ArrowIcon from '../../assets/images/icon/iconFunc/ArrowIcon';
import CloseInputIcon from '../../assets/images/icon/iconFunc/CloseInputIcon';

interface IInputProps {
  inputModeText?: InputModeOptions;
  textPlaceholder?: string;
  isPassword?: boolean;
  isSearch?: boolean;
  errorState?: boolean;
  isOpenSearch?: boolean | undefined;
  isSelectActive?: boolean;
  isDimmed?: boolean;
  setSearchText?: any;
}

export function Input({
  inputModeText,
  textPlaceholder,
  isPassword,
  isSearch,
  errorState,
  isOpenSearch,
  isSelectActive,
  isDimmed,
  setSearchText,
  ...props
}: IInputProps & TextInputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isSearchVisible, setIsSearchVisible] = useState<boolean | undefined>(
    isOpenSearch,
  );
  const onClickClear = () => {
    if (!isDimmed) {
      console.log('reset');
      setSearchText('');
    }
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={{
          ...styles.input,
          color: errorState ? Colors.red : Colors.black,
          ...(!isSelectActive && styles.selectActive),
        }}
        {...props}
        inputMode={inputModeText}
        placeholderTextColor={'rgba(0, 0, 0, 0.5)'}
        secureTextEntry={isPassword && !isPasswordVisible}
        placeholder={textPlaceholder}
        autoCapitalize="none"
        maxLength={isPassword ? 24 : 100}
      />
      {isPassword && (
        <Pressable
          style={styles.eyeIcon}
          onPress={() => setIsPasswordVisible(state => !state)}>
          {isPasswordVisible ? <EyeOpen /> : <EyeClosed />}
        </Pressable>
      )}
      {isSearch && (
        <Pressable onPress={onClickClear} style={styles.arrowIcon}>
          {!isDimmed ? <CloseInputIcon /> : <ArrowIcon />}
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    maxWidth: '100%',
    width: '100%',
    height: 48,
    paddingVertical: 16,
    paddingHorizontal: 18,
    backgroundColor: Colors.almostWhite,
    color: Colors.black,
    borderRadius: Radius.r8,
    fontSize: Fonts.f14,
    fontFamily: Fonts.regular,
  },
  inputContainer: {
    position: 'relative',
  },
  eyeIcon: {
    position: 'absolute',
    right: 0,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  arrowIcon: {
    position: 'absolute',
    right: 0,
    paddingHorizontal: 21,
    paddingVertical: 20,
  },
  selectActive: {
    borderWidth: 1,
    borderColor: Colors.lightGrayEight,
  },
});
