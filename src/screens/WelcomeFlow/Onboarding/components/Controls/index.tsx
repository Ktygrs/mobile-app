// SPDX-License-Identifier: BUSL-1.1

import {PrimaryButton} from '@components/PrimaryButton';
import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {smallHeightDevice} from '@constants/styles';
import {PermissionsActions} from '@store/modules/Permissions/actions';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {rem} from 'rn-units';

type Props = {
  isLastPage: boolean;
  goNextPage: () => void;
  finishOnboarding: () => void;
};

export const Controls = ({isLastPage, goNextPage, finishOnboarding}: Props) => {
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        {isLastPage && (
          <Touchable onPress={finishOnboarding}>
            <Text style={styles.linkText}>Not now</Text>
          </Touchable>
        )}
        <PrimaryButton
          text={isLastPage ? t('button.complete') : t('button.next_step')}
          onPress={() => {
            if (isLastPage) {
              dispatch(
                PermissionsActions.GET_PERMISSIONS.START.create(
                  'pushNotifications',
                ),
              );
              finishOnboarding();
            } else {
              goNextPage();
            }
          }}
          style={[styles.button, isLastPage && styles.button_small]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    paddingTop: smallHeightDevice ? rem(0) : rem(28),
    paddingHorizontal: rem(48),
    paddingBottom: 2000,
    marginBottom: -2000,
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: rem(32),
  },
  button: {
    width: '100%',
  },
  button_small: {
    width: rem(154),
  },
  linkText: {
    marginHorizontal: rem(8),
    marginVertical: rem(10),
    ...font(14, 17, 'medium', 'primaryDark'),
  },
});
