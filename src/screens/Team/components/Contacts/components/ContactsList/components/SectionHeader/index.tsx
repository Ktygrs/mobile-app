// SPDX-License-Identifier: BUSL-1.1

import {IceLabel} from '@components/Labels/IceLabel';
import {COLORS} from '@constants/colors';
import {ContactSection} from '@screens/Team/components/Contacts/components/ContactsList/hooks/useGetContactSegments';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {isAndroid, rem} from 'rn-units';

export const IceFriendsTitle = () => {
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
    <View style={styles.titleContainer}>
      {typeof section.title === 'string' ? (
        <Text style={styles.title}>{section.title}</Text>
      ) : (
        section.title
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    backgroundColor: COLORS.white,
  },
  title: {
    paddingTop: rem(20),
    paddingBottom: rem(6),
    marginBottom: rem(10),
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
