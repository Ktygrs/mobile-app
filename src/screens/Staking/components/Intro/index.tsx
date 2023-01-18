// SPDX-License-Identifier: BUSL-1.1

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {LINKS} from '@constants/links';
import {
  MAX_STACKING_RATE_PERCENTAGES,
  MAX_STAKING_YEARS,
} from '@constants/staking';
import {SMALL_BUTTON_HIT_SLOP} from '@constants/styles';
import {InfoOutlineIcon} from '@svg/InfoOutlineIcon';
import {t} from '@translations/i18n';
import {openLinkWithInAppBrowser} from '@utils/device';
import {font} from '@utils/styles';
import React, {memo} from 'react';
import {StyleSheet, Text} from 'react-native';
import {rem} from 'rn-units';

export const Intro = memo(() => {
  return (
    <Text style={styles.noteText} numberOfLines={2} adjustsFontSizeToFit>
      {t('staking.benefits_description', {
        periodYears: MAX_STAKING_YEARS,
        ratePercentages: MAX_STACKING_RATE_PERCENTAGES,
      })}{' '}
      <Touchable hitSlop={SMALL_BUTTON_HIT_SLOP} onPress={onLinkPress}>
        <InfoOutlineIcon
          color={COLORS.shamrock}
          width={rem(16)}
          height={rem(16)}
        />
      </Touchable>
    </Text>
  );
});

const onLinkPress = () => {
  openLinkWithInAppBrowser({url: LINKS.PRE_STAKING});
};

const styles = StyleSheet.create({
  noteText: {
    marginHorizontal: rem(28),
    marginTop: rem(24),
    textAlign: 'center',
    ...font(14, 20, 'regular', 'white'),
  },
});
