// SPDX-License-Identifier: BUSL-1.1

import {PrimaryButton} from '@components/PrimaryButton';
import {COLORS} from '@constants/colors';
import {SCREEN_SIDE_OFFSET, SMALL_BUTTON_HIT_SLOP} from '@constants/styles';
import {MainStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {IS_STAKING_ACTIVE} from '@screens/Staking/components/Footer';
import {CloseIconSvg} from '@svg/CloseIcon';
import {StakeIcon} from '@svg/StakeIcon';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {rem} from 'rn-units';

export const MiningTooltip = ({}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.dataCell}>
          <Text style={styles.headerLabelText}>
            {t('staking.time_left').toUpperCase()}
          </Text>
          <Text style={styles.headerValueText}>21h14m3s</Text>
        </View>
        <View style={styles.headerSeparator} />
        <View style={[styles.dataCell, styles.dataCell_right]}>
          <Text style={styles.headerLabelText}>
            {t('staking.mining_rate').toUpperCase()}
          </Text>
          <Text style={styles.headerValueText}>+29.99 ice/hr</Text>
        </View>
      </View>
      {!IS_STAKING_ACTIVE.current ? (
        <>
          <Text style={styles.titleText}>{t('staking.appeal')}</Text>
          <Text style={styles.noteText}>
            {t('staking.benefits_description')}
          </Text>
          <PrimaryButton
            onPress={() => {
              navigation.goBack();
              setTimeout(() => navigation.navigate('Staking'));
            }}
            text={t('staking.stake_now')}
            style={styles.button}
            icon={<StakeIcon />}
          />
        </>
      ) : (
        <>
          <Image
            style={styles.stakeManImage}
            source={require('../assets/images/stakeMan.png')}
          />
          <Text style={styles.bonusText}>
            {t('stakings.bonus_label')}:{' '}
            <Text style={styles.bonusText_value}>+200%</Text>
          </Text>
          <View style={styles.footer}>
            <View style={styles.dataCell}>
              <Text style={styles.headerLabelText}>
                {t('staking.period_label')}
              </Text>
              <Text style={styles.headerValueText}>2 years</Text>
            </View>
            <View style={[styles.dataCell, styles.dataCell_right]}>
              <Text style={styles.headerLabelText}>
                {t('staking.balance_label')}
              </Text>
              <Text style={styles.headerValueText}>241,241 ice</Text>
            </View>
          </View>
        </>
      )}
      <TouchableOpacity
        hitSlop={SMALL_BUTTON_HIT_SLOP}
        style={styles.closeButton}
        onPress={navigation.goBack}>
        <CloseIconSvg fill={COLORS.primaryDark} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: SCREEN_SIDE_OFFSET,
    backgroundColor: COLORS.primaryDark,
    borderRadius: rem(20),
    paddingTop: rem(24),
    paddingHorizontal: rem(25),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dataCell: {
    flex: 1,
  },
  dataCell_right: {
    alignItems: 'flex-end',
  },
  headerSeparator: {
    width: 1,
    backgroundColor: COLORS.white,
    height: rem(22),
  },
  headerLabelText: {
    ...font(10, 12, 'regular'),
  },
  headerValueText: {
    marginTop: rem(2),
    ...font(15, 18, 'bold', 'shamrock'),
  },
  titleText: {
    textAlign: 'center',
    marginTop: rem(26),
    ...font(18, 22, 'black'),
  },
  noteText: {
    textAlign: 'center',
    marginTop: rem(6),
    ...font(12, 17, 'regular'),
  },
  button: {
    marginTop: rem(26),
    backgroundColor: COLORS.shamrock,
    height: rem(41),
    alignSelf: 'center',
    paddingLeft: rem(14),
    marginBottom: rem(24),
  },
  closeButton: {
    position: 'absolute',
    top: -rem(5),
    right: -rem(5),
    width: rem(22),
    height: rem(22),
    borderRadius: rem(11),
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    flexDirection: 'row',
    position: 'absolute',
    left: rem(25),
    right: rem(25),
    bottom: rem(24),
  },
  stakeManImage: {
    width: rem(118),
    height: rem(140),
    marginTop: rem(8),
    alignSelf: 'center',
  },
  bonusText: {
    textAlign: 'center',
    marginTop: rem(10),
    marginBottom: rem(6),
    ...font(10, 12, 'regular'),
  },
  bonusText_value: {
    color: COLORS.shamrock,
  },
});
