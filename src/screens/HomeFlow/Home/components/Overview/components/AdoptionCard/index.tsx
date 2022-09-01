// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {LevelRow} from '@screens/HomeFlow/Home/components/Overview/components/AdoptionCard/components/LevelRow';
import {CardBase} from '@screens/HomeFlow/Home/components/Overview/components/CardBase';
import {FriendsIcon} from '@svg/FriendsIcon';
import {GraphIcon} from '@svg/GraphIcon';
import {t} from '@translations/i18n';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {rem} from 'rn-units';

export const AdoptionCard = () => {
  return (
    <CardBase
      backgroundImageSource={require('./assets/images/background.png')}
      headerTitle={t('home.adoption.title')}
      headerTitleIcon={<GraphIcon fill={COLORS.white} />}
      headerValue={'28,450'}
      headerValueIcon={<FriendsIcon fill={COLORS.white} />}>
      <View style={styles.body}>
        <LevelRow level={'1'} iceValue={'5/h'} usersValue={'25k'} />
        <View style={styles.progress} />
        <LevelRow
          locked={true}
          level={'2'}
          iceValue={'15/h'}
          usersValue={'50k'}
        />
      </View>
    </CardBase>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  progress: {
    width: '50%',
    height: rem(7),
    borderRightWidth: 1,
    borderColor: COLORS.white,
  },
});
