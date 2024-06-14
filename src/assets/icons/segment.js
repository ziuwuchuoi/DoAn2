import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {memo} from 'react';
const SvgComponent = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={30}
    fill="none"
    {...props}>
    <Path
      fill="#fff"
      d="M0 0v30h30V0H0Zm26.667 3.333v23.334H3.333V3.333h23.334Zm-20 3.334h10v10H10V20H6.667V6.667Zm13.333 10h-3.333V20h-3.334v3.333h3.334V20H20v3.333h3.333V20H20v-3.333Zm0 0h3.333v-3.334H20v3.334ZM10 10v3.333h3.333V10H10Z"
    />
  </Svg>
);
const Memo = memo(SvgComponent);
export default Memo;
