// SPDX-License-Identifier: BUSL-1.1

import {User} from '@api/user/types';
import {SectionHeader} from '@components/SectionHeader';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {MainTabsParamList} from '@navigation/Main';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import {TeamMember} from '@screens/HomeFlow/Home/components/Team/components/TeamMember';
import {useReferrals} from '@store/modules/Referrals/hooks/useReferrals';
import {t} from '@translations/i18n';
import React, {memo, useCallback} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {rem} from 'rn-units';

export const Team = memo(() => {
  const navigation =
    useNavigation<BottomTabNavigationProp<MainTabsParamList>>();
  const onViewTeamPress = useCallback(
    () => navigation.navigate('TeamTab'),
    [navigation],
  );
  const {referrals, loadNext, loadNextLoading} = useReferrals('T1', true);

  if (!referrals?.total) {
    return null;
  }

  return (
    <>
      <SectionHeader
        title={t('home.team.title')}
        action={t('home.team.view_team')}
        onActionPress={onViewTeamPress}
      />
      <FlatList
        horizontal
        data={referrals?.referrals ?? []}
        renderItem={renderTeamMember}
        ItemSeparatorComponent={renderSeparator}
        ListFooterComponent={
          loadNextLoading ? (
            <ActivityIndicator style={styles.activityIndicator} />
          ) : null
        }
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.memberContent}
        onEndReached={loadNext}
      />
    </>
  );
});

const renderTeamMember = ({item}: {item: User}) => {
  return (
    <TeamMember
      username={item.username}
      profilePictureUrl={item.profilePictureUrl}
      isIceFriend={Boolean(item.phoneNumber)}
    />
  );
};

const renderSeparator = () => <View style={styles.separator} />;

const styles = StyleSheet.create({
  separator: {
    width: rem(19),
  },
  memberContent: {
    marginTop: rem(18),
    paddingHorizontal: SCREEN_SIDE_OFFSET + rem(4),
    alignItems: 'center', // for activity indicator
  },
  activityIndicator: {
    marginLeft: rem(10),
  },
});
