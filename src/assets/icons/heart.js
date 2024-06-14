import * as React from 'react';
import Svg, {G, Mask, Path, Defs} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: filter */
import {memo} from 'react';
const SvgComponent = props => (
  <Svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width={35}
    height={30}
    fill="none">
    <G fill="#fff" filter="url(#a)">
      <Mask id="b">
        <Path d="M14.91 0H9.454v3H6.727v3H4v9h2.727v3h2.728v3h2.727v3h2.727v3h2.727v3h2.728v-3h2.727v-3h2.727v-3h2.727v-3h2.728v-3H34V6h-2.727V3h-2.727V0H23.09v3h-2.727v3h-2.728V3H14.91V0Zm0 3v3h2.726v3h2.728V6h2.727V3h5.454v3h2.728v9h-2.727v3h-2.728v3h-2.727v3h-2.727v3h-2.728v-3H14.91v-3h-2.727v-3H9.455v-3H6.727V6h2.728V3h5.454Z" />
      </Mask>
      <Path d="M14.91 0H9.454v3H6.727v3H4v9h2.727v3h2.728v3h2.727v3h2.727v3h2.727v3h2.728v-3h2.727v-3h2.727v-3h2.727v-3h2.728v-3H34V6h-2.727V3h-2.727V0H23.09v3h-2.727v3h-2.728V3H14.91V0Zm0 3v3h2.726v3h2.728V6h2.727V3h5.454v3h2.728v9h-2.727v3h-2.728v3h-2.727v3h-2.727v3h-2.728v-3H14.91v-3h-2.727v-3H9.455v-3H6.727V6h2.728V3h5.454Z" />
      <Path
        d="M14.91 0h3v-3h-3v3ZM9.454 0v-3h-3v3h3ZM6.727 3V0h-3v3h3ZM4 6V3H1v3h3Zm0 9H1v3h3v-3Zm2.727 3h-3v3h3v-3Zm2.728 3h-3v3h3v-3Zm2.727 3h-3v3h3v-3Zm2.727 3h-3v3h3v-3Zm2.727 3h-3v3h3v-3Zm2.728 0v3h3v-3h-3Zm2.727-3v3h3v-3h-3Zm2.727-3v3h3v-3h-3Zm2.727-3v3h3v-3h-3Zm2.728-3v3h3v-3h-3ZM34 15v3h3v-3h-3Zm0-9h3V3h-3v3Zm-2.727-3h3V0h-3v3Zm-2.727-3h3v-3h-3v3ZM23.09 0v-3h-3v3h3Zm-2.727 3V0h-3v3h3Zm-2.728 0h3V0h-3v3ZM14.91 6h-3v3h3V6Zm2.727 3h-3v3h3V9Zm2.728 0v3h3V9h-3Zm2.727-3v3h3V6h-3Zm5.454 0h-3v3h3V6Zm0 9v-3h-3v3h3Zm-2.727 3v-3h-3v3h3Zm-2.727 3v-3h-3v3h3Zm-2.727 3v-3h-3v3h3Zm-2.728 0h3v-3h-3v3Zm-2.727-3h3v-3h-3v3Zm-2.727-3h3v-3h-3v3Zm-2.727-3h3v-3h-3v3Zm0-9v3h3V6h-3Zm5.454-9H9.455v6h5.454v-6ZM6.455 0v3h6V0h-6Zm3 0H6.727v6h2.728V0ZM3.727 3v3h6V3h-6Zm3 0H4v6h2.727V3ZM1 6v9h6V6H1Zm3 12h2.727v-6H4v6Zm-.273-3v3h6v-3h-6Zm3 6h2.728v-6H6.727v6Zm-.272-3v3h6v-3h-6Zm3 6h2.727v-6H9.455v6Zm-.273-3v3h6v-3h-6Zm3 6h2.727v-6h-2.727v6Zm-.273-3v3h6v-3h-6Zm3 6h2.727v-6H14.91v6Zm-.273-3v3h6v-3h-6Zm3 6h2.728v-6h-2.728v6Zm5.728-3v-3h-6v3h6Zm-3 0h2.727v-6h-2.727v6Zm5.727-3v-3h-6v3h6Zm-3 0h2.727v-6h-2.727v6Zm5.727-3v-3h-6v3h6Zm-3 0h2.727v-6h-2.727v6Zm5.727-3v-3h-6v3h6Zm-3 0h2.728v-6h-2.727v6Zm5.728-3v-3h-6v3h6Zm-3 0H34v-6h-2.727v6ZM37 15V6h-6v9h6ZM34 3h-2.727v6H34V3Zm.273 3V3h-6v3h6Zm-3-6h-2.727v6h2.727V0Zm.273 3V0h-6v3h6Zm-3-6H23.09v6h5.454v-6ZM20.09 0v3h6V0h-6Zm3 0h-2.727v6h2.727V0Zm-5.727 3v3h6V3h-6Zm3 0h-2.728v6h2.728V3Zm.272 3V3h-6v3h6Zm-3-6H14.91v6h2.727V0Zm.273 3V0h-6v3h6Zm-6 0v3h6V3h-6Zm3 6h2.727V3H14.91v6Zm-.273-3v3h6V6h-6Zm3 6h2.728V6h-2.728v6Zm5.728-3V6h-6v3h6Zm-3 0h2.727V3h-2.727v6Zm5.727-3V3h-6v3h6Zm-3 0h5.454V0h-5.454v6Zm2.454-3v3h6V3h-6Zm3 6h2.728V3h-2.727v6Zm-.272-3v9h6V6h-6Zm3 6h-2.727v6h2.727v-6Zm-5.727 3v3h6v-3h-6Zm3 0h-2.728v6h2.727v-6Zm-5.728 3v3h6v-3h-6Zm3 0h-2.727v6h2.727v-6Zm-5.727 3v3h6v-3h-6Zm3 0h-2.727v6h2.727v-6Zm-5.727 3v3h6v-3h-6Zm3 0h-2.728v6h2.728v-6Zm.272 3v-3h-6v3h6Zm-3-6H14.91v6h2.727v-6Zm.273 3v-3h-6v3h6Zm-3-6h-2.727v6h2.727v-6Zm.273 3v-3h-6v3h6Zm-3-6H9.455v6h2.727v-6Zm.272 3v-3h-6v3h6Zm-3-6H6.728v6h2.728v-6Zm.273 3V6h-6v9h6Zm-3-6h2.728V3H6.727v6Zm5.727-3V3h-6v3h6Zm-3 0h5.455V0H9.455v6Z"
        mask="url(#b)"
      />
    </G>
    <Defs></Defs>
  </Svg>
);
const Memo = memo(SvgComponent);
export default Memo;
