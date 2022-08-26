// SPDX-License-Identifier: BUSL-1.1

import {NewsPost} from '@api/news/types';
import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {FeaturedPost} from '@screens/News/FeaturedPost';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React, {useCallback} from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {rem, screenWidth} from 'rn-units';

dayjs.extend(relativeTime);

const iconSize = 47;

const news: NewsPost[] = [
  {
    id: '2',
    title: 'New security update launched for\n' + 'the Ethereum network',
    createdAt: dayjs().subtract(30, 'minutes').toDate(),
    illustration: require('./mockImages/newsPic2.png'),
    unread: true,
  },
  {
    id: '3',
    title: 'New record sale on OpenSea during\n' + 'NFT “Black Friday”',
    createdAt: dayjs().subtract(1, 'weeks').toDate(),
    illustration: require('./mockImages/newsPic3.png'),
  },
  {
    id: '4',
    title: 'More evidence game devs hate\n' + 'NFTs and crypto',
    createdAt: dayjs().subtract(2, 'weeks').toDate(),
    illustration: require('./mockImages/newsPic4.png'),
  },
  {
    id: '5',
    title: 'Blockchain-enabled digital fashion\n' + 'creates new business',
    createdAt: dayjs().subtract(5, 'months').toDate(),
    illustration: require('./mockImages/newsPic5.png'),
  },
];

export const NewsContent = () => {
  const tabBarOffset = useBottomTabBarOffsetStyle();

  const renderHeader = useCallback(() => {
    return (
      <>
        <FeaturedPost />
        <View style={styles.headerBox}>
          <Text style={styles.header}>{t('news.news_feed')}</Text>
        </View>
      </>
    );
  }, []);

  const renderItem = useCallback(({item}: {item: NewsPost}) => {
    return (
      <View style={styles.itemContainer}>
        {item.illustration && (
          <Image source={item.illustration} style={styles.iconContainer} />
        )}
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={[styles.updatedAt, item.unread ? styles.unread : {}]}>
            <Text style={styles.unreadDot}>
              {item.unread ? '\u2022 ' : null}
            </Text>
            {dayjs(item.createdAt).fromNow()}
          </Text>
        </View>
      </View>
    );
  }, []);

  return (
    <FlatList
      style={styles.container}
      ListHeaderComponent={renderHeader}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={tabBarOffset.current}
      data={news}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: screenWidth,
  },
  headerBox: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    flex: 1,
    marginTop: rem(-15),
    paddingTop: rem(22),
    paddingBottom: rem(8),
    overflow: 'hidden',
    backgroundColor: COLORS.white,
  },
  header: {
    marginLeft: rem(22),
    marginVertical: rem(4),
    ...font(18, 21.6, 'black', 'primaryDark'),
  },
  itemContainer: {
    backgroundColor: COLORS.white,
    marginVertical: rem(12),
    padding: rem(13),
    borderRadius: 16,
    flexDirection: 'row',
    marginHorizontal: rem(24),
    ...commonStyles.shadow,
  },
  iconContainer: {
    width: iconSize,
    height: iconSize,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 11,
    marginRight: 12,
  },
  title: {
    ...font(14, 16.8, 'bold', 'primaryDark'),
  },
  textContainer: {
    flex: 1,
  },
  updatedAt: {
    alignSelf: 'flex-end',
    ...font(13.5, 16.2, 'medium', 'emperor'),
  },
  unread: {
    ...font(13.5, 16.2, 'bold', 'primaryLight'),
  },
  unreadDot: {
    color: COLORS.shamrock,
  },
});
