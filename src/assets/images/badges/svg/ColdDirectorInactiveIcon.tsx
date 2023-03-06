// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

export const ColdDirectorInactiveIcon = ({
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
      d="M68.1 410.7V351l21.5-9.4 9.7-5.6 3.3-14 3.1-4.9-6.9-37.5 35.4-2.2s3.5-12.7 9.8-18.4c0 0-20.2-62.7 37.4-117 0 0-9.6-103.8 17.3-107 0 0 9.8 2.8 9.9 13.7 0 0 12.1-9.4 28.3 0 0 0 7.8-5.7 17.4-4.6 9.6 1.1 12.8 8.3 12.8 8.3s10.5-6.8 24.5 0c0 0 .8-23 3.7-24.8 2.9-1.8 18.5-9.3 26 15.4 7.5 24.7-8.3 92.1-8.3 92.1s22.6 8.1 37.7 37.9c0 0 5-6.6 9.8-5.2 0 0 5.3-9.4 7.5-10.9l-2.2 1.5s.9-28.7 4.8-30.1c3.9-1.4 10.2 2.9 10.8 12.1.6 9.1 0 16.5 0 16.5s10.8 4.8 11.9 8.4c0 0 40.9 11.3 31.5 58.5 0 0-5.9 24.2-33.7 32l.5 20.1 7.5 1.6 5.7 17.7-5.7 6 2.3 9.7-2.3 4.2 35.7 10.3 11.2 72.8-41.3 20.8-7.8 9.6s-108.2 65.6-276.7 18.3l-.5-13.2-51.6-23Z"
      fill={color}
    />
  </Svg>
);
