// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

export const PolarConsultantInactiveIcon = ({
  width = rem(76),
  height = rem(76),
  color = COLORS.linkWater2,
  ...props
}: SvgProps) => (
  <Svg
    width={width}
    height={height}
    fill="none"
    viewBox="0 0 500 500"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="m141.9 437.7 3.2-35.1s-25.1-5.7-22.9-28.4l8.8-19.9-5.8-12.2 41.1-41s-18-28.9-21.3-32.5c-3.2-3.7-45.6 2.4-40.8-21.7.7-3.6 4.7-10.4 4.7-10.4s-2.4-13.6 3.3-17.5c5.7-3.9 17.8 1.5 17.8 1.5s5.7-43.1 7.3-51.5c0 0-9.5-11.9-4.3-17.9 5.2-6 22.2-12.2 22.2-12.2S162 89.7 173.9 82l31.6 43.8 13.1-5 2.6-15.5 20.5 5.1 5.3-12.3 31.5 17.9s32.4 12.1 37.9 15.6c0 0 22-35.5 34.5-42.3 0 0 12.3 17.5 13.8 31.7s-4.3 56.8-4.3 56.8 22.3 33.2 6 71.9l-16.9 36.4s28.7 27 25.9 44.8l-4.2 28.4 1.1 20.7 3.3 31.7s30.4-14.4 33.3-13.8c2.9.7 0 10.9 0 10.9s-118.9 65.1-280 35c0 0-29.7-4.2-25-17.1 4.7-12.9 38 11 38 11Z"
      fill={color}
    />
  </Svg>
);
