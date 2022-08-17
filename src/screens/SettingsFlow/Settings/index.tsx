// SPDX-License-Identifier: BUSL-1.1

import {User} from '@api/user/types';
import {Avatar} from '@components/Avatar/Avatar';
import {COLORS} from '@constants/colors';
import {commonStyles} from '@constants/styles';
import {useScrollShadow} from '@hooks/useScrollShadow';
import {Header} from '@navigation/components/Header';
import {LangButton} from '@navigation/components/Header/components/LangButton';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {ProfileTabStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppVersion} from '@screens/SettingsFlow/Settings/components/AppVersion';
import {
  MenuItem,
  MenuItemSeparator,
} from '@screens/SettingsFlow/Settings/components/MenuItem.tsx';
import {SectionCard} from '@screens/SettingsFlow/Settings/components/SectionCard.tsx';
import {SectionTitle} from '@screens/SettingsFlow/Settings/components/SectionTitle';
import {AuthActions} from '@store/modules/Auth/actions';
import {userSelector} from '@store/modules/Auth/selectors';
import {EraseIcon} from '@svg/EraseIcon';
import {FeedbackIcon} from '@svg/FeedbackIcon';
import {InviteIcon} from '@svg/InviteIcon';
import {LogOutIcon} from '@svg/LogOutIcon';
import {NotificationsIcon} from '@svg/NotificationsIcon';
import {PersonIcon} from '@svg/PersonIcon';
import {PrivacyIcon} from '@svg/PrivacyIcon';
import {TermsIcon} from '@svg/TermsIcon';
import {t} from '@translations/i18n';
import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated from 'react-native-reanimated';
import {useDispatch, useSelector} from 'react-redux';
import {rem} from 'rn-units';

export const Settings = memo(() => {
  const dispatch = useDispatch();
  useFocusStatusBar({style: 'light-content'});
  const bottomOffset = useBottomTabBarOffsetStyle();
  const {scrollHandler, shadowStyle} = useScrollShadow();
  const navigation =
    useNavigation<NativeStackNavigationProp<ProfileTabStackParamList>>();
  const user = useSelector(userSelector) as User;

  const deleteAccount = () => {
    dispatch(AuthActions.DELETE_ACCOUNT.START);
  };

  return (
    <View style={styles.container}>
      <Header
        color={COLORS.white}
        title={t('settings.title')}
        titlePreset={'small'}
        renderRightButtons={LangButton}
        containerStyle={shadowStyle}
      />
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={bottomOffset.current}
        showsVerticalScrollIndicator={false}>
        <View style={[styles.card, commonStyles.baseSubScreen]}>
          <View style={[styles.avatarWrapper, commonStyles.shadow]}>
            <Avatar uri={user.profilePictureUrl} style={styles.avatarImage} />
          </View>
          <SectionTitle text={t('settings.profile').toUpperCase()} />
          <SectionCard>
            <MenuItem
              title={t('settings.personal_information_title')}
              description={t('settings.personal_information_description')}
              renderIcon={PersonIcon}
              onPress={() => navigation.navigate('PersonalInformation')}
            />
            <MenuItemSeparator />
            <MenuItem
              title={t('settings.notifications_title')}
              description={t('settings.notifications_description')}
              renderIcon={() => (
                <NotificationsIcon fill={COLORS.primaryLight} width={20} />
              )}
              onPress={() => navigation.navigate('NotificationSettings')}
            />
          </SectionCard>
          <SectionTitle text={t('settings.legal').toUpperCase()} />
          <SectionCard>
            <MenuItem
              title={t('settings.terms_title')}
              description={t('settings.terms_description')}
              renderIcon={TermsIcon}
              onPress={() => {}}
            />
            <MenuItemSeparator />
            <MenuItem
              title={t('settings.privacy_title')}
              description={t('settings.privacy_description')}
              renderIcon={PrivacyIcon}
              onPress={() => {}}
            />
          </SectionCard>
          <SectionTitle text={t('settings.support').toUpperCase()} />
          <SectionCard>
            <MenuItem
              title={t('settings.feedback_title')}
              description={t('settings.feedback_description')}
              renderIcon={FeedbackIcon}
              onPress={() => {}}
            />
            <MenuItemSeparator />
            <MenuItem
              title={t('settings.invite_title')}
              description={t('button.invite_friend.description')}
              renderIcon={() => (
                <InviteIcon fill={COLORS.primaryLight} width={23} height={22} />
              )}
              onPress={() => {}}
            />
            <MenuItemSeparator />
            <MenuItem
              title={t('settings.delete_title')}
              description={t('settings.delete_description')}
              renderIcon={EraseIcon}
              onPress={deleteAccount}
              confirmation={{
                title: t('settings.delete_confirmation_title'),
                yesText: t('settings.delete_confirmation_yes'),
                noText: t('button.no'),
              }}
            />
            <MenuItemSeparator />
            <MenuItem
              title={t('settings.logout_title')}
              description={t('settings.logout_description')}
              renderIcon={LogOutIcon}
              onPress={() => {
                dispatch(AuthActions.SIGN_OUT.START.create());
              }}
              confirmation={{
                title: t('settings.logout_confirmation_title'),
                yesText: t('settings.logout_confirmation_yes'),
                noText: t('button.no'),
              }}
            />
          </SectionCard>
          <AppVersion />
        </View>
      </Animated.ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryLight,
  },
  card: {
    marginTop: rem(80),
    paddingTop: rem(12),
    // make bottom overscroll area white, otherwise it'd be of container color
    paddingBottom: 2000,
    marginBottom: -2000,
  },
  avatarWrapper: {
    position: 'absolute',
    top: -rem(43),
    left: '50%',
    marginLeft: -rem(43),
    borderRadius: rem(25),
  },
  avatarImage: {
    borderWidth: 2,
    borderColor: COLORS.white,
  },
});
