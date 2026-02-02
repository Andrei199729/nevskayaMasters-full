import {useRef, useState} from 'react';
import {Animated, View} from 'react-native';
import {Path} from 'react-native-svg';

interface IAnimatedStrock {
  d: string;
}

const AnimatedPath = Animated.createAnimatedComponent(Path);
export default function AnimatedStrock({d}: IAnimatedStrock) {
  const [length, setLength] = useState(0);
  const ref = useRef(null);
  return (
    <AnimatedPath onLayout={() => setLength(ref.current)} ref={ref} d={d} />
  );
}
