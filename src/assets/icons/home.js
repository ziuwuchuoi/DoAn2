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
      stroke={props.color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M18.5 29v-5.25M1.616 20.624c-.62-4.021-.927-6.03-.168-7.813.76-1.784 2.447-3.002 5.819-5.44l2.52-1.821C13.98 2.517 16.08 1 18.502 1c2.418 0 4.515 1.517 8.711 4.55l2.52 1.822c3.372 2.437 5.058 3.657 5.819 5.439.76 1.783.451 3.792-.166 7.812l-.527 3.43c-.875 5.697-1.314 8.546-3.358 10.247-2.044 1.702-5.032 1.7-11.006 1.7h-3.99c-5.976 0-8.963 0-11.007-1.7-2.044-1.7-2.482-4.55-3.357-10.25l-.525-3.426Z"
    />
  </Svg>
);
const Memo = memo(SvgComponent);
export default Memo;
