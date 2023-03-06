// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

export const PolarMachineInactiveIcon = ({
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
      d="m139.5 327.2-20 7.7s-.1 10.2-4.7 13.4c-4.6 3.2-5.9 8.8-5.9 8.8l2.5 11.8s4.6 10.3-1.5 12.2c-6.1 1.9-18.6-16.2-17.9-19.4.7-3.2-15 4-15 4s-7.9 4.9-5.5 8.7c2.4 3.8.7 10.7-.4 13.9-1.1 3.3-18.5 11.1-18.5-3 0-14.2 26.6-57.8 26.6-57.8l16.8-9.9 1.3-15.7 8.1-.8s10.6-26.9 15.6-31.4c0 0-5-15.6 4.3-25.8 0 0-29.8-58.8 18-119.8 0 0 23.5-49 103.9-46.6 0 0 39.5 3.7 62.3 22.7V59.4s-21.6-29 9.3-33.8c30.9-4.8 14.2 33.8 14.2 33.8l-4 7.7-3.2 46s29.2 32.6 33.9 92.7l17-12.3 7.1 3.7 7.5-.8 13.4 18.9-18.6 19 .7 21.2-19.3 19.5 26.5 76.7-10.3 8.3-37.5-18.8-3.2 24.5s7.8 19.1 3.9 25.2c-3.8 6.2-7 37.6-7 37.6l28.8 26.7s-42.6 19.2-95.8 8.8l-60.5-1.1-11.7 4.6s-88.2 17.6-79.6-43h13s-3.5-20.7-1.2-33.2c2.3-12.4 4.3-33.8 4.3-33.8l2.3-30.3Z"
      fill={color}
    />
  </Svg>
);
