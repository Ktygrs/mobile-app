// SPDX-License-Identifier: BUSL-1.1

import {COLORS} from '@constants/colors';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React, {useEffect} from 'react';
import {BackHandler, Image, StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

const icon = require('./assets/images/updateRequiredPleaseUpdateGrafik.png');

export const UpdateRequired = () => {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );
    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.titleText}>{t('update_required.title')}</Text>
        <Text style={styles.subtitleText}>
          {t('update_required.description')}
        </Text>
        <Image source={icon} style={styles.icon} />
        <View style={[styles.buttonContainer]}>
          <Text style={[styles.buttonLabelText]}>
            {t('update_required.button_title')}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: COLORS.black04opacity,
    justifyContent: 'center',
  },
  container: {
    backgroundColor: COLORS.white,
    marginHorizontal: SCREEN_SIDE_OFFSET,
    paddingHorizontal: rem(28),
    paddingTop: rem(30),
    paddingBottom: rem(38),
    borderRadius: rem(20),
  },
  titleText: {
    textAlign: 'center',
    ...font(24, 29, 'black', 'primaryDark'),
  },
  subtitleText: {
    marginTop: rem(12),
    textAlign: 'center',
    ...font(12, 14, 'medium', 'secondary'),
  },
  buttonContainer: {
    width: rem(145),
    height: rem(41),
    borderRadius: rem(11),
    marginTop: rem(10),
    justifyContent: 'center',
    backgroundColor: COLORS.primaryLight,
    alignSelf: 'center',
  },
  buttonLabelText: {
    textAlign: 'center',
    ...font(12, 15, 'black'),
  },
  icon: {
    width: rem(250),
    height: rem(230),
    marginTop: rem(10),
  },
});
