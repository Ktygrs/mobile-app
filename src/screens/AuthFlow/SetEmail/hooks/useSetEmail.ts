// SPDX-License-Identifier: BUSL-1.1

import {AuthActions} from '@store/modules/Auth/actions';
import {
  failedReasonSelector,
  isLoadingSelector,
} from '@store/modules/UtilityProcessStatuses/selectors';
import {ValidationActions} from '@store/modules/Validation/actions';
import {useState} from 'react';
import {Keyboard} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

export const useSetEmail = () => {
  const dispatch = useDispatch();

  const updateError = useSelector(
    failedReasonSelector.bind(null, AuthActions.UPDATE_ACCOUNT),
  );
  const updateLoading = useSelector(
    isLoadingSelector.bind(null, AuthActions.UPDATE_ACCOUNT),
  );

  const [email, setEmail] = useState('');

  const onChangeEmail = (text: string) => {
    setEmail(text);
  };

  const onSubmit = () => {
    Keyboard.dismiss();
    dispatch(ValidationActions.EMAIL_VALIDATION.CLEAR.create());
    dispatch(AuthActions.UPDATE_ACCOUNT.START.create({email}));
  };

  return {
    email,
    onChangeEmail,
    updateError,
    updateLoading,
    onSubmit,
  };
};
