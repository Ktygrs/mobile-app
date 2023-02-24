// SPDX-License-Identifier: BUSL-1.1

import {User} from '@api/user/types';
import {SectionHeader} from '@components/SectionHeader';
import {ProfileTabStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BadgeList} from '@screens/ProfileFlow/Profile/components/Badges/components/BadgeList';
import {LAST_BADGES} from '@screens/ProfileFlow/Profile/components/Badges/mockData';
import {userSelector} from '@store/modules/Account/selectors';
import {t} from '@translations/i18n';
import React, {memo, useCallback, useState} from 'react';
import {StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

type Props = {
  user: User | null;
  privacyInfoIsShown?: boolean;
};

export const Badges = memo(({user, privacyInfoIsShown}: Props) => {
  const authUser = useSelector(userSelector);
  const isOwner = user?.id === authUser?.id;

  const navigation =
    useNavigation<NativeStackNavigationProp<ProfileTabStackParamList>>();

  const onViewAllPress = useCallback(
    () => navigation.navigate('Badges', {userId: user?.id}),
    [navigation, user],
  );
  const [loading, setLoading] = useState(true);
  setTimeout(() => setLoading(false), 2000);

  const title = isOwner
    ? t('profile.my_badges.title')
    : t('profile.badges.title');

  return (
    <>
      <SectionHeader
        title={title.toUpperCase()}
        action={t('button.view_all')}
        onActionPress={onViewAllPress}
        style={styles.header}
      />
      <BadgeList
        privacyInfoIsShown={privacyInfoIsShown}
        loading={loading}
        user={user}
        data={LAST_BADGES}
      />
    </>
  );
});

const styles = StyleSheet.create({
  header: {
    paddingTop: 5,
    height: 24,
  },
});
