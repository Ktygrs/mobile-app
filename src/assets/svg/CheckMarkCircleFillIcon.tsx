// SPDX-License-Identifier: BUSL-1.1

import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

const CheckMarkCircleFillIcon = (props: SvgProps) => (
  <Svg width={20} height={20} fill="none" {...props}>
    <Path
      d="M18.333 10a8.333 8.333 0 1 1-16.666 0 8.333 8.333 0 0 1 16.666 0Zm-4.135-3.156a.781.781 0 0 0-1.125.023l-3.618 4.61-2.18-2.182a.781.781 0 0 0-1.104 1.104l2.756 2.757a.783.783 0 0 0 1.124-.02l4.158-5.198a.781.781 0 0 0-.01-1.094h-.001Z"
      fill={props.color || '#fff'}
    />
  </Svg>
);

export default CheckMarkCircleFillIcon;
