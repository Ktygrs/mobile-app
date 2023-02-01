// SPDX-License-Identifier: BUSL-1.1

import {User} from '@api/user/types';
import {AccountActions} from '@store/modules/Account/actions';
import {userSelector} from '@store/modules/Account/selectors';
import {
  failedReasonSelector,
  isLoadingSelector,
  isSuccessSelector,
} from '@store/modules/UtilityProcessStatuses/selectors';
import {ValidationActions} from '@store/modules/Validation/actions';
import {useCallback, useEffect, useRef, useState} from 'react';
import {Keyboard} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {wait} from 'rn-units';

export const useClaimUsername = () => {
  const dispatch = useDispatch();
  const user = useSelector(userSelector) as User;

  const validationError = useSelector(
    failedReasonSelector.bind(null, ValidationActions.USERNAME_VALIDATION),
  );
  const validationLoading = useSelector(
    isLoadingSelector.bind(null, ValidationActions.USERNAME_VALIDATION),
  );
  const isSuccessUpdate = useSelector(
    isSuccessSelector.bind(null, AccountActions.UPDATE_ACCOUNT),
  );
  const updateError = useSelector(
    failedReasonSelector.bind(null, AccountActions.UPDATE_ACCOUNT),
  );
  const updateLoading = useSelector(
    isLoadingSelector.bind(null, AccountActions.UPDATE_ACCOUNT),
  );

  const initialUsername = useRef(user.username);
  const [username, setUsername] = useState(user.username);

  const onSubmit = () => {
    Keyboard.dismiss();
    if (username?.toLowerCase() !== user.username?.toLowerCase()) {
      dispatch(
        AccountActions.UPDATE_ACCOUNT.START.create({username: username}),
      );
    } else {
      /** Same username, no need to validate it */
      updateFinalizedSteps(user);
    }
  };

  const onChangeUsername = (text: string) => {
    setUsername(text);
    if (text !== '') {
      updateUsername(text);
    }
  };

  const isNextButtonDisabled =
    !username || username === '' || !!validationError || updateLoading;

  const resetError = useCallback(() => {
    if (validationError) {
      dispatch(ValidationActions.USERNAME_VALIDATION.RESET.create());
    }
    if (isSuccessUpdate || updateError) {
      dispatch(AccountActions.UPDATE_ACCOUNT.RESET.create());
    }
  }, [validationError, dispatch, isSuccessUpdate, updateError]);

  const updateUsername = useCallback(
    (newUsername: string) => {
      resetError();
      dispatch(ValidationActions.USERNAME_VALIDATION.START.create(newUsername));
    },
    [dispatch, resetError],
  );

  const updateFinalizedSteps = useCallback(
    (currentUser: User) => {
      const finalizedSteps =
        currentUser.clientData?.registrationProcessFinalizedSteps ?? [];

      const steps = [...finalizedSteps];
      if (!finalizedSteps.includes('username')) {
        steps.push('username');
      }
      dispatch(
        AccountActions.UPDATE_ACCOUNT.START.create(
          {
            clientData: {
              ...currentUser.clientData,
              registrationProcessFinalizedSteps: steps,
            },
          },
          function* (freshUser) {
            if (
              !freshUser.clientData?.registrationProcessFinalizedSteps?.includes(
                'username',
              )
            ) {
              updateFinalizedSteps(freshUser);
            }
            return {retry: false};
          },
        ),
      );
      dispatch(ValidationActions.USERNAME_VALIDATION.RESET.create());
    },
    [dispatch],
  );

  useEffect(() => {
    if (user.username !== initialUsername.current) {
      initialUsername.current = user.username;
      /**
       * Added 1 sec wait here so User can see the user validation result
       * (green mark or red cross) inside text input before we update user account
       */
      wait(1000).then(() => {
        updateFinalizedSteps(user);
      });
    }
  }, [updateFinalizedSteps, user]);

  return {
    username,
    validationError,
    validationLoading,
    isSuccessUpdate,
    updateError,
    updateLoading,
    onChangeUsername,
    onSubmit,
    isNextButtonDisabled,
  };
};
