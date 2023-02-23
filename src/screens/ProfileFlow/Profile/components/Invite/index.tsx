// SPDX-License-Identifier: BUSL-1.1

import {InviteButton} from '@components/InviteButton';
import {LINKS} from '@constants/links';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {GreenInfoIcon} from '@svg/GreenInfoIcon';
import {t} from '@translations/i18n';
import {openLinkWithInAppBrowser} from '@utils/device';
import {font} from '@utils/styles';
import React, {memo} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

export const Invite = memo(() => (
  <View style={styles.container}>
    <InviteButton />
    <Text style={styles.text}>
      {t('profile.invite_friends_engage')}
      <Pressable
        style={styles.infoButton}
        onPress={() =>
          openLinkWithInAppBrowser({
            url: LINKS.TEAM,
          })
        }>
        <GreenInfoIcon />
      </Pressable>
    </Text>
  </View>
));

const styles = StyleSheet.create({
  text: {
    marginHorizontal: SCREEN_SIDE_OFFSET,
    marginTop: rem(32),
    textAlign: 'center',
    ...font(14, 20, 'regular', 'primaryDark'),
  },
  container: {
    marginTop: rem(26),
    marginBottom: rem(10),
  },
  infoButton: {
    paddingLeft: 5,
    alignSelf: 'flex-end',
  },
});
