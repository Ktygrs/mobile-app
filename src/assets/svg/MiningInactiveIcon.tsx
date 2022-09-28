// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {
  Defs,
  LinearGradient,
  Path,
  Stop,
  SvgProps,
} from 'react-native-svg';

export const MiningInactiveIcon = (props: SvgProps) => (
  <Svg width={60} height={60} fill="none" viewBox="0 0 60 60" {...props}>
    <Path
      d="M18.74 4.664c6.219-6.219 16.301-6.219 22.52 0L55.336 18.74c6.219 6.219 6.219 16.301 0 22.52L41.26 55.336c-6.219 6.219-16.301 6.219-22.52 0L4.664 41.26c-6.219-6.219-6.219-16.301 0-22.52L18.74 4.664Z"
      fill="url(#a)"
    />
    <Path
      d="m30 12-1.683 11.23L30 28.87l1.683-5.64L30 12ZM30 48l1.683-11.23L30 31.13l-1.683 5.64L30 48ZM48 30l-11.23-1.683L31.13 30l5.64 1.683L48 30ZM12 30l11.23 1.683L28.87 30l-5.64-1.683L12 30ZM42.65 17.195 33.562 24l-2.766 5.195 5.16-2.83 6.696-9.171ZM17.35 42.805 26.438 36l2.766-5.195-5.16 2.83-6.696 9.171ZM42.804 42.65l-6.806-9.089-5.195-2.766 2.83 5.16 9.171 6.696ZM17.196 17.35l6.806 9.089 5.195 2.766-2.83-5.16-9.171-6.696Z"
      fill={COLORS.white}
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={30.229}
        y1={0.142}
        x2={30.229}
        y2={57.371}
        gradientUnits="userSpaceOnUse">
        <Stop stopColor={COLORS.cornflowerBlue} />
        <Stop offset={0.99} stopColor={COLORS.primaryLight} />
      </LinearGradient>
    </Defs>
  </Svg>
);
