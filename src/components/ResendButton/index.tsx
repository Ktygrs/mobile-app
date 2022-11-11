// SPDX-License-Identifier: BUSL-1.1

import {Touchable} from '@components/Touchable';
import {COLORS} from '@constants/colors';
import {MIDDLE_BUTTON_HIT_SLOP} from '@constants/styles';
import {useResend} from '@hooks/useResend';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';

type Props = {
  onResend: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  lastSendTimestamp: number | null;
};

export const ResendButton = ({
  onResend,
  containerStyle,
  lastSendTimestamp,
}: Props) => {
  const {resendAvailable, resendTimeout} = useResend({lastSendTimestamp});
  return (
    <View style={containerStyle}>
      {resendAvailable ? (
        <Touchable onPress={onResend} hitSlop={MIDDLE_BUTTON_HIT_SLOP}>
          <Text style={styles.resendButtonText}>
            {t('confirm_code.send_code_again')}
          </Text>
        </Touchable>
      ) : (
        <Text style={styles.resendTimeText}>
          {t('confirm_code.resend_time_label')}
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
