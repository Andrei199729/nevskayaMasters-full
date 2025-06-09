import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const Close = () => (
  <Svg width={12} height={12} fill="none">
    <Path
      stroke="#373737"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m1 1 10 10M11 1 1 11"
    />
  </Svg>
);
export default Close;
