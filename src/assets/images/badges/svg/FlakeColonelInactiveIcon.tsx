// SPDX-License-Identifier: BUSL-1.1

import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export const FlakeColonelInactiveIcon = (props: SvgProps) => (
  <Svg
    width={props.width}
    height={props.height}
    fill="none"
    viewBox="0 0 500 500"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="m148.9 316.6-19.3 49.6s34.4-6.4 37.9-7.1l.5 41.9s-35.3 18.7-31.6 26.1c3.7 7.4 18.9 15.2 59.4 13.2l43-7.5 70.7-1.8s77.2 10.3 89.4-.3c0 0 25.1 3.1-31.2-28.4 0 0 2.8-47.3-3.1-59 0 0 13.8-8.7 14.8-10.5 1.1-1.8 8.8-4.5 8.8-4.5l8.9-2.8-1.2-6.9 15.9.9 9.8-7.8-3.6-7.9 37.2-46.2s11.4-35.3 3-43.5l-18.9 6.3-45.8 36L358 259l-2.5-17-13.5-1-4.1-10.7s20.7-43.9-4.2-91.9c0 0-5.1-16.8-21.6-25.4l-6.9-8.5s.3-12.4-9.7-15.3c0 0-2.6-28.1-41.4-25.8 0 0-67.4-22.3-95.2 22.1 0 0-45 18-42.2 68.5 0 0-2.8 40.4 6.7 50.5 0 0-1.7 50 19.8 69.2l5.7 42.9Z"
      fill="#D7EAF4"
    />
  </Svg>
);
