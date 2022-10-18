// SPDX-License-Identifier: BUSL-1.1

import {User} from '@api/user/types';
import {AuthActions} from '@store/modules/Auth/actions';
import {userSelector} from '@store/modules/Auth/selectors';
import {isLoadingSelector} from '@store/modules/UtilityProcessStatuses/selectors';
import {useDispatch, useSelector} from 'react-redux';

export const useIceBonus = () => {
  const dispatch = useDispatch();
  const user = useSelector(userSelector) as User;

  const loading = useSelector(
    isLoadingSelector.bind(null, AuthActions.UPDATE_ACCOUNT),
  );

  const currentBalance = '10.00';

  const finishIceBonus = (currentUser: User) => {
    const finalizedSteps =
      currentUser?.clientData?.registrationProcessFinalizedSteps ?? [];
    if (!finalizedSteps.includes('iceBonus')) {
      dispatch(
        AuthActions.UPDATE_ACCOUNT.START.create(
          {
            clientData: {
              ...currentUser.clientData,
              registrationProcessFinalizedSteps: [
                ...finalizedSteps,
                'iceBonus',
              ],
            },
          },
          function* (freshUser) {
            finishIceBonus(freshUser);
            return {retry: false};
          },
        ),
      );
    }
  };

  const onSubmit = () => finishIceBonus(user);

  return {
    currentBalance,
    loading,
    onSubmit,
  };
};
