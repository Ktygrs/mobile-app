// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export const CameraIcon = ({
  color = COLORS.primaryDark,
  ...props
}: SvgProps) => (
  <Svg width="20" height="16" viewBox="0 0 20 16" fill="none" {...props}>
    <Path
      d="M12.0833 1.33331H7.91663L5.83329 3.83331H3.33329C2.89127 3.83331 2.46734 4.00891 2.15478 4.32147C1.84222 4.63403 1.66663 5.05795 1.66663 5.49998V13C1.66663 13.442 1.84222 13.8659 2.15478 14.1785C2.46734 14.4911 2.89127 14.6666 3.33329 14.6666H16.6666C17.1087 14.6666 17.5326 14.4911 17.8451 14.1785C18.1577 13.8659 18.3333 13.442 18.3333 13V5.49998C18.3333 5.05795 18.1577 4.63403 17.8451 4.32147C17.5326 4.00891 17.1087 3.83331 16.6666 3.83331H14.1666L12.0833 1.33331Z"
      stroke={color}
      stroke-width={1.6}
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path
      x={6.2}
      y={5}
      d="M4 6.33331C5.38071 6.33331 6.5 5.21402 6.5 3.83331C6.5 2.4526 5.38071 1.33331 4 1.33331C2.61929 1.33331 1.5 2.4526 1.5 3.83331C1.5 5.21402 2.61929 6.33331 4 6.33331Z"
      stroke={color}
      stroke-width={1.6}
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Svg>
);
