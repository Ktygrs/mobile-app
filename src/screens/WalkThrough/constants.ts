// SPDX-License-Identifier: BUSL-1.1

import {smallHeightDevice} from '@constants/styles';
import {screenWidth} from 'rn-units/index';

export const CIRCLE_DIAMETER = screenWidth * (smallHeightDevice ? 1 : 1.1);

export const MAX_CIRCLE_OFFSCREEN = CIRCLE_DIAMETER * 0.2;

export const ANIMATION_CONFIG = {duration: 500};

export const ANIMATION_DELAY = 300;
