import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const CalendarIcon = () => (
  <Svg width={16} height={16} fill="none" viewBox="15 14 18 20">
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M30.222 17H17.778c-.982 0-1.778.796-1.778 1.778v12.444c0 .982.796 1.778 1.778 1.778h12.444c.982 0 1.778-.796 1.778-1.778V18.778c0-.982-.796-1.778-1.778-1.778ZM28 15v4M20 15v4M16 22h16"
    />
  </Svg>
);
export default CalendarIcon;
