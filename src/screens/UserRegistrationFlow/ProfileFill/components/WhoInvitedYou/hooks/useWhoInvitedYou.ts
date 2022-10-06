// SPDX-License-Identifier: BUSL-1.1

import {User} from '@api/user/types';
import {AuthActions} from '@store/modules/Auth/actions';
import {userSelector} from '@store/modules/Auth/selectors';
import {
  failedReasonSelector,
  isLoadingSelector,
  isSuccessSelector,
} from '@store/modules/UtilityProcessStatuses/selectors';
import {ValidationActions} from '@store/modules/Validation/actions';
import {refUserSelector} from '@store/modules/Validation/selectors';
import {debounce} from 'lodash';
import {useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

export const useWhoInvitedYou = () => {
  const dispatch = useDispatch();
  const user = useSelector(userSelector) as User;
  const refUser = useSelector(refUserSelector);

  const validationError = useSelector(
    failedReasonSelector.bind(null, ValidationActions.REF_USERNAME_VALIDATION),
  );
  const validationLoading = useSelector(
    isLoadingSelector.bind(null, ValidationActions.REF_USERNAME_VALIDATION),
  );
  const isSuccessValidation = useSelector(
    isSuccessSelector.bind(null, ValidationActions.REF_USERNAME_VALIDATION),
  );
  const [refUsername, setRefUsername] = useState('');

  const validateFefUsername = useMemo(
    () =>
      debounce((text: string) => {
        if (text) {
          dispatch(
            ValidationActions.REF_USERNAME_VALIDATION.START.create(text),
          );
        }
      }, 600),
    [dispatch],
  );

  const onChangeRefUsername = (text: string) => {
    setRefUsername(text);
  };

  const updateReferredBy = (currentUser: User, referredBy?: string) => {
    const finalizedSteps =
      currentUser.clientData?.registrationProcessFinalizedSteps ?? [];
    if (!finalizedSteps.includes('referral')) {
      dispatch(
        AuthActions.UPDATE_ACCOUNT.START.create(
          {
            ...(referredBy ? {referredBy} : {}),
            clientData: {
              ...currentUser.clientData,
              registrationProcessFinalizedSteps: [
                ...finalizedSteps,
                'referral',
              ],
            },
          },
          function* (freshUser) {
            updateReferredBy(freshUser, referredBy);
            return {retry: false};
          },
        ),
      );
    }
  };

  useEffect(() => {
    dispatch(ValidationActions.REF_USERNAME_VALIDATION.CLEAR.create());
    validateFefUsername(refUsername);
  }, [dispatch, refUsername, validateFefUsername]);

  return {
    refUsername,
    onChangeRefUsername,
    onSubmit: () => updateReferredBy(user, refUser?.id),
    onSkip: () => updateReferredBy(user),
    validationError,
    validationLoading,
    isSuccessValidation,
  };
};
