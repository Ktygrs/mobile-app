// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

export const ArcticPranksterInactiveIcon = ({
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
      d="M74.3 394.6s-6.3-20.5 0-23 17.4-7.9 17.4-7.9 26.1-21.2 52.2-19.9c0 0-68.2-48.2-72.4-87.3 0 0-1.7-11.1 7.2-19.2l-2.1-31.6-14.5-1.9-2.3-7.6-20.6-1.6v-74.1l8.4-9.3 8.2-1.6 4-6.2 9.8 2.5v11.2l40.8 9.8 12-7.8 11.9 2.5V132l16.8 3.4-2.2 39.3-4 26.6s3.3-30.7 31.7-43.1l-2.1-69.8s8.8-5 42.3 17.6c0 0 5.2-6.7 18.8-7 0 0 7.6-12.7 27.2-6.4l12.1 9.4 20 .9 8.3-53.6S345.8 62.9 361 120c0 0 47.2 29.6 71.5 88.3l-2.1 9.6s40.4.2 42 24.3c1.6 24.1-13.3 28.1-13.3 28.1l-37.4 3s-9.9 32-14 66.5-14.9 34.3-14.9 34.3 4.2 28.4 5.5 42.3c0 0 13.6 10.7 9.4 15.5-4.2 4.4-245.1 61-333.4-37.3Z"
      fill={color}
    />
  </Svg>
);
