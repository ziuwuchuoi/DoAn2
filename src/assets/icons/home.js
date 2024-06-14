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
      d="M18 0h-6v3H9v3H6v3H3v3H0v3h3v15h10.5v-9h3v9H27V15h3v-3h-3V9h-3V6h-3V3h-3V0Zm0 3v3h3v3h3v3h3v3h-3v12h-4.5v-9h-9v9H6V15H3v-3h3V9h3V6h3V3h6Z"
    />
  </Svg>
);
const Memo = memo(SvgComponent);
export default Memo;
