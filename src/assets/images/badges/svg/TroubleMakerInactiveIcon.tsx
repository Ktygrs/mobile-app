// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

export const TroubleMakerInactiveIcon = ({
  width = rem(76),
  height = rem(76),
  color = COLORS.linkWater2,
  ...props
}: SvgProps) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 500 500"
    fill="none"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="m116.6 408.7 5.5-21.2 6.8 2.6 10.1-46.3s-22.3-30.9-27.5-48.1c0 0-13.8.4-14.2-11.3 0 0-25.1-36.4 4.6-55.2 0 0 16.3-5 27 7.8 0 0-2.4-65.3 28.8-105.3 0 0-34.8-37.5 5.2-61.7 40-24.2 62.8 15.2 62.8 15.2s17.8-7.4 25.9-4.4c0 0-8.2-18.3 10.6-22.6 0 0 13.5 6.1 15.3 10.4 0 0 6-6.5 17.4 4.4l8.4 12.3s26.5 10.7 32.3 17.3c0 0 25.3-25.9 52.7-1.3 27.4 24.6-3 62.5-3 62.5s5 35 3 49.2c-2 14.2-5.7 34.3-5.7 34.3s16.7-7.6 25.9-2.5 23.2 15.8 14.5 37.1l-8 10.6-6.5 14.1-11.6 6.5-31.5 36.3 4.3 47.1 9 1.3 3.6 20s-32.2 19.9-100.7 34c0 0-25 25.6-55.7 0-.1-.3-65.6-.1-109.3-43.1Z"
      fill={color}
    />
  </Svg>
);
