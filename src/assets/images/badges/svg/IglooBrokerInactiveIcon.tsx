// SPDX-License-Identifier: BUSL-1.1

import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export const IglooBrokerInactiveIcon = (props: SvgProps) => (
  <Svg
    width={props.width}
    height={props.height}
    fill="none"
    viewBox="0 0 500 500"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="m80.9 302.8-1.4-15.4-11.2-18.7s-18.9-11-14.4-18c4.5-7 7.9-12.4 7.9-12.4v-24.2s-5-31.5 4.7-37.6c9.7-6.1 21.3-3 21.3-3s-4.4-45.8 25.6-84.5 83.1-64 144.7-45.5c61.6 18.5 94.1 64.3 98.4 103.6l-2.7 25s11.2 37.1 3.6 54c0 0 23.9 22.7 28.9 37.1 0 0 3.8-42.9 30.3-46.9s25.7 27.6 25.7 27.6 25-17.1 38.9-7.3c13.9 9.8 8.6 36 .5 43.9L447.3 312s-9.7 100.1-141.1 131.8c0 0-53.9 32.7-80.7-5.8 0 0-122.1 15.3-144.6-135.2Z"
      fill="#D7EAF4"
    />
  </Svg>
);
