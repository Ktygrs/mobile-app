// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import * as React from 'react';
import {Path, Svg, SvgProps} from 'react-native-svg';

export const EmailIcon = (props: SvgProps) => {
  return (
    <Svg width="19" height="14" viewBox="0 0 19 14" fill="none" {...props}>
      <Path
        d="m9.48 12.999-6.264-.001c-1.126-.002-2.002-.73-2.19-1.808A2.44 2.44 0 0 1 1 10.774V3.206C1 1.92 1.938 1 3.254 1h12.491c1.316 0 2.251.916 2.252 2.206.003 2.529.002 5.057 0 7.586 0 1.289-.937 2.204-2.253 2.205-2.088.002-4.176.003-6.264 0Zm-7.293-8.8v.218c0 2.111.013 4.222-.008 6.333-.006.65.461 1.096 1.114 1.094 4.139-.014 8.278-.007 12.416-.007.715 0 1.103-.377 1.103-1.072v-6.37c0-.061-.005-.124-.009-.206-.08.044-.134.072-.186.102l-5.735 3.36c-.907.529-1.827.538-2.738.012-1.462-.844-2.918-1.697-4.377-2.545-.513-.3-1.027-.597-1.58-.918ZM16.774 2.88a.895.895 0 0 0-.026-.1c-.16-.407-.51-.618-1.03-.618H3.282c-.055 0-.111 0-.167.003-.386.025-.655.219-.836.547-.072.131-.05.204.09.285 2.09 1.206 4.18 2.411 6.26 3.633.577.339 1.11.346 1.685.008 1.815-1.067 3.64-2.118 5.461-3.175.334-.193.667-.388 1-.583Z"
        fill={props.color ?? COLORS.secondary}
        stroke={props.color ?? COLORS.secondary}
        strokeWidth={0.2}
      />
    </Svg>
  );
};
