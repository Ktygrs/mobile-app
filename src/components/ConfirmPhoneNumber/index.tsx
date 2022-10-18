// SPDX-License-Identifier: BUSL-1.1

import {CommonInput} from '@components/Inputs/CommonInput';
import {PrimaryButton} from '@components/PrimaryButton';
import {SCREEN_SIDE_OFFSET} from '@constants/styles';
import {Images} from '@images';
import {useBottomTabBarOffsetStyle} from '@navigation/hooks/useBottomTabBarOffsetStyle';
import {MainStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack/lib/typescript/src/types';
import {
  actionPayloadSelector,
  failedReasonSelector,
  isLoadingSelector,
} from '@store/modules/UtilityProcessStatuses/selectors';
import {ValidationActions} from '@store/modules/Validation/actions';
import {TicketIcon} from '@svg/Ticket';
import {t} from '@translations/i18n';
import {checkProp} from '@utils/guards';
import {font} from '@utils/styles';
import React, {memo, useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {rem} from 'rn-units';

type Props = {
  onSubmitPress: (code: string) => void;
};

export const ConfirmPhoneNumber = memo(({onSubmitPress}: Props) => {
  const [code, onCodeChange] = useState('');
  const [focused, setFocused] = useState(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();

  const handleOnPress = () => {
    onSubmitPress(code);
  };

  const tabbarOffest = useBottomTabBarOffsetStyle();

  const isLoading = useSelector(
    isLoadingSelector.bind(null, ValidationActions.PHONE_VALIDATION),
  );

  const failedReason = useSelector(
    failedReasonSelector.bind(null, ValidationActions.PHONE_VALIDATION),
  );

  const validatePayload = useSelector(
    actionPayloadSelector.bind(null, ValidationActions.PHONE_VALIDATION),
  );

  useEffect(() => {
    if (
      checkProp(validatePayload, 'errorCode') &&
      ['VALIDATION_NOT_FOUND', 'CONFLICT_WITH_ANOTHER_USER'].includes(
        validatePayload.errorCode as string,
      ) &&
      failedReason
    ) {
      navigation.navigate('ErrorPopUp', {message: failedReason});
    }
  }, [validatePayload, failedReason, navigation]);

  return (
    <View style={[styles.container, tabbarOffest.current]}>
      {!focused && (
        <Image
          source={Images.phone.confirmPhoneNumber}
          style={styles.image}
          resizeMode="contain"
        />
      )}
      <Text style={styles.title}>{t('team.confirm_code.title')}</Text>
      {!focused && (
        <Text style={styles.description}>
          {t('team.confirm_code.description')}
        </Text>
      )}
      <CommonInput
        label={t('team.confirm_code.placeholder')}
        value={code}
        onChangeText={onCodeChange}
        icon={<TicketIcon />}
        autoCorrect={false}
        keyboardType="name-phone-pad"
        returnKeyType="done"
        onSubmitEditing={handleOnPress}
        containerStyle={styles.input}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        editable={!isLoading}
        errorText={failedReason}
      />
      <PrimaryButton
        text={t('team.confirm_code.button')}
        onPress={handleOnPress}
        style={styles.allowAccessButton}
        loading={isLoading}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: rem(25),
    paddingHorizontal: rem(27),
  },
  image: {
    alignSelf: 'center',
    flex: 1,
    maxHeight: rem(200),
  },
  title: {
    textAlign: 'center',
    marginHorizontal: SCREEN_SIDE_OFFSET,
    marginTop: rem(2),
    ...font(24, 29, 'black', 'primaryDark'),
  },
  description: {
    textAlign: 'center',
    marginHorizontal: SCREEN_SIDE_OFFSET,
    marginTop: rem(7),
    ...font(14, 24, 'regular', 'secondary'),
  },
  input: {
    marginTop: rem(20),
  },
  allowAccessButton: {
    marginTop: rem(25),
  },
});
