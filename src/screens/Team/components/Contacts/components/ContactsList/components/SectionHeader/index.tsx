// SPDX-License-Identifier: BUSL-1.1

import {stopPropagination} from '@components/KeyboardDismiss';
import {IceLabel} from '@components/Labels/IceLabel';
import {COLORS} from '@constants/colors';
import {ContactSection} from '@screens/Team/components/Contacts/components/ContactsList/hooks/useGetContactSegments';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {isAndroid, rem} from 'rn-units';

const IceFriendsHeader = () => {
  return (
    <View style={styles.friendsHeader}>
      <Text style={styles.title}>
        <IceLabel
          color={COLORS.primaryLight}
          iconSize={21}
          textStyle={styles.iceText}
          iconOffsetY={isAndroid ? 4 : 3}
        />{' '}
        {t('team.contacts_list.ice_header.friends')}
      </Text>
    </View>
  );
};

export const SectionHeader = ({section}: {section: ContactSection}) => {
  return (
    <View {...stopPropagination}>
      <View style={styles.titleContainer}>
        {section.id === 'friends' ? (
          <IceFriendsHeader />
        ) : (
          <Text style={styles.title}>{section.title}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    paddingTop: rem(26),
    backgroundColor: COLORS.white,
    marginBottom: rem(18),
    paddingBottom: rem(6),
  },
  title: {
    ...font(14, 17, 'semibold', 'primaryDark'),
  },
  friendsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -rem(14),
  },
  iceText: {
    ...font(14, 17, 'heavy', 'primaryDark'),
  },
});
