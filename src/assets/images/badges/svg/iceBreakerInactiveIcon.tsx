// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

export const IceBreakerInactiveIcon = ({
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
      d="m58 389 27.2-227.8 155.4-19.1 24.6-37.8 54.5 23.2 7.1-26.6h21.7l1 19.7L415.8 58l26.7 44.2-42.6 39.9h34.5L403 389.8 223.3 429 58 389Z"
      fill={color}
    />
  </Svg>
);
