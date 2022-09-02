// SPDX-License-Identifier: BUSL-1.1

import {DataCellSeparator} from '@components/DataCell';
import {stopPropagination} from '@components/KeyboardDismiss';
import {PrimaryButton} from '@components/PrimaryButton';
import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {useNavigation} from '@react-navigation/native';
import {BlockchainCell} from '@screens/PopUps/Balance/components/BlockchainCell';
import {WalletCell} from '@screens/PopUps/Balance/components/WalletCell';
import {CloseIcon} from '@svg/CloseIcon';
import {StakeIcon} from '@svg/StakeIcon';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

export const Balance = () => {
  const navigation = useNavigation();
  return (
    <Touchable onPress={navigation.goBack}>
      <View style={styles.background}>
        <View style={styles.container} {...stopPropagination}>
          <Text style={styles.titleText}>{t('balance_popup.title')}</Text>
          <Text style={styles.noteText}>{t('balance_popup.note')}</Text>
          <View style={styles.body}>
            <WalletCell value={'13,313.25'} />
            <DataCellSeparator />
            <BlockchainCell value={'13,313.25'} />
          </View>
          <PrimaryButton
            onPress={navigation.goBack}
            text={t('balance_popup.button_label')}
            style={styles.button}
            icon={
              <StakeIcon
                color={COLORS.white}
                width={rem(18)}
                height={rem(18)}
              />
            }
          />
          <Touchable style={styles.closeButton} onPress={navigation.goBack}>
            <CloseIcon
              width={rem(14)}
              height={rem(14)}
              color={COLORS.primaryDark}
            />
          </Touchable>
        </View>
      </View>
    </Touchable>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: COLORS.transparentBackground,
    justifyContent: 'center',
  },
  container: {
    backgroundColor: COLORS.white,
    marginHorizontal: SCREEN_SIDE_OFFSET,
    paddingHorizontal: rem(28),
    paddingVertical: rem(30),
    borderRadius: rem(20),
  },
  body: {
    marginTop: rem(16),
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    textAlign: 'center',
    ...font(18, 22, 'black', 'primaryDark'),
  },
  noteText: {
    marginTop: rem(16),
    textAlign: 'center',
    ...font(12, 17, 'medium', 'secondary'),
  },
  button: {
    height: rem(48),
    marginTop: rem(20),
    alignSelf: 'center',
    paddingHorizontal: rem(10),
    backgroundColor: COLORS.primaryLight,
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    paddingHorizontal: rem(16),
    paddingVertical: rem(16),
  },
});
