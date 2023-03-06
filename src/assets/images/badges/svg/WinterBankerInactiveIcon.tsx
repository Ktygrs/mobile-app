// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

export const WinterBankerInactiveIcon = ({
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
      d="m25.1 267.7 5.5 154.7 57.7 23.4 1.9 11.6 48.3.3v-17.1l87.2-15.7 7.4 17.5 4.7 11.5s167.2 12.4 234.1-48.3l-17.6-4-3.7-10.7-18.8-3-8.6-10.7 15.1-52.7 16 5.3 2.7-3.7-7.3-31.8s10.4-2.8 12.4-5.2c1.9-2.4-3.7-82.9-7.8-110.4 0 0 24.1-.3 24.8-5 .8-4.8-.1-53.9-110.3-96.9l14.3-12.1s-8.3-8.9-31.3-10l-16.2-27-10.6 3.1-3.1 20.9-55 24.5-41.2-31-3 52.4s-47.8 41.8-51.6 57l-39.2-6s-24.3 23.3-17.8 42.8c6.5 19.5 11.7 37.6 11.7 37.6l-44.1 7.9-5.5 20.7-51.1 10.1Z"
      fill={color}
    />
  </Svg>
);
