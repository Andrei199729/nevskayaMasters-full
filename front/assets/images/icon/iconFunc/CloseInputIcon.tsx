import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const CloseInputIcon = () => (
  <Svg width={10} height={10} fill="none">
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m1.25 1.25 7.5 7.5M8.75 1.25l-7.5 7.5"
    />
  </Svg>
);
export default CloseInputIcon;
