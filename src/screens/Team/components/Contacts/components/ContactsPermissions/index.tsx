// SPDX-License-Identifier: BUSL-1.1

import {IceLabel} from '@components/Labels/IceLabel';
import {PrimaryButton} from '@components/PrimaryButton';
import {COLORS} from '@constants/colors';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {PermissionsActions} from '@store/modules/Permissions/actions';
import {AddressBookIcon} from '@svg/AddressBookIcon';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import reactStringReplace from 'react-string-replace';
import {isAndroid, rem} from 'rn-units';

const icon = require('../../../../assets/images/teamAgendaNotShared.png');

export const ContactsPermissions = () => {
  const dispatch = useDispatch();
  const tabbarOffest = useBottomTabBarOffsetStyle();
  return (
    <View style={[styles.container, tabbarOffest.current]}>
      <Image source={icon} resizeMode="contain" style={styles.image} />
      <Text style={styles.title}>
        {reactStringReplace(
          t('team.contacts.empty_title'),
          '[[:ice]]',
          (match, index) => (
            <IceLabel
              key={match + index}
              iconSize={28}
              color={COLORS.primaryDark}
              iconOffsetY={isAndroid ? 2 : -1}
            />
          ),
        )}
      </Text>
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>
          {reactStringReplace(
            t('team.contacts.empty_description'),
            '[[:ice]]',
            (match, index) => (
              <IceLabel
                key={match + index}
                iconSize={14}
                color={COLORS.secondary}
                iconOffsetY={isAndroid ? 2 : -1}
              />
            ),
          )}
        </Text>
      </View>
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
  image: {width: rem(200), height: rem(170)},
  container: {
    marginTop: rem(24),
    alignItems: 'center',
    marginHorizontal: rem(38),
  },
  title: {
    marginTop: rem(16),
    textAlign: 'center',
    ...font(24, 29, 'black', 'primaryDark'),
  },
  descriptionContainer: {
    paddingHorizontal: rem(10),
  },
  description: {
    marginTop: rem(12),
    textAlign: 'center',
    ...font(14, 22, 'regular', 'secondary'),
  },
  button: {
    marginTop: rem(36),
    width: rem(253),
    height: rem(52),
    borderRadius: rem(12),
  },
  buttonText: {
    ...font(17, 20, 'bold'),
  },
});
