import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const ProfileIcon = () => (
  <Svg width={18} height={20} fill="none">
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 19v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M13 5a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
    />
  </Svg>
);
export default ProfileIcon;
