// SPDX-License-Identifier: BUSL-1.1

import {User} from '@api/user/types';
import {AccountActions} from '@store/modules/Account/actions';
import {userSelector} from '@store/modules/Account/selectors';
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
  const user = useSelector(userSelector) as User;

  const updateError = useSelector(
    failedReasonSelector.bind(null, AccountActions.UPDATE_ACCOUNT),
  );
  const updateLoading = useSelector(
    isLoadingSelector.bind(null, AccountActions.UPDATE_ACCOUNT),
  );

  const [email, setEmail] = useState('');

  const onChangeEmail = (text: string) => {
    setEmail(text);
  };

  const removeRefStep = (userToUpdate: User) => {
    let finalizedSteps =
      userToUpdate.clientData?.registrationProcessFinalizedSteps ?? [];
    if (finalizedSteps.includes('referral')) {
      finalizedSteps = finalizedSteps.filter(step => step !== 'referral');
      dispatch(
        AccountActions.UPDATE_ACCOUNT.START.create(
          {
            clientData: {
              registrationProcessFinalizedSteps: [...finalizedSteps],
            },
          },
          function* (freshUser) {
            removeRefStep(freshUser);
            return {retry: false};
          },
        ),
      );
    }
  };

  const onBack = () => {
    removeRefStep(user);
  };

  const onSubmit = () => {
    Keyboard.dismiss();
    dispatch(ValidationActions.EMAIL_VALIDATION.RESET.create());
    dispatch(AccountActions.UPDATE_ACCOUNT.START.create({email}));
  };

  return {
    email,
    onChangeEmail,
    updateError,
    updateLoading,
    onSubmit,
    onBack,
  };
};
