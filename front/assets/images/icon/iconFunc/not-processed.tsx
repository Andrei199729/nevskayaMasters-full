import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath} from 'react-native-svg';
const NotProcessed = () => (
  <Svg width={18} height={18} fill="none">
    <G clipPath="url(#a)">
      <Path fill="#fff" fillOpacity={0.01} d="M18 0H0v18h18V0Z" />
      <Path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m12.572 7.313-2.9-5.023a.75.75 0 0 0-1.31.019L6.376 6M9.375 15h6.158a.75.75 0 0 0 .639-1.143l-2.297-3.732M4.875 8.625 1.79 13.87A.75.75 0 0 0 2.436 15h3.939"
      />
      <Path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m10.875 13.5-1.5 1.5 1.5 1.5M10.5 6.825l2.049.55.55-2.05M2.813 9.174l2.049-.549.549 2.049"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h18v18H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default NotProcessed;
