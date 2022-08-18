// SPDX-License-Identifier: BUSL-1.1

import {NewsPost} from '@api/news/types';
import {COLORS} from '@constants/colors';
import {FONTS} from '@constants/fonts';
import {SMALL_BUTTON_HIT_SLOP} from '@constants/styles';
import {t} from '@translations/i18n';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {font, rem, screenWidth} from 'rn-units';

dayjs.extend(relativeTime);

const featuredPost: NewsPost = {
  id: '1',
  title: 'ice Network Wallet will\n' + 'be released soon',
  createdAt: dayjs().subtract(1, 'weeks').toDate(),
  illustration: require('./mockImages/newsBigPic.png'),
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
          <Text style={styles.updatedAt}>
            {dayjs(featuredPost.createdAt).fromNow()}
          </Text>
          <TouchableOpacity
            hitSlop={SMALL_BUTTON_HIT_SLOP}
            style={styles.readMore}
            onPress={() => {}}>
            <Text style={styles.readMoreText}>{t('news.read_more')}</Text>
          </TouchableOpacity>
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
    marginBottom: rem(20),
    width: screenWidth - rem(46),
    position: 'absolute',
    bottom: rem(4),
  },
  image: {
    width: screenWidth,
  },
  title: {
    fontSize: font(28),
    lineHeight: rem(33.6),
    fontFamily: FONTS.primary.black,
    color: COLORS.white,
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginVertical: rem(12),
  },
  updatedAt: {
    fontSize: font(14.5),
    lineHeight: rem(17.4),
    fontFamily: FONTS.primary.medium,
    color: COLORS.white,
    flex: 1,
  },
  readMore: {
    alignSelf: 'flex-end',
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: rem(10),
    paddingTop: rem(6),
    paddingBottom: rem(8),
    borderRadius: rem(8),
  },
  readMoreText: {
    fontSize: font(13),
    fontFamily: FONTS.primary.medium,
    color: COLORS.white,
  },
});
