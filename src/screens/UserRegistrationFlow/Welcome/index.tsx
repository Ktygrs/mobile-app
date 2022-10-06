// SPDX-License-Identifier: BUSL-1.1

import {User} from '@api/user/types';
import {IceLabel} from '@components/Labels/IceLabel';
import {COLORS} from '@constants/colors';
import {AuthActions} from '@store/modules/Auth/actions';
import {userSelector} from '@store/modules/Auth/selectors';
import {PermissionsActions} from '@store/modules/Permissions/actions';
import {isLoadingSelector} from '@store/modules/UtilityProcessStatuses/selectors';
import {t} from '@translations/i18n';
import React, {useRef, useState} from 'react';
import {ActivityIndicator, StatusBar, StyleSheet, View} from 'react-native';
import PagerView, {PagerViewOnPageSelectedEvent} from 'react-native-pager-view';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {isAndroid, rem} from 'rn-units';

import {NavigationPanel} from './components/NavigationPanel';
import {WelcomeItem} from './components/WelcomeItem';

const images = {
  welcome1: require('./assets/images/welcome1.png'),
  welcome2: require('./assets/images/welcome2.png'),
  welcome3: require('./assets/images/welcome3.png'),
  welcome4: require('./assets/images/welcome4.png'),
  welcome5: require('./assets/images/welcome5.png'),
  welcome6: require('./assets/images/welcome6.png'),
};

const SmallIceLabel = (
  <IceLabel
    color={COLORS.primaryLight}
    iconSize={20}
    iconOffsetY={isAndroid ? 4 : 1}
  />
);

export const Welcome = () => {
  const welcomeScreenData = [
    {
      key: '1',
      title: (
        <>
          {t('welcome.page1.title')}
          <IceLabel
            color={COLORS.primaryLight}
            iconSize={34}
            iconOffsetY={isAndroid ? 6 : 0}
          />
        </>
      ),
      image: images.welcome1,
      description: (
        <>
          {' '}
          {SmallIceLabel}
          {t('welcome.page1.description_part1')}
          {SmallIceLabel}
          {t('welcome.page1.description_part2')}
        </>
      ),
    },
    {
      key: '2',
      title: t('welcome.page2.title'),
      image: images.welcome2,
      description: (
        <>
          {' '}
          {SmallIceLabel}
          {t('welcome.page2.description')}
        </>
      ),
    },
    {
      key: '3',
      title: t('welcome.page3.title'),
      image: images.welcome3,
      description: (
        <>
          {t('welcome.page3.description_part1')}
          {SmallIceLabel}
          {t('welcome.page3.description_part2')}
        </>
      ),
    },
    {
      key: '4',
      title: t('welcome.page4.title'),
      image: images.welcome4,
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
      key: '5',
      title: t('welcome.page5.title'),
      image: images.welcome5,
      description: [t('welcome.page5.description')],
    },
    {
      key: '6',
      title: t('welcome.page6.title'),
      image: images.welcome6,
      description: (
        <>
          {' '}
          {SmallIceLabel}
          {t('welcome.page6.description')}
        </>
      ),
    },
  ];

  const pagerViewRef = useRef<PagerView>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const dispatch = useDispatch();
  const user = useSelector(userSelector) as User;
  const isLoading = useSelector(
    isLoadingSelector.bind(null, AuthActions.UPDATE_ACCOUNT),
  );

  const onNextPress = () => {
    const nextPage = currentPage + 1;
    if (nextPage < welcomeScreenData.length) {
      pagerViewRef.current?.setPage(nextPage);
      setCurrentPage(nextPage);
    }
  };

  const finishOnboarding = (currentUser: User) => {
    const finalizedSteps =
      currentUser?.clientData?.registrationProcessFinalizedSteps ?? [];
    if (!finalizedSteps.includes('onboarding')) {
      dispatch(
        AuthActions.UPDATE_ACCOUNT.START.create(
          {
            clientData: {
              ...currentUser.clientData,
              registrationProcessFinalizedSteps: [
                ...finalizedSteps,
                'onboarding',
              ],
            },
          },
          function* (freshUser) {
            finishOnboarding(freshUser);
            return {retry: false};
          },
        ),
      );
    }
  };

  const onPageSelected = (e: PagerViewOnPageSelectedEvent) => {
    setCurrentPage(e.nativeEvent.position);
  };

  const notNowPress = () => {
    finishOnboarding(user);
  };
  const yesPleasePress = () => {
    dispatch(
      PermissionsActions.GET_PERMISSIONS.START.create('pushNotifications'),
    );
    finishOnboarding(user);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      <PagerView
        ref={pagerViewRef}
        style={styles.pagerView}
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

      {isLoading && (
        <ActivityIndicator
          style={[StyleSheet.absoluteFill, styles.loading]}
          size={'large'}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pagerView: {
    flex: 1,
    marginBottom: rem(20),
    marginTop: rem(10),
  },
  loading: {
    backgroundColor: COLORS.transparentBackground,
  },
});
