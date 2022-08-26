// SPDX-License-Identifier: BUSL-1.1

import {SectionHeader} from '@components/SectionHeader';
import {ProfileTabStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BadgeList} from '@screens/ProfileFlow/Profile/components/Badges/components/BadgeList';
import {LAST_BADGES} from '@screens/ProfileFlow/Profile/components/Badges/mockData';
import {t} from '@translations/i18n';
import React, {memo, useCallback, useState} from 'react';

export const Badges = memo(() => {
  const navigation =
    useNavigation<NativeStackNavigationProp<ProfileTabStackParamList>>();
  const onViewAllPress = useCallback(
    () => navigation.navigate('MyBadges'),
    [navigation],
  );
  const [loading, setLoading] = useState(true);
  setTimeout(() => setLoading(false), 2000);

  return (
    <>
      <SectionHeader
        title={t('profile.my_badges').toUpperCase()}
        action={t('button.view_all')}
        onActionPress={onViewAllPress}
      />
      <BadgeList loading={loading} data={LAST_BADGES} />
    </>
  );
});
