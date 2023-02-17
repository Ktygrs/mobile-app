// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

export const PersonIcon = ({
  color = COLORS.primaryLight,
  ...props
}: SvgProps) => (
  <Svg
    width={rem(22)}
    height={rem(22)}
    viewBox={'0 0 18 18'}
    fill="none"
    {...props}>
    <Path
      d="M8.582 0c-.297.057-.598.098-.891.173-2.094.53-3.661 2.372-3.86 4.526a5.189 5.189 0 0 0 5.228 5.698c1.498.022 2.962.225 4.364.777.794.313 1.54.715 2.188 1.277.647.56.97 1.276.982 2.131.006.422.003.843 0 1.265-.002.442-.296.74-.738.74H2.15c-.434 0-.737-.296-.735-.725.002-.556-.014-1.115.036-1.667.063-.685.394-1.255.908-1.712.525-.467 1.125-.816 1.762-1.107.366-.167.526-.508.42-.861-.113-.373-.519-.613-.875-.46-1.154.493-2.216 1.127-2.947 2.189a3.997 3.997 0 0 0-.708 2.262c-.006.561-.036 1.13.032 1.683.131 1.059 1.021 1.802 2.09 1.803 2.694.003 5.388.003 8.082 0 1.845 0 3.69-.019 5.534.008 1.2.017 2.086-.82 2.224-1.79.002-.016.017-.03.026-.045v-1.968a.572.572 0 0 1-.03-.098c-.138-1.127-.649-2.052-1.517-2.78-.961-.803-2.063-1.346-3.252-1.72-.326-.102-.658-.185-.988-.278.006-.019.006-.032.013-.04.02-.02.044-.037.066-.056 1.396-1.196 2.04-2.708 1.882-4.544-.18-2.08-1.709-3.913-3.722-4.47C10.116.118 9.768.07 9.426 0h-.844Zm.428 8.996a3.802 3.802 0 0 1-3.801-3.794A3.8 3.8 0 0 1 8.99 1.406 3.8 3.8 0 0 1 12.8 5.19a3.802 3.802 0 0 1-3.79 3.805Z"
      fill={color}
    />
  </Svg>
);
