// SPDX-License-Identifier: BUSL-1.1

import {NewsPost} from '@api/news/types';
import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {FeaturedPost} from '@screens/News/FeaturedPost';
import {dayjs} from '@services/dayjs';
import {ClockIcon} from '@svg/ClockIcon';
import {EyeIcon} from '@svg/EyeIcon';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React, {useCallback} from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {rem, screenWidth} from 'rn-units';

const iconWidth = rem(100);
const iconHeight = rem(105);

const news: NewsPost[] = [
  {
    id: '2',
    title: 'DeFi Yield Protocol (DYP) Anticipates Metaverse Platform Launch',
    subtitle: 'DeFi Yield Protocol (DYP)...',
    createdAt: dayjs().subtract(30, 'minutes').toDate(),
    illustration: require('./mockImages/newsPic3.png'),
    unread: true,
    viewed: 100,
  },
  {
    id: '3',
    title:
      'KuCoin & 15 More Crypto Exchanges Face Ire of South Korean Regulator',
    subtitle: 'DeFi Yield Protocol (DYP)...',
    createdAt: dayjs().subtract(30, 'minutes').toDate(),
    illustration: require('./mockImages/newsPic4.png'),
    viewed: 100,
  },
  {
    id: '4',
    title: 'Do We Truly Own Our Data Today?',
    subtitle: 'DeFi Yield Protocol (DYP)...',
    createdAt: dayjs().subtract(30, 'minutes').toDate(),
    illustration: require('./mockImages/newsPic5.png'),
    viewed: 100,
  },
  {
    id: '5',
    title: 'DeFi Yield Protocol (DYP) Anticipates Metaverse Platform Launch',
    subtitle: 'DeFi Yield Protocol (DYP)...',
    createdAt: dayjs().subtract(30, 'minutes').toDate(),
    illustration: require('./mockImages/newsPic3.png'),
    viewed: 100,
  },
];

export const NewsContent = () => {
  const tabBarOffset = useBottomTabBarOffsetStyle();

  const renderHeader = useCallback(() => {
    return (
      <>
        <FeaturedPost />
        <View style={[commonStyles.baseSubScreen, styles.headerBox]}>
          <Text style={styles.newsFeed}>{t('news.news_feed')}</Text>
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
          <Text style={styles.title} numberOfLines={3}>
            {item.title}
          </Text>
          <Text style={styles.subtitle}>{item.subtitle}</Text>

          <View style={styles.detailsContainer}>
            <View style={styles.details}>
              <ClockIcon color={COLORS.secondary} width={16} height={16} />
              <Text style={styles.updatedAt}>
                {dayjs(item.createdAt).isToday()
                  ? t('news.today')
                  : dayjs(item.createdAt).fromNow()}
              </Text>
            </View>
            <View style={styles.details}>
              <EyeIcon fill={COLORS.secondary} />
              <Text style={styles.updatedAt}>{`${item.viewed} ${t(
                'news.views',
              )}`}</Text>
            </View>
          </View>
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
    marginTop: -rem(32),
    paddingTop: rem(28),
    paddingBottom: rem(16),
    marginBottom: -rem(16),
    paddingLeft: rem(24),
  },
  itemContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
    marginVertical: rem(9),
    padding: rem(16),
    borderRadius: rem(16),
    flexDirection: 'row',
    marginHorizontal: rem(24),
    ...commonStyles.shadow,
  },
  iconContainer: {
    width: iconWidth,
    height: iconHeight,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: rem(16),
    marginRight: rem(14),
  },
  title: {
    flex: 1,
    ...font(14, 16.8, 'semibold', 'primaryDark'),
  },
  subtitle: {
    flex: 1,
    ...font(12, 14.4, 'semibold', 'secondary'),
  },
  textContainer: {
    justifyContent: 'space-between',
    flex: 1,
  },
  updatedAt: {
    marginLeft: rem(10),
    alignSelf: 'flex-start',
    ...font(12, 14, 'regular', 'secondary'),
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: rem(20),
  },
  newsFeed: {
    ...font(15, 16, 'semibold', 'primaryDark'),
  },
  detailsContainer: {
    flexDirection: 'row',
  },
});
