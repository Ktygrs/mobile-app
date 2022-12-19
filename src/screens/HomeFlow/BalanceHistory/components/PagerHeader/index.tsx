// SPDX-License-Identifier: BUSL-1.1

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {SMALL_BUTTON_HIT_SLOP} from '@constants/styles';
import {BlockchainCell} from '@screens/HomeFlow/BalanceHistory/components/PagerHeader/components/BlockchainCell';
import {DataCellSeparator} from '@screens/HomeFlow/BalanceHistory/components/PagerHeader/components/DataCell';
import {PagerIndicators} from '@screens/HomeFlow/BalanceHistory/components/PagerHeader/components/PagerIndicators';
import {WalletCell} from '@screens/HomeFlow/BalanceHistory/components/PagerHeader/components/WalletCell';
import {ArrowLink} from '@svg/ArrowLink';
import {BottomBump} from '@svg/BottomBump';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React, {useState} from 'react';
import {Linking, PixelRatio, StyleSheet, Text, View} from 'react-native';
import PagerView, {PagerViewOnPageSelectedEvent} from 'react-native-pager-view';
import {rem} from 'rn-units';

// PixelRatio.roundToNearestPixel here is to avoid a small gap between the container and the BottomBump component
export const PAGER_HEADER_HEIGHT = PixelRatio.roundToNearestPixel(rem(116));
export const PAGER_HEADER_BUMP_HEIGHT = rem(8);
export const PAGER_HEADER_OUTER_HEIGHT =
  PAGER_HEADER_HEIGHT + PAGER_HEADER_BUMP_HEIGHT;

export const PagerHeader = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const onPageChange = (event: PagerViewOnPageSelectedEvent) => {
    setActiveIndex(event.nativeEvent.position);
  };

  const onLinkPress = () => {
    Linking.openURL('http://ice.io');
  };

  return (
    <View style={styles.container}>
      <PagerView
        initialPage={activeIndex}
        onPageSelected={onPageChange}
        style={styles.pager}>
        <View style={styles.slide}>
          <WalletCell value={'13,313.25'} />
          <DataCellSeparator />
          <BlockchainCell value={'13,313.25'} />
          <Touchable
            onPress={onLinkPress}
            style={styles.slideLink}
            hitSlop={SMALL_BUTTON_HIT_SLOP}>
            <ArrowLink width={rem(16)} height={rem(16)} />
          </Touchable>
        </View>
        <View style={styles.slide}>
          <WalletCell
            value={
              <Text style={styles.updateText}>
                {t('balance_history.wallet_update_interval')}
              </Text>
            }
            currency={''}
          />
          <DataCellSeparator />
          <BlockchainCell
            value={
              <Text style={styles.updateText}>
                {t('balance_history.blockchain_update_interval')}
              </Text>
            }
            currency={''}
          />
        </View>
      </PagerView>
      <PagerIndicators activeIndex={activeIndex} style={styles.indicators} />
      <BottomBump
        style={styles.bottomBump}
        height={PAGER_HEADER_BUMP_HEIGHT}
        width={rem(62)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primaryDark,
    borderRadius: rem(20),
    position: 'absolute',
    top: -PAGER_HEADER_HEIGHT / 2,
    left: rem(16),
    right: rem(16),
    height: PAGER_HEADER_HEIGHT,
  },
  pager: {
    flex: 1,
  },
  slide: {
    flex: 1,
    paddingHorizontal: rem(10),
    paddingTop: rem(14),
    flexDirection: 'row',
  },
  slideLink: {
    position: 'absolute',
    top: rem(14),
    right: rem(12),
  },
  updateText: {
    ...font(12, 17, 'medium'),
  },
  indicators: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
  bottomBump: {
    position: 'absolute',
    top: PAGER_HEADER_HEIGHT,
    alignSelf: 'center',
  },
});