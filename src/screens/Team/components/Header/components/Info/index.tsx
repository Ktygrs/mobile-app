// SPDX-License-Identifier: BUSL-1.1

import {FormattedNumber} from '@components/Labels/FormattedNumber';
import {COLORS} from '@constants/colors';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {SEARCH_HEIGHT} from '@screens/Team/components/Header/components/Search';
import {userReferralCountSelector} from '@store/modules/Referrals/selectors';
import {balanceSummarySelector} from '@store/modules/Tokenomics/selectors';
import {useAddStepData} from '@store/modules/WalkThrough/hooks/useAddStepData';
import {TeamInactiveIcon} from '@svg/TeamInactiveIcon';
import {WalletIcon} from '@svg/WalletIcon';
import {t} from '@translations/i18n';
import {formatNumberString} from '@utils/numbers';
import {font} from '@utils/styles';
import React, {useCallback, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import {rem} from 'rn-units';

export const INFO_HEIGHT = rem(84);
const WALKTHROUGH_ELEMENT_CONTAINER_PADDING = SCREEN_SIDE_OFFSET / 2;
const BORDER_RADIUS = 20;
const CONTAINER_MARGIN_RIGHT = rem(5);

export const Info = () => {
  const refsCount = useSelector(userReferralCountSelector);
  const balanceSummary = useSelector(balanceSummarySelector);

  // TODO:walk separate component
  const renderReferralsCell = useCallback(
    (color?: string) => {
      return (
        <View style={styles.flexStartRow}>
          <TeamInactiveIcon
            color={color ?? COLORS.white}
            width={rem(38)}
            height={rem(38)}
          />
          <View style={styles.body}>
            <Text style={[styles.title, color ? {color} : null]}>
              {t('team.header.referrals')}
            </Text>
            <Text style={[styles.valueText, color ? {color} : null]}>
              {refsCount}
            </Text>
          </View>
        </View>
      );
    },
    [refsCount],
  );
  // TODO:walk separate component
  const renderEarningsCell = useCallback(
    (color: string = COLORS.white) => {
      const dynamicStyles = StyleSheet.create({
        color: {
          color: color,
        },
      });
      return (
        <View style={styles.flexEndRow}>
          <WalletIcon width={rem(25)} height={rem(25)} color={COLORS.white} />
          <View style={styles.body2}>
            {' '}
            {/* TODO: walk rename style */}
            <Text style={[styles.title, dynamicStyles.color]}>
              {t('team.header.earnings')}
            </Text>
            <View style={styles.bodyContainer}>
              <FormattedNumber
                number={
                  balanceSummary
                    ? formatNumberString(balanceSummary.totalReferrals)
                    : ''
                }
                bodyStyle={[styles.valueText, dynamicStyles.color]}
                decimalsStyle={[styles.decimalsText, dynamicStyles.color]}
                trim={true}
              />
              <Text style={styles.valueText}> {t('general.ice')}</Text>
            </View>
          </View>
        </View>
      );
    },
    [balanceSummary],
  );

  const {top: topInset} = useSafeAreaInsets();

  const addStepData = useAddStepData('team');
  const top = SEARCH_HEIGHT + topInset;
  useEffect(() => {
    const color = COLORS.primaryDark;
    addStepData({
      step: 2,
      stepData: {
        topPositionOfHighlightedElement: top,
        icon: (
          <TeamInactiveIcon width={rem(32)} height={rem(32)} color={color} />
        ),
        renderStepHighlight: () => (
          <View style={[styles.walkthroughElementOuterContainer, {top}]}>
            <View style={styles.walkthroughElementContainer}>
              <View style={styles.walkthroughElementInnerContainer}>
                {renderReferralsCell(color)}
              </View>
            </View>
          </View>
        ),
      },
    });
  }, [addStepData, topInset, renderReferralsCell, top]);
  useEffect(() => {
    const color = COLORS.primaryDark;
    addStepData({
      step: 3,
      stepData: {
        topPositionOfHighlightedElement: top,
        icon: <WalletIcon width={rem(20)} height={rem(20)} color={color} />,
        renderStepHighlight: () => (
          <View
            style={[
              styles.walkthroughElementOuterContainer,
              styles.flexEnd,
              {top},
            ]}>
            <View style={styles.walkthroughElementContainer}>
              <View style={styles.walkthroughElementInnerContainer}>
                {renderEarningsCell(color)}
              </View>
            </View>
          </View>
        ),
      },
    });
  }, [addStepData, topInset, renderEarningsCell, top]);

  return (
    <View style={styles.container}>
      {renderReferralsCell()}
      <View style={styles.divider} />
      {renderEarningsCell()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: INFO_HEIGHT,
  },
  divider: {
    width: 1,
    backgroundColor: COLORS.white,
    height: rem(22),
  },
  flexStartRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
  },
  flexEndRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
    paddingRight: rem(5),
  },
  body: {
    marginLeft: rem(10),
    justifyContent: 'center',
  },
  body2: {
    marginLeft: rem(14),
    justifyContent: 'center',
  },
  bodyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    ...font(12, 18, 'medium'),
    opacity: 0.7,
  },
  valueText: {
    paddingTop: rem(2),
    ...font(15, 18, 'bold'),
  },
  decimalsText: {
    ...font(8, 8, 'semibold'),
  },
  walkthroughElementOuterContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: INFO_HEIGHT,
  },
  flexEnd: {
    justifyContent: 'flex-end',
    marginRight: CONTAINER_MARGIN_RIGHT,
  },
  walkthroughElementContainer: {
    borderRadius: BORDER_RADIUS,
    backgroundColor: COLORS.white02opacity,
    padding: WALKTHROUGH_ELEMENT_CONTAINER_PADDING,
    justifyContent: 'center',
  },
  walkthroughElementInnerContainer: {
    borderRadius: BORDER_RADIUS,
    backgroundColor: COLORS.white,
    padding: SCREEN_SIDE_OFFSET / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
