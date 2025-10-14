import {Animated, Pressable, StyleSheet, Text, View} from 'react-native';
import ArrowIcon from '../../assets/images/icon/iconFunc/ArrowIcon';
import {Colors, Radius, Fonts} from '../tokens';
import {useRef, useState} from 'react';
import {ISelectOption} from '../types';

interface ISelect {
  isSelect?: boolean;
  options: ISelectOption[];
  textDefaultSelect?: string;
  isActiveBtnState: (state: boolean) => void;
  onSelectedReset: (dimmed: boolean, open: boolean) => void;
  countWallText: (item: string) => void;
}

export default function SelectCustom({
  options,
  textDefaultSelect,
  isActiveBtnState,
  onSelectedReset,
  countWallText,
  ...props
}: ISelect) {
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const heightAnim = useRef(new Animated.Value(0)).current;
  const [isOpen, setIsOpen] = useState(false);
  const [isDimmed, setIsDimmed] = useState(true);
  const [isSelectActive, setIsSelectActive] = useState(true);
  const [selectedOption, setSelectedOption] = useState({
    text: textDefaultSelect,
    id: 0,
  });

  const rotateInterpolation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const toggleAnimation = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      Animated.timing(heightAnim, {
        toValue: options.length * 30,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(heightAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
    Animated.timing(rotateAnim, {
      toValue: isOpen ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setIsDimmed(!isDimmed);
    setIsSelectActive(!isSelectActive);
    onSelectedReset(isDimmed, isOpen);
  };

  const handleOptionSelect = (option: ISelectOption) => {
    setSelectedOption(option);
    setIsOpen(false);
    setIsDimmed(false);
    setIsSelectActive(!isSelectActive);
    countWallText(option.text);

    Animated.timing(rotateAnim, {
      toValue: isOpen ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
    heightAnim.setValue(0);
    isActiveBtnState(false);
    onSelectedReset(isDimmed, isOpen);
  };

  return (
    <View>
      <Pressable {...props} onPress={toggleAnimation}>
        <View style={styles.selectContainer}>
          <View
            style={{
              ...styles.select,
              ...(!isSelectActive && styles.selectActive),
            }}>
            <Text
              style={{
                ...styles.text,
                opacity: isDimmed ? 0.5 : 1,
              }}>
              {selectedOption.text}
            </Text>
          </View>
          <Animated.View
            style={{
              ...styles.selectIcon,
              transform: [{rotate: rotateInterpolation}],
            }}>
            <ArrowIcon />
          </Animated.View>
        </View>
      </Pressable>
      {isOpen && (
        <Animated.View style={[styles.dropdown, {height: heightAnim}]}>
          <View style={styles.selectContent}>
            <View>
              {options?.map((option, index) => (
                <Pressable
                  key={index}
                  onPress={() => handleOptionSelect(option)}
                  style={({pressed}) => [
                    styles.dropdownSelect,
                    {
                      backgroundColor: pressed
                        ? Colors.lightGraySeven
                        : Colors.white,
                    },
                    index === options.length - 1 && styles.lastSelect,
                  ]}>
                  <Text style={styles.textOption}>{option.text}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    overflow: 'hidden',
  },
  select: {
    maxWidth: '100%',
    width: '100%',
    height: 48,
    paddingVertical: 16,
    paddingHorizontal: 18,
    backgroundColor: Colors.almostWhite,
    borderRadius: Radius.r8,
  },

  selectContainer: {
    position: 'relative',
  },

  selectIcon: {
    position: 'absolute',
    right: 19,
    top: '40%',
  },
  selectContent: {
    backgroundColor: Colors.white,
    marginTop: 12,
    paddingTop: 8,
    borderRadius: Radius.r8,
  },

  dropdownSelect: {
    paddingVertical: 4,
    paddingLeft: 18,
  },

  lastSelect: {
    borderBottomLeftRadius: Radius.r8,
    borderBottomRightRadius: Radius.r8,
  },

  textOption: {
    fontSize: Fonts.f12,
    fontFamily: Fonts.regular,
    color: Colors.black,
  },
  selectActive: {
    borderWidth: 1,
    borderColor: Colors.lightGrayEight,
  },
  text: {
    color: Colors.black,
    fontSize: Fonts.f14,
    fontFamily: Fonts.regular,
  },
});
