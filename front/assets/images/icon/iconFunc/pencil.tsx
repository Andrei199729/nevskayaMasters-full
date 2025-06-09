import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const PencilIcon = () => (
  <Svg width={12} height={12} fill="none">
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8.5 1.5a1.414 1.414 0 1 1 2 2l-6.75 6.75L1 11l.75-2.75L8.5 1.5Z"
    />
  </Svg>
);
export default PencilIcon;
