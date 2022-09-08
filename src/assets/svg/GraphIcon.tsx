// SPDX-License-Identifier: BUSL-1.1

import * as React from 'react';
import {Path, Svg, SvgProps} from 'react-native-svg';

export const GraphIcon = (props: SvgProps) => {
  return (
    <Svg width="16" height="13" viewBox="0 0 16 13" fill="none" {...props}>
      <Path d="M9.35683 5.61024L7.98438 4.98398L9.35683 4.35772L9.9831 2.98527L10.6094 4.35772L11.9818 4.98398L10.6094 5.61024L9.9831 6.9827L9.35683 5.61024ZM2.65448 8.31517L3.28074 6.94272L4.65319 6.31646L3.28074 5.69019L2.65448 4.31774L2.02821 5.69019L0.655762 6.31646L2.02821 6.94272L2.65448 8.31517ZM5.65255 4.98398L6.37875 3.37835L7.98438 2.65215L6.37875 1.92595L5.65255 0.320312L4.92635 1.92595L3.32071 2.65215L4.92635 3.37835L5.65255 4.98398ZM2.9876 12.6457L6.98502 8.64163L9.64998 11.3066L15.313 4.93734L14.3736 3.99795L9.64998 9.30787L6.98502 6.64291L1.98824 11.6464L2.9876 12.6457Z" />
    </Svg>
  );
};