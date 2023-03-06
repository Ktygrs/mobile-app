// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

export const WindSergeantInactiveIcon = ({
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
      d="m152.2 242.9 1.3-12.5s-39.1-48.1-16.7-116c0 0 .3-24.1 4.7-33.7 0 0-7.7-33.1 10.8-42.7 18.5-9.6 38.1 11.5 38.1 11.5s36.9-15.1 43.9-11.5c0 0 5-4.8 20.4-2.5C270.1 37.8 277 42 277 42l39.9 18.3s19.9-17.9 51.1-10.8c0 0 2.2 26.6-4 35.3-6.2 8.7-12 15.4-12 15.4l-.4 11 .4 9.6s12.8 30.2 4.8 62l-14.5 34 12.5 4.1 8.9-.3s4.1-13.8 6.2-15.3c2.1-1.5 2.2-17.5 6.9-19.8 4.7-2.3 11.1-3.8 14-1.1 2.9 2.7 5.1 24.7 5.1 24.7s12.9 3.1 9.3 8.5c-3.6 5.4-5.5 9.9-5.5 9.9l-48.2 64.6-3.5 142.5s9.7 22.7 9.6 27.8c-.1 5.1-14.1 13-45.1.7 0 0-17.8-.6-18.7-16.6-.8-16-1.5-17.8-1.5-17.8l-68-3.2v30.3s-32.1 14.4-58.1 13.8c0 0-12.4-17.3-8.4-23.1 4-5.8 7-22.2 7-22.2l-3.4-22.6s-23.7-12.4-26.1-47.9l7.4-68.5s-20.7-3.2-19.3-19.9c1.6-16.7 28.8-22.5 28.8-22.5Z"
      fill={color}
    />
  </Svg>
);
