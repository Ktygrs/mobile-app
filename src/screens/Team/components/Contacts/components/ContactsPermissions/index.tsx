// SPDX-License-Identifier: BUSL-1.1

import {IceLabel} from '@components/Labels/IceLabel';
import {PrimaryButton} from '@components/PrimaryButton';
import {COLORS} from '@constants/colors';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {PermissionsActions} from '@store/modules/Permissions/actions';
import {AddressBookIcon} from '@svg/AddressBookIcon';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {isAndroid, rem} from 'rn-units';

const icon = require('../../../../assets/images/teamAgendaNotShared.png');

export const ContactsPermissions = () => {
  const dispatch = useDispatch();
  const tabbarOffest = useBottomTabBarOffsetStyle();
  return (
    <View style={[styles.container, tabbarOffest.current]}>
      <Image source={icon} resizeMode="contain" />
      <Text style={styles.title}>
        <IceLabel
          color={COLORS.primaryLight}
          iconSize={28}
          iconOffsetY={isAndroid ? 4 : 0}
        />
        {t('team.contacts.empty_title')}
      </Text>
      <Text style={styles.description}>
        {t('team.contacts.empty_description_part1')}
        <IceLabel
          color={COLORS.secondary}
          iconSize={14}
          iconOffsetY={isAndroid ? 2 : -1}
        />
        {t('team.contacts.empty_description_part2')}
        <IceLabel
          color={COLORS.secondary}
          iconSize={14}
          iconOffsetY={isAndroid ? 2 : -1}
        />
        {t('team.contacts.empty_description_part3')}
      </Text>
      <PrimaryButton
        text={t('team.contacts.empty_button_title')}
        onPress={() =>
          dispatch(PermissionsActions.GET_PERMISSIONS.START.create('contacts'))
        }
        style={styles.button}
        textStyle={styles.buttonText}
        icon={<AddressBookIcon />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: rem(24),
    alignItems: 'center',
    marginHorizontal: SCREEN_SIDE_OFFSET,
  },
  title: {
    marginTop: rem(16),
    textAlign: 'center',
    ...font(24, 29, 'black', 'primaryDark'),
  },
  description: {
    marginTop: rem(12),
    textAlign: 'center',
    ...font(14, 24, 'regular', 'secondary'),
  },
  button: {
    marginTop: rem(25),
    width: rem(253),
    height: rem(52),
    borderRadius: rem(12),
  },
  buttonText: {
    ...font(17, 20, 'bold'),
  },
});
