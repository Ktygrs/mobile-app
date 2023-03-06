// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

export const SnowFallInactiveIcon = ({
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
      d="M94 449.9s-69.6 2.6-65-25.2l23.8-8s-.3-46.6 0-55c.3-8.3-7.8-19.8 0-32.6s11.7-14.6 12.5-18.3c.8-3.8 9.6-23.3 9.6-23.3L86.2 246s-15.5-7.4-11.3-15.8c4.2-8.3 49.7-84.2 49.7-84.2l9.4-68.5 24.8 5.4s10-6.9 25.8-12.8 39-7 46.4-7.4c7.4-.3 20 3.9 24.8 3.2 4.8-.7 61.1-5.6 77.5-3.2 16.4 2.4 25.9 14.7 25.9 14.7s9.9 28.3 16.4 35.8c6.5 7.5 17.5 25.9 17.5 25.9s1.7 35.3 0 38.1c-1.7 2.8 13.9 17.2 21.4 22.4 7.5 5.2 5.3 12.1-.5 16.6l-6 4.8 1 18.5-9.5 7.6-6.5 6.8 6.5 21.6s13.8.2 14.9 6.5c1 6.3 4.8 15 4.8 15s34-12.2 47.1-7.6l-13.3 24s17.3 9 17.7 15.2c.4 6.2-4.4 17.3-4.4 17.3V383s-3.8 18.4 0 21.2c3.8 2.8 17.7 2.8 20.5 13 2.8 10.2 0 16.7 0 20.4 0 3.7-23.4 8.5-30.2 8-6.8-.5-23.7-.3-23.7-.3s-51.9 18.2-60.1 19.6c-8.3 1.4-20.3-4.3-20.3-4.3s-91.8 7.2-95.5 7c-3.7-.3-6.4 3.3-6.4 3.3s-130.4 6-156.6-21Z"
      fill={color}
    />
  </Svg>
);
