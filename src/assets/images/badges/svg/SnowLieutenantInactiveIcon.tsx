// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

export const SnowLieutenantInactiveIcon = ({
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
      d="M153.7 454.6h31.6l8.8-18.2s83.6 3.1 96.7-3.3V449l43.4 5.6-11.1-21.9 6.6-19.6 12.8-5.6v-37.6l-5.1-16.9-.1-15.5s58.7 23 74.6 14.8c15.8-8.2 23.2-28 23.2-28s-31.5-31.9-38.3-31.8c-6.8.1-22.3-15.3-22.3-15.3L340 262.5l-8-7.4-5.2-9.8 30-34.7-13.9-9.8-10.9-37.2s7.3-4.8 6.6-10.9c-.7-6.1-6.6-11.9-6.6-11.9s-.5-26.3-42.7-61.1c0 0 20.1-44.4 19.9-48.1-.2-3.7-12.8-16.7-19-12.8-6.2 3.9-26.6 50.6-26.6 50.6l-59.5 5.4s25.8-50.8 25.2-55.5c-.6-4.7-16-10.6-22.3-4.7-6.3 5.9-28.7 36.6-26.3 66.6 0 0-31.9 11.8-38.1 34.9 0 0-30.9 17.9-26.6 31.9l1.3 15.6s2.3 62.5 11.9 72.9l-13.2-9.6 1.3-6.6-11.6-15.7-7.4 2.4-9.7-4.4L74 227.5l27.2 36.1-6.3 25.8-5.3 20.1 19.5 22.6 16.6-1s6.5 25.2 17.7 30.5l-8 2.4 1.1 32.7 7.7 20.2 9.5 37.7Z"
      fill={color}
    />
  </Svg>
);
