// SPDX-License-Identifier: BUSL-1.1

import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export const GlacialPollyInactiveIcon = (props: SvgProps) => (
  <Svg
    width={props.width}
    height={props.height}
    fill="none"
    viewBox="0 0 500 500"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M107.6 452.1H250l8.4-7.8 18.1.7 11.7-29.5s49.5 7.7 55 0c0 0 8 43.4 20.7 44.3l8.4-48s100.7-38 61.9-159.8c0 0 14.7-76.7-57.9-115.6 0 0-21-19.7-30.4-15.7 0 0-20-22.1-45.9-32.5 0 0 16.6-9.6 23.1-17.3 6.5-7.7-8.4-32.8-8.4-32.8l-31.2 7.7-17.8 30.6-26 6.7s23.2-34.6 6.3-38.2c-16.9-3.6-33.4 9.1-33.4 9.1s-12.3 41.1-8.8 49.2c0 0-33.5 23.7-33.1 40.6 0 0-18.8 28.4-9.4 40.8 9.4 12.3-6.2 35.5 9.4 53.8l11.4 18.2 7.8 33.5s-24.5-1.9-34.9 4.3c-10.5 6.2-12.6 19.4-12.6 22.2 0 2.8 1.9 17.1-5.9 20.9-7.7 3.9-7.7 8.1-18.2 19.6-10.5 11.5-16.3 29.6-15.5 38.3.8 8.7-18.5 27.6-13 35.9 5.5 8.5 4 20.8 17.8 20.8Z"
      fill="#D7EAF4"
    />
  </Svg>
);
