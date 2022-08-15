// SPDX-License-Identifier: BUSL-1.1

import * as React from 'react';
import Svg, {Circle, Path, SvgProps} from 'react-native-svg';

export const CameraIcon = (props: SvgProps) => (
  <Svg viewBox="0 0 48 48" width={48} height={48} {...props}>
    <Circle cx={24} cy={24} r={6.4} />
    <Path d="m18 4-3.66 4H8c-2.21 0-4 1.79-4 4v24c0 2.21 1.79 4 4 4h32c2.21 0 4-1.79 4-4V12c0-2.21-1.79-4-4-4h-6.34L30 4H18zm6 30c-5.52 0-10-4.48-10-10s4.48-10 10-10 10 4.48 10 10-4.48 10-10 10z" />
    <Path d="M0 0h48v48H0z" fill="none" />
  </Svg>
);
