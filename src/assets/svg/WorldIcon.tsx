// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {ClipPath, Defs, G, Path, SvgProps} from 'react-native-svg';

export const WorldIcon = (props: SvgProps) => (
  <Svg width={19} height={19} viewBox={'0 0 19 19'} fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        d="M9.485 0h-.01A9.505 9.505 0 0 0 .719 13.128a9.451 9.451 0 0 0 2.055 3.075A9.33 9.33 0 0 0 9.431 19c5.27 0 9.563-4.248 9.569-9.471A9.516 9.516 0 0 0 9.485 0ZM1.681 8.616c.16-2.676 2.264-5.48 4.79-6.384l.137-.048-.042.138c-.094.31-.196.625-.295.93-.227.702-.461 1.428-.624 2.158-.162.728-.258 1.488-.351 2.223-.041.327-.084.665-.132.998l-.01.062H1.677l.005-.077Zm4.795 8.164c-2.601-1-4.578-3.63-4.808-6.392l-.007-.078h3.494l.01.062c.047.332.09.669.132.995.094.738.19 1.502.354 2.235.162.728.397 1.453.623 2.154.1.306.202.623.297.935l.043.143-.138-.054Zm.357-8.171c.113-1.911.354-3.935 1.34-5.788.19-.347.43-.663.713-.94.392-.389.794-.392 1.232-.01.479.42.755.964.981 1.489.626 1.448.954 3.067 1.064 5.25l.004.076H6.828l.005-.077Zm5.367 1.782c-.03.255-.059.51-.086.762-.06.55-.122 1.12-.211 1.672-.22 1.369-.563 2.439-1.08 3.367-.149.275-.329.533-.536.768-.27.3-.54.453-.804.453a.87.87 0 0 1-.023 0c-.258-.01-.508-.165-.742-.463a6.943 6.943 0 0 1-.91-1.55c-.656-1.547-.845-3.17-.937-4.412a15.56 15.56 0 0 1-.022-.394l-.01-.208-.004-.076h5.374l-.01.081Zm5.13 0c-.225 2.757-2.244 5.401-4.908 6.43l-.164.063.071-.16a16.155 16.155 0 0 0 1.423-6.34l.001-.071h3.584l-.006.078Zm.003-1.7h-3.577l-.002-.072a16.268 16.268 0 0 0-1.407-6.3l-.054-.123.132.021c2.12.331 4.87 3.92 4.907 6.4v.073Z"
        fill={props.fill ?? COLORS.white}
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill={props.fill ?? COLORS.white} d="M0 0h19v19H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
