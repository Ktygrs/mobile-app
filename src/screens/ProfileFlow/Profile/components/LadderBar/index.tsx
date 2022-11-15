// SPDX-License-Identifier: BUSL-1.1

import {User} from '@api/user/types';
import {LadderItem} from '@screens/ProfileFlow/Profile/components/LadderBar/components/LadderItem';
import {t} from '@translations/i18n';
import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {rem} from 'rn-units';

type Props = {
  isProfilePrivacyEditMode?: boolean;
  user?: User | null;
};

export const LadderBar = memo(
  ({user, isProfilePrivacyEditMode = false}: Props) => {
    const hiddenElements = user?.hiddenProfileElements || [];

    return (
      <View style={styles.ladder}>
        <LadderItem
          title={t('profile.global_rank').toUpperCase()}
          value={'606,683'}
          enabled={isProfilePrivacyEditMode}
          isProfilePrivacyEditMode={isProfilePrivacyEditMode}
          privacyType="globalRank"
          hidden={hiddenElements.includes('globalRank')}
        />
        <LadderItem
          title={t('global.referrals').toUpperCase()}
          enabled={isProfilePrivacyEditMode}
          value={'1,024'}
          isProfilePrivacyEditMode={isProfilePrivacyEditMode}
          privacyType="referralCount"
          hidden={hiddenElements.includes('referralCount')}
        />
        <LadderItem
          title={t('global.level').toUpperCase()}
          value={'21'}
          enabled={isProfilePrivacyEditMode}
          isProfilePrivacyEditMode={isProfilePrivacyEditMode}
          privacyType="level"
          hidden={hiddenElements.includes('level')}
        />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  ladder: {
    flexDirection: 'row',
    paddingHorizontal: rem(32),
    justifyContent: 'space-between',
  },
});
