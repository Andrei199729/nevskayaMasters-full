import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const CreateTask = () => (
  <Svg width={16} height={16} fill="none">
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 1v14M1 8h14"
    />
  </Svg>
);
export default CreateTask;
