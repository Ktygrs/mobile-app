// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export const PenWithFrameIcon = (props: SvgProps) => (
  <Svg width={14} height={14} fill="none" {...props}>
    <Path
      fill={props.color ?? COLORS.primaryLight}
      d="M0 2.69c.06-.2.098-.414.186-.602C.553 1.3 1.18.878 2.034.864 3.342.844 4.65.857 5.958.86c.415.001.717.305.713.699-.004.394-.308.684-.728.685-1.285.002-2.57 0-3.854 0-.364.001-.63.201-.707.532a1.046 1.046 0 0 0-.019.234v8.835c0 .487.275.765.755.765h7.327c.479 0 .755-.28.755-.767.001-.685-.001-1.37.002-2.056.001-.372.213-.644.546-.714a.663.663 0 0 1 .503.097.686.686 0 0 1 .29.43c.014.072.022.146.021.22.002.69.006 1.38 0 2.07-.008 1.047-.697 1.888-1.693 2.068a2.616 2.616 0 0 1-.463.035c-2.41.002-4.82-.01-7.231.007-1.243.009-2.049-.88-2.154-1.8-.001-.012-.014-.023-.021-.034V2.691Z"
    />
    <Path
      fill={props.color ?? COLORS.primaryLight}
      d="M14 2.913c-.04.175-.07.352-.121.523-.13.422-.36.804-.672 1.112L8.683 9.145a3.559 3.559 0 0 1-2.628 1.103h-1.38c-.478-.002-.76-.283-.76-.767.001-.56-.005-1.12.018-1.68.037-.935.41-1.726 1.056-2.384C6.501 3.875 8.015 2.337 9.532.8 10.565-.243 12.132-.27 13.2.74c.43.407.678.92.77 1.512.007.045.02.089.03.133v.528Zm-5.057.445c-.014.013-.04.034-.061.056-.98.995-1.959 1.991-2.937 2.988-.123.129-.235.27-.332.42-.41.625-.338 1.331-.33 2.04.254 0 .499-.004.744.001.68.014 1.248-.235 1.726-.725.95-.973 1.906-1.939 2.86-2.908l.084-.09-1.754-1.782Zm2.754.78c.222-.237.462-.47.676-.726.331-.392.35-1.002.068-1.453a1.252 1.252 0 0 0-1.348-.537c-.527.142-.796.602-1.16.92l1.764 1.796Z"
    />
  </Svg>
);
