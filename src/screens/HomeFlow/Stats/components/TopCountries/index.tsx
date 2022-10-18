// SPDX-License-Identifier: BUSL-1.1

import {
  CountryListItem,
  CountryListItemSkeleton,
} from '@components/ListItems/CountryListItem';
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

const COUNTRIES_COUNT = 5;

export const TopCountries = memo(() => {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeTabStackParamList>>();

  const onSeeAllPress = useCallback(() => {
    navigation.navigate('TopCountries');
  }, [navigation]);

  const {data, fetch, hasNext} = useFetchCollection({
    selector: collectionSelector('topStatsCountries'),
    action: CollectionActions.GET_TOP_STATS_COUNTRIES,
    options: {pageSize: COUNTRIES_COUNT},
  });

  useEffect(() => {
    fetch({offset: 0});
  }, [fetch]);

  return (
    <View style={styles.container}>
      <SectionHeader
        title={t('stats.top_countries')}
        action={t('button.see_all')}
        onActionPress={onSeeAllPress}
      />
      <View style={styles.list}>
        {hasNext && !data.length
          ? Array(COUNTRIES_COUNT)
              .fill(null)
              .map((_, index) => <CountryListItemSkeleton key={index} />)
          : data.map(country => (
              <CountryListItem
                key={country.country}
                code={country.country}
                userCount={country.userCount}
              />
            ))}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginTop: rem(12),
  },
  list: {
    marginHorizontal: SCREEN_SIDE_OFFSET,
  },
});
