// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import * as React from 'react';
import Svg, {ClipPath, Defs, G, Path, SvgProps} from 'react-native-svg';
import {rem} from 'rn-units';

export const TierTwoIcon = (props: SvgProps) => (
  <Svg
    width={rem(22)}
    height={rem(22)}
    fill="none"
    viewBox="0 0 22 22"
    {...props}>
    <G clipPath="url(#a)" fill={props.color ?? COLORS.white}>
      <Path d="M17.563 18h-.938v-2.386a2.41 2.41 0 0 0-.687-1.686 2.325 2.325 0 0 0-1.657-.7v-.955c.87.001 1.704.354 2.32.98.614.626.96 1.476.962 2.361v2.387ZM13.813 18h-.938v-2.386a2.41 2.41 0 0 0-.687-1.686 2.325 2.325 0 0 0-1.657-.7H7.72c-.622 0-1.217.252-1.657.7a2.411 2.411 0 0 0-.687 1.686v2.387h-.938v-2.387a3.376 3.376 0 0 1 .963-2.36 3.256 3.256 0 0 1 2.319-.98h2.812c.87 0 1.704.353 2.32.98.614.625.96 1.475.961 2.36v2.387ZM12.875 4.637v.954c.622 0 1.218.252 1.657.7.44.447.687 1.054.687 1.687 0 .632-.247 1.24-.687 1.687a2.323 2.323 0 0 1-1.657.699v.954c.87 0 1.705-.351 2.32-.978a3.372 3.372 0 0 0 .961-2.362c0-.886-.345-1.736-.96-2.363a3.252 3.252 0 0 0-2.321-.978ZM9.125 5.591c.464 0 .917.14 1.302.402.386.263.686.635.863 1.071.178.436.224.916.134 1.38a2.4 2.4 0 0 1-.642 1.221 2.331 2.331 0 0 1-1.2.653 2.305 2.305 0 0 1-1.354-.136 2.353 2.353 0 0 1-1.052-.879 2.417 2.417 0 0 1 .292-3.013 2.323 2.323 0 0 1 1.657-.699Zm0-.954a3.24 3.24 0 0 0-1.823.563c-.54.367-.96.889-1.208 1.5a3.397 3.397 0 0 0-.187 1.93 3.36 3.36 0 0 0 .898 1.71 3.263 3.263 0 0 0 1.68.914 3.228 3.228 0 0 0 1.896-.19 3.295 3.295 0 0 0 1.472-1.23 3.385 3.385 0 0 0-.408-4.219 3.252 3.252 0 0 0-2.32-.978Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path
          fill={props.color ?? COLORS.white}
          transform="translate(3.5 4)"
          d="M0 0h15v14H0z"
        />
      </ClipPath>
    </Defs>
  </Svg>
);
