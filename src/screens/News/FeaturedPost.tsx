// SPDX-License-Identifier: BUSL-1.1

import {NewsPost} from '@api/news/types';
import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {SMALL_BUTTON_HIT_SLOP} from '@constants/styles';
import {WalkThroughContext} from '@contexts/WalkThroughContext';
import {dayjs} from '@services/dayjs';
import {ClockIcon} from '@svg/ClockIcon';
import {EyeIcon} from '@svg/EyeIcon';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import isToday from 'dayjs/plugin/isToday';
import relativeTime from 'dayjs/plugin/relativeTime';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {Image, LayoutChangeEvent, StyleSheet, Text, View} from 'react-native';
import {rem, screenWidth} from 'rn-units';

const featuredPost: NewsPost = {
  id: '1',
  title: 'ice Network Wallet will\n' + 'be released soon',
  createdAt: dayjs().subtract(2, 'days').toDate(),
  illustration: require('./mockImages/newsBigPic.png'),
  viewed: 100,
};

const WALKTHROUGH_ELEMENT_CONTAINER_PADDING_VERTICAL = rem(16);
const CONTENT_PADDING_HORIZONTAL = rem(24);

export const FeaturedPost = () => {
  const {addStepData} = useContext(WalkThroughContext);

  const readMoreButton = useMemo(
    () => (
      <Touchable
        hitSlop={SMALL_BUTTON_HIT_SLOP}
        style={styles.readMore}
        onPress={() => {}}>
        <Text style={styles.readMoreText}>{t('news.read_more')}</Text>
      </Touchable>
    ),
    [],
  );

  const [numberOfNonTriggeredOnLayout, setNumberOfNonTriggeredOnLayout] =
    useState(3);
  const [top, setTop] = useState(
    -WALKTHROUGH_ELEMENT_CONTAINER_PADDING_VERTICAL * 2,
  );
  const onLayout = useCallback(({nativeEvent}: LayoutChangeEvent) => {
    setTop(currentTop => currentTop + nativeEvent.layout.y);
    setNumberOfNonTriggeredOnLayout(n => n - 1);
  }, []);
  useEffect(() => {
    if (!numberOfNonTriggeredOnLayout) {
      addStepData({
        step: 1,
        stepData: {
          version: 1,
          top,
          renderStepHighlight: () => (
            <View style={styles.walkthroughElementOuterContainer}>
              <View style={[styles.walkthroughElementContainer, {top}]}>
                <View style={styles.walkthroughElementInnerContainer}>
                  {readMoreButton}
                </View>
              </View>
            </View>
          ),
        },
      });
    }
  }, [addStepData, readMoreButton, numberOfNonTriggeredOnLayout, top]);

  return (
    <View style={styles.container} onLayout={onLayout}>
      {featuredPost.illustration && (
        <Image
          style={styles.image}
          resizeMode={'stretch'}
          source={featuredPost.illustration}
        />
      )}
      <View style={styles.content} onLayout={onLayout}>
        <Text style={styles.title}>{featuredPost.title}</Text>
        <View style={styles.details} onLayout={onLayout}>
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
          {readMoreButton}
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
    width: screenWidth - CONTENT_PADDING_HORIZONTAL * 2,
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
  walkthroughElementOuterContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  walkthroughElementContainer: {
    borderRadius: 20,
    backgroundColor: COLORS.white02opacity,
    paddingHorizontal: rem(10),
    paddingVertical: WALKTHROUGH_ELEMENT_CONTAINER_PADDING_VERTICAL,
  },
  walkthroughElementInnerContainer: {
    borderRadius: 20,
    backgroundColor: COLORS.primaryLight2,
    paddingHorizontal: rem(14),
    paddingVertical: WALKTHROUGH_ELEMENT_CONTAINER_PADDING_VERTICAL,
  },
});
