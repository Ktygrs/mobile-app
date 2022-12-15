// SPDX-License-Identifier: BUSL-1.1

import {User} from '@api/user/types';
import {AccountActions} from '@store/modules/Account/actions';
import {userInfoSelector, userSelector} from '@store/modules/Account/selectors';
import {
  failedReasonSelector,
  isLoadingSelector,
  isSuccessSelector,
} from '@store/modules/UtilityProcessStatuses/selectors';
import {ValidationActions} from '@store/modules/Validation/actions';
import {removeInvalidUsernameCharacters} from '@utils/string';
import {debounce} from 'lodash';
import {useEffect, useMemo, useState} from 'react';
import {Keyboard} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

export const useClaimUsername = () => {
  const dispatch = useDispatch();
  const user = useSelector(userSelector) as User;
  const userInfo = useSelector(userInfoSelector);

  const validationError = useSelector(
    failedReasonSelector.bind(null, ValidationActions.USERNAME_VALIDATION),
  );
  const validationLoading = useSelector(
    isLoadingSelector.bind(null, ValidationActions.USERNAME_VALIDATION),
  );
  const isSuccessValidation = useSelector(
    isSuccessSelector.bind(null, ValidationActions.USERNAME_VALIDATION),
  );
  const updateError = useSelector(
    failedReasonSelector.bind(null, AccountActions.UPDATE_ACCOUNT),
  );
  const updateLoading = useSelector(
    isLoadingSelector.bind(null, AccountActions.UPDATE_ACCOUNT),
  );

  const usernameToPrefill =
    userInfo?.userHandle ??
    removeInvalidUsernameCharacters(user.email?.split('@')[0] ?? '');
  const [username, setUsername] = useState(usernameToPrefill);

  const validateUsername = useMemo(
    () =>
      debounce((text: string) => {
        if (text) {
          dispatch(ValidationActions.USERNAME_VALIDATION.START.create(text));
        }
      }, 600),
    [dispatch],
  );

  const onChangeUsername = (text: string) => {
    setUsername(text);
  };

  const updateUsername = (currentUser: User, newUsername: string) => {
    const finalizedSteps =
      currentUser.clientData?.registrationProcessFinalizedSteps ?? [];
    if (!finalizedSteps.includes('username')) {
      dispatch(
        AccountActions.UPDATE_ACCOUNT.START.create({
          username: newUsername,
          clientData: {
            ...currentUser.clientData,
            registrationProcessFinalizedSteps: [...finalizedSteps, 'username'],
          },
        }),
      );
    }
  };

  useEffect(() => {
    dispatch(ValidationActions.USERNAME_VALIDATION.CLEAR.create());
    validateUsername(username);
  }, [dispatch, username, validateUsername]);

  return {
    username,
    validationError,
    validationLoading,
    isSuccessValidation,
    updateError,
    updateLoading,
    onChangeUsername,
    onSubmit: () => {
      Keyboard.dismiss();
      updateUsername(user, username);
    },
  };
};
