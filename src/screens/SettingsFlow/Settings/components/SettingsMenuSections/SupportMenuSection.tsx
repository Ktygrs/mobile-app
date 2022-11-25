// SPDX-License-Identifier: BUSL-1.1

import {IceLabel} from '@components/Labels/IceLabel';
import {COLORS} from '@constants/colors';
import {MainNavigationParams} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MenuItem} from '@screens/SettingsFlow/Settings/components/MenuItem.tsx';
import {SectionTitle} from '@screens/SettingsFlow/Settings/components/SectionTitle';
import {AccountActions} from '@store/modules/Account/actions';
import {EraseIcon} from '@svg/EraseIcon';
import {FeedbackIcon} from '@svg/FeedbackIcon';
import {InviteIcon} from '@svg/InviteIcon';
import {LogOutIcon} from '@svg/LogOutIcon';
import {t} from '@translations/i18n';
import React from 'react';
import {useDispatch} from 'react-redux';
import {isAndroid} from 'rn-units';

export const SupportMenuSection = () => {
  const dispatch = useDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<MainNavigationParams>>();
  return (
    <>
      <SectionTitle text={t('settings.support').toUpperCase()} />
      <MenuItem
        title={t('settings.feedback_title')}
        description={t('settings.feedback_description')}
        renderIcon={FeedbackIcon}
        onPress={() => {}}
      />
      <MenuItem
        title={t('settings.invite_title')}
        description={
          <>
            {t('button.invite_friend.description_part1')}
            <IceLabel
              color={COLORS.secondary}
              iconSize={14}
              iconOffsetY={isAndroid ? 3 : 2}
            />
            {t('button.invite_friend.description_part2')}
          </>
        }
        renderIcon={() => (
          <InviteIcon fill={COLORS.primaryLight} width={23} height={22} />
        )}
        onPress={() => navigation.navigate('InviteShare')}
      />
      <MenuItem
        title={t('settings.delete_title')}
        description={
          <>
            {t('settings.delete_description_part1')}
            <IceLabel
              color={COLORS.secondary}
              iconSize={14}
              iconOffsetY={isAndroid ? 3 : 2}
            />
            {t('settings.delete_description_part2')}
          </>
        }
        renderIcon={EraseIcon}
        onPress={() => dispatch(AccountActions.DELETE_ACCOUNT.START)}
        confirmation={{
          title: t('settings.delete_confirmation_title'),
          yesText: t('settings.delete_confirmation_yes'),
          noText: t('button.no'),
        }}
      />
      <MenuItem
        title={t('settings.logout_title')}
        description={t('settings.logout_description')}
        renderIcon={LogOutIcon}
        onPress={() => {
          dispatch(AccountActions.SIGN_OUT.START.create());
        }}
        confirmation={{
          title: t('settings.logout_confirmation_title'),
          yesText: t('settings.logout_confirmation_yes'),
          noText: t('button.no'),
        }}
      />
    </>
  );
};
