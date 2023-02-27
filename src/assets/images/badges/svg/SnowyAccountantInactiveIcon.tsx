// SPDX-License-Identifier: BUSL-1.1

import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export const SnowyAccountantInactiveIcon = (props: SvgProps) => (
  <Svg
    width={props.width}
    height={props.height}
    fill="none"
    viewBox="0 0 500 500"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="m106.2 449.8 2.3-13.6 14.4 2.2 4.2-32.1-27-6.7 5.7-28.7 13.7 1.1 36.5-73.4-11.1-19.2 9.4-11.7-18.3-28.6s-12.3.4-14.6-7.1c-2.3-7.5-9.1-1.6-10.5-9.4-1.4-7.7 3.8-16.4 3.8-16.4l-14.5-7.6 44.2-56.9s-6.7-102.6 36.5-114.3L213.3 88l87.5 1 10-69.4s30.8 3.5 40.8 30.2c10 26.7 17.9 85.5 17.9 85.5s15.7 19.8 19.8 25.7c4.1 5.9-1.6 9.8-1.6 9.8s12.8 15.5 12.1 21.2c-.7 5.7-9.4 8.7-9.4 8.7s4.8 42.9-31.3 69.2l3.5 22.1-3.5 3.9 8.3 18.3s24.6-4.9 29.1 8.6-.9 35.6-.9 35.6l-15.2 9.7 12 25-9.7 15.2s8.8 4.6 9.7 15.4c.9 10.8-12 16.5-12 16.5s-147.6 40.4-274.2 9.6Z"
      fill="#D7EAF4"
    />
  </Svg>
);
