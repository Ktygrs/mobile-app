// SPDX-License-Identifier: BUSL-1.1

import {User} from '@api/user/types';
import {AuthActions} from '@store/modules/Auth/actions';
import {
  userDataSuggestionsSelector,
  userSelector,
} from '@store/modules/Auth/selectors';
import {
  failedReasonSelector,
  isLoadingSelector,
  isSuccessSelector,
} from '@store/modules/UtilityProcessStatuses/selectors';
import {ValidationActions} from '@store/modules/Validation/actions';
import {debounce} from 'lodash';
import {useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

export const useClaimUsername = () => {
  const dispatch = useDispatch();
  const user = useSelector(userSelector) as User;
  const userDataSuggestions = useSelector(userDataSuggestionsSelector);

  const validationError = useSelector(
    failedReasonSelector.bind(null, ValidationActions.USERNAME_VALIDATION),
  );
  const validationLoading = useSelector(
    isLoadingSelector.bind(null, ValidationActions.USERNAME_VALIDATION),
  );
  const isSuccessValidation = useSelector(
    isSuccessSelector.bind(null, ValidationActions.USERNAME_VALIDATION),
  );

  const usernameToPrefill =
    userDataSuggestions?.username ??
    user?.email?.split('@')[0].replace(/[^a-zA-Z0-9-_.]/g, '') ??
    '';
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
        AuthActions.UPDATE_ACCOUNT.START.create(
          {
            username: newUsername,
            clientData: {
              ...currentUser.clientData,
              registrationProcessFinalizedSteps: [
                ...finalizedSteps,
                'username',
              ],
            },
          },
          function* (freshUser) {
            updateUsername(freshUser, newUsername);
            return {retry: false};
          },
        ),
      );
    }
  };

  useEffect(() => {
    dispatch(ValidationActions.USERNAME_VALIDATION.CLEAR.create());
    validateUsername(username);
  }, [dispatch, username, validateUsername]);

  return {
    username,
    onChangeUsername,
    onSubmit: () => updateUsername(user, username),
    validationError,
    validationLoading,
    isSuccessValidation,
  };
};
