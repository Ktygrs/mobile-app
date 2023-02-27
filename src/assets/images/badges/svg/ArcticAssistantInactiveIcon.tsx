// SPDX-License-Identifier: BUSL-1.1

import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export const ArcticAssistantInactiveIcon = (props: SvgProps) => (
  <Svg
    width={props.width}
    height={props.height}
    fill="none"
    viewBox="0 0 500 500"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M139.6 404.7V348s-28.1-29-31.9-36c0 0-14.3-2.9-17.8-19.1L82.6 263l-32.9-2.8 4.1-87.6 44.9-9.3s6-29.5 25.3-42.2l-4.7-16.9s32-23.6 67.7-13.6c0 0 20.2-13.9 43.8-12.4 0 0 36.6-16.8 61.8 10.9l11 2.7s21.2-30.2 58.5-33c0 0 8.5 18.2 0 24.6 0 0 36.7-4.9 47.7 16.8l-15.1 20.1s17.2 21 15.1 38c-2.1 17-34.9-4.7-34.9-4.7s14.1 44.3.9 94.5l8.1 13.2 20.1-16.9 10.5 5.2-17.2-49.6 50.3-29 35.8 97.5s-41.2 29.1-42.5 29.1c-1.4 0-11.7 19.8-11.7 19.8l-14.1 4.4-26.1 18.4v55.6s45.1-14.9 55.5-25.5c10.4-10.6-2.9 18.3-2.6 19.8.4 1.5-104.2 38.4-352 24.3 0 0-4.2-6.9 0-9.6 4.2-2.9 49.7-.1 49.7-.1Z"
      fill="#D7EAF4"
    />
  </Svg>
);
