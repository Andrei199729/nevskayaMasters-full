import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const Search = () => (
  <Svg width={20} height={20} fill="none">
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m19 19-4.35-4.35M17 9A8 8 0 1 1 1 9a8 8 0 0 1 16 0Z"
    />
  </Svg>
);
export default Search;
