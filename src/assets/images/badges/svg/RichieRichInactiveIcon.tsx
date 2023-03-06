// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

export const RichieRichInactiveIcon = ({
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
      d="M177.5 443.3s-9.3-8.7-12.8-16.6c-3.5-8-18.8-83.5-18.8-83.5l-21.6-22.3-20.5-2-11.3 15.5-10 2.3-22.6-22.3s13.9-14.8 22.6-21.1c8.7-6.4 11.7-6.8 15.4-12 3.7-5.2-28.7-53-28.7-53l49.4-4.7s-10.6-85.8 24.8-99.7l24.2 1.6s36.2-58 68.7-60.5l7.7 5.7s28.1-10.4 36.9 5.2l9.3 9.2s53-4.7 76.2 33.9c0 0 7.6 24 7.7 33.7 0 0 15.6-3.9 22.7-1.1 7.1 2.7-1 17.9-1 17.9l-19 19.5 4.3 4.6 31.5-.9 3.7 7.5s5.4-1.6 9-.9c3.6.7 5.3 16.7 5.3 16.7s7.9 29.7 7.9 36.6c0 6.9-5.6 99.4-13.2 107.4-7.7 8-32.6 9.8-35.8 7.3-3.2-2.5 3 39.1 3 39.1s23.6-13.7 32.8-16c9.2-2.3 0 13.8 0 13.8s-88.8 65.3-246.4 43.5"
      fill={color}
    />
  </Svg>
);
