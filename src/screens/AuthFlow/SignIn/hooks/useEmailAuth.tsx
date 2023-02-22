// SPDX-License-Identifier: BUSL-1.1

import {AccountActions} from '@store/modules/Account/actions';
import {
  failedReasonSelector,
  isLoadingSelector,
} from '@store/modules/UtilityProcessStatuses/selectors';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

export const useEmailAuth = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');

  const emailAuthFailedReason = useSelector(
    failedReasonSelector.bind(null, AccountActions.SIGN_IN_EMAIL),
  );

  const isEmailAuthLoading = useSelector(
    isLoadingSelector.bind(null, AccountActions.SIGN_IN_EMAIL),
  );

  const signInWithEmail = () =>
    dispatch(AccountActions.SIGN_IN_EMAIL.START.create(email));

  return {
    email,
    setEmail,
    signInWithEmail,
    isEmailAuthLoading,
    emailAuthFailedReason,
  };
};
