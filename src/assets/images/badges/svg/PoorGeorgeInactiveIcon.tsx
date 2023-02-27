// SPDX-License-Identifier: BUSL-1.1

import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export const PoorGeorgeInactiveIcon = (props: SvgProps) => (
  <Svg
    width={props.width}
    height={props.height}
    fill="none"
    viewBox="0 0 500 500"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="m132.7 404.5 5.1 43.1h65.5l5.1 22.6h60.3l5.6-33.1 64.5-17.7s36.1-8.2 49.1-20.2l1.8-81.4 3.3-23.1s30.8-15.3 44.9-57.7c0 0 16.7-55.6-50-22.9l-18.6 8.4 4.9-11.1-13.1-22.6 31.9-28.4s34.5-23.6 7.9-50.6-42.3 8-42.3 8-13.9-29.6-39.5-41L288 26.4h-13.6l-27.8 50.4s-14.7-58.1-66.3-25.4l-21 25.4S125 29.1 103.8 54.9l-16.1 79.8S72.4 181 77.5 188.8l5.1 7.9-20.9 45.8 47 45.6s-6.3 34.1 1.9 39.5c8.2 5.4 22.1 76.9 22.1 76.9Z"
      fill="#D7EAF4"
    />
  </Svg>
);
