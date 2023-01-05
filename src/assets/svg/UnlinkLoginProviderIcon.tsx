// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

export const UnlinkLoginProviderIcon = ({
  color = COLORS.primary,
  ...props
}: SvgProps) => (
  <Svg
    width={rem(24)}
    height={rem(24)}
    viewBox={'0 0 24 24'}
    fill={'none'}
    color={color}
    {...props}>
    <Path
      d={
        'm2.688 3.752 1.06-1.061 2.563 2.56L5.25 6.314 2.688 3.752Zm14.998 14.992 1.061-1.06 2.56 2.561-1.06 1.061-2.561-2.562ZM8.25 1.5h1.5v3h-1.5v-3ZM1.5 8.25h3v1.5h-3v-1.5Zm18 6h3v1.5h-3v-1.5Zm-5.25 5.25h1.5v3h-1.5v-3Zm-1.815-3.697-2.783 2.79a3.003 3.003 0 0 1-5.124-2.123c0-.796.317-1.56.88-2.122l2.79-2.79L7.131 10.5 4.35 13.29a4.5 4.5 0 0 0-.045 6.405A4.5 4.5 0 0 0 7.5 21a4.553 4.553 0 0 0 3.24-1.35l2.76-2.782-1.065-1.065Zm-.878-7.606 2.79-2.79a3.001 3.001 0 1 1 4.246 4.245l-2.79 2.79 1.064 1.058 2.783-2.79a4.5 4.5 0 0 0 .045-6.405A4.5 4.5 0 0 0 16.5 3a4.552 4.552 0 0 0-3.24 1.35L10.5 7.133l1.057 1.064Z'
      }
      fill={color}
      stroke={color}
      strokeWidth={0.2}
    />
  </Svg>
);
