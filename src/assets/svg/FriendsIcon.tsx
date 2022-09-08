// SPDX-License-Identifier: BUSL-1.1

import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export const FriendsIcon = (props: SvgProps) => (
  <Svg width={18} height={14} fill="none" {...props}>
    <Path d="M5.49 7c1.48 0 2.678-1.174 2.678-2.625 0-1.45-1.198-2.625-2.678-2.625S2.813 2.924 2.813 4.375C2.813 5.825 4.01 7 5.49 7Zm1.836.75h-.198a3.828 3.828 0 0 1-1.638.375c-.588 0-1.138-.14-1.638-.375h-.198C2.134 7.75.9 8.96.9 10.45v.675c0 .621.514 1.125 1.148 1.125h6.885c.633 0 1.147-.504 1.147-1.125v-.675c0-1.49-1.234-2.7-2.754-2.7ZM12.375 7c1.267 0 2.295-1.008 2.295-2.25S13.642 2.5 12.375 2.5 10.08 3.508 10.08 4.75 11.108 7 12.375 7Zm1.148.75h-.091a3.278 3.278 0 0 1-1.057.188c-.373 0-.724-.075-1.057-.188h-.09c-.488 0-.938.138-1.332.36.583.617.949 1.435.949 2.34v.9c0 .052-.012.1-.014.15h4.222c.633 0 1.147-.504 1.147-1.125 0-1.45-1.198-2.625-2.677-2.625Z" />
  </Svg>
);