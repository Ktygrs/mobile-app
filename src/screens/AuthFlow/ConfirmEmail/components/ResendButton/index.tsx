// SPDX-License-Identifier: BUSL-1.1

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {MIDDLE_BUTTON_HIT_SLOP} from '@constants/styles';
import {useResendCode} from '@screens/AuthFlow/ConfirmEmail/hooks/useResendCode';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

export const ResendButton = () => {
  const {resend, resendAvailable, resendTimeout} = useResendCode();
  return (
    <View style={styles.container}>
      {resendAvailable ? (
        <Touchable onPress={resend} hitSlop={MIDDLE_BUTTON_HIT_SLOP}>
          <Text style={styles.resendButtonText}>
            {t('confirm_email.send_code_again')}
          </Text>
        </Touchable>
      ) : (
        <Text style={styles.resendTimeText}>
          {t('confirm_email.resend_time_label')}
          <Text style={styles.resendTimeText_value}>
            {resendTimeout}
            {t('general.seconds_short')}
          </Text>
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: rem(10),
  },
  resendTimeText: {
    textAlign: 'center',
    ...font(16, 26, 'medium', 'secondary'),
  },
  resendTimeText_value: {
    color: COLORS.primaryLight,
  },
  resendButtonText: {
    textAlign: 'center',
    ...font(16, 26, 'medium', 'primaryLight'),
  },
});
