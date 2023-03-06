// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

export const SnowyPlowerInactiveIcon = ({
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
      d="M46 418.7s8.8-30.2 23.8-41.8c0 0-13.5-13.1-11.9-43.2H46l-21.7-69.2 83.9-19 12.2-37s-29.3-34.2 9-74.8c0 0 11.6-7.7 25.4 1.8 0 0 9-11.7 18.2-18.3 0 0 14.6-81 55.4-90.7 0 0 20.2-7.5 47.9 0s30.3 20.6 30.3 20.6L301.8 97s51.7-4.5 67.8 29.6c0 0 14.5 23.2-37.7 35.2l-1.2 15.2s6.7 9.1 6.5 14.6c-.1 5.5 3.6 56.3-5.9 77.9l13.7-10.4s12.6-40.7 54.9-26c0 0 11.8 4.5 16.7 22.8l15.7-8.8h19.4l40.2 96.5-15.7 14.4-158.3 84.3-11.8-.3-11-10.1 8 19.3s-1.2 5-16.2 8.6c0 0-1.9 23.8-39.3 4.5 0 0-12.5 13.9-22.9 12.8 0 0-19.5-1.3-31.5-12.8 0 0-34.1 24.4-54.4-8.8 0 0-14.9 17.6-34.7 10.8 0 0-16.2-2.5-16.6-22 0 0-41-4.8-41.5-25.6Z"
      fill={color}
    />
  </Svg>
);
