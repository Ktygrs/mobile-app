// SPDX-License-Identifier: BUSL-1.1

import {AccountActions} from '@store/modules/Account/actions';
import {
  failedReasonSelector,
  isLoadingSelector,
} from '@store/modules/UtilityProcessStatuses/selectors';
import {emailSentTimestampSelector} from '@store/modules/Validation/selectors';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

export const useModifyEmail = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');

  const modifyEmailFailedReason = useSelector(
    failedReasonSelector.bind(null, AccountActions.UPDATE_ACCOUNT),
  );

  const isModifyEmailLoading = useSelector(
    isLoadingSelector.bind(null, AccountActions.UPDATE_ACCOUNT),
  );

  const emailSentTimestamp = useSelector(emailSentTimestampSelector);

  const modifyEmail = () =>
    dispatch(AccountActions.UPDATE_ACCOUNT.START.create({email}));

  const onChangeEmail = (text: string) => {
    setEmail(text);
  };

  // clean up on component unmount
  useEffect(
    () => () => {
      dispatch(AccountActions.UPDATE_ACCOUNT.RESET.create());
    },
    [dispatch],
  );

  return {
    email,
    onChangeEmail,
    modifyEmail,
    isModifyEmailLoading,
    modifyEmailFailedReason,
    emailSentTimestamp,
  };
};
