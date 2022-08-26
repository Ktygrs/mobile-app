// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {StyleSheet} from 'react-native';
import {isIOS, rem} from 'rn-units';

export const SCREEN_SIDE_OFFSET = rem(20);

export const commonStyles = StyleSheet.create({
  baseSubScreen: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: rem(30),
    borderTopRightRadius: rem(30),
    flexGrow: 1,
  },
  shadow: isIOS
    ? {
        shadowColor: COLORS.mariner,
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowRadius: 6,
        shadowOpacity: 0.15,
      }
    : {elevation: 4},
});

export const SMALL_BUTTON_HIT_SLOP = {top: 4, left: 4, bottom: 4, right: 4};
