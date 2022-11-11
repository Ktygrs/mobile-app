// SPDX-License-Identifier: BUSL-1.1

import {MainStackParamList} from '@navigation/Main';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AccountActions} from '@store/modules/Account/actions';
import {
  actionPayloadSelector,
  failedReasonSelector,
  isLoadingSelector,
  isSuccessSelector,
} from '@store/modules/UtilityProcessStatuses/selectors';
import {ValidationActions} from '@store/modules/Validation/actions';
import {
  emailSentTimestampSelector,
  temporaryEmailSelector,
} from '@store/modules/Validation/selectors';
import {checkProp} from '@utils/guards';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

export const useConfirmEmail = () => {
  const dispatch = useDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  // do not subscribe on temporaryEmail so when we erase it ("wrong email"), the UI won't update
  const email = useSelector(temporaryEmailSelector, () => true);
  const validateError = useSelector(
    failedReasonSelector.bind(null, ValidationActions.EMAIL_VALIDATION),
  );
  const validateLoading = useSelector(
    isLoadingSelector.bind(null, ValidationActions.EMAIL_VALIDATION),
  );
  const isSuccessValidation = useSelector(
    isSuccessSelector.bind(null, ValidationActions.EMAIL_VALIDATION),
  );
  const validatePayload = useSelector(
    actionPayloadSelector.bind(null, ValidationActions.EMAIL_VALIDATION),
  );

  const emailSentTimestamp = useSelector(emailSentTimestampSelector);

  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null | undefined>(validateError);

  useEffect(() => {
    if (checkProp(validatePayload, 'errorCode')) {
      if (validatePayload.errorCode === 'INVALID_VALIDATION_CODE') {
        setCode('');
      } else if (
        ['VALIDATION_NOT_FOUND', 'CONFLICT_WITH_ANOTHER_USER'].includes(
          validatePayload.errorCode as string,
        ) &&
        validateError
      ) {
        // zero setTimeout to postpone error pop-up after step navigation change
        setTimeout(() =>
          navigation.navigate('ErrorPopUp', {message: validateError}),
        );
      }
    }
  }, [navigation, validateError, validatePayload]);

  useEffect(() => {
    setError(validateError);
  }, [validateError]);

  const onSetCode = (value: string) => {
    setCode(value);
    setError(null);
    if (value.length === 6) {
      dispatch(ValidationActions.EMAIL_VALIDATION.START.create(value));
    }
  };

  const resendCode = () => {
    dispatch(AccountActions.UPDATE_ACCOUNT.START.create({email}));
  };

  return {
    code,
    email,
    setCode: onSetCode,
    resendCode,
    validateError: error,
    validateLoading,
    isSuccessValidation,
    emailSentTimestamp,
  };
};
