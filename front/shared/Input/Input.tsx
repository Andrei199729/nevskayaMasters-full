import React, {useMemo, useState} from 'react';
import {
  View,
  TextInput,
  Pressable,
  StyleSheet,
  InputModeOptions,
  TextInputProps,
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
  setSearchText?: (text: string) => void;
}

export const Input = React.memo(function Input({
  inputModeText,
  textPlaceholder,
  isPassword,
  isSearch,
  errorState,
  // isOpenSearch,
  isSelectActive,
  isDimmed,
  setSearchText,
  ...props
}: IInputProps & TextInputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  // const [isSearchVisible, setIsSearchVisible] = useState<boolean | undefined>(
  //   isOpenSearch,
  // );
  const onClickClear = () => {
    if (!isDimmed) {
      setSearchText?.('');
    }
  };
  const inputStyle = useMemo(() => {
    return [
      styles.input,
      !isSelectActive && styles.selectActive,
      {color: errorState ? Colors.red : Colors.black},
    ];
  }, [isSelectActive, errorState]);

  const PasswordIcon = useMemo(() => {
    return isPasswordVisible ? <EyeOpen /> : <EyeClosed />;
  }, [isPasswordVisible]);

  const SearchIcon = useMemo(() => {
    return !isDimmed ? <CloseInputIcon /> : <ArrowIcon />;
  }, [isDimmed]);

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={inputStyle}
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
          {PasswordIcon}
        </Pressable>
      )}
      {isSearch && (
        <Pressable onPress={onClickClear} style={styles.arrowIcon}>
          {SearchIcon}
        </Pressable>
      )}
    </View>
  );
});

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
