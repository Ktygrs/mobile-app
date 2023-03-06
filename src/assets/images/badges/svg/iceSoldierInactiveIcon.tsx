// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

export const iceSoldierInactiveIcon = ({
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
      d="M161.5 236.5s-42.7-41.7-7.6-114.5c0 0-10.9-7.5-6.8-20.8 0 0-15.9-2.4-14.8-30.3 0 0 3.4-16.2 14.8-13.1l4.6 5.1 11.4-1.8s3.8-9.7 12.1-8.1c8.4 1.6 10.6 10.3 10.6 10.3l3.1 12.9 12.3-38.1s12.8-1 17.4 10c4.6 11 10.2 22.8 10.2 22.8l12.2-3.3s7-6 13-3.6 16.1 6.1 16.1 6.1 17.4-30 27-29.9c9.6.1 10.7 17.7 10.7 17.7s3.3-7 10.5-5.1c7.2 1.9 8.2 7.3 8.2 7.3l8.3 1s5.6-10.6 15.7-8.1 11.2 29.1 7.9 35.5c-3.2 6.5-12.9 15.8-12.9 15.8s.8 11.4 2.5 14.1c1.7 2.7 16 62 12 78.1l-7.8 23.8s2.1 17.7 2.9 22.1l-.9-4.4s32.4 50.1 32.4 70.7l-14.3 5.3-7.5 5.6v19.8s7.6 11.5 7.5 16.9c-.1 5.4-7.5 9-7.5 9v82.6l-34.6 8s-28.5-10.6-30.5-29.4c0 0-62.5 3.5-70.9-6.1l-3.6 27.6s-35 8.8-48.6-10.4c0 0-17.1-13.2-21.2-62.4l-6.2 14.6 6.3 66.1-93-.6-13.6-115 71.2-4.6 8.1-10.6c0-.1 20.2-78.3 33.3-88.6Z"
      fill={color}
    />
  </Svg>
);
