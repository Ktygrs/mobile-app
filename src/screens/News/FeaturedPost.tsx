// SPDX-License-Identifier: BUSL-1.1

import {NewsPost} from '@api/news/types';
import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {SMALL_BUTTON_HIT_SLOP} from '@constants/styles';
import {dayjs} from '@services/dayjs';
import {ClockIcon} from '@svg/ClockIcon';
import {EyeIcon} from '@svg/EyeIcon';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {rem, screenWidth} from 'rn-units';

const featuredPost: NewsPost = {
  id: '1',
  title: 'ice Network Wallet will\n' + 'be released soon',
  createdAt: dayjs().subtract(2, 'days').toDate(),
  illustration: require('./mockImages/newsBigPic.png'),
  viewed: 100,
};

export const FeaturedPost = () => {
  return (
    <View style={styles.container}>
      {featuredPost.illustration && (
        <Image
          style={styles.image}
          resizeMode={'stretch'}
          source={featuredPost.illustration}
        />
      )}
      <View style={styles.content}>
        <Text style={styles.title}>{featuredPost.title}</Text>
        <View style={styles.details}>
          <ClockIcon color={COLORS.white} width={16} height={16} />
          <Text style={styles.updatedAt}>
            {dayjs(featuredPost.createdAt).isToday()
              ? t('news.today')
              : dayjs(featuredPost.createdAt).fromNow()}
          </Text>
          <EyeIcon fill={COLORS.white} />
          <Text style={styles.updatedAt}>{`${featuredPost.viewed} ${t(
            'news.views',
          )}`}</Text>
          <Touchable
            hitSlop={SMALL_BUTTON_HIT_SLOP}
            style={styles.readMore}
            onPress={() => {}}>
            <Text style={styles.readMoreText}>{t('news.read_more')}</Text>
          </Touchable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    alignSelf: 'center',
    marginBottom: rem(24),
    width: screenWidth - rem(46),
    position: 'absolute',
    bottom: rem(18),
  },
  image: {
    width: screenWidth,
    height: rem(407),
  },
  title: {
    ...font(28, 33.6, 'black'),
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: rem(8),
    marginBottom: rem(6),
  },
  updatedAt: {
    flex: 1,
    ...font(12, null, 'medium'),
    paddingHorizontal: rem(8),
  },
  readMore: {
    alignSelf: 'flex-end',
    backgroundColor: COLORS.white,
    paddingHorizontal: rem(18),
    paddingTop: rem(4),
    paddingBottom: rem(6),
    borderRadius: rem(18),
  },
  readMoreText: {
    ...font(15, null, 'medium', 'primaryLight'),
  },
});
