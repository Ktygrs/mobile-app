// SPDX-License-Identifier: BUSL-1.1

import {IceLabel} from '@components/Labels/IceLabel';
import {t} from '@translations/i18n';
import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {isAndroid} from 'rn-units';

const SmallIceLabel = (
  <IceLabel iconSize={23} iconOffsetY={isAndroid ? 6 : 2} />
);

const styles = StyleSheet.create({
  stub: {fontSize: 1},
});

export const onboardingSlides = [
  {
    key: 'welcomeToIce',
    image: require('./assets/images/welcomeToIce.png'),
    title: (
      <>
        {t('welcome.page1.title')}
        <IceLabel iconSize={34} iconOffsetY={isAndroid ? 6 : 0} />
      </>
    ),
    description: (
      <>
        {/* on iOS leading space stops IceLabel from incorrect Y offset */}
        <Text style={styles.stub}> </Text>
        {SmallIceLabel}
        {t('welcome.page1.description_part1')}
        {SmallIceLabel}
        {t('welcome.page1.description_part2')}
      </>
    ),
  },
  {
    key: 'planetFriendly',
    image: require('./assets/images/planetFriendly.png'),
    title: t('welcome.page2.title'),
    description: (
      <>
        {SmallIceLabel}
        {t('welcome.page2.description')}
      </>
    ),
  },
  {
    key: 'peoplesCoin',
    image: require('./assets/images/peoplesCoin.png'),
    title: t('welcome.page3.title'),
    description: (
      <>
        {t('welcome.page3.description_part1')}
        {SmallIceLabel}
        {t('welcome.page3.description_part2')}
      </>
    ),
  },
  {
    key: 'stayConnected',
    image: require('./assets/images/stayConnected.png'),
    title: t('welcome.page4.title'),
    description: (
      <>
        {t('welcome.page4.description_part1')}
        {SmallIceLabel}
        {t('welcome.page4.description_part2')}
        {SmallIceLabel}
        {t('welcome.page4.description_part3')}
      </>
    ),
  },
  {
    key: 'referAndEarn',
    image: require('./assets/images/referAndEarn.png'),
    title: t('welcome.page5.title'),
    description: [t('welcome.page5.description')],
  },
  {
    key: 'notifications',
    image: require('./assets/images/notifications.png'),
    title: t('welcome.page6.title'),
    description: (
      <>
        {SmallIceLabel}
        {t('welcome.page6.description')}
      </>
    ),
  },
];
