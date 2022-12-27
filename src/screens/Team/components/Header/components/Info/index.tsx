// SPDX-License-Identifier: BUSL-1.1

import {FormattedNumber} from '@components/Labels/FormattedNumber';
import {IceLabel} from '@components/Labels/IceLabel';
import {COLORS} from '@constants/colors';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {WalkThroughContext} from '@contexts/WalkThroughContext';
import {SEARCH_HEIGHT} from '@screens/Team/components/Header/components/Search';
import {TEAM_WALK_THROUGH_STEPS_VERSIONS} from '@screens/Team/constants';
import {userReferralCountSelector} from '@store/modules/Referrals/selectors';
import {TeamInactiveIcon} from '@svg/TeamInactiveIcon';
import {WalletIcon} from '@svg/WalletIcon';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React, {useCallback, useContext, useEffect} from 'react';
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
  const earningsValue = '121,985.42';

  const renderReferralsCell = useCallback(
    (color?: string) => {
      return (
        <View style={styles.conteredRow}>
          <TeamInactiveIcon color={color ?? COLORS.white} />
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
  const renderEarningsCell = useCallback(
    (color: string = COLORS.white) => {
      const dynamicStyles = StyleSheet.create({
        color: {
          color: color,
        },
      });
      return (
        <View style={styles.conteredRow}>
          <WalletIcon width={rem(25)} height={rem(25)} color={color} />
          <View style={styles.body}>
            <Text style={[styles.title, dynamicStyles.color]}>
              {t('team.header.earnings')}
            </Text>
            <View style={styles.conteredRow}>
              <FormattedNumber
                number={earningsValue}
                bodyStyle={[styles.valueText, dynamicStyles.color]}
                decimalsStyle={[styles.decimalsText, dynamicStyles.color]}
                trim={true}
              />
              <IceLabel
                textStyle={[styles.valueText, dynamicStyles.color]}
                iconOffsetY={-1}
                iconSize={rem(16)}
                color={color}
              />
            </View>
          </View>
        </View>
      );
    },
    [earningsValue],
  );

  const {top: topInset} = useSafeAreaInsets();

  const {addStepData} = useContext(WalkThroughContext);
  const top = SEARCH_HEIGHT + topInset;
  useEffect(() => {
    const color = COLORS.primaryDark;
    const stepNumber = 2;
    addStepData({
      step: stepNumber,
      stepData: {
        version: TEAM_WALK_THROUGH_STEPS_VERSIONS[stepNumber],
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
    const stepNumber = 3;
    addStepData({
      step: stepNumber,
      stepData: {
        version: TEAM_WALK_THROUGH_STEPS_VERSIONS[stepNumber],
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
    justifyContent: 'space-between',
    marginRight: CONTAINER_MARGIN_RIGHT,
    height: INFO_HEIGHT,
  },
  divider: {
    width: 1,
    backgroundColor: COLORS.white,
    height: rem(22),
  },
  conteredRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  body: {
    marginLeft: rem(8.5),
  },
  title: {
    ...font(12, 14, 'medium'),
    opacity: 0.7,
    marginBottom: 1,
  },
  valueText: {
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
