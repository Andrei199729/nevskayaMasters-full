import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const Close = ({size = 12}) => (
  <Svg width={size} height={size} viewBox="0 0 12 12" fill="none">
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
