import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {memo} from 'react';
const SvgComponent = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={37}
    height={34}
    fill="none"
    {...props}>
    <Path
      stroke={props.color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M27.25 8.237a7.004 7.004 0 1 1-.044 13.551m.044-13.551.003-.223a7.003 7.003 0 0 0-13.848-1.488m13.845 1.71a7.003 7.003 0 0 1-.933 3.28m.889 10.272a4.377 4.377 0 0 0-3.454-4.932m3.454 4.932a4.378 4.378 0 0 1-4.33 3.734h-.875a7.003 7.003 0 0 0-7.003 7.003M13.405 6.526a7.003 7.003 0 0 0-8.635 8.701m8.635-8.701a7.003 7.003 0 0 1 4.158 3.239M4.77 15.227a5.254 5.254 0 0 0 1.474 10.295 5.252 5.252 0 0 0 4.954-3.502M4.77 15.227a6.89 6.89 0 0 0 .66 1.541m12.782-.448c-.893.86-2.421 1.008-3.727.275-1.306-.735-1.973-2.119-1.702-3.328"
    />
  </Svg>
);
const Memo = memo(SvgComponent);
export default Memo;
