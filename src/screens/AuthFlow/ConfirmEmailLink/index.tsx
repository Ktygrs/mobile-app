// SPDX-License-Identifier: BUSL-1.1

import {FullScreenLoading} from '@components/FullScreenLoading';
import {PrimaryButton} from '@components/PrimaryButton';
import {Touchable} from '@components/Touchable';
import {MIDDLE_BUTTON_HIT_SLOP} from '@constants/styles';
import {useFocusStatusBar} from '@navigation/hooks/useFocusStatusBar';
import {Header} from '@screens/AuthFlow/ConfirmEmailLink/components/Header';
import {useConfirmEmailLink} from '@screens/AuthFlow/ConfirmEmailLink/hooks/useConfirmEmailLink';
import {PenWithFrameIcon} from '@svg/PenWithFrameIcon';
import {t} from '@translations/i18n';
import {font} from '@utils/styles';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {rem} from 'rn-units';

export const ConfirmEmailLink = () => {
  useFocusStatusBar({style: 'light-content'});
  const {email, validateLoading, validateError, goBack} = useConfirmEmailLink();

  return (
    <View style={styles.container}>
      <Header />
      {validateError ? (
        <>
          <Text style={styles.descriptionText}>{validateError}</Text>
          <PrimaryButton
            text={t('confirm_email.back')}
            onPress={goBack}
            style={styles.backButton}
          />
        </>
      ) : (
        <>
          <Text style={styles.descriptionText}>
            {t('confirm_email.emailed_link_to')}
          </Text>
          <View style={styles.email}>
            <Text style={styles.emailText} numberOfLines={1}>
              {email}
            </Text>
            <Touchable hitSlop={MIDDLE_BUTTON_HIT_SLOP} onPress={goBack}>
              <PenWithFrameIcon
                width={rem(14)}
                height={rem(14)}
                style={styles.emailIcon}
              />
            </Touchable>
          </View>
          <Text style={styles.instructionText}>
            {t('confirm_email.link_instruction')}
          </Text>
        </>
      )}
      {validateLoading && <FullScreenLoading />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  descriptionText: {
    marginTop: rem(24),
    marginHorizontal: rem(12),
    textAlign: 'center',
    ...font(16, 26, 'medium', 'secondary'),
  },
  email: {
    marginTop: rem(2),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emailText: {
    flexShrink: 1,
    textAlign: 'center',
    ...font(16, 26, 'black', 'secondary'),
  },
  emailIcon: {
    marginLeft: rem(14),
  },
  instructionText: {
    marginTop: rem(40),
    textAlign: 'center',
    ...font(16, 26, 'medium', 'secondary'),
  },
  backButton: {
    marginTop: rem(40),
    height: rem(52),
    alignSelf: 'center',
    paddingHorizontal: rem(54),
  },
});
