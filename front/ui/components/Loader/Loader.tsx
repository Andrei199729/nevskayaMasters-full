import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, Dimensions, Animated} from 'react-native';
import {Colors} from '../../../shared/tokens';
import Svg, {Path} from 'react-native-svg';

const {width} = Dimensions.get('window');
const vWidth = 90;
const vHeight = 80;
const height = (width * vHeight) / vWidth;

const paths = [
  // первый path
  'M17.0183 6.68481C19.4566 6.38141 21.6664 7.82097 22.7413 9.90023C24.7948 13.8728 22.3207 18.8731 18.3143 19.3182C14.8388 19.7043 12.189 17.0474 11.8204 13.7062C11.4328 10.1924 13.8292 7.08146 17.0183 6.68481ZM10.3224 14.1447C10.76 16.7424 11.6895 18.0033 12.994 19.2546C14.374 20.5782 16.6836 21.2581 18.6378 20.9621C22.662 20.3523 25.5531 16.3348 24.9608 11.8531C24.5421 8.68389 22.616 6.28342 19.8729 5.30202C17.5314 4.46441 14.5469 5.10369 12.8085 6.92069C10.9778 8.83422 9.84819 11.3293 10.3224 14.1447Z',
  // хвостик — будем анимировать
  'M5.56177 21.12H1.57078L1.57131 25.8779L0 25.8743V19.465L5.5022 19.465L5.56177 21.12Z',
  // третий path
  'M5.56448 21.1974L5.56576 26C9.33441 26 13.1031 25.9989 16.8716 26C20.5381 26.0012 23.1716 24.9041 25.2805 22.9285C26.9553 21.3596 28.8526 18.7382 29.3582 15.1597C30.2887 8.5748 26.6269 2.16462 20.744 0.455998C17.5658 -0.466997 14.0662 0.0428503 11.5418 1.69887C10.369 2.46832 9.31095 3.33095 8.45195 4.48086C7.49163 5.76632 6.9622 6.53481 6.34893 8.25823C5.74857 9.94556 5.51724 11.491 5.5181 13.4679C5.51852 14.5498 5.56779 18.7949 5.5022 19.509L5.56448 21.1974ZM16.4141 3.24159C19.397 2.73164 22.275 4.24201 23.9323 6.08971C25.3383 7.65714 26.2124 9.51866 26.5142 11.8183C26.7677 13.7497 26.3051 16.2815 25.3784 17.8701C24.9469 18.6099 24.4892 19.3393 23.9183 19.936C22.4454 21.4754 20.7804 22.3987 18.6237 22.7326C17.3109 22.9357 15.6957 22.7171 14.5364 22.265C12.6462 21.5278 11.8543 20.7355 10.5245 19.2475C10.2023 18.8868 9.89702 18.3217 9.61044 17.8284C8.01946 15.089 8.10554 10.9717 9.64212 8.10904C11.1377 5.32281 13.5024 3.7394 16.4141 3.24159Z',
];

const AnimatedPath = Animated.createAnimatedComponent(Path);

export default function Loader() {
  const animatedWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(animatedWidth, {
        toValue: -50, // конечная длина хвостика
        duration: 2500,
        useNativeDriver: false,
      }),
    );
    animation.start();
    return () => {
      animation.stop();
      animatedWidth.setValue(0);
    };
  }, [animatedWidth]);
  // Функция, которая генерирует path с растягивающейся линией и сохраняет вертикальный отросток
  const getAnimatedPath = (width: Animated.Value) =>
    width.interpolate({
      inputRange: [0, 80],
      outputRange: [
        'M5.56177 21.12H1.57078L1.57131 25.8779L0 25.8743V19.465L5.5022 19.465L5.56177 21.12Z',
        'M5.56177 21.H55.L55.56177 25.8779L54 25.8743V19.465L5.5022 19.465L5.56177 21.12Z',
      ],
    });
  return (
    <View style={styles.splashContainer}>
      <Svg
        style={{transform: [{scaleX: -1}]}}
        width={width}
        height={height / 2}
        viewBox={`0 0 ${vWidth / 20} ${vHeight / 2}`}>
        {/* Первый и третий Path */}
        {paths.map((d, i) =>
          i !== 1 ? (
            <Path
              key={i}
              d={d}
              fill="#FFCB08"
              fillRule="evenodd"
              clipRule="evenodd"
            />
          ) : null,
        )}

        {/* Второй Path — хвостик с анимацией ширины */}
        <AnimatedPath
          d={getAnimatedPath(animatedWidth)}
          stroke="#FFCB08"
          strokeWidth={2}
          fill="none"
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.splashScreenColor,
  },
});
