// SPDX-License-Identifier: BUSL-1.1

import {CodeInput} from '@components/Inputs/CodeInput';
import {KeyboardAvoider} from '@components/KeyboardAvoider';
import {ResendButton} from '@components/ResendButton';
import {useScrollEndOnKeyboardShown} from '@hooks/useScrollEndOnKeyboardShown';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {BackButton} from '@screens/AuthFlow/ConfirmPhone/components/BackButton';
import {Description} from '@screens/AuthFlow/ConfirmPhone/components/Description';
import {Header} from '@screens/AuthFlow/ConfirmPhone/components/Header';
import {useConfirmPhone} from '@screens/AuthFlow/ConfirmPhone/hooks/useConfirmPhone';
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {rem} from 'rn-units';

export const ConfirmPhone = () => {
  useFocusStatusBar({style: 'light-content'});
  const {scrollRef} = useScrollEndOnKeyboardShown();

  const {
    code,
    phoneNumber,
    setCode,
    resendCode,
    resetValidation,
    validationError,
    validateLoading,
    isSuccessValidation,
    smsSentTimestamp,
  } = useConfirmPhone();

  return (
    <KeyboardAvoider>
      <ScrollView keyboardShouldPersistTaps={'handled'} ref={scrollRef}>
        <View style={styles.flex}>
          <Header />
          <BackButton onPress={resetValidation} />
          <Description phone={phoneNumber} />
          <CodeInput
            autoFocus={true}
            containerStyle={styles.input}
            value={code}
            setValue={setCode}
            errorText={validationError}
            editable={!validateLoading}
            validated={isSuccessValidation}
          />
          <ResendButton
            onResend={resendCode}
            containerStyle={styles.resendButton}
            lastSendTimestamp={smsSentTimestamp}
          />
        </View>
      </ScrollView>
    </KeyboardAvoider>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  input: {
    marginTop: rem(30),
    marginHorizontal: rem(22),
  },
  resendButton: {
    marginTop: rem(50),
    marginBottom: rem(16),
  },
});
