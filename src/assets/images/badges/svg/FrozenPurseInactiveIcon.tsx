// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

export const FrozenPurseInactiveIcon = ({
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
      d="M87.4 327.5 110 122.8 273.5 102l190.9-3.3-35 237.6s8.3 8.4 8.5 12.9c.2 4.5-8.5 10.8-8.5 14.2 0 3.4 1.5 8.2-13.5 14.6s-18.3 6.7-28.1 13.1c-9.8 6.4-14.1 6.7-17.4 13.7-3.3 7-6.6 8.8-10.4 12.8-3.8 4-38.7 9.1-51.9 9.8-13.2.7-21.7 16.2-30.6 18.3-8.9 2.1-80.9-7.3-77.7-22.3 3.2-15-17.5-2.9-24.1-4-6.6-1.1-60.7-17.6-56.6-35.1 4.1-17.5-49.7-3.2-57.3-5.4-7.6-2.2-44.8-5.6-30.5-19.7 14-14.3 56.1-31.7 56.1-31.7Z"
      fill={color}
    />
  </Svg>
);
