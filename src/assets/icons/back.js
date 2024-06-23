import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {memo} from 'react';
const SvgComponent = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={17}
    height={32}
    fill="none"
    {...props}>
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M16 1S1 12.047 1 16c0 3.953 15 15 15 15"
    />
  </Svg>
);
const Memo = memo(SvgComponent);
export default Memo;
