// SPDX-License-Identifier: BUSL-1.1

import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

export const OpenedEyeIcon = (props: SvgProps) => (
  <Svg
    width={rem(24)}
    height={rem(24)}
    viewBox={'0 0 24 24'}
    fill="none"
    {...props}>
    <Path
      d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"
      stroke="#0D265E"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
      stroke="#0D265E"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
