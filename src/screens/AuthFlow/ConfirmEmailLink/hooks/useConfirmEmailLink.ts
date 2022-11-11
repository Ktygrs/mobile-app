// SPDX-License-Identifier: BUSL-1.1

import {useFocusEffect} from '@react-navigation/native';
import {AccountActions} from '@store/modules/Account/actions';
import {
  failedReasonSelector,
  processStatusForActionSelector,
} from '@store/modules/UtilityProcessStatuses/selectors';
import {temporaryEmailSelector} from '@store/modules/Validation/selectors';
import {RootState} from '@store/rootReducer';
import {useCallback} from 'react';
import {BackHandler} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

export const useConfirmEmailLink = () => {
  const dispatch = useDispatch();
  const email = useSelector(temporaryEmailSelector, () => true);

  const validateError = useSelector(
    failedReasonSelector.bind(null, AccountActions.SIGN_IN_EMAIL),
  );

  const validateLoading = useSelector(
    (state: RootState) =>
      processStatusForActionSelector(state, AccountActions.SIGN_IN_EMAIL)
        ?.status === 'CONFIRM_TEMP_EMAIL',
  );

  const goBack = () => {
    dispatch(AccountActions.SIGN_IN_EMAIL.RESET.create());
  };

  useFocusEffect(
    useCallback(() => {
      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        () => {
          dispatch(AccountActions.SIGN_IN_EMAIL.RESET.create());
          return true;
        },
      );
      return () => subscription.remove();
    }, [dispatch]),
  );

  return {
    email,
    validateError,
    validateLoading,
    goBack,
  };
};
