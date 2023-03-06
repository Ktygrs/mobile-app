// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

export const FrostGeneralInactiveIcon = ({
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
      d="M156.4 463s-33.4-54.4-32.1-85.2c0 0-10-9.1-10.2-12.4-.2-3.3-33.4-48.2-31-60.4 2.4-12.2 11-12 11-12l-20.4-39.6 37-5.9 17.3-5.9 9.3-2-34-60.7s25.9-44.6 43.5-53.1c0 0 1.6-65.8 20.7-75.6L203 78.5s19.4-27.5 39.5-32.4L290 56.3l9.6 8.6s41.7-29.4 55-26.1l.9 63.1s34 63.7 31.5 93.4L374.4 225l11.6 11.6s30-.2 42.6-6.3c12.6-6.1.8 17.1-.8 19.7-1.6 2.6-27.1 31-27.1 31l-27.3 20.7s36.8-3.8 48.1 4.5c11.4 8.3 19.4 24.1 12.9 30.8-6.5 6.7-53.3 25.9-53.3 25.9l-24.4 95.3-7.2 12.4-29.4-3.3-12.4-36s-96 11-101.9 9.3l-5.9-1.7 1 24.5c0-.1-38.9 6.2-44.5-.4Z"
      fill={color}
    />
  </Svg>
);
