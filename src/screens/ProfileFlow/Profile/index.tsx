// SPDX-License-Identifier: BUSL-1.1

import {LinesBackground} from '@components/LinesBackground';
import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {ProfileTabStackParamList} from '@navigation/Main';
import {RouteProp, useRoute} from '@react-navigation/native';
import {AgendaContactTooltip} from '@screens/ProfileFlow/Profile/components/AgendaContactTooltip';
import {AvatarHeader} from '@screens/ProfileFlow/Profile/components/AvatarHeader';
import {Badges} from '@screens/ProfileFlow/Profile/components/Badges';
import {Invite} from '@screens/ProfileFlow/Profile/components/Invite';
import {LadderBar} from '@screens/ProfileFlow/Profile/components/LadderBar';
import {MiningCalculator} from '@screens/ProfileFlow/Profile/components/MiningCalculator';
import {Role} from '@screens/ProfileFlow/Profile/components/Role';
import {userSelector} from '@store/modules/Account/selectors';
import {contactsSelector} from '@store/modules/Contacts/selectors';
import {UsersActions} from '@store/modules/Users/actions';
import {userByIdSelector} from '@store/modules/Users/selectors';
import {isLoadingSelector} from '@store/modules/UtilityProcessStatuses/selectors';
import {t} from '@translations/i18n';
import {e164PhoneNumber} from '@utils/phoneNumber';
import {font} from '@utils/styles';
import React, {memo, useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Contact} from 'react-native-contacts';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import {useDispatch, useSelector} from 'react-redux';
import {rem, screenWidth} from 'rn-units';

const NOT_FOUND_BG = require('./assets/images/notFoundBg.png');

export const Profile = memo(() => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [contactDetails, setContactDetails] = useState<Contact>();

  const contacts = useSelector(contactsSelector);
  useFocusStatusBar({style: 'dark-content'});
  const bottomOffset = useBottomTabBarOffsetStyle();
  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });
  const dispatch = useDispatch();
  const route = useRoute<RouteProp<ProfileTabStackParamList, 'Profile'>>();
  const authUser = useSelector(userSelector);
  const isOwner = !route.params || route.params.userId === authUser?.id;

  const user = useSelector(
    isOwner ? userSelector : userByIdSelector(route.params.userId),
  );
  const userExist = !!user;

  useEffect(() => {
    if (!isOwner) {
      dispatch(UsersActions.GET_USER_BY_ID.START.create(route.params.userId));
    }
  }, [dispatch, isOwner, route.params]);

  useEffect(() => {
    if (user && user.phoneNumber && contacts?.length > 0) {
      const userContactDetails = contacts.find(contact => {
        return contact.phoneNumbers.find(phoneNumber => {
          try {
            const normalizedNumber = e164PhoneNumber(
              phoneNumber.number,
              user.country,
            );
            return normalizedNumber === user.phoneNumber;
          } catch {}
        });
      });
      if (userContactDetails) {
        setContactDetails(userContactDetails);
      }
    }
  }, [contacts, user]);

  const isLoading = useSelector(
    isLoadingSelector.bind(null, UsersActions.GET_USER_BY_ID),
  );

  return (
    <View style={styles.container}>
      <View style={styles.touchArea}>
        <AvatarHeader
          user={user}
          scrollY={scrollY}
          uri={user?.profilePictureUrl}
          isLoading={isLoading}
          showSettingsButton={isOwner}
          contact={contactDetails}
          onContactPress={() => {
            setIsTooltipVisible(state => !state);
          }}
        />
        {contactDetails && isTooltipVisible && (
          <AgendaContactTooltip contact={contactDetails} />
        )}
      </View>
      <Animated.ScrollView
        scrollEventThrottle={16}
        contentContainerStyle={[bottomOffset.current, styles.cardContainer]}
        onScroll={scrollHandler}
        showsVerticalScrollIndicator={false}
        scrollEnabled={userExist}
        onScrollBeginDrag={() => {
          if (isTooltipVisible) {
            setIsTooltipVisible(false);
          }
        }}>
        <View style={[styles.imageContainer, commonStyles.baseSubScreen]}>
          <LinesBackground />

          <Text style={styles.usernameText} numberOfLines={1}>
            {user?.username || ''}
          </Text>
        </View>
        <View style={styles.ladderContainer}>
          {userExist && <LadderBar />}
          {!userExist && !isLoading && <View style={styles.emptyLadder} />}
        </View>
        <View style={[styles.card, commonStyles.baseSubScreen]}>
          {userExist && (
            <>
              <Role user={user} />
              <Badges user={user} />
              {isOwner && (
                <>
                  <Invite />
                  <MiningCalculator />
                </>
              )}
            </>
          )}
          {!userExist && !isLoading && (
            <>
              <Image source={NOT_FOUND_BG} style={styles.notFoundBg} />
              <Text style={styles.notFoundTitle}>
                {t('profile.not_found.title')}
              </Text>
              <Text style={styles.notFoundDescription}>
                {t('profile.not_found.description')}
              </Text>
            </>
          )}
        </View>
      </Animated.ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  cardContainer: {
    backgroundColor: COLORS.white,
  },
  card: {
    // make bottom overscroll area white, otherwise it'd be of container color
    paddingBottom: 2000,
    marginBottom: -2000,
    paddingTop: rem(39),
    marginTop: -rem(23),
  },
  imageContainer: {
    marginTop: rem(20),
    overflow: 'hidden',
  },
  ladderContainer: {
    backgroundColor: COLORS.primaryLight,
    paddingBottom: rem(30),
  },
  usernameText: {
    marginTop: rem(70),
    marginBottom: rem(20),
    alignSelf: 'center',
    ...font(17, 20.4, 'semibold'),
  },
  touchArea: {
    zIndex: 1,
  },
  emptyLadder: {
    height: rem(60),
  },
  notFoundBg: {
    alignSelf: 'center',
    marginTop: -rem(110),
    width: screenWidth * 0.8,
    aspectRatio: 1,
  },
  notFoundTitle: {
    ...font(24, 29, 'black', 'primaryDark'),
    marginHorizontal: rem(20),
    textAlign: 'center',
    marginTop: rem(20),
    marginBottom: rem(16),
  },
  notFoundDescription: {
    ...font(14, 20, 'medium', 'secondary'),
    marginHorizontal: rem(20),
    textAlign: 'center',
  },
});
