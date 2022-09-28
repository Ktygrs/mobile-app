// SPDX-License-Identifier: BUSL-1.1

import {
  UserListItemCompact,
  UserListItemCompactSkeleton,
} from '@components/ListItems/UserListItemCompact';
import {SectionHeader} from '@components/SectionHeader';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {useFetchCollection} from '@hooks/useFetchCollection';
import {HomeTabStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {CollectionActions} from '@store/modules/Collections';
import {collectionSelector} from '@store/modules/Collections/selectors';
import {t} from '@translations/i18n';
import React, {memo, useCallback, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {rem} from 'rn-units';

const MINERS_COUNT = 5;

export const TopMiners = memo(() => {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeTabStackParamList>>();

  const onSeeAllPress = useCallback(() => {
    navigation.navigate('TopMiners');
  }, [navigation]);

  const {data, fetch, hasNext} = useFetchCollection({
    selector: collectionSelector('topMiners'),
    action: CollectionActions.GET_TOP_MINERS,
    options: {pageSize: MINERS_COUNT},
  });

  useEffect(() => {
    fetch({offset: 0});
  }, [fetch]);

  return (
    <View style={styles.container}>
      <SectionHeader
        title={t('stats.top_miners')}
        action={t('buttons.see_all')}
        onActionPress={onSeeAllPress}
      />
      <View style={styles.list}>
        {hasNext && !data.length
          ? Array(MINERS_COUNT)
              .fill(null)
              .map((_, index) => <UserListItemCompactSkeleton key={index} />)
          : data.map(user => (
              <UserListItemCompact
                key={user.id}
                profilePictureUrl={user.profilePictureUrl}
                name={user.username}
                iceAmount={user.iceAmount}
              />
            ))}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginTop: rem(14),
  },
  list: {
    marginTop: rem(4),
    marginHorizontal: SCREEN_SIDE_OFFSET,
  },
});
