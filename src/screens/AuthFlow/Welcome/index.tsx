// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {Images} from '@images/index';
import {AuthActions} from '@store/modules/Auth/actions';
import {translate} from '@utils/i18n';
import React, {useRef, useState} from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import PagerView, {PagerViewOnPageSelectedEvent} from 'react-native-pager-view';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import {rem} from 'rn-units';

import {NavigationPanel} from './components/NavigationPanel';
import {WelcomeItem} from './components/WelcomeItem';

export const Welcome = () => {
  const welcomeScreenData = [
    {
      key: '1',
      title: translate('welcome.page1.title'),
      image: Images.welcome.welcome1,
      description: [0, 1, translate('welcome.page1.description')],
    },
    {
      key: '2',
      title: translate('welcome.page2.title'),
      image: Images.welcome.welcome2,
      description: [0, 1, translate('welcome.page2.description')],
    },
    {
      key: '3',
      title: translate('welcome.page3.title'),
      image: Images.welcome.welcome3,
      description: [
        translate('welcome.page3.description_part1'),
        0,
        1,
        translate('welcome.page3.description_part2'),
      ],
    },
    {
      key: '4',
      title: translate('welcome.page4.title'),
      image: Images.welcome.welcome4,
      description: [
        translate('welcome.page4.description_part1'),
        0,
        translate('welcome.page4.description_part2'),
      ],
    },
    {
      key: '5',
      title: translate('welcome.page5.title'),
      image: Images.welcome.welcome5,
      description: [translate('welcome.page5.description')],
    },
    {
      key: '6',
      title: translate('welcome.page6.title'),
      image: Images.welcome.welcome6,
      description: [0, 1, translate('welcome.page6.description')],
    },
  ];

  const pagerViewRef = useRef<PagerView>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const dispatch = useDispatch();

  const onNextPress = () => {
    const nextPage = currentPage + 1;
    if (nextPage < welcomeScreenData.length) {
      pagerViewRef.current?.setPage(nextPage);
      setCurrentPage(nextPage);
    }
  };

  const onPageSelected = (e: PagerViewOnPageSelectedEvent) => {
    setCurrentPage(e.nativeEvent.position);
  };
  const notNowPress = () => {
    dispatch(AuthActions.STORE_WELCOME_SEEN.STATE.create());
  };
  const yesPleasePress = () => {
    dispatch(AuthActions.STORE_WELCOME_SEEN.STATE.create());
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      <PagerView
        ref={pagerViewRef}
        style={styles.container}
        initialPage={0}
        onPageSelected={onPageSelected}>
        {welcomeScreenData.map(v => (
          <View key={v.key} style={styles.container}>
            <WelcomeItem
              key={v.key}
              title={v.title}
              image={v.image}
              description={v.description}
              index={v.key}
            />
          </View>
        ))}
      </PagerView>

      <NavigationPanel
        amount={welcomeScreenData.length}
        activeIndex={currentPage}
        nextPress={onNextPress}
        notNowPress={notNowPress}
        yesPleasePress={yesPleasePress}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: rem(20),
    marginTop: rem(10),
  },
});
