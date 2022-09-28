// SPDX-License-Identifier: BUSL-1.1

import {PrimaryButton} from '@components/PrimaryButton';
import {COLORS} from '@constants/colors';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {InviteIcon} from '@svg/InviteIcon';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

const icon = require('../../../../assets/images/teamTier2.png');

type Props = {
  title: string;
};

export function EmptyTier({title}: Props) {
  const tabbarOffest = useBottomTabBarOffsetStyle();
  const handleOnPress = () => {};
  return (
    <View style={[styles.container, tabbarOffest.current]}>
      <View style={styles.imageContainer}>
        <Image source={icon} style={styles.image} resizeMode="contain" />
      </View>
      <Text style={styles.title}>
        <Text>{t('team.empty.title_part1')}</Text>
        <Text style={styles.boldTitle}>{title}</Text>
        <Text>{t('team.empty.title_part2')}</Text>
      </Text>

      <PrimaryButton
        text={t('team.empty.button_title')}
        onPress={handleOnPress}
        style={styles.inviteButton}
        textStyle={styles.text}
        icon={
          <InviteIcon fill={COLORS.white} width={rem(28)} height={rem(28)} />
        }
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
    marginTop: rem(48),
  },
  image: {
    flex: 1,
  },
  title: {
    textAlign: 'center',
    marginHorizontal: SCREEN_SIDE_OFFSET,
    marginTop: rem(20),
    ...font(14, 24, 'regular'),
  },
  boldTitle: {
    ...font(14, 24, 'bold'),
  },
  inviteButton: {
    marginTop: rem(35),
    width: rem(253),
    height: rem(55),
    backgroundColor: COLORS.primary,
  },
  text: {
    ...font(18, 21.6, 'black'),
  },
});
