// SPDX-License-Identifier: BUSL-1.1

import {IceLabel} from '@components/Labels/IceLabel';
import {COLORS} from '@constants/colors';
import {Images} from '@images';
import {CardBase} from '@screens/HomeFlow/Home/components/Overview/components/CardBase';
import {userIdSelector} from '@store/modules/Account/selectors';
import {isSplashHiddenSelector} from '@store/modules/AppCommon/selectors';
import {userReferralCountSelector} from '@store/modules/Referrals/selectors';
import {globalRankSelector} from '@store/modules/Tokenomics/selectors';
import {PioneerIcon} from '@svg/PioneerIcon';
import {t} from '@translations/i18n';
import {formatNumber} from '@utils/numbers';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {rem} from 'rn-units';

interface Props {
  isCollapsed: boolean;
}

export const LevelCard = ({isCollapsed}: Props) => {
  const userReferralCount = useSelector(userReferralCountSelector);
  const userId = useSelector(userIdSelector);
  const globalRank = useSelector(globalRankSelector(userId));
  const isSplashHidden = useSelector(isSplashHiddenSelector);

  return (
    <CardBase
      backgroundImageSource={Images.backgrounds.levelCardBg}
      headerTitle={t('home.pioneer.title')}
      headerTitleIcon={<PioneerIcon fill={COLORS.white} />}
      headerValue={t('global.level') + ' 1'}
      isCollapsed={isCollapsed}>
      {isSplashHidden && (
        <>
          <View style={styles.body}>
            <View style={styles.column}>
              <Text style={styles.labelText}>
                {t('home.pioneer.referrals')}
              </Text>
              <Text style={styles.valueText}>{userReferralCount}</Text>
            </View>
            <View style={styles.column}>
              {globalRank != null && (
                <>
                  <Text style={styles.labelText}>{t('home.pioneer.rank')}</Text>
                  <Text style={styles.valueText}>
                    {formatNumber(globalRank)}
                  </Text>
                </>
              )}
            </View>
          </View>
          <Text style={styles.noteText}>
            {t('home.pioneer.description_part1')}
            <IceLabel iconSize={12} />
            {t('home.pioneer.description_part2')}
          </Text>
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
    ...font(11, 13, 'regular'),
  },
});
