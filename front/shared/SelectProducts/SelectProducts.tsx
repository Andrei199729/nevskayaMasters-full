import {Animated, Pressable, StyleSheet, Text, View} from 'react-native';
import ArrowIcon from '../../assets/images/icon/iconFunc/ArrowIcon';
import {Colors, Radius, Fonts, Gaps} from '../tokens';
import {useRef, useState} from 'react';
import {ISelectOption} from '../types';

interface ISelect {
  isSelect?: boolean;
  options: ISelectOption[];
  nameSelect: string;
}

export default function SelectProducts({
  isSelect,
  options,
  nameSelect,
  ...props
}: ISelect) {
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const heightAnim = useRef(new Animated.Value(0)).current;
  const [isOpen, setIsOpen] = useState(false);

  const rotateInterpolation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const toggleAnimation = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      Animated.timing(heightAnim, {
        toValue: options.length * 50,
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
  };

  return (
    <View>
      <Pressable {...props} onPress={toggleAnimation}>
        <View style={styles.selectContainer}>
          <Text style={styles.select}>{nameSelect}</Text>
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
            <View style={styles.selectBox}>
              {options?.map((option, index) => (
                <Text key={index} style={styles.textOption}>
                  {option.text}
                </Text>
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
    paddingVertical: 6,
    color: Colors.black,
    fontSize: Fonts.f14,
    fontFamily: Fonts.regular,
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
    backgroundColor: Colors.lightGrayNine,
    marginTop: 12,
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderRadius: Radius.r8,
  },

  textOption: {
    fontSize: Fonts.f12,
    fontFamily: Fonts.regular,
    color: Colors.black,
  },
  selectBox: {
    gap: Gaps.g12,
  },
});
