import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {memo} from 'react';
const SvgComponent = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={37}
    height={37}
    fill="none"
    {...props}>
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M36 32.5H15c-4.949 0-7.425 0-8.962-1.538C4.5 29.425 4.5 26.949 4.5 22V1"
    />
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M8 32.5c6.447-6.237 13.69-14.508 24.5-8.304"
    />
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M1 4.5h21c4.949 0 7.425 0 8.962 1.538C32.5 7.575 32.5 10.051 32.5 15v21"
    />
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12.375 15a2.625 2.625 0 1 0 0-5.25 2.625 2.625 0 0 0 0 5.25Z"
    />
  </Svg>
);
const Memo = memo(SvgComponent);
export default Memo;
