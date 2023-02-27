// SPDX-License-Identifier: BUSL-1.1

import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export const FrostySmackerInactiveIcon = (props: SvgProps) => (
  <Svg
    width={props.width}
    height={props.height}
    fill="none"
    viewBox="0 0 500 500"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M114.9 421.4c-3.7-3.3-30.1-49.1-16.5-77.5 13.6-28.4 19.7-39.3 19.7-39.3l-3.2-41-36.4-20.9 6.7 19.2 18.7 29.2-8 28.5-10.7 23.1-16.1-4.5-44.4-29.4 29-42.3 4.3-67.4 17.8-24.7s5.1-29.1 9.4-33.1c4.2-4 15.3 6.6 15.3 6.6l-1.1 24.7 23.6 16.5s-18.8-50.8 29.4-96.5L165 77.5 152.5 45s9.9-15.5 39.5-19.4l16.8 7.9 5.1 22.3s87.4.2 122.9 67.8c0 0 14 30.1 14 55.9 0 0 18-19.3 35.2-27.4 0 0-2.9-33.4 9.8-37.3 12.7-3.9 16 24.1 16 24.1l25.8 28.8 4.8 53.7 38.7 47.3-31.7 33.2-30 10.7-16.5-3.8s40.9 93.3-70.7 149.4c.1 0-121.3 48.6-217.3-36.8Z"
      fill="#D7EAF4"
    />
  </Svg>
);
