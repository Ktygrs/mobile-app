// SPDX-License-Identifier: BUSL-1.1

import {useFocusEffect} from '@react-navigation/native';
import {AccountActions} from '@store/modules/Account/actions';
import {
  failedReasonSelector,
  isSuccessSelector,
  processStatusForActionSelector,
} from '@store/modules/UtilityProcessStatuses/selectors';
import {
  smsSentTimestampSelector,
  temporaryPhoneNumberSelector,
} from '@store/modules/Validation/selectors';
import {RootState} from '@store/rootReducer';
import {useCallback, useEffect, useState} from 'react';
import {BackHandler} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

export const useConfirmPhone = () => {
  const dispatch = useDispatch();
  const [code, setCode] = useState('');

  const phoneNumber = useSelector(temporaryPhoneNumberSelector, () => true);

  const validateError = useSelector(
    failedReasonSelector.bind(null, AccountActions.SIGN_IN_PHONE),
  );

  const validateLoading = useSelector(
    (state: RootState) =>
      processStatusForActionSelector(state, AccountActions.SIGN_IN_PHONE)
        ?.status === 'CONFIRM_TEMP_PHONE',
  );

  const isSuccessValidation = useSelector(
    isSuccessSelector.bind(null, AccountActions.SIGN_IN_PHONE),
  );

  const smsSentTimestamp = useSelector(smsSentTimestampSelector);

  useEffect(() => {
    if (validateError) {
      setCode('');
    }
  }, [validateError]);

  const onSetCode = (value: string) => {
    setCode(value);
    if (validateError) {
      dispatch(AccountActions.SIGN_IN_PHONE.CLEAR_ERROR.create());
    }
    if (value.length === 6) {
      dispatch(AccountActions.SIGN_IN_PHONE.CONFIRM_TEMP_PHONE.create(value));
    }
  };

  const resendCode = () => {
    dispatch(AccountActions.SIGN_IN_PHONE.RESEND.create());
  };

  const goBack = () => {
    dispatch(AccountActions.SIGN_IN_PHONE.RESET.create());
  };

  useFocusEffect(
    useCallback(() => {
      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        () => {
          dispatch(AccountActions.SIGN_IN_PHONE.RESET.create());
          return true;
        },
      );
      return () => subscription.remove();
    }, [dispatch]),
  );

  return {
    code,
    phoneNumber,
    setCode: onSetCode,
    resendCode,
    validateError,
    validateLoading,
    isSuccessValidation,
    smsSentTimestamp,
    goBack,
  };
};
