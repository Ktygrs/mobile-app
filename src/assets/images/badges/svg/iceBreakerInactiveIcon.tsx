// SPDX-License-Identifier: BUSL-1.1

import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export const iceBreakerInactiveIcon = (props: SvgProps) => (
  <Svg
    width={props.width}
    height={props.height}
    fill="none"
    viewBox="0 0 500 500"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="m58 389 27.2-227.8 155.4-19.1 24.6-37.8 54.5 23.2 7.1-26.6h21.7l1 19.7L415.8 58l26.7 44.2-42.6 39.9h34.5L403 389.8 223.3 429 58 389Z"
      fill="#D7EAF4"
    />
  </Svg>
);
