// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {Images} from '@images';
import {CardBase} from '@screens/HomeFlow/Home/components/Overview/components/CardBase';
import {ReferralsEmptyState} from '@screens/HomeFlow/Home/components/Overview/components/ReferralsEmptyState';
import {isSplashHiddenSelector} from '@store/modules/AppCommon/selectors';
import {
  userReferralCountSelector,
  userT1ReferralSelector,
  userT2ReferralSelector,
} from '@store/modules/Referrals/selectors';
import {FriendsIcon} from '@svg/FriendsIcon';
import {TrophyIcon} from '@svg/TrophyIcon';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {rem} from 'rn-units';

interface Props {
  isCollapsed: boolean;
}

export const ReferralsCard = ({isCollapsed}: Props) => {
  const userReferralCount = useSelector(userReferralCountSelector);
  const userT1ReferralCount = useSelector(userT1ReferralSelector);
  const userT2ReferralCount = useSelector(userT2ReferralSelector);
  const isSplashHidden = useSelector(isSplashHiddenSelector);

  return (
    <CardBase
      backgroundImageSource={Images.backgrounds.referralsCardBg}
      headerTitle={t('home.referrals.title')}
      headerTitleIcon={<TrophyIcon fill={COLORS.white} />}
      headerValue={String(userReferralCount)}
      headerValueIcon={<FriendsIcon fill={COLORS.white} />}
      isCollapsed={isCollapsed}>
      {isSplashHidden && (
        <>
          {userReferralCount === 0 ? (
            <ReferralsEmptyState />
          ) : (
            <>
              <View style={styles.body}>
                <View style={styles.column}>
                  <Text style={styles.labelText}>
                    {t('home.referrals.users_tier_1')}
                  </Text>
                  <Text style={styles.valueText}>{userT1ReferralCount}</Text>
                </View>
                <View style={styles.column}>
                  <Text style={styles.labelText}>
                    {t('home.referrals.users_tier_2')}
                  </Text>
                  <Text style={styles.valueText}>{userT2ReferralCount}</Text>
                </View>
              </View>
              <Text style={styles.noteText}>
                {t('home.referrals.description')}
              </Text>
            </>
          )}
        </>
      )}
    </CardBase>
  );
};

const styles = StyleSheet.create({
  body: {
    flexDirection: 'row',
    marginRight: rem(24),
    flexGrow: 1,
  },
  column: {
    paddingTop: rem(6),
    flex: 1,
  },
  labelText: {
    textTransform: 'uppercase',
    opacity: 0.5,
    ...font(10, 12, 'regular'),
  },
  valueText: {
    marginTop: rem(4),
    ...font(24, 29, 'bold'),
  },
  noteText: {
    marginTop: rem(6),
    marginBottom: rem(12),
    ...font(11, 14, 'regular'),
  },
});
