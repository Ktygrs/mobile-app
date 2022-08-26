// SPDX-License-Identifier: BUSL-1.1

import {PrimaryButton} from '@components/PrimaryButton';
import {Text} from '@components/Text';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {TeamAllowContactsButtonIcon} from '@screens/Team/assets/svg/TeamAllowContactsButtonIcon';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {rem} from 'rn-units';

const icon = require('../../../../assets/images/teamAgendaNotShared.png');

type ContactsPermissionsProps = {
  requestContactsAccessPermissionPress: () => void;
};

export function ContactsPermissions({
  requestContactsAccessPermissionPress,
}: ContactsPermissionsProps): React.ReactElement {
  const tabbarOffest = useBottomTabBarOffsetStyle();
  return (
    <View style={[styles.container, tabbarOffest.current]}>
      <View style={styles.imageContainer}>
        <Image source={icon} style={styles.image} resizeMode="contain" />
      </View>
      <Text style={styles.title} text="team.contacts.empty_title" />
      <Text style={styles.description} text="team.contacts.empty_description" />
      <PrimaryButton
        text={t('team.contacts.empty_button_title')}
        onPress={requestContactsAccessPermissionPress}
        style={styles.allowAccessButton}
        textStyle={styles.buttonText}
        icon={<TeamAllowContactsButtonIcon />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    maxHeight: rem(200),
    marginTop: rem(16),
  },
  image: {
    flex: 1,
  },
  title: {
    textAlign: 'center',
    marginHorizontal: SCREEN_SIDE_OFFSET,
    marginTop: rem(2),
    ...font(24, null, 'black'),
  },
  description: {
    textAlign: 'center',
    marginHorizontal: SCREEN_SIDE_OFFSET,
    marginTop: rem(7),
    ...font(14, 24, 'regular'),
  },
  allowAccessButton: {
    marginTop: rem(25),
    width: rem(253),
    height: rem(55),
  },
  buttonText: {
    ...font(18, 25, 'black'),
  },
});
